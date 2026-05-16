"use client";

/**
 * @file Result card with a copy-to-clipboard button.
 */

import { useRef, useState } from "react";
import i18n from "./i18n";

/**
 * Result card with a copy-to-clipboard button.
 *
 * When `copyText` is omitted the button copies the rendered text content of
 * the box (via `innerText`), which is convenient for simple result displays.
 *
 * @param {{
 *   children: React.ReactNode,
 *   copyText?: string,
 *   label?: string,
 *   lang?: "it" | "en",
 *   testId?: string,
 *   live?: "polite" | "assertive" | "off",
 * }} props
 */
export function ResultBox({
    children,
    copyText,
    label,
    lang = "it",
    testId,
    live = "polite",
}) {
    const t = i18n[lang];
    const contentRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const resultLabel = label || t.result;

    const handleCopy = async () => {
        try {
            const text = copyText ?? contentRef.current?.innerText;

            if (text) {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1200);
            }
        } catch (err) {
            console.error("Errore copia:", err);
        }
    };

    return (
        <section
            data-testid={testId}
            aria-label={resultLabel}
            aria-live={live}
            className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/40"
        >
            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {resultLabel}
                </p>
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-medium shadow-sm transition hover:scale-105 active:scale-95 ${
                        copied
                            ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/40 dark:text-green-300"
                            : "border-blue-300 bg-white text-zinc-700 hover:bg-blue-100 dark:border-blue-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    aria-label={copied ? t.copied : t.copy}
                    title={copied ? t.copied : t.copy}
                    data-testid={testId ? `${testId}-copy` : undefined}
                >
                    {copied ? "✓" : "📋"}
                </button>
            </div>
            <div
                ref={contentRef}
                data-testid={testId ? `${testId}-content` : undefined}
                className="min-w-0 overflow-hidden"
            >
                {children}
            </div>
        </section>
    );
}
