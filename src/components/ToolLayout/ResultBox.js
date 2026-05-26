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
 *   compactCopy?: boolean,
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
    compactCopy = false,
}) {
    const t = i18n[lang];
    const contentRef = useRef(null);
    const [copyState, setCopyState] = useState("idle");

    const resetCopyState = (delay = 1400) => {
        window.setTimeout(() => setCopyState("idle"), delay);
    };

    const handleCopy = async () => {
        try {
            const text = copyText ?? contentRef.current?.innerText;

            if (!text) {
                setCopyState("error");
                resetCopyState();
                return;
            }

            await navigator.clipboard.writeText(text);
            setCopyState("copied");
            resetCopyState();
        } catch (err) {
            console.error("Errore copia:", err);
            setCopyState("error");
            resetCopyState(1800);
        }
    };

    const isCopied = copyState === "copied";
    const isError = copyState === "error";

    const copyErrorLabel = t.copyError ?? "Error";
    const copyLabel = isCopied ? t.copied : isError ? copyErrorLabel : t.copy;
    const copyButtonMinWidthCh = compactCopy
        ? undefined
        : Math.max(t.copy.length, t.copied.length, copyErrorLabel.length) + 4;

    const resultLabel = label || t.result;

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
                    className={`flex h-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold shadow-sm transition hover:scale-105 active:scale-95 ${
                        compactCopy ? "w-9 px-0" : "gap-1.5 px-3"
                    } ${
                        isCopied
                            ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/40 dark:text-green-300"
                            : isError
                              ? "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                              : "border-blue-300 bg-white text-zinc-700 hover:bg-blue-100 dark:border-blue-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    aria-label={copyLabel}
                    title={copyLabel}
                    data-testid={testId ? `${testId}-copy` : undefined}
                    style={
                        copyButtonMinWidthCh
                            ? { minWidth: `${copyButtonMinWidthCh}ch` }
                            : undefined
                    }
                >
                    <span aria-hidden="true" className="text-base leading-none">
                        {isCopied ? "✓" : isError ? "!" : "📋"}
                    </span>
                    {compactCopy ? null : (
                        <span className="whitespace-nowrap">{copyLabel}</span>
                    )}
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
