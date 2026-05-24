"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    ANGLE_UNITS,
    calculateAngleConversion,
    normalizeAngleInput,
    parseAngleQueryParams,
} from "./angleConverterLogic";

const STORAGE_KEY = "calcolafacile:angle-converter";

function subscribeToHydration() {
    return () => {};
}

function hasAngleQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) => ["value", "unit"].includes(key));
}

function getInitialState(shouldLoadSavedState, searchParams, sample) {
    const fallback = normalizeAngleInput(sample);

    if (hasAngleQueryParams(searchParams)) {
        return parseAngleQueryParams(searchParams);
    }

    if (!shouldLoadSavedState) {
        return fallback;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeAngleInput({ ...fallback, ...stored });
}

function formatNumber(value, locale, maximumFractionDigits = 6) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits,
    }).format(value);
}

function buildArcPath(centerX, centerY, radius, degrees) {
    const normalizedDegrees = ((degrees % 360) + 360) % 360;

    if (normalizedDegrees === 0) {
        return "";
    }

    const startAngle = 0;
    const endAngle = normalizedDegrees;
    const startRadians = (Math.PI / 180) * startAngle;
    const endRadians = (Math.PI / 180) * endAngle;
    const startX = centerX + radius * Math.cos(startRadians);
    const startY = centerY - radius * Math.sin(startRadians);
    const endX = centerX + radius * Math.cos(endRadians);
    const endY = centerY - radius * Math.sin(endRadians);
    const largeArcFlag = normalizedDegrees > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`;
}

function isCloseTo(value, target, epsilon = 1e-6) {
    return Math.abs(value - target) < epsilon;
}

function getQuadrant(degrees, labels) {
    const normalizedDegrees = ((degrees % 360) + 360) % 360;

    if (isCloseTo(normalizedDegrees, 0) || isCloseTo(normalizedDegrees, 360)) {
        return labels.axisPositiveX;
    }

    if (isCloseTo(normalizedDegrees, 90)) {
        return labels.axisPositiveY;
    }

    if (isCloseTo(normalizedDegrees, 180)) {
        return labels.axisNegativeX;
    }

    if (isCloseTo(normalizedDegrees, 270)) {
        return labels.axisNegativeY;
    }

    if (normalizedDegrees > 0 && normalizedDegrees < 90) {
        return labels.quadrant1;
    }

    if (normalizedDegrees > 90 && normalizedDegrees < 180) {
        return labels.quadrant2;
    }

    if (normalizedDegrees > 180 && normalizedDegrees < 270) {
        return labels.quadrant3;
    }

    return labels.quadrant4;
}

function AnglePreview({ degrees, labels, locale }) {
    const center = 120;
    const radius = 82;
    const normalizedDegrees = ((degrees % 360) + 360) % 360;
    const angleRadians = (normalizedDegrees * Math.PI) / 180;
    const pointerX = center + radius * Math.cos(angleRadians);
    const pointerY = center - radius * Math.sin(angleRadians);
    const arcPath = buildArcPath(center, center, radius, normalizedDegrees);

    return (
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {labels.previewTitle}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.previewDescription}
                    </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {formatNumber(normalizedDegrees, locale, 3)}°
                </span>
            </div>

            <svg
                viewBox="0 0 240 240"
                role="img"
                aria-label={labels.previewAriaLabel}
                className="mx-auto block"
                style={{ width: "100%", maxWidth: "360px", height: "360px" }}
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#d4d4d8"
                    strokeWidth="2"
                />
                <line
                    x1="20"
                    y1={center}
                    x2="220"
                    y2={center}
                    stroke="#d4d4d8"
                    strokeWidth="1"
                />
                <line
                    x1={center}
                    y1="20"
                    x2={center}
                    y2="220"
                    stroke="#d4d4d8"
                    strokeWidth="1"
                />
                {arcPath ? (
                    <path
                        d={arcPath}
                        fill="rgba(37, 99, 235, 0.16)"
                        stroke="rgba(37, 99, 235, 0.8)"
                        strokeWidth="2"
                    />
                ) : null}
                <line
                    x1={center}
                    y1={center}
                    x2={pointerX}
                    y2={pointerY}
                    stroke="rgba(37, 99, 235, 0.95)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <circle cx={center} cy={center} r="5" fill="rgba(37, 99, 235, 0.95)" />
                <circle cx={pointerX} cy={pointerY} r="6" fill="rgba(37, 99, 235, 0.95)" />
                <text x="208" y="116" fill="#71717a" fontSize="12">
                    0°
                </text>
                <text x="126" y="32" fill="#71717a" fontSize="12">
                    90°
                </text>
                <text x="8" y="116" fill="#71717a" fontSize="12">
                    180°
                </text>
                <text x="126" y="228" fill="#71717a" fontSize="12">
                    270°
                </text>
            </svg>

            <p className="mt-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {getQuadrant(normalizedDegrees, labels)}
            </p>
        </div>
    );
}

export default function AngleConverterCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <AngleConverterCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function AngleConverterCoreContent({ content, searchParams, shouldLoadSavedState }) {
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
    const [value, setValue] = useState(String(initialState.value));
    const [unit, setUnit] = useState(initialState.unit);

    const normalizedInput = useMemo(
        () => normalizeAngleInput({ value, unit }),
        [value, unit],
    );

    const conversion = useMemo(
        () => calculateAngleConversion(normalizedInput),
        [normalizedInput],
    );

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, normalizedInput);
    }, [shouldLoadSavedState, normalizedInput]);

    const copyText = [
        `${labels.degreesLabel}: ${conversion.degrees}`,
        `${labels.radiansLabel}: ${conversion.radians}`,
        `${labels.gradiansLabel}: ${conversion.gradians}`,
        `${labels.turnsLabel}: ${conversion.turns}`,
    ].join("\n");

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

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
                <div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="min-w-0 flex-1">
                            <label htmlFor="angle-value" className={labelClass}>
                                {labels.valueLabel}
                            </label>
                            <input
                                id="angle-value"
                                name="angle-value"
                                type="number"
                                value={value}
                                step="any"
                                onChange={(event) => setValue(event.target.value)}
                                placeholder={labels.valuePlaceholder}
                                className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                            />
                        </div>

                        <div className="min-w-0 sm:w-56 sm:flex-none">
                            <label htmlFor="angle-unit" className={labelClass}>
                                {labels.unitLabel}
                            </label>
                            <div className="relative">
                                <select
                                    id="angle-unit"
                                    name="angle-unit"
                                    value={unit}
                                    onChange={(event) => setUnit(event.target.value)}
                                    className="h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 pr-9 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                                >
                                    {ANGLE_UNITS.map((angleUnit) => (
                                        <option key={angleUnit} value={angleUnit}>
                                            {labels.units[angleUnit]}
                                        </option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                    ▾
                                </span>
                            </div>
                        </div>
                    </div>

                    <ResultBox
                        lang={lang}
                        testId="angle-converter-result"
                        copyText={copyText}
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.degreesLabel}
                                </p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                    {formatNumber(conversion.degrees, locale)}°
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.radiansLabel}
                                </p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                    {formatNumber(conversion.radians, locale)} rad
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.gradiansLabel}
                                </p>
                                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                                    {formatNumber(conversion.gradians, locale)} gon
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.turnsLabel}
                                </p>
                                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                                    {formatNumber(conversion.turns, locale)} turn
                                </p>
                            </div>
                        </div>
                    </ResultBox>
                </div>

                <AnglePreview
                    degrees={conversion.normalizedDegrees}
                    labels={labels.preview}
                    locale={locale}
                />
            </div>
        </ToolLayout>
    );
}