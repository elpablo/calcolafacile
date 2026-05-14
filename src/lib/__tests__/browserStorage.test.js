import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage on globalThis BEFORE importing the module under test.
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

const {
    loadLocalState,
    saveLocalState,
    removeLocalState,
} = await import("@/lib/browserStorage");

describe("browserStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("returns fallback when key is missing", () => {
        expect(loadLocalState("missing", { default: true })).toEqual({
            default: true,
        });
    });

    it("returns null fallback by default", () => {
        expect(loadLocalState("missing")).toBeNull();
    });

    it("round-trips JSON-serialisable values", () => {
        saveLocalState("k", { a: 1, b: [2, 3] });
        expect(loadLocalState("k")).toEqual({ a: 1, b: [2, 3] });
    });

    it("falls back when stored payload is not valid JSON", () => {
        window.localStorage.setItem("broken", "{not-json");
        expect(loadLocalState("broken", "fallback")).toBe("fallback");
    });

    it("removeLocalState deletes the key", () => {
        saveLocalState("k", "v");
        removeLocalState("k");
        expect(loadLocalState("k")).toBeNull();
    });

    it("swallows setItem errors (quota)", () => {
        const original = window.localStorage.setItem;
        window.localStorage.setItem = () => {
            throw new Error("QuotaExceeded");
        };
        expect(() => saveLocalState("k", "v")).not.toThrow();
        window.localStorage.setItem = original;
    });
});
