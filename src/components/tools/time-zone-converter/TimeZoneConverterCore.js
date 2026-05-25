"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    DEFAULT_TIME_ZONE_INPUT,
    TIME_ZONE_OPTIONS,
    calculateTimeZoneConversion,
    normalizeTimeZoneInput,
    parseTimeZoneQueryParams,
} from "./timeZoneConverterLogic";

const STORAGE_KEY = "calcolafacile:time-zone-converter";

function subscribeToHydration() {
    return () => {};
}

function hasTimeZoneQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["date", "time", "sourceTimeZone", "targetTimeZones"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams, sample) {
    const fallback = normalizeTimeZoneInput({
        ...DEFAULT_TIME_ZONE_INPUT,
        ...sample,
    });

    if (hasTimeZoneQueryParams(searchParams)) {
        return parseTimeZoneQueryParams(searchParams);
    }

    if (!shouldLoadSavedState) {
        return fallback;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeTimeZoneInput({ ...fallback, ...stored });
}

function getPeriodStyle(period) {
    if (period === "business") {
        return {
            backgroundColor: "rgba(5, 150, 105, 0.12)",
            borderColor: "#6ee7b7",
            color: "#047857",
        };
    }

    if (period === "day") {
        return {
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            borderColor: "#93c5fd",
            color: "#1d4ed8",
        };
    }

    return {
        backgroundColor: "rgba(71, 85, 105, 0.12)",
        borderColor: "#cbd5e1",
        color: "#475569",
    };
}

function getDayOffsetLabel(dayOffset, labels) {
    if (dayOffset === 0) {
        return labels.sameDay;
    }

    if (dayOffset === 1) {
        return labels.nextDay;
    }

    if (dayOffset === -1) {
        return labels.previousDay;
    }

    return dayOffset > 0
        ? labels.dayOffsetFuture.replace("{days}", String(dayOffset))
        : labels.dayOffsetPast.replace("{days}", String(Math.abs(dayOffset)));
}

function getPeriodLabel(period, labels) {
    if (period === "business") {
        return labels.businessHours;
    }

    if (period === "day") {
        return labels.daytime;
    }

    return labels.nighttime;
}

function getLocalizedTimeZoneLabel(zone, labels) {
    return labels.timeZoneNames?.[zone.timeZone] ?? zone.label;
}

function TimeZoneSelect({ id, label, value, onChange, labels, exclude = [] }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 pr-9 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                >
                    {TIME_ZONE_OPTIONS.filter(
                        (option) => !exclude.includes(option.value) || option.value === value,
                    ).map((option) => (
                        <option key={option.value} value={option.value}>
                            {labels.timeZoneNames?.[option.value] ?? option.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                    ▾
                </span>
            </div>
        </div>
    );
}

function TimeZoneTimeline({ zones, labels }) {
    return (
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {labels.timelineTitle}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.timelineDescription}
                </p>
            </div>

            <div className="space-y-4">
                {zones.map((zone) => {
                    const periodStyle = getPeriodStyle(zone.period);

                    return (
                        <div key={zone.timeZone}>
                            <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm">
                                <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                                    {getLocalizedTimeZoneLabel(zone, labels)}
                                </span>
                                <span className="text-zinc-500 dark:text-zinc-400">
                                    {zone.time} · {zone.offset}
                                </span>
                            </div>
                            <div
                                className="relative h-9 overflow-hidden rounded-full border"
                                style={{
                                    backgroundColor: "rgba(209, 250, 229, 0.55)",
                                    borderColor: "#d1d5db",
                                }}
                            >
                                <div
                                    className="absolute h-5 w-5 rounded-full border-2 border-white shadow-md"
                                    style={{
                                        left: `${zone.timelinePosition}%`,
                                        top: "50%",
                                        marginLeft: "-10px",
                                        marginTop: "-10px",
                                        backgroundColor: periodStyle.color,
                                    }}
                                    title={`${getLocalizedTimeZoneLabel(zone, labels)}: ${zone.time}`}
                                />
                            </div>
                            <div className="mt-1 flex justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                                <span>00</span>
                                <span>06</span>
                                <span>12</span>
                                <span>18</span>
                                <span>24</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function ZoneCard({ zone, labels }) {
    const periodStyle = getPeriodStyle(zone.period);

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {getLocalizedTimeZoneLabel(zone, labels)}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {zone.timeZone}
                    </p>
                </div>
                <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-normal sm:text-[11px]"
                    style={periodStyle}
                >
                    {getPeriodLabel(zone.period, labels)}
                </span>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-300">
                {zone.time}
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {zone.formatted}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {zone.offset}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {getDayOffsetLabel(zone.dayOffset, labels)}
                </span>
            </div>
        </div>
    );
}

export default function TimeZoneConverterCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <TimeZoneConverterCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function TimeZoneConverterCoreContent({ content, searchParams, shouldLoadSavedState }) {
    const {
        lang,
        locale,
        metadata,
        currentPath,
        description,
        intro,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, searchParams, sample);
    const [date, setDate] = useState(initialState.date);
    const [time, setTime] = useState(initialState.time);
    const [sourceTimeZone, setSourceTimeZone] = useState(initialState.sourceTimeZone);
    const [targetTimeZones, setTargetTimeZones] = useState(initialState.targetTimeZones);

    const normalizedInput = useMemo(
        () =>
            normalizeTimeZoneInput({
                date,
                time,
                sourceTimeZone,
                targetTimeZones,
            }),
        [date, time, sourceTimeZone, targetTimeZones],
    );

    const conversion = useMemo(
        () => calculateTimeZoneConversion(normalizedInput, locale),
        [normalizedInput, locale],
    );

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, normalizedInput);
    }, [shouldLoadSavedState, normalizedInput]);

    const updateTarget = (index, nextTimeZone) => {
        setTargetTimeZones((currentTargets) => {
            const nextTargets = [...currentTargets];
            nextTargets[index] = nextTimeZone;
            return normalizeTimeZoneInput({
                ...normalizedInput,
                targetTimeZones: nextTargets,
            }).targetTimeZones;
        });
    };

    const addTarget = () => {
        const usedTimeZones = new Set([sourceTimeZone, ...targetTimeZones]);
        const nextOption = TIME_ZONE_OPTIONS.find(
            (option) => !usedTimeZones.has(option.value),
        );

        if (!nextOption) return;
        setTargetTimeZones([...targetTimeZones, nextOption.value]);
    };

    const removeTarget = (index) => {
        setTargetTimeZones((currentTargets) => {
            if (currentTargets.length <= 1) {
                return currentTargets;
            }

            return currentTargets.filter((_, targetIndex) => targetIndex !== index);
        });
    };

    const copyText = conversion.allZones
        .map((zone) => `${getLocalizedTimeZoneLabel(zone, labels)}: ${zone.formatted} (${zone.offset})`)
        .join("\n");

    return (
        <ToolLayout
            title={metadata.title}
            lang={lang}
            currentPath={currentPath}
            description={description ?? metadata.description}
            intro={intro}
            faq={faq}
            contextualTools={contextualTools}
            examples={examples}
        >
            <div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="time-zone-date"
                            className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                        >
                            {labels.dateLabel}
                        </label>
                        <input
                            id="time-zone-date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="time-zone-time"
                            className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                        >
                            {labels.timeLabel}
                        </label>
                        <input
                            id="time-zone-time"
                            type="time"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <TimeZoneSelect
                        id="time-zone-source"
                        label={labels.sourceTimeZoneLabel}
                        value={sourceTimeZone}
                        onChange={(nextTimeZone) => {
                            setSourceTimeZone(nextTimeZone);
                            setTargetTimeZones((currentTargets) =>
                                normalizeTimeZoneInput({
                                    ...normalizedInput,
                                    sourceTimeZone: nextTimeZone,
                                    targetTimeZones: currentTargets.filter(
                                        (target) => target !== nextTimeZone,
                                    ),
                                }).targetTimeZones,
                            );
                        }}
                        labels={labels}
                    />
                </div>

                <section className="mt-6">
                    <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                {labels.targetTimeZonesTitle}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.targetTimeZonesDescription}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={addTarget}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
                        >
                            {labels.addTargetLabel}
                        </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {targetTimeZones.map((targetTimeZone, index) => (
                            <div key={`${targetTimeZone}-${index}`} className="flex gap-2">
                                <div className="min-w-0 flex-1">
                                    <TimeZoneSelect
                                        id={`time-zone-target-${index}`}
                                        label={`${labels.targetTimeZoneLabel} ${index + 1}`}
                                        value={targetTimeZone}
                                        onChange={(nextTimeZone) =>
                                            updateTarget(index, nextTimeZone)
                                        }
                                        labels={labels}
                                        exclude={[sourceTimeZone]}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeTarget(index)}
                                    disabled={targetTimeZones.length <= 1}
                                    className="mt-6 h-12 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                    aria-label={labels.removeTargetLabel}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <ResultBox
                    lang={lang}
                    testId="time-zone-converter-result"
                    copyText={copyText}
                >
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.sourceResultLabel}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {conversion.source.time} · {getLocalizedTimeZoneLabel(conversion.source, labels)}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                            {conversion.source.formatted} · {conversion.source.offset}
                        </p>
                    </div>
                </ResultBox>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {conversion.targets.map((zone) => (
                        <ZoneCard key={zone.timeZone} zone={zone} labels={labels} />
                    ))}
                </div>

                <TimeZoneTimeline zones={conversion.allZones} labels={labels} />
            </div>
        </ToolLayout>
    );
}