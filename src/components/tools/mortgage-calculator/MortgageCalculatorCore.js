"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { mortgageCalculatorExamples } from "./mortgageCalculatorExamples";
import {
    DEFAULT_OPTIONS,
    buildMortgageQueryParams,
    calculateMortgage,
    normalizeMortgageInput,
    parseMortgageQueryParams,
} from "./mortgageCalculatorLogic";

const STORAGE_KEY = "calcolafacile:mortgage-calculator";

function subscribeToHydration() {
    return () => {};
}

function hasMortgageQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["propertyPrice", "downPayment", "loanAmount", "annualRate", "years"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const queryState = parseMortgageQueryParams(searchParams);

    if (hasMortgageQueryParams(searchParams)) {
        return queryState;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_OPTIONS;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeMortgageInput({ ...DEFAULT_OPTIONS, ...stored });
}

function formatCurrency(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatPercent(value, locale) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
    }).format(value);
}

function buildExampleHref(currentPath, example) {
    return `${currentPath}?${buildMortgageQueryParams(example.params)}`;
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

export default function MortgageCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <MortgageCalculatorCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function MortgageCalculatorCoreContent({ content, searchParams, shouldLoadSavedState }) {
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
        () => normalizeMortgageInput(formState),
        [formState],
    );
    const result = useMemo(
        () => calculateMortgage(normalizedInput),
        [normalizedInput],
    );

    const enrichedExamples = useMemo(
        () =>
            mortgageCalculatorExamples.map((example) => ({
                ...example,

                title:
                    example.title?.[lang] ?? example.title?.en ?? example.title,

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
        setFormState(normalizeMortgageInput(params));
    };

    const copyText = [
        `${labels.monthlyPayment}: ${formatCurrency(result.monthlyPayment, locale, currency)}`,
        `${labels.loanAmount}: ${formatCurrency(result.input.loanAmount, locale, currency)}`,
        `${labels.totalInterest}: ${formatCurrency(result.totalInterest, locale, currency)}`,
        `${labels.totalPaid}: ${formatCurrency(result.totalPaid, locale, currency)}`,
        `${labels.loanToValue}: ${formatPercent(result.loanToValuePercent, locale)}%`,
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
                        id="mortgage-property-price"
                        label={labels.propertyPrice}
                        help={labels.propertyPriceHelp}
                        value={formState.propertyPrice}
                        min="0"
                        step="1000"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("propertyPrice", value)}
                    />
                    <Field
                        id="mortgage-down-payment"
                        label={labels.downPayment}
                        help={labels.downPaymentHelp}
                        value={formState.downPayment}
                        min="0"
                        step="1000"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("downPayment", value)}
                    />
                    <Field
                        id="mortgage-loan-amount"
                        label={labels.loanAmount}
                        help={labels.loanAmountHelp}
                        value={formState.loanAmount}
                        min="0"
                        step="1000"
                        suffix={labels.currencySuffix}
                        onChange={(value) => setValue("loanAmount", value)}
                    />
                    <Field
                        id="mortgage-annual-rate"
                        label={labels.annualRate}
                        help={labels.annualRateHelp}
                        value={formState.annualRate}
                        min="0"
                        max="100"
                        step="0.01"
                        suffix={labels.percentSuffix}
                        onChange={(value) => setValue("annualRate", value)}
                    />
                    <Field
                        id="mortgage-years"
                        label={labels.years}
                        help={labels.yearsHelp}
                        value={formState.years}
                        min="1"
                        max="100"
                        step="1"
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

            <ResultBox copyText={copyText} label={labels.resultTitle} lang={lang} testId="mortgage-result">
                <div className="space-y-5">
                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300">
                        <p className="text-sm font-semibold uppercase tracking-wide">
                            {labels.monthlyPayment}
                        </p>
                        <p className="mt-1 text-3xl font-bold">
                            {formatCurrency(result.monthlyPayment, locale, currency)}
                        </p>
                        <p className="mt-1 text-sm">
                            {labels.forMonths.replace("{months}", result.months)}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalInterest}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.totalInterest, locale, currency)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {labels.totalPaid}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(result.totalPaid, locale, currency)}
                            </p>
                        </div>
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
                                {labels.loanToValue}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatPercent(result.loanToValuePercent, locale)}%
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="max-h-[420px] overflow-auto">
                            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                                <thead className="bg-zinc-50 dark:bg-zinc-900/60">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.year}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.principalPaid}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.interestPaid}
                                        </th>
                                        <th className="px-3 py-2 text-right font-semibold text-zinc-700 dark:text-zinc-200">
                                            {labels.remainingBalance}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 bg-white/70 dark:divide-zinc-800 dark:bg-zinc-950/40">
                                    {result.yearlyBreakdown.map((row) => (
                                        <tr key={row.year}>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {row.year}
                                            </td>
                                            <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                                {formatCurrency(row.principalPaid, locale, currency)}
                                            </td>
                                            <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                                {formatCurrency(row.interestPaid, locale, currency)}
                                            </td>
                                            <td className="px-3 py-2 text-right text-zinc-900 dark:text-zinc-100">
                                                {formatCurrency(row.endBalance, locale, currency)}
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