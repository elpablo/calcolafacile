

import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:recent-tools";
const MAX_STORED_TOOLS = 20;

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