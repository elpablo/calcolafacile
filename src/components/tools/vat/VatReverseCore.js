"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import {
    VAT_RATE_GROUPS,
    calculateVat,
    normalizeVatInput,
    parseVatQueryParams,
} from "./vatCalculatorLogic";

function subscribeToHydration() {
    return () => {};
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
    if (groupKey === "uk") return labels.ukRatesLabel ?? "UK";
    if (groupKey === "italy") return labels.italyRatesLabel ?? "Italy";
    return groupKey;
}

/**
 * Shared core for VAT Reverse Calculator and VAT Removal Calculator.
 * Both tools perform the same calculation (reverse VAT from a gross amount)
 * but are framed with different copy via the `content` locale prop.
 *
 * @param {{ content: object }} props
 */
export default function VatReverseCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <VatReverseCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
        />
    );
}

function VatReverseCoreContent({ content, searchParams }) {
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

    const initialInput = (() => {
        if ([...searchParams.keys()].some((key) => ["amount", "rate"].includes(key))) {
            return parseVatQueryParams(searchParams);
        }

        return normalizeVatInput({
            amount: sample?.amount ?? 120,
            rate: sample?.rate ?? 20,
            mode: "remove",
        });
    })();

    const defaultAmount = String(initialInput.amount);
    const defaultRate = String(initialInput.rate);

    const [amount, setAmount] = useState(defaultAmount);
    const [rate, setRate] = useState(defaultRate);

    const result = useMemo(() => {
        return calculateVat(
            normalizeVatInput({ amount, rate, mode: "remove" }),
        );
    }, [amount, rate]);

    const invalidAmount = Number(amount) < 0;

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    return (
        <>
            {content.faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(content.faqSchema),
                    }}
                />
            )}
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
                    <label htmlFor="vr-amount" className={labelClass}>
                        {labels.amountLabel}
                    </label>
                    <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-blue-400">
                        <input
                            id="vr-amount"
                            name="vr-amount"
                            type="number"
                            value={amount}
                            min="0"
                            step="0.01"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={labels.amountPlaceholder}
                            className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                        />
                        <span className="flex min-h-12 items-center border-l border-zinc-200 px-3 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                            {labels.currencySymbol ?? "$"}
                        </span>
                    </div>
                    {labels.amountHelp && (
                        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.amountHelp}
                        </p>
                    )}
                    {labels.currencyNote && (
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {labels.currencyNote}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="vr-rate" className={labelClass}>
                        {labels.rateLabel}
                    </label>
                    <div className="flex overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-blue-400">
                        <input
                            id="vr-rate"
                            name="vr-rate"
                            type="number"
                            value={rate}
                            min="0"
                            max="100"
                            step="0.01"
                            onChange={(e) => setRate(e.target.value)}
                            className="min-h-12 min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                        />
                        <span className="flex min-h-12 items-center border-l border-zinc-200 px-3 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                            %
                        </span>
                    </div>
                    {labels.rateHelp && (
                        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.rateHelp}
                        </p>
                    )}
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
                                        normalizeVatInput({ rate }).rate ===
                                        presetRate;
                                    return (
                                        <button
                                            key={presetRate}
                                            type="button"
                                            onClick={() =>
                                                setRate(String(presetRate))
                                            }
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

                <ResultBox
                    lang={lang}
                    testId="vat-reverse-result"
                    copyText={[
                        `${labels.netLabel}: ${formatCurrency(result.netAmount, locale, currency)}`,
                        `${labels.vatLabel}: ${formatCurrency(result.vatAmount, locale, currency)}`,
                    ].join("\n")}
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.netLabel}
                            </p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                {formatCurrency(result.netAmount, locale, currency)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.vatLabel}
                            </p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                {formatCurrency(result.vatAmount, locale, currency)}
                            </p>
                        </div>
                    </div>
                    {invalidAmount && (
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {labels.invalidAmount}
                        </p>
                    )}
                </ResultBox>
            </ToolLayout>
        </>
    );
}
