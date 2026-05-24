import { describe, it, expect } from "vitest";
import { conversions } from "@/config/conversions";
import { unitCategories } from "@/components/tools/unit-converter/units";

describe("conversions registry", () => {
    it("declares unique IT and EN slugs", () => {
        const itSlugs = conversions.map((c) => c.slug?.it);
        const enSlugs = conversions.map((c) => c.slug?.en);
        expect(new Set(itSlugs).size).toBe(itSlugs.length);
        expect(new Set(enSlugs).size).toBe(enSlugs.length);
    });

    it("references known category/from/to triples", () => {
        for (const c of conversions) {
            const category = unitCategories[c.category];
            expect(category, `unknown category for ${c.slug?.it ?? "?"}`).toBeDefined();
            expect(
                category.units[c.from],
                `unknown unit ${c.from} in ${c.category}`
            ).toBeDefined();
            expect(
                category.units[c.to],
                `unknown unit ${c.to} in ${c.category}`
            ).toBeDefined();
        }
    });

    it("provides bilingual labels for every entry", () => {
        for (const c of conversions) {
            expect(c.labels?.it?.from).toBeTruthy();
            expect(c.labels?.it?.to).toBeTruthy();
            expect(c.labels?.en?.from).toBeTruthy();
            expect(c.labels?.en?.to).toBeTruthy();
            expect(c.slug?.it).toBeTruthy();
            expect(c.slug?.en).toBeTruthy();
        }
    });
});
