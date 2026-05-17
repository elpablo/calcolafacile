import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
    test("loads the Italian homepage and shows the tools grid", async ({ page }) => {
        await page.goto("/it");

        await expect(page).toHaveTitle(/Calcolatori online/i);
        await expect(page.getByText(/Tool in evidenza/i)).toBeVisible();
        await expect(page.getByRole("heading", { name: /Esplora per categoria/i })).toBeVisible();
        await expect(page.getByRole("heading", { name: /Conversioni/i })).toBeVisible();
        await expect(page.getByRole("heading", { name: /Strumenti Sviluppatori/i })).toBeVisible();
        await expect(page.getByRole("heading", { name: /Rete e Sicurezza/i })).toBeVisible();
    });

    test("loads the English homepage and shows the tools grid", async ({ page }) => {
        await page.goto("/en");

        await expect(page).toHaveTitle(/Free Online Calculators/i);
        await expect(page.getByText(/Featured tool/i)).toBeVisible();
        await expect(page.getByRole("heading", { name: /Browse by category/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Unit Conversions/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Developer Tools/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /Network & Security/i })).toBeVisible();
    });

    test("navigates from the English homepage to a tool page", async ({ page }) => {
        await page.goto("/en");

        await page.getByRole("link", { name: /Developer Tools/i }).click();

        await expect(page).toHaveURL(/\/en\/developer-tools$/);
        await expect(page.getByRole("heading", { name: /Free developer tools/i })).toBeVisible();
    });

    test("does not show recently used tools on a fresh browser context", async ({ page }) => {
        await page.goto("/en");

        await expect(page.getByRole("heading", { name: /Recently used/i })).toHaveCount(0);
    });
});