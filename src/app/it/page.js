import Link from "next/link";

export const metadata = {
    title: "Calcolatori online semplici, gratuiti e veloci",
    description:
        "Strumenti pratici per calcolare IVA, percentuali, margine, markup, stipendio netto, sconti e conversioni di unità senza registrazione.",
    alternates: {
        canonical: "https://calcolafacile.org/it",
    },
};

const tools = [
    {
        href: "/it/calcolatore-iva",
        title: "Calcolatore IVA",
        description: "Aggiungi o scorpora IVA al 22%, 10% e 4%.",
    },
    {
        href: "/it/convertitore-unita",
        title: "Convertitore unità di misura",
        description:
            "cm → pollici, kg → lb, °C → °F, volume, area, velocità e pressione.",
    },
    {
        href: "/it/calcolo-percentuale",
        title: "Calcolo percentuale",
        description: "Calcola percentuali, sconti, aumenti e riduzioni.",
    },
    {
        href: "/it/calcolo-margine",
        title: "Calcolo margine",
        description: "Calcola margine e profitto dal prezzo di vendita.",
    },
    {
        href: "/it/calcolo-markup",
        title: "Calcolo markup",
        description: "Calcola il ricarico percentuale rispetto al costo.",
    },
    {
        href: "/it/calcolo-stipendio-netto",
        title: "Calcolo stipendio netto",
        description: "Stima lo stipendio netto partendo dalla RAL lorda.",
    },
    {
        href: "/it/calcolo-sconto-inverso",
        title: "Calcolo sconto inverso",
        description:
            "Trova il prezzo originale partendo da prezzo scontato e sconto.",
    },
];

export default function Home() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            <section className="mb-12 max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    CalcolaFacile
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Calcolatori online semplici, gratuiti e veloci
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    Strumenti pratici per calcolare IVA, percentuali, margine,
                    markup, stipendio netto, sconti e conversioni di unità senza
                    registrazione e senza complicazioni.
                </p>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Strumenti disponibili
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    {tools.map((tool) => {
                        const isFeatured = tool.href === "/it/convertitore-unita";

                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className={`min-h-30 rounded-xl border p-5 shadow-sm transition ${{
                                    true: "border-blue-300 bg-blue-50 dark:border-blue-500 dark:bg-zinc-800",
                                    false: "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                                }[isFeatured]}`}
                            >
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {tool.title}
                                    </h3>
                                    {isFeatured && (
                                        <span className="mt-2 inline-flex rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                                            Consigliato
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                    {tool.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
                <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Perché usare CalcolaFacile?
                </h2>
                <p className="max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
                    CalcolaFacile raccoglie piccoli strumenti online pensati per
                    risolvere calcoli quotidiani in modo rapido: calcoli fiscali,
                    percentuali, margini, sconti, stipendio netto e conversioni
                    di unità di misura. Ogni pagina offre spiegazioni semplici,
                    esempi e risultati immediati.
                </p>
            </section>
        </main>
    );
}
