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
            title="UUID v4 Generator Online for APIs, Databases and Testing"
            lang="en"
            currentPath="/en/uuid-generator"
            contextualTools={[
                {
                    href: "/en/json-formatter",
                    title: "JSON Formatter",
                    description:
                        "to use UUIDs inside payloads, fixtures, and API responses.",
                },
                {
                    href: "/en/base64-tool",
                    title: "Base64 Encode/Decode",
                    description: "to encode identifiers or payloads in tests.",
                },
                {
                    href: "/en/url-encoder-decoder",
                    title: "URL Encoder/Decoder",
                    description:
                        "if you need to pass UUIDs in query strings or redirects.",
                },
            ]}
            description="Generate UUID v4 identifiers instantly in your browser for APIs, databases, distributed systems and testing. No data is sent to external servers."
            examples={[
                {
                    title: "Generate unique IDs for databases",
                    description:
                        "Use UUIDs as primary keys or unique identifiers in relational or NoSQL databases.",
                },
                {
                    title: "Create identifiers for APIs and distributed systems",
                    description:
                        "UUIDs are ideal for identifying resources, requests, or events with a very low collision risk.",
                },
                {
                    title: "Generate data for testing and development",
                    description:
                        "You can quickly create UUID lists to use in fixtures, automated tests, or simulations.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">What is a UUID?</h3>
                    <p>
                        A UUID is a unique identifier commonly used in
                        databases, APIs, distributed systems, and software
                        testing.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Are UUIDs generated on a server?
                    </h3>
                    <p>
                        No. UUIDs are generated locally in your browser and are
                        not sent to external servers.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Which version does this tool generate?
                    </h3>
                    <p>
                        This tool generates UUID v4 values, based on random
                        numbers.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                        <label className={labelClass}>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            step="1"
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                            className={inputClass}
                            placeholder="E.g. 5"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={generate}
                        className="h-12 rounded-lg border border-blue-300 bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        Generate UUIDs
                    </button>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    You can generate from 1 to 100 UUIDs at a time.
                </p>
            </div>

            <ResultBox
                copyText={copyText}
                label={
                    uuids.length === 1 ? "Generated UUID" : "Generated UUIDs"
                }
                lang="en"
            >
                <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                    {copyText}
                </pre>
            </ResultBox>
        </ToolLayout>
    );
}