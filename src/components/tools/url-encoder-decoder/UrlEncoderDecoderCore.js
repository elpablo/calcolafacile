"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:url-encoder-decoder";

function subscribeToHydration() {
    return () => {};
}

function encodeUrl(value) {
    try {
        return encodeURIComponent(value);
    } catch {
        return null;
    }
}

function decodeUrl(value) {
    try {
        return decodeURIComponent(value);
    } catch {
        return null;
    }
}

function getInitialState(shouldLoadSavedState) {
    if (!shouldLoadSavedState) {
        return { input: "", mode: "encode" };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        input: typeof stored?.input === "string" ? stored.input : "",
        mode: stored?.mode === "encode" || stored?.mode === "decode" ? stored.mode : "encode",
    };
}

export default function UrlEncoderDecoderCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <UrlEncoderDecoderCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function UrlEncoderDecoderCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        sample,
        labels,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState);
    const [input, setInput] = useState(initialState.input);
    const [mode, setMode] = useState(initialState.mode);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { input, mode });
    }, [shouldLoadSavedState, input, mode]);

    const result = useMemo(() => {
        if (!input.trim()) {
            return { output: null, error: null };
        }

        if (mode === "encode") {
            const encoded = encodeUrl(input);
            return encoded
                ? { output: encoded, error: null }
                : { output: null, error: labels.errorEncode };
        }

        const decoded = decodeUrl(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: labels.errorDecode };
    }, [input, mode, labels]);

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
            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setMode("encode")}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                        mode === "encode"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                    {labels.labelEncodeMode}
                </button>
                <button
                    type="button"
                    onClick={() => setMode("decode")}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                        mode === "decode"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                    {labels.labelDecodeMode}
                </button>
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {mode === "encode"
                        ? labels.labelInputEncode
                        : labels.labelInputDecode}
                </label>
                <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-h-40 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={
                        mode === "encode"
                            ? labels.placeholderEncode
                            : labels.placeholderDecode
                    }
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.hint}
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() =>
                        setInput(
                            mode === "encode" ? sample.text : sample.encoded,
                        )
                    }
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    type="button"
                    onClick={() => setInput("")}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.clear}
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {result.output && (
                <ResultBox copyText={result.output}>
                    <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                        {result.output}
                    </pre>
                </ResultBox>
            )}
        </ToolLayout>
    );
}
