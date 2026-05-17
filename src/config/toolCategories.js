/**
 * @typedef {Object} ToolCategory
 * @property {"ai" | "developer" | "conversion" | "business" | "network" | "dateTime"} key
 * @property {{ it: string, en: string }} title
 * @property {{ it: string, en: string }} description
 * @property {{ it: string, en: string }} slug
 * @property {string} icon
 */

/**
 * Central registry for homepage and SEO category pages.
 *
 * The key must match the `category` field used in `tools.js`.
 *
 * @type {ToolCategory[]}
 */
export const toolCategories = [
    {
        key: "ai",
        title: {
            it: "Strumenti AI",
            en: "AI Tools",
        },
        description: {
            it: "Token estimator, AI cost calculator e utility per modelli LLM.",
            en: "Token estimators, AI cost calculators and utilities for LLM workflows.",
        },
        slug: {
            it: "strumenti-ai",
            en: "ai-tools",
        },
        icon: "🤖",
    },
    {
        key: "developer",
        title: {
            it: "Strumenti Sviluppatori",
            en: "Developer Tools",
        },
        description: {
            it: "JSON formatter, JWT decoder, Base64, UUID e utility web.",
            en: "JSON formatter, JWT decoder, Base64, UUID and web development utilities.",
        },
        slug: {
            it: "strumenti-sviluppatori",
            en: "developer-tools",
        },
        icon: "💻",
    },
    {
        key: "conversion",
        title: {
            it: "Conversioni",
            en: "Unit Conversions",
        },
        description: {
            it: "Convertitori di unità, peso, lunghezza, temperatura e volume.",
            en: "Convert units, weight, length, temperature and volume.",
        },
        slug: {
            it: "conversioni-unita",
            en: "unit-conversion",
        },
        icon: "📏",
    },
    {
        key: "business",
        title: {
            it: "Business e Finanza",
            en: "Business & Finance",
        },
        description: {
            it: "IVA, margini, markup, stipendi e calcolatori business.",
            en: "VAT, margins, markup, salaries and business calculators.",
        },
        slug: {
            it: "calcolatori-business",
            en: "business-calculators",
        },
        icon: "📈",
    },
    {
        key: "network",
        title: {
            it: "Rete e Sicurezza",
            en: "Network & Security",
        },
        description: {
            it: "IP pubblico, VPN e strumenti per rete e sicurezza.",
            en: "Public IP, VPN and network/security utilities.",
        },
        slug: {
            it: "rete-e-sicurezza",
            en: "network-security",
        },
        icon: "🌐",
    },
    {
        key: "dateTime",
        title: {
            it: "Data e Ora",
            en: "Date & Time",
        },
        description: {
            it: "Timestamp Unix, conversioni temporali e strumenti data/ora.",
            en: "Unix timestamps, time conversions and date/time utilities.",
        },
        slug: {
            it: "data-e-ora",
            en: "date-time-tools",
        },
        icon: "⏱️",
    },
];

/**
 * Return a localized category.
 *
 * @param {ToolCategory} category
 * @param {"it" | "en"} lang
 */
export function localizeCategory(category, lang) {
    return {
        key: category.key,
        title: category.title[lang],
        description: category.description[lang],
        slug: category.slug[lang],
        icon: category.icon,
    };
}

/**
 * Return all categories localized for a given language.
 *
 * @param {"it" | "en"} lang
 */
export function getLocalizedCategories(lang) {
    return toolCategories.map((category) => localizeCategory(category, lang));
}