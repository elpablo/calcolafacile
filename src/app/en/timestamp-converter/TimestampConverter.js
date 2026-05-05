"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

const inputClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

function formatDate(date) {
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function formatNumber(value) {
    return value.toLocaleString("en-US");
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function toUSDateTimeInput(date) {
    return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseUSDateTimeInput(value) {
    const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);

    if (!match) {
        return null;
    }

    const [, month, day, year, hour, minute] = match.map(Number);
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

export default function TimestampConverter() {
    const [mode, setMode] = useState("timestampToDate");
    const [timestamp, setTimestamp] = useState(1714560000);
    const [timestampUnit, setTimestampUnit] = useState("seconds");
    const [dateTime, setDateTime] = useState("05/01/2024 12:00");

    const result = useMemo(() => {
        if (mode === "timestampToDate") {
            const date = parseTimestamp(timestamp, timestampUnit);

            if (!date) {
                return {
                    error: "Enter a valid timestamp.",
                    lines: null,
                    copyText: "",
                };
            }

            const seconds = Math.floor(date.getTime() / 1000);
            const milliseconds = date.getTime();

            return {
                error: null,
                lines: [
                    { label: "Local date", value: formatDate(date) },
                    { label: "ISO", value: date.toISOString() },
                    { label: "Unix timestamp (seconds)", value: formatNumber(seconds) },
                    { label: "Unix timestamp (milliseconds)", value: formatNumber(milliseconds) },
                ],
                copyText: `${formatDate(date)}\nISO: ${date.toISOString()}\nUnix: ${seconds}`,
            };
        }

        const date = parseUSDateTimeInput(dateTime);

        if (!date) {
            return {
                error: "Enter a valid date in the format MM/DD/YYYY HH:mm.",
                lines: null,
                copyText: "",
            };
        }

        const seconds = Math.floor(date.getTime() / 1000);
        const milliseconds = date.getTime();

        return {
            error: null,
            lines: [
                { label: "Unix timestamp (seconds)", value: formatNumber(seconds) },
                { label: "Unix timestamp (milliseconds)", value: formatNumber(milliseconds) },
                { label: "Local date", value: formatDate(date) },
                { label: "ISO", value: date.toISOString() },
            ],
            copyText: `${seconds}`,
        };
    }, [mode, timestamp, timestampUnit, dateTime]);

    const setNow = () => {
        const current = new Date();
        setTimestamp(Math.floor(current.getTime() / 1000));
        setTimestampUnit("seconds");
        setDateTime(toUSDateTimeInput(current));
    };

    const setExample = () => {
        setMode("timestampToDate");
        setTimestamp(1714560000);
        setTimestampUnit("seconds");
        setDateTime("05/01/2024 12:00");
    };

    return (
        <ToolLayout
            title="Unix Timestamp Converter Online"
            lang="en"
            currentPath="/en/timestamp-converter"
            contextualTools={[
                {
                    href: "/en/jwt-decoder",
                    title: "Decode JWT",
                    description:
                        "to inspect exp, iat and nbf fields inside token payloads.",
                },
                {
                    href: "/en/json-formatter",
                    title: "Format JSON",
                    description:
                        "to read API responses, log payloads and timestamp fields more easily.",
                },
                {
                    href: "/en/url-encoder-decoder",
                    title: "URL Encoder/Decoder",
                    description:
                        "to decode timestamps passed inside query strings or callback URLs.",
                },
            ]}
            description="Convert Unix timestamps and epoch time to readable dates, or convert dates back to Unix timestamps. Useful for APIs, logs, databases and JWT fields such as exp, iat and nbf."
            examples={[
                {
                    title: "Convert JWT exp, iat and nbf values",
                    description:
                        "Copy timestamp claims from a JWT payload and convert them into readable local dates and ISO format.",
                },
                {
                    title: "Read Unix timestamps from logs and APIs",
                    description:
                        "When a server log or API response contains epoch time, quickly convert it to a readable date in your local timezone.",
                },
                {
                    title: "Convert a date to Unix timestamp",
                    description:
                        "Enter a date in MM/DD/YYYY HH:mm format to get Unix timestamp values in both seconds and milliseconds.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">What is a Unix timestamp?</h3>
                    <p>
                        A Unix timestamp, also called epoch time, is a number
                        representing the time elapsed since January 1, 1970 at
                        00:00:00 UTC.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        What is the difference between seconds and milliseconds?
                    </h3>
                    <p>
                        Unix timestamps are often stored in seconds, while
                        JavaScript and many APIs use milliseconds. This tool
                        supports both formats.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Is the conversion sent to a server?
                    </h3>
                    <p>
                        No. Timestamp conversion happens directly in your
                        browser without sending data to external servers.
                    </p>
                </>
            }
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
                    Timestamp → Date
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
                    Date → Timestamp
                </button>
            </div>

            {mode === "timestampToDate" ? (
                <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_180px]">
                    <div>
                        <label className={labelClass}>Timestamp</label>
                        <input
                            type="number"
                            value={timestamp}
                            onChange={(event) => {
                                setTimestamp(event.target.value);
                            }}
                            className={inputClass}
                            placeholder="Ex. 1714560000"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Unit</label>
                        <select
                            value={timestampUnit}
                            onChange={(event) => {
                                setTimestampUnit(event.target.value);
                            }}
                            className={selectClass}
                        >
                            <option value="seconds">Seconds</option>
                            <option value="milliseconds">Milliseconds</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <label className={labelClass}>Local date and time</label>
                    <input
                        type="text"
                        value={dateTime}
                        onChange={(event) => {
                            setDateTime(event.target.value);
                        }}
                        className={inputClass}
                        placeholder="Ex. 05/01/2024 12:00"
                        inputMode="numeric"
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        Use the format MM/DD/YYYY HH:mm. The date is interpreted
                        in your browser&apos;s local timezone and converted to
                        Unix time.
                    </p>
                </div>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={setExample}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Use sample
                </button>
                <button
                    type="button"
                    onClick={setNow}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Now
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {result.lines && (
                <ResultBox copyText={result.copyText} lang="en">
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