"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:base64-tool";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function subscribeToHydration() {
    return () => {};
}

function getInitialBase64State(shouldLoadSavedState) {
    if (!shouldLoadSavedState) {
        return {
            input: "",
            mode: "encode",
        };
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return {
        input: typeof storedState?.input === "string" ? storedState.input : "",
        mode: ["encode", "decode"].includes(storedState?.mode)
            ? storedState.mode
            : "encode",
    };
}

// UTF-8 safe encode/decode helpers
function encodeBase64(text) {
    try {
        const bytes = textEncoder.encode(text);
        let binary = "";

        bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });

        return btoa(binary);
    } catch {
        return null;
    }
}

function decodeBase64(text) {
    try {
        const binary = atob(text);
        const bytes = Uint8Array.from(binary, (character) => {
            return character.charCodeAt(0);
        });

        return textDecoder.decode(bytes);
    } catch {
        return null;
    }
}

export default function Base64ToolCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <Base64ToolCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function Base64ToolCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const [base64State, setBase64State] = useState(() => {
        return getInitialBase64State(shouldLoadSavedState);
    });
    const { input, mode } = base64State;

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            input,
            mode,
        });
    }, [input, mode, shouldLoadSavedState]);

    const result = useMemo(() => {
        if (!input.trim()) {
            return { output: null, error: null };
        }

        if (mode === "encode") {
            const encoded = encodeBase64(input);
            return encoded
                ? { output: encoded, error: null }
                : { output: null, error: labels.errorEncode };
        }

        const decoded = decodeBase64(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: labels.errorDecode };
    }, [input, mode, labels]);

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            contextualTools={contextualTools}
            description={description}
            examples={examples}
            faq={faq}
        >
            {/* MODE TOGGLE */}
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() =>
                        setBase64State((currentState) => ({
                            ...currentState,
                            mode: "encode",
                        }))
                    }
                    className={`rounded-lg border px-3 py-2 text-sm ${mode === "encode" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    {labels.encodeBtn}
                </button>
                <button
                    onClick={() =>
                        setBase64State((currentState) => ({
                            ...currentState,
                            mode: "decode",
                        }))
                    }
                    className={`rounded-lg border px-3 py-2 text-sm ${mode === "decode" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    {labels.decodeBtn}
                </button>
            </div>

            {/* INPUT */}
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {mode === "encode" ? labels.inputLabelEncode : labels.inputLabelDecode}
                </label>
                <textarea
                    value={input}
                    onChange={(e) =>
                        setBase64State((currentState) => ({
                            ...currentState,
                            input: e.target.value,
                        }))
                    }
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder={mode === "encode" ? labels.placeholderEncode : labels.placeholderDecode}
                    spellCheck={false}
                />
            </div>

            {/* BUTTONS */}
            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    onClick={() =>
                        setBase64State((currentState) => ({
                            ...currentState,
                            input: mode === "encode" ? sample.text : sample.base64,
                        }))
                    }
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    onClick={() =>
                        setBase64State((currentState) => ({
                            ...currentState,
                            input: "",
                        }))
                    }
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.clear}
                </button>
            </div>

            {/* ERROR */}
            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {/* RESULT */}
            {result.output && (
                <ResultBox copyText={result.output} lang={lang}>
                    <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                        {result.output}
                    </pre>
                </ResultBox>
            )}

            {labels.footerNote && (
                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                    {labels.footerNote}
                </div>
            )}
        </ToolLayout>
    );
}
