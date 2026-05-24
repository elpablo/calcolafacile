import ToolCard from "@/components/ToolCard";
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
                        <ToolCard
                            key={category.key}
                            tool={{
                                href,
                                title: category.title,
                                description: category.description,
                            }}
                            variant="category"
                            icon={category.icon}
                            counter={count}
                            counterLabel={toolsLabel[lang]}
                        />
                    );
                })}
            </div>
        </section>
    );
}
