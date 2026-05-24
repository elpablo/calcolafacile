import Link from "next/link";

function getBadgeStyle(badge) {
    const normalizedBadge = String(badge || "").toLowerCase();

    if (["trending", "trend"].includes(normalizedBadge)) {
        return { backgroundColor: "#059669" };
    }

    if (["ai", "ia"].includes(normalizedBadge)) {
        return { backgroundColor: "#7c3aed" };
    }

    if (["new", "nuovo"].includes(normalizedBadge)) {
        return { backgroundColor: "#f59e0b" };
    }

    if (normalizedBadge === "dev") {
        return { backgroundColor: "#475569" };
    }

    if (["popular", "popolare"].includes(normalizedBadge)) {
        return { backgroundColor: "#ea580c" };
    }

    if (["featured", "consigliato"].includes(normalizedBadge)) {
        return { backgroundColor: "#2563eb" };
    }

    return { backgroundColor: "#2563eb" };
}

/**
 * Reusable card for linking to a tool page.
 *
 * @param {{
 *   tool: { href: string, title: string, description?: string, badge?: string },
 *   variant?: "default" | "featured" | "compact" | "category",
 *   featured?: boolean,
 *   badge?: string,
 *   headingLevel?: 2 | 3,
 *   icon?: React.ReactNode,
 *   counter?: number,
 *   counterLabel?: string,
 *   showBadge?: boolean,
 *   showIcon?: boolean,
 *   showCounter?: boolean,
 * }} props
 */
export default function ToolCard({
    tool,
    variant = "default",
    featured = false,
    badge,
    headingLevel = 3,
    icon,
    counter,
    counterLabel,
    showBadge = true,
    showIcon = true,
    showCounter = true,
}) {
    const HeadingTag = `h${headingLevel}`;
    const resolvedBadge = badge ?? tool.badge;
    const normalizedBadge =
        resolvedBadge === null || resolvedBadge === undefined
            ? ""
            : String(resolvedBadge).trim();
    const hasBadge = normalizedBadge.length > 0;
    const isFeatured = featured || variant === "featured";
    const isCompact = variant === "compact";
    const isCategory = variant === "category";

    if (isCategory) {
        return (
            <Link
                href={tool.href}
                className="group block min-h-32 min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-800"
            >
                <div className="mb-3 flex min-w-0 items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {showIcon && icon ? (
                            <span
                                className="shrink-0 text-2xl"
                                aria-hidden="true"
                            >
                                {icon}
                            </span>
                        ) : null}
                        <HeadingTag className="min-w-0 break-words text-lg font-semibold text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300">
                            {tool.title}
                        </HeadingTag>
                    </div>

                    {showCounter && typeof counter === "number" ? (
                        <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                            {counter} {counterLabel}
                        </span>
                    ) : null}
                </div>

                {tool.description ? (
                    <p className="min-w-0 break-words leading-6 text-zinc-600 dark:text-zinc-400">
                        {tool.description}
                    </p>
                ) : null}
            </Link>
        );
    }

    return (
        <Link
            href={tool.href}
            className={`group block min-w-0 w-full max-w-full overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isCompact ? "min-h-0 p-4" : "min-h-32 p-5"
            } ${
                isFeatured
                    ? "border-blue-200 bg-white hover:border-blue-400 dark:border-blue-900/60 dark:bg-zinc-900 dark:hover:border-blue-500"
                    : "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
            }`}
        >
            <div className="mb-3 flex min-w-0 max-w-full flex-wrap items-center gap-2">
                {showBadge && hasBadge ? (
                    <span
                        className="inline-flex shrink-0 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
                        style={getBadgeStyle(normalizedBadge)}
                    >
                        {normalizedBadge}
                    </span>
                ) : null}

                {showCounter && typeof counter === "number" ? (
                    <span className="inline-flex shrink-0 rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {counter} {counterLabel}
                    </span>
                ) : null}
            </div>

            <div className="flex min-w-0 max-w-full items-start gap-3 overflow-hidden">
                {showIcon && icon ? (
                    <span className="mt-0.5 shrink-0 text-zinc-500 transition group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-300">
                        {icon}
                    </span>
                ) : null}

                <div className="min-w-0 max-w-full overflow-hidden">
                    <HeadingTag
                        className={`min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] font-semibold tracking-tight text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300 ${
                            headingLevel === 2
                                ? isCompact
                                    ? "text-xl"
                                    : isFeatured
                                      ? "text-xl"
                                      : "text-2xl"
                                : isFeatured
                                  ? "text-xl"
                                  : "text-lg"
                        }`}
                    >
                        {tool.title}
                    </HeadingTag>

                    {tool.description ? (
                        <p className="mt-2 min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere] leading-6 text-zinc-600 dark:text-zinc-400">
                            {tool.description}
                        </p>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}