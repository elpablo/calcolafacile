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
    return date.toLocaleString("it-IT", {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function formatNumber(value) {
    return value.toLocaleString("it-IT");
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function toItalianDateTimeInput(date) {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseItalianDateTimeInput(value) {
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

export default function TimestampConverter() {
    const [mode, setMode] = useState("timestampToDate");
    const [timestamp, setTimestamp] = useState(1714560000);
    const [timestampUnit, setTimestampUnit] = useState("seconds");
    const [dateTime, setDateTime] = useState("01/05/2024 12:00");

    const result = useMemo(() => {
        if (mode === "timestampToDate") {
            const date = parseTimestamp(timestamp, timestampUnit);

            if (!date) {
                return {
                    error: "Inserisci un timestamp valido.",
                    lines: null,
                    copyText: "",
                };
            }

            const seconds = Math.floor(date.getTime() / 1000);
            const milliseconds = date.getTime();

            return {
                error: null,
                lines: [
                    { label: "Data locale", value: formatDate(date) },
                    { label: "ISO", value: date.toISOString() },
                    { label: "Unix timestamp (secondi)", value: formatNumber(seconds) },
                    { label: "Unix timestamp (millisecondi)", value: formatNumber(milliseconds) },
                ],
                copyText: `${formatDate(date)}\nISO: ${date.toISOString()}\nUnix: ${seconds}`,
            };
        }

        const date = parseItalianDateTimeInput(dateTime);

        if (!date) {
            return {
                error: "Inserisci una data valida nel formato gg/mm/aaaa hh:mm.",
                lines: null,
                copyText: "",
            };
        }

        const seconds = Math.floor(date.getTime() / 1000);
        const milliseconds = date.getTime();

        return {
            error: null,
            lines: [
                { label: "Unix timestamp (secondi)", value: formatNumber(seconds) },
                { label: "Unix timestamp (millisecondi)", value: formatNumber(milliseconds) },
                { label: "Data locale", value: formatDate(date) },
                { label: "ISO", value: date.toISOString() },
            ],
            copyText: `${seconds}`,
        };
    }, [mode, timestamp, timestampUnit, dateTime]);

    const setNow = () => {
        const current = new Date();
        setTimestamp(Math.floor(current.getTime() / 1000));
        setTimestampUnit("seconds");
        setDateTime(toItalianDateTimeInput(current));
    };

    const setExample = () => {
        setMode("timestampToDate");
        setTimestamp(1714560000);
        setTimestampUnit("seconds");
        setDateTime("01/05/2024 12:00");
    };

    return (
        <ToolLayout
            title="Timestamp Converter online"
            currentPath="/it/timestamp-converter"
            description="Converti Unix timestamp in date leggibili e date in timestamp. Utile per API, log, database e campi JWT come exp, iat e nbf."
            faq={
                <>
                    <h3 className="font-semibold">Che cos&apos;è un Unix timestamp?</h3>
                    <p>
                        È un numero che rappresenta il tempo trascorso dal 1 gennaio 1970 UTC. Può essere espresso in secondi o millisecondi.
                    </p>

                    <h3 className="mt-2 font-semibold">Il calcolo viene fatto online?</h3>
                    <p>
                        No. La conversione avviene direttamente nel browser, senza inviare dati a server esterni.
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
                    Timestamp → Data
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
                    Data → Timestamp
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
                            placeholder="Es. 1714560000"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Unità</label>
                        <select
                            value={timestampUnit}
                            onChange={(event) => {
                                setTimestampUnit(event.target.value);
                            }}
                            className={selectClass}
                        >
                            <option value="seconds">Secondi</option>
                            <option value="milliseconds">Millisecondi</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <label className={labelClass}>Data e ora locale</label>
                    <input
                        type="text"
                        value={dateTime}
                        onChange={(event) => {
                            setDateTime(event.target.value);
                        }}
                        className={inputClass}
                        placeholder="Es. 01/05/2024 12:00"
                        inputMode="numeric"
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        Usa il formato gg/mm/aaaa hh:mm. La data viene interpretata nel fuso orario locale del browser.
                    </p>
                </div>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={setExample}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa esempio
                </button>
                <button
                    type="button"
                    onClick={setNow}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa ora
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {result.lines && (
                <ResultBox copyText={result.copyText}>
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