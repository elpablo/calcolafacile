"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const models = {
    "gpt-4o-mini": {
        label: "GPT-4o mini",
        inputPricePerMillion: 0.15,
        outputPricePerMillion: 0.6,
    },
    "gpt-4o": {
        label: "GPT-4o",
        inputPricePerMillion: 5,
        outputPricePerMillion: 15,
    },
    "claude-3-5-sonnet": {
        label: "Claude 3.5 Sonnet",
        inputPricePerMillion: 3,
        outputPricePerMillion: 15,
    },
};

const sampleText = `Write a short description of an app that helps users compare prices of nearby grocery stores using a simple and direct tone.`;

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

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

function formatNumber(value) {
    return value.toLocaleString("en-US");
}

function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
    });
}

function decodeInitialText(value) {
    if (!value) return "";
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export default function TokenEstimator() {
    const searchParams = useSearchParams();
    const initialText = useMemo(
        () => decodeInitialText(searchParams.get("text")),
        [searchParams]
    );

    const [text, setText] = useState(initialText);
    const [modelKey, setModelKey] = useState("gpt-4o-mini");
    const [estimatedOutputTokens, setEstimatedOutputTokens] = useState(500);

    const stats = useMemo(() => {
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const words = countWords(text);
        const inputTokens = estimateTokens(text);
        const outputTokens = Number.parseInt(estimatedOutputTokens, 10);
        const safeOutputTokens = Number.isNaN(outputTokens) || outputTokens < 0 ? 0 : outputTokens;
        const model = models[modelKey];

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

    const selectedModel = models[modelKey];
    const copyText = `Estimated input tokens: ${formatNumber(stats.inputTokens)}\nEstimated output tokens: ${formatNumber(stats.outputTokens)}\nEstimated total cost: ${formatCurrency(stats.totalCost)}`;

    return (
        <ToolLayout
            title="LLM Token Estimator Online"
            lang="en"
            currentPath="/en/token-estimator"
            description="Estimate how many tokens your text will use in an LLM and calculate approximate API costs. Useful for prompts, API payloads and AI workflows. Everything runs locally in your browser."
            examples={[
                {
                    title: "Estimate prompt cost before sending",
                    description:
                        "Paste prompts, instructions or documentation to estimate input tokens and cost for the selected model.",
                },
                {
                    title: "Estimate response size",
                    description:
                        "Set the expected output tokens to calculate the total cost of an API call.",
                },
                {
                    title: "Analyze JSON or API payloads",
                    description:
                        "Paste JSON or large text to check if it fits within model limits or budget.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        Is the token estimation accurate?
                    </h3>
                    <p>
                        No. This is a quick estimate based on characters and
                        words. Actual token counts depend on the model
                        tokenizer.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Is my text sent to a server?
                    </h3>
                    <p>No. All calculations run locally in your browser.</p>

                    <h3 className="mt-2 font-semibold">
                        Are these official prices?
                    </h3>
                    <p>
                        No. Prices are indicative and may change. Always check
                        the official pricing of the provider.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className={labelClass}>Text to estimate</label>
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Paste prompt, text or content to estimate..."
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Local estimation in your browser. No text is sent to
                    external servers.
                </p>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Model</label>
                    <select
                        value={modelKey}
                        onChange={(event) => setModelKey(event.target.value)}
                        className={selectClass}
                    >
                        {Object.entries(models).map(([key, model]) => (
                            <option key={key} value={key}>
                                {model.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>
                        Estimated output tokens
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={estimatedOutputTokens}
                        onChange={(event) =>
                            setEstimatedOutputTokens(event.target.value)
                        }
                        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                        placeholder="Ex. 500"
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        Tokens you expect to receive as a response.
                    </p>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setText(sampleText)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Use sample
                </button>
                <button
                    type="button"
                    onClick={() => setText("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Clear
                </button>
            </div>

            <ResultBox copyText={copyText} lang="en">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Estimated input tokens
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(stats.inputTokens)}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Characters
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.characters)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Words
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.words)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            No spaces
                        </p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.charactersNoSpaces)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        Estimated cost - {selectedModel.label}
                    </p>
                    <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <p>
                            <strong>Input:</strong>{" "}
                            {formatCurrency(stats.inputCost)}
                        </p>
                        <p>
                            <strong>Output:</strong>{" "}
                            {formatCurrency(stats.outputCost)}
                        </p>
                        <p>
                            <strong>Total:</strong>{" "}
                            {formatCurrency(stats.totalCost)}
                        </p>
                    </div>
                </div>
            </ResultBox>
        </ToolLayout>
    );
}