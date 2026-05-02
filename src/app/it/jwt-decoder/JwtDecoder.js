"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const sampleToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiaWF0IjoxNzE0NTYwMDAwLCJleHAiOjE3MTQ1NjM2MDB9.signature";

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
        throw new Error("Il token deve contenere almeno header e payload separati da un punto.");
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

    return new Date(value * 1000).toLocaleString("it-IT", {
        dateStyle: "medium",
        timeStyle: "medium",
    });
}

function getJwtTimes(payload) {
    return [
        { key: "exp", label: "Scadenza", value: formatUnixTimestamp(payload.exp) },
        { key: "iat", label: "Emesso il", value: formatUnixTimestamp(payload.iat) },
        { key: "nbf", label: "Valido da", value: formatUnixTimestamp(payload.nbf) },
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
                error: error.message || "Token JWT non valido.",
            };
        }
    }, [token]);

    const times = decoded.data ? getJwtTimes(decoded.data.payload) : [];
    const copyText = decoded.data
        ? `Header:\n${formatJson(decoded.data.header)}\n\nPayload:\n${formatJson(decoded.data.payload)}`
        : "";

    const tokenEstimatorHref = decoded.data
        ? `/it/token-estimator?text=${encodeURIComponent(formatJson(decoded.data.payload))}`
        : "/it/token-estimator";

    return (
        <ToolLayout
            title="JWT Decoder online"
            currentPath="/it/jwt-decoder"
            contextualTools={[
                {
                    href: tokenEstimatorHref,
                    title: "Stima token e costo del payload",
                    description: "se vuoi usarlo in un prompt o in un flusso AI.",
                },
                {
                    href: "/it/timestamp-converter",
                    title: "Converti timestamp Unix",
                    description: "per leggere meglio campi come exp, iat e nbf.",
                },
                {
                    href: "/it/base64-tool",
                    title: "Codifica e decodifica Base64",
                    description: "per lavorare con payload, token e stringhe codificate.",
                },
            ]}
            description="Incolla un JSON Web Token e visualizza header e payload decodificati. La decodifica avviene localmente nel browser: nessun token viene inviato a server esterni."
            faq={
                <>
                    <h3 className="font-semibold">Questo tool verifica la firma del JWT?</h3>
                    <p>
                        No. Questo strumento decodifica header e payload per ispezionare il contenuto del token, ma non verifica la firma.
                    </p>

                    <h3 className="mt-2 font-semibold">Il token viene inviato a un server?</h3>
                    <p>
                        No. La decodifica avviene nel browser, quindi il token non viene inviato a server esterni.
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
                    placeholder="Incolla qui il tuo JWT..."
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Decodifica locale nel browser. Non incollare token reali se non sei sicuro del contesto.
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setToken(sampleToken)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa esempio
                </button>
                <button
                    type="button"
                    onClick={() => setToken("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Pulisci
                </button>
            </div>

            {decoded.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {decoded.error}
                </div>
            )}

            {decoded.data && (
                <ResultBox copyText={copyText}>
                    <div className="space-y-4">
                        {times.length > 0 && (
                            <div className="rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                    Date principali
                                </p>
                                <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                                    {times.map((item) => (
                                        <p key={item.key}>
                                            <strong>{item.label}:</strong> {item.value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Header
                            </p>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.header)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Payload
                            </p>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                                {formatJson(decoded.data.payload)}
                            </pre>
                        </div>

                        <div>
                            <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                Signature
                            </p>
                            <p className="break-all rounded-lg bg-white/70 p-3 font-mono text-sm text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                                {decoded.data.signature || "Nessuna signature presente"}
                            </p>
                        </div>
                    </div>
                </ResultBox>
            )}
        </ToolLayout>
    );
}