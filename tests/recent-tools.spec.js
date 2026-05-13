

import { expect, test } from "@playwright/test";

async function expectRecentlyUsedHidden(page) {
    await expect(page.getByRole("heading", { name: /Recently used/i })).toHaveCount(0);
}

async function expectRecentlyUsedVisible(page) {
    await expect(page.getByRole("heading", { name: /Recently used/i })).toBeVisible();
}

async function getRecentToolCards(page) {
    return page.locator("section", { has: page.getByRole("heading", { name: /Recently used/i }) }).locator("a");
}

test.describe("Recently used tools", () => {
    test("does not show recent tools on a fresh browser context", async ({ page }) => {
        await page.goto("/en");

        await expectRecentlyUsedHidden(page);
    });

    test("shows a visited tool on the English homepage", async ({ page }) => {
        await page.goto("/en/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();

        await page.goto("/en");

        await expectRecentlyUsedVisible(page);
        await expect(page.getByRole("link", { name: /JSON Formatter/i }).first()).toBeVisible();
    });

    test("orders recently used tools by most recent visit", async ({ page }) => {
        await page.goto("/en/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();

        await page.goto("/en/jwt-decoder");
        await expect(page.getByRole("heading", { level: 1, name: /JWT Decoder/i })).toBeVisible();

        await page.goto("/en");

        await expectRecentlyUsedVisible(page);

        const recentCards = await getRecentToolCards(page);
        await expect(recentCards.first()).toContainText(/JWT Decoder/i);
        await expect(recentCards.nth(1)).toContainText(/JSON Formatter/i);
    });

    test("keeps recent tools after reloading the homepage", async ({ page }) => {
        await page.goto("/en/public-ip-checker");
        await expect(page.getByRole("heading", { name: /Public IP Checker/i })).toBeVisible();

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

        await page.goto("/it");
        await expect(page.getByRole("heading", { name: /Usati di recente/i })).toHaveCount(0);

        await page.goto("/it/json-formatter");
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();

        await page.goto("/it");
        await expect(page.getByRole("heading", { name: /Usati di recente/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /JSON Formatter/i }).first()).toBeVisible();
    });
});