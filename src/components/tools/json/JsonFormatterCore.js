"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

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

    const [input, setInput] = useState("");
    const [viewMode, setViewMode] = useState("pretty");

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
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder={labels.placeholder}
                />
            </div>

            <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                {jsonSize && <>{labels.size}: {jsonSize}</>}
            </div>

            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() => setInput(sampleJson)}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    onClick={() => setInput("")}
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
                        {labels.format}: {viewMode === "pretty" ? labels.pretty : labels.minified}
                    </p>
                    <ResultBox copyText={displayedOutput} lang={lang}>
                        <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                            {displayedOutput}
                        </pre>
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
