"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    DEFAULT_VAT_INPUT,
    VAT_MODES,
    VAT_RATE_GROUPS,
    buildVatQueryParams,
    calculateVat,
    normalizeVatInput,
    parseVatQueryParams,
} from "./vatCalculatorLogic";

const STORAGE_KEY = "calcolafacile:vat-calculator";

function subscribeToHydration() {
    return () => {};
}

function hasVatQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["amount", "rate", "mode"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams, sample) {
    const fallback = normalizeVatInput({ ...DEFAULT_VAT_INPUT, ...sample });

    if (hasVatQueryParams(searchParams)) {
        return parseVatQueryParams(searchParams);
    }

    if (!shouldLoadSavedState) {
        return fallback;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeVatInput({ ...fallback, ...stored });
}

function formatCurrency(value, locale, currency) {
    return value.toLocaleString(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function getRateGroupLabel(labels, groupKey) {
    if (groupKey === "uk") {
        return labels.ukRatesLabel ?? "UK";
    }

    if (groupKey === "italy") {
        return labels.italyRatesLabel ?? "Italy";
    }

    return groupKey;
}

function getCurrencySymbol(currency, locale) {
    const parts = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
    }).formatToParts(0);

    return parts.find((part) => part.type === "currency")?.value ?? currency;
}

function buildExampleHref(currentPath, params) {
    return `${currentPath}?${buildVatQueryParams(params)}`;
}

export default function VatCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <VatCalculatorCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function VatCalculatorCoreContent({ content, searchParams, shouldLoadSavedState }) {
    const {
        lang,
        locale,
        currency,
        title,
        currentPath,
        toolKey,
        description,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, searchParams, sample);
    const [amount, setAmount] = useState(String(initialState.amount));
    const [rate, setRate] = useState(String(initialState.rate));
    const [mode, setMode] = useState(initialState.mode);

    const normalizedInput = useMemo(
        () =>
            normalizeVatInput({
                amount,
                rate,
                mode,
            }),
        [amount, rate, mode],
    );

    const result = useMemo(() => calculateVat(normalizedInput), [normalizedInput]);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, normalizedInput);
    }, [shouldLoadSavedState, normalizedInput]);

    const invalidAmount = Number(amount) < 0;

    const applyRate = (nextRate) => {
        setRate(String(nextRate));
    };

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    const currencySymbol = getCurrencySymbol(currency, locale);

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            toolKey={toolKey}
            description={description}
            examples={examples}
            faq={faq}
            contextualTools={contextualTools}
        >
            <div className="mb-4">
                <label htmlFor="vat-amount" className={labelClass}>
                    {labels.amountLabel}
                </label>
                <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-blue-400">
                    <input
                        id="vat-amount"
                        name="vat-amount"
                        type="number"
                        value={amount}
                        min="0"
                        step="0.01"
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder={labels.amountPlaceholder}
                        className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    <span className="flex min-h-12 items-center border-l border-zinc-200 px-3 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        {currencySymbol}
                    </span>
                </div>
                {labels.amountHelp ? (
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.amountHelp}
                    </p>
                ) : null}
            </div>

            <fieldset className="mb-4">
                <legend className={labelClass}>{labels.modeLabel}</legend>
                <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
                    {VAT_MODES.map((option) => {
                        const isSelected = mode === option;
                        const label =
                            option === "add"
                                ? labels.modeAdd
                                : labels.modeRemove;

                        return (
                            <button
                                key={option}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setMode(option)}
                                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                    isSelected
                                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                                        : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-300 hover:bg-blue-50/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <div className="mb-4">
                <label htmlFor="vat-rate" className={labelClass}>
                    {labels.rateLabel}
                </label>
                <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-blue-400">
                    <input
                        id="vat-rate"
                        name="vat-rate"
                        type="number"
                        value={rate}
                        min="0"
                        max="100"
                        step="0.01"
                        onChange={(event) => setRate(event.target.value)}
                        className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    <span className="flex min-h-12 items-center border-l border-zinc-200 px-3 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                        %
                    </span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.rateHelp ??
                        "Use a preset rate or enter a custom VAT percentage."}
                </p>
            </div>

            <div className="mb-5 space-y-3">
                {VAT_RATE_GROUPS.map((group) => (
                    <div key={group.key}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {getRateGroupLabel(labels, group.key)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {group.rates.map((presetRate) => {
                                const isSelected =
                                    normalizedInput.rate === presetRate;

                                return (
                                    <button
                                        key={`${group.key}-${presetRate}`}
                                        type="button"
                                        onClick={() => applyRate(presetRate)}
                                        className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                            isSelected
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                                                : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-300 hover:bg-blue-50/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                                        }`}
                                    >
                                        {presetRate}%
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {labels.salesTaxNote ? (
                <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                    {labels.salesTaxNote}
                </div>
            ) : null}

            <ResultBox
                lang={lang}
                testId="vat-result"
                copyText={[
                    `${labels.totalLabel}: ${formatCurrency(result.grossAmount, locale, currency)}`,
                    `${labels.netLabel}: ${formatCurrency(result.netAmount, locale, currency)}`,
                    `${labels.vatLabel}: ${formatCurrency(result.vatAmount, locale, currency)}`,
                ].join("\n")}
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.totalLabel}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(result.grossAmount, locale, currency)}
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.netLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.netAmount, locale, currency)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.vatLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.vatAmount, locale, currency)}
                        </p>
                    </div>
                </div>

                {invalidAmount ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.invalidAmount}
                    </p>
                ) : null}
            </ResultBox>
        </ToolLayout>
    );
}
