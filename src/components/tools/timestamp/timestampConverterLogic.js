export const TIMESTAMP_UNITS = {
    seconds: "seconds",
    milliseconds: "milliseconds",
};

export function normalizeTimestampUnit(unit) {
    return unit === TIMESTAMP_UNITS.milliseconds
        ? TIMESTAMP_UNITS.milliseconds
        : TIMESTAMP_UNITS.seconds;
}

export function parseTimestampInput(value, unit = TIMESTAMP_UNITS.seconds) {
    const normalizedUnit = normalizeTimestampUnit(unit);
    const normalizedValue = String(value ?? "").trim().replace(/[\s_]/g, "");

    if (!/^[-+]?\d+$/.test(normalizedValue)) {
        return null;
    }

    const numericValue = Number(normalizedValue);

    if (!Number.isSafeInteger(numericValue)) {
        return null;
    }

    const milliseconds =
        normalizedUnit === TIMESTAMP_UNITS.seconds
            ? numericValue * 1000
            : numericValue;
    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return {
        date,
        seconds: Math.trunc(milliseconds / 1000),
        milliseconds,
        unit: normalizedUnit,
    };
}

export function parseDateTimeInput(value, locale = "en") {
    const trimmed = String(value ?? "").trim();

    if (!trimmed) {
        return null;
    }

    const match = trimmed.match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2}))?$/,
    );

    if (!match) {
        return null;
    }

    const [, firstPart, secondPart, yearPart, hourPart = "0", minutePart = "0"] =
        match;
    const first = Number(firstPart);
    const second = Number(secondPart);
    const year = Number(yearPart);
    const hour = Number(hourPart);
    const minute = Number(minutePart);

    const isItalianLocale = String(locale).toLowerCase().startsWith("it");
    const day = isItalianLocale ? first : second;
    const month = isItalianLocale ? second : first;

    if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
    ) {
        return null;
    }

    const date = new Date(year, month - 1, day, hour, minute, 0, 0);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute
    ) {
        return null;
    }

    return date;
}

export function formatDateTimeInput(date, locale = "en") {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const isItalianLocale = String(locale).toLowerCase().startsWith("it");
    const datePart = isItalianLocale
        ? `${day}/${month}/${year}`
        : `${month}/${day}/${year}`;

    return `${datePart} ${hour}:${minute}`;
}

export function getTimestampParts(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return null;
    }

    const milliseconds = date.getTime();

    return {
        seconds: Math.trunc(milliseconds / 1000),
        milliseconds,
    };
}

export function getBrowserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function formatDate(date, locale = "en") {
    return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}

export function formatUtcDate(date, locale = "en") {
    return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}

export function getRelativeTime(date, locale = "en", labels = {}) {
    const diffMs = date.getTime() - Date.now();
    const absMs = Math.abs(diffMs);
    const units = [
        { unit: "year", ms: 365 * 24 * 60 * 60 * 1000 },
        { unit: "month", ms: 30 * 24 * 60 * 60 * 1000 },
        { unit: "day", ms: 24 * 60 * 60 * 1000 },
        { unit: "hour", ms: 60 * 60 * 1000 },
        { unit: "minute", ms: 60 * 1000 },
    ];
    const selected = units.find((item) => absMs >= item.ms);

    if (!selected) {
        return labels.now || (locale === "it" ? "ora" : "now");
    }

    const value = Math.round(diffMs / selected.ms);

    return new Intl.RelativeTimeFormat(locale === "it" ? "it" : "en", {
        numeric: "auto",
    }).format(value, selected.unit);
}

export function buildTimestampToDateResult({
    value,
    unit,
    locale = "en",
    labels = {},
}) {
    const parsed = parseTimestampInput(value, unit);

    if (!parsed) {
        return { error: labels.invalidTimestamp || "Invalid timestamp" };
    }

    const { date, seconds, milliseconds } = parsed;

    return {
        error: null,
        lines: [
            { label: labels.localDateTime, value: formatDate(date, locale) },
            { label: labels.utcDateTime, value: formatUtcDate(date, locale) },
            { label: "ISO", value: date.toISOString() },
            { label: labels.timezone || "Timezone", value: getBrowserTimezone() },
            { label: labels.relative, value: getRelativeTime(date, locale, labels) },
            { label: labels.units.secondsFull, value: String(seconds) },
            { label: labels.units.millisecondsFull, value: String(milliseconds) },
        ],
        copyText: `${labels.localDateTime}: ${formatDate(date, locale)}\n${labels.utcDateTime}: ${formatUtcDate(date, locale)}\nISO: ${date.toISOString()}\nUnix: ${seconds}`,
    };
}

export function buildDateToTimestampResult({ value, locale = "en", labels = {} }) {
    const date = parseDateTimeInput(value, locale);

    if (!date) {
        return { error: labels.invalidDate || "Invalid date" };
    }

    const { seconds, milliseconds } = getTimestampParts(date);

    return {
        error: null,
        lines: [
            { label: labels.units.secondsFull, value: String(seconds) },
            { label: labels.units.millisecondsFull, value: String(milliseconds) },
            { label: labels.localDateTime, value: formatDate(date, locale) },
            { label: labels.utcDateTime, value: formatUtcDate(date, locale) },
            { label: "ISO", value: date.toISOString() },
            { label: labels.timezone || "Timezone", value: getBrowserTimezone() },
            { label: labels.relative, value: getRelativeTime(date, locale, labels) },
        ],
        copyText: `${labels.units.secondsFull}: ${seconds}\n${labels.units.millisecondsFull}: ${milliseconds}\n${labels.localDateTime}: ${formatDate(date, locale)}\n${labels.utcDateTime}: ${formatUtcDate(date, locale)}\nISO: ${date.toISOString()}`,
    };
}