"use client";

import Link from "next/link";

const COPY = {
    it: {
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        terms: "Termini di utilizzo",
        tagline:
            "NERALAB Srl · Strumenti online veloci e privacy-friendly.",
        paths: {
            privacy: "/it/privacy",
            cookies: "/it/cookie-policy",
            terms: "/it/terms",
        },
    },
    en: {
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        terms: "Terms of Service",
        tagline:
            "NERALAB Srl · Fast and privacy-friendly online tools.",
        paths: {
            privacy: "/en/privacy",
            cookies: "/en/cookie-policy",
            terms: "/en/terms",
        },
    },
};

/**
 * Site footer rendered on every homepage. Resolves the year on the client
 * to avoid the stale-year-at-build-time bug that would otherwise show the
 * date the bundle was built rather than the current year.
 *
 * @param {{ lang: "it" | "en" }} props
 */
export default function SiteFooter({ lang = "it" }) {
    const copy = COPY[lang] ?? COPY.it;
    // Year resolves at render time. The component is dynamic (rendered
    // per-request server-side or on the client), so the value is always
    // current and doesn't carry the build timestamp.
    const year = new Date().getFullYear();

    return (
        <footer className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link
                    href={copy.paths.privacy}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {copy.privacy}
                </Link>
                <Link
                    href={copy.paths.cookies}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {copy.cookies}
                </Link>
                <Link
                    href={copy.paths.terms}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {copy.terms}
                </Link>
            </div>

            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                © {year} {copy.tagline}
            </p>
        </footer>
    );
}
