import { conversions } from "@/config/conversions";

export default function sitemap() {
    const baseUrl = "https://calcolafacile.org";
    const staticLastModified = new Date("2026-05-01");
    const conversionLastModified = new Date();

    const italianStaticRoutes = [
        "",
        "/it",
        "/it/calcolatore-iva",
        "/it/calcolo-percentuale",
        "/it/calcolo-margine",
        "/it/calcolo-markup",
        "/it/calcolo-stipendio-netto",
        "/it/calcolo-sconto-inverso",
        "/it/convertitore-unita",
        "/it/jwt-decoder",
        "/it/token-estimator",
        "/it/json-formatter",
        "/it/base64-tool",
        "/it/timestamp-converter",
        "/it/url-encoder-decoder",
        "/it/uuid-generator",
    ];

    const englishStaticRoutes = [
        "/en",
        "/en/tools",
        "/en/vat-calculator",
        "/en/percentage-calculator",
        "/en/margin-calculation",
        "/en/markup-calculation",
        "/en/salary-calculator",
        "/en/inverse-discount-calculation",
        "/en/unit-converter",
        "/en/jwt-decoder",
        "/en/token-estimator",
        "/en/json-formatter",
        "/en/base64-tool",
        "/en/timestamp-converter",
        "/en/url-encoder-decoder",
        "/en/uuid-generator",
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
