"use client";

/**
 * @file Practical examples section displayed in the right column of every
 * tool page.
 */

import Link from "next/link";
import i18n from "./i18n";

/**
 * @param {{
 *   examples?: Array<{ title: string, description: string, href?: string }>,
 *   lang?: "it" | "en",
 * }} props
 */
export function PracticalExamples({ examples, lang = "it" }) {
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
