"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleJson = `{"name":"John","age":30,"city":"New York","skills":["JS","Node","AI"]}`;

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

    return (
        <ToolLayout
            title="JSON Formatter and Validator Online"
            lang="en"
            currentPath="/en/json-formatter"
            contextualTools={[
                {
                    href: "/en/token-estimator",
                    title: "Estimate LLM tokens",
                    description:
                        "to estimate the size and cost of JSON used in prompts, payloads or AI workflows.",
                },
                {
                    href: "/en/base64-tool",
                    title: "Encode and decode Base64",
                    description:
                        "to encode or decode payloads and strings used in API integrations.",
                },
                {
                    href: "/en/jwt-decoder",
                    title: "Decode JWT",
                    description:
                        "to inspect header and payload when your JSON comes from a token.",
                },
            ]}
            description="Format, validate and minify JSON directly in your browser. Paste raw JSON, make it readable, catch parsing errors and copy the result without sending data to external servers."
            examples={[
                {
                    title: "Format a JSON API response",
                    description:
                        "Paste raw JSON returned by an API to make it readable, inspect nested objects and arrays, and copy the formatted output.",
                },
                {
                    title: "Validate JSON before using it in code",
                    description:
                        "Catch common JSON errors such as missing commas, invalid brackets, unclosed strings or malformed objects before using the data in your app.",
                },
                {
                    title: "Minify JSON for HTTP payloads and config files",
                    description:
                        "Switch to Minified view when you need compact JSON for API requests, environment variables, configuration files or test fixtures.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        Is the JSON sent to a server?
                    </h3>
                    <p>
                        No. Formatting, validation and minification happen
                        locally in your browser.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Can this tool validate invalid JSON?
                    </h3>
                    <p>
                        Yes. If the JSON is malformed, the tool shows a parsing
                        error so you can quickly fix the problem.
                    </p>

                    <h3 className="mt-2 font-semibold">Can I minify JSON?</h3>
                    <p>
                        Yes. Use the Minified view to create compact JSON for
                        API payloads, configuration files or environment
                        variables.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    JSON
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder="Paste JSON here..."
                />
            </div>

            <div className="mb-4 flex gap-2 flex-wrap">
                <button
                    onClick={() => setInput(sampleJson)}
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
                <button
                    onClick={() => setViewMode("pretty")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "pretty" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Pretty view
                </button>
                <button
                    onClick={() => setViewMode("minified")}
                    className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "minified" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                    Minified view
                </button>
            </div>

            {result.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {result.error}
                </div>
            )}

            {displayedOutput && (
                <>
                    <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        Format: {viewMode === "pretty" ? "Pretty" : "Minified"}
                    </p>
                    <ResultBox copyText={displayedOutput} lang="en">
                        <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                            {displayedOutput}
                        </pre>
                    </ResultBox>
                </>
            )}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                If you are working with API payloads or encoded data, you may also want to try our{" "}
                <Link
                    href="/en/json-tools"
                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    JSON tools
                </Link>{" "}
                or our{" "}
                <Link
                    href="/en/encoding-tools"
                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    encoding tools
                </Link>
                .
            </div>
        </ToolLayout>
    );
}
