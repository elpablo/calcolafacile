import Link from "next/link";

const defaultRelatedTools = [
    {
        href: "/it/calcolatore-iva",
        title: "Calcolatore IVA",
        description: "Aggiungi o scorpora IVA al 22%, 10% e 4%.",
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
];

export default function ToolLayout({
    title,
    children,
    description,
    faq,
    currentPath,
    relatedTools = defaultRelatedTools,
}) {
    const visibleRelatedTools = currentPath
        ? relatedTools.filter((tool) => tool.href !== currentPath)
        : relatedTools;

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>

            <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                {children}
            </div>

            {description && (
                <section className="mb-6 text-zinc-700 dark:text-zinc-300">
                    <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Come funziona
                    </h2>
                    <p>{description}</p>
                </section>
            )}

            {faq && (
                <section className="text-zinc-700 dark:text-zinc-300">
                    <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Domande frequenti
                    </h2>
                    {faq}
                </section>
            )}

            {visibleRelatedTools?.length > 0 && (
                <section className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-700">
                    <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Potrebbero interessarti anche
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {visibleRelatedTools.map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {tool.title}
                                </h3>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                    {tool.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
