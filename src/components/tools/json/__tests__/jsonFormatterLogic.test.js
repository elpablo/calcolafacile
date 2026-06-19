import { describe, expect, it } from "vitest";

import {
    formatJson,
    getErrorContext,
    getJsonSize,
    locateJsonSyntaxError,
    minifyJson,
    parseJsonError,
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
});
