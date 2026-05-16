import Link from "next/link";
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

const toolOrder = [
    "vat",
    "json",
    "unitConverter",
    "percentage",
    "margin",
    "markup",
    "salary",
    "reverseDiscount",
    "jwt",
    "tokenEstimator",
    "aiCostCalculator",
    "base64",
    "timestamp",
    "urlEncoder",
    "uuid",
    "publicIp",
];

const tools = getToolsInOrder("en", [
    featuredToolKey,
    ...toolOrder.filter((toolKey) => toolKey !== featuredToolKey),
]);

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

            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-700 dark:bg-zinc-950/30">
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Available tools
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {tools.map((tool) => {
                        const isFeatured = tool.key === featuredToolKey;

                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className={`group min-h-32 rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                                    {
                                        true: "border-blue-300 bg-blue-50 hover:border-blue-400 dark:border-blue-500 dark:bg-zinc-800 dark:hover:border-blue-400",
                                        false: "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800",
                                    }[isFeatured]
                                }`}
                            >
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold text-zinc-900 transition group-hover:text-blue-700 dark:text-zinc-100 dark:group-hover:text-blue-300">
                                        {tool.title}
                                    </h3>
                                    {isFeatured && (
                                        <span className="mt-2 inline-flex rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                                            Popular
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
