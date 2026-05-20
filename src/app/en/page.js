import Link from "next/link";
import CategoryCardGrid from "@/components/CategoryCardGrid";
import RecentToolsSection from "@/components/RecentToolsSection";
import SiteFooter from "@/components/SiteFooter";
import { getToolsInOrder } from "@/config/tools";

export const metadata = {
    title: "Free Online Calculators and Developer Tools",
    description:
        "Fast and free online tools for percentages, VAT, margins, markup, salary estimates, unit conversions and developer utilities such as JWT, JSON, Base64, timestamps, URL encoding, UUIDs and LLM tokens.",
    alternates: {
        canonical: "https://calcolafacile.org/en",
        languages: {
            it: "https://calcolafacile.org/it",
            en: "https://calcolafacile.org/en",
        },
    },
};

const featuredToolKey = "tokenEstimator";

const [featuredTool] = getToolsInOrder("en", [featuredToolKey]);

export default function Home() {
    return (
        <main className="mx-auto max-w-[1600px] px-6 py-12">
            <section className="mb-12 max-w-4xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    CalcolaFacile
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Free online calculators and developer tools
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    Practical tools for percentages, VAT, margins, markup,
                    salary estimates, unit conversions and developer workflows.
                    Use JWT, JSON, Base64, timestamp, URL encoding, UUID and LLM
                    token tools directly in your browser.
                </p>
            </section>

            <RecentToolsSection lang="en" limit={6} />

            {featuredTool && (
                <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/30">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                            Popular
                        </span>
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                            Featured tool
                        </p>
                    </div>

                    <Link
                        href={featuredTool.href}
                        className="group block rounded-xl border border-blue-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-blue-900/60 dark:bg-zinc-900 dark:hover:border-blue-500"
                    >
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300">
                            {featuredTool.title}
                        </h2>
                        <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-400">
                            {featuredTool.description}
                        </p>
                    </Link>
                </section>
            )}

            <CategoryCardGrid lang="en" />

            <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
                <h2 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Why use CalcolaFacile?
                </h2>
                <p className="max-w-4xl leading-7 text-zinc-600 dark:text-zinc-300">
                    CalcolaFacile collects small, fast online tools for everyday
                    calculations, business pricing and developer work. You can
                    calculate percentages, VAT, margins, discounts, salary
                    estimates and unit conversions, or use browser-based
                    utilities for JWT, JSON, Base64, timestamps, URL encoding,
                    UUID generation and LLM token estimation. Each page includes
                    simple explanations, practical examples and instant results
                    directly in the browser.
                </p>
            </section>

            <SiteFooter lang="en" />
        </main>
    );
}
