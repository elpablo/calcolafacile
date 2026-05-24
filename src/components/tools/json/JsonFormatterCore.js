"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import JsonCodeBlock from "@/components/tools/json/JsonCodeBlock";
import { jsonFormatterExamples } from "@/components/tools/json/jsonFormatterExamples";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:json-formatter";
const MAX_DROPPED_FILE_SIZE = 2 * 1024 * 1024;
const DEFAULT_FORMATTER_STATE = {
    input: "",
    viewMode: "pretty",
};

function subscribeToHydration() {
    return () => {};
}

function getInitialFormatterState(currentExampleKey, shouldLoadSavedState) {
    const example = currentExampleKey
        ? jsonFormatterExamples[currentExampleKey]
        : null;

    if (example) {
        return {
            input: example.input,
            viewMode: example.viewMode ?? "pretty",
        };
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_FORMATTER_STATE;
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return {
        input: typeof storedState?.input === "string" ? storedState.input : "",
        viewMode: ["pretty", "minified"].includes(storedState?.viewMode)
            ? storedState.viewMode
            : "pretty",
    };
}

function formatJson(text) {
    try {
        const parsed = JSON.parse(text);
        return {
            formatted: JSON.stringify(parsed, null, 2),
            error: null,
        };
    } catch (err) {
        return {
            formatted: null,
            error: err.message,
        };
    }
}

export default function JsonFormatterCore({ content }) {
    const searchParams = useSearchParams();
    const currentExampleKey = searchParams.get("example");
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <JsonFormatterCoreContent
            key={`${currentExampleKey ?? "saved-state"}:${hasHydrated ? "hydrated" : "ssr"}`}
            content={content}
            currentExampleKey={currentExampleKey}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function JsonFormatterCoreContent({
    content,
    currentExampleKey,
    shouldLoadSavedState,
}) {
    const {
        lang,
        title,
        currentPath,
        contextualTools,
        description,
        examples,
        faq,
        labels,
        sampleJson,
        relatedLinks,
    } = content;

    const [formatterState, setFormatterState] = useState(() => {
        return getInitialFormatterState(
            currentExampleKey,
            shouldLoadSavedState,
        );
    });
    const [dropError, setDropError] = useState(null);
    const { input, viewMode } = formatterState;

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        if (currentExampleKey) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            input,
            viewMode,
        });
    }, [currentExampleKey, input, shouldLoadSavedState, viewMode]);

    const setInput = (nextInput) => {
        setFormatterState((currentState) => ({
            ...currentState,
            input:
                typeof nextInput === "function"
                    ? nextInput(currentState.input)
                    : nextInput,
        }));
    };

    const setViewMode = (nextViewMode) => {
        setFormatterState((currentState) => ({
            ...currentState,
            viewMode:
                typeof nextViewMode === "function"
                    ? nextViewMode(currentState.viewMode)
                    : nextViewMode,
        }));
    };

    const isAcceptedJsonFile = (file) => {
        if (!file) {
            return false;
        }

        const fileName = file.name?.toLowerCase() || "";
        const fileType = file.type || "";

        return (
            fileName.endsWith(".json") ||
            fileType === "application/json" ||
            fileType === "text/plain"
        );
    };

    const handleDroppedFiles = async (files) => {
        setDropError(null);

        const fileList = Array.from(files || []);

        if (fileList.length !== 1) {
            setDropError(labels.dropSingleFileError);
            return;
        }

        const file = fileList[0];

        if (!isAcceptedJsonFile(file)) {
            setDropError(labels.dropInvalidFileError);
            return;
        }

        if (file.size > MAX_DROPPED_FILE_SIZE) {
            setDropError(labels.dropFileTooLargeError);
            return;
        }

        try {
            const text = await file.text();
            setInput(text);
            setViewMode("pretty");
        } catch {
            setDropError(labels.dropReadError);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleDroppedFiles(event.dataTransfer.files);
    };

    const getMinified = (text) => {
        try {
            return JSON.stringify(JSON.parse(text));
        } catch {
            return null;
        }
    };

    const result = useMemo(() => {
        if (!input.trim()) {
            return { formatted: null, error: null };
        }
        return formatJson(input);
    }, [input]);

    const displayedOutput = useMemo(() => {
        if (!result.formatted) return null;
        if (viewMode === "minified") {
            return getMinified(input);
        }
        return result.formatted;
    }, [result, viewMode, input]);

    const jsonSize = useMemo(() => {
        if (!input.trim()) return null;
        try {
            const bytes = new TextEncoder().encode(input).length;
            if (bytes < 1024) return `${bytes} B`;
            if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        } catch {
            return null;
        }
    }, [input]);

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
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {labels.inputLabel}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder={labels.placeholder}
                />
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {labels.dropHint}
                </p>
                {dropError && (
                    <p className="mt-2 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
                        {dropError}
                    </p>
                )}
            </div>

            <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                {jsonSize && (
                    <>
                        {labels.size}: {jsonSize}
                    </>
                )}
            </div>

            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() => {
                        setInput(sampleJson);
                        setViewMode("pretty");
                    }}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    onClick={() => {
                        setInput("");
                        setViewMode("pretty");
                    }}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.clear}
                </button>
                <button
                    onClick={() => setViewMode("pretty")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "pretty" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    {labels.prettyView}
                </button>
                <button
                    onClick={() => setViewMode("minified")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "minified" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    {labels.minifiedView}
                </button>
                <button
                    onClick={() => {
                        if (result.formatted)
                            navigator.clipboard.writeText(result.formatted);
                    }}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.copyPretty}
                </button>
                <button
                    onClick={() => {
                        const min = getMinified(input);
                        if (min) navigator.clipboard.writeText(min);
                    }}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.copyMinified}
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <strong>{labels.invalidJson}:</strong> {result.error}
                </div>
            )}

            {displayedOutput && (
                <>
                    <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        {labels.format}:{" "}
                        {viewMode === "pretty"
                            ? labels.pretty
                            : labels.minified}
                    </p>
                    <ResultBox copyText={displayedOutput} lang={lang}>
                        <div className="max-h-[min(70vh,520px)] overflow-auto rounded-lg">
                            <JsonCodeBlock value={displayedOutput} />
                        </div>
                    </ResultBox>
                </>
            )}
            <div className="mt-2 text-xs text-zinc-500">
                {viewMode === "minified"
                    ? labels.minifiedHint
                    : labels.prettyHint}
            </div>
            {relatedLinks && (
                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                    {relatedLinks.beforeFirstLink}{" "}
                    <Link
                        href={relatedLinks.first.href}
                        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {relatedLinks.first.label}
                    </Link>{" "}
                    {relatedLinks.betweenLinks}{" "}
                    <Link
                        href={relatedLinks.second.href}
                        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {relatedLinks.second.label}
                    </Link>
                    {relatedLinks.afterSecondLink}
                </div>
            )}
        </ToolLayout>
    );
}
