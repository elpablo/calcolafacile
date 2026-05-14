"use client";

/**
 * @file Shared page chrome for every tool page.
 *
 * Exports:
 *   - `ToolLayout` (default): the full tool page (back link, title, content,
 *     description, examples, FAQ, contextual links, related tools).
 *   - `ToolInput`: opinionated number/text input used by simple calculators.
 *   - `ResultBox`: result card with copy-to-clipboard button.
 *
 * The component is locale-aware via the `lang` prop (`"it"` or `"en"`):
 * all chrome labels are sourced from the local {@link i18n} map.
 *
 * The `relatedTools` registry below is the cross-tool navigation grid shown
 * at the bottom of every page; entries are localised on the fly through
 * {@link localizeTool} based on the active `lang`.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackToolUsage } from "@/lib/toolUsage";
import { tools as toolRegistry } from "@/config/tools";

const i18n = {
    it: {
        back: "← Torna alla home",
        free: "Gratuito • Nessuna registrazione • Veloce",
        howItWorks: "Come funziona",
        examples: "Esempi pratici",
        faq: "Domande frequenti",
        related: "Prova anche questi strumenti",
        contextual: "Strumenti utili collegati",
        result: "Risultato",
        copy: "Copia risultato",
        copied: "Copiato",
    },
    en: {
        back: "← Back to home",
        free: "Free • No signup • Fast",
        howItWorks: "How it works",
        examples: "Practical examples",
        faq: "FAQ",
        related: "Try these tools",
        contextual: "Related tools",
        result: "Result",
        copy: "Copy result",
        copied: "Copied",
    },
};

/**
 * Default cross-tool navigation entries shown at the bottom of every tool
 * page. Derived from the central registry in `src/config/tools.js` so this
 * file stays in sync with the homepage tools grid and the sitemap.
 *
 * Entries keep the legacy `{ href: {it, en}, title: {it, en}, description }`
 * shape — `localizeTool` below collapses them down to the active locale.
 */
const defaultRelatedTools = toolRegistry.map((tool) => ({
    href: {
        it: tool.hasIt ? `/it/${tool.slug.it}` : undefined,
        en: tool.hasEn ? `/en/${tool.slug.en}` : undefined,
    },
    title: tool.title,
    description: tool.description,
}));

function localizeTool(tool, lang) {
    return {
        href:
            typeof tool.href === "string"
                ? tool.href
                : tool.href?.[lang] || tool.href?.it,
        title:
            typeof tool.title === "string"
                ? tool.title
                : tool.title?.[lang] || tool.title?.it,
        description:
            typeof tool.description === "string"
                ? tool.description
                : tool.description?.[lang] || tool.description?.it,
    };
}

/**
 * Number/text input with optional `prefix` (e.g. `$`, `€`) and/or `suffix`
 * (e.g. `€`, `%`) decorators, plus optional help text.
 *
 * @param {{
 *   label: string,
 *   value: string | number,
 *   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 *   type?: string,
 *   step?: string,
 *   placeholder?: string,
 *   prefix?: string,
 *   suffix?: string,
 *   helpText?: string,
 * }} props
 */
export function ToolInput({
    label,
    value,
    onChange,
    type = "number",
    step = "0.01",
    placeholder,
    prefix,
    suffix,
    helpText,
}) {
    return (
        <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    step={step}
                    value={value}
                    onChange={onChange}
                    className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 ${prefix ? "pl-10" : ""} ${suffix ? "pr-10" : ""}`}
                    placeholder={placeholder}
                />
                {prefix && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                        {prefix}
                    </span>
                )}
                {suffix && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                        {suffix}
                    </span>
                )}
            </div>
            {helpText && (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {helpText}
                </p>
            )}
        </div>
    );
}

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
 * }} props
 */
export function ResultBox({ children, copyText, label, lang = "it" }) {
    const t = i18n[lang];
    const contentRef = useRef(null);
    const [copied, setCopied] = useState(false);

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
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/40">
            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {label || t.result}
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
                >
                    {copied ? "✓" : "📋"}
                </button>
            </div>
            <div ref={contentRef} className="min-w-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

function ContextualToolLinks({ tools, lang = "it" }) {
    const t = i18n[lang];
    if (!tools?.length) {
        return null;
    }

    return (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-zinc-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-zinc-300">
            <p className="mb-2 font-semibold text-zinc-800 dark:text-zinc-100">
                {t.contextual}
            </p>
            <ul className="space-y-1">
                {tools.map((tool) => (
                    <li key={tool.href}>
                        <Link
                            href={tool.href}
                            className="font-semibold text-blue-700 underline underline-offset-2 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                        >
                            {tool.title}
                        </Link>
                        {tool.description && <> {tool.description}</>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PracticalExamples({ examples, lang = "it" }) {
    const t = i18n[lang];
    if (!examples?.length) {
        return null;
    }

    return (
        <section className="mb-8 text-zinc-700 dark:text-zinc-300">
            <h2 className="mb-3 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
                {t.examples}
            </h2>
            <div className="space-y-3">
                {examples.map((example) => {
                    const content = (
                        <>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {example.title}
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {example.description}
                            </p>
                            {example.href && (
                                <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                    {lang === "it"
                                        ? "Prova questo esempio →"
                                        : "Try this example →"}
                                </p>
                            )}
                        </>
                    );

                    const className = `block rounded-xl border-l-4 p-4 transition ${
                        example.href
                            ? "border-blue-300 bg-blue-50/70 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm dark:border-blue-900/60 dark:bg-blue-950/20 dark:hover:border-blue-700 dark:hover:bg-blue-950/40"
                            : "border-zinc-300 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900/60"
                    }`;

                    if (example.href) {
                        return (
                            <Link
                                key={example.title}
                                href={example.href}
                                className={className}
                            >
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <article key={example.title} className={className}>
                            {content}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

/**
 * Standard layout for tool pages.
 *
 * Side effects: on mount, records the visit via {@link trackToolUsage} so the
 * tool appears in the "Recently used" section on the homepage. The effect
 * re-runs if `currentPath`, `title`, `description` or `lang` change.
 *
 * @param {{
 *   title: string,
 *   children: React.ReactNode,
 *   description?: React.ReactNode,
 *   examples?: Array<{ title: string, description: string, href?: string }>,
 *   faq?: React.ReactNode,
 *   currentPath?: string,
 *   contextualTools?: Array<{ href: string, title: string, description?: string }>,
 *   relatedTools?: Array<object>,
 *   lang?: "it" | "en",
 * }} props
 */
export default function ToolLayout({
    title,
    children,
    description,
    examples,
    faq,
    currentPath,
    contextualTools,
    relatedTools = defaultRelatedTools,
    lang = "it",
}) {
    const t = i18n[lang];
    useEffect(() => {
        if (!currentPath || !title) {
            return;
        }

        trackToolUsage({
            path: currentPath,
            title,
            description,
            lang,
        });
    }, [currentPath, title, description, lang]);
    
    const visibleRelatedTools = relatedTools
        .map((tool) => localizeTool(tool, lang))
        .filter((tool) => tool.href && (!currentPath || tool.href !== currentPath));

    return (
        <main className="mx-auto max-w-[1600px] p-6">
            <div className="mb-4">
                <Link
                    href={lang === "it" ? "/it" : "/en"}
                    className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    {t.back}
                </Link>
            </div>
            <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                {t.free}
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title}
            </h1>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:items-start xl:gap-10">
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    {children}

                    <ContextualToolLinks tools={contextualTools} lang={lang} />
                </div>

                <div className="space-y-8">
                    {description && (
                        <section className="text-zinc-700 dark:text-zinc-300">
                            <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                {t.howItWorks}
                            </h2>

                            <p>{description}</p>
                        </section>
                    )}

                    <PracticalExamples examples={examples} lang={lang} />

                    {faq && (
                        <section className="text-zinc-700 dark:text-zinc-300">
                            <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                {t.faq}
                            </h2>

                            {faq}
                        </section>
                    )}
                </div>
            </div>

            {visibleRelatedTools?.length > 0 && (
                <section className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-700">
                    <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {t.related}
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {visibleRelatedTools.map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {tool.title}
                                </h3>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                    {tool.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
