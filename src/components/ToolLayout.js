"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackToolUsage } from "@/lib/toolUsage";

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

const defaultRelatedTools = [
    {
        href: {
            it: "/it/calcolatore-iva",
            en: "/en/vat-calculator",
        },
        title: {
            it: "Calcolatore IVA",
            en: "VAT Calculator",
        },
        description: {
            it: "Aggiungi o scorpora IVA al 22%, 10% e 4%.",
            en: "Add or remove VAT at 22%, 10% and 4%.",
        },
    },
    {
        href: {
            it: "/it/calcolo-percentuale",
            en: "/en/percentage-calculator",
        },
        title: {
            it: "Calcolo percentuale",
            en: "Percentage Calculator",
        },
        description: {
            it: "Calcola percentuali, sconti, aumenti e riduzioni.",
            en: "Calculate percentages, discounts, increases and decreases.",
        },
    },
    {
        href: {
            it: "/it/calcolo-margine",
            en: "/en/margin-calculation",
        },
        title: {
            it: "Calcolo margine",
            en: "Margin Calculator",
        },
        description: {
            it: "Calcola margine e profitto dal prezzo di vendita.",
            en: "Calculate profit and margin from cost and selling price.",
        },
    },
    {
        href: {
            it: "/it/calcolo-markup",
            en: "/en/markup-calculation",
        },
        title: {
            it: "Calcolo markup",
            en: "Markup Calculator",
        },
        description: {
            it: "Calcola il ricarico percentuale rispetto al costo.",
            en: "Calculate percentage markup from product cost.",
        },
    },
    {
        href: {
            it: "/it/calcolo-stipendio-netto",
            en: "/en/salary-calculator",
        },
        title: {
            it: "Calcolo stipendio netto",
            en: "Net Salary Calculator",
        },
        description: {
            it: "Stima lo stipendio netto partendo dalla RAL lorda.",
            en: "Estimate monthly take-home pay from gross annual income.",
        },
    },
    {
        href: {
            it: "/it/calcolo-sconto-inverso",
            en: "/en/inverse-discount-calculation",
        },
        title: {
            it: "Calcolo sconto inverso",
            en: "Inverse Discount Calculator",
        },
        description: {
            it: "Trova il prezzo originale partendo da prezzo scontato e sconto.",
            en: "Find the original price from a discounted price and discount percentage.",
        },
    },
    {
        href: {
            it: "/it/convertitore-unita",
            en: "/en/unit-converter",
        },
        title: {
            it: "Convertitore unità di misura",
            en: "Unit Converter",
        },
        description: {
            it: "Converti lunghezza, peso, temperatura e volume in modo rapido.",
            en: "Convert length, mass, temperature, volume and more.",
        },
    },
    {
        href: {
            it: "/it/jwt-decoder",
            en: "/en/jwt-decoder",
        },
        title: {
            it: "JWT Decoder",
            en: "JWT Decoder",
        },
        description: {
            it: "Decodifica header e payload di un JSON Web Token nel browser.",
            en: "Decode the header and payload of a JSON Web Token in your browser.",
        },
    },
    {
        href: {
            it: "/it/token-estimator",
            en: "/en/token-estimator",
        },
        title: {
            it: "Stima token LLM",
            en: "LLM Token Estimator",
        },
        description: {
            it: "Stima token e costo indicativo per testi usati con modelli AI.",
            en: "Estimate token usage and approximate cost for AI model prompts.",
        },
    },
    {
        href: {
            it: "/it/json-formatter",
            en: "/en/json-formatter",
        },
        title: {
            it: "JSON Formatter",
            en: "JSON Formatter",
        },
        description: {
            it: "Formatta e valida JSON direttamente nel browser.",
            en: "Format, validate and minify JSON directly in your browser.",
        },
    },
    {
        href: {
            it: "/it/base64-tool",
            en: "/en/base64-tool",
        },
        title: {
            it: "Base64 Encode/Decode",
            en: "Base64 Encoder/Decoder",
        },
        description: {
            it: "Codifica e decodifica Base64 direttamente nel browser.",
            en: "Encode and decode Base64 directly in your browser.",
        },
    },
    {
        href: {
            it: "/it/timestamp-converter",
            en: "/en/timestamp-converter",
        },
        title: {
            it: "Timestamp Converter",
            en: "Unix Timestamp Converter",
        },
        description: {
            it: "Converti Unix timestamp in date leggibili e viceversa.",
            en: "Convert Unix timestamps to readable dates and back.",
        },
    },
    {
        href: {
            it: "/it/url-encoder-decoder",
            en: "/en/url-encoder-decoder",
        },
        title: {
            it: "URL Encoder/Decoder",
            en: "URL Encoder/Decoder",
        },
        description: {
            it: "Codifica e decodifica URL per query string, API e redirect.",
            en: "Encode and decode URLs for query strings, APIs and redirects.",
        },
    },
    {
        href: {
            it: "/it/uuid-generator",
            en: "/en/uuid-generator",
        },
        title: {
            it: "UUID Generator",
            en: "UUID Generator",
        },
        description: {
            it: "Genera UUID v4 per API, database, test e sviluppo software.",
            en: "Generate UUID v4 identifiers for APIs, databases and tests.",
        },
    },
    {
        href: {
            it: "/it/verifica-ip-pubblico",
            en: "/en/public-ip-checker",
        },
        title: {
            it: "Verifica IP pubblico",
            en: "Public IP Checker",
        },
        description: {
            it: "Controlla IP pubblico, geolocalizzazione approssimativa e informazioni VPN.",
            en: "Check your public IP, approximate geolocation and VPN information.",
        },
    },
];

function localizeTool(tool, lang) {
    return {
        href: typeof tool.href === "string" ? tool.href : tool.href?.[lang] || tool.href?.it,
        title: typeof tool.title === "string" ? tool.title : tool.title?.[lang] || tool.title?.it,
        description:
            typeof tool.description === "string"
                ? tool.description
                : tool.description?.[lang] || tool.description?.it,
    };
}

export function ToolInput({
    label,
    value,
    onChange,
    type = "number",
    step = "0.01",
    placeholder,
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
                    className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 ${suffix ? "pr-10" : ""}`}
                    placeholder={placeholder}
                />
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
