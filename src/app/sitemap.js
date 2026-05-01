import { conversions } from "@/config/conversions";

export default function sitemap() {
    const baseUrl = "https://calcolafacile.org";

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
    ];

    const conversionRoutes = conversions.map(
        (conversion) => `/it/${conversion.slug}`
    );

    const routes = [...staticRoutes, ...conversionRoutes];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" || route === "/it" ? 1 : 0.8,
    }));
}
