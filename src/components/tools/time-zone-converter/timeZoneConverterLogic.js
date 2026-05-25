export const TIME_ZONE_OPTIONS = [
    { value: "UTC", label: "UTC" },
    { value: "Europe/Rome", label: "Rome / Milan" },
    { value: "Europe/London", label: "London" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "America/New_York", label: "New York" },
    { value: "America/Chicago", label: "Chicago" },
    { value: "America/Los_Angeles", label: "Los Angeles" },
    { value: "America/Sao_Paulo", label: "São Paulo" },
    { value: "Asia/Dubai", label: "Dubai" },
    { value: "Asia/Kolkata", label: "Mumbai / Delhi" },
    { value: "Asia/Singapore", label: "Singapore" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Australia/Sydney", label: "Sydney" },
];

export const DEFAULT_TIME_ZONE_INPUT = {
    date: "2026-05-24",
    time: "14:00",
    sourceTimeZone: "Europe/Rome",
    targetTimeZones: ["UTC", "Europe/London", "America/New_York", "Asia/Tokyo"],
};

const FALLBACK_LOCALE = "en-US";
const MILLISECONDS_PER_MINUTE = 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * 60 * MILLISECONDS_PER_MINUTE;

function isSupportedTimeZone(timeZone) {
    if (!timeZone || typeof timeZone !== "string") {
        return false;
    }

    try {
        new Intl.DateTimeFormat(FALLBACK_LOCALE, { timeZone }).format(new Date());
        return true;
    } catch {
        return false;
    }
}

function parseDateTimeParts(date, time) {
    const [year, month, day] = String(date || "").split("-").map(Number);
    const [hour = 0, minute = 0] = String(time || "").split(":").map(Number);

    if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day) ||
        !Number.isInteger(hour) ||
        !Number.isInteger(minute)
    ) {
        return parseDateTimeParts(DEFAULT_TIME_ZONE_INPUT.date, DEFAULT_TIME_ZONE_INPUT.time);
    }

    return { year, month, day, hour, minute };
}

function getTimeZoneOffsetMinutes(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(date);

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    const asUtc = Date.UTC(
        Number(values.year),
        Number(values.month) - 1,
        Number(values.day),
        Number(values.hour),
        Number(values.minute),
        Number(values.second),
    );

    return (asUtc - date.getTime()) / MILLISECONDS_PER_MINUTE;
}

function zonedTimeToUtc(date, time, timeZone) {
    const { year, month, day, hour, minute } = parseDateTimeParts(date, time);
    const guessedUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const offsetMinutes = getTimeZoneOffsetMinutes(guessedUtc, timeZone);
    const utcDate = new Date(guessedUtc.getTime() - offsetMinutes * MILLISECONDS_PER_MINUTE);
    const correctedOffsetMinutes = getTimeZoneOffsetMinutes(utcDate, timeZone);

    if (correctedOffsetMinutes !== offsetMinutes) {
        return new Date(guessedUtc.getTime() - correctedOffsetMinutes * MILLISECONDS_PER_MINUTE);
    }

    return utcDate;
}

function getZonedParts(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        hour12: false,
    }).formatToParts(date);

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    return {
        year: Number(values.year),
        month: Number(values.month),
        day: Number(values.day),
        hour: Number(values.hour),
        minute: Number(values.minute),
        second: Number(values.second),
        weekday: values.weekday,
    };
}

function pad2(value) {
    return String(value).padStart(2, "0");
}

function formatOffset(offsetMinutes) {
    if (offsetMinutes === 0) {
        return "UTC+00:00";
    }

    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absoluteMinutes = Math.abs(offsetMinutes);
    const hours = Math.floor(absoluteMinutes / 60);
    const minutes = absoluteMinutes % 60;

    return `UTC${sign}${pad2(hours)}:${pad2(minutes)}`;
}

function formatZonedDateTime(date, timeZone, locale) {
    return new Intl.DateTimeFormat(locale, {
        timeZone,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function normalizeTargetTimeZones(targetTimeZones, sourceTimeZone) {
    const rawTargets = Array.isArray(targetTimeZones)
        ? targetTimeZones
        : String(targetTimeZones || "")
              .split(",")
              .map((item) => item.trim());

    const uniqueTargets = rawTargets.filter(
        (timeZone, index, items) =>
            isSupportedTimeZone(timeZone) && items.indexOf(timeZone) === index,
    );

    if (uniqueTargets.length > 0) {
        return uniqueTargets;
    }

    return DEFAULT_TIME_ZONE_INPUT.targetTimeZones.filter(
        (timeZone) => timeZone !== sourceTimeZone,
    );
}

export function normalizeTimeZoneInput(input = {}) {
    const sourceTimeZone = isSupportedTimeZone(input.sourceTimeZone)
        ? input.sourceTimeZone
        : DEFAULT_TIME_ZONE_INPUT.sourceTimeZone;

    return {
        date: input.date || DEFAULT_TIME_ZONE_INPUT.date,
        time: input.time || DEFAULT_TIME_ZONE_INPUT.time,
        sourceTimeZone,
        targetTimeZones: normalizeTargetTimeZones(
            input.targetTimeZones ?? DEFAULT_TIME_ZONE_INPUT.targetTimeZones,
            sourceTimeZone,
        ),
    };
}

function getDayOffset(sourceParts, targetParts) {
    const sourceDayUtc = Date.UTC(sourceParts.year, sourceParts.month - 1, sourceParts.day);
    const targetDayUtc = Date.UTC(targetParts.year, targetParts.month - 1, targetParts.day);

    return Math.round((targetDayUtc - sourceDayUtc) / MILLISECONDS_PER_DAY);
}

function getDayPeriod(hour) {
    if (hour >= 9 && hour < 18) {
        return "business";
    }

    if (hour >= 6 && hour < 22) {
        return "day";
    }

    return "night";
}

function getTimelinePosition(hour, minute) {
    return ((hour * 60 + minute) / (24 * 60)) * 100;
}

function buildZoneResult(utcDate, timeZone, sourceParts, locale) {
    const parts = getZonedParts(utcDate, timeZone);
    const offsetMinutes = getTimeZoneOffsetMinutes(utcDate, timeZone);
    const dayOffset = getDayOffset(sourceParts, parts);

    return {
        timeZone,
        label:
            TIME_ZONE_OPTIONS.find((option) => option.value === timeZone)?.label ??
            timeZone,
        date: `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`,
        time: `${pad2(parts.hour)}:${pad2(parts.minute)}`,
        weekday: parts.weekday,
        formatted: formatZonedDateTime(utcDate, timeZone, locale),
        offset: formatOffset(offsetMinutes),
        offsetMinutes,
        dayOffset,
        period: getDayPeriod(parts.hour),
        timelinePosition: getTimelinePosition(parts.hour, parts.minute),
    };
}

export function calculateTimeZoneConversion(input = {}, locale = FALLBACK_LOCALE) {
    const normalized = normalizeTimeZoneInput(input);
    const utcDate = zonedTimeToUtc(
        normalized.date,
        normalized.time,
        normalized.sourceTimeZone,
    );
    const sourceParts = getZonedParts(utcDate, normalized.sourceTimeZone);
    const source = buildZoneResult(
        utcDate,
        normalized.sourceTimeZone,
        sourceParts,
        locale,
    );
    const targets = normalized.targetTimeZones.map((timeZone) =>
        buildZoneResult(utcDate, timeZone, sourceParts, locale),
    );

    return {
        input: normalized,
        utcIso: utcDate.toISOString(),
        source,
        targets,
        allZones: [source, ...targets],
    };
}

export function buildTimeZoneQueryParams(input = {}) {
    const normalized = normalizeTimeZoneInput(input);
    const params = new URLSearchParams();

    params.set("date", normalized.date);
    params.set("time", normalized.time);
    params.set("sourceTimeZone", normalized.sourceTimeZone);
    params.set("targetTimeZones", normalized.targetTimeZones.join(","));

    return params.toString();
}

export function parseTimeZoneQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeTimeZoneInput({
        date: getValue("date"),
        time: getValue("time"),
        sourceTimeZone: getValue("sourceTimeZone"),
        targetTimeZones: getValue("targetTimeZones"),
    });
}