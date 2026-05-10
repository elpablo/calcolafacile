"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { jwtDecoderExamples } from "@/data/toolExamples/jwtDecoderExamples";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:jwt-decoder";
const DEFAULT_TOKEN = "";

function subscribeToHydration() {
    return () => {};
}

function getInitialToken(currentExampleKey, shouldLoadSavedState) {
    const example = currentExampleKey
        ? jwtDecoderExamples[currentExampleKey]
        : null;

    if (example) {
        return example.token;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_TOKEN;
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return typeof storedState?.token === "string"
        ? storedState.token
        : DEFAULT_TOKEN;
}

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

function parseJwt(token, labels) {
    const parts = token.trim().split(".");

    if (parts.length < 2) {
        throw new Error(labels.errors.missingParts);
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

function formatUnixTimestamp(value, locale) {
    if (typeof value !== "number") {
        return null;
    }

    return new Date(value * 1000).toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function getJwtTimes(payload, labels, locale) {
    return [
        { key: "exp", label: labels.times.exp, value: formatUnixTimestamp(payload.exp, locale) },
        { key: "iat", label: labels.times.iat, value: formatUnixTimestamp(payload.iat, locale) },
        { key: "nbf", label: labels.times.nbf, value: formatUnixTimestamp(payload.nbf, locale) },
    ].filter((item) => item.value);
}

function getTokenStatus(payload, labels) {
    if (typeof payload.exp !== "number") {
        return {
            type: "unknown",
            label: labels.status.unknown,
            description: labels.status.noExpiration,
        };
    }

    const now = Math.floor(Date.now() / 1000);
    const secondsLeft = payload.exp - now;

    if (secondsLeft <= 0) {
        return {
            type: "expired",
            label: labels.status.expired,
            description: labels.status.expiredDescription,
        };
    }

    const minutesLeft = Math.ceil(secondsLeft / 60);
    const hoursLeft = Math.ceil(secondsLeft / 3600);
    const daysLeft = Math.ceil(secondsLeft / 86400);

    let description;
    if (secondsLeft < 3600) {
        description = labels.status.expiresInMinutes(minutesLeft);
    } else if (secondsLeft < 86400) {
        description = labels.status.expiresInHours(hoursLeft);
    } else {
        description = labels.status.expiresInDays(daysLeft);
    }

    return {
        type: "valid",
        label: labels.status.valid,
        description,
    };
}

function getStatusClasses(type) {
    if (type === "valid") {
        return "border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300";
    }

    if (type === "expired") {
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300";
    }

    return "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300";
}

export default function JwtDecoderCore({ content }) {
    const searchParams = useSearchParams();
    const currentExampleKey = searchParams.get("example");
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <JwtDecoderCoreContent
            key={`${currentExampleKey ?? "saved-state"}:${hasHydrated ? "hydrated" : "ssr"}`}
            content={content}
            currentExampleKey={currentExampleKey}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function JwtDecoderCoreContent({
    content,
    currentExampleKey,
    shouldLoadSavedState,
}) {
    const {
        lang,
        locale,
        title,
        currentPath,
        contextualTools,
        description,
        examples,
        faq,
        labels,
        sampleToken,
    } = content;

    const [token, setToken] = useState(() => {
        return getInitialToken(currentExampleKey, shouldLoadSavedState);
    });

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        if (currentExampleKey) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            token,
        });
    }, [currentExampleKey, shouldLoadSavedState, token]);

    const decoded = useMemo(() => {
        if (!token.trim()) {
            return { data: null, error: null };
        }

        try {
            return { data: parseJwt(token, labels), error: null };
        } catch (error) {
            return {
                data: null,
                error: error.message || labels.errors.invalidToken,
            };
        }
    }, [token, labels]);

    const times = decoded.data ? getJwtTimes(decoded.data.payload, labels, locale) : [];
    const status = decoded.data ? getTokenStatus(decoded.data.payload, labels) : null;
    const copyText = decoded.data
        ? `${labels.sections.header}:\n${formatJson(decoded.data.header)}\n\n${labels.sections.payload}:\n${formatJson(decoded.data.payload)}`
        : "";

    const tokenEstimatorHref = decoded.data
        ? `${labels.tokenEstimatorHref}?text=${encodeURIComponent(formatJson(decoded.data.payload))}`
        : labels.tokenEstimatorHref;

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            contextualTools={contextualTools(tokenEstimatorHref)}
            description={description}
            examples={examples}
            faq={faq}
        >
            <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {labels.inputLabel}
                </label>
                <textarea
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    className="min-h-40 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={labels.placeholder}
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.helperText}
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setToken(sampleToken)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.useSample}
                </button>
                <button
                    type="button"
                    onClick={() => setToken("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    {labels.clear}
                </button>
            </div>

            {decoded.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {decoded.error}
                </div>
            )}

            {decoded.data && (
                <ResultBox copyText={copyText} lang={lang}>
                    <div className="space-y-4">
                        {status && (
                            <div
                                className={`rounded-lg border p-3 text-sm ${getStatusClasses(status.type)}`}
                            >
                                <p className="font-semibold">{status.label}</p>
                                <p className="text-xs opacity-70">
                                    exp: {decoded.data.payload.exp}
                                </p>
                                <p className="mt-1">{status.description}</p>
                            </div>
                        )}

                        {times.length > 0 && (
                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                    {labels.sections.mainDates}
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
                                {labels.sections.header}
                            </p>
                            <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.header)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                {labels.sections.payload}
                            </p>
                            <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.payload)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                {labels.sections.signature}
                            </p>
                            <p className="break-all rounded-lg bg-white/70 p-3 font-mono text-sm text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                                {decoded.data.signature || labels.noSignature}
                            </p>
                        </div>
                    </div>
                </ResultBox>
            )}
        </ToolLayout>
    );
}