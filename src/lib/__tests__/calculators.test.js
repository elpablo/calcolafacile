import { describe, it, expect } from "vitest";

// ─── VAT ───────────────────────────────────────────────────────────────────
function computeVat(amount, rate, mode) {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r) || a < 0 || r <= 0) return null;
    if (mode === "add") {
        const vat = (a * r) / 100;
        return { net: a, vat, gross: a + vat };
    }
    // remove
    const net = (a * 100) / (100 + r);
    const vat = a - net;
    return { net, vat, gross: a };
}

describe("VAT calculator", () => {
    it("adds 22% VAT to 100", () => {
        const r = computeVat(100, 22, "add");
        expect(r.vat).toBeCloseTo(22);
        expect(r.gross).toBeCloseTo(122);
    });

    it("removes 22% VAT from 122", () => {
        const r = computeVat(122, 22, "remove");
        expect(r.net).toBeCloseTo(100);
        expect(r.vat).toBeCloseTo(22);
    });

    it("adds 10% VAT", () => {
        const r = computeVat(200, 10, "add");
        expect(r.gross).toBeCloseTo(220);
    });

    it("adds 4% VAT", () => {
        const r = computeVat(50, 4, "add");
        expect(r.gross).toBeCloseTo(52);
    });

    it("returns null for invalid input", () => {
        expect(computeVat(-10, 22, "add")).toBeNull();
        expect(computeVat(100, 0, "add")).toBeNull();
        expect(computeVat(NaN, 22, "add")).toBeNull();
    });
});

// ─── MARGIN ────────────────────────────────────────────────────────────────
function computeMarginFromPrice(cost, price) {
    if (cost <= 0 || price < 0) return null;
    const profit = price - cost;
    const margin = (profit / price) * 100;
    return { profit, margin };
}

function computePriceFromMargin(cost, targetMargin) {
    if (cost <= 0 || targetMargin < 0 || targetMargin >= 100) return null;
    const price = cost / (1 - targetMargin / 100);
    const profit = price - cost;
    return { price, profit };
}

describe("Margin calculator", () => {
    it("computes margin from cost=60 price=100", () => {
        const r = computeMarginFromPrice(60, 100);
        expect(r.profit).toBeCloseTo(40);
        expect(r.margin).toBeCloseTo(40);
    });

    it("computes price from cost=60 and 40% target margin", () => {
        const r = computePriceFromMargin(60, 40);
        expect(r.price).toBeCloseTo(100);
        expect(r.profit).toBeCloseTo(40);
    });

    it("returns null when cost ≤ 0", () => {
        expect(computeMarginFromPrice(0, 100)).toBeNull();
        expect(computeMarginFromPrice(-1, 100)).toBeNull();
    });

    it("returns null when margin ≥ 100%", () => {
        expect(computePriceFromMargin(60, 100)).toBeNull();
    });
});

// ─── MARKUP ────────────────────────────────────────────────────────────────
function computeMarkupFromPrice(cost, price) {
    if (cost <= 0 || price < 0) return null;
    const profit = price - cost;
    const markup = (profit / cost) * 100;
    return { profit, markup };
}

function computePriceFromMarkup(cost, targetMarkup) {
    if (cost <= 0 || targetMarkup < 0) return null;
    const price = cost * (1 + targetMarkup / 100);
    const profit = price - cost;
    return { price, profit };
}

describe("Markup calculator", () => {
    it("computes markup from cost=60 price=100", () => {
        const r = computeMarkupFromPrice(60, 100);
        expect(r.profit).toBeCloseTo(40);
        expect(r.markup).toBeCloseTo(66.667, 2);
    });

    it("computes price from cost=60 and 50% target markup", () => {
        const r = computePriceFromMarkup(60, 50);
        expect(r.price).toBeCloseTo(90);
        expect(r.profit).toBeCloseTo(30);
    });

    it("returns null for invalid inputs", () => {
        expect(computeMarkupFromPrice(0, 100)).toBeNull();
        expect(computePriceFromMarkup(-5, 50)).toBeNull();
    });
});

// ─── SALARY ────────────────────────────────────────────────────────────────
function computeSalary(grossAnnual) {
    const g = parseFloat(grossAnnual);
    if (isNaN(g) || g <= 0) return null;
    const annualNet = g * 0.7;
    return { annualNet, monthlyNet: annualNet / 12 };
}

describe("Salary calculator", () => {
    it("estimates net for 30000 gross", () => {
        const r = computeSalary(30000);
        expect(r.annualNet).toBeCloseTo(21000);
        expect(r.monthlyNet).toBeCloseTo(1750);
    });

    it("returns null for non-positive input", () => {
        expect(computeSalary(0)).toBeNull();
        expect(computeSalary(-1000)).toBeNull();
    });
});

// ─── REVERSE DISCOUNT ──────────────────────────────────────────────────────
function computeOriginalPrice(discountedPrice, discountPct) {
    const p = parseFloat(discountedPrice);
    const d = parseFloat(discountPct);
    if (isNaN(p) || isNaN(d) || p < 0 || d < 0 || d >= 100) return null;
    const original = p / (1 - d / 100);
    const savings = original - p;
    return { original, savings };
}

describe("Reverse discount calculator", () => {
    it("finds original price from 70 after 30% discount", () => {
        const r = computeOriginalPrice(70, 30);
        expect(r.original).toBeCloseTo(100);
        expect(r.savings).toBeCloseTo(30);
    });

    it("handles 0% discount (no discount)", () => {
        const r = computeOriginalPrice(100, 0);
        expect(r.original).toBeCloseTo(100);
        expect(r.savings).toBeCloseTo(0);
    });

    it("returns null for invalid inputs", () => {
        expect(computeOriginalPrice(70, 100)).toBeNull();
        expect(computeOriginalPrice(-10, 30)).toBeNull();
        expect(computeOriginalPrice(70, -5)).toBeNull();
    });
});

// ─── TOKEN ESTIMATOR ───────────────────────────────────────────────────────
function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function estimateTokens(text) {
    const byCharacters = Math.ceil(text.length / 4);
    const byWords = Math.ceil(countWords(text) * 1.3);
    return Math.max(byCharacters, byWords);
}

describe("Token estimator", () => {
    it("returns 0 for empty string", () => {
        expect(estimateTokens("")).toBe(0);
    });

    it("estimates tokens for a short sentence", () => {
        const text = "Hello world this is a test";
        const tokens = estimateTokens(text);
        expect(tokens).toBeGreaterThan(0);
        // 6 words * 1.3 = 7.8 → 8; 26 chars / 4 = 6.5 → 7; max = 8
        expect(tokens).toBe(8);
    });

    it("uses character-based estimate for dense strings", () => {
        // Long string with no spaces — word estimate = 1*1.3 = 2, char estimate wins
        const text = "a".repeat(100);
        expect(estimateTokens(text)).toBe(25); // ceil(100/4)
    });
});

// ─── PERCENTAGE ────────────────────────────────────────────────────────────
function computePercentOf(percentage, value) {
    return (parseFloat(percentage) / 100) * parseFloat(value);
}

function computeRatio(part, total) {
    const t = parseFloat(total);
    if (t === 0) return null;
    return (parseFloat(part) / t) * 100;
}

function computeChange(base, changePct, type) {
    const b = parseFloat(base);
    const c = parseFloat(changePct);
    const delta = (b * c) / 100;
    return type === "increase" ? b + delta : b - delta;
}

function computeDiscount(price, discountPct) {
    const p = parseFloat(price);
    const d = parseFloat(discountPct);
    const saving = (p * d) / 100;
    return { discounted: p - saving, saving };
}

describe("Percentage calculator", () => {
    it("percentOf: 20% of 150 = 30", () => {
        expect(computePercentOf(20, 150)).toBeCloseTo(30);
    });

    it("ratio: 25 out of 200 = 12.5%", () => {
        expect(computeRatio(25, 200)).toBeCloseTo(12.5);
    });

    it("ratio: returns null when total is 0", () => {
        expect(computeRatio(10, 0)).toBeNull();
    });

    it("change: increase 100 by 10% = 110", () => {
        expect(computeChange(100, 10, "increase")).toBeCloseTo(110);
    });

    it("change: decrease 100 by 15% = 85", () => {
        expect(computeChange(100, 15, "decrease")).toBeCloseTo(85);
    });

    it("discount: 30% off 120 = 84 discounted, saving 36", () => {
        const r = computeDiscount(120, 30);
        expect(r.discounted).toBeCloseTo(84);
        expect(r.saving).toBeCloseTo(36);
    });
});
