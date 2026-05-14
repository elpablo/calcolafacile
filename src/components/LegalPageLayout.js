/**
 * @file Layout primitives for legal pages (Privacy, Terms, Cookie Policy).
 *
 * `LegalPageLayout` renders the page header (brand line, title, last-updated
 * date, intro paragraph) and a main article slot. `LegalSection` and
 * `LegalList` are small helpers for consistent typography inside the article.
 */

export default function LegalPageLayout({ title, lastUpdated, intro, children }) {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <header className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-700">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    CalcolaFacile
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
                    {title}
                </h1>
                {lastUpdated && (
                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                        {lastUpdated}
                    </p>
                )}
                {intro && (
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                        {intro}
                    </p>
                )}
            </header>

            <article className="space-y-8 text-zinc-700 dark:text-zinc-300">
                {children}
            </article>
        </main>
    );
}

export function LegalSection({ title, children }) {
    return (
        <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
            </h2>
            <div className="space-y-3 leading-7">
                {children}
            </div>
        </section>
    );
}

export function LegalList({ children }) {
    return (
        <ul className="list-disc space-y-2 pl-6 leading-7">
            {children}
        </ul>
    );
}