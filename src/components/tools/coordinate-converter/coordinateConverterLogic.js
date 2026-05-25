export const DEFAULT_COORDINATE_INPUT = {
    latitude: "44.4949",
    longitude: "11.3426",
};

const COORDINATE_DECIMALS = 6;
const EARTH_RADIUS_KM = 6371.0088;

function toFiniteNumber(value, fallback = 0) {
    const number = Number(String(value).trim().replace(",", "."));
    return Number.isFinite(number) ? number : fallback;
}

function roundCoordinate(value, decimals = COORDINATE_DECIMALS) {
    const factor = 10 ** decimals;
    const rounded = Math.round((value + Number.EPSILON) * factor) / factor;

    return Object.is(rounded, -0) ? 0 : rounded;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function normalizeCoordinateInput(input = {}) {
    const latitude = clamp(
        toFiniteNumber(input.latitude, DEFAULT_COORDINATE_INPUT.latitude),
        -90,
        90,
    );
    const longitude = clamp(
        toFiniteNumber(input.longitude, DEFAULT_COORDINATE_INPUT.longitude),
        -180,
        180,
    );

    return {
        latitude: roundCoordinate(latitude),
        longitude: roundCoordinate(longitude),
    };
}

function decimalToDmsParts(value) {
    const absoluteValue = Math.abs(value);
    const degrees = Math.floor(absoluteValue);
    const minutesFloat = (absoluteValue - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = roundCoordinate((minutesFloat - minutes) * 60, 3);

    return { degrees, minutes, seconds };
}

export function decimalToDms(value, type) {
    const normalizedValue = toFiniteNumber(value);
    const { degrees, minutes, seconds } = decimalToDmsParts(normalizedValue);
    const hemisphere =
        type === "lat"
            ? normalizedValue >= 0
                ? "N"
                : "S"
            : normalizedValue >= 0
              ? "E"
              : "W";

    return `${degrees}° ${minutes}' ${seconds}" ${hemisphere}`;
}

export function parseDms(value) {
    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim().toUpperCase();
    const hemisphereMatch = normalized.match(/[NSEW]/);
    const signFromHemisphere = hemisphereMatch
        ? ["S", "W"].includes(hemisphereMatch[0])
            ? -1
            : 1
        : 1;
    const explicitSign = normalized.startsWith("-") ? -1 : 1;
    const numbers = normalized.match(/-?\d+(?:[.,]\d+)?/g);

    if (!numbers || numbers.length === 0) {
        return null;
    }

    const degrees = Math.abs(toFiniteNumber(numbers[0]));
    const minutes = numbers.length > 1 ? Math.abs(toFiniteNumber(numbers[1])) : 0;
    const seconds = numbers.length > 2 ? Math.abs(toFiniteNumber(numbers[2])) : 0;
    const sign = hemisphereMatch ? signFromHemisphere : explicitSign;

    return roundCoordinate(sign * (degrees + minutes / 60 + seconds / 3600));
}

export function formatDecimalCoordinate(point) {
    const normalized = normalizeCoordinateInput(point);
    return `${normalized.latitude}, ${normalized.longitude}`;
}

export function buildCoordinateQueryParams(input = {}) {
    const normalized = normalizeCoordinateInput(input);
    const params = new URLSearchParams();

    params.set("latitude", String(normalized.latitude));
    params.set("longitude", String(normalized.longitude));

    return params.toString();
}

export function parseCoordinateQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeCoordinateInput({
        latitude: getValue("latitude"),
        longitude: getValue("longitude"),
    });
}

export function buildMapLinks(point) {
    const normalized = normalizeCoordinateInput(point);
    const encoded = `${normalized.latitude},${normalized.longitude}`;

    return {
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
        openStreetMap: `https://www.openstreetmap.org/?mlat=${normalized.latitude}&mlon=${normalized.longitude}#map=16/${normalized.latitude}/${normalized.longitude}`,
    };
}

export function buildGeoJsonPoint(point, properties = {}) {
    const normalized = normalizeCoordinateInput(point);

    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [normalized.longitude, normalized.latitude],
        },
        properties,
    };
}

export function normalizePathPoints(points = [], options = {}) {
    const { dedupe = true } = options;
    const normalizedPoints = points.map((point) => {
        if (Array.isArray(point)) {
            return normalizeCoordinateInput({
                longitude: point[0],
                latitude: point[1],
            });
        }

        return normalizeCoordinateInput({
            latitude: point.latitude ?? point.lat,
            longitude: point.longitude ?? point.lon ?? point.lng,
        });
    });

    if (!dedupe) {
        return normalizedPoints;
    }

    return normalizedPoints.filter((point, index, items) => {
        const key = `${point.latitude}:${point.longitude}`;
        return (
            items.findIndex(
                (item) => `${item.latitude}:${item.longitude}` === key,
            ) === index
        );
    });
}

export function buildGeoJsonLineString(points = [], properties = {}, options = {}) {
    const normalizedPoints = normalizePathPoints(points, options);

    return {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: normalizedPoints.map((point) => [
                point.longitude,
                point.latitude,
            ]),
        },
        properties,
    };
}

export function buildGeoJsonFeatureCollection(features = []) {
    return {
        type: "FeatureCollection",
        features,
    };
}

function toRadians(value) {
    return (value * Math.PI) / 180;
}

export function calculateDistanceKm(fromPoint, toPoint) {
    const from = normalizeCoordinateInput(fromPoint);
    const to = normalizeCoordinateInput(toPoint);
    const latDelta = toRadians(to.latitude - from.latitude);
    const lonDelta = toRadians(to.longitude - from.longitude);
    const fromLat = toRadians(from.latitude);
    const toLat = toRadians(to.latitude);
    const a =
        Math.sin(latDelta / 2) ** 2 +
        Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lonDelta / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return roundCoordinate(EARTH_RADIUS_KM * c, 3);
}

export function calculatePathStats(points = [], options = {}) {
    const normalizedPoints = normalizePathPoints(points, options);
    const totalDistanceKm = normalizedPoints.reduce((total, point, index) => {
        if (index === 0) {
            return total;
        }

        return total + calculateDistanceKm(normalizedPoints[index - 1], point);
    }, 0);

    if (normalizedPoints.length === 0) {
        return {
            pointsCount: 0,
            totalDistanceKm: 0,
            center: null,
            bounds: null,
        };
    }

    const latitudes = normalizedPoints.map((point) => point.latitude);
    const longitudes = normalizedPoints.map((point) => point.longitude);
    const bounds = {
        minLatitude: Math.min(...latitudes),
        maxLatitude: Math.max(...latitudes),
        minLongitude: Math.min(...longitudes),
        maxLongitude: Math.max(...longitudes),
    };

    return {
        pointsCount: normalizedPoints.length,
        totalDistanceKm: roundCoordinate(totalDistanceKm, 3),
        center: {
            latitude: roundCoordinate((bounds.minLatitude + bounds.maxLatitude) / 2),
            longitude: roundCoordinate((bounds.minLongitude + bounds.maxLongitude) / 2),
        },
        bounds,
    };
}

export function parseCoordinateLine(line) {
    const trimmed = String(line || "").trim();

    if (!trimmed) {
        return null;
    }

    const coordinateNumberPattern = /^[+-]?\d+(?:[.,]\d+)?$/;
    const canParseCoordinatePair = (latitude, longitude) =>
        coordinateNumberPattern.test(String(latitude).trim()) &&
        coordinateNumberPattern.test(String(longitude).trim());

    const semicolonParts = trimmed
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean);

    if (semicolonParts.length >= 2) {
        if (!canParseCoordinatePair(semicolonParts[0], semicolonParts[1])) {
            return null;
        }

        return normalizeCoordinateInput({
            latitude: semicolonParts[0],
            longitude: semicolonParts[1],
        });
    }

    const decimalCoordinateMatch = trimmed.match(
        /^\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*$/
    );

    if (decimalCoordinateMatch) {
        if (!canParseCoordinatePair(decimalCoordinateMatch[1], decimalCoordinateMatch[2])) {
            return null;
        }

        return normalizeCoordinateInput({
            latitude: decimalCoordinateMatch[1],
            longitude: decimalCoordinateMatch[2],
        });
    }

    const whitespaceParts = trimmed
        .split(/[\t ]+/)
        .map((part) => part.trim())
        .filter(Boolean);

    if (whitespaceParts.length >= 2) {
        if (!canParseCoordinatePair(whitespaceParts[0], whitespaceParts[1])) {
            return null;
        }

        return normalizeCoordinateInput({
            latitude: whitespaceParts[0],
            longitude: whitespaceParts[1],
        });
    }

    return null;
}

export function parseCoordinateText(text = "") {
    return String(text)
        .split(/\r?\n/)
        .map(parseCoordinateLine)
        .filter(Boolean);
}

function extractGeoJsonPoints(geoJson) {
    if (!geoJson || typeof geoJson !== "object") {
        return [];
    }

    if (geoJson.type === "FeatureCollection") {
        return geoJson.features.flatMap(extractGeoJsonPoints);
    }

    if (geoJson.type === "Feature") {
        return extractGeoJsonPoints(geoJson.geometry);
    }

    if (geoJson.type === "Point") {
        return normalizePathPoints([geoJson.coordinates], { dedupe: false });
    }

    if (geoJson.type === "LineString") {
        return normalizePathPoints(geoJson.coordinates, { dedupe: false });
    }

    if (geoJson.type === "MultiPoint") {
        return normalizePathPoints(geoJson.coordinates, { dedupe: false });
    }

    return [];
}

export function parseCoordinateFileContent(content = "") {
    const text = String(content).trim();

    if (!text) {
        return [];
    }

    try {
        const json = JSON.parse(text);
        const geoJsonPoints = extractGeoJsonPoints(json);

        if (geoJsonPoints.length > 0) {
            return geoJsonPoints;
        }

        if (Array.isArray(json)) {
            return normalizePathPoints(json, { dedupe: false });
        }
    } catch {
        // Fall back to plain text / CSV parsing.
    }

    return parseCoordinateText(text);
}

export function buildCoordinateSummary(point) {
    const normalized = normalizeCoordinateInput(point);

    return {
        decimal: formatDecimalCoordinate(normalized),
        latitudeDms: decimalToDms(normalized.latitude, "lat"),
        longitudeDms: decimalToDms(normalized.longitude, "lon"),
        geoJsonPoint: buildGeoJsonPoint(normalized),
        links: buildMapLinks(normalized),
    };
}