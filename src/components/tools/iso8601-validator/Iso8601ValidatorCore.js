

"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { getIso8601ExampleValues } from "./iso8601ValidatorExamples";
import { validateIso8601 } from "./iso8601ValidatorLogic";

const STORAGE_KEY = "calcolafacile:iso8601-validator";
const DEFAULT_VALUE = "2026-05-17T14:30:00+02:00";

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState) {
    if (!shouldLoadSavedState) {
        return { value: DEFAULT_VALUE };
    }

    const stored = loadLocalState(STORAGE_KEY, {});

    return {
        value: typeof stored?.value === "string" ? stored.value : DEFAULT_VALUE,
    };
}

function formatNumber(value, locale) {
    return new Intl.NumberFormat(locale).format(value);
}

export default function Iso8601ValidatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <Iso8601ValidatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function Iso8601ValidatorCoreContent({ content, shouldLoadSavedState }) {
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
    } = content;

    const initialState = getInitialState(shouldLoadSavedState);
    const [value, setValue] = useState(initialState.value);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { value });
    }, [shouldLoadSavedState, value]);

    const result = useMemo(() => validateIso8601(value), [value]);
    const sampleValues = useMemo(() => getIso8601ExampleValues(), []);

    const copyText = result.isValid
        ? [
              `${labels.input}: ${result.input}`,
              `${labels.normalized}: ${result.normalized}`,
              result.utc ? `${labels.utc}: ${result.utc}` : null,
              `${labels.unixSeconds}: ${result.unixSeconds}`,
              `${labels.unixMilliseconds}: ${result.unixMilliseconds}`,
          ]
              .filter(Boolean)
              .join("\n")
        : `${labels.input}: ${result.input}\n${labels.error}: ${labels.errors[result.errorCode] ?? result.errorMessage}`;

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
                <div>
                    <label
                        htmlFor="iso8601-value"
                        className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                    >
                        {labels.valueLabel}
                    </label>
                    <textarea
                        id="iso8601-value"
                        name="iso8601-value"
                        data-testid="iso8601-value"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        className="min-h-28 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                        placeholder={labels.valuePlaceholder}
                        spellCheck={false}
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.valueHelp}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {sampleValues.map((sample) => (
                        <button
                            key={sample}
                            type="button"
                            onClick={() => setValue(sample)}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {sample}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setValue("")}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                        {labels.clear}
                    </button>
                </div>
            </div>

            <ResultBox
                copyText={copyText}
                label={result.isValid ? labels.validResult : labels.invalidResult}
                lang={lang}
                testId="iso8601-result"
            >
                {result.isValid ? (
                    <div className="space-y-4">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300">
                            <p className="font-semibold">{labels.validMessage}</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.normalized}
                                </p>
                                <p className="mt-1 break-all font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {result.normalized}
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.timezone}
                                </p>
                                <p className="mt-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {result.parts.timezone ?? labels.noTimezone}
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.utc}
                                </p>
                                <p className="mt-1 break-all font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {result.utc ?? labels.notAvailable}
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.unixSeconds}
                                </p>
                                <p className="mt-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {formatNumber(result.unixSeconds, locale)}
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60 sm:col-span-2">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.unixMilliseconds}
                                </p>
                                <p className="mt-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {formatNumber(result.unixMilliseconds, locale)}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                        <p className="font-semibold">{labels.invalidMessage}</p>
                        <p className="mt-1 text-sm">
                            {labels.errors[result.errorCode] ?? result.errorMessage}
                        </p>
                    </div>
                )}
            </ResultBox>
        </ToolLayout>
    );
}