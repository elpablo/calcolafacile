"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE3MTQ1NjAwMDAsImV4cCI6MTcxNDU2MzYwMH0.signature";

function base64UrlDecode(value) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = atob(padded);

    return decodeURIComponent(
        decoded
            .split("")
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join("")
    );
}

function parseJwt(token) {
    const parts = token.trim().split(".");

    if (parts.length < 2) {
        throw new Error("The token must contain at least a header and a payload separated by a dot.");
    }

    const [headerPart, payloadPart, signaturePart = ""] = parts;

    return {
        header: JSON.parse(base64UrlDecode(headerPart)),
        payload: JSON.parse(base64UrlDecode(payloadPart)),
        signature: signaturePart,
    };
}

function formatJson(value) {
    return JSON.stringify(value, null, 2);
}

function formatUnixTimestamp(value) {
    if (typeof value !== "number") {
        return null;
    }

    return new Date(value * 1000).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function getJwtTimes(payload) {
    return [
        { key: "exp", label: "Expires", value: formatUnixTimestamp(payload.exp) },
        { key: "iat", label: "Issued at", value: formatUnixTimestamp(payload.iat) },
        { key: "nbf", label: "Valid from", value: formatUnixTimestamp(payload.nbf) },
    ].filter((item) => item.value);
}

export default function JwtDecoder() {
    const [token, setToken] = useState("");

    const decoded = useMemo(() => {
        if (!token.trim()) {
            return { data: null, error: null };
        }

        try {
            return { data: parseJwt(token), error: null };
        } catch (error) {
            return {
                data: null,
                error: error.message || "Invalid JWT token.",
            };
        }
    }, [token]);

    const times = decoded.data ? getJwtTimes(decoded.data.payload) : [];
    const copyText = decoded.data
        ? `Header:\n${formatJson(decoded.data.header)}\n\nPayload:\n${formatJson(decoded.data.payload)}`
        : "";

    const tokenEstimatorHref = decoded.data
        ? `/en/token-estimator?text=${encodeURIComponent(formatJson(decoded.data.payload))}`
        : "/en/token-estimator";

    return (
        <ToolLayout
            title="JWT Decoder Online - Decode JSON Web Tokens"
            lang="en"
            currentPath="/en/jwt-decoder"
            contextualTools={[
                {
                    href: tokenEstimatorHref,
                    title: "Estimate payload tokens and cost",
                    description:
                        "to estimate payload size and cost before using it in an AI prompt or LLM workflow.",
                },
                {
                    href: "/en/timestamp-converter",
                    title: "Convert Unix timestamps",
                    description:
                        "to convert exp, iat and nbf claims into readable dates.",
                },
                {
                    href: "/en/base64-tool",
                    title: "Encode and decode Base64",
                    description:
                        "to inspect encoded payloads and token-related strings.",
                },
            ]}
            description="Decode a JSON Web Token directly in your browser. Paste a JWT to inspect its header, payload, claims, expiration time and signature without sending the token to external servers."
            examples={[
                {
                    title: "Decode a JWT returned by a login API",
                    description:
                        "Paste the access token or refresh token returned by an authentication endpoint to inspect claims such as sub, name, email, roles and permissions.",
                },
                {
                    title: "Check JWT expiration time",
                    description:
                        "Use the exp, iat and nbf fields to understand when a token was issued, when it becomes valid and when it expires.",
                },
                {
                    title: "Inspect JWT payload before debugging or testing",
                    description:
                        "Copy the decoded header and payload when debugging API authentication, authorization issues, OAuth flows or test fixtures.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        Does this JWT decoder verify the signature?
                    </h3>
                    <p>
                        No. This tool decodes the header and payload so you can
                        inspect the token content, but it does not validate or
                        verify the JWT signature.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Is the JWT sent to a server?
                    </h3>
                    <p>
                        No. Decoding happens locally in your browser, so the
                        token is not sent to external servers.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        What JWT fields can I inspect?
                    </h3>
                    <p>
                        You can inspect standard and custom claims such as sub,
                        iss, aud, exp, iat, nbf, roles, permissions and any
                        other payload field included in the token.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    JWT token
                </label>
                <textarea
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    className="min-h-40 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Paste your JWT here..."
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Decoding runs locally in your browser. Avoid pasting real
                    production tokens unless you fully trust the context.
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setToken(sampleToken)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Use sample
                </button>
                <button
                    type="button"
                    onClick={() => setToken("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Clear
                </button>
            </div>

            {decoded.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {decoded.error}
                </div>
            )}

            {decoded.data && (
                <ResultBox copyText={copyText} lang="en">
                    <div className="space-y-4">
                        {times.length > 0 && (
                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                    Main dates
                                </p>
                                <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                                    {times.map((item) => (
                                        <p key={item.key}>
                                            <strong>{item.label}:</strong>{" "}
                                            {item.value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Header
                            </p>
                            <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.header)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Payload
                            </p>
                            <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.payload)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Signature
                            </p>
                            <p className="break-all rounded-lg bg-white/70 p-3 font-mono text-sm text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                                {decoded.data.signature ||
                                    "No signature present"}
                            </p>
                        </div>
                    </div>
                </ResultBox>
            )}
        </ToolLayout>
    );
}