"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { timestampConverterExamples } from "@/data/toolExamples/timestampConverterExamples";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

const inputClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

function formatDate(date, locale) {
    return date.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function formatUtcDate(date, locale) {
    return date.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "UTC",
    });
}

function formatNumber(value, locale) {
    return value.toLocaleString(locale);
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function toLocaleDateTimeInput(date) {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseLocaleDateTimeInput(value) {
    const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);

    if (!match) {
        return null;
    }

    const [, day, month, year, hour, minute] = match.map(Number);
    const date = new Date(year, month - 1, day, hour, minute, 0, 0);

    const isValid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date.getHours() === hour &&
        date.getMinutes() === minute;

    return isValid ? date : null;
}

function parseTimestamp(value, unit) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return null;
    }

    const milliseconds = unit === "seconds" ? numericValue * 1000 : numericValue;
    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
}

function getRelativeTime(date, locale, labels) {
    const now = Date.now();
    const diff = date.getTime() - now;
    const abs = Math.abs(diff);
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (abs < hour) {
        const m = Math.round(diff / minute);
        return rtf.format(m, "minute");
    }
    if (abs < day) {
        const h = Math.round(diff / hour);
        return rtf.format(h, "hour");
    }
    const d = Math.round(diff / day);
    return rtf.format(d, "day");
}

function getBrowserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Local timezone";
}

function subscribe() {
    return () => {};
}

function getClientSnapshot() {
    return true;
}

function getServerSnapshot() {
    return false;
}

export default function TimestampConverterCore({ content }) {
    const {
        lang,
        locale,
        title,
        currentPath,
        contextualTools,
        description,
        examples,
        faq,
        labels,
        sample,
    } = content;

    const searchParams = useSearchParams();

    const [mode, setMode] = useState("timestampToDate");
    const [timestamp, setTimestamp] = useState(sample.timestamp);
    const [timestampUnit, setTimestampUnit] = useState(sample.unit);
    const [dateTime, setDateTime] = useState(sample.dateTime);

    const [lastSearchParams, setLastSearchParams] = useState(searchParams);

    if (lastSearchParams !== searchParams) {
        setLastSearchParams(searchParams);

        const exampleKey = searchParams.get("example");
        const example = exampleKey ? timestampConverterExamples[exampleKey] : null;

        if (example) {
            setMode(example.mode || "timestampToDate");
            setTimestamp(example.timestamp);
            setTimestampUnit(example.unit || "seconds");
            setDateTime(example.dateTime);
        }
    }

    const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

    const result = useMemo(() => {
        if (!isHydrated) {
            return {
                error: null,
                lines: null,
                copyText: "",
            };
        }

        if (mode === "timestampToDate") {
            const date = parseTimestamp(timestamp, timestampUnit);

            if (!date) {
                return {
                    error: labels.errors.invalidTimestamp,
                    lines: null,
                    copyText: "",
                };
            }

            const seconds = Math.floor(date.getTime() / 1000);
            const milliseconds = date.getTime();

            return {
                error: null,
                lines: [
                    { label: labels.localDateTime, value: formatDate(date, locale) },
                    { label: labels.utcDateTime, value: formatUtcDate(date, locale) },
                    { label: "ISO", value: date.toISOString() },
                    { label: labels.timezone || "Timezone", value: getBrowserTimezone() },
                    { label: labels.relative, value: getRelativeTime(date, locale, labels) },
                    { label: labels.units.secondsFull, value: formatNumber(seconds, locale) },
                    { label: labels.units.millisecondsFull, value: formatNumber(milliseconds, locale) },
                ],
                copyText: `${labels.localDateTime}: ${formatDate(date, locale)}\n${labels.utcDateTime}: ${formatUtcDate(date, locale)}\nISO: ${date.toISOString()}\nUnix: ${seconds}`,
            };
        }

        const date = parseLocaleDateTimeInput(dateTime);

        if (!date) {
            return {
                error: labels.errors.invalidDate,
                lines: null,
                copyText: "",
            };
        }

        const seconds = Math.floor(date.getTime() / 1000);
        const milliseconds = date.getTime();

        return {
            error: null,
            lines: [
                { label: labels.units.secondsFull, value: formatNumber(seconds, locale) },
                { label: labels.units.millisecondsFull, value: formatNumber(milliseconds, locale) },
                { label: labels.localDateTime, value: formatDate(date, locale) },
                { label: labels.utcDateTime, value: formatUtcDate(date, locale) },
                { label: "ISO", value: date.toISOString() },
                { label: labels.timezone || "Timezone", value: getBrowserTimezone() },
                { label: labels.relative, value: getRelativeTime(date, locale, labels) },
            ],
            copyText: `${labels.units.secondsFull}: ${seconds}\n${labels.units.millisecondsFull}: ${milliseconds}\n${labels.localDateTime}: ${formatDate(date, locale)}\n${labels.utcDateTime}: ${formatUtcDate(date, locale)}\nISO: ${date.toISOString()}`,
        };
    }, [mode, timestamp, timestampUnit, dateTime, isHydrated, locale, labels]);

    const setNow = () => {
        const current = new Date();
        setTimestamp(Math.floor(current.getTime() / 1000));
        setTimestampUnit("seconds");
        setDateTime(toLocaleDateTimeInput(current));
    };

    const setExample = () => {
        setMode("timestampToDate");
        setTimestamp(sample.timestamp);
        setTimestampUnit(sample.unit);
        setDateTime(sample.dateTime);
    };

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            contextualTools={contextualTools}
            description={description}
            examples={examples}
            faq={faq}
        >
            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setMode("timestampToDate");
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                        mode === "timestampToDate"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                    {labels.modes.timestampToDate}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setMode("dateToTimestamp");
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                        mode === "dateToTimestamp"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                    {labels.modes.dateToTimestamp}
                </button>
            </div>

            {mode === "timestampToDate" ? (
                <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_180px]">
                    <div>
                        <label className={labelClass}>{labels.timestamp}</label>
                        <input
                            type="number"
                            value={timestamp}
                            onChange={(event) => {
                                setTimestamp(event.target.value);
                            }}
                            className={inputClass}
                            placeholder={labels.timestampPlaceholder}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{labels.unit}</label>
                        <select
                            value={timestampUnit}
                            onChange={(event) => {
                                setTimestampUnit(event.target.value);
                            }}
                            className={selectClass}
                        >
                            <option value="seconds">{labels.units.seconds}</option>
                            <option value="milliseconds">{labels.units.milliseconds}</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <label className={labelClass}>{labels.localDateTime}</label>
                    <input
                        type="text"
                        value={dateTime}
                        onChange={(event) => {
                            setDateTime(event.target.value);
                        }}
                        className={inputClass}
                        placeholder={labels.datePlaceholder}
                        inputMode="numeric"
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.dateHelper}
                    </p>
                </div>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={setExample}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useExample}
                </button>
                <button
                    type="button"
                    onClick={setNow}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useNow}
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {result.lines && (
                <ResultBox copyText={result.copyText} lang={lang}>
                    <div className="space-y-3">
                        {result.lines.map((line) => (
                            <div key={line.label}>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {line.label}
                                </p>
                                <p className="break-all text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {line.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </ResultBox>
            )}
        </ToolLayout>
    );
}