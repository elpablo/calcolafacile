"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { timestampConverterExamples } from "@/components/tools/timestamp/timestampConverterExamples";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    buildDateToTimestampResult,
    buildTimestampToDateResult,
    formatDateTimeInput,
    TIMESTAMP_UNITS,
} from "./timestampConverterLogic";

const STORAGE_KEY = "calcolafacile:timestamp-converter";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

const inputClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

function subscribeToHydration() {
    return () => {};
}

function getInitialConverterState(currentExampleKey, shouldLoadSavedState, sample) {
    const example = currentExampleKey
        ? timestampConverterExamples[currentExampleKey]
        : null;

    if (example) {
        return {
            mode: example.mode || "timestampToDate",
            timestamp: example.timestamp,
            timestampUnit: example.unit || TIMESTAMP_UNITS.seconds,
            dateTime: example.dateTime,
        };
    }

    if (!shouldLoadSavedState) {
        return {
            mode: "timestampToDate",
            timestamp: sample.timestamp,
            timestampUnit: sample.unit || TIMESTAMP_UNITS.seconds,
            dateTime: sample.dateTime,
        };
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return {
        mode: ["timestampToDate", "dateToTimestamp"].includes(storedState?.mode)
            ? storedState.mode
            : "timestampToDate",
        timestamp:
            typeof storedState?.timestamp === "number" ||
            typeof storedState?.timestamp === "string"
                ? storedState.timestamp
                : sample.timestamp,
        timestampUnit: [TIMESTAMP_UNITS.seconds, TIMESTAMP_UNITS.milliseconds].includes(
            storedState?.timestampUnit,
        )
            ? storedState.timestampUnit
            : sample.unit || TIMESTAMP_UNITS.seconds,
        dateTime:
            typeof storedState?.dateTime === "string"
                ? storedState.dateTime
                : sample.dateTime,
    };
}


export default function TimestampConverterCore({ content }) {
    const searchParams = useSearchParams();
    const currentExampleKey = searchParams.get("example");
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <TimestampConverterCoreContent
            key={`${currentExampleKey ?? "saved-state"}:${hasHydrated ? "hydrated" : "ssr"}`}
            content={content}
            currentExampleKey={currentExampleKey}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function TimestampConverterCoreContent({
    content,
    currentExampleKey,
    shouldLoadSavedState,
}) {
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

    const [converterState, setConverterState] = useState(() => {
        return getInitialConverterState(
            currentExampleKey,
            shouldLoadSavedState,
            sample,
        );
    });
    const { mode, timestamp, timestampUnit, dateTime } = converterState;

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        if (currentExampleKey) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            mode,
            timestamp,
            timestampUnit,
            dateTime,
        });
    }, [currentExampleKey, dateTime, mode, shouldLoadSavedState, timestamp, timestampUnit]);

    const result = useMemo(() => {
        if (!shouldLoadSavedState) {
            return {
                error: null,
                lines: null,
                copyText: "",
            };
        }

        if (mode === "timestampToDate") {
            return buildTimestampToDateResult({
                value: timestamp,
                unit: timestampUnit,
                locale: lang,
                labels,
            });
        }

        return buildDateToTimestampResult({
            value: dateTime,
            locale: lang,
            labels,
        });
    }, [dateTime, labels, lang, mode, shouldLoadSavedState, timestamp, timestampUnit]);

    const setMode = (nextMode) => {
        setConverterState((currentState) => ({
            ...currentState,
            mode:
                typeof nextMode === "function"
                    ? nextMode(currentState.mode)
                    : nextMode,
        }));
    };

    const setTimestamp = (nextTimestamp) => {
        setConverterState((currentState) => ({
            ...currentState,
            timestamp:
                typeof nextTimestamp === "function"
                    ? nextTimestamp(currentState.timestamp)
                    : nextTimestamp,
        }));
    };

    const setTimestampUnit = (nextTimestampUnit) => {
        setConverterState((currentState) => ({
            ...currentState,
            timestampUnit:
                typeof nextTimestampUnit === "function"
                    ? nextTimestampUnit(currentState.timestampUnit)
                    : nextTimestampUnit,
        }));
    };

    const setDateTime = (nextDateTime) => {
        setConverterState((currentState) => ({
            ...currentState,
            dateTime:
                typeof nextDateTime === "function"
                    ? nextDateTime(currentState.dateTime)
                    : nextDateTime,
        }));
    };

    const setNow = () => {
        const current = new Date();
        setTimestamp(Math.floor(current.getTime() / 1000));
        setTimestampUnit(TIMESTAMP_UNITS.seconds);
        setDateTime(formatDateTimeInput(current, lang));
    };

    const setExample = () => {
        setMode("timestampToDate");
        setTimestamp(sample.timestamp);
        setTimestampUnit(sample.unit || TIMESTAMP_UNITS.seconds);
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
                            <option value={TIMESTAMP_UNITS.seconds}>
                                {labels.units.seconds}
                            </option>
                            <option value={TIMESTAMP_UNITS.milliseconds}>
                                {labels.units.milliseconds}
                            </option>
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
                <ResultBox
                    copyText={result.copyText}
                    lang={lang}
                    testId="timestamp-converter-result"
                >
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