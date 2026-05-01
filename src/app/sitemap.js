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
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" || route === "/it" ? 1 : 0.8,
    }));
}
