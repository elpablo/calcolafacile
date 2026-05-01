export default function sitemap() {
    const baseUrl = "https://calcolafacile.org";

    const routes = [
        "",
        "/it",
        "/it/calcolatore-iva",
        "/it/calcolo-percentuale",
        "/it/calcolo-margine",
        "/it/calcolo-markup",
        "/it/calcolo-stipendio-netto",
        "/it/calcolo-sconto-inverso",
        "/it/convertitore-unita",
        "/it/oz-a-g",
        "/it/g-a-oz",
        "/it/cm-a-pollici",
        "/it/pollici-a-cm",
        "/it/kg-a-libbre",
        "/it/libbre-a-kg",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" || route === "/it" ? 1 : 0.8,
    }));
}
