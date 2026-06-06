"use client";

import Link from "next/link";

function ToolCard({ tool }) {
    return (
        <Link
            href={tool.href}
            className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
        >
            <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {tool.title}
                </h3>
                {tool.badge && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                        {tool.badge}
                    </span>
                )}
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {tool.description}
            </p>
        </Link>
    );
}

function RelatedToolCard({ tool }) {
    return (
        <Link
            href={tool.href}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
        >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {tool.title}
            </h3>
            <p className="mt-1 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                {tool.description}
            </p>
        </Link>
    );
}

export default function VatToolsHubCore({ content }) {
    return (
        <>
            {content.faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(content.faqSchema),
                    }}
                />
            )}
            <main className="mx-auto max-w-6xl px-6 py-12">
            <section className="mb-12 max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    {content.eyebrow}
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    {content.heading}
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    {content.intro}
                </p>
            </section>

            <section className="mb-12">
                <div className="mb-5 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {content.toolkitTitle}
                    </h2>
                    <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                        {content.toolkitDescription}
                    </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {content.vatTools.map((tool) => (
                        <ToolCard key={tool.href} tool={tool} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {content.useCasesTitle}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {content.useCases.map((item) => (
                        <article
                            key={item.title}
                            className="cursor-default rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-900/60"
                        >
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900/60">
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {content.rateReferenceTitle}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {content.countries.map((country) => (
                        <div key={country.title}>
                            <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">
                                {country.title}
                            </h3>
                            <dl className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                {country.rates.map((rate) => (
                                    <div
                                        className="flex justify-between"
                                        key={rate.label}
                                    >
                                        <dt>{rate.label}</dt>
                                        <dd className="font-semibold">
                                            {rate.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {content.faqTitle}
                </h2>
                <dl className="space-y-6">
                    {content.faqItems.map((item) => (
                        <div key={item.question}>
                            <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {item.question}
                            </dt>
                            <dd className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                                {item.answer}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {content.relatedTitle}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {content.relatedTools.slice(0, 3).map((tool) => (
                        <RelatedToolCard key={tool.href} tool={tool} />
                    ))}
                </div>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/40">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {content.privacyTitle}
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-zinc-700 dark:text-zinc-300">
                    {content.privacyDescription}
                </p>
            </section>
            </main>
        </>
    );
}
