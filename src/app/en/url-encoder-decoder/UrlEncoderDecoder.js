"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleText = "https://calcolafacile.org/en?query=hello world&ref=dev tools";
const sampleEncoded = "https%3A%2F%2Fcalcolafacile.org%2Fen%3Fquery%3Dhello%20world%26ref%3Ddev%20tools";

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
                : { output: null, error: "Error during URL encoding." };
        }

        const decoded = decodeUrl(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: "Invalid URL-encoded string." };
    }, [input, mode]);

    return (
        <ToolLayout
            title="URL Encoder and Decoder Online"
            lang="en"
            currentPath="/en/url-encoder-decoder"
            contextualTools={[
                {
                    href: "/en/base64-tool",
                    title: "Base64 Encoder/Decoder",
                    description:
                        "to encode payloads, tokens or strings used in APIs.",
                },
                {
                    href: "/en/json-formatter",
                    title: "JSON Formatter and Validator",
                    description: "to better read JSON payloads and parameters.",
                },
                {
                    href: "/en/jwt-decoder",
                    title: "JWT Decoder and Inspector",
                    description:
                        "if you are working with tokens inside URLs or OAuth callbacks.",
                },
            ]}
            description="Encode and decode URLs directly in your browser. Useful for query strings, API parameters, redirects and OAuth callbacks without sending data to external servers."
            examples={[
                {
                    title: "Encode parameters in a query string",
                    description:
                        "If you need to pass text with spaces or special characters in a URL, use Encode to generate a valid string for query parameters.",
                },
                {
                    title: "Handle OAuth redirects and callbacks",
                    description:
                        "When working with OAuth login or redirect URLs, encode or decode parameters to verify they are correct.",
                },
                {
                    title: "Debug URLs from APIs",
                    description:
                        "If you receive a URL-encoded string from an API, use Decode to quickly inspect its content.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">Is data sent to a server?</h3>
                    <p>
                        No. Encoding and decoding happen locally in your browser.
                    </p>

                    <h3 className="mt-2 font-semibold">When should I encode a URL?</h3>
                    <p>
                        When you need to include text, spaces, symbols or URLs inside query strings, redirects, callbacks or API parameters.
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
                    {mode === "encode" ? "Text or URL" : "URL-encoded string"}
                </label>
                <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-h-40 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={
                        mode === "encode"
                            ? "Enter text or URL to encode..."
                            : "Enter URL-encoded string to decode..."
                    }
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Local operation in your browser. No data is sent to external servers.
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() =>
                        setInput(mode === "encode" ? sampleText : sampleEncoded)
                    }
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Use sample
                </button>
                <button
                    type="button"
                    onClick={() => setInput("")}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Clear
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {result.error}
                </div>
            )}

            {result.output && (
                <ResultBox copyText={result.output} lang="en">
                    <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                        {result.output}
                    </pre>
                </ResultBox>
            )}
        </ToolLayout>
    );
}