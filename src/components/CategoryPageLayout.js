import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/config/tools";

const backLabel = {
    it: "← Torna alle categorie",
    en: "← Back to all categories",
};

/**
 * Shared layout for SEO-friendly category landing pages.
 *
 * @param {{
 *   lang: "it" | "en",
 *   category: "ai" | "developer" | "conversion" | "business" | "network" | "dateTime",
 *   eyebrow: string,
 *   title: string,
 *   description: React.ReactNode,
 *   toolsTitle: string,
 *   seoTitle: string,
 *   seoText: React.ReactNode,
 * }} props
 */
export default function CategoryPageLayout({
    lang,
    category,
    eyebrow,
    title,
    description,
    toolsTitle,
    seoTitle,
    seoText,
}) {
    const tools = getToolsByCategory(lang, category);

    return (
        <main className="mx-auto max-w-[1200px] px-6 py-12">
            <section className="mb-10 max-w-4xl">
                <Link
                    href={`/${lang}`}
                    className="mb-6 inline-flex text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    {backLabel[lang]}
                </Link>

                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    {eyebrow}
                </p>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    {title}
                </h1>

                <div className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    {description}
                </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-700 dark:bg-zinc-950/30">
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {toolsTitle}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {tools.map((tool) => (
                        <ToolCard key={tool.href} tool={tool} />
                    ))}
                </div>
            </section>

            <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
                <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {seoTitle}
                </h2>

                <div className="max-w-4xl leading-7 text-zinc-600 dark:text-zinc-300">
                    {seoText}
                </div>
            </section>

            <SiteFooter lang={lang} />
        </main>
    );
}
