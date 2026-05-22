"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { cryptoProfitCalculatorExamples } from "./cryptoProfitCalculatorExamples";
import {
    DEFAULT_OPTIONS,
    buildCryptoProfitQueryParams,
    calculateCryptoProfit,
    calculateCryptoScenario,
    normalizeCryptoProfitInput,
    parseCryptoProfitQueryParams,
} from "./cryptoProfitCalculatorLogic";

const STORAGE_KEY = "calcolafacile:crypto-profit-calculator";

function subscribeToHydration() {
    return () => {};
}

function hasCryptoProfitQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["cryptoSymbol", "buyPrice", "sellPrice", "quantity", "buyFee", "sellFee"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const queryState = parseCryptoProfitQueryParams(searchParams);

    if (hasCryptoProfitQueryParams(searchParams)) {
        return queryState;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_OPTIONS;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeCryptoProfitInput({ ...DEFAULT_OPTIONS, ...stored });
}

function formatCurrency(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatCrypto(value, locale) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 8,
    }).format(value);
}

function formatPercent(value, locale) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
    }).format(value);
}

function buildExampleHref(currentPath, example) {
    return `${currentPath}?${buildCryptoProfitQueryParams(example.params)}`;
}

function Field({ id, label, help, value, min, step, suffix, onChange }) {
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

function TextField({ id, label, help, value, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-[50px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                spellCheck={false}
            />
            {help ? (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {help}
                </p>
            ) : null}
        </div>
    );
}

export default function CryptoProfitCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <CryptoProfitCalculatorCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function CryptoProfitCalculatorCoreContent({ content, searchParams, shouldLoadSavedState }) {
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
        () => normalizeCryptoProfitInput(formState),
        [formState],
    );
    const result = useMemo(
        () => calculateCryptoProfit(normalizedInput),
        [normalizedInput],
    );
    const scenarios = useMemo(
        () => [
            {
                key: "bearish",
                label: labels.scenarioBearish,
                multiplier: 0.75,
                result: calculateCryptoScenario(normalizedInput, 0.75),
            },
            {
                key: "current",
                label: labels.scenarioCurrent,
                multiplier: 1,
                result,
            },
            {
                key: "bullish",
                label: labels.scenarioBullish,
                multiplier: 1.5,
                result: calculateCryptoScenario(normalizedInput, 1.5),
            },
        ],
        [labels.scenarioBearish, labels.scenarioBullish, labels.scenarioCurrent, normalizedInput, result],
    );

    const enrichedExamples = useMemo(
        () =>
            cryptoProfitCalculatorExamples.map((example) => ({
                ...example,
                title: example.title?.[lang] ?? example.title?.en ?? example.title,
                description:
                    example.description?.[lang] ??
                    example.description?.en ??
                    example.description,
                href: buildExampleHref(currentPath, example),
            })),
        [currentPath, lang],
    );

    const setValue = (key, value) => {
        setFormState((current) => ({ ...current, [key]: value }));
    };

    const applyExample = (params) => {
        setFormState(normalizeCryptoProfitInput(params));
    };

    const copyText = [
        `${labels.cryptoSymbol}: ${result.input.cryptoSymbol}`,
        `${labels.totalCost}: ${formatCurrency(result.totalCost, locale, currency)}`,
        `${labels.totalProceeds}: ${formatCurrency(result.totalProceeds, locale, currency)}`,
        `${labels.profit}: ${formatCurrency(result.profit, locale, currency)}`,
        `${labels.roi}: ${formatPercent(result.roiPercent, locale)}%`,
        `${labels.breakEvenSellPrice}: ${formatCurrency(result.breakEvenSellPrice, locale, currency)}`,
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
                    <TextField
                        id="crypto-symbol"
                        label={labels.cryptoSymbol}
                        help={labels.cryptoSymbolHelp}
                        value={formState.cryptoSymbol}
                        onChange={(value) => setValue("cryptoSymbol", value)}
                    />
                    <Field
                        id="crypto-quantity"
                        label={labels.quantity}
                        help={labels.quantityHelp}
                        value={formState.quantity}
                        min="0"
                        step="0.00000001"
                        suffix={result.input.cryptoSymbol}
                        onChange={(value) => setValue("quantity", value)}
                    />
                    <Field
                        id="crypto-buy-price"
                        label={labels.buyPrice}
                        help={labels.buyPriceHelp}
                        value={formState.buyPrice}
                        min="0"
                        step="0.01"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("buyPrice", value)}
                    />
                    <Field
                        id="crypto-sell-price"
                        label={labels.sellPrice}
                        help={labels.sellPriceHelp}
                        value={formState.sellPrice}
                        min="0"
                        step="0.01"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("sellPrice", value)}
                    />
                    <Field
                        id="crypto-buy-fee"
                        label={labels.buyFee}
                        help={labels.buyFeeHelp}
                        value={formState.buyFee}
                        min="0"
                        step="0.01"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("buyFee", value)}
                    />
                    <Field
                        id="crypto-sell-fee"
                        label={labels.sellFee}
                        help={labels.sellFeeHelp}
                        value={formState.sellFee}
                        min="0"
                        step="0.01"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("sellFee", value)}
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

            <ResultBox
                copyText={copyText}
                label={labels.resultTitle}
                lang={lang}
                testId="crypto-profit-result"
            >
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
                            {formatCurrency(result.profit, locale, currency)}
                        </p>
                        <p className="mt-1 text-sm">
                            {labels.roi}: {formatPercent(result.roiPercent, locale)}%
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalCost}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.totalCost, locale, currency)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalProceeds}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.totalProceeds, locale, currency)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.priceChange}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatPercent(result.priceChangePercent, locale)}%
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.breakEvenSellPrice}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.breakEvenSellPrice, locale, currency)}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {labels.whatIfTitle}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.whatIfDescription}
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
                                        {formatCurrency(scenario.result.input.sellPrice, locale, currency)}
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        {formatCurrency(scenario.result.profit, locale, currency)}
                                    </p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {formatPercent(scenario.result.roiPercent, locale)}%
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
                                            {labels.quantity}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCrypto(result.input.quantity, locale)} {result.input.cryptoSymbol}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.profitPerUnit}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.profitPerUnit, locale, currency)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.grossCost}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.grossCost, locale, currency)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.grossProceeds}
                                        </th>
                                        <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                            {formatCurrency(result.grossProceeds, locale, currency)}
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