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
    {
        href: "/it/convertitore-unita",
        title: "Convertitore unità di misura",
        description: "Converti lunghezza, peso, temperatura e volume in modo rapido.",
    },
];

export function ToolInput({
    label,
    value,
    onChange,
    type = "number",
    step = "0.01",
    placeholder,
    suffix,
    helpText,
}) {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-zinc-700 dark:text-zinc-300">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    step={step}
                    value={value}
                    onChange={onChange}
                    className={`w-full rounded border border-zinc-300 bg-white p-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 ${suffix ? "pr-10" : ""}`}
                    placeholder={placeholder}
                />
                {suffix && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400 dark:text-zinc-500">
                        {suffix}
                    </span>
                )}
            </div>
            {helpText && (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {helpText}
                </p>
            )}
        </div>
    );
}

export function ResultBox({ children }) {
    return (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/40">
            {children}
        </div>
    );
}

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
        <main className="mx-auto max-w-3xl p-6">
            <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                Gratuito • Nessuna registrazione • Veloce
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title}
            </h1>

            <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                {children}
            </div>

            {description && (
                <section className="mb-8 text-zinc-700 dark:text-zinc-300">
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
                        Prova anche questi calcolatori
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {visibleRelatedTools.map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
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
