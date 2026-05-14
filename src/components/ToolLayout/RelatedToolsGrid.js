"use client";

/**
 * @file Related-tools grid rendered at the bottom of every tool page.
 */

import Link from "next/link";
import i18n from "./i18n";

/**
 * @param {{
 *   tools: Array<{ href: string, title: string, description: string }>,
 *   lang?: "it" | "en",
 * }} props
 */
export function RelatedToolsGrid({ tools, lang = "it" }) {
    const t = i18n[lang];
    if (!tools?.length) {
        return null;
    }

    return (
        <section className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-700">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {t.related}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {tools.map((tool) => (
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
    );
}
