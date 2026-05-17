/**
 * @file Central registry of every standalone tool on the site.
 *
 * Single source of truth consumed by:
 *   - `src/app/{it,en}/page.js` — the homepage tools grid.
 *   - `src/components/ToolLayout.js` — the "Related tools" grid at the
 *     bottom of every tool page.
 *   - `src/app/sitemap.js` — the static route list per locale.
 *
 * Each entry declares the tool's stable `key`, its localised slug, title
 * and short description, plus `hasIt`/`hasEn` flags so a tool can be added
 * to one locale before the other without ghost links being rendered.
 *
 * Hub pages (`/en/tools`, `/en/json-tools`, `/en/encoding-tools`) and unit
 * conversion landing pages are NOT in this list — they're handled
 * separately because their structure differs.
 */

/**
 * @typedef {Object} Tool
 * @property {string} key                            Stable identifier.
 * @property {{ it?: string, en?: string }} slug     URL slug per locale.
 * @property {{ it?: string, en?: string }} title
 * @property {{ it?: string, en?: string }} description
 * @property {Array<"business" | "conversion" | "ai" | "developer" | "dateTime" | "network">} categories
 * @property {boolean} hasIt
 * @property {boolean} hasEn
 */

/** @type {Tool[]} */
export const tools = [
    {
        key: "vat",
        slug: { it: "calcolatore-iva", en: "vat-calculator" },
        title: { it: "Calcolatore IVA", en: "VAT Calculator" },
        description: {
            it: "Aggiungi o scorpora IVA al 22%, 10% e 4%.",
            en: "Add or remove VAT at 22%, 10% and 4%.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "unitConverter",
        slug: { it: "convertitore-unita", en: "unit-converter" },
        title: { it: "Convertitore unità di misura", en: "Unit Converter" },
        description: {
            it: "cm → pollici, kg → lb, °C → °F, volume, area, velocità e pressione.",
            en: "Convert length, weight, temperature, volume, area, speed and pressure.",
        },
        categories: ["conversion"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "percentage",
        slug: { it: "calcolo-percentuale", en: "percentage-calculator" },
        title: { it: "Calcolo percentuale", en: "Percentage Calculator" },
        description: {
            it: "Calcola percentuali, sconti, aumenti e riduzioni.",
            en: "Calculate percentages, discounts, increases and decreases.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "margin",
        slug: { it: "calcolo-margine", en: "margin-calculation" },
        title: { it: "Calcolo margine", en: "Margin Calculator" },
        description: {
            it: "Calcola margine e profitto dal prezzo di vendita.",
            en: "Calculate profit and margin from cost and selling price.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "markup",
        slug: { it: "calcolo-markup", en: "markup-calculation" },
        title: { it: "Calcolo markup", en: "Markup Calculator" },
        description: {
            it: "Calcola il ricarico percentuale rispetto al costo.",
            en: "Calculate percentage markup from product cost.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "salary",
        slug: { it: "calcolo-stipendio-netto", en: "salary-calculator" },
        title: { it: "Calcolo stipendio netto", en: "Net Salary Calculator" },
        description: {
            it: "Stima lo stipendio netto partendo dalla RAL lorda.",
            en: "Estimate monthly take-home pay from gross annual income.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "reverseDiscount",
        slug: {
            it: "calcolo-sconto-inverso",
            en: "inverse-discount-calculation",
        },
        title: {
            it: "Calcolo sconto inverso",
            en: "Inverse Discount Calculator",
        },
        description: {
            it: "Trova il prezzo originale partendo da prezzo scontato e sconto.",
            en: "Find the original price from a discounted price and discount percentage.",
        },
        categories: ["business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "jwt",
        slug: { it: "jwt-decoder", en: "jwt-decoder" },
        title: { it: "JWT Decoder", en: "JWT Decoder" },
        description: {
            it: "Decodifica header e payload di un JSON Web Token direttamente nel browser.",
            en: "Decode the header and payload of a JSON Web Token directly in your browser.",
        },
        categories: ["developer", "network"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "tokenEstimator",
        slug: { it: "token-estimator", en: "token-estimator" },
        title: { it: "Stima token LLM", en: "LLM Token Estimator" },
        description: {
            it: "Stima token e costo indicativo per testi usati con modelli AI.",
            en: "Estimate token usage and approximate cost for text used with AI models.",
        },
        categories: ["ai", "developer"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "aiCostCalculator",
        slug: { it: "calcolatore-costi-ai", en: "ai-cost-calculator" },
        title: { it: "Calcolatore costi AI", en: "AI Cost Calculator" },
        description: {
            it: "Stima i costi API dei modelli AI in base a token e richieste giornaliere.",
            en: "Estimate AI model API costs from tokens and daily request volume.",
        },
        categories: ["ai", "business"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "json",
        slug: { it: "json-formatter", en: "json-formatter" },
        title: { it: "JSON Formatter", en: "JSON Formatter" },
        description: {
            it: "Formatta, valida e copia JSON direttamente nel browser.",
            en: "Format, validate, minify and copy JSON directly in your browser.",
        },
        categories: ["developer"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "base64",
        slug: { it: "base64-tool", en: "base64-tool" },
        title: { it: "Base64 Encode/Decode", en: "Base64 Encoder/Decoder" },
        description: {
            it: "Codifica e decodifica Base64 direttamente nel browser.",
            en: "Encode and decode Base64 directly in your browser.",
        },
        categories: ["developer", "network"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "timestamp",
        slug: { it: "timestamp-converter", en: "timestamp-converter" },
        title: { it: "Timestamp Converter", en: "Unix Timestamp Converter" },
        description: {
            it: "Converti Unix timestamp in date leggibili e viceversa.",
            en: "Convert Unix timestamps to readable dates and back.",
        },
        categories: ["dateTime", "developer"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "iso8601Validator",
        slug: { it: "validatore-iso8601", en: "iso8601-validator" },
        title: { it: "Validatore ISO8601", en: "ISO8601 Validator" },
        description: {
            it: "Valida date e date/ora ISO8601, controlla offset di fuso e converti in UTC e timestamp Unix.",
            en: "Validate ISO8601 dates and datetimes, inspect timezone offsets and convert to UTC and Unix timestamps.",
        },
        categories: ["dateTime", "developer"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "urlEncoder",
        slug: { it: "url-encoder-decoder", en: "url-encoder-decoder" },
        title: { it: "URL Encoder/Decoder", en: "URL Encoder/Decoder" },
        description: {
            it: "Codifica e decodifica URL per query string, API e redirect.",
            en: "Encode and decode URLs for query strings, APIs and redirects.",
        },
        categories: ["developer", "network"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "uuid",
        slug: { it: "uuid-generator", en: "uuid-generator" },
        title: { it: "UUID Generator", en: "UUID Generator" },
        description: {
            it: "Genera UUID v4 per API, database, test e sviluppo software.",
            en: "Generate UUID v4 identifiers for APIs, databases, tests and software development.",
        },
        categories: ["developer"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "publicIp",
        slug: { it: "verifica-ip-pubblico", en: "public-ip-checker" },
        title: { it: "Verifica IP pubblico", en: "Public IP Checker" },
        description: {
            it: "Controlla IP pubblico, geolocalizzazione approssimativa e informazioni VPN.",
            en: "Check your public IP, approximate geolocation and VPN information.",
        },
        categories: ["network"],
        hasIt: true,
        hasEn: true,
    },
];

/** Map for quick `key -> tool` lookups. */
export const toolsByKey = Object.fromEntries(tools.map((t) => [t.key, t]));

/**
 * Localise a tool entry to a single language for display.
 *
 * @param {Tool} tool
 * @param {"it" | "en"} lang
 * @returns {{ key: string, href: string, title: string, description: string }}
 */
export function localizeTool(tool, lang) {
    const slug = tool.slug?.[lang] ?? tool.slug?.it ?? tool.slug?.en;
    return {
        key: tool.key,
        href: `/${lang}/${slug}`,
        title: tool.title?.[lang] ?? tool.title?.it ?? tool.title?.en,
        description:
            tool.description?.[lang] ??
            tool.description?.it ??
            tool.description?.en,
    };
}

/**
 * Return the tools available for a given locale, in the order given by
 * `orderedKeys`. Unknown keys are skipped silently.
 *
 * @param {"it" | "en"} lang
 * @param {string[]} orderedKeys
 */
export function getToolsInOrder(lang, orderedKeys) {
    return orderedKeys
        .map((key) => toolsByKey[key])
        .filter((tool) => tool && (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => localizeTool(tool, lang));
}

/**
 * Return the tools available for a given locale and category.
 *
 * @param {"it" | "en"} lang
 * @param {Tool["categories"][number]} category
 */
export function getToolsByCategory(lang, category) {
    return tools
        .filter((tool) => tool.categories.includes(category))
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => localizeTool(tool, lang));
}

/**
 * Return the number of tools available for a given locale and category.
 *
 * @param {"it" | "en"} lang
 * @param {Tool["categories"][number]} category
 */
export function countToolsByCategory(lang, category) {
    return getToolsByCategory(lang, category).length;
}

/** Slugs for every tool in a given locale (used by the sitemap). */
export function getToolPaths(lang) {
    return tools
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => `/${lang}/${tool.slug[lang]}`);
}
