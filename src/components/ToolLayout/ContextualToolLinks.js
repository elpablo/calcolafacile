"use client";

/**
 * @file Inline list of contextual related-tool links rendered inside the
 * tool card (above the fold on mobile). Distinct from the full related-tools
 * grid at the bottom of the page.
 */

import Link from "next/link";
import i18n from "./i18n";

/**
 * @param {{
 *   tools?: Array<{ href: string, title: string, description?: string }>,
 *   lang?: "it" | "en",
 * }} props
 */
export function ContextualToolLinks({ tools, lang = "it" }) {
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
