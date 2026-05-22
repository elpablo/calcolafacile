const DEFAULT_OPTIONS = {
    pattern: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
    flags: "gi",
    testText: "Contact us at info@example.com or support@calcolafacile.org",
};

const SUPPORTED_FLAGS = ["g", "i", "m", "s", "u", "y"];
const SAFE_MATCH_LIMIT = 500;

function normalizePattern(value) {
    return String(value ?? DEFAULT_OPTIONS.pattern);
}

function normalizeTestText(value) {
    return String(value ?? DEFAULT_OPTIONS.testText);
}

function normalizeFlags(value) {
    const uniqueFlags = new Set();

    for (const flag of String(value ?? DEFAULT_OPTIONS.flags)) {
        if (SUPPORTED_FLAGS.includes(flag)) {
            uniqueFlags.add(flag);
        }
    }

    return [...uniqueFlags].join("");
}

function ensureGlobalFlag(flags) {
    return flags.includes("g") ? flags : `${flags}g`;
}

function compileRegex(pattern, flags) {
    try {
        return {
            regex: new RegExp(pattern, flags),
            error: null,
        };
    } catch (error) {
        return {
            regex: null,
            error: error instanceof Error ? error.message : "Invalid regular expression.",
        };
    }
}

function getLineAndColumn(text, index) {
    const before = text.slice(0, index);
    const lines = before.split("\n");

    return {
        line: lines.length,
        column: lines[lines.length - 1].length + 1,
    };
}

function normalizeMatch(match, index, text) {
    const start = match.index ?? 0;
    const value = match[0] ?? "";
    const end = start + value.length;
    const { line, column } = getLineAndColumn(text, start);

    return {
        index,
        value,
        start,
        end,
        line,
        column,
        groups: match.slice(1).map((groupValue, groupIndex) => ({
            index: groupIndex + 1,
            value: groupValue ?? null,
        })),
        namedGroups: match.groups ? { ...match.groups } : {},
    };
}

export function normalizeRegexTesterInput(input = {}) {
    return {
        pattern: normalizePattern(input.pattern),
        flags: normalizeFlags(input.flags),
        testText: normalizeTestText(input.testText),
    };
}

export function testRegex(input = {}) {
    const normalized = normalizeRegexTesterInput(input);
    const { pattern, flags, testText } = normalized;
    const executionFlags = ensureGlobalFlag(flags);
    const { regex, error } = compileRegex(pattern, executionFlags);

    if (!pattern.trim()) {
        return {
            input: normalized,
            isValid: false,
            errorCode: "empty-pattern",
            errorMessage: "Enter a regular expression pattern.",
            matches: [],
            matchCount: 0,
            hasMatches: false,
            reachedLimit: false,
        };
    }

    if (error) {
        return {
            input: normalized,
            isValid: false,
            errorCode: "invalid-pattern",
            errorMessage: error,
            matches: [],
            matchCount: 0,
            hasMatches: false,
            reachedLimit: false,
        };
    }

    const matches = [];
    let reachedLimit = false;
    let currentMatch = regex.exec(testText);

    while (currentMatch) {
        matches.push(normalizeMatch(currentMatch, matches.length + 1, testText));

        if (matches.length >= SAFE_MATCH_LIMIT) {
            reachedLimit = true;
            break;
        }

        if (currentMatch[0] === "") {
            regex.lastIndex += 1;
        }

        currentMatch = regex.exec(testText);
    }

    return {
        input: normalized,
        isValid: true,
        errorCode: null,
        errorMessage: null,
        matches,
        matchCount: matches.length,
        hasMatches: matches.length > 0,
        reachedLimit,
    };
}

export function buildRegexTesterQueryParams(input = {}) {
    const normalized = normalizeRegexTesterInput(input);
    const params = new URLSearchParams();

    params.set("pattern", normalized.pattern);
    params.set("flags", normalized.flags);
    params.set("testText", normalized.testText);

    return params.toString();
}

export function parseRegexTesterQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeRegexTesterInput({
        pattern: getValue("pattern"),
        flags: getValue("flags"),
        testText: getValue("testText"),
    });
}

export { DEFAULT_OPTIONS, SAFE_MATCH_LIMIT, SUPPORTED_FLAGS };