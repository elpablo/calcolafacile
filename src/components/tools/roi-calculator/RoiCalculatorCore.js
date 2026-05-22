"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { roiCalculatorExamples } from "./roiCalculatorExamples";
import {
    DEFAULT_OPTIONS,
    buildRoiQueryParams,
    calculateRoi,
    calculateRoiScenario,
    normalizeRoiInput,
    parseRoiQueryParams,
} from "./roiCalculatorLogic";

const STORAGE_KEY = "calcolafacile:roi-calculator";

function subscribeToHydration() {
    return () => {};
}

function hasRoiQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["initialInvestment", "finalValue", "additionalCosts", "years"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const queryState = parseRoiQueryParams(searchParams);

    if (hasRoiQueryParams(searchParams)) {
        return queryState;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_OPTIONS;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeRoiInput({ ...DEFAULT_OPTIONS, ...stored });
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

function formatPercent(value, locale) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
    }).format(value);
}

function buildExampleHref(currentPath, example) {
    return `${currentPath}?${buildRoiQueryParams(example.params)}`;
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

export default function RoiCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <RoiCalculatorCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function RoiCalculatorCoreContent({ content, searchParams, shouldLoadSavedState }) {
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

    const normalizedInput = useMemo(() => normalizeRoiInput(formState), [formState]);
    const result = useMemo(() => calculateRoi(normalizedInput), [normalizedInput]);
    const scenarios = useMemo(
        () => [
            {
                key: "pessimistic",
                label: labels.scenarioPessimistic,
                result: calculateRoiScenario(normalizedInput, 0.75),
            },
            {
                key: "expected",
                label: labels.scenarioExpected,
                result,
            },
            {
                key: "optimistic",
                label: labels.scenarioOptimistic,
                result: calculateRoiScenario(normalizedInput, 1.25),
            },
        ],
        [labels.scenarioExpected, labels.scenarioOptimistic, labels.scenarioPessimistic, normalizedInput, result],
    );

    const enrichedExamples = useMemo(
        () =>
            roiCalculatorExamples.map((example) => ({
                ...example,
                href: buildExampleHref(currentPath, example),
            })),
        [currentPath],
    );

    const setValue = (key, value) => {
        setFormState((current) => ({ ...current, [key]: value }));
    };

    const applyExample = (params) => {
        setFormState(normalizeRoiInput(params));
    };

    const copyText = [
        `${labels.totalInvestment}: ${formatCurrency(result.totalInvestment, locale, currency)}`,
        `${labels.finalValue}: ${formatCurrency(result.input.finalValue, locale, currency)}`,
        `${labels.netProfit}: ${formatCurrency(result.netProfit, locale, currency)}`,
        `${labels.roi}: ${formatPercent(result.roiPercent, locale)}%`,
        `${labels.annualizedRoi}: ${formatPercent(result.annualizedRoiPercent, locale)}%`,
        `${labels.investmentMultiple}: ${formatNumber(result.investmentMultiple, locale, { maximumFractionDigits: 2 })}x`,
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
                        id="roi-initial-investment"
                        label={labels.initialInvestment}
                        help={labels.initialInvestmentHelp}
                        value={formState.initialInvestment}
                        min="0"
                        step="100"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("initialInvestment", value)}
                    />
                    <Field
                        id="roi-final-value"
                        label={labels.finalValue}
                        help={labels.finalValueHelp}
                        value={formState.finalValue}
                        min="0"
                        step="100"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("finalValue", value)}
                    />
                    <Field
                        id="roi-additional-costs"
                        label={labels.additionalCosts}
                        help={labels.additionalCostsHelp}
                        value={formState.additionalCosts}
                        min="0"
                        step="100"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("additionalCosts", value)}
                    />
                    <Field
                        id="roi-years"
                        label={labels.years}
                        help={labels.yearsHelp}
                        value={formState.years}
                        min="0"
                        max="100"
                        step="0.1"
                        onChange={(value) => setValue("years", value)}
                    />
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

            <ResultBox copyText={copyText} label={labels.resultTitle} lang={lang} testId="roi-result">
                <div className="space-y-5">
                    <div
                        className={
                            result.isProfit
                                ? "rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
                                : result.isLoss
                                  ? "rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                                  : "rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
                        }
                    >
                        <p className="text-sm font-semibold uppercase tracking-wide">
                            {result.isProfit
                                ? labels.profitMessage
                                : result.isLoss
                                  ? labels.lossMessage
                                  : labels.breakEvenMessage}
                        </p>
                        <p className="mt-1 text-3xl font-bold">
                            {formatPercent(result.roiPercent, locale)}%
                        </p>
                        <p className="mt-1 text-sm">
                            {labels.netProfit}: {formatCurrency(result.netProfit, locale, currency)}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalInvestment}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.totalInvestment, locale, currency)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.finalValue}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.input.finalValue, locale, currency)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.annualizedRoi}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatPercent(result.annualizedRoiPercent, locale)}%
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.investmentMultiple}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatNumber(result.investmentMultiple, locale, { maximumFractionDigits: 2 })}x
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {labels.scenarioTitle}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.scenarioDescription}
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {scenarios.map((scenario) => (
                                <div
                                    key={scenario.key}
                                    className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950/40"
                                >
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {scenario.label}
                                    </p>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                        {formatCurrency(scenario.result.input.finalValue, locale, currency)}
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        {formatPercent(scenario.result.roiPercent, locale)}%
                                    </p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {formatCurrency(scenario.result.netProfit, locale, currency)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                                <tbody className="divide-y divide-zinc-100 bg-white/70 dark:divide-zinc-800 dark:bg-zinc-950/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.initialInvestment}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.input.initialInvestment, locale, currency)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.additionalCosts}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.input.additionalCosts, locale, currency)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.breakEvenFinalValue}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.breakEvenFinalValue, locale, currency)}
                                        </td>
                                    </tr>
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