/**
 * Generates `/robots.txt`. Allows everything and advertises the sitemap.
 */
export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://calcolafacile.org/sitemap.xml",
    };
}
