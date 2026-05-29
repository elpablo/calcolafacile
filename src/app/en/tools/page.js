import Link from "next/link";

export const metadata = {
    title: "Free Online Tools - Developer Tools and Calculators",
    description:
        "Browse free online developer tools, AI utilities and calculators for JSON, JWT, Base64, timestamps, token estimation, AI cost comparison, percentages, VAT, margins, salary estimates and unit conversions.",
    alternates: {
        canonical: "https://calcolafacile.org/en/tools",
        languages: {
            en: "https://calcolafacile.org/en/tools",
        },
    },
};

const toolGroups = [
    {
        title: "Developer tools",
        description:
            "Fast browser-based utilities for API debugging, encoded data, JSON payloads, authentication tokens and AI workflows.",
        tools: [
            {
                href: "/en/json-formatter",
                title: "JSON Formatter and Validator",
                description:
                    "Format, validate and minify JSON directly in your browser. Useful for API responses, payloads and config files.",
            },
            {
                href: "/en/jwt-decoder",
                title: "JWT Decoder",
                description:
                    "Decode JSON Web Tokens and inspect header, payload, claims, expiration time and signature.",
            },
            {
                href: "/en/base64-tool",
                title: "Base64 Encoder and Decoder",
                description:
                    "Encode text to Base64 or decode Base64 strings for API payloads, tokens and debugging.",
            },
            {
                href: "/en/timestamp-converter",
                title: "Unix Timestamp Converter",
                description:
                    "Convert Unix timestamps and epoch time to readable dates, or convert dates back to timestamps.",
            },
            {
                href: "/en/url-encoder-decoder",
                title: "URL Encoder and Decoder",
                description:
                    "Encode and decode URLs for query strings, redirects, callback URLs and API parameters.",
            },
            {
                href: "/en/uuid-generator",
                title: "UUID Generator",
                description:
                    "Generate UUID v4 identifiers for APIs, databases, test fixtures and software development.",
            },
        ],
    },
    {
        title: "AI tools",
        description:
            "Practical utilities for estimating token usage, comparing AI model costs and planning LLM-powered workflows.",
        tools: [
            {
                href: "/en/ai-cost-calculator",
                title: "AI Cost Calculator",
                description:
                    "Estimate input, output, request, daily and monthly costs across popular AI models from OpenAI, Anthropic, Google, xAI, DeepSeek and Mistral.",
            },
            {
                href: "/en/token-estimator",
                title: "LLM Token Estimator",
                description:
                    "Estimate token usage and approximate cost for prompts, JSON payloads and AI workflows directly in your browser.",
            },
        ],
    },
    {
        title: "Business calculators",
        description:
            "Simple calculators for prices, discounts, profit, margins, markup and salary estimates.",
        tools: [
            {
                href: "/en/percentage-calculator",
                title: "Percentage Calculator",
                description:
                    "Calculate percentages, discounts, increases, reductions and percentage ratios instantly.",
            },
            {
                href: "/en/vat-calculator",
                title: "VAT Calculator",
                description:
                    "Add or remove VAT at 22%, 10% or 4% and get net, VAT and gross amounts.",
            },
            {
                href: "/en/margin-calculation",
                title: "Margin Calculator",
                description:
                    "Calculate profit margin from cost and selling price or find a price from a target margin.",
            },
            {
                href: "/en/markup-calculation",
                title: "Markup Calculator",
                description:
                    "Calculate markup from cost and selling price or find a selling price from a target markup.",
            },
            {
                href: "/en/inverse-discount-calculation",
                title: "Inverse Discount Calculator",
                description:
                    "Find the original price from a discounted price and discount percentage.",
            },
            {
                href: "/en/salary-calculator",
                title: "Net Salary Calculator",
                description:
                    "Estimate monthly take-home pay and annual net salary from gross annual income.",
            },
        ],
    },
    {
        title: "Unit conversions",
        description:
            "Quick conversions for common units used in everyday calculations, technical work and international references.",
        tools: [
            {
                href: "/en/unit-converter",
                title: "Unit Converter",
                description:
                    "Convert length, weight, temperature, volume, area, speed and pressure from one unit to another.",
            },
        ],
    },
];

export default function ToolsPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <section className="mb-12 max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    Online tools
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Free online developer tools and calculators
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    A curated collection of fast browser-based tools for developers,
                    makers and everyday calculations. Format JSON, decode JWTs,
                    convert Unix timestamps, encode Base64, generate UUIDs, estimate
                    LLM tokens, compare AI model costs, calculate percentages, VAT,
                    margins, markup and more.
                </p>
            </section>

            <div className="space-y-12">
                {toolGroups.map((group) => (
                    <section key={group.title}>
                        <div className="mb-5 max-w-3xl">
                            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                                {group.title}
                            </h2>
                            <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                                {group.description}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {group.tools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                                >
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {tool.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                        {tool.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <section className="mt-14 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/40">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Browser-based and privacy-friendly
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-zinc-700 dark:text-zinc-300">
                    Most tools run directly in your browser, which makes them fast and
                    practical for quick checks, debugging sessions and everyday calculations.
                    Tools that handle sensitive text, such as JWT, JSON, Base64, token
                    estimation and AI cost planning, are designed to work without sending your input to external servers.
                </p>
            </section>
        </main>
    );
}