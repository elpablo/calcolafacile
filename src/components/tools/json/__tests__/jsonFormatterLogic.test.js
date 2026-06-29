import { describe, expect, it } from "vitest";

import {
    formatJson,
    getErrorContext,
    getJsonSize,
    locateJsonSyntaxError,
    minifyJson,
    parseJsonError,
    repairJson,
    sortObjectKeysDeep,
} from "../jsonFormatterLogic";

describe("jsonFormatterLogic", () => {
    describe("formatJson", () => {
        it("formats valid JSON with two-space indentation", () => {
            const result = formatJson('{"name":"John","age":30}');

            expect(result.error).toBeNull();
            expect(result.formatted).toBe(
                '{\n  "name": "John",\n  "age": 30\n}',
            );
        });

        it("formats already pretty JSON without changes to structure", () => {
            const result = formatJson(
                '{\n  "a": 1,\n  "b": [1, 2, 3]\n}',
            );

            expect(result.error).toBeNull();
            expect(JSON.parse(result.formatted)).toEqual({
                a: 1,
                b: [1, 2, 3],
            });
        });

        it("returns null formatted output and structured error for invalid JSON", () => {
            const result = formatJson('{"name":"John", age:30}');

            expect(result.formatted).toBeNull();
            expect(result.error).not.toBeNull();
            expect(typeof result.error.message).toBe("string");
            expect(Array.isArray(result.error.context)).toBe(true);
        });

        it("computes line and column for a multi-line input error", () => {
            const input = '{\n  "a": 1,\n  "b": 2,\n}';
            const result = formatJson(input);

            expect(result.error.line).toBe(4);
            expect(result.error.column).toBe(1);
            expect(result.error.pointerColumn).toBe(1);
        });

        it("includes a context preview around the error line", () => {
            const input = '{\n  "a": 1,\n  "b": 2,\n}';
            const result = formatJson(input);

            expect(result.error.context).toEqual([
                { lineNumber: 2, text: '  "a": 1,', isErrorLine: false },
                { lineNumber: 3, text: '  "b": 2,', isErrorLine: false },
                { lineNumber: 4, text: "}", isErrorLine: true },
            ]);
        });

        it("treats empty input as no result and no error", () => {
            expect(formatJson("")).toEqual({ formatted: null, error: null });
        });

        it("treats whitespace-only input as no result and no error", () => {
            expect(formatJson("   \n  ")).toEqual({
                formatted: null,
                error: null,
            });
        });

        it("falls back to its own scan when the native message has no position", () => {
            // V8's own message for this input is `"undefined" is not valid
            // JSON` with no position at all (the same situation Safari is
            // always in). formatJson should still locate the error itself.
            const result = formatJson("undefined");

            expect(result.formatted).toBeNull();
            expect(result.error.line).toBe(1);
            expect(result.error.column).toBe(1);
            expect(result.error.position).toBe(0);
            expect(result.error.context).toEqual([
                { lineNumber: 1, text: "undefined", isErrorLine: true },
            ]);
            expect(result.error.pointerColumn).toBe(1);
        });

        it("falls back to its own scan for trailing-comma errors with no native position", () => {
            // V8 reports `Unexpected token ']', "[1,]" is not valid JSON`
            // here, with no position either.
            const result = formatJson("[1,]");

            expect(result.error.line).toBe(1);
            expect(result.error.column).toBe(4);
            expect(result.error.position).toBe(3);
        });

        it("does not sort keys by default", () => {
            const result = formatJson('{"b": 1, "a": 2}');

            expect(result.formatted).toBe('{\n  "b": 1,\n  "a": 2\n}');
        });

        it("sorts object keys alphabetically when sortKeys is true", () => {
            const result = formatJson('{"b": 1, "a": 2}', { sortKeys: true });

            expect(result.formatted).toBe('{\n  "a": 2,\n  "b": 1\n}');
        });

        it("sorts nested object keys and preserves array order when sortKeys is true", () => {
            const result = formatJson(
                '{"z": [{"b": 1, "a": 2}, {"d": 3, "c": 4}], "y": {"b": 1, "a": 2}}',
                { sortKeys: true },
            );

            expect(JSON.parse(result.formatted)).toEqual({
                y: { a: 2, b: 1 },
                z: [
                    { a: 2, b: 1 },
                    { c: 4, d: 3 },
                ],
            });
            expect(result.formatted.indexOf('"y"')).toBeLessThan(
                result.formatted.indexOf('"z"'),
            );
        });
    });

    describe("minifyJson", () => {
        it("minifies valid JSON", () => {
            expect(
                minifyJson('{\n  "name": "John",\n  "age": 30\n}'),
            ).toBe('{"name":"John","age":30}');
        });

        it("returns null for invalid JSON", () => {
            expect(minifyJson("{not valid}")).toBeNull();
        });

        it("returns null for empty input", () => {
            expect(minifyJson("")).toBeNull();
        });

        it("does not sort keys by default", () => {
            expect(minifyJson('{"b": 1, "a": 2}')).toBe('{"b":1,"a":2}');
        });

        it("sorts object keys alphabetically when sortKeys is true", () => {
            expect(minifyJson('{"b": 1, "a": 2}', { sortKeys: true })).toBe(
                '{"a":2,"b":1}',
            );
        });

        it("sorts keys of objects nested inside arrays when sortKeys is true", () => {
            const result = minifyJson(
                '[{"b": 1, "a": 2}, {"d": 3, "c": 4}]',
                { sortKeys: true },
            );

            expect(result).toBe('[{"a":2,"b":1},{"c":4,"d":3}]');
        });
    });

    describe("sortObjectKeysDeep", () => {
        it("sorts keys of a flat object alphabetically", () => {
            expect(sortObjectKeysDeep({ b: 1, a: 2, c: 3 })).toEqual({
                a: 2,
                b: 1,
                c: 3,
            });
            expect(Object.keys(sortObjectKeysDeep({ b: 1, a: 2, c: 3 }))).toEqual(
                ["a", "b", "c"],
            );
        });

        it("sorts keys recursively in nested objects", () => {
            const input = { z: { d: 1, b: { y: 1, x: 2 }, a: 2 }, m: 1 };

            const result = sortObjectKeysDeep(input);

            expect(Object.keys(result)).toEqual(["m", "z"]);
            expect(Object.keys(result.z)).toEqual(["a", "b", "d"]);
            expect(Object.keys(result.z.b)).toEqual(["x", "y"]);
        });

        it("preserves array element order", () => {
            const input = [3, 1, 2, "z", "a"];

            expect(sortObjectKeysDeep(input)).toEqual([3, 1, 2, "z", "a"]);
        });

        it("sorts keys of objects nested inside arrays without reordering the array", () => {
            const input = [
                { b: 1, a: 2 },
                { d: 3, c: 4 },
            ];

            const result = sortObjectKeysDeep(input);

            expect(result).toEqual([
                { a: 2, b: 1 },
                { c: 4, d: 3 },
            ]);
            expect(Object.keys(result[0])).toEqual(["a", "b"]);
            expect(Object.keys(result[1])).toEqual(["c", "d"]);
        });

        it("does not modify primitive values", () => {
            expect(sortObjectKeysDeep("hello")).toBe("hello");
            expect(sortObjectKeysDeep(42)).toBe(42);
            expect(sortObjectKeysDeep(true)).toBe(true);
            expect(sortObjectKeysDeep(false)).toBe(false);
        });

        it("returns null unchanged for a top-level null value", () => {
            expect(sortObjectKeysDeep(null)).toBeNull();
        });

        it("treats null values inside objects safely instead of throwing", () => {
            expect(sortObjectKeysDeep({ b: null, a: 1 })).toEqual({
                a: 1,
                b: null,
            });
        });

        it("treats null values inside arrays safely instead of throwing", () => {
            expect(sortObjectKeysDeep([null, { b: 1, a: 2 }, null])).toEqual([
                null,
                { a: 2, b: 1 },
                null,
            ]);
        });

        it("leaves canonical numeric-looking keys in ascending numeric order, since that ordering is intrinsic to plain JS objects", () => {
            // "10" and "2" are canonical array-index strings. Per the JS
            // spec, plain objects always enumerate such keys in ascending
            // numeric order ahead of any other string keys, regardless of
            // insertion order -- so this is unaffected by our .sort() call,
            // which produces ["10", "2"] internally but is overridden by
            // the engine's own key-ordering rules on read-back.
            const result = sortObjectKeysDeep({ "10": "ten", "2": "two" });

            expect(Object.keys(result)).toEqual(["2", "10"]);
        });

        it("applies alphabetical order to non-canonical numeric-looking keys", () => {
            // "1.5" and "2.5" are numeric-looking but not canonical
            // array-index strings, so they remain ordinary string keys and
            // our alphabetical sort is the one that determines their order.
            const result = sortObjectKeysDeep({ "2.5": "b", "1.5": "a" });

            expect(Object.keys(result)).toEqual(["1.5", "2.5"]);
        });

        it("sorts keys case-sensitively (uppercase before lowercase)", () => {
            const result = sortObjectKeysDeep({ name: 1, Name: 2, NAME: 3 });

            expect(Object.keys(result)).toEqual(["NAME", "Name", "name"]);
        });

        it("does not mutate the original input", () => {
            const input = { b: 1, a: { d: 2, c: 3 } };
            const inputCopy = JSON.parse(JSON.stringify(input));

            sortObjectKeysDeep(input);

            expect(input).toEqual(inputCopy);
            expect(Object.keys(input)).toEqual(["b", "a"]);
        });

        it("leaves string values, including date-like strings, untouched", () => {
            const result = sortObjectKeysDeep({
                b: "2024-01-15T10:00:00.000Z",
                a: "plain text",
            });

            expect(result).toEqual({
                a: "plain text",
                b: "2024-01-15T10:00:00.000Z",
            });
        });

        it("does not let a literal __proto__ key pollute the result's prototype", () => {
            const input = JSON.parse('{"b": 1, "__proto__": {"a": 2}}');

            const result = sortObjectKeysDeep(input);

            expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
            expect(Object.keys(result)).toEqual(["__proto__", "b"]);
            expect(result.b).toBe(1);
        });
    });

    describe("getJsonSize", () => {
        it("returns null for empty input", () => {
            expect(getJsonSize("")).toBeNull();
            expect(getJsonSize("   ")).toBeNull();
        });

        it("formats small payloads in bytes", () => {
            expect(getJsonSize('{"a":1}')).toBe("7 B");
        });

        it("formats payloads over 1KB in KB", () => {
            const input = `{"a":"${"x".repeat(2000)}"}`;
            expect(getJsonSize(input)).toBe(
                `${(new TextEncoder().encode(input).length / 1024).toFixed(1)} KB`,
            );
        });

        it("formats payloads over 1MB in MB", () => {
            const input = `{"a":"${"x".repeat(2 * 1024 * 1024)}"}`;
            const bytes = new TextEncoder().encode(input).length;
            expect(getJsonSize(input)).toBe(
                `${(bytes / (1024 * 1024)).toFixed(1)} MB`,
            );
        });
    });

    describe("parseJsonError", () => {
        it("extracts position and computes line/column for V8-style messages", () => {
            const input = '{"a": 1,}';
            const message =
                "Expected double-quoted property name in JSON at position 8 (line 1 column 9)";

            const result = parseJsonError(message, input);

            expect(result).toEqual({
                message,
                line: 1,
                column: 9,
                position: 8,
            });
        });

        it("computes multi-line position info from a position-only message", () => {
            const input = '{\n  "a": 1\n  "b": 2\n}';
            const message =
                "Expected ',' or '}' after property value in JSON at position 13";

            const result = parseJsonError(message, input);

            expect(result.position).toBe(13);
            expect(result.line).toBe(3);
            expect(result.column).toBe(3);
        });

        it("extracts line/column from Firefox-style messages", () => {
            const input = '{\n  "a": 1,\n  "b": 2,\n}';
            const message =
                "JSON.parse: unexpected character at line 4 column 1 of the JSON data";

            const result = parseJsonError(message, input);

            expect(result.line).toBe(4);
            expect(result.column).toBe(1);
            expect(result.position).toBe(22);
        });

        it("returns null location info when the message has no position data", () => {
            const message =
                "Unexpected token '.', \"{\"a\": .5}\" is not valid JSON";

            const result = parseJsonError(message, '{"a": .5}');

            expect(result).toEqual({
                message,
                line: null,
                column: null,
                position: null,
            });
        });

        it("returns null location info for end-of-input errors", () => {
            const result = parseJsonError("Unexpected end of JSON input", "{");

            expect(result.line).toBeNull();
            expect(result.column).toBeNull();
            expect(result.position).toBeNull();
        });

        describe("Safari/JavaScriptCore messages", () => {
            const safariMessages = [
                "JSON Parse error: Unexpected EOF",
                "JSON Parse error: Unexpected token",
                'JSON Parse error: Unexpected identifier "age"',
                "JSON Parse error: Expected '}'",
                "JSON Parse error: Expected ':' before value in object property definition",
                "JSON Parse error: Trailing comma not allowed in object",
                "JSON Parse error: Unexpected non-whitespace character after JSON",
            ];

            it.each(safariMessages)(
                "returns a null-location result for %s",
                (message) => {
                    const result = parseJsonError(message, '{"a": 1,}');

                    expect(result).toEqual({
                        message,
                        line: null,
                        column: null,
                        position: null,
                    });
                },
            );
        });

        it("never throws for malformed errorMessage/input arguments", () => {
            const weirdValues = [
                undefined,
                null,
                42,
                {},
                [],
                () => "x",
                Symbol("x"),
            ];

            for (const errorMessage of weirdValues) {
                for (const input of weirdValues) {
                    expect(() =>
                        parseJsonError(errorMessage, input),
                    ).not.toThrow();
                }
            }
        });

        it("does not mistake an echoed JSON snippet for a real position", () => {
            // Newer V8 "is not valid JSON" messages quote the offending
            // input verbatim. If that input happens to contain the word
            // "position" followed by digits, a naive /position (\d+)/
            // match would misreport that as the error location.
            const input = '{"position": 5, "bad": .5}';
            const message = `Unexpected token '.', "${input}" is not valid JSON`;

            const result = parseJsonError(message, input);

            expect(result).toEqual({
                message,
                line: null,
                column: null,
                position: null,
            });
        });
    });

    describe("getErrorContext", () => {
        const input = "line1\nline2\nline3\nline4\nline5";

        it("returns an empty array when there is no error line", () => {
            expect(getErrorContext(input, null, null)).toEqual([]);
        });

        it("returns a window of lines around the error line", () => {
            const context = getErrorContext(input, 3, 1, 1);

            expect(context).toEqual([
                { lineNumber: 2, text: "line2", isErrorLine: false },
                { lineNumber: 3, text: "line3", isErrorLine: true },
                { lineNumber: 4, text: "line4", isErrorLine: false },
            ]);
        });

        it("clamps the window at the start of the input", () => {
            const context = getErrorContext(input, 1, 1, 2);

            expect(context.map((c) => c.lineNumber)).toEqual([1, 2, 3]);
            expect(context[0].isErrorLine).toBe(true);
        });

        it("clamps the window at the end of the input", () => {
            const context = getErrorContext(input, 5, 1, 2);

            expect(context.map((c) => c.lineNumber)).toEqual([3, 4, 5]);
            expect(context[2].isErrorLine).toBe(true);
        });

        it("defaults to a 2-line window on each side", () => {
            const context = getErrorContext(input, 3, 1);

            expect(context.map((c) => c.lineNumber)).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe("locateJsonSyntaxError", () => {
        // Each expected position was cross-checked against Node's own V8
        // JSON.parse error for the same input, so this scanner agrees with
        // the engine whenever the engine reports a position at all.
        const cases = [
            ['{"a": 1,}', 8],
            ["{a: 1}", 1],
            ['{"a" 1}', 5],
            ["{", 1],
            ['"abc', 4],
            ['{"a": "unterminated', 19],
            ['{"a": 01}', 7],
            ["{} extra", 3],
            ["[1 2]", 3],
            ['{"name":"John", age:30}', 16],
            ['{"a": "bad\\q"}', 11],
            ['{"a": "bad\\u12zz"}', 14],
            ["{\n  \"a\": 1,\n  \"b\": 1,\n}", 22],
            ['{"a": .5}', 6],
            ["undefined", 0],
            ["[1,]", 3],
            ['{"a": -}', 7],
        ];

        it.each(cases)("locates the error in %s at position %i", (input, expectedPosition) => {
            expect(locateJsonSyntaxError(input)).toBe(expectedPosition);
        });

        it("returns null for syntactically valid JSON", () => {
            expect(locateJsonSyntaxError('{"a": [1, 2, 3]}')).toBeNull();
        });

        it("returns null for non-string input instead of throwing", () => {
            expect(locateJsonSyntaxError(null)).toBeNull();
            expect(locateJsonSyntaxError(undefined)).toBeNull();
            expect(locateJsonSyntaxError(42)).toBeNull();
            expect(locateJsonSyntaxError({})).toBeNull();
        });

        it("does not crash on deeply nested input", () => {
            const input = "[".repeat(500);
            expect(() => locateJsonSyntaxError(input)).not.toThrow();
        });
    });

    describe("repairJson", () => {
        it("removes trailing commas before } or ]", () => {
            const result = repairJson('{"a": 1, "b": [1, 2,],}');

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toContain("Removed trailing commas");
            expect(JSON.parse(result.repaired)).toEqual({ a: 1, b: [1, 2] });
        });

        it("removes // line comments and /* block comments */", () => {
            const result = repairJson(
                '{\n  // who\n  "a": 1, /* inline */\n  "b": 2\n}',
            );

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toContain(
                "Removed JavaScript-style comments",
            );
            expect(JSON.parse(result.repaired)).toEqual({ a: 1, b: 2 });
        });

        it("does not treat // inside a string value as a comment", () => {
            const result = repairJson(
                '{"url": "http://example.com", "b": 2,}',
            );

            expect(result.error).toBeNull();
            expect(result.appliedFixes).not.toContain(
                "Removed JavaScript-style comments",
            );
            expect(JSON.parse(result.repaired)).toEqual({
                url: "http://example.com",
                b: 2,
            });
        });

        it("removes a trailing comma left behind by a stripped comment", () => {
            const result = repairJson('{"a": 1, // trailing\n}');

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toEqual(
                expect.arrayContaining([
                    "Removed JavaScript-style comments",
                    "Removed trailing commas",
                ]),
            );
            expect(JSON.parse(result.repaired)).toEqual({ a: 1 });
        });

        it("quotes simple unquoted object keys", () => {
            const result = repairJson('{ name: "Mario", age: 42 }');

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toContain(
                "Quoted unquoted object keys",
            );
            expect(JSON.parse(result.repaired)).toEqual({
                name: "Mario",
                age: 42,
            });
        });

        it("converts safe single-quoted strings (keys and values) to double-quoted", () => {
            const result = repairJson("{'name': 'Mario'}");

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toContain(
                "Converted safe single-quoted strings to double-quoted strings",
            );
            expect(JSON.parse(result.repaired)).toEqual({ name: "Mario" });
        });

        it("unescapes \\' and leaves other escapes untouched when converting quotes", () => {
            const result = repairJson("{\"a\": 'it\\'s a \\ttest'}");

            expect(result.error).toBeNull();
            expect(JSON.parse(result.repaired)).toEqual({
                a: "it's a \ttest",
            });
        });

        it("does not convert a single-quoted string containing an unescaped double quote", () => {
            const result = repairJson(
                '{"a": \'has "quotes" inside\'}',
            );

            expect(result.repaired).toBeNull();
            expect(result.partialRepaired).toBeNull();
            expect(result.isFullyValid).toBe(false);
            expect(result.appliedFixes).toEqual([]);
            expect(typeof result.error).toBe("string");
        });

        it("removes a leading BOM", () => {
            const result = repairJson('﻿{"a": 1}');

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toContain(
                "Removed BOM or invisible leading characters",
            );
            expect(JSON.parse(result.repaired)).toEqual({ a: 1 });
        });

        it("combines multiple fixes in one pass", () => {
            const result = repairJson(
                "﻿{ name: 'Mario', /* note */ age: 42, }",
            );

            expect(result.error).toBeNull();
            expect(result.appliedFixes).toEqual(
                expect.arrayContaining([
                    "Removed BOM or invisible leading characters",
                    "Removed JavaScript-style comments",
                    "Converted safe single-quoted strings to double-quoted strings",
                    "Removed trailing commas",
                    "Quoted unquoted object keys",
                ]),
            );
            expect(JSON.parse(result.repaired)).toEqual({
                name: "Mario",
                age: 42,
            });
        });

        it("returns null for ambiguous invalid JSON with no safe fix", () => {
            const result = repairJson('{"a": 1');

            expect(result.repaired).toBeNull();
            expect(result.appliedFixes).toEqual([]);
            expect(typeof result.error).toBe("string");
        });

        it("returns null when a double comma is found (not a supported fix)", () => {
            const result = repairJson('{"a": 1,, "b": 2}');

            expect(result.repaired).toBeNull();
            expect(result.appliedFixes).toEqual([]);
        });

        it("returns repaired JSON that is itself valid JSON.parse input", () => {
            const result = repairJson("{ name: 'Mario', age: 42, }");

            expect(result.repaired).not.toBeNull();
            expect(() => JSON.parse(result.repaired)).not.toThrow();
        });

        it("never invents missing brackets", () => {
            const result = repairJson('{"a": [1, 2, 3');

            expect(result.repaired).toBeNull();
        });

        it("treats empty input as nothing to repair", () => {
            const result = repairJson("");

            expect(result.repaired).toBeNull();
            expect(result.partialRepaired).toBeNull();
            expect(result.isFullyValid).toBe(false);
            expect(result.appliedFixes).toEqual([]);
            expect(typeof result.error).toBe("string");
        });

        it("does not throw for non-string input", () => {
            expect(() => repairJson(null)).not.toThrow();
            expect(() => repairJson(undefined)).not.toThrow();
            expect(() => repairJson(42)).not.toThrow();
        });

        describe("partial repair", () => {
            it("returns isFullyValid true with repaired === partialRepaired for fully repairable JSON", () => {
                const result = repairJson("{ name: 'Mario', age: 42, }");

                expect(result.isFullyValid).toBe(true);
                expect(result.error).toBeNull();
                expect(result.repaired).not.toBeNull();
                expect(result.partialRepaired).toBe(result.repaired);
                expect(JSON.parse(result.repaired)).toEqual({
                    name: "Mario",
                    age: 42,
                });
            });

            it("returns partialRepaired when safe fixes apply but an unrelated error remains", () => {
                // Comment and trailing comma are both safely fixable, but
                // the missing ':' after "b" is a genuine, unrelated syntax
                // error we must not try to guess our way out of.
                const result = repairJson(
                    '{\n  // comment\n  "a": 1,\n  "b" 2,\n}',
                );

                expect(result.isFullyValid).toBe(false);
                expect(result.repaired).toBeNull();
                expect(result.partialRepaired).not.toBeNull();
                expect(result.appliedFixes).toEqual(
                    expect.arrayContaining([
                        "Removed JavaScript-style comments",
                        "Removed trailing commas",
                    ]),
                );
                expect(typeof result.error).toBe("string");
                expect(() => JSON.parse(result.partialRepaired)).toThrow();
            });

            it("returns no partialRepaired when no safe fix is available at all", () => {
                const result = repairJson('{"a": 1');

                expect(result.isFullyValid).toBe(false);
                expect(result.repaired).toBeNull();
                expect(result.partialRepaired).toBeNull();
                expect(result.appliedFixes).toEqual([]);
                expect(typeof result.error).toBe("string");
            });
        });
    });
});
