import { describe, expect, it } from "vitest";
import {
    DEFAULT_COORDINATE_INPUT,
    buildCoordinateSummary,
    buildGeoJsonFeatureCollection,
    buildGeoJsonLineString,
    buildGeoJsonPoint,
    buildMapLinks,
    calculateDistanceKm,
    calculatePathStats,
    decimalToDms,
    formatDecimalCoordinate,
    normalizeCoordinateInput,
    normalizePathPoints,
    parseCoordinateFileContent,
    parseCoordinateLine,
    parseCoordinateText,
    parseDms,
} from "../coordinateConverterLogic";

describe("coordinateConverterLogic", () => {
    describe("normalizeCoordinateInput", () => {
        it("normalizes decimal coordinates", () => {
            expect(
                normalizeCoordinateInput({
                    latitude: "44.4949123",
                    longitude: "11.3426123",
                }),
            ).toEqual({
                latitude: 44.494912,
                longitude: 11.342612,
            });
        });

        it("accepts comma decimals", () => {
            expect(
                normalizeCoordinateInput({
                    latitude: "44,4949",
                    longitude: "11,3426",
                }),
            ).toEqual({
                latitude: 44.4949,
                longitude: 11.3426,
            });
        });

        it("falls back to the default coordinate for invalid values", () => {
            expect(
                normalizeCoordinateInput({
                    latitude: "not-a-number",
                    longitude: "not-a-number",
                }),
            ).toEqual({
                latitude: 44.4949,
                longitude: 11.3426,
            });
        });

        it("clamps latitude and longitude to valid ranges", () => {
            expect(
                normalizeCoordinateInput({
                    latitude: "120",
                    longitude: "250",
                }),
            ).toEqual({
                latitude: 90,
                longitude: 180,
            });

            expect(
                normalizeCoordinateInput({
                    latitude: "-120",
                    longitude: "-250",
                }),
            ).toEqual({
                latitude: -90,
                longitude: -180,
            });
        });
    });

    describe("DMS conversion", () => {
        it("converts decimal coordinates to DMS", () => {
            expect(decimalToDms(44.4949, "lat")).toBe('44° 29\' 41.64" N');
            expect(decimalToDms(11.3426, "lon")).toBe('11° 20\' 33.36" E');
        });

        it("uses the correct hemisphere for negative values", () => {
            expect(decimalToDms(-44.4949, "lat")).toBe('44° 29\' 41.64" S');
            expect(decimalToDms(-11.3426, "lon")).toBe('11° 20\' 33.36" W');
        });

        it("parses DMS strings", () => {
            expect(parseDms('44° 29\' 41.64" N')).toBe(44.4949);
            expect(parseDms('11° 20\' 33.36" E')).toBe(11.3426);
            expect(parseDms('44° 29\' 41.64" S')).toBe(-44.4949);
            expect(parseDms('11° 20\' 33.36" W')).toBe(-11.3426);
        });

        it("returns null for invalid DMS input", () => {
            expect(parseDms("hello world")).toBeNull();
            expect(parseDms(null)).toBeNull();
        });
    });

    describe("formatting and map links", () => {
        it("formats decimal coordinates", () => {
            expect(
                formatDecimalCoordinate({
                    latitude: "44.4949",
                    longitude: "11.3426",
                }),
            ).toBe("44.4949, 11.3426");
        });

        it("builds Google Maps and OpenStreetMap links", () => {
            expect(
                buildMapLinks({
                    latitude: "44.4949",
                    longitude: "11.3426",
                }),
            ).toEqual({
                googleMaps:
                    "https://www.google.com/maps/search/?api=1&query=44.4949,11.3426",
                openStreetMap:
                    "https://www.openstreetmap.org/?mlat=44.4949&mlon=11.3426#map=16/44.4949/11.3426",
            });
        });
    });

    describe("GeoJSON generation", () => {
        it("builds a GeoJSON point with longitude-latitude coordinate order", () => {
            expect(
                buildGeoJsonPoint(
                    {
                        latitude: "44.4949",
                        longitude: "11.3426",
                    },
                    { name: "Bologna" },
                ),
            ).toEqual({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [11.3426, 44.4949],
                },
                properties: { name: "Bologna" },
            });
        });

        it("normalizes path points from object and array inputs", () => {
            expect(
                normalizePathPoints([
                    { latitude: "44.4949", longitude: "11.3426" },
                    { lat: "44.5075", lng: "11.3514" },
                    [11.37, 44.52],
                ]),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
                { latitude: 44.52, longitude: 11.37 },
            ]);
        });

        it("removes duplicate path points", () => {
            expect(
                normalizePathPoints([
                    { latitude: "44.4949", longitude: "11.3426" },
                    { latitude: "44.4949", longitude: "11.3426" },
                    { latitude: "44.5075", longitude: "11.3514" },
                ]),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
            ]);
        });

        it("builds a GeoJSON LineString", () => {
            expect(
                buildGeoJsonLineString(
                    [
                        { latitude: "44.4949", longitude: "11.3426" },
                        { latitude: "44.5075", longitude: "11.3514" },
                    ],
                    { name: "Test path" },
                ),
            ).toEqual({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [11.3426, 44.4949],
                        [11.3514, 44.5075],
                    ],
                },
                properties: { name: "Test path" },
            });
        });

        it("builds a GeoJSON FeatureCollection", () => {
            const point = buildGeoJsonPoint({
                latitude: "44.4949",
                longitude: "11.3426",
            });
            const path = buildGeoJsonLineString([
                { latitude: "44.4949", longitude: "11.3426" },
                { latitude: "44.5075", longitude: "11.3514" },
            ]);

            expect(buildGeoJsonFeatureCollection([point, path])).toEqual({
                type: "FeatureCollection",
                features: [point, path],
            });
        });
    });

    describe("distance and path statistics", () => {
        it("calculates approximate distance between two points", () => {
            expect(
                calculateDistanceKm(
                    { latitude: "44.4949", longitude: "11.3426" },
                    { latitude: "44.5075", longitude: "11.3514" },
                ),
            ).toBeGreaterThan(1.5);
            expect(
                calculateDistanceKm(
                    { latitude: "44.4949", longitude: "11.3426" },
                    { latitude: "44.5075", longitude: "11.3514" },
                ),
            ).toBeLessThan(1.7);
        });

        it("calculates path statistics", () => {
            expect(
                calculatePathStats([
                    { latitude: "44.4949", longitude: "11.3426" },
                    { latitude: "44.5075", longitude: "11.3514" },
                ]),
            ).toEqual({
                pointsCount: 2,
                totalDistanceKm: expect.any(Number),
                center: {
                    latitude: 44.5012,
                    longitude: 11.347,
                },
                bounds: {
                    minLatitude: 44.4949,
                    maxLatitude: 44.5075,
                    minLongitude: 11.3426,
                    maxLongitude: 11.3514,
                },
            });
        });

        it("returns empty stats for empty paths", () => {
            expect(calculatePathStats([])).toEqual({
                pointsCount: 0,
                totalDistanceKm: 0,
                center: null,
                bounds: null,
            });
        });
    });

    describe("coordinate parsing", () => {
        it("parses a coordinate line", () => {
            expect(parseCoordinateLine("44.4949, 11.3426")).toEqual({
                latitude: 44.4949,
                longitude: 11.3426,
            });
        });

        it("parses coordinate text", () => {
            expect(
                parseCoordinateText("44.4949, 11.3426\n44.5075, 11.3514"),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
            ]);
        });

        it("parses CSV-like file content", () => {
            expect(
                parseCoordinateFileContent("44.4949, 11.3426\n44.5075, 11.3514"),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
            ]);
        });

        it("parses a JSON array of coordinate objects", () => {
            expect(
                parseCoordinateFileContent(
                    JSON.stringify([
                        { latitude: 44.4949, longitude: 11.3426 },
                        { lat: 44.5075, lon: 11.3514 },
                    ]),
                ),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
            ]);
        });

        it("parses GeoJSON Point", () => {
            expect(
                parseCoordinateFileContent(
                    JSON.stringify({
                        type: "Point",
                        coordinates: [11.3426, 44.4949],
                    }),
                ),
            ).toEqual([{ latitude: 44.4949, longitude: 11.3426 }]);
        });

        it("parses GeoJSON LineString", () => {
            expect(
                parseCoordinateFileContent(
                    JSON.stringify({
                        type: "LineString",
                        coordinates: [
                            [11.3426, 44.4949],
                            [11.3514, 44.5075],
                        ],
                    }),
                ),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
            ]);
        });

        it("parses GeoJSON FeatureCollection", () => {
            expect(
                parseCoordinateFileContent(
                    JSON.stringify({
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [11.3426, 44.4949],
                                },
                                properties: {},
                            },
                            {
                                type: "Feature",
                                geometry: {
                                    type: "LineString",
                                    coordinates: [
                                        [11.3514, 44.5075],
                                        [11.37, 44.52],
                                    ],
                                },
                                properties: {},
                            },
                        ],
                    }),
                ),
            ).toEqual([
                { latitude: 44.4949, longitude: 11.3426 },
                { latitude: 44.5075, longitude: 11.3514 },
                { latitude: 44.52, longitude: 11.37 },
            ]);
        });

        it("returns an empty array for empty content", () => {
            expect(parseCoordinateFileContent("")).toEqual([]);
        });
    });

    describe("buildCoordinateSummary", () => {
        it("returns the combined coordinate summary", () => {
            expect(
                buildCoordinateSummary({
                    latitude: DEFAULT_COORDINATE_INPUT.latitude,
                    longitude: DEFAULT_COORDINATE_INPUT.longitude,
                }),
            ).toEqual({
                decimal: "44.4949, 11.3426",
                latitudeDms: '44° 29\' 41.64" N',
                longitudeDms: '11° 20\' 33.36" E',
                geoJsonPoint: {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [11.3426, 44.4949],
                    },
                    properties: {},
                },
                links: {
                    googleMaps:
                        "https://www.google.com/maps/search/?api=1&query=44.4949,11.3426",
                    openStreetMap:
                        "https://www.openstreetmap.org/?mlat=44.4949&mlon=11.3426#map=16/44.4949/11.3426",
                },
            });
        });
    });
});