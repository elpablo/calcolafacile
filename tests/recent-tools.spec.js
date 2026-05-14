

import { expect, test } from "@playwright/test";

const RECENT_TOOLS_STORAGE_KEY = "calcolafacile:recent-tools";

async function expectRecentlyUsedHidden(page) {
    await expect(page.getByRole("heading", { name: /Recently used/i })).toHaveCount(0);
}

async function expectRecentlyUsedVisible(page) {
    await expect(page.getByRole("heading", { name: /Recently used/i })).toBeVisible();
}

async function getRecentToolCards(page) {
    return page.locator("section", { has: page.getByRole("heading", { name: /Recently used/i }) }).locator("a");
}

/**
 * Waits until the tool-usage tracking `useEffect` has actually written `path`
 * into `localStorage`. Tool pages are server-rendered so the heading becomes
 * visible before React hydrates; navigating away too early (Firefox
 * cold-start, ~5s) loses the visit. Polling localStorage removes the race.
 */
async function waitForToolVisitRecorded(page, path) {
    await page.waitForFunction(
        ({ storageKey, expectedPath }) => {
            try {
                const raw = window.localStorage.getItem(storageKey);
                if (!raw) return false;
                const list = JSON.parse(raw);
                return Array.isArray(list) && list.some((item) => item?.path === expectedPath);
            } catch {
                return false;
            }
        },
        { storageKey: RECENT_TOOLS_STORAGE_KEY, expectedPath: path }
    );
}

test.describe("Recently used tools", () => {
    test("does not show recent tools on a fresh browser context", async ({ page }) => {
        await page.goto("/en");

        await expectRecentlyUsedHidden(page);
    });

    test("shows a visited tool on the English homepage", async ({ page }) => {
        await page.goto("/en/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/en/json-formatter");

        await page.goto("/en");

        await expectRecentlyUsedVisible(page);
        await expect(page.getByRole("link", { name: /JSON Formatter/i }).first()).toBeVisible();
    });

    test("orders recently used tools by most recent visit", async ({ page }) => {
        await page.goto("/en/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/en/json-formatter");

        await page.goto("/en/jwt-decoder");
        await expect(page.getByRole("heading", { level: 1, name: /JWT Decoder/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/en/jwt-decoder");

        await page.goto("/en");

        await expectRecentlyUsedVisible(page);

        const recentCards = await getRecentToolCards(page);
        await expect(recentCards.first()).toContainText(/JWT Decoder/i);
        await expect(recentCards.nth(1)).toContainText(/JSON Formatter/i);
    });

    test("keeps recent tools after reloading the homepage", async ({ page }) => {
        await page.goto("/en/public-ip-checker");
        await expect(page.getByRole("heading", { name: /Public IP Checker/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/en/public-ip-checker");

        await page.goto("/en");
        await expectRecentlyUsedVisible(page);
        await expect(page.getByRole("link", { name: /Public IP Checker/i }).first()).toBeVisible();

        await page.reload();

        await expectRecentlyUsedVisible(page);
        await expect(page.getByRole("link", { name: /Public IP Checker/i }).first()).toBeVisible();
    });

    test("keeps English and Italian recent tools separated", async ({ page }) => {
        await page.goto("/en/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/en/json-formatter");

        await page.goto("/it");
        await expect(page.getByRole("heading", { name: /Usati di recente/i })).toHaveCount(0);

        await page.goto("/it/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();
        await waitForToolVisitRecorded(page, "/it/json-formatter");

        await page.goto("/it");
        await expect(page.getByRole("heading", { name: /Usati di recente/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /JSON Formatter/i }).first()).toBeVisible();
    });
});