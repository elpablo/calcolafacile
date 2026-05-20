"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { compoundInterestExamples } from "./compoundInterestExamples";
import {
    DEFAULT_OPTIONS,
    buildCompoundInterestQueryParams,
    calculateCompoundInterest,
    normalizeCompoundInterestInput,
    parseCompoundInterestQueryParams,
} from "./compoundInterestLogic";

const STORAGE_KEY = "calcolafacile:compound-interest";

function subscribeToHydration() {
    return () => {};
}

function hasCompoundInterestQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        [
            "principal",
            "monthlyContribution",
            "annualRate",
            "years",
            "compoundingFrequency",
        ].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const queryState = parseCompoundInterestQueryParams(searchParams);

    if (hasCompoundInterestQueryParams(searchParams)) {
        return queryState;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_OPTIONS;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeCompoundInterestInput({ ...DEFAULT_OPTIONS, ...stored });
}

function formatCurrency(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatNumber(value, locale, options = {}) {
    return new Intl.NumberFormat(locale, options).format(value);
}

function buildExampleHref(currentPath, example) {
    return `${currentPath}?${buildCompoundInterestQueryParams(example.params)}`;
}

function getChartPoints(yearlyBreakdown) {
    if (!yearlyBreakdown.length) return "";

    const width = 640;
    const height = 220;
    const padding = 18;
    const maxValue = Math.max(
        ...yearlyBreakdown.map((item) => item.endBalance),
        1,
    );
    const maxIndex = Math.max(yearlyBreakdown.length - 1, 1);

    return yearlyBreakdown
        .map((item, index) => {
            const x = padding + (index / maxIndex) * (width - padding * 2);
            const y =
                height -
                padding -
                (item.endBalance / maxValue) * (height - padding * 2);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ");
}

function Field({ id, label, help, value, min, max, step, suffix, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-blue-400">
                <input
                    id={id}
                    name={id}
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={(event) => onChange(event.target.value)}
                    className="min-h-[50px] min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
                {suffix ? (
                    <span className="flex min-h-[50px] items-center border-l border-zinc-200 px-3 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        {suffix}
                    </span>
                ) : null}
            </div>
            {help ? (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {help}
                </p>
            ) : null}
        </div>
    );
}

export default function CompoundInterestCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <CompoundInterestCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function CompoundInterestCoreContent({
    content,
    searchParams,
    shouldLoadSavedState,
}) {
    const {
        lang,
        locale,
        currency,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, searchParams);
    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, formState);
    }, [shouldLoadSavedState, formState]);

    const normalizedInput = useMemo(
        () => normalizeCompoundInterestInput(formState),
        [formState],
    );
    const result = useMemo(
        () => calculateCompoundInterest(normalizedInput),
        [normalizedInput],
    );
    const chartPoints = useMemo(
        () => getChartPoints(result.yearlyBreakdown),
        [result.yearlyBreakdown],
    );

    const enrichedExamples = useMemo(
        () =>
            compoundInterestExamples.map((example) => ({
                ...example,
                href: buildExampleHref(currentPath, example),
            })),
        [currentPath],
    );

    const setValue = (key, value) => {
        setFormState((current) => ({ ...current, [key]: value }));
    };

    const applyExample = (params) => {
        setFormState(normalizeCompoundInterestInput(params));
    };

    const copyText = [
        `${labels.finalBalance}: ${formatCurrency(result.finalBalance, locale, currency)}`,
        `${labels.totalContributions}: ${formatCurrency(result.totalContributions, locale, currency)}`,
        `${labels.totalInterest}: ${formatCurrency(result.totalInterest, locale, currency)}`,
        `${labels.growthMultiple}: ${formatNumber(result.growthMultiple, locale, { maximumFractionDigits: 2 })}x`,
    ].join("\n");

    return (
        <ToolLayout
            title={title}
            description={description}
            examples={examples}
            faq={faq}
            currentPath={currentPath}
            contextualTools={contextualTools}
            lang={lang}
        >
            <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                        id="compound-principal"
                        label={labels.principal}
                        help={labels.principalHelp}
                        value={formState.principal}
                        min="0"
                        step="100"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("principal", value)}
                    />
                    <Field
                        id="compound-monthly-contribution"
                        label={labels.monthlyContribution}
                        help={labels.monthlyContributionHelp}
                        value={formState.monthlyContribution}
                        min="0"
                        step="50"
                        suffix={labels.currencySuffix}
                        onChange={(value) =>
                            setValue("monthlyContribution", value)
                        }
                    />
                    <Field
                        id="compound-annual-rate"
                        label={labels.annualRate}
                        help={labels.annualRateHelp}
                        value={formState.annualRate}
                        min="-100"
                        max="100"
                        step="0.1"
                        suffix={labels.percentSuffix}
                        onChange={(value) => setValue("annualRate", value)}
                    />
                    <Field
                        id="compound-years"
                        label={labels.years}
                        help={labels.yearsHelp}
                        value={formState.years}
                        min="1"
                        max="100"
                        step="1"
                        onChange={(value) => setValue("years", value)}
                    />
                </div>

                <div>
                    <label
                        htmlFor="compound-frequency"
                        className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                    >
                        {labels.compoundingFrequency}
                    </label>
                    <select
                        id="compound-frequency"
                        name="compound-frequency"
                        value={formState.compoundingFrequency}
                        onChange={(event) =>
                            setValue(
                                "compoundingFrequency",
                                event.target.value,
                            )
                        }
                        className="h-[50px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-0 text-sm leading-[50px] text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                    >
                        <option value="monthly">
                            {labels.monthlyCompounding}
                        </option>
                        <option value="yearly">
                            {labels.yearlyCompounding}
                        </option>
                    </select>
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.compoundingFrequencyHelp}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {enrichedExamples.map((example) => (
                        <button
                            key={example.key}
                            type="button"
                            onClick={() => applyExample(example.params)}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {example.title}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setFormState(DEFAULT_OPTIONS)}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                        {labels.reset}
                    </button>
                </div>
            </div>

            <ResultBox
                copyText={copyText}
                label={labels.resultTitle}
                lang={lang}
                testId="compound-interest-result"
            >
                <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.finalBalance}
                            </p>
                            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(
                                    result.finalBalance,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalInterest}
                            </p>
                            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(
                                    result.totalInterest,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalContributions}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(
                                    result.totalContributions,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.growthMultiple}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatNumber(result.growthMultiple, locale, {
                                    maximumFractionDigits: 2,
                                })}
                                x
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {labels.chartTitle}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.chartDescription}
                                </p>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                {normalizedInput.years} {labels.yearsShort}
                            </span>
                        </div>
                        <svg
                            viewBox="0 0 640 220"
                            role="img"
                            aria-label={labels.chartTitle}
                            className="h-56 w-full overflow-visible"
                        >
                            <line
                                x1="18"
                                y1="202"
                                x2="622"
                                y2="202"
                                className="stroke-zinc-300 dark:stroke-zinc-700"
                            />
                            <line
                                x1="18"
                                y1="18"
                                x2="18"
                                y2="202"
                                className="stroke-zinc-300 dark:stroke-zinc-700"
                            />
                            <polyline
                                points={chartPoints}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600 dark:text-blue-400"
                            />
                        </svg>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="max-h-[420px] overflow-auto">
                            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                                <thead className="bg-zinc-50 dark:bg-zinc-900">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.year}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.contributions}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.interest}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.endBalance}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 bg-white/70 dark:divide-zinc-800 dark:bg-zinc-950/40">
                                    {result.yearlyBreakdown.map((row) => (
                                        <tr key={row.year}>
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                                                {row.year}
                                            </td>
                                            <td className="px-3 py-2 text-right text-zinc-700 dark:text-zinc-300">
                                                {formatCurrency(
                                                    row.contributions,
                                                    locale,
                                                    currency,
                                                )}
                                            </td>
                                            <td className="px-3 py-2 text-right text-zinc-700 dark:text-zinc-300">
                                                {formatCurrency(
                                                    row.interest,
                                                    locale,
                                                    currency,
                                                )}
                                            </td>
                                            <td className="px-3 py-2 text-right font-semibold text-zinc-900 dark:text-zinc-100">
                                                {formatCurrency(
                                                    row.endBalance,
                                                    locale,
                                                    currency,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.disclaimer}
                    </p>
                </div>
            </ResultBox>
        </ToolLayout>
    );
}