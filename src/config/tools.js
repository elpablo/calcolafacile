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
 * @property {{
 *   it?: { featured?: boolean, priority?: number, badge?: string },
 *   en?: { featured?: boolean, priority?: number, badge?: string },
 * }} [homepage]
 * @property {string} [releasedAt]                ISO release date for "new" tools.
 * @property {string[]} [tags]                    Semantic tags for related tools.
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
        homepage: {
            it: {
                featured: true,
                priority: 92,
                badge: "TRENDING",
            },
            en: {
                featured: true,
                priority: 110,
                badge: "TRENDING",
            },
        },
        releasedAt: "2026-05-24",
        tags: ["finance", "tax", "vat", "percentage", "business"],
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
        tags: ["conversion", "units", "measurement"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "angleConverter",
        slug: { it: "convertitore-angoli", en: "angle-converter" },
        title: { it: "Convertitore angoli", en: "Angle Converter" },
        description: {
            it: "Converti gradi, radianti, gradianti e giri con anteprima visuale dell'angolo.",
            en: "Convert degrees, radians, gradians and turns with a visual angle preview.",
        },
        categories: ["conversion"],
        homepage: {
            it: {
                featured: true,
                priority: 82,
                badge: "NUOVO",
            },
            en: {
                featured: true,
                priority: 82,
                badge: "NEW",
            },
        },
        releasedAt: "2026-05-24",
        tags: ["conversion", "math", "angle", "degrees", "radians", "visual"],
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
        tags: ["math", "percentage", "business", "discount"],
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
        tags: ["business", "pricing", "margin", "profit"],
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
        tags: ["business", "pricing", "markup", "profit"],
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
        tags: ["finance", "salary", "income", "tax"],
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
        tags: ["math", "percentage", "discount", "pricing"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "compoundInterest",
        slug: { it: "interesse-composto", en: "compound-interest" },
        title: {
            it: "Interesse composto",
            en: "Compound Interest Calculator",
        },
        description: {
            it: "Simula la crescita di un investimento con rendimento medio annuo e versamenti mensili.",
            en: "Simulate investment growth with average annual return and monthly contributions.",
        },
        categories: ["business"],
        homepage: {
            it: {
                featured: true,
                priority: 95,
                badge: "CONSIGLIATO",
            },
            en: {
                featured: true,
                priority: 95,
                badge: "FEATURED",
            },
        },
        releasedAt: "2026-05-22",
        tags: ["finance", "investment", "compound-interest"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "cryptoProfitCalculator",
        slug: {
            it: "calcolatore-profitto-crypto",
            en: "crypto-profit-calculator",
        },
        title: {
            it: "Calcolatore profitto crypto",
            en: "Crypto Profit Calculator",
        },
        description: {
            it: "Calcola profitto, perdita e ROI di Bitcoin, Ethereum e altre crypto.",
            en: "Calculate crypto gains, losses and ROI for Bitcoin, Ethereum and other crypto assets.",
        },
        categories: ["business"],
        homepage: {
            it: {
                featured: true,
                priority: 80,
                badge: "NUOVO",
            },
            en: {
                featured: true,
                priority: 80,
                badge: "NEW",
            },
        },
        releasedAt: "2026-05-22",
        tags: ["finance", "crypto", "investment"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "roiCalculator",
        slug: {
            it: "calcolatore-roi",
            en: "roi-calculator",
        },
        title: {
            it: "Calcolatore ROI",
            en: "ROI Calculator",
        },
        description: {
            it: "Calcola ritorno sull’investimento, profitto netto e ROI annualizzato.",
            en: "Calculate return on investment, net profit and annualized ROI.",
        },
        categories: ["business"],
        homepage: {
            it: {
                featured: true,
                priority: 85,
                badge: "NUOVO",
            },
            en: {
                featured: true,
                priority: 85,
                badge: "NEW",
            },
        },
        releasedAt: "2026-05-22",
        tags: ["finance", "business", "marketing", "investment"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "regexTester",
        slug: {
            it: "test-regex",
            en: "regex-tester",
        },
        title: {
            it: "Test Regex",
            en: "Regex Tester",
        },
        description: {
            it: "Testa espressioni regolari con match live, flags, gruppi e posizioni dettagliate.",
            en: "Test regular expressions with live matches, flags, groups and detailed positions.",
        },
        categories: ["developer"],
        homepage: {
            it: {
                featured: true,
                priority: 75,
                badge: "DEV",
            },
            en: {
                featured: true,
                priority: 75,
                badge: "DEV",
            },
        },
        releasedAt: "2026-05-22",
        tags: ["developer", "regex", "validation", "testing"],
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
        tags: ["developer", "security", "jwt", "api", "network"],
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
        tags: ["ai", "llm", "tokens", "developer", "cost"],
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
        homepage: {
            it: {
                featured: true,
                priority: 88,
                badge: "AI",
            },
            en: {
                featured: true,
                priority: 105,
                badge: "AI",
            },
        },
        releasedAt: "2026-05-24",
        tags: ["ai", "llm", "tokens", "cost", "business"],
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
        tags: ["developer", "json", "formatting", "validation"],
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
        tags: ["developer", "encoding", "base64", "network"],
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
        tags: ["developer", "date-time", "timestamp", "unix"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "timeZoneConverter",
        slug: {
            it: "convertitore-fusi-orari",
            en: "time-zone-converter",
        },
        title: {
            it: "Convertitore fusi orari",
            en: "Time Zone Converter",
        },
        description: {
            it: "Converti data e ora tra fusi orari con timeline visuale e offset UTC.",
            en: "Convert dates and times across time zones with a visual timeline and UTC offsets.",
        },
        categories: ["dateTime", "conversion"],
        homepage: {
            it: {
                featured: true,
                priority: 84,
                badge: "NUOVO",
            },
            en: {
                featured: true,
                priority: 84,
                badge: "NEW",
            },
        },
        releasedAt: "2026-05-24",
        tags: ["date-time", "timezone", "utc", "conversion", "developer"],
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
        tags: ["developer", "date-time", "iso8601", "validation"],
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
        tags: ["developer", "encoding", "url", "network", "api"],
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
        tags: ["developer", "uuid", "identifier", "testing"],
        hasIt: true,
        hasEn: true,
    },
    {
        key: "mortgageCalculator",
        slug: {
            it: "calcolatore-mutuo",
            en: "mortgage-calculator",
        },
        title: {
            it: "Calcolatore Mutuo",
            en: "Mortgage Calculator",
        },
        description: {
            it: "Calcola rata mensile, interessi totali e piano di ammortamento del mutuo.",
            en: "Calculate mortgage monthly payments, total interest and yearly amortization schedule.",
        },
        categories: ["business"],
        homepage: {
            it: {
                featured: true,
                priority: 100,
                badge: "CONSIGLIATO",
            },
            en: {
                featured: true,
                priority: 90,
                badge: "FEATURED",
            },
        },
        releasedAt: "2026-05-22",
        tags: ["finance", "mortgage", "loan", "investment"],
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
        tags: ["network", "ip", "vpn", "privacy"],
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

/**
 * Return featured tools ordered by descending priority.
 *
 * @param {"it" | "en"} lang
 * @param {number} [limit]
 */
export function getFeaturedTools(lang, limit) {
    const featuredTools = tools
        .filter((tool) => tool.homepage?.[lang]?.featured)
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => ({
            ...localizeTool(tool, lang),
            badge: tool.homepage?.[lang]?.badge,
        }));

    if (typeof limit !== "number") {
        return featuredTools;
    }

    const selectedTools = [];
    const bestToolByBadge = new Map();

    for (const tool of featuredTools) {
        const badgeKey = tool.badge ?? "";
        const currentBest = bestToolByBadge.get(badgeKey);

        if (!currentBest) {
            bestToolByBadge.set(badgeKey, tool);
            continue;
        }

        const toolReleaseDate = new Date(toolsByKey[tool.key]?.releasedAt ?? 0);
        const currentReleaseDate = new Date(
            toolsByKey[currentBest.key]?.releasedAt ?? 0,
        );
        const toolPriority = toolsByKey[tool.key]?.homepage?.[lang]?.priority ?? 0;
        const currentPriority =
            toolsByKey[currentBest.key]?.homepage?.[lang]?.priority ?? 0;

        if (
            toolReleaseDate > currentReleaseDate ||
            (toolReleaseDate.getTime() === currentReleaseDate.getTime() &&
                toolPriority > currentPriority)
        ) {
            bestToolByBadge.set(badgeKey, tool);
        }
    }

    selectedTools.push(
        ...Array.from(bestToolByBadge.values()).sort((a, b) => {
            return (
                (toolsByKey[b.key]?.homepage?.[lang]?.priority ?? 0) -
                (toolsByKey[a.key]?.homepage?.[lang]?.priority ?? 0)
            );
        }),
    );

    if (selectedTools.length >= limit) {
        return selectedTools.slice(0, limit);
    }

    // Fill up to limit with remaining featured tools
    for (const tool of featuredTools) {
        if (!selectedTools.some((selectedTool) => selectedTool.key === tool.key)) {
            selectedTools.push(tool);
        }
        if (selectedTools.length >= limit) {
            return selectedTools;
        }
    }

    return selectedTools;
}

/**
 * Return the newest tools ordered by release date.
 *
 * @param {"it" | "en"} lang
 * @param {number} [limit]
 */
export function getNewestTools(lang, limit = 6) {
    return tools
        .filter((tool) => tool.releasedAt)
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .sort((a, b) => {
            return new Date(b.releasedAt) - new Date(a.releasedAt);
        })
        .slice(0, limit)
        .map((tool) => localizeTool(tool, lang));
}

function normalizePath(path) {
    if (!path) {
        return "";
    }

    return String(path).split("?")[0].split("#")[0].replace(/\/$/, "");
}

/**
 * Resolve a tool key from a localized href/path.
 *
 * @param {"it" | "en"} lang
 * @param {string} href
 */
export function getToolKeyByHref(lang, href) {
    const normalizedHref = normalizePath(href);

    if (!normalizedHref) {
        return undefined;
    }

    return tools.find((tool) => {
        if (lang === "it" && !tool.hasIt) {
            return false;
        }

        if (lang === "en" && !tool.hasEn) {
            return false;
        }

        return normalizePath(`/${lang}/${tool.slug[lang]}`) === normalizedHref;
    })?.key;
}

/**
 * Return tools related by shared tags and categories.
 *
 * @param {"it" | "en"} lang
 * @param {string} toolKey
 * @param {number} [limit]
 */
export function getRelatedTools(lang, toolKey, limit = 4) {
    const currentTool = toolsByKey[toolKey];

    if (!currentTool) {
        return [];
    }

    const currentTags = currentTool.tags ?? [];
    const currentCategories = currentTool.categories ?? [];

    return tools
        .filter((tool) => tool.key !== toolKey)
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => {
            const sharedTags = (tool.tags ?? []).filter((tag) =>
                currentTags.includes(tag),
            ).length;
            const sharedCategories = (tool.categories ?? []).filter((category) =>
                currentCategories.includes(category),
            ).length;

            return {
                tool,
                score: sharedTags * 10 + sharedCategories * 3,
                sharedTags,
                sharedCategories,
            };
        })
        .filter((entry) => entry.score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }

            if (b.sharedTags !== a.sharedTags) {
                return b.sharedTags - a.sharedTags;
            }

            return (b.tool.homepage?.[lang]?.priority ?? 0) -
                (a.tool.homepage?.[lang]?.priority ?? 0);
        })
        .slice(0, limit)
        .map((entry) => localizeTool(entry.tool, lang));
}

/** Slugs for every tool in a given locale (used by the sitemap). */
export function getToolPaths(lang) {
    return tools
        .filter((tool) => (lang === "it" ? tool.hasIt : tool.hasEn))
        .map((tool) => `/${lang}/${tool.slug[lang]}`);
}
