"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleJson = `{"nome":"Mario","eta":30,"citta":"Bologna","skills":["JS","Node","AI"]}`;

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

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [viewMode, setViewMode] = useState("pretty"); // 'pretty' | 'minified'

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

    return (
        <ToolLayout
            title="JSON Formatter online"
            currentPath="/it/json-formatter"
            description="Incolla JSON e ottieni una versione formattata e leggibile. La validazione avviene localmente nel browser."
            faq={
                <>
                    <h3 className="font-semibold">
                        Il JSON viene inviato a un server?
                    </h3>
                    <p>No. Tutto avviene nel browser.</p>

                    <h3 className="mt-2 font-semibold">
                        Cosa succede se il JSON è invalido?
                    </h3>
                    <p>
                        Viene mostrato un errore con la posizione del problema.
                    </p>
                </>
            }
        >
            {/* INPUT */}
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    JSON
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder="Incolla qui il JSON..."
                />
            </div>

            {/* BUTTONS */}
            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() => setInput(sampleJson)}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa esempio
                </button>
                <button
                    onClick={() => setInput("")}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Pulisci
                </button>
                <button
                    onClick={() => setViewMode("pretty")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "pretty" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Vista Pretty
                </button>
                <button
                    onClick={() => setViewMode("minified")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "minified" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Vista Minified
                </button>
            </div>

            {/* ERROR */}
            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {result.error}
                </div>
            )}

            {/* RESULT */}
            {displayedOutput && (
                <>
                    <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        Formato: {viewMode === "pretty" ? "Pretty" : "Minified"}
                    </p>
                    <ResultBox copyText={displayedOutput}>
                        <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                            {displayedOutput}
                        </pre>
                    </ResultBox>
                </>
            )}
        </ToolLayout>
    );
}
