"use client";

/**
 * @file Shared page chrome for every tool page.
 *
 * Exports:
 *   - `ToolLayout` (default): full tool page shell (back link, title, content,
 *     description, examples, FAQ, contextual links, related tools).
 *   - `ToolInput`: opinionated number/text input used by simple calculators.
 *   - `ResultBox`: result card with copy-to-clipboard button.
 *
 * The component is locale-aware via the `lang` prop (`"it"` or `"en"`):
 * all chrome labels are sourced from the local {@link i18n} map.
 */

import { useEffect } from "react";
import Link from "next/link";
import { trackToolUsage } from "@/lib/toolUsage";
import i18n from "./i18n";
import { defaultRelatedTools, localizeTool } from "./registry";
import { ContextualToolLinks } from "./ContextualToolLinks";
import { PracticalExamples } from "./PracticalExamples";
import { RelatedToolsGrid } from "./RelatedToolsGrid";

// Re-export primitives so callers can do:
//   import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout"
export { ToolInput } from "./ToolInput";
export { ResultBox } from "./ResultBox";

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

            <RelatedToolsGrid tools={visibleRelatedTools} lang={lang} />
        </main>
    );
}
