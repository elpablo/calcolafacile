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

const sampleText = "Hello world! This is an example.";
const sampleBase64 = "SGVsbG8gd29ybGQhIFRoaXMgaXMgYW4gZXhhbXBsZS4=";

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
                : { output: null, error: "Error while encoding Base64." };
        }

        const decoded = decodeBase64(input);
        return decoded !== null
            ? { output: decoded, error: null }
            : { output: null, error: "Invalid Base64 string." };
    }, [input, mode]);

    return (
        <ToolLayout
            title="Base64 Encoder and Decoder Online"
            lang="en"
            currentPath="/en/base64-tool"
            contextualTools={[
                {
                    href: "/en/jwt-decoder",
                    title: "Decode JWT",
                    description:
                        "to inspect JSON Web Tokens made of header, payload and signature.",
                },
                {
                    href: "/en/json-formatter",
                    title: "Format JSON",
                    description:
                        "to format decoded payloads, API responses and JSON strings.",
                },
                {
                    href: "/en/token-estimator",
                    title: "Estimate LLM tokens",
                    description:
                        "to estimate token usage and cost before sending decoded text to an LLM.",
                },
            ]}
            description="Encode text to Base64 or decode Base64 strings directly in your browser. Useful for API payloads, tokens, credentials, debugging and encoded data without sending anything to external servers."
            examples={[
                {
                    title: "Decode Base64 from an API payload",
                    description:
                        "Paste a Base64 string returned by an API to inspect the readable text, JSON payload or encoded content.",
                },
                {
                    title: "Encode text for HTTP requests or credentials",
                    description:
                        "Convert plain text to Base64 when an API, authentication flow or integration requires encoded values.",
                },
                {
                    title: "Encode and decode UTF-8 text safely",
                    description:
                        "The tool supports UTF-8, so it works with accents, emoji and non-ASCII characters when encoding or decoding Base64.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        Is Base64 encoding secure?
                    </h3>
                    <p>
                        No. Base64 is an encoding format, not encryption. Anyone
                        can decode a Base64 string back to readable text.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Is data sent to a server?
                    </h3>
                    <p>
                        No. Base64 encoding and decoding happen locally in your
                        browser.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Does this Base64 tool support UTF-8?
                    </h3>
                    <p>
                        Yes. The tool correctly handles accents, emoji and
                        non-ASCII characters.
                    </p>
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
                    {mode === "encode" ? "Text to encode" : "Base64 to decode"}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder={
                        mode === "encode"
                            ? "Enter text to encode as Base64..."
                            : "Enter Base64 string to decode..."
                    }
                    spellCheck={false}
                />
            </div>

            {/* BUTTONS */}
            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() =>
                        setInput(mode === "encode" ? sampleText : sampleBase64)
                    }
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Use sample
                </button>
                <button
                    onClick={() => setInput("")}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Clear
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
                <ResultBox copyText={result.output} lang="en">
                    <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                        {result.output}
                    </pre>
                </ResultBox>
            )}
        </ToolLayout>
    );
}