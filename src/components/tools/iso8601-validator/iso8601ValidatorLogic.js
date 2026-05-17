const ISO8601_PATTERN =
    /^\d{4}-\d{2}-\d{2}(?:[Tt ]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:[Zz]|[+-]\d{2}:?\d{2})?)?$/;

function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getDaysInMonth(year, month) {
    const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1] ?? 0;
}

function normalizeTimezoneOffset(offset) {
    if (!offset || offset.toUpperCase() === "Z") {
        return offset ? "Z" : null;
    }

    const compactMatch = offset.match(/^([+-]\d{2})(\d{2})$/);
    if (compactMatch) {
        return `${compactMatch[1]}:${compactMatch[2]}`;
    }

    return offset;
}

function parseTimezoneOffsetMinutes(offset) {
    if (!offset || offset.toUpperCase() === "Z") {
        return 0;
    }

    const normalized = normalizeTimezoneOffset(offset);
    const match = normalized.match(/^([+-])(\d{2}):(\d{2})$/);

    if (!match) {
        return null;
    }

    const sign = match[1] === "+" ? 1 : -1;
    const hours = Number.parseInt(match[2], 10);
    const minutes = Number.parseInt(match[3], 10);

    if (hours > 23 || minutes > 59) {
        return null;
    }

    return sign * (hours * 60 + minutes);
}

function pad(value, size = 2) {
    return String(value).padStart(size, "0");
}

function formatUtcDate(date) {
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.${String(date.getUTCMilliseconds()).padStart(3, "0")}Z`;
}

/**
 * Validate and parse an ISO8601-like date/time string.
 *
 * Supported inputs:
 * - YYYY-MM-DD
 * - YYYY-MM-DDTHH:mm
 * - YYYY-MM-DDTHH:mm:ss
 * - YYYY-MM-DDTHH:mm:ss.sss
 * - optional Z or ±HH:mm / ±HHmm timezone offsets
 *
 * @param {string} value
 */
export function validateIso8601(value) {
    const input = String(value ?? "").trim();

    if (!input) {
        return {
            isValid: false,
            input,
            errorCode: "empty",
            errorMessage: "Value is empty.",
        };
    }

    if (!ISO8601_PATTERN.test(input)) {
        return {
            isValid: false,
            input,
            errorCode: "format",
            errorMessage: "Value does not match a supported ISO8601 format.",
        };
    }

    const match = input.match(
        /^(\d{4})-(\d{2})-(\d{2})(?:[Tt ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,9}))?)?([Zz]|[+-]\d{2}:?\d{2})?)?$/,
    );

    if (!match) {
        return {
            isValid: false,
            input,
            errorCode: "format",
            errorMessage: "Value does not match a supported ISO8601 format.",
        };
    }

    const year = Number.parseInt(match[1], 10);
    const month = Number.parseInt(match[2], 10);
    const day = Number.parseInt(match[3], 10);
    const hasTime = match[4] !== undefined;
    const hour = hasTime ? Number.parseInt(match[4], 10) : 0;
    const minute = hasTime ? Number.parseInt(match[5], 10) : 0;
    const second = match[6] !== undefined ? Number.parseInt(match[6], 10) : 0;
    const fraction = match[7] ?? "";
    const timezone = normalizeTimezoneOffset(match[8]);

    if (month < 1 || month > 12) {
        return {
            isValid: false,
            input,
            errorCode: "month",
            errorMessage: "Month must be between 01 and 12.",
        };
    }

    const maxDay = getDaysInMonth(year, month);
    if (day < 1 || day > maxDay) {
        return {
            isValid: false,
            input,
            errorCode: "day",
            errorMessage: "Day is not valid for the selected month.",
        };
    }

    if (hour > 23 || minute > 59 || second > 59) {
        return {
            isValid: false,
            input,
            errorCode: "time",
            errorMessage: "Time values are outside the supported range.",
        };
    }

    const timezoneOffsetMinutes = parseTimezoneOffsetMinutes(timezone);
    if (timezoneOffsetMinutes === null) {
        return {
            isValid: false,
            input,
            errorCode: "timezone",
            errorMessage: "Timezone offset is outside the supported range.",
        };
    }

    const milliseconds = fraction
        ? Number.parseInt(fraction.padEnd(3, "0").slice(0, 3), 10)
        : 0;

    const utcTimestamp = Date.UTC(year, month - 1, day, hour, minute, second, milliseconds)
        - timezoneOffsetMinutes * 60 * 1000;
    const utcDate = new Date(utcTimestamp);

    return {
        isValid: true,
        input,
        errorCode: null,
        errorMessage: null,
        parts: {
            year,
            month,
            day,
            hasTime,
            hour,
            minute,
            second,
            fraction,
            timezone,
            timezoneOffsetMinutes,
        },
        normalized: hasTime
            ? `${pad(year, 4)}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}${fraction ? `.${fraction}` : ""}${timezone ?? ""}`
            : `${pad(year, 4)}-${pad(month)}-${pad(day)}`,
        utc: hasTime || timezone ? formatUtcDate(utcDate) : null,
        unixSeconds: Math.floor(utcTimestamp / 1000),
        unixMilliseconds: utcTimestamp,
    };
}
