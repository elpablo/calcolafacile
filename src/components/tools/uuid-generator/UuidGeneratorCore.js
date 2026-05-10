"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:uuid-generator";

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

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState) {
    if (!shouldLoadSavedState) {
        return { quantity: 5 };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    const parsed = Number.parseInt(stored?.quantity, 10);
    const quantity = Number.isNaN(parsed) ? 5 : Math.min(Math.max(parsed, 1), 100);
    return { quantity };
}

export default function UuidGeneratorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <UuidGeneratorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function UuidGeneratorCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState);
    const [quantity, setQuantity] = useState(initialState.quantity);
    const [uuids, setUuids] = useState(() =>
        shouldLoadSavedState
            ? Array.from({ length: initialState.quantity }, generateUuidV4)
            : [],
    );

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { quantity });
    }, [shouldLoadSavedState, quantity]);

    const normalizedQuantity = useMemo(() => normalizeQuantity(quantity), [quantity]);
    const copyText = uuids.join("\n");

    const generate = () => {
        setUuids(Array.from({ length: normalizedQuantity }, generateUuidV4));
    };

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            description={description}
            examples={examples}
            faq={faq}
            contextualTools={contextualTools}
        >
            <div className="mb-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                        <label className={labelClass}>{labels.quantityLabel}</label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            step="1"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                            className={inputClass}
                            placeholder={labels.placeholder}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={generate}
                        className="h-12 rounded-lg border border-blue-300 bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 dark:border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        {labels.generateButton}
                    </button>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.hint}
                </p>
            </div>

            <ResultBox
                copyText={copyText}
                label={uuids.length === 1 ? labels.resultLabelSingular : labels.resultLabelPlural}
                lang={lang}
            >
                <pre className="max-w-full overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-zinc-950 p-3 text-sm text-zinc-100">
                    {copyText}
                </pre>
            </ResultBox>
        </ToolLayout>
    );
}
