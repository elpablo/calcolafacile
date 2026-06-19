// Require the "JSON at position" phrase (not just a bare "position N") so we
// don't misfire on engines that echo the offending input back inside the
// error message (newer V8 "... is not valid JSON" messages quote the input
// verbatim, which could itself contain the word "position").
const POSITION_PATTERN = /JSON at position (\d+)/i;
const FIREFOX_LINE_COLUMN_PATTERN =
    /at line (\d+) column (\d+) of the JSON data/i;

class JsonSyntaxScanError extends Error {
    constructor(position) {
        super("json-syntax-scan-error");
        this.position = position;
    }
}

export function formatJson(text) {
    if (typeof text !== "string" || !text.trim()) {
        return { formatted: null, error: null };
    }

    try {
        const parsed = JSON.parse(text);
        return {
            formatted: JSON.stringify(parsed, null, 2),
            error: null,
        };
    } catch (err) {
        const parsedError = parseJsonError(err?.message, text);
        const location =
            parsedError.line === null
                ? locateFallbackPosition(text)
                : parsedError;

        return {
            formatted: null,
            error: {
                ...parsedError,
                line: location.line,
                column: location.column,
                position: location.position,
                context: getErrorContext(text, location.line, location.column),
                pointerColumn: location.column,
            },
        };
    }
}

export function minifyJson(text) {
    if (typeof text !== "string" || !text.trim()) {
        return null;
    }

    try {
        return JSON.stringify(JSON.parse(text));
    } catch {
        return null;
    }
}

export function getJsonSize(text) {
    if (typeof text !== "string" || !text.trim()) {
        return null;
    }

    try {
        const bytes = new TextEncoder().encode(text).length;
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } catch {
        return null;
    }
}

// Native JSON.parse error messages differ by engine:
// - V8 (Chrome, Node) reports a 0-based character offset, e.g.
//   "Expected double-quoted property name in JSON at position 8
//   (line 1 column 9)".
// - SpiderMonkey (Firefox) reports a 1-based line/column directly, e.g.
//   "JSON.parse: unexpected character at line 2 column 4 of the JSON data".
// - JavaScriptCore (Safari/WebKit) reports neither, e.g.
//   "JSON Parse error: Unexpected EOF" or "JSON Parse error: Expected '}'".
// For that last case (and any other message we don't recognize) we fall
// back to a "no location" result rather than guessing. This function never
// throws, regardless of how malformed errorMessage/input are, so callers
// can always rely on its return shape.
export function parseJsonError(errorMessage, input) {
    const message = typeof errorMessage === "string" ? errorMessage : "";

    try {
        const positionMatch = message.match(POSITION_PATTERN);
        if (positionMatch) {
            const position = Number(positionMatch[1]);
            const { line, column } = positionToLineColumn(input, position);
            return { message, line, column, position };
        }

        const firefoxMatch = message.match(FIREFOX_LINE_COLUMN_PATTERN);
        if (firefoxMatch) {
            const line = Number(firefoxMatch[1]);
            const column = Number(firefoxMatch[2]);
            return {
                message,
                line,
                column,
                position: lineColumnToPosition(input, line, column),
            };
        }
    } catch {
        // Fall through to the no-location result below.
    }

    return { message, line: null, column: null, position: null };
}

export function getErrorContext(input, line, column, contextLines = 2) {
    if (typeof input !== "string" || !line) {
        return [];
    }

    const lines = input.split("\n");
    const startLine = Math.max(1, line - contextLines);
    const endLine = Math.min(lines.length, line + contextLines);

    const context = [];
    for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
        context.push({
            lineNumber,
            text: lines[lineNumber - 1] ?? "",
            isErrorLine: lineNumber === line,
        });
    }

    return context;
}

// Falls back to our own JSON syntax scan when the engine's error message
// carries no usable position (always true on Safari/JavaScriptCore, and
// true for some V8 message variants too, e.g. "Unexpected token 'x', ...
// is not valid JSON"). Scanning ourselves keeps the result consistent
// across every engine instead of leaving those users with no location at all.
function locateFallbackPosition(input) {
    const position = locateJsonSyntaxError(input);
    if (position === null) {
        return { line: null, column: null, position: null };
    }

    return { ...positionToLineColumn(input, position), position };
}

// Hand-rolled RFC 8259 scanner used only to *locate* the first syntax
// violation; JSON.parse (native) is still the source of truth for whether
// the input is valid. Verified to reproduce V8's own reported position in
// every case V8 provides one, and to find a sensible position in the cases
// it doesn't (which is exactly the gap this exists to fill).
export function locateJsonSyntaxError(input) {
    if (typeof input !== "string") {
        return null;
    }

    const len = input.length;
    let i = 0;

    const isWhitespace = (ch) =>
        ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
    const isDigit = (ch) => ch >= "0" && ch <= "9";

    function skipWhitespace() {
        while (i < len && isWhitespace(input[i])) i++;
    }

    function fail(position) {
        throw new JsonSyntaxScanError(position);
    }

    function parseValue() {
        skipWhitespace();
        if (i >= len) fail(i);

        const ch = input[i];
        if (ch === "{") return parseObject();
        if (ch === "[") return parseArray();
        if (ch === '"') return parseString();
        if (ch === "-" || isDigit(ch)) return parseNumber();
        if (input.startsWith("true", i)) {
            i += 4;
            return;
        }
        if (input.startsWith("false", i)) {
            i += 5;
            return;
        }
        if (input.startsWith("null", i)) {
            i += 4;
            return;
        }
        fail(i);
    }

    function parseObject() {
        i++; // consume '{'
        skipWhitespace();
        if (input[i] === "}") {
            i++;
            return;
        }
        while (true) {
            skipWhitespace();
            if (input[i] !== '"') fail(i);
            parseString();
            skipWhitespace();
            if (input[i] !== ":") fail(i);
            i++;
            parseValue();
            skipWhitespace();
            if (input[i] === ",") {
                i++;
                continue;
            }
            if (input[i] === "}") {
                i++;
                return;
            }
            fail(i);
        }
    }

    function parseArray() {
        i++; // consume '['
        skipWhitespace();
        if (input[i] === "]") {
            i++;
            return;
        }
        while (true) {
            parseValue();
            skipWhitespace();
            if (input[i] === ",") {
                i++;
                continue;
            }
            if (input[i] === "]") {
                i++;
                return;
            }
            fail(i);
        }
    }

    function parseString() {
        i++; // consume opening quote
        while (true) {
            if (i >= len) fail(i);
            const ch = input[i];
            if (ch === '"') {
                i++;
                return;
            }
            if (ch === "\\") {
                i++;
                const esc = input[i];
                if (esc === undefined) fail(i);
                if ('"\\/bfnrt'.includes(esc)) {
                    i++;
                } else if (esc === "u") {
                    for (let k = 1; k <= 4; k++) {
                        const hexChar = input[i + k];
                        if (
                            hexChar === undefined ||
                            !/^[0-9a-fA-F]$/.test(hexChar)
                        ) {
                            fail(i + k);
                        }
                    }
                    i += 5;
                } else {
                    fail(i);
                }
                continue;
            }
            if (ch.charCodeAt(0) < 0x20) fail(i);
            i++;
        }
    }

    function parseNumber() {
        if (input[i] === "-") i++;
        if (input[i] === "0") {
            i++;
        } else if (isDigit(input[i])) {
            i++;
            while (isDigit(input[i])) i++;
        } else {
            fail(i);
        }
        if (input[i] === ".") {
            i++;
            if (!isDigit(input[i])) fail(i);
            while (isDigit(input[i])) i++;
        }
        if (input[i] === "e" || input[i] === "E") {
            i++;
            if (input[i] === "+" || input[i] === "-") i++;
            if (!isDigit(input[i])) fail(i);
            while (isDigit(input[i])) i++;
        }
    }

    try {
        parseValue();
        skipWhitespace();
        if (i < len) fail(i);
        return null;
    } catch (err) {
        if (err instanceof JsonSyntaxScanError) {
            return err.position;
        }
        return null;
    }
}

function positionToLineColumn(input, position) {
    const safeInput = typeof input === "string" ? input : "";
    const clampedPosition = Math.max(0, Math.min(position, safeInput.length));
    const before = safeInput.slice(0, clampedPosition);
    const lastNewlineIndex = before.lastIndexOf("\n");

    return {
        line: before.split("\n").length,
        column: clampedPosition - lastNewlineIndex,
    };
}

function lineColumnToPosition(input, line, column) {
    const safeInput = typeof input === "string" ? input : "";
    const lines = safeInput.split("\n");

    let position = 0;
    for (let i = 0; i < line - 1 && i < lines.length; i++) {
        position += lines[i].length + 1;
    }

    return position + (column - 1);
}
