import RegexTester from "./RegexTester";

export const metadata = {
    title: "Regex Tester - Test Regular Expressions Online",
    description:
        "Free online regex tester with live matches, flags, groups and detailed match positions using the JavaScript RegExp engine.",
    alternates: {
        canonical: "https://calcolafacile.org/en/regex-tester",
        languages: {
            en: "https://calcolafacile.org/en/regex-tester",
            it: "https://calcolafacile.org/it/test-regex",
        },
    },
    openGraph: {
        title: "Regex Tester",
        description:
            "Test regular expressions online with live matches, flags and detailed match information.",
        url: "https://calcolafacile.org/en/regex-tester",
        siteName: "CalcolaFacile",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Regex Tester",
        description:
            "Test JavaScript regular expressions with live matches and groups.",
    },
};

export default function Page() {
    return <RegexTester />;
}
