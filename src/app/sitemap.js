import { conversions } from "@/config/conversions";

export default function sitemap() {
    const baseUrl = "https://calcolafacile.org";
    const staticLastModified = new Date("2026-05-01");
    const conversionLastModified = new Date();

    const staticRoutes = [
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
    ];

    const conversionRoutes = conversions.map(
        (conversion) => `/it/${conversion.slug}`
    );

    const routes = [...staticRoutes, ...conversionRoutes];
    const conversionSet = new Set(conversionRoutes);

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: conversionSet.has(route)
            ? conversionLastModified
            : staticLastModified,
        changeFrequency: "weekly",
        priority: route === "" || route === "/it" ? 1 : 0.8,
    }));
}
