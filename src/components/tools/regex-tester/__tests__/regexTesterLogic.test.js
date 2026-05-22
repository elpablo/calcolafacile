import { describe, expect, it } from "vitest";

import {
    buildRegexTesterQueryParams,
    normalizeRegexTesterInput,
    parseRegexTesterQueryParams,
    SAFE_MATCH_LIMIT,
    SUPPORTED_FLAGS,
    testRegex,
} from "../regexTesterLogic";

describe("regexTesterLogic", () => {
    describe("normalizeRegexTesterInput", () => {
        it("normalizes pattern, flags and text", () => {
            const result = normalizeRegexTesterInput({
                pattern: "\\d+",
                flags: "ggiix",
                testText: 12345,
            });

            expect(result).toEqual({
                pattern: "\\d+",
                flags: "gi",
                testText: "12345",
            });
        });

        it("keeps only supported flags", () => {
            const result = normalizeRegexTesterInput({
                flags: "gimsuyxyz",
            });

            expect(result.flags).toBe(SUPPORTED_FLAGS.join(""));
        });
    });

    describe("testRegex", () => {
        it("finds matches with groups", () => {
            const result = testRegex({
                pattern: "(foo)-(bar)",
                flags: "g",
                testText: "foo-bar baz foo-bar",
            });

            expect(result.isValid).toBe(true);
            expect(result.matchCount).toBe(2);
            expect(result.hasMatches).toBe(true);
            expect(result.matches[0].value).toBe("foo-bar");
            expect(result.matches[0].groups).toEqual([
                { index: 1, value: "foo" },
                { index: 2, value: "bar" },
            ]);
        });

        it("supports named groups", () => {
            const result = testRegex({
                pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
                flags: "g",
                testText: "2026-05-22",
            });

            expect(result.matchCount).toBe(1);
            expect(result.matches[0].namedGroups).toEqual({
                year: "2026",
                month: "05",
                day: "22",
            });
        });

        it("returns line and column information", () => {
            const result = testRegex({
                pattern: "world",
                flags: "g",
                testText: "hello\nworld",
            });

            expect(result.matches[0].line).toBe(2);
            expect(result.matches[0].column).toBe(1);
        });

        it("handles invalid regular expressions", () => {
            const result = testRegex({
                pattern: "(",
                flags: "g",
                testText: "test",
            });

            expect(result.isValid).toBe(false);
            expect(result.errorCode).toBe("invalid-pattern");
            expect(result.matchCount).toBe(0);
        });

        it("handles empty patterns", () => {
            const result = testRegex({
                pattern: "   ",
                flags: "g",
                testText: "test",
            });

            expect(result.isValid).toBe(false);
            expect(result.errorCode).toBe("empty-pattern");
        });

        it("returns no matches when nothing matches", () => {
            const result = testRegex({
                pattern: "cat",
                flags: "g",
                testText: "dog bird fish",
            });

            expect(result.isValid).toBe(true);
            expect(result.matchCount).toBe(0);
            expect(result.hasMatches).toBe(false);
        });

        it("prevents runaway matches", () => {
            const text = "a ".repeat(SAFE_MATCH_LIMIT + 20);

            const result = testRegex({
                pattern: "a",
                flags: "g",
                testText: text,
            });

            expect(result.matchCount).toBe(SAFE_MATCH_LIMIT);
            expect(result.reachedLimit).toBe(true);
        });

        it("handles regex without explicit global flag", () => {
            const result = testRegex({
                pattern: "foo",
                flags: "i",
                testText: "Foo foo",
            });

            expect(result.matchCount).toBe(2);
        });
    });

    describe("query params", () => {
        it("builds query params from input", () => {
            const query = buildRegexTesterQueryParams({
                pattern: "\\d+",
                flags: "gi",
                testText: "123 abc 456",
            });

            expect(query).toContain("pattern=%5Cd%2B");
            expect(query).toContain("flags=gi");
            expect(query).toContain("testText=123+abc+456");
        });

        it("parses query params", () => {
            const params = new URLSearchParams(
                "pattern=%5Cd%2B&flags=gi&testText=123%20abc%20456",
            );

            const result = parseRegexTesterQueryParams(params);

            expect(result).toEqual({
                pattern: "\\d+",
                flags: "gi",
                testText: "123 abc 456",
            });
        });
    });
});