import { conversions } from "@/config/conversions";
import { getToolPaths } from "@/config/tools";

/**
 * Generates `/sitemap.xml` at build time.
 *
 * Combines three sets of URLs:
 *   1. Static Italian routes (homepage + every IT tool, derived from
 *      `src/config/tools.js`).
 *   2. Static English routes (homepage + every EN tool + hub pages,
 *      derived from `src/config/tools.js` plus a few EN-only hubs).
 *   3. Dynamic unit-conversion landing pages, materialised from
 *      {@link conversions} (one entry per locale/slug pair).
 *
 * Conversion URLs get `lastModified = now` so search engines re-crawl them
 * whenever the site is rebuilt; the rest use a fixed timestamp to avoid
 * artificial freshness signals.
 */
export default function sitemap() {
    const baseUrl = "https://calcolafacile.org";
    const staticLastModified = new Date("2026-05-01");
    const conversionLastModified = new Date();

    const italianStaticRoutes = [
        "",
        "/it",
        "/it/strumenti-iva",
        "/it/strumenti-costi-ai",
        ...getToolPaths("it"),
    ];

    const englishStaticRoutes = [
        "/en",
        "/en/tools",
        "/en/encoding-tools",
        "/en/json-tools",
        "/en/vat-tools",
        "/en/ai-cost-tools",
        ...getToolPaths("en"),
    ];

    const italianConversionRoutes = conversions
        .filter((conversion) => conversion.slug?.it)
        .map((conversion) => `/it/${conversion.slug.it}`);

    const englishConversionRoutes = conversions
        .filter((conversion) => conversion.slug?.en)
        .map((conversion) => `/en/${conversion.slug.en}`);

    const routes = [
        ...italianStaticRoutes,
        ...englishStaticRoutes,
        ...italianConversionRoutes,
        ...englishConversionRoutes,
    ];
    const conversionSet = new Set([
        ...italianConversionRoutes,
        ...englishConversionRoutes,
    ]);

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: conversionSet.has(route)
            ? conversionLastModified
            : staticLastModified,
        changeFrequency: "weekly",
        priority: route === "" || route === "/it" || route === "/en" ? 1 : 0.8,
    }));
}
