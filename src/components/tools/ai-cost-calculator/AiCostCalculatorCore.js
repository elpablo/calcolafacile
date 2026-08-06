"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";

import ToolLayout, {
    ResultBox,
    ToolInput,
} from "@/components/ToolLayout";

import {
    getProvider,
    getProviderKeys,
    getProviderModelKeys,
} from "@/config/aiModels";

import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    AI_COST_USE_CASE_PRESETS,
    calculateAiCostEstimate,
    formatCurrencyDeterministic as formatCurrency,
    formatNumberDeterministic as formatNumber,
    getDefaultModelKeyForProvider,
    getModelCostComparison,
    normalizeAiCostInput,
} from "./aiCostCalculatorLogic";
const STORAGE_KEY = "calcolafacile:ai-cost-calculator";

function hasAiCostQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        [
            "providerKey",
            "modelKey",
            "inputTokens",
            "outputTokens",
            "requestsPerDay",
            "preset",
        ].includes(key),
    );
}

function parseAiCostQueryParams(searchParams) {
    return normalizeAiCostInput({
        providerKey: searchParams.get("providerKey"),
        modelKey: searchParams.get("modelKey"),
        inputTokens: searchParams.get("inputTokens"),
        outputTokens: searchParams.get("outputTokens"),
        requestsPerDay: searchParams.get("requestsPerDay"),
        activePresetKey: searchParams.get("preset"),
    });
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const fallback = normalizeAiCostInput();

    if (hasAiCostQueryParams(searchParams)) {
        return parseAiCostQueryParams(searchParams);
    }

    if (!shouldLoadSavedState) {
        return fallback;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeAiCostInput({ ...fallback, ...stored });
}

function getInputValue(valueOrEvent) {
    if (typeof valueOrEvent === "string") {
        return valueOrEvent;
    }

    return valueOrEvent?.target?.value ?? "";
}

const selectClassName = "h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 pr-10 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const selectWrapperClassName = "relative after:pointer-events-none after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:text-zinc-500 after:content-['▾'] dark:after:text-zinc-400";

function subscribeToHydration() {
    return () => {};
}

export default function AiCostCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <AiCostCalculatorCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function AiCostCalculatorCoreContent({ content, searchParams, shouldLoadSavedState }) {
    const {
        locale,
        currency = "USD",
        lang,
        currentPath,
        metadata,
        labels,
        examples,
        faq,
        faqSchema,
        contextualTools,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, searchParams);

    const providerKeys = getProviderKeys();

    const [providerKey, setProviderKey] = useState(initialState.providerKey);
    const [modelKey, setModelKey] = useState(initialState.modelKey);
    const [inputTokens, setInputTokens] = useState(initialState.inputTokens);
    const [outputTokens, setOutputTokens] = useState(initialState.outputTokens);
    const [requestsPerDay, setRequestsPerDay] = useState(initialState.requestsPerDay);
    const [activePresetKey, setActivePresetKey] = useState(
        initialState.activePresetKey,
    );

    const provider = getProvider(providerKey);
    const providerModels = provider.models;
    const providerModelKeys = getProviderModelKeys(providerKey);

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            providerKey,
            modelKey,
            inputTokens,
            outputTokens,
            requestsPerDay,
            activePresetKey,
        });
    }, [shouldLoadSavedState, providerKey, modelKey, inputTokens, outputTokens, requestsPerDay, activePresetKey]);

    const estimate = useMemo(
        () =>
            calculateAiCostEstimate({
                providerKey,
                modelKey,
                inputTokens,
                outputTokens,
                requestsPerDay,
                activePresetKey,
            }),
        [
            providerKey,
            modelKey,
            inputTokens,
            outputTokens,
            requestsPerDay,
            activePresetKey,
        ],
    );

    const calculations = estimate.calculations;
    const annualCost = calculations.annualCost;
    const activePreset = AI_COST_USE_CASE_PRESETS.find(
        (preset) => preset.key === activePresetKey,
    );

    const comparison = useMemo(
        () =>
            getModelCostComparison({
                providerKey,
                modelKey,
                inputTokens,
                outputTokens,
                requestsPerDay,
                activePresetKey,
            }),
        [
            providerKey,
            modelKey,
            inputTokens,
            outputTokens,
            requestsPerDay,
            activePresetKey,
        ],
    );

    const applyPreset = (preset) => {
        setInputTokens(preset.inputTokens);
        setOutputTokens(preset.outputTokens);
        setRequestsPerDay(preset.requestsPerDay);
        setActivePresetKey(preset.key);
    };

    return (
        <>
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
            <ToolLayout
            title={metadata.title}
            lang={lang}
            currentPath={currentPath}
            description={metadata.description}
            intro={metadata.intro}
            faq={faq}
            contextualTools={contextualTools}
            examples={examples}
        >
            <div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="ai-cost-provider"
                            className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                        >
                            {labels.provider}
                        </label>

                        <div className={selectWrapperClassName}>
                            <select
                                id="ai-cost-provider"
                                name="provider"
                                aria-label={labels.provider}
                                data-testid="ai-cost-provider"
                                value={providerKey}
                                onChange={(event) => {
                                    const nextProvider = event.target.value;

                                    setActivePresetKey(null);
                                    setProviderKey(nextProvider);
                                    setModelKey(getDefaultModelKeyForProvider(nextProvider));
                                }}
                                className={selectClassName}
                            >
                                {providerKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {getProvider(key).label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="ai-cost-model"
                            className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                        >
                            {labels.model}
                        </label>

                        <div className={selectWrapperClassName}>
                            <select
                                id="ai-cost-model"
                                name="model"
                                aria-label={labels.model}
                                data-testid="ai-cost-model"
                                value={modelKey}
                                onChange={(event) => {
                                    setActivePresetKey(null);
                                    setModelKey(event.target.value);
                                }}
                                className={selectClassName}
                            >
                                {providerModelKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {providerModels[key].label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <ToolInput
                        id="ai-cost-input-tokens"
                        name="inputTokens"
                        testId="ai-cost-input-tokens"
                        label={labels.inputTokens}
                        value={inputTokens}
                        onChange={(valueOrEvent) => {
                            setActivePresetKey(null);
                            setInputTokens(getInputValue(valueOrEvent));
                        }}
                        type="number"
                        min="0"
                        placeholder="10000"
                    />

                    <ToolInput
                        id="ai-cost-output-tokens"
                        name="outputTokens"
                        testId="ai-cost-output-tokens"
                        label={labels.outputTokens}
                        value={outputTokens}
                        onChange={(valueOrEvent) => {
                            setActivePresetKey(null);
                            setOutputTokens(getInputValue(valueOrEvent));
                        }}
                        type="number"
                        min="0"
                        placeholder="5000"
                    />

                    <ToolInput
                        id="ai-cost-requests-per-day"
                        name="requestsPerDay"
                        testId="ai-cost-requests-per-day"
                        label={labels.requestsPerDay}
                        value={requestsPerDay}
                        onChange={(valueOrEvent) => {
                            setActivePresetKey(null);
                            setRequestsPerDay(getInputValue(valueOrEvent));
                        }}
                        type="number"
                        min="0"
                        placeholder="100"
                    />
                </div>

                <section className="mt-8">
                    <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                {lang === "it"
                                    ? "Preset di utilizzo"
                                    : "Usage presets"}
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {lang === "it"
                                    ? "Parti da scenari realistici e modifica i valori in base al tuo prodotto."
                                    : "Start from realistic scenarios and adjust the values for your product."}
                            </p>
                        </div>
                        {activePreset ? (
                            <p className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                {lang === "it"
                                    ? "Preset attivo"
                                    : "Active preset"}
                                : {activePreset.label[lang]}
                            </p>
                        ) : null}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        {AI_COST_USE_CASE_PRESETS.map((preset) => {
                            const isActive = activePresetKey === preset.key;

                            return (
                                <button
                                    key={preset.key}
                                    type="button"
                                    onClick={() => applyPreset(preset)}
                                    className={`rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                                        isActive
                                            ? "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-100"
                                            : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500"
                                    }`}
                                >
                                    <p className="font-semibold text-zinc-950 dark:text-zinc-50">
                                        {preset.label[lang]}
                                    </p>
                                    <p className="mt-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                                        {preset.description[lang]}
                                    </p>
                                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        {formatNumber(
                                            Number(preset.requestsPerDay),
                                            locale,
                                        )}{" "}
                                        {lang === "it"
                                            ? "richieste/giorno"
                                            : "requests/day"}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/80 p-5 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/30">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                        {lang === "it"
                            ? "Costo mensile stimato"
                            : "Estimated monthly cost"}
                    </p>
                    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                                {formatCurrency(
                                    calculations.monthlyCost,
                                    locale,
                                    currency,
                                )}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                                {lang === "it"
                                    ? "Stima basata su modello, token medi e richieste giornaliere."
                                    : "Estimate based on model, average tokens and daily requests."}
                            </p>
                        </div>
                        <div className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-3">
                            <div className="rounded-xl bg-white/70 p-3 shadow-sm dark:bg-zinc-900/70">
                                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    {lang === "it"
                                        ? "Per richiesta"
                                        : "Per request"}
                                </p>
                                <p className="mt-1 font-bold text-zinc-950 dark:text-zinc-50">
                                    {formatCurrency(
                                        calculations.requestCost,
                                        locale,
                                        currency,
                                    )}
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/70 p-3 shadow-sm dark:bg-zinc-900/70">
                                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    {lang === "it" ? "Al giorno" : "Per day"}
                                </p>
                                <p className="mt-1 font-bold text-zinc-950 dark:text-zinc-50">
                                    {formatCurrency(
                                        calculations.dailyCost,
                                        locale,
                                        currency,
                                    )}
                                </p>
                            </div>
                            <div className="rounded-xl bg-white/70 p-3 shadow-sm dark:bg-zinc-900/70">
                                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    {lang === "it" ? "All'anno" : "Per year"}
                                </p>
                                <p className="mt-1 font-bold text-zinc-950 dark:text-zinc-50">
                                    {formatCurrency(
                                        annualCost,
                                        locale,
                                        currency,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <ResultBox
                            label={labels.results.inputCost}
                            testId="ai-cost-input-cost"
                            copyText={calculations.inputCost.toFixed(6)}
                            lang={lang}
                            compactCopy
                        >
                            <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                                {formatCurrency(
                                    calculations.inputCost,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </ResultBox>

                        <ResultBox
                            label={labels.results.outputCost}
                            testId="ai-cost-output-cost"
                            copyText={calculations.outputCost.toFixed(6)}
                            lang={lang}
                            compactCopy
                        >
                            <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                                {formatCurrency(
                                    calculations.outputCost,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </ResultBox>

                        <ResultBox
                            label={labels.results.requestCost}
                            testId="ai-cost-request-cost"
                            copyText={calculations.requestCost.toFixed(6)}
                            lang={lang}
                            compactCopy
                        >
                            <p className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300 sm:text-2xl">
                                {formatCurrency(
                                    calculations.requestCost,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </ResultBox>

                        <ResultBox
                            label={labels.results.dailyCost}
                            testId="ai-cost-daily-cost"
                            copyText={calculations.dailyCost.toFixed(6)}
                            lang={lang}
                            compactCopy
                        >
                            <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                                {formatCurrency(
                                    calculations.dailyCost,
                                    locale,
                                    currency,
                                )}
                            </p>
                        </ResultBox>
                    </div>
                </section>

                <section className="mt-8" data-testid="ai-cost-comparison">
                    <div className="mb-3">
                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {labels.comparison.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {labels.comparison.description}
                        </p>
                    </div>

                    {comparison.entries.length === 0 ? (
                        <p className="rounded-xl border border-zinc-200 bg-white/70 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                            {labels.comparison.empty}
                        </p>
                    ) : (
                        <>
                            <div className="mb-4 grid gap-3 sm:grid-cols-3">
                                <div
                                    data-testid="ai-cost-comparison-cheapest"
                                    className="rounded-xl border p-4 shadow-sm"
                                    style={{
                                        backgroundColor: "var(--cf-success-bg)",
                                        borderColor: "var(--cf-success-border)",
                                    }}
                                >
                                    <p
                                        className="text-xs font-semibold uppercase tracking-wide"
                                        style={{ color: "var(--cf-success-text)" }}
                                    >
                                        {labels.comparison.cheapestTitle}
                                    </p>
                                    <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                                        {comparison.cheapest.providerLabel} · {comparison.cheapest.label}
                                    </p>
                                    <p
                                        className="mt-1 text-xl font-bold"
                                        style={{ color: "var(--cf-success-text)" }}
                                    >
                                        {formatCurrency(comparison.cheapest.monthlyCost, locale, currency)}
                                    </p>
                                    {comparison.cheapestTieCount > 1 && (
                                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                            {labels.comparison.tieNote(comparison.cheapestTieCount - 1)}
                                        </p>
                                    )}
                                </div>

                                <div
                                    data-testid="ai-cost-comparison-most-expensive"
                                    className="rounded-xl border p-4 shadow-sm"
                                    style={{
                                        backgroundColor: "var(--cf-danger-bg)",
                                        borderColor: "var(--cf-danger-border)",
                                    }}
                                >
                                    <p
                                        className="text-xs font-semibold uppercase tracking-wide"
                                        style={{ color: "var(--cf-danger-text)" }}
                                    >
                                        {labels.comparison.mostExpensiveTitle}
                                    </p>
                                    <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                                        {comparison.mostExpensive.providerLabel} · {comparison.mostExpensive.label}
                                    </p>
                                    <p
                                        className="mt-1 text-xl font-bold"
                                        style={{ color: "var(--cf-danger-text)" }}
                                    >
                                        {formatCurrency(comparison.mostExpensive.monthlyCost, locale, currency)}
                                    </p>
                                    {comparison.mostExpensiveTieCount > 1 && (
                                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                            {labels.comparison.tieNote(comparison.mostExpensiveTieCount - 1)}
                                        </p>
                                    )}
                                </div>

                                {comparison.selected && (
                                    <div
                                        data-testid="ai-cost-comparison-selected"
                                        className="rounded-xl border p-4 shadow-sm"
                                        style={{
                                            backgroundColor: "var(--cf-info-bg)",
                                            borderColor: "var(--cf-info-border)",
                                        }}
                                    >
                                        <p
                                            className="text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: "var(--cf-info-text)" }}
                                        >
                                            {labels.comparison.yourSelectionTitle}
                                        </p>
                                        <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                                            {comparison.selected.providerLabel} · {comparison.selected.label}
                                        </p>
                                        <p
                                            className="mt-1 text-xl font-bold"
                                            style={{ color: "var(--cf-info-text)" }}
                                        >
                                            {formatCurrency(comparison.selected.monthlyCost, locale, currency)}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                            {labels.comparison.selectedRank(
                                                comparison.selectedRank,
                                                comparison.totalCount,
                                            )}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                            {comparison.selectedCostDeltaFromCheapest > 0
                                                ? labels.comparison.selectedDelta(
                                                      formatCurrency(
                                                          comparison.selectedCostDeltaFromCheapest,
                                                          locale,
                                                          currency,
                                                      ),
                                                  )
                                                : labels.comparison.selectedIsCheapest}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {comparison.allEqual && (
                                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                                    {labels.comparison.allEqualNote}
                                </p>
                            )}

                            <div
                                data-testid="ai-cost-comparison-chart"
                                className="mb-6 rounded-xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
                            >
                                <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {labels.comparison.chartTitle}
                                </p>
                                <div className="max-h-105 min-w-0 space-y-2 overflow-y-auto pr-1">
                                    {comparison.entries.map((entry) => {
                                        const widthPercent =
                                            comparison.maxMonthlyCost > 0
                                                ? (entry.monthlyCost / comparison.maxMonthlyCost) * 100
                                                : 0;

                                        return (
                                            <div
                                                key={`${entry.providerKey}:${entry.modelKey}`}
                                                data-testid={`ai-cost-comparison-chart-row-${entry.providerKey}-${entry.modelKey}`}
                                                data-selected={entry.isSelected}
                                                className="rounded-lg border p-2"
                                                style={{
                                                    backgroundColor: entry.isSelected
                                                        ? "var(--cf-success-bg)"
                                                        : "transparent",
                                                    borderColor: entry.isSelected
                                                        ? "var(--cf-success-border)"
                                                        : "transparent",
                                                }}
                                            >
                                                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs">
                                                    <span className="font-medium wrap-break-word text-zinc-700 dark:text-zinc-300">
                                                        {entry.providerLabel} · {entry.label}
                                                        {entry.isSelected && (
                                                            <span
                                                                className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                                                style={{
                                                                    backgroundColor: "var(--cf-success-text)",
                                                                    color: "var(--cf-success-badge-text)",
                                                                }}
                                                            >
                                                                {labels.comparison.selectedBadge}
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="shrink-0 font-semibold text-zinc-900 dark:text-zinc-100">
                                                        {formatCurrency(entry.monthlyCost, locale, currency)}
                                                    </span>
                                                </div>
                                                <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${widthPercent}%`,
                                                            backgroundColor: entry.isSelected
                                                                ? "var(--cf-success-text)"
                                                                : "var(--cf-bar-default)",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                data-testid="ai-cost-comparison-table"
                                className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                            >
                                <p className="border-b border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                                    {labels.comparison.tableTitle}
                                </p>
                                <div className="max-h-105 overflow-auto">
                                    <table className="w-full table-fixed border-collapse text-left text-sm">
                                        <thead className="sticky top-0 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                            <tr>
                                                <th className="w-10 px-3 py-2 font-semibold">
                                                    {labels.comparison.tableHeaders.rank}
                                                </th>
                                                <th className="px-3 py-2 font-semibold">
                                                    {labels.comparison.tableHeaders.model}
                                                </th>
                                                <th className="w-20 px-3 py-2 font-semibold sm:w-28">
                                                    {labels.comparison.tableHeaders.provider}
                                                </th>
                                                <th className="w-20 px-3 py-2 text-right font-semibold sm:w-28">
                                                    {labels.comparison.tableHeaders.monthlyCost}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparison.entries.map((entry, index) => (
                                                <tr
                                                    key={`${entry.providerKey}:${entry.modelKey}`}
                                                    data-testid={`ai-cost-comparison-row-${entry.providerKey}-${entry.modelKey}`}
                                                    data-selected={entry.isSelected}
                                                    className="border-t border-zinc-100 dark:border-zinc-800"
                                                    style={{
                                                        backgroundColor: entry.isSelected
                                                            ? "var(--cf-success-bg)"
                                                            : "transparent",
                                                    }}
                                                >
                                                    <td className="px-3 py-2 text-zinc-500 dark:text-zinc-400">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                                                        {entry.label}
                                                        {entry.isSelected && (
                                                            <span
                                                                data-testid="ai-cost-comparison-selected-badge"
                                                                className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                                                style={{
                                                                    backgroundColor: "var(--cf-success-text)",
                                                                    color: "var(--cf-success-badge-text)",
                                                                }}
                                                            >
                                                                {labels.comparison.selectedBadge}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-zinc-600 dark:text-zinc-300">
                                                        {entry.providerLabel}
                                                    </td>
                                                    <td className="px-3 py-2 text-right font-semibold text-zinc-900 dark:text-zinc-100">
                                                        {formatCurrency(entry.monthlyCost, locale, currency)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {labels.pricingDisclaimerTitle}
                    </p>
                    <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                        {labels.pricingDisclaimer}
                    </p>
                </div>
            </div>
        </ToolLayout>
        </>
    );
}