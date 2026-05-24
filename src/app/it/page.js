import CategoryCardGrid from "@/components/CategoryCardGrid";
import RecentToolsSection from "@/components/RecentToolsSection";
import SiteFooter from "@/components/SiteFooter";
import ToolCard from "@/components/ToolCard";
import { getFeaturedTools } from "@/config/tools";

export const metadata = {
    title: "Calcolatori online semplici, gratuiti e veloci",
    description:
        "Strumenti pratici per calcolare IVA, percentuali, margine, markup, stipendio netto, conversioni di unità e utility per sviluppatori come JWT, JSON, Base64, timestamp, URL encoding, UUID e token LLM.",
    alternates: {
        canonical: "https://calcolafacile.org/it",
    },
};

const featuredTools = getFeaturedTools("it", 4);

export default function Home() {
    return (
        <main className="mx-auto max-w-[1600px] px-6 py-12">
            <section className="mb-12 max-w-4xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    CalcolaFacile
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Calcolatori online semplici, gratuiti e veloci
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    Strumenti pratici per calcolare IVA, percentuali, margine,
                    markup, stipendio netto, conversioni di unità e utility per
                    sviluppatori, API e AI senza registrazione e senza
                    complicazioni.
                </p>
            </section>

            <RecentToolsSection lang="it" limit={6} />

            {featuredTools.length > 0 && (
                <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/30">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                            In evidenza
                        </p>
                    </div>

                    <div
                        className="grid gap-4"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(16rem, 1fr))",
                        }}
                    >
                        {featuredTools.map((tool) => (
                            <ToolCard
                                key={tool.key}
                                tool={tool}
                                variant="featured"
                                headingLevel={2}
                            />
                        ))}
                    </div>
                </section>
            )}

            <CategoryCardGrid lang="it" />

            <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
                <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Perché usare CalcolaFacile?
                </h2>
                <p className="max-w-4xl leading-7 text-zinc-600 dark:text-zinc-300">
                    CalcolaFacile raccoglie piccoli strumenti online pensati per
                    risolvere calcoli quotidiani in modo rapido: calcoli
                    fiscali, percentuali, margini, sconti, stipendio netto,
                    conversioni di unità di misura e piccole utility per
                    sviluppatori, API e AI, come JWT, JSON, Base64, timestamp,
                    URL encoding e UUID. Ogni pagina offre spiegazioni semplici,
                    esempi e risultati immediati direttamente nel browser.
                </p>
            </section>

            <SiteFooter lang="it" />
        </main>
    );
}
