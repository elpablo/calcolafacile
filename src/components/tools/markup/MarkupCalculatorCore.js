"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:markup-calculator";

const MODES = ["fromPrice", "targetMarkup"];

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState, sample) {
    if (!shouldLoadSavedState) {
        return { ...sample };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        mode: MODES.includes(stored?.mode) ? stored.mode : sample.mode,
        cost: typeof stored?.cost === "string" ? stored.cost : sample.cost,
        sellingPrice:
            typeof stored?.sellingPrice === "string" ? stored.sellingPrice : sample.sellingPrice,
        targetMarkup:
            typeof stored?.targetMarkup === "string" ? stored.targetMarkup : sample.targetMarkup,
    };
}

export default function MarkupCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <MarkupCalculatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function MarkupCalculatorCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        locale,
        currency,
        currencyAffix,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, sample);
    const [mode, setMode] = useState(initialState.mode);
    const [cost, setCost] = useState(initialState.cost);
    const [sellingPrice, setSellingPrice] = useState(initialState.sellingPrice);
    const [targetMarkup, setTargetMarkup] = useState(initialState.targetMarkup);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { mode, cost, sellingPrice, targetMarkup });
    }, [shouldLoadSavedState, mode, cost, sellingPrice, targetMarkup]);

    const costNumber = parseFloat(cost);
    const sellingPriceNumber = parseFloat(sellingPrice);
    const targetMarkupNumber = parseFloat(targetMarkup);

    const isFromPriceValid =
        !Number.isNaN(costNumber) &&
        !Number.isNaN(sellingPriceNumber) &&
        costNumber > 0 &&
        sellingPriceNumber >= 0;

    const isTargetMarkupValid =
        !Number.isNaN(costNumber) &&
        !Number.isNaN(targetMarkupNumber) &&
        costNumber > 0 &&
        targetMarkupNumber >= 0;

    const isValid = mode === "fromPrice" ? isFromPriceValid : isTargetMarkupValid;

    const profit = isFromPriceValid ? sellingPriceNumber - costNumber : 0;
    const markup = isFromPriceValid ? (profit / costNumber) * 100 : 0;

    const priceFromMarkup = isTargetMarkupValid
        ? costNumber * (1 + targetMarkupNumber / 100)
        : 0;
    const profitFromMarkup = isTargetMarkupValid ? priceFromMarkup - costNumber : 0;

    const formatCurrency = (value) =>
        value.toLocaleString(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatPercent = (value) =>
        value.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    const copyText =
        mode === "fromPrice"
            ? `${labels.profitLabel}: ${formatCurrency(profit)}\n${labels.markupLabel}: ${formatPercent(markup)}%`
            : `${labels.priceLabel}: ${formatCurrency(priceFromMarkup)}\n${labels.profitLabel}: ${formatCurrency(profitFromMarkup)}`;

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            description={description}
            examples={examples}
            faq={faq}
            contextualTools={contextualTools}
        >
            <div className="mb-6">
                <label className={labelClass}>{labels.modeLabel}</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="fromPrice">{labels.modeFromPrice}</option>
                    <option value="targetMarkup">{labels.modeTargetMarkup}</option>
                </select>
            </div>

            <ToolInput
                label={labels.costLabel}
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                prefix={currencyAffix?.prefix}
                suffix={currencyAffix?.suffix}
                placeholder={labels.costPlaceholder}
                helpText={labels.costHelp}
            />

            {mode === "fromPrice" && (
                <ToolInput
                    label={labels.priceLabel}
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    prefix={currencyAffix?.prefix}
                    suffix={currencyAffix?.suffix}
                    placeholder={labels.pricePlaceholder}
                />
            )}

            {mode === "targetMarkup" && (
                <ToolInput
                    label={labels.targetMarkupLabel}
                    value={targetMarkup}
                    onChange={(e) => setTargetMarkup(e.target.value)}
                    suffix="%"
                    placeholder={labels.targetMarkupPlaceholder}
                />
            )}

            <ResultBox copyText={copyText} lang={lang}>
                {mode === "fromPrice" ? (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.profitLabel}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatCurrency(profit)}
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.markupLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatPercent(markup)}%
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                {labels.invalidFromPrice}
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                {labels.detailFromPrice({
                                    cost: formatCurrency(costNumber),
                                    price: formatCurrency(sellingPriceNumber),
                                    markup: formatPercent(markup),
                                })}
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.priceLabel}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatCurrency(priceFromMarkup)}
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.profitLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(profitFromMarkup)}
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                {labels.invalidTargetMarkup}
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                {labels.detailTargetMarkup({
                                    cost: formatCurrency(costNumber),
                                    markup: formatPercent(targetMarkupNumber),
                                    price: formatCurrency(priceFromMarkup),
                                })}
                            </p>
                        )}
                    </>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
