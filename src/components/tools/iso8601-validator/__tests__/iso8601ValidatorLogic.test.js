import { describe, expect, it } from "vitest";
import { validateIso8601 } from "../iso8601ValidatorLogic";

describe("validateIso8601", () => {
    it("accepts a valid date-only value", () => {
        const result = validateIso8601("2026-05-17");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2026-05-17");
        expect(result.utc).toBe(null);
        expect(result.parts.hasTime).toBe(false);
    });

    it("accepts a UTC datetime", () => {
        const result = validateIso8601("2026-05-17T14:30:00Z");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2026-05-17T14:30:00Z");
        expect(result.utc).toBe("2026-05-17T14:30:00.000Z");
        expect(result.parts.timezone).toBe("Z");
        expect(result.parts.timezoneOffsetMinutes).toBe(0);
    });

    it("accepts timezone offsets with a colon", () => {
        const result = validateIso8601("2026-05-17T14:30:00+02:00");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2026-05-17T14:30:00+02:00");
        expect(result.utc).toBe("2026-05-17T12:30:00.000Z");
        expect(result.parts.timezoneOffsetMinutes).toBe(120);
    });

    it("normalizes compact timezone offsets", () => {
        const result = validateIso8601("2026-05-17T14:30:00+0200");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2026-05-17T14:30:00+02:00");
        expect(result.utc).toBe("2026-05-17T12:30:00.000Z");
    });

    it("keeps fractional seconds and converts milliseconds", () => {
        const result = validateIso8601("2026-05-17T14:30:00.123Z");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2026-05-17T14:30:00.123Z");
        expect(result.utc).toBe("2026-05-17T14:30:00.123Z");
        expect(result.unixMilliseconds % 1000).toBe(123);
    });

    it("accepts leap day on leap years", () => {
        const result = validateIso8601("2024-02-29");

        expect(result.isValid).toBe(true);
        expect(result.normalized).toBe("2024-02-29");
    });

    it("rejects leap day on non-leap years", () => {
        const result = validateIso8601("2023-02-29");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("day");
    });

    it("rejects invalid months", () => {
        const result = validateIso8601("2026-13-17");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("month");
    });

    it("rejects invalid days", () => {
        const result = validateIso8601("2026-04-31");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("day");
    });

    it("rejects invalid time values", () => {
        const result = validateIso8601("2026-05-17T24:00:00Z");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("time");
    });

    it("rejects invalid timezone offsets", () => {
        const result = validateIso8601("2026-05-17T14:30:00+24:00");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("timezone");
    });

    it("rejects unsupported formats", () => {
        const result = validateIso8601("17/05/2026 14:30");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("format");
    });

    it("rejects empty values", () => {
        const result = validateIso8601("   ");

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe("empty");
    });
});