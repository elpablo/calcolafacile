

import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
    test("loads the Italian homepage and shows the tools grid", async ({ page }) => {
        await page.goto("/it");

        await expect(page).toHaveTitle(/Calcolatori online/i);
        await expect(page.getByRole("heading", { name: /Strumenti disponibili/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Convertitore unità/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /JSON Formatter/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Verifica IP pubblico/i })).toBeVisible();
    });

    test("loads the English homepage and shows the tools grid", async ({ page }) => {
        await page.goto("/en");

        await expect(page).toHaveTitle(/Free Online Calculators/i);
        await expect(page.getByRole("heading", { name: /Available tools/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Unit Converter/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /JSON Formatter/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Public IP Checker/i })).toBeVisible();
    });

    test("navigates from the English homepage to a tool page", async ({ page }) => {
        await page.goto("/en");

        await page.getByRole("link", { name: /JSON Formatter/i }).click();

        await expect(page).toHaveURL(/\/en\/json-formatter$/);
        await expect(page.getByRole("heading", { name: /JSON Formatter/i })).toBeVisible();
    });

    test("does not show recently used tools on a fresh browser context", async ({ page }) => {
        await page.goto("/en");

        await expect(page.getByRole("heading", { name: /Recently used/i })).toHaveCount(0);
    });
});