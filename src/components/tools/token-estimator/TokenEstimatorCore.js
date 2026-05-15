"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { getFlatModels } from "@/config/aiModels";

const STORAGE_KEY = "calcolafacile:token-estimator";
const MODEL_OPTIONS = getFlatModels();
const MODELS = Object.fromEntries(
    MODEL_OPTIONS.map((model) => [
        model.modelKey,
        {
            label: model.label,
            providerLabel: model.providerLabel,
            inputPricePerMillion: model.inputCostPerMillion,
            outputPricePerMillion: model.outputCostPerMillion,
        },
    ]),
);

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

function subscribeToHydration() {
    return () => {};
}

function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function estimateTokens(text) {
    const characters = text.length;
    const words = countWords(text);
    const byCharacters = Math.ceil(characters / 4);
    const byWords = Math.ceil(words * 1.3);
    return Math.max(byCharacters, byWords);
}

function decodeInitialText(value) {
    if (!value) return "";
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function getInitialState(shouldLoadSavedState, sample, urlText) {
    if (!shouldLoadSavedState) {
        return { text: "", modelKey: sample.modelKey, estimatedOutputTokens: sample.estimatedOutputTokens };
    }
    if (urlText) {
        return { text: urlText, modelKey: sample.modelKey, estimatedOutputTokens: sample.estimatedOutputTokens };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        text: typeof stored?.text === "string" ? stored.text : "",
        modelKey: stored?.modelKey && stored.modelKey in MODELS ? stored.modelKey : sample.modelKey,
        estimatedOutputTokens:
            typeof stored?.estimatedOutputTokens === "string"
                ? stored.estimatedOutputTokens
                : sample.estimatedOutputTokens,
    };
}

export default function TokenEstimatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <TokenEstimatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function TokenEstimatorCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        locale,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
        sampleText,
    } = content;

    const searchParams = useSearchParams();
    const urlText = useMemo(
        () => decodeInitialText(searchParams.get("text")),
        [searchParams],
    );

    const initialState = getInitialState(shouldLoadSavedState, sample, urlText);
    const [text, setText] = useState(initialState.text);
    const [modelKey, setModelKey] = useState(initialState.modelKey);
    const [estimatedOutputTokens, setEstimatedOutputTokens] = useState(
        initialState.estimatedOutputTokens,
    );

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { text, modelKey, estimatedOutputTokens });
    }, [shouldLoadSavedState, text, modelKey, estimatedOutputTokens]);

    const stats = useMemo(() => {
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const words = countWords(text);
        const inputTokens = estimateTokens(text);
        const outputTokens = Number.parseInt(estimatedOutputTokens, 10);
        const safeOutputTokens =
            Number.isNaN(outputTokens) || outputTokens < 0 ? 0 : outputTokens;
        const model = MODELS[modelKey];

        const inputCost = (inputTokens / 1_000_000) * model.inputPricePerMillion;
        const outputCost = (safeOutputTokens / 1_000_000) * model.outputPricePerMillion;

        return {
            characters,
            charactersNoSpaces,
            words,
            inputTokens,
            outputTokens: safeOutputTokens,
            inputCost,
            outputCost,
            totalCost: inputCost + outputCost,
        };
    }, [text, modelKey, estimatedOutputTokens]);

    const formatNumber = (value) => value.toLocaleString(locale);

    const formatCost = (value) =>
        value.toLocaleString(locale, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
        });

    const selectedModel = MODELS[modelKey];
    const copyText = labels.copyText({
        inputTokens: formatNumber(stats.inputTokens),
        outputTokens: formatNumber(stats.outputTokens),
        totalCost: formatCost(stats.totalCost),
    });

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
            <div className="mb-4">
                <label className={labelClass}>{labels.textLabel}</label>
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={labels.textPlaceholder}
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.textHelp}
                </p>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>{labels.modelLabel}</label>
                    <select
                        value={modelKey}
                        onChange={(event) => setModelKey(event.target.value)}
                        className={selectClass}
                    >
                        {Object.entries(MODELS).map(([key, model]) => (
                            <option key={key} value={key}>
                                {model.providerLabel} · {model.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>{labels.outputTokensLabel}</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={estimatedOutputTokens}
                        onChange={(event) => setEstimatedOutputTokens(event.target.value)}
                        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                        placeholder={labels.outputTokensPlaceholder}
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.outputTokensHelp}
                    </p>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setText(sampleText)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    type="button"
                    onClick={() => setText("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.clear}
                </button>
            </div>

            <ResultBox copyText={copyText} lang={lang}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.inputTokensResult}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(stats.inputTokens)}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.characters}
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.characters)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.words}
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.words)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.noSpaces}
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.charactersNoSpaces)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        {labels.costTitle} - {selectedModel.providerLabel} · {selectedModel.label}
                    </p>
                    <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <p>
                            <strong>{labels.costInput}:</strong>{" "}
                            {formatCost(stats.inputCost)}
                        </p>
                        <p>
                            <strong>{labels.costOutput}:</strong>{" "}
                            {formatCost(stats.outputCost)}
                        </p>
                        <p>
                            <strong>{labels.costTotal}:</strong>{" "}
                            {formatCost(stats.totalCost)}
                        </p>
                    </div>
                </div>
            </ResultBox>
        </ToolLayout>
    );
}
