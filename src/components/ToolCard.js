

import Link from "next/link";

/**
 * Reusable card for linking to a tool page.
 *
 * @param {{
 *   tool: { href: string, title: string, description?: string },
 *   featured?: boolean,
 *   badge?: string,
 *   headingLevel?: 2 | 3,
 * }} props
 */
export default function ToolCard({
    tool,
    featured = false,
    badge,
    headingLevel = 3,
}) {
    const HeadingTag = `h${headingLevel}`;

    return (
        <Link
            href={tool.href}
            className={`group block min-h-32 rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                featured
                    ? "border-blue-200 bg-white hover:border-blue-400 dark:border-blue-900/60 dark:bg-zinc-900 dark:hover:border-blue-500"
                    : "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
            }`}
        >
            {badge && (
                <span className="mb-3 inline-flex rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                    {badge}
                </span>
            )}

            <HeadingTag
                className={`font-semibold tracking-tight text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300 ${
                    headingLevel === 2 ? "text-2xl" : "text-lg"
                }`}
            >
                {tool.title}
            </HeadingTag>

            {tool.description && (
                <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
                    {tool.description}
                </p>
            )}
        </Link>
    );
}