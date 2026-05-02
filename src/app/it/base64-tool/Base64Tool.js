"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

// UTF-8 safe encode/decode helpers
function encodeBase64(text) {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch {
        return null;
    }
}

function decodeBase64(text) {
    try {
        return decodeURIComponent(escape(atob(text)));
    } catch {
        return null;
    }
}

const sampleText = "Hello world! Questo è un esempio.";
const sampleBase64 = "SGVsbG8gd29ybGQhIFF1ZXN0byDDoCBlc2VtcGlvLg==";

export default function Base64Tool() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("encode"); // 'encode' | 'decode'

    const result = useMemo(() => {
        if (!input.trim()) {
            return { output: null, error: null };
        }

        if (mode === "encode") {
            const encoded = encodeBase64(input);
            return encoded
                ? { output: encoded, error: null }
                : { output: null, error: "Errore durante la codifica Base64." };
        }

        const decoded = decodeBase64(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: "Stringa Base64 non valida." };
    }, [input, mode]);

    return (
        <ToolLayout
            title="Base64 Encode e Decode online"
            currentPath="/it/base64-tool"
            contextualTools={[
                {
                    href: "/it/jwt-decoder",
                    title: "Decodifica JWT",
                    description: "se stai lavorando con token composti da header, payload e signature.",
                },
                {
                    href: "/it/json-formatter",
                    title: "Formatta JSON",
                    description: "per leggere meglio payload e risposte API.",
                },
                {
                    href: "/it/token-estimator",
                    title: "Stima token LLM",
                    description: "se vuoi usare il contenuto decodificato in un prompt AI.",
                },
            ]}
            description="Codifica e decodifica Base64 direttamente nel browser. Utile per token, payload API e debugging senza inviare dati a server esterni."
            examples={[
                {
                    title: "Decodificare il payload di un token",
                    description:
                        "Se hai una stringa Base64 da JWT o API, puoi decodificarla per leggere il contenuto in chiaro.",
                },
                {
                    title: "Codificare dati per richieste HTTP",
                    description:
                        "Alcune API richiedono dati in formato Base64 (ad esempio file o credenziali). Inserisci il testo e copia la versione codificata.",
                },
                {
                    title: "Gestire stringhe con caratteri speciali",
                    description:
                        "Il tool supporta UTF-8, quindi puoi codificare e decodificare testi con accenti, emoji e caratteri non ASCII senza problemi.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">I dati vengono inviati a un server?</h3>
                    <p>No. Tutto avviene localmente nel browser.</p>

                    <h3 className="mt-2 font-semibold">Supporta caratteri UTF-8?</h3>
                    <p>Sì, la codifica e decodifica gestiscono correttamente caratteri speciali.</p>
                </>
            }
        >
            {/* MODE TOGGLE */}
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setMode("encode")}
                    className={`rounded-lg border px-3 py-2 text-sm ${mode === "encode" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode("decode")}
                    className={`rounded-lg border px-3 py-2 text-sm ${mode === "decode" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Decode
                </button>
            </div>

            {/* INPUT */}
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {mode === "encode" ? "Testo" : "Base64"}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder={mode === "encode" ? "Inserisci testo..." : "Inserisci stringa Base64..."}
                    spellCheck={false}
                />
            </div>

            {/* BUTTONS */}
            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() => setInput(mode === "encode" ? sampleText : sampleBase64)}
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
            </div>

            {/* ERROR */}
            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {/* RESULT */}
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