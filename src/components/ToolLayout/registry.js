/**
 * @file Related-tools registry and localisation helper.
 *
 * `defaultRelatedTools` is derived from the central tool catalogue in
 * `src/config/tools.js` so the list stays in sync with the homepage grid
 * and the sitemap automatically.
 */

import { tools as toolRegistry } from "@/config/tools";

/**
 * Default cross-tool navigation entries for every tool page.
 * Shape: `{ href: {it?, en?}, title: {it?, en?}, description: {it?, en?} }`.
 */
export const defaultRelatedTools = toolRegistry.map((tool) => ({
    href: {
        it: tool.hasIt ? `/it/${tool.slug.it}` : undefined,
        en: tool.hasEn ? `/en/${tool.slug.en}` : undefined,
    },
    title: tool.title,
    description: tool.description,
}));

/**
 * Collapses a multi-locale tool entry down to a single-locale object.
 *
 * @param {{ href: object|string, title: object|string, description: object|string }} tool
 * @param {"it"|"en"} lang
 * @returns {{ href: string, title: string, description: string }}
 */
export function localizeTool(tool, lang) {
    return {
        href:
            typeof tool.href === "string"
                ? tool.href
                : tool.href?.[lang] || tool.href?.it,
        title:
            typeof tool.title === "string"
                ? tool.title
                : tool.title?.[lang] || tool.title?.it,
        description:
            typeof tool.description === "string"
                ? tool.description
                : tool.description?.[lang] || tool.description?.it,
    };
}
