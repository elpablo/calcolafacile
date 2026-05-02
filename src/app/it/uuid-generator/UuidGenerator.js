"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

const inputClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

function generateUuidV4() {
    if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
        const random = Math.floor(Math.random() * 16);
        const value = char === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
}

function normalizeQuantity(value) {
    const parsed = Number.parseInt(value, 10);

    if (Number.isNaN(parsed)) {
        return 1;
    }

    return Math.min(Math.max(parsed, 1), 100);
}

export default function UuidGenerator() {
    const [quantity, setQuantity] = useState(5);
    const [uuids, setUuids] = useState(() => Array.from({ length: 5 }, generateUuidV4));

    const normalizedQuantity = useMemo(() => normalizeQuantity(quantity), [quantity]);
    const copyText = uuids.join("\n");

    const generate = () => {
        setUuids(Array.from({ length: normalizedQuantity }, generateUuidV4));
    };

    return (
        <ToolLayout
            title="UUID Generator online"
            currentPath="/it/uuid-generator"
            contextualTools={[
                {
                    href: "/it/json-formatter",
                    title: "JSON Formatter",
                    description: "per usare UUID dentro payload, fixture e risposte API.",
                },
                {
                    href: "/it/base64-tool",
                    title: "Base64 Encode/Decode",
                    description: "per codificare identificatori o payload nei test.",
                },
                {
                    href: "/it/url-encoder-decoder",
                    title: "URL Encoder/Decoder",
                    description: "se devi passare UUID dentro query string o redirect.",
                },
            ]}
            description="Genera uno o più UUID v4 direttamente nel browser. Utile per sviluppo software, API, database, test e identificatori univoci."
            faq={
                <>
                    <h3 className="font-semibold">Che cos&apos;è un UUID?</h3>
                    <p>
                        Un UUID è un identificatore univoco usato spesso in database, API, sistemi distribuiti e test software.
                    </p>

                    <h3 className="mt-2 font-semibold">Gli UUID vengono generati su server?</h3>
                    <p>
                        No. Gli UUID vengono generati localmente nel browser e non vengono inviati a server esterni.
                    </p>

                    <h3 className="mt-2 font-semibold">Che versione genera questo tool?</h3>
                    <p>
                        Questo strumento genera UUID v4, basati su valori casuali.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                        <label className={labelClass}>Quantità</label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            step="1"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                            className={inputClass}
                            placeholder="Es. 5"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={generate}
                        className="h-12 rounded-lg border border-blue-300 bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        Genera UUID
                    </button>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Puoi generare da 1 a 100 UUID alla volta.
                </p>
            </div>

            <ResultBox copyText={copyText} label={uuids.length === 1 ? "UUID generato" : "UUID generati"}>
                <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                    {copyText}
                </pre>
            </ResultBox>
        </ToolLayout>
    );
}