export const ANGLE_UNITS = ["degrees", "radians", "gradians", "turns"];

export const DEFAULT_ANGLE_INPUT = {
    value: 45,
    unit: "degrees",
};

function toFiniteNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function normalizeDegrees(degrees) {
    return ((degrees % 360) + 360) % 360;
}

function roundAngle(value, decimals = 10) {
    const factor = 10 ** decimals;
    const rounded = Math.round((value + Number.EPSILON) * factor) / factor;

    return Object.is(rounded, -0) ? 0 : rounded;
}

export function normalizeAngleInput(input = {}) {
    const value = toFiniteNumber(input.value, DEFAULT_ANGLE_INPUT.value);
    const unit = ANGLE_UNITS.includes(input.unit)
        ? input.unit
        : DEFAULT_ANGLE_INPUT.unit;

    return {
        value,
        unit,
    };
}

export function convertAngleToDegrees(input = {}) {
    const normalized = normalizeAngleInput(input);
    const { value, unit } = normalized;

    if (unit === "radians") {
        return roundAngle((value * 180) / Math.PI);
    }

    if (unit === "gradians") {
        return roundAngle(value * 0.9);
    }

    if (unit === "turns") {
        return roundAngle(value * 360);
    }

    return roundAngle(value);
}

export function calculateAngleConversion(input = {}) {
    const normalized = normalizeAngleInput(input);
    const degrees = convertAngleToDegrees(normalized);
    const radians = roundAngle((degrees * Math.PI) / 180);
    const gradians = roundAngle(degrees / 0.9);
    const turns = roundAngle(degrees / 360);
    const normalizedDegrees = roundAngle(normalizeDegrees(degrees));

    return {
        input: normalized,
        degrees,
        radians,
        gradians,
        turns,
        normalizedDegrees,
    };
}

export function buildAngleQueryParams(input = {}) {
    const normalized = normalizeAngleInput(input);
    const params = new URLSearchParams();

    params.set("value", String(normalized.value));
    params.set("unit", normalized.unit);

    return params.toString();
}

export function parseAngleQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeAngleInput({
        value: getValue("value"),
        unit: getValue("unit"),
    });
}