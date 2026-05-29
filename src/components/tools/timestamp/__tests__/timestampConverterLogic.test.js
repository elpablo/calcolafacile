import { describe, expect, it, vi } from "vitest";
import {
    TIMESTAMP_UNITS,
    buildDateToTimestampResult,
    buildTimestampToDateResult,
    formatDateTimeInput,
    getTimestampParts,
    normalizeTimestampUnit,
    parseDateTimeInput,
    parseTimestampInput,
} from "../timestampConverterLogic";

const labels = {
    localDateTime: "Local date/time",
    utcDateTime: "UTC date/time",
    timezone: "Timezone",
    relative: "Relative",
    now: "now",
    invalidTimestamp: "Invalid timestamp",
    invalidDate: "Invalid date",
    units: {
        secondsFull: "Seconds",
        millisecondsFull: "Milliseconds",
    },
};

describe("timestampConverterLogic", () => {
    describe("normalizeTimestampUnit", () => {
        it("normalizes supported timestamp units", () => {
            expect(normalizeTimestampUnit(TIMESTAMP_UNITS.seconds)).toBe(
                TIMESTAMP_UNITS.seconds,
            );
            expect(normalizeTimestampUnit(TIMESTAMP_UNITS.milliseconds)).toBe(
                TIMESTAMP_UNITS.milliseconds,
            );
        });

        it("falls back to seconds for unsupported units", () => {
            expect(normalizeTimestampUnit("minutes")).toBe(
                TIMESTAMP_UNITS.seconds,
            );
            expect(normalizeTimestampUnit()).toBe(TIMESTAMP_UNITS.seconds);
        });
    });

    describe("parseTimestampInput", () => {
        it("parses Unix timestamps in seconds", () => {
            const parsed = parseTimestampInput("1748520000", "seconds");

            expect(parsed).toMatchObject({
                seconds: 1748520000,
                milliseconds: 1748520000000,
                unit: TIMESTAMP_UNITS.seconds,
            });
            expect(parsed.date.toISOString()).toBe("2025-05-29T12:00:00.000Z");
        });

        it("parses Unix timestamps in milliseconds", () => {
            const parsed = parseTimestampInput("1748520000000", "milliseconds");

            expect(parsed).toMatchObject({
                seconds: 1748520000,
                milliseconds: 1748520000000,
                unit: TIMESTAMP_UNITS.milliseconds,
            });
            expect(parsed.date.toISOString()).toBe("2025-05-29T12:00:00.000Z");
        });

        it("allows whitespace and underscores as visual separators", () => {
            expect(parseTimestampInput("1_748_520_000", "seconds")).toMatchObject({
                seconds: 1748520000,
            });
            expect(parseTimestampInput("1 748 520 000", "seconds")).toMatchObject({
                seconds: 1748520000,
            });
        });

        it("rejects timestamps with locale thousands separators", () => {
            expect(parseTimestampInput("1,748,520,000", "seconds")).toBeNull();
            expect(parseTimestampInput("1.748.520.000", "seconds")).toBeNull();
        });

        it("rejects invalid or unsafe timestamps", () => {
            expect(parseTimestampInput("not-a-timestamp", "seconds")).toBeNull();
            expect(parseTimestampInput("123.45", "seconds")).toBeNull();
            expect(parseTimestampInput(String(Number.MAX_SAFE_INTEGER + 1), "milliseconds")).toBeNull();
        });
    });

    describe("parseDateTimeInput", () => {
        it("parses English date/time input as MM/DD/YYYY HH:mm", () => {
            const parsed = parseDateTimeInput("05/29/2025 14:30", "en");

            expect(parsed).toBeInstanceOf(Date);
            expect(parsed.getFullYear()).toBe(2025);
            expect(parsed.getMonth()).toBe(4);
            expect(parsed.getDate()).toBe(29);
            expect(parsed.getHours()).toBe(14);
            expect(parsed.getMinutes()).toBe(30);
        });

        it("parses Italian date/time input as DD/MM/YYYY HH:mm", () => {
            const parsed = parseDateTimeInput("29/05/2025 14:30", "it");

            expect(parsed).toBeInstanceOf(Date);
            expect(parsed.getFullYear()).toBe(2025);
            expect(parsed.getMonth()).toBe(4);
            expect(parsed.getDate()).toBe(29);
            expect(parsed.getHours()).toBe(14);
            expect(parsed.getMinutes()).toBe(30);
        });

        it("defaults missing time to midnight", () => {
            const parsed = parseDateTimeInput("05/29/2025", "en");

            expect(parsed.getHours()).toBe(0);
            expect(parsed.getMinutes()).toBe(0);
        });

        it("rejects impossible dates and invalid times", () => {
            expect(parseDateTimeInput("02/31/2025 12:00", "en")).toBeNull();
            expect(parseDateTimeInput("31/02/2025 12:00", "it")).toBeNull();
            expect(parseDateTimeInput("05/29/2025 24:00", "en")).toBeNull();
            expect(parseDateTimeInput("hello", "en")).toBeNull();
        });
    });

    describe("formatDateTimeInput", () => {
        it("formats a date for English input", () => {
            const date = new Date(2025, 4, 29, 14, 30, 0, 0);

            expect(formatDateTimeInput(date, "en")).toBe("05/29/2025 14:30");
        });

        it("formats a date for Italian input", () => {
            const date = new Date(2025, 4, 29, 14, 30, 0, 0);

            expect(formatDateTimeInput(date, "it")).toBe("29/05/2025 14:30");
        });

        it("returns an empty string for invalid dates", () => {
            expect(formatDateTimeInput(new Date("invalid"), "en")).toBe("");
        });
    });

    describe("getTimestampParts", () => {
        it("returns seconds and milliseconds for a valid date", () => {
            const date = new Date("2025-05-29T12:00:00.000Z");

            expect(getTimestampParts(date)).toEqual({
                seconds: 1748520000,
                milliseconds: 1748520000000,
            });
        });

        it("returns null for invalid dates", () => {
            expect(getTimestampParts(new Date("invalid"))).toBeNull();
        });
    });

    describe("buildTimestampToDateResult", () => {
        it("builds a timestamp-to-date result without thousands separators", () => {
            const result = buildTimestampToDateResult({
                value: "1748520000",
                unit: "seconds",
                locale: "en",
                labels,
            });

            expect(result.error).toBeNull();
            expect(result.lines).toEqual(
                expect.arrayContaining([
                    { label: "Seconds", value: "1748520000" },
                    { label: "Milliseconds", value: "1748520000000" },
                ]),
            );
            expect(result.copyText).toContain("Unix: 1748520000");
            expect(result.copyText).not.toContain("1,748");
        });

        it("returns an error for invalid timestamps", () => {
            expect(
                buildTimestampToDateResult({
                    value: "invalid",
                    unit: "seconds",
                    locale: "en",
                    labels,
                }),
            ).toEqual({ error: "Invalid timestamp" });
        });
    });

    describe("buildDateToTimestampResult", () => {
        it("builds a date-to-timestamp result without thousands separators", () => {
            const date = new Date(2025, 4, 29, 14, 30, 0, 0);
            const expectedMilliseconds = date.getTime();
            const expectedSeconds = Math.trunc(expectedMilliseconds / 1000);
            const result = buildDateToTimestampResult({
                value: "05/29/2025 14:30",
                locale: "en",
                labels,
            });

            expect(result.error).toBeNull();
            expect(result.lines).toEqual(
                expect.arrayContaining([
                    { label: "Seconds", value: String(expectedSeconds) },
                    { label: "Milliseconds", value: String(expectedMilliseconds) },
                ]),
            );
            expect(result.copyText).toContain(`Seconds: ${expectedSeconds}`);
            expect(result.copyText).toContain(
                `Milliseconds: ${expectedMilliseconds}`,
            );
            expect(result.copyText).not.toMatch(/\d,\d{3}/);
        });

        it("returns an error for invalid dates", () => {
            expect(
                buildDateToTimestampResult({
                    value: "02/31/2025 12:00",
                    locale: "en",
                    labels,
                }),
            ).toEqual({ error: "Invalid date" });
        });

        it("uses Italian parsing when locale is Italian", () => {
            const date = new Date(2025, 4, 29, 14, 30, 0, 0);
            const expectedSeconds = Math.trunc(date.getTime() / 1000);
            const result = buildDateToTimestampResult({
                value: "29/05/2025 14:30",
                locale: "it",
                labels,
            });

            expect(result.error).toBeNull();
            expect(result.lines).toEqual(
                expect.arrayContaining([
                    { label: "Seconds", value: String(expectedSeconds) },
                ]),
            );
        });
    });
});