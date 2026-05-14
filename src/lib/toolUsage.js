/**
 * @file Tracks recently-used tools in the user's browser to power the
 * "Recently used" section on the home pages.
 *
 * Storage shape (under {@link STORAGE_KEY}):
 *   Array<{
 *     path: string,         // e.g. "/it/calcolatore-iva"
 *     title: string,
 *     description: string,
 *     lang: "it" | "en" | "",
 *     lastUsedAt: number,   // epoch ms
 *     usageCount: number
 *   }>
 *
 * The list is capped at {@link MAX_STORED_TOOLS} most recently used entries.
 */

import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:recent-tools";
const MAX_STORED_TOOLS = 20;

/**
 * Validates a tool descriptor and stamps it with the current timestamp.
 * Returns `null` when the tool lacks the mandatory `path` or `title` fields.
 *
 * @param {{ path?: string, title?: string, description?: string, lang?: string }} tool
 * @returns {object | null}
 */
function normalizeToolEntry(tool) {
    if (!tool?.path || !tool?.title) {
        return null;
    }

    return {
        path: tool.path,
        title: tool.title,
        description: tool.description || "",
        lang: tool.lang || "",
        lastUsedAt: Date.now(),
        usageCount: 1,
    };
}

/**
 * Records a tool visit. Updates `lastUsedAt` and increments `usageCount`
 * for known paths, or prepends a new entry otherwise. Safe to call on every
 * mount; no-ops when `tool.path` or `tool.title` are missing.
 *
 * @param {{ path: string, title: string, description?: string, lang?: string }} tool
 * @returns {void}
 */
export function trackToolUsage(tool) {
    const normalizedTool = normalizeToolEntry(tool);

    if (!normalizedTool) {
        return;
    }

    const currentTools = loadLocalState(STORAGE_KEY, []);
    const safeTools = Array.isArray(currentTools) ? currentTools : [];

    const existingTool = safeTools.find((item) => item.path === normalizedTool.path);

    const updatedTools = existingTool
        ? safeTools.map((item) =>
              item.path === normalizedTool.path
                  ? {
                        ...item,
                        title: normalizedTool.title,
                        description: normalizedTool.description,
                        lang: normalizedTool.lang,
                        lastUsedAt: normalizedTool.lastUsedAt,
                        usageCount: (Number(item.usageCount) || 0) + 1,
                    }
                  : item
          )
        : [normalizedTool, ...safeTools];

    const sortedTools = updatedTools
        .sort((a, b) => {
            const lastUsedDiff = (Number(b.lastUsedAt) || 0) - (Number(a.lastUsedAt) || 0);

            if (lastUsedDiff !== 0) {
                return lastUsedDiff;
            }

            return (Number(b.usageCount) || 0) - (Number(a.usageCount) || 0);
        })
        .slice(0, MAX_STORED_TOOLS);

    saveLocalState(STORAGE_KEY, sortedTools);
}

/**
 * Returns the recently-used tools, sorted by `lastUsedAt` (desc) and
 * tie-broken by `usageCount`.
 *
 * @param {{ lang?: string, limit?: number, excludePaths?: string[] }} [options]
 *   - `lang`: when provided, only return tools matching this locale.
 *   - `limit`: maximum number of entries to return (default 6).
 *   - `excludePaths`: paths to filter out (e.g. the current page).
 * @returns {Array<object>}
 */
export function getRecentTools({ lang, limit = 6, excludePaths = [] } = {}) {
    const storedTools = loadLocalState(STORAGE_KEY, []);
    const safeTools = Array.isArray(storedTools) ? storedTools : [];
    const excluded = new Set(excludePaths);

    return safeTools
        .filter((tool) => tool?.path && tool?.title)
        .filter((tool) => !lang || tool.lang === lang)
        .filter((tool) => !excluded.has(tool.path))
        .sort((a, b) => {
            const lastUsedDiff = (Number(b.lastUsedAt) || 0) - (Number(a.lastUsedAt) || 0);

            if (lastUsedDiff !== 0) {
                return lastUsedDiff;
            }

            return (Number(b.usageCount) || 0) - (Number(a.usageCount) || 0);
        })
        .slice(0, limit);
}