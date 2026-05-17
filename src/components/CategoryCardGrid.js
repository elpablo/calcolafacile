import Link from "next/link";
import { countToolsByCategory } from "@/config/tools";
import { getLocalizedCategories } from "@/config/toolCategories";

const gridTitle = {
    it: "Esplora per categoria",
    en: "Browse by category",
};

const gridDescription = {
    it: "Trova rapidamente il gruppo di strumenti più adatto: AI, sviluppo, conversioni, business, rete e data/ora.",
    en: "Quickly find the right group of tools: AI, development, conversions, business, network and date/time.",
};

const toolsLabel = {
    it: "strumenti",
    en: "tools",
};

/**
 * Homepage category grid linking to SEO-friendly category landing pages.
 *
 * @param {{ lang: "it" | "en" }} props
 */
export default function CategoryCardGrid({ lang }) {
    const categories = getLocalizedCategories(lang);

    return (
        <section className="mt-12">
            <div className="mb-5 max-w-3xl">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {gridTitle[lang]}
                </h2>
                <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                    {gridDescription[lang]}
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => {
                    const count = countToolsByCategory(lang, category.key);
                    const href = `/${lang}/${category.slug}`;

                    return (
                        <Link
                            key={category.key}
                            href={href}
                            className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-800"
                        >
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-950/50">
                                    <span aria-hidden="true">
                                        {category.icon}
                                    </span>
                                </div>
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    {count} {toolsLabel[lang]}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300">
                                {category.title}
                            </h3>
                            <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
                                {category.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
