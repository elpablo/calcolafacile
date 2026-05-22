import RegexTester from "./RegexTester";

export const metadata = {
    title: "Test Regex - Prova Espressioni Regolari Online",
    description:
        "Regex tester gratuito online con match live, flags, gruppi e posizioni dettagliate usando il motore JavaScript RegExp.",
    alternates: {
        canonical: "https://calcolafacile.org/it/test-regex",
        languages: {
            it: "https://calcolafacile.org/it/test-regex",
            en: "https://calcolafacile.org/en/regex-tester",
        },
    },
    openGraph: {
        title: "Test Regex",
        description:
            "Testa espressioni regolari online con match live, flags e informazioni dettagliate sui risultati.",
        url: "https://calcolafacile.org/it/test-regex",
        siteName: "CalcolaFacile",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Test Regex",
        description:
            "Testa regex JavaScript con match live, gruppi e flags.",
    },
};

export default function Page() {
    return <RegexTester />;
}
