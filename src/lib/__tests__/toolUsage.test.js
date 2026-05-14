import { describe, it, expect, beforeEach, vi } from "vitest";

class MemoryStorage {
    constructor() {
        this.store = new Map();
    }
    getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
    }
    setItem(key, value) {
        this.store.set(key, String(value));
    }
    removeItem(key) {
        this.store.delete(key);
    }
    clear() {
        this.store.clear();
    }
}

vi.stubGlobal("window", {
    localStorage: new MemoryStorage(),
});

const { trackToolUsage, getRecentTools } = await import("@/lib/toolUsage");

const STORAGE_KEY = "calcolafacile:recent-tools";

function read() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
}

describe("toolUsage", () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.useRealTimers();
    });

    it("ignores entries missing path or title", () => {
        trackToolUsage({ path: "/x" });
        trackToolUsage({ title: "X" });
        expect(read()).toEqual([]);
    });

    it("records a new visit and prepends it", () => {
        trackToolUsage({ path: "/it/a", title: "A", lang: "it" });
        const stored = read();
        expect(stored).toHaveLength(1);
        expect(stored[0]).toMatchObject({
            path: "/it/a",
            title: "A",
            lang: "it",
            usageCount: 1,
        });
    });

    it("increments usageCount on repeat visits", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
        trackToolUsage({ path: "/x", title: "X" });
        vi.setSystemTime(new Date("2024-01-02T00:00:00Z"));
        trackToolUsage({ path: "/x", title: "X" });
        const stored = read();
        expect(stored).toHaveLength(1);
        expect(stored[0].usageCount).toBe(2);
    });

    it("caps the list at 20 most-recent entries", () => {
        vi.useFakeTimers();
        for (let i = 0; i < 25; i += 1) {
            vi.setSystemTime(new Date(2024, 0, 1, 0, 0, i));
            trackToolUsage({ path: `/tool-${i}`, title: `Tool ${i}` });
        }
        const stored = read();
        expect(stored).toHaveLength(20);
        // Most recent visit must be on top.
        expect(stored[0].path).toBe("/tool-24");
    });

    it("getRecentTools filters by lang", () => {
        trackToolUsage({ path: "/it/a", title: "A", lang: "it" });
        trackToolUsage({ path: "/en/b", title: "B", lang: "en" });
        const it = getRecentTools({ lang: "it" });
        expect(it.map((t) => t.path)).toEqual(["/it/a"]);
    });

    it("getRecentTools respects excludePaths and limit", () => {
        for (const path of ["/a", "/b", "/c", "/d"]) {
            trackToolUsage({ path, title: path });
        }
        const recent = getRecentTools({
            excludePaths: ["/a"],
            limit: 2,
        });
        expect(recent).toHaveLength(2);
        expect(recent.map((t) => t.path)).not.toContain("/a");
    });
});
