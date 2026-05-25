import { describe, expect, it } from "vitest";
import {
    DEFAULT_TIME_ZONE_INPUT,
    TIME_ZONE_OPTIONS,
    buildTimeZoneQueryParams,
    calculateTimeZoneConversion,
    normalizeTimeZoneInput,
    parseTimeZoneQueryParams,
} from "../timeZoneConverterLogic";

describe("timeZoneConverterLogic", () => {
    describe("constants", () => {
        it("defines a useful set of time zones", () => {
            expect(TIME_ZONE_OPTIONS).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ value: "UTC" }),
                    expect.objectContaining({ value: "Europe/Rome" }),
                    expect.objectContaining({ value: "America/New_York" }),
                    expect.objectContaining({ value: "Asia/Tokyo" }),
                ]),
            );
        });

        it("defines a complete default input", () => {
            expect(DEFAULT_TIME_ZONE_INPUT).toEqual({
                date: "2026-05-24",
                time: "14:00",
                sourceTimeZone: "Europe/Rome",
                targetTimeZones: ["UTC", "Europe/London", "America/New_York", "Asia/Tokyo"],
            });
        });
    });

    describe("normalizeTimeZoneInput", () => {
        it("normalizes empty input to defaults", () => {
            expect(normalizeTimeZoneInput()).toEqual(DEFAULT_TIME_ZONE_INPUT);
        });

        it("keeps valid input", () => {
            expect(
                normalizeTimeZoneInput({
                    date: "2026-06-10",
                    time: "09:30",
                    sourceTimeZone: "UTC",
                    targetTimeZones: ["Europe/Rome", "America/New_York"],
                }),
            ).toEqual({
                date: "2026-06-10",
                time: "09:30",
                sourceTimeZone: "UTC",
                targetTimeZones: ["Europe/Rome", "America/New_York"],
            });
        });

        it("falls back to a valid source time zone", () => {
            expect(
                normalizeTimeZoneInput({
                    sourceTimeZone: "Invalid/Zone",
                }).sourceTimeZone,
            ).toBe(DEFAULT_TIME_ZONE_INPUT.sourceTimeZone);
        });

        it("normalizes comma-separated target time zones", () => {
            expect(
                normalizeTimeZoneInput({
                    sourceTimeZone: "UTC",
                    targetTimeZones: "Europe/Rome,America/New_York,Asia/Tokyo",
                }).targetTimeZones,
            ).toEqual(["Europe/Rome", "America/New_York", "Asia/Tokyo"]);
        });

        it("removes duplicate and invalid target time zones", () => {
            expect(
                normalizeTimeZoneInput({
                    sourceTimeZone: "UTC",
                    targetTimeZones: [
                        "Europe/Rome",
                        "Europe/Rome",
                        "Invalid/Zone",
                        "Asia/Tokyo",
                    ],
                }).targetTimeZones,
            ).toEqual(["Europe/Rome", "Asia/Tokyo"]);
        });
    });

    describe("calculateTimeZoneConversion", () => {
        it("converts Rome afternoon time to UTC, London, New York and Tokyo", () => {
            const conversion = calculateTimeZoneConversion({
                date: "2026-05-24",
                time: "14:00",
                sourceTimeZone: "Europe/Rome",
                targetTimeZones: ["UTC", "Europe/London", "America/New_York", "Asia/Tokyo"],
            });

            expect(conversion.source).toEqual(
                expect.objectContaining({
                    timeZone: "Europe/Rome",
                    time: "14:00",
                    offset: "UTC+02:00",
                    period: "business",
                    dayOffset: 0,
                }),
            );
            expect(conversion.targets).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        timeZone: "UTC",
                        time: "12:00",
                        offset: "UTC+00:00",
                        period: "business",
                        dayOffset: 0,
                    }),
                    expect.objectContaining({
                        timeZone: "Europe/London",
                        time: "13:00",
                        offset: "UTC+01:00",
                        period: "business",
                        dayOffset: 0,
                    }),
                    expect.objectContaining({
                        timeZone: "America/New_York",
                        time: "08:00",
                        offset: "UTC-04:00",
                        period: "day",
                        dayOffset: 0,
                    }),
                    expect.objectContaining({
                        timeZone: "Asia/Tokyo",
                        time: "21:00",
                        offset: "UTC+09:00",
                        period: "day",
                        dayOffset: 0,
                    }),
                ]),
            );
            expect(conversion.utcIso).toBe("2026-05-24T12:00:00.000Z");
            expect(conversion.allZones).toHaveLength(5);
        });

        it("detects next-day conversions", () => {
            const conversion = calculateTimeZoneConversion({
                date: "2026-05-24",
                time: "23:30",
                sourceTimeZone: "Europe/Rome",
                targetTimeZones: ["Asia/Tokyo"],
            });

            expect(conversion.targets[0]).toEqual(
                expect.objectContaining({
                    timeZone: "Asia/Tokyo",
                    date: "2026-05-25",
                    time: "06:30",
                    dayOffset: 1,
                    period: "day",
                }),
            );
        });

        it("detects previous-day conversions", () => {
            const conversion = calculateTimeZoneConversion({
                date: "2026-05-24",
                time: "01:30",
                sourceTimeZone: "Europe/Rome",
                targetTimeZones: ["America/Los_Angeles"],
            });

            expect(conversion.targets[0]).toEqual(
                expect.objectContaining({
                    timeZone: "America/Los_Angeles",
                    date: "2026-05-23",
                    time: "16:30",
                    dayOffset: -1,
                    period: "business",
                }),
            );
        });

        it("marks night hours correctly", () => {
            const conversion = calculateTimeZoneConversion({
                date: "2026-05-24",
                time: "02:00",
                sourceTimeZone: "UTC",
                targetTimeZones: ["UTC"],
            });

            expect(conversion.source).toEqual(
                expect.objectContaining({
                    time: "02:00",
                    period: "night",
                    timelinePosition: expect.closeTo(8.333333, 4),
                }),
            );
        });
    });

    describe("query params", () => {
        it("builds query params from normalized input", () => {
            expect(
                buildTimeZoneQueryParams({
                    date: "2026-05-24",
                    time: "14:00",
                    sourceTimeZone: "Europe/Rome",
                    targetTimeZones: ["UTC", "America/New_York"],
                }),
            ).toBe(
                "date=2026-05-24&time=14%3A00&sourceTimeZone=Europe%2FRome&targetTimeZones=UTC%2CAmerica%2FNew_York",
            );
        });

        it("parses URLSearchParams", () => {
            const params = new URLSearchParams(
                "date=2026-05-24&time=18%3A00&sourceTimeZone=UTC&targetTimeZones=America%2FNew_York%2CAmerica%2FChicago",
            );

            expect(parseTimeZoneQueryParams(params)).toEqual({
                date: "2026-05-24",
                time: "18:00",
                sourceTimeZone: "UTC",
                targetTimeZones: ["America/New_York", "America/Chicago"],
            });
        });

        it("parses plain objects", () => {
            expect(
                parseTimeZoneQueryParams({
                    date: "2026-05-24",
                    time: "21:00",
                    sourceTimeZone: "Asia/Tokyo",
                    targetTimeZones: "Europe/Rome,UTC",
                }),
            ).toEqual({
                date: "2026-05-24",
                time: "21:00",
                sourceTimeZone: "Asia/Tokyo",
                targetTimeZones: ["Europe/Rome", "UTC"],
            });
        });
    });
});