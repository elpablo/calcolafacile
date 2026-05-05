

import Link from "next/link";

export const metadata = {
    title: "Free JSON Tools Online - Format, Validate, Decode and Estimate Tokens",
    description:
        "Free browser-based JSON tools for formatting, validating, minifying, decoding JWT payloads, encoding Base64 data, URL encoding and estimating LLM token usage.",
    alternates: {
        canonical: "https://calcolafacile.org/en/json-tools",
        languages: {
            en: "https://calcolafacile.org/en/json-tools",
            it: "https://calcolafacile.org/it",
        },
    },
};

const primaryTools = [
    {
        href: "/en/json-formatter",
        title: "JSON Formatter and Validator",
        description:
            "Format, validate and minify raw JSON directly in your browser. Useful for API responses, configuration files and debugging.",
    },
    {
        href: "/en/jwt-decoder",
        title: "JWT Decoder",
        description:
            "Decode JSON Web Tokens and inspect header, payload, claims, expiration time and signature without sending data to a server.",
    },
    {
        href: "/en/token-estimator",
        title: "LLM Token Estimator",
        description:
            "Estimate token usage and approximate cost for JSON payloads, prompts and AI workflows.",
    },
];

const relatedTools = [
    {
        href: "/en/base64-tool",
        title: "Base64 Encoder and Decoder",
        description:
            "Encode text to Base64 or decode Base64 strings used in API payloads and integrations.",
    },
    {
        href: "/en/url-encoder-decoder",
        title: "URL Encoder and Decoder",
        description:
            "Encode and decode JSON values passed through query strings, redirect URLs or callback URLs.",
    },
    {
        href: "/en/timestamp-converter",
        title: "Unix Timestamp Converter",
        description:
            "Convert timestamp fields such as exp, iat and nbf into readable dates.",
    },
];

const useCases = [
    {
        title: "Debug API responses",
        description:
            "Paste raw JSON from an API response, format it, validate it and inspect nested objects or arrays before using it in your code.",
    },
    {
        title: "Inspect authentication payloads",
        description:
            "Decode JWTs, read token claims and convert timestamp fields to understand expiration and authorization data.",
    },
    {
        title: "Prepare JSON for AI workflows",
        description:
            "Estimate how many tokens a JSON payload or structured prompt may use before sending it to an LLM.",
    },
    {
        title: "Inspect webhook payloads",
        description:
            "Format and validate JSON payloads received from webhooks to quickly understand their structure and content.",
    }
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

export default function JsonToolsPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <section className="mb-12 max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    JSON tools
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Free online JSON tools for developers working with APIs,
                    authentication tokens and AI workflows
                </h1>
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                    Format, validate, minify and inspect JSON directly in your
                    browser. Use these tools to debug API responses, decode JWT
                    payloads, encode or decode related data and estimate LLM
                    token usage for JSON-based prompts and workflows.
                </p>
            </section>

            <section className="mb-12">
                <div className="mb-5 max-w-3xl">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Essential JSON tools
                    </h2>
                    <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                        Start with these tools when working with JSON payloads,
                        API responses, authentication tokens or structured
                        content for AI models.
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
                        Related API and encoding tools
                    </h2>
                    <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">
                        JSON often travels through tokens, encoded strings, URLs
                        and timestamps. These related tools help you inspect the
                        full data flow.
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
                    Browser-based and privacy-friendly
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-zinc-700 dark:text-zinc-300">
                    These tools are designed for quick checks while developing,
                    debugging or testing. JSON formatting, JWT decoding, Base64
                    conversion and token estimation run locally in your browser,
                    so sensitive payloads are not sent to external servers.
                </p>
            </section>
        </main>
    );
}