"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import ToolLayout, {
    ResultBox,
    ToolInput,
} from "@/components/ToolLayout";

const MODEL_CATALOG = {
    openai: {
        label: "OpenAI",
        models: {
            "gpt-5.5": {
                label: "GPT-5.5",
                inputCostPerMillion: 5,
                outputCostPerMillion: 30,
            },
            "gpt-5.4": {
                label: "GPT-5.4",
                inputCostPerMillion: 2.5,
                outputCostPerMillion: 15,
            },
            "gpt-5.4-mini": {
                label: "GPT-5.4 Mini",
                inputCostPerMillion: 0.25,
                outputCostPerMillion: 2,
            },
            "gpt-4.1": {
                label: "GPT-4.1",
                inputCostPerMillion: 2,
                outputCostPerMillion: 8,
            },
            "gpt-4o": {
                label: "GPT-4o",
                inputCostPerMillion: 2.5,
                outputCostPerMillion: 10,
            },
            "gpt-4o-mini": {
                label: "GPT-4o Mini",
                inputCostPerMillion: 0.15,
                outputCostPerMillion: 0.6,
            },
        },
    },
    anthropic: {
        label: "Anthropic",
        models: {
            "claude-opus-4.7": {
                label: "Claude Opus 4.7",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
            "claude-opus-4.6": {
                label: "Claude Opus 4.6",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
            "claude-sonnet-4.6": {
                label: "Claude Sonnet 4.6",
                inputCostPerMillion: 3,
                outputCostPerMillion: 15,
            },
            "claude-haiku-4.5": {
                label: "Claude Haiku 4.5",
                inputCostPerMillion: 1,
                outputCostPerMillion: 5,
            },
            "claude-sonnet-4": {
                label: "Claude Sonnet 4",
                inputCostPerMillion: 3,
                outputCostPerMillion: 15,
            },
            "claude-opus-4": {
                label: "Claude Opus 4",
                inputCostPerMillion: 15,
                outputCostPerMillion: 75,
            },
        },
    },
    google: {
        label: "Google",
        models: {
            "gemini-2.5-pro": {
                label: "Gemini 2.5 Pro",
                inputCostPerMillion: 1.25,
                outputCostPerMillion: 10,
            },
        },
    },
};

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
        relatedTools,
    } = content;

    const hydrated = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    const providerKeys = Object.keys(MODEL_CATALOG);

    const [providerKey, setProviderKey] = useState(providerKeys[0]);

    const providerModels = MODEL_CATALOG[providerKey].models;

    const [modelKey, setModelKey] = useState(
        Object.keys(providerModels)[0],
    );

    const [inputTokens, setInputTokens] = useState("10000");
    const [outputTokens, setOutputTokens] = useState("5000");
    const [requestsPerDay, setRequestsPerDay] = useState("100");

    const currentModel = providerModels[modelKey];

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
            contextualTools={relatedTools}
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
                                    const nextModels = MODEL_CATALOG[nextProvider].models;

                                    setProviderKey(nextProvider);
                                    setModelKey(Object.keys(nextModels)[0]);
                                }}
                                className={selectClassName}
                            >
                                {providerKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {MODEL_CATALOG[key].label}
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
                                {Object.entries(providerModels).map(([key, model]) => (
                                    <option key={key} value={key}>
                                        {model.label}
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
                        onChange={setInputTokens}
                        type="number"
                        min="0"
                        placeholder="10000"
                    />

                    <ToolInput
                        label={labels.outputTokens}
                        value={outputTokens}
                        onChange={setOutputTokens}
                        type="number"
                        min="0"
                        placeholder="5000"
                    />

                    <ToolInput
                        label={labels.requestsPerDay}
                        value={requestsPerDay}
                        onChange={setRequestsPerDay}
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