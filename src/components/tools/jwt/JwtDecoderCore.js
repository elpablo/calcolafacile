"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { jwtDecoderExamples } from "@/components/tools/jwt/jwtDecoderExamples";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:jwt-decoder";
const DEFAULT_TOKEN = "";

const DEFAULT_ENCODER_STATE = {
    payloadJson: JSON.stringify(
        {
            sub: "user_123",
            role: "admin",
        },
        null,
        2,
    ),
    expirationPreset: "1h",
    customExpirationSeconds: "3600",
    includeIssuedAt: true,
    includeExpiration: true,
};

const EXPIRATION_PRESETS = {
    "15m": 15 * 60,
    "30m": 30 * 60,
    "1h": 60 * 60,
    "1d": 24 * 60 * 60,
    "7d": 7 * 24 * 60 * 60,
};

function subscribeToHydration() {
    return () => {};
}

function getInitialToolState(currentExampleKey, shouldLoadSavedState) {
    const example = currentExampleKey
        ? jwtDecoderExamples[currentExampleKey]
        : null;

    if (example) {
        return {
            activeMode: "decode",
            token: example.token,
            encoder: DEFAULT_ENCODER_STATE,
        };
    }

    if (!shouldLoadSavedState) {
        return {
            activeMode: "decode",
            token: DEFAULT_TOKEN,
            encoder: DEFAULT_ENCODER_STATE,
        };
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return {
        activeMode: ["decode", "encode"].includes(storedState?.activeMode)
            ? storedState.activeMode
            : "decode",
        token: typeof storedState?.token === "string"
            ? storedState.token
            : DEFAULT_TOKEN,
        encoder: {
            ...DEFAULT_ENCODER_STATE,
            ...(storedState?.encoder && typeof storedState.encoder === "object"
                ? storedState.encoder
                : {}),
        },
    };
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

function base64UrlEncode(value) {
    const bytes = typeof value === "string"
        ? new TextEncoder().encode(value)
        : value;

    let binary = "";
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

async function signHs256Jwt({ payload, secret, expirationSeconds, includeIssuedAt, includeExpiration }) {
    const now = Math.floor(Date.now() / 1000);
    const protectedHeader = {
        alg: "HS256",
        typ: "JWT",
    };

    const claims = {
        ...payload,
        ...(includeIssuedAt ? { iat: now } : {}),
        ...(includeExpiration ? { exp: now + expirationSeconds } : {}),
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(protectedHeader));
    const encodedPayload = base64UrlEncode(JSON.stringify(claims));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;

    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        {
            name: "HMAC",
            hash: "SHA-256",
        },
        false,
        ["sign"],
    );

    const signature = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        new TextEncoder().encode(unsignedToken),
    );

    return `${unsignedToken}.${base64UrlEncode(new Uint8Array(signature))}`;
}

function getExpirationSeconds(preset, customValue) {
    if (preset === "custom") {
        const parsed = Number(customValue);
        return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
    }

    return EXPIRATION_PRESETS[preset] ?? EXPIRATION_PRESETS["1h"];
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

function formatUnixTimestamp(value) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return null;
    }

    return new Date(numericValue * 1000)
        .toISOString()
        .replace("T", " ")
        .replace(".000Z", " UTC");
}

function getJwtTimes(payload, labels) {
    return [
        {
            key: "exp",
            label: labels.times.exp,
            value: formatUnixTimestamp(payload.exp),
        },
        {
            key: "iat",
            label: labels.times.iat,
            value: formatUnixTimestamp(payload.iat),
        },
        {
            key: "nbf",
            label: labels.times.nbf,
            value: formatUnixTimestamp(payload.nbf),
        },
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
        title,
        currentPath,
        contextualTools,
        description,
        examples,
        faq,
        labels,
        sampleToken,
    } = content;

    const [toolState, setToolState] = useState(() => {
        return getInitialToolState(currentExampleKey, shouldLoadSavedState);
    });
    const [secret, setSecret] = useState("");
    const [encoderError, setEncoderError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedToken, setGeneratedToken] = useState("");

    const { activeMode, token, encoder } = toolState;

    const setToken = (nextToken) => {
        setToolState((currentState) => ({
            ...currentState,
            token: typeof nextToken === "function" ? nextToken(currentState.token) : nextToken,
        }));
    };

    const setActiveMode = (nextMode) => {
        setToolState((currentState) => ({
            ...currentState,
            activeMode: nextMode,
        }));
    };

    const updateEncoder = (updates) => {
        setToolState((currentState) => ({
            ...currentState,
            encoder: {
                ...currentState.encoder,
                ...updates,
            },
        }));
    };

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        if (currentExampleKey) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            activeMode,
            token,
            encoder,
        });
    }, [activeMode, currentExampleKey, encoder, shouldLoadSavedState, token]);

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

    const times = decoded.data ? getJwtTimes(decoded.data.payload, labels) : [];
    const status = decoded.data ? getTokenStatus(decoded.data.payload, labels) : null;
    const copyText = decoded.data
        ? `${labels.sections.header}:\n${formatJson(decoded.data.header)}\n\n${labels.sections.payload}:\n${formatJson(decoded.data.payload)}`
        : "";

    const tokenEstimatorHref = decoded.data
        ? `${labels.tokenEstimatorHref}?text=${encodeURIComponent(formatJson(decoded.data.payload))}`
        : labels.tokenEstimatorHref;

    const generateToken = async () => {
        setEncoderError(null);
        setGeneratedToken("");

        if (!secret.trim()) {
            setEncoderError(labels.encoder.errors.missingSecret);
            return;
        }

        const expirationSeconds = getExpirationSeconds(
            encoder.expirationPreset,
            encoder.customExpirationSeconds,
        );

        if (encoder.includeExpiration && !expirationSeconds) {
            setEncoderError(labels.encoder.errors.invalidExpiration);
            return;
        }

        let parsedPayload;
        try {
            parsedPayload = JSON.parse(encoder.payloadJson);
        } catch {
            setEncoderError(labels.encoder.errors.invalidPayload);
            return;
        }

        if (!parsedPayload || Array.isArray(parsedPayload) || typeof parsedPayload !== "object") {
            setEncoderError(labels.encoder.errors.payloadMustBeObject);
            return;
        }

        setIsGenerating(true);

        try {
            const generatedToken = await signHs256Jwt({
                payload: parsedPayload,
                secret,
                expirationSeconds: expirationSeconds || EXPIRATION_PRESETS["1h"],
                includeIssuedAt: encoder.includeIssuedAt,
                includeExpiration: encoder.includeExpiration,
            });

            setToken(generatedToken);
            setGeneratedToken(generatedToken);
        } catch {
            setEncoderError(labels.encoder.errors.generationFailed);
        } finally {
            setIsGenerating(false);
        }
    };

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
            <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-700 dark:bg-zinc-950/40">
                <button
                    type="button"
                    onClick={() => setActiveMode("decode")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        activeMode === "decode"
                            ? "bg-white text-blue-700 shadow-sm dark:bg-zinc-800 dark:text-blue-300"
                            : "text-zinc-600 hover:bg-white/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                    }`}
                >
                    {labels.modes.decode}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveMode("encode")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        activeMode === "encode"
                            ? "bg-white text-blue-700 shadow-sm dark:bg-zinc-800 dark:text-blue-300"
                            : "text-zinc-600 hover:bg-white/70 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                    }`}
                >
                    {labels.modes.encode}
                </button>
            </div>

            {activeMode === "decode" && (
                <>
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
                                        <p className="font-semibold">
                                            {status.label}
                                        </p>
                                        <p className="text-xs opacity-70">
                                            exp: {decoded.data.payload.exp}
                                        </p>
                                        <p className="mt-1">
                                            {status.description}
                                        </p>
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
                                                    <strong>
                                                        {item.label}:
                                                    </strong>{" "}
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
                                        {decoded.data.signature ||
                                            labels.noSignature}
                                    </p>
                                </div>
                            </div>
                        </ResultBox>
                    )}
                </>
            )}

            {activeMode === "encode" && (
                <div className="space-y-5">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                            {labels.encoder.payloadLabel}
                        </label>
                        <textarea
                            value={encoder.payloadJson}
                            onChange={(event) =>
                                updateEncoder({
                                    payloadJson: event.target.value,
                                })
                            }
                            className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                            placeholder={labels.encoder.payloadPlaceholder}
                            spellCheck={false}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                            {labels.encoder.secretLabel}
                        </label>
                        <input
                            type="password"
                            value={secret}
                            onChange={(event) => setSecret(event.target.value)}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                            placeholder={labels.encoder.secretPlaceholder}
                        />
                        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                            {labels.encoder.secretHelper}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                {labels.encoder.expirationLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={encoder.expirationPreset}
                                    onChange={(event) =>
                                        updateEncoder({
                                            expirationPreset: event.target.value,
                                        })
                                    }
                                    className="h-10 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-9 text-sm leading-5 text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                                >
                                    {labels.encoder.expirationOptions.map(
                                        (option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ),
                                    )}
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                    ▾
                                </span>
                            </div>
                        </div>

                        {encoder.expirationPreset === "custom" && (
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                    {labels.encoder.customExpirationLabel}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={encoder.customExpirationSeconds}
                                    onChange={(event) =>
                                        updateEncoder({
                                            customExpirationSeconds:
                                                event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <input
                                type="checkbox"
                                checked={encoder.includeIssuedAt}
                                onChange={(event) =>
                                    updateEncoder({
                                        includeIssuedAt: event.target.checked,
                                    })
                                }
                                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                            />
                            {labels.encoder.includeIssuedAt}
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <input
                                type="checkbox"
                                checked={encoder.includeExpiration}
                                onChange={(event) =>
                                    updateEncoder({
                                        includeExpiration: event.target.checked,
                                    })
                                }
                                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                            />
                            {labels.encoder.includeExpiration}
                        </label>
                    </div>

                    {encoderError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                            {encoderError}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={generateToken}
                        disabled={isGenerating}
                        className="rounded-lg border border-blue-200 bg-blue-50/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100 dark:hover:border-blue-700 dark:hover:bg-blue-900/40"
                    >
                        {isGenerating
                            ? labels.encoder.generating
                            : labels.encoder.generate}
                    </button>

                    {generatedToken && (
                        <ResultBox
                            label={labels.encoder.generatedTokenLabel}
                            copyText={generatedToken}
                            lang={lang}
                        >
                            <div className="space-y-3">
                                <p className="break-all rounded-lg bg-zinc-950 p-3 font-mono text-sm text-zinc-100">
                                    {generatedToken}
                                </p>
                                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                                    {labels.encoder.generatedTokenHelper}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveMode("decode")}
                                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    {labels.encoder.inspectGeneratedToken}
                                </button>
                            </div>
                        </ResultBox>
                    )}

                    <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-sm text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                        <p className="font-semibold">
                            {labels.encoder.safetyTitle}
                        </p>
                        <p className="mt-1">{labels.encoder.safetyText}</p>
                    </div>
                </div>
            )}
        </ToolLayout>
    );
}