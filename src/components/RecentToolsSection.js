"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";
import { getRecentTools } from "@/lib/toolUsage";

const i18n = {
    it: {
        title: "Usati di recente",
    },
    en: {
        title: "Recently used",
    },
};

export default function RecentToolsSection({ lang = "it", limit = 6 }) {
    const t = i18n[lang] || i18n.it;

    const [recentTools, refresh] = useReducer(
        () => getRecentTools({ lang, limit }),
        [],
    );

    useEffect(() => {
        refresh();
    }, [lang, limit]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                refresh();
            }
        };

        window.addEventListener("focus", refresh);
        window.addEventListener("pageshow", refresh);
        window.addEventListener("storage", refresh);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("focus", refresh);
            window.removeEventListener("pageshow", refresh);
            window.removeEventListener("storage", refresh);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    if (recentTools.length === 0) {
        return null;
    }

    return (
        <section className="mb-10 space-y-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {t.title}
                </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {recentTools.map((tool) => (
                    <Link
                        key={tool.path}
                        href={tool.path}
                        className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-700"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300">
                                    {tool.title}
                                </h3>

                                {tool.description && (
                                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                                        {tool.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}