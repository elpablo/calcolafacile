export const regexPatternLibrary = [
    {
        key: "email",
        category: "common",
        title: {
            en: "Email address",
            it: "Indirizzo email",
        },
        description: {
            en: "Matches common email-like addresses.",
            it: "Riconosce indirizzi email comuni.",
        },
        pattern: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
        flags: "gi",
        testText: {
            en: "Contact us at info@example.com or support@calcolafacile.org.",
            it: "Contattaci su info@example.com oppure support@calcolafacile.org.",
        },
    },
    {
        key: "url",
        category: "common",
        title: {
            en: "URL",
            it: "URL",
        },
        description: {
            en: "Matches HTTP and HTTPS URLs.",
            it: "Riconosce URL HTTP e HTTPS.",
        },
        pattern: "https?:\\/\\/[^\\s]+",
        flags: "gi",
        testText: {
            en: "Visit https://calcolafacile.org or https://example.com/docs?ref=regex.",
            it: "Visita https://calcolafacile.org oppure https://example.com/docs?ref=regex.",
        },
    },
    {
        key: "uuid-v4",
        category: "developer",
        title: {
            en: "UUID v4",
            it: "UUID v4",
        },
        description: {
            en: "Matches standard UUID v4 identifiers.",
            it: "Riconosce identificativi UUID v4 standard.",
        },
        pattern:
            "\\b[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\\b",
        flags: "gi",
        testText: {
            en: "Request id: 550e8400-e29b-41d4-a716-446655440000",
            it: "ID richiesta: 550e8400-e29b-41d4-a716-446655440000",
        },
    },
    {
        key: "ipv4",
        category: "network",
        title: {
            en: "IPv4 address",
            it: "Indirizzo IPv4",
        },
        description: {
            en: "Matches IPv4-like addresses in logs or text.",
            it: "Riconosce indirizzi simili a IPv4 in log o testo.",
        },
        pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
        flags: "g",
        testText: {
            en: "Server 192.168.1.10 forwarded traffic from 10.0.0.25.",
            it: "Il server 192.168.1.10 ha inoltrato traffico da 10.0.0.25.",
        },
    },
    {
        key: "word-groups",
        category: "common",
        title: {
            en: "Word groups",
            it: "Gruppi di parole",
        },
        description: {
            en: "Extract sequences of two or more words separated by spaces.",
            it: "Estrae sequenze di due o più parole separate da spazi.",
        },
        pattern: "\\b(?:[A-Za-zÀ-ÿ]+\\s+){1,}[A-Za-zÀ-ÿ]+\\b",
        flags: "g",
        testText: {
            en: "Machine learning, regular expression engine, full stack developer.",
            it: "Machine learning, espressione regolare, sviluppatore full stack.",
        },
    },
    {
        key: "named-groups",
        category: "developer",
        title: {
            en: "Named groups",
            it: "Named groups",
        },
        description: {
            en: "Extract structured values using named capture groups.",
            it: "Estrae valori strutturati usando gruppi nominati.",
        },
        pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
        flags: "g",
        testText: {
            en: "Release dates: 2026-05-22 and 2026-06-15.",
            it: "Date rilascio: 2026-05-22 e 2026-06-15.",
        },
    },
    {
        key: "iso-date",
        category: "date",
        title: {
            en: "ISO date",
            it: "Data ISO",
        },
        description: {
            en: "Matches dates in YYYY-MM-DD format.",
            it: "Riconosce date nel formato YYYY-MM-DD.",
        },
        pattern: "\\b\\d{4}-\\d{2}-\\d{2}\\b",
        flags: "g",
        testText: {
            en: "Release dates: 2026-05-22 and 2026-06-15.",
            it: "Date di rilascio: 2026-05-22 e 2026-06-15.",
        },
    },
    {
        key: "hex-color",
        category: "web",
        title: {
            en: "Hex color",
            it: "Colore HEX",
        },
        description: {
            en: "Matches 3 or 6 digit CSS hex colors.",
            it: "Riconosce colori HEX CSS a 3 o 6 cifre.",
        },
        pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
        flags: "g",
        testText: {
            en: "Primary #2563eb, accent #f97316, short #fff.",
            it: "Primario #2563eb, accento #f97316, breve #fff.",
        },
    },
    {
        key: "slug",
        category: "web",
        title: {
            en: "URL slug",
            it: "Slug URL",
        },
        description: {
            en: "Matches lowercase URL slugs made of letters, numbers and hyphens.",
            it: "Riconosce slug URL minuscoli con lettere, numeri e trattini.",
        },
        pattern: "\\b[a-z0-9]+(?:-[a-z0-9]+)*\\b",
        flags: "g",
        testText: {
            en: "Valid slugs: regex-tester, crypto-profit-calculator, roi-calculator.",
            it: "Slug validi: test-regex, calcolatore-profitto-crypto, calcolatore-roi.",
        },
    },
    {
        key: "html-tag",
        category: "web",
        title: {
            en: "HTML tag",
            it: "Tag HTML",
        },
        description: {
            en: "Matches simple opening or closing HTML tags.",
            it: "Riconosce semplici tag HTML di apertura o chiusura.",
        },
        pattern: "<\\/?[a-z][a-z0-9-]*(?:\\s[^>]*)?>",
        flags: "gi",
        testText: {
            en: "Example: <section><h1>Hello</h1><p class=\"lead\">Text</p></section>",
            it: "Esempio: <section><h1>Ciao</h1><p class=\"lead\">Testo</p></section>",
        },
    },
    {
        key: "strong-password-basic",
        category: "security",
        title: {
            en: "Strong password basic",
            it: "Password robusta base",
        },
        description: {
            en: "Checks for at least 8 chars, one lowercase, one uppercase and one digit.",
            it: "Verifica almeno 8 caratteri, una minuscola, una maiuscola e una cifra.",
        },
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
        flags: "g",
        testText: {
            en: "Password123\nweak\nAnotherGood9",
            it: "Password123\ndebole\nAltraBuona9",
        },
    },
];

export function getRegexPatternLibrary(lang = "en") {
    return regexPatternLibrary.map((item) => ({
        key: item.key,
        category: item.category,
        title: item.title?.[lang] ?? item.title.en,
        description: item.description?.[lang] ?? item.description.en,
        pattern: item.pattern,
        flags: item.flags,
        testText: item.testText?.[lang] ?? item.testText.en,
    }));
}