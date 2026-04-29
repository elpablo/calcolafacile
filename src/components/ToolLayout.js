export default function ToolLayout({ title, children, description, faq }) {
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
        </main>
    );
}
