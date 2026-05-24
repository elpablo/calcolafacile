"use client";

/**
 * @file "Recently used" tools strip shown on the IT and EN homepages.
 *
 * Reads the recent-tools list from localStorage via {@link getRecentTools}.
 * Because the list lives on the client, the component renders nothing during
 * SSR and on a fresh browser context. Subsequent visits to the home page
 * refresh the list when the tab gains focus, becomes visible, or is restored
 * from the BFCache (`pageshow`), and also when another tab updates storage.
 */

import { useEffect, useReducer } from "react";
import ToolCard from "@/components/ToolCard";
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
                    <ToolCard
                        key={tool.path}
                        tool={{
                            href: tool.path,
                            title: tool.title,
                            description: tool.description,
                        }}
                        variant="compact"
                    />
                ))}
            </div>
        </section>
    );
}