"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import ToolLayout, {
    ResultBox,
    ToolInput,
} from "@/components/ToolLayout";

import {
    getFirstModelKey,
    getFirstProviderKey,
    getModel,
    getProvider,
    getProviderKeys,
    getProviderModelKeys,
} from "@/config/aiModels";

import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
const STORAGE_KEY = "calcolafacile:ai-cost-calculator";

function getInitialState(shouldLoadSavedState) {
    const fallbackProviderKey = getFirstProviderKey();
    const fallbackModelKey = getFirstModelKey(fallbackProviderKey);

    if (!shouldLoadSavedState) {
        return {
            providerKey: fallbackProviderKey,
            modelKey: fallbackModelKey,
            inputTokens: "10000",
            outputTokens: "5000",
            requestsPerDay: "100",
        };
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    const storedProviderKey = getProviderKeys().includes(stored?.providerKey)
        ? stored.providerKey
        : fallbackProviderKey;

    const storedModelKeys = getProviderModelKeys(storedProviderKey);
    const storedModelKey = storedModelKeys.includes(stored?.modelKey)
        ? stored.modelKey
        : getFirstModelKey(storedProviderKey);

    return {
        providerKey: storedProviderKey,
        modelKey: storedModelKey,
        inputTokens: typeof stored?.inputTokens === "string" ? stored.inputTokens : "10000",
        outputTokens: typeof stored?.outputTokens === "string" ? stored.outputTokens : "5000",
        requestsPerDay: typeof stored?.requestsPerDay === "string" ? stored.requestsPerDay : "100",
    };
}

function formatCurrency(value, locale) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: value < 0.01 ? 4 : 2,
        maximumFractionDigits: value < 0.01 ? 4 : 2,
    }).format(value);
}

function calculateCost(tokens, costPerMillion) {
    return (tokens / 1_000_000) * costPerMillion;
}

function getInputValue(valueOrEvent) {
    if (typeof valueOrEvent === "string") {
        return valueOrEvent;
    }

    return valueOrEvent?.target?.value ?? "";
}

const selectClassName = "h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 pr-10 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const selectWrapperClassName = "relative after:pointer-events-none after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:text-zinc-500 after:content-['▾'] dark:after:text-zinc-400";

export default function AiCostCalculatorCore({ content }) {
    const {
        locale,
        lang,
        currentPath,
        metadata,
        labels,
        examples,
        faq,
        contextualTools,
    } = content;

    const hydrated = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    const initialState = getInitialState(hydrated);

    const providerKeys = getProviderKeys();

    const [providerKey, setProviderKey] = useState(initialState.providerKey);
    const [modelKey, setModelKey] = useState(initialState.modelKey);
    const [inputTokens, setInputTokens] = useState(initialState.inputTokens);
    const [outputTokens, setOutputTokens] = useState(initialState.outputTokens);
    const [requestsPerDay, setRequestsPerDay] = useState(initialState.requestsPerDay);

    const provider = getProvider(providerKey);
    const providerModels = provider.models;
    const providerModelKeys = getProviderModelKeys(providerKey);

    const currentModel = getModel(providerKey, modelKey);

    useEffect(() => {
        if (!hydrated) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            providerKey,
            modelKey,
            inputTokens,
            outputTokens,
            requestsPerDay,
        });
    }, [hydrated, providerKey, modelKey, inputTokens, outputTokens, requestsPerDay]);

    const calculations = useMemo(() => {
        const parsedInputTokens = Number(inputTokens) || 0;
        const parsedOutputTokens = Number(outputTokens) || 0;
        const parsedRequestsPerDay = Number(requestsPerDay) || 0;

        const inputCost = calculateCost(
            parsedInputTokens,
            currentModel.inputCostPerMillion,
        );

        const outputCost = calculateCost(
            parsedOutputTokens,
            currentModel.outputCostPerMillion,
        );

        const requestCost = inputCost + outputCost;
        const dailyCost = requestCost * parsedRequestsPerDay;
        const monthlyCost = dailyCost * 30;

        return {
            inputCost,
            outputCost,
            requestCost,
            dailyCost,
            monthlyCost,
        };
    }, [
        currentModel.inputCostPerMillion,
        currentModel.outputCostPerMillion,
        inputTokens,
        outputTokens,
        requestsPerDay,
    ]);

    return (
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
            <div key={hydrated ? "hydrated" : "ssr"}>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                            {labels.provider}
                        </label>

                        <div className={selectWrapperClassName}>
                            <select
                                value={providerKey}
                                onChange={(event) => {
                                    const nextProvider = event.target.value;

                                    setProviderKey(nextProvider);
                                    setModelKey(getFirstModelKey(nextProvider));
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
                        <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                            {labels.model}
                        </label>

                        <div className={selectWrapperClassName}>
                            <select
                                value={modelKey}
                                onChange={(event) => setModelKey(event.target.value)}
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
                        label={labels.inputTokens}
                        value={inputTokens}
                        onChange={(valueOrEvent) => setInputTokens(getInputValue(valueOrEvent))}
                        type="number"
                        min="0"
                        placeholder="10000"
                    />

                    <ToolInput
                        label={labels.outputTokens}
                        value={outputTokens}
                        onChange={(valueOrEvent) => setOutputTokens(getInputValue(valueOrEvent))}
                        type="number"
                        min="0"
                        placeholder="5000"
                    />

                    <ToolInput
                        label={labels.requestsPerDay}
                        value={requestsPerDay}
                        onChange={(valueOrEvent) => setRequestsPerDay(getInputValue(valueOrEvent))}
                        type="number"
                        min="0"
                        placeholder="100"
                    />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <ResultBox
                        label={labels.results.inputCost}
                        copyText={calculations.inputCost.toFixed(6)}
                        lang={lang}
                    >
                        <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                            {formatCurrency(calculations.inputCost, locale)}
                        </p>
                    </ResultBox>

                    <ResultBox
                        label={labels.results.outputCost}
                        copyText={calculations.outputCost.toFixed(6)}
                        lang={lang}
                    >
                        <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                            {formatCurrency(calculations.outputCost, locale)}
                        </p>
                    </ResultBox>

                    <ResultBox
                        label={labels.results.requestCost}
                        copyText={calculations.requestCost.toFixed(6)}
                        lang={lang}
                    >
                        <p className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300 sm:text-2xl">
                            {formatCurrency(calculations.requestCost, locale)}
                        </p>
                    </ResultBox>

                    <ResultBox
                        label={labels.results.dailyCost}
                        copyText={calculations.dailyCost.toFixed(6)}
                        lang={lang}
                    >
                        <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                            {formatCurrency(calculations.dailyCost, locale)}
                        </p>
                    </ResultBox>

                    <ResultBox
                        label={labels.results.monthlyCost}
                        copyText={calculations.monthlyCost.toFixed(6)}
                        lang={lang}
                    >
                        <p className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300 sm:text-2xl">
                            {formatCurrency(calculations.monthlyCost, locale)}
                        </p>
                    </ResultBox>
                </div>

                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {labels.pricingDisclaimerTitle}
                    </p>
                    <p className="mt-2">
                        {labels.pricingDisclaimer}
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}