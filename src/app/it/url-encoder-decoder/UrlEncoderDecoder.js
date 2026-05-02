

"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleText = "https://calcolafacile.org/it?query=ciao mondo&ref=dev tools";
const sampleEncoded = "https%3A%2F%2Fcalcolafacile.org%2Fit%3Fquery%3Dciao%20mondo%26ref%3Ddev%20tools";

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

export default function UrlEncoderDecoder() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("encode"); // 'encode' | 'decode'

    const result = useMemo(() => {
        if (!input.trim()) {
            return { output: null, error: null };
        }

        if (mode === "encode") {
            const encoded = encodeUrl(input);
            return encoded
                ? { output: encoded, error: null }
                : { output: null, error: "Errore durante la codifica URL." };
        }

        const decoded = decodeUrl(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: "Stringa URL encoded non valida." };
    }, [input, mode]);

    return (
        <ToolLayout
            title="URL Encoder e Decoder online"
            currentPath="/it/url-encoder-decoder"
            contextualTools={[
                {
                    href: "/it/base64-tool",
                    title: "Base64 Encode/Decode",
                    description: "per codificare payload, token o stringhe usate nelle API.",
                },
                {
                    href: "/it/json-formatter",
                    title: "JSON Formatter",
                    description: "per leggere meglio payload e parametri JSON.",
                },
                {
                    href: "/it/jwt-decoder",
                    title: "JWT Decoder",
                    description: "se stai lavorando con token dentro URL o callback OAuth.",
                },
            ]}
            description="Codifica e decodifica URL direttamente nel browser. Utile per query string, parametri API, redirect e callback OAuth senza inviare dati a server esterni."
            faq={
                <>
                    <h3 className="font-semibold">I dati vengono inviati a un server?</h3>
                    <p>No. La codifica e decodifica avvengono localmente nel browser.</p>

                    <h3 className="mt-2 font-semibold">Quando serve codificare un URL?</h3>
                    <p>
                        Quando devi inserire testo, spazi, simboli o URL dentro query string, callback, redirect o parametri API.
                    </p>
                </>
            }
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
                    Encode
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
                    Decode
                </button>
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {mode === "encode" ? "Testo o URL" : "URL encoded"}
                </label>
                <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-h-40 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={mode === "encode" ? "Inserisci testo o URL da codificare..." : "Inserisci stringa URL encoded da decodificare..."}
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Operazione locale nel browser. Nessun dato viene inviato a server esterni.
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setInput(mode === "encode" ? sampleText : sampleEncoded)}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa esempio
                </button>
                <button
                    type="button"
                    onClick={() => setInput("")}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Pulisci
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