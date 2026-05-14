"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:vat-calculator";

const RATES = [22, 10, 4];
const MODES = ["add", "remove"];

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState, sample) {
    if (!shouldLoadSavedState) {
        return { ...sample };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        amount: typeof stored?.amount === "string" ? stored.amount : sample.amount,
        rate: RATES.includes(stored?.rate) ? stored.rate : sample.rate,
        mode: MODES.includes(stored?.mode) ? stored.mode : sample.mode,
    };
}

export default function VatCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <VatCalculatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function VatCalculatorCoreContent({ content, shouldLoadSavedState }) {
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
    const [amount, setAmount] = useState(initialState.amount);
    const [rate, setRate] = useState(initialState.rate);
    const [mode, setMode] = useState(initialState.mode);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { amount, rate, mode });
    }, [shouldLoadSavedState, amount, rate, mode]);

    const calculate = () => {
        const value = parseFloat(amount);
        if (Number.isNaN(value) || value < 0) return { net: 0, vat: 0, gross: 0 };
        if (mode === "add") {
            const vat = value * (rate / 100);
            return { net: value, vat, gross: value + vat };
        }
        const net = value / (1 + rate / 100);
        const vat = value - net;
        return { net, vat, gross: value };
    };

    const result = calculate();

    const formatCurrency = (value) =>
        value.toLocaleString(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

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
            <ToolInput
                label={labels.amountLabel}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={labels.amountPlaceholder}
                helpText={labels.amountHelp}
            />

            <div className="mb-4">
                <label className={labelClass}>{labels.rateLabel}</label>
                <select
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className={selectClass}
                >
                    {RATES.map((r) => (
                        <option key={r} value={r}>{`${r}%`}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className={labelClass}>{labels.modeLabel}</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="add">{labels.modeAdd}</option>
                    <option value="remove">{labels.modeRemove}</option>
                </select>
            </div>

            <ResultBox lang={lang}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{labels.totalLabel}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(result.gross)}
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.netLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.net)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.vatLabel}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.vat)}
                        </p>
                    </div>
                </div>

                {parseFloat(amount) < 0 && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.invalidAmount}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
