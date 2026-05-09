import Link from "next/link";

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

const tools = [
    {
        href: "/en/vat-calculator",
        title: "VAT Calculator",
        description: "Add or remove VAT at 22%, 10% and 4%.",
    },
    {
        href: "/en/json-formatter",
        title: "JSON Formatter",
        description:
            "Format, validate, minify and copy JSON directly in your browser.",
    },
    {
        href: "/en/unit-converter",
        title: "Unit Converter",
        description:
            "Convert length, weight, temperature, volume, area, speed and pressure.",
    },
    {
        href: "/en/percentage-calculator",
        title: "Percentage Calculator",
        description:
            "Calculate percentages, discounts, increases and decreases.",
    },
    {
        href: "/en/margin-calculation",
        title: "Margin Calculator",
        description: "Calculate profit and margin from cost and selling price.",
    },
    {
        href: "/en/markup-calculation",
        title: "Markup Calculator",
        description: "Calculate percentage markup from product cost.",
    },
    {
        href: "/en/salary-calculator",
        title: "Net Salary Calculator",
        description: "Estimate monthly take-home pay from gross annual income.",
    },
    {
        href: "/en/inverse-discount-calculation",
        title: "Inverse Discount Calculator",
        description:
            "Find the original price from a discounted price and discount percentage.",
    },
    {
        href: "/en/jwt-decoder",
        title: "JWT Decoder",
        description:
            "Decode the header and payload of a JSON Web Token directly in your browser.",
    },
    {
        href: "/en/token-estimator",
        title: "LLM Token Estimator",
        description:
            "Estimate token usage and approximate cost for text used with AI models.",
    },
    {
        href: "/en/base64-tool",
        title: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64 directly in your browser.",
    },
    {
        href: "/en/timestamp-converter",
        title: "Unix Timestamp Converter",
        description: "Convert Unix timestamps to readable dates and back.",
    },
    {
        href: "/en/url-encoder-decoder",
        title: "URL Encoder/Decoder",
        description:
            "Encode and decode URLs for query strings, APIs and redirects.",
    },
    {
        href: "/en/uuid-generator",
        title: "UUID Generator",
        description:
            "Generate UUID v4 identifiers for APIs, databases, tests and software development.",
    },
];

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

            <section>
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Available tools
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {tools.map((tool) => {
                        const isFeatured = tool.href === "/en/json-formatter";

                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className={`min-h-32 rounded-xl border p-5 shadow-sm transition ${
                                    {
                                        true: "border-blue-300 bg-blue-50 dark:border-blue-500 dark:bg-zinc-800",
                                        false: "border-zinc-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800",
                                    }[isFeatured]
                                }`}
                            >
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
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

            <footer className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <Link href="/en/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Privacy Policy
                    </Link>
                    <Link href="/en/cookie-policy" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Cookie Policy
                    </Link>
                    <Link href="/en/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Terms of Service
                    </Link>
                </div>

                <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                    © {new Date().getFullYear()} NERALAB Srl · Fast and privacy-friendly online tools.
                </p>
            </footer>
        </main>
    );
}
