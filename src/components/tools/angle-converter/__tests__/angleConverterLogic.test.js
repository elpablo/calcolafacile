import { describe, expect, it } from "vitest";
import {
    ANGLE_UNITS,
    DEFAULT_ANGLE_INPUT,
    buildAngleQueryParams,
    calculateAngleConversion,
    convertAngleToDegrees,
    normalizeAngleInput,
    parseAngleQueryParams,
} from "../angleConverterLogic";

describe("angleConverterLogic", () => {
    describe("constants", () => {
        it("defines the supported angle units", () => {
            expect(ANGLE_UNITS).toEqual(["degrees", "radians", "gradians", "turns"]);
        });

        it("defines the default input", () => {
            expect(DEFAULT_ANGLE_INPUT).toEqual({
                value: 45,
                unit: "degrees",
            });
        });
    });

    describe("normalizeAngleInput", () => {
        it("normalizes valid input", () => {
            expect(
                normalizeAngleInput({
                    value: "90",
                    unit: "radians",
                }),
            ).toEqual({
                value: 90,
                unit: "radians",
            });
        });

        it("falls back to defaults for invalid input", () => {
            expect(
                normalizeAngleInput({
                    value: "not-a-number",
                    unit: "invalid-unit",
                }),
            ).toEqual(DEFAULT_ANGLE_INPUT);
        });

        it("keeps negative and greater-than-full-turn values", () => {
            expect(
                normalizeAngleInput({
                    value: -450,
                    unit: "degrees",
                }),
            ).toEqual({
                value: -450,
                unit: "degrees",
            });
        });
    });

    describe("convertAngleToDegrees", () => {
        it("keeps degrees unchanged", () => {
            expect(convertAngleToDegrees({ value: 180, unit: "degrees" })).toBe(180);
        });

        it("converts radians to degrees", () => {
            expect(convertAngleToDegrees({ value: Math.PI, unit: "radians" })).toBe(180);
            expect(convertAngleToDegrees({ value: Math.PI / 2, unit: "radians" })).toBe(90);
        });

        it("converts gradians to degrees", () => {
            expect(convertAngleToDegrees({ value: 100, unit: "gradians" })).toBe(90);
            expect(convertAngleToDegrees({ value: 200, unit: "gradians" })).toBe(180);
        });

        it("converts turns to degrees", () => {
            expect(convertAngleToDegrees({ value: 0.25, unit: "turns" })).toBe(90);
            expect(convertAngleToDegrees({ value: 0.5, unit: "turns" })).toBe(180);
        });
    });

    describe("calculateAngleConversion", () => {
        it("converts 45 degrees to equivalent units", () => {
            expect(
                calculateAngleConversion({
                    value: 45,
                    unit: "degrees",
                }),
            ).toEqual({
                input: {
                    value: 45,
                    unit: "degrees",
                },
                degrees: 45,
                radians: 0.7853981634,
                gradians: 50,
                turns: 0.125,
                normalizedDegrees: 45,
            });
        });

        it("converts pi radians to equivalent units", () => {
            expect(
                calculateAngleConversion({
                    value: Math.PI,
                    unit: "radians",
                }),
            ).toEqual({
                input: {
                    value: Math.PI,
                    unit: "radians",
                },
                degrees: 180,
                radians: 3.1415926536,
                gradians: 200,
                turns: 0.5,
                normalizedDegrees: 180,
            });
        });

        it("normalizes angles greater than 360 degrees for visual preview", () => {
            expect(
                calculateAngleConversion({
                    value: 450,
                    unit: "degrees",
                }),
            ).toEqual(
                expect.objectContaining({
                    degrees: 450,
                    normalizedDegrees: 90,
                }),
            );
        });

        it("normalizes negative angles for visual preview", () => {
            expect(
                calculateAngleConversion({
                    value: -90,
                    unit: "degrees",
                }),
            ).toEqual(
                expect.objectContaining({
                    degrees: -90,
                    normalizedDegrees: 270,
                }),
            );
        });

        it("avoids negative zero in calculated values", () => {
            const conversion = calculateAngleConversion({
                value: -0,
                unit: "degrees",
            });

            expect(Object.is(conversion.degrees, -0)).toBe(false);
            expect(Object.is(conversion.radians, -0)).toBe(false);
            expect(Object.is(conversion.gradians, -0)).toBe(false);
            expect(Object.is(conversion.turns, -0)).toBe(false);
        });
    });

    describe("query params", () => {
        it("builds query params from normalized input", () => {
            expect(
                buildAngleQueryParams({
                    value: "45",
                    unit: "degrees",
                }),
            ).toBe("value=45&unit=degrees");
        });

        it("parses URLSearchParams", () => {
            const params = new URLSearchParams("value=3.1415926536&unit=radians");

            expect(parseAngleQueryParams(params)).toEqual({
                value: 3.1415926536,
                unit: "radians",
            });
        });

        it("parses plain objects", () => {
            expect(
                parseAngleQueryParams({
                    value: "0.5",
                    unit: "turns",
                }),
            ).toEqual({
                value: 0.5,
                unit: "turns",
            });
        });
    });
});