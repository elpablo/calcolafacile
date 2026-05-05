import Link from "next/link";

export const metadata = {
    title: "Free Encoding Tools Online - Base64, URL Encoder and JWT Decoder",
    description:
        "Free browser-based encoding tools for Base64 encoding and decoding, URL encoding, JWT decoding, JSON formatting and timestamp conversion.",
    alternates: {
        canonical: "https://calcolafacile.org/en/encoding-tools",
        languages: {
            en: "https://calcolafacile.org/en/encoding-tools",
            it: "https://calcolafacile.org/it",
        },
    },
};

const primaryTools = [
    {
        href: "/en/base64-tool",
        title: "Base64 Encoder and Decoder",
        description:
            "Encode text to Base64 or decode Base64 strings directly in your browser. Useful for API payloads, credentials, tokens and debugging.",
    },
    {
        href: "/en/url-encoder-decoder",
        title: "URL Encoder and Decoder",
        description:
            "Encode and decode URLs for query strings, redirects, callback URLs, OAuth flows and API parameters.",
    },
    {
        href: "/en/jwt-decoder",
        title: "JWT Decoder",
        description:
            "Decode JSON Web Tokens and inspect header, payload, claims, expiration time and signature.",
    },
];

const relatedTools = [
    {
        href: "/en/json-formatter",
        title: "JSON Formatter and Validator",
        description:
            "Format and validate decoded JSON payloads, API responses and structured data.",
    },
    {
        href: "/en/timestamp-converter",
        title: "Unix Timestamp Converter",
        description:
            "Convert timestamp fields such as exp, iat and nbf into readable dates.",
    },
    {
        href: "/en/token-estimator",
        title: "LLM Token Estimator",
        description:
            "Estimate token usage and approximate cost for decoded text, JSON payloads and AI prompts.",
    },
];

const useCases = [
    {
        title: "Decode API payloads",
        description:
            "Use Base64 decoding and JSON formatting together to inspect encoded API responses, webhook data or integration payloads.",
    },
    {
        title: "Debug OAuth and redirect URLs",
        description:
            "Decode URL parameters, callback URLs and redirect values when working with authentication flows or API integrations.",
    },
    {
        title: "Inspect token-based data",
        description:
            "Decode JWTs, inspect claims and convert timestamp fields to understand token validity and authorization context.",
    },
];

function ToolCard({ tool }) {
    return (
        <Link
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
    );
}

export default function EncodingToolsPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <section className="mb-12 max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    Encoding tools
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Free online encoding and decoding tools
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    Encode and decode data directly in your browser. Use these tools
                    for Base64 strings, URL parameters, JWT tokens, JSON payloads,
                    timestamps and API debugging workflows.
                </p>
            </section>

            <section className="mb-12">
                <div className="mb-5 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Essential encoding tools
                    </h2>
                    <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                        Start here when you need to encode, decode or inspect data used
                        in APIs, authentication flows, integrations and web applications.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {primaryTools.map((tool) => (
                        <ToolCard key={tool.href} tool={tool} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <div className="mb-5 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Related developer tools
                    </h2>
                    <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                        Encoded data often contains JSON, timestamps or text that later
                        needs formatting, inspection or token estimation.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedTools.map((tool) => (
                        <ToolCard key={tool.href} tool={tool} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Common use cases
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {useCases.map((item) => (
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

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/40">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Local encoding, safer debugging
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-zinc-700 dark:text-zinc-300">
                    Encoding tools are often used with sensitive strings, tokens and payloads.
                    These tools are designed to run in your browser, making them practical for
                    fast debugging without sending your input to external servers.
                </p>
            </section>
        </main>
    );
}