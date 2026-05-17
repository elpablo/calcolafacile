

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free Developer Tools for JSON, JWT, Base64, URL Encoding and UUIDs",
    description:
        "Free browser-based developer tools to format JSON, decode JWTs, encode Base64, convert URLs and generate UUIDs.",
    alternates: {
        canonical: "https://calcolafacile.org/en/developer-tools",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-sviluppatori",
            en: "https://calcolafacile.org/en/developer-tools",
        },
    },
};

export default function DeveloperToolsPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="developer"
            eyebrow="Developer Tools"
            title="Free developer tools for everyday web work"
            description={
                <p>
                    Format JSON, decode JWTs, encode and decode Base64, generate
                    UUIDs and prepare URL-safe strings directly in your browser.
                    These tools are designed for quick checks, debugging sessions
                    and daily web development workflows.
                </p>
            }
            toolsTitle="Available developer tools"
            seoTitle="Fast browser-based utilities for developers"
            seoText={
                <p>
                    Small developer utilities are most useful when they are fast,
                    private and easy to reach. CalcolaFacile keeps common web
                    development tasks in one place, so you can inspect data,
                    transform strings and generate identifiers without sending
                    unnecessary information to external services.
                </p>
            }
        />
    );
}