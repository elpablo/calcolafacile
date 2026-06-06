import { expect, test } from "@playwright/test";
import { clearLocalStorageKey, expectPageReady } from "./helpers/toolTestHelpers.js";

const itPath = "/it/calcolatore-iva";
const enPath = "/en/vat-calculator";
const storageKey = "calcolafacile:vat-calculator";
const resultTestId = "vat-result";

async function expectEnglishExampleLinks(page) {
    await expect(
        page.locator('a[href="/en/vat-calculator?amount=100&rate=20&mode=add"]'),
    ).toHaveCount(1);
    await expect(
        page.locator('a[href="/en/vat-calculator?amount=120&rate=20&mode=remove"]'),
    ).toHaveCount(1);
    await expect(
        page.locator('a[href="/en/vat-calculator?amount=250&rate=17.5&mode=add"]'),
    ).toHaveCount(1);
}

async function expectItalianExampleLinks(page) {
    await expect(
        page.locator('a[href="/it/calcolatore-iva?amount=100&rate=22&mode=add"]'),
    ).toHaveCount(1);
    await expect(
        page.locator('a[href="/it/calcolatore-iva?amount=122&rate=22&mode=remove"]'),
    ).toHaveCount(1);
    await expect(
        page.locator('a[href="/it/calcolatore-iva?amount=250&rate=17.5&mode=add"]'),
    ).toHaveCount(1);
}

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("VAT Calculator", () => {
    test("loads the English page and calculates the default UK VAT scenario", async ({ page }) => {
        await page.goto(`${enPath}?amount=100&rate=20&mode=add`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /vat calculator/i, level: 1 })).toBeVisible();
        await expect(page.locator("#vat-amount")).toHaveValue("100");
        await expect(page.locator("#vat-rate")).toHaveValue("20");
        await expect(page.getByRole("radio", { name: /add vat/i })).toHaveAttribute("aria-checked", "true");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toBeVisible();
        await expect(resultBox).toContainText(/total/i);
        await expect(resultBox).toContainText(/net/i);
        await expect(resultBox).toContainText(/vat/i);
        await expect(resultBox).toContainText("$120.00");
        await expect(resultBox).toContainText("$100.00");
        await expect(resultBox).toContainText("$20.00");
        await expectEnglishExampleLinks(page);
    });

    test("loads values from English query params and removes VAT", async ({ page }) => {
        await page.goto(`${enPath}?amount=120&rate=20&mode=remove`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.locator("#vat-amount")).toHaveValue("120");
        await expect(page.locator("#vat-rate")).toHaveValue("20");
        await expect(page.getByRole("radio", { name: /remove vat/i })).toHaveAttribute("aria-checked", "true");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText("$120.00");
        await expect(resultBox).toContainText("$100.00");
        await expect(resultBox).toContainText("$20.00");
    });

    test("supports custom decimal VAT rates", async ({ page }) => {
        await page.goto(`${enPath}?amount=250&rate=17.5&mode=add`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.locator("#vat-amount")).toHaveValue("250");
        await expect(page.locator("#vat-rate")).toHaveValue("17.5");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText("$293.75");
        await expect(resultBox).toContainText("$250.00");
        await expect(resultBox).toContainText("$43.75");
    });

    test("applies UK and Italy preset rates", async ({ page }) => {
        await page.goto(`${enPath}?amount=100&rate=20&mode=add`);
        await expectPageReady(page, resultTestId, storageKey);

        await page.getByRole("button", { name: "5%" }).click();
        await expect(page.locator("#vat-rate")).toHaveValue("5");
        await expect(page.getByTestId(resultTestId)).toContainText("$105.00");

        await page.getByRole("button", { name: "22%" }).click();
        await expect(page.locator("#vat-rate")).toHaveValue("22");
        await expect(page.getByTestId(resultTestId)).toContainText("$122.00");
    });

    test("updates the result when changing mode and inputs", async ({ page }) => {
        await page.goto(`${enPath}?amount=100&rate=20&mode=add`);
        await expectPageReady(page, resultTestId, storageKey);

        await page.locator("#vat-amount").fill("240");
        await page.locator("#vat-rate").fill("20");
        await page.getByRole("radio", { name: /remove vat/i }).click();

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText("$240.00");
        await expect(resultBox).toContainText("$200.00");
        await expect(resultBox).toContainText("$40.00");
    });

    test("loads the Italian page with localized labels and currency", async ({ page }) => {
        await page.goto(`${itPath}?amount=100&rate=20&mode=add`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /calcolatore iva/i, level: 1 })).toBeVisible();
        await expect(page.locator("#vat-amount")).toHaveValue("100");
        await expect(page.locator("#vat-rate")).toHaveValue("20");
        await expect(page.getByRole("radio", { name: /aggiungi iva/i })).toHaveAttribute("aria-checked", "true");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/totale/i);
        await expect(resultBox).toContainText(/netto/i);
        await expect(resultBox).toContainText("120,00");
        await expect(resultBox).toContainText("100,00");
        await expect(resultBox).toContainText("20,00");
        await expect(resultBox).toContainText("€");
        await expectItalianExampleLinks(page);
    });

    test("navigates through English practical examples and pre-fills the calculator", async ({ page }) => {
        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.locator('a[href="/en/vat-calculator?amount=120&rate=20&mode=remove"]').click();
        await expect(page).toHaveURL(/\/en\/vat-calculator\?amount=120&rate=20&mode=remove$/);
        await expect(page.locator("#vat-amount")).toHaveValue("120");
        await expect(page.locator("#vat-rate")).toHaveValue("20");
        await expect(page.getByRole("radio", { name: /remove vat/i })).toHaveAttribute("aria-checked", "true");
        await expect(page.getByTestId(resultTestId)).toContainText("$100.00");
        await expect(page.getByTestId(resultTestId)).toContainText("$20.00");

        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);
        await page.locator('a[href="/en/vat-calculator?amount=250&rate=17.5&mode=add"]').click();
        await expect(page).toHaveURL(/\/en\/vat-calculator\?amount=250&rate=17.5&mode=add$/);
        await expect(page.locator("#vat-amount")).toHaveValue("250");
        await expect(page.locator("#vat-rate")).toHaveValue("17.5");
        await expect(page.getByRole("radio", { name: /add vat/i })).toHaveAttribute("aria-checked", "true");
        await expect(page.getByTestId(resultTestId)).toContainText("$293.75");
    });

    test("navigates through Italian practical examples and pre-fills the calculator", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.locator('a[href="/it/calcolatore-iva?amount=122&rate=22&mode=remove"]').click();
        await expect(page).toHaveURL(/\/it\/calcolatore-iva\?amount=122&rate=22&mode=remove$/);
        await expect(page.locator("#vat-amount")).toHaveValue("122");
        await expect(page.locator("#vat-rate")).toHaveValue("22");
        await expect(page.getByRole("radio", { name: /scorpora iva/i })).toHaveAttribute("aria-checked", "true");
        await expect(page.getByTestId(resultTestId)).toContainText("100,00");
        await expect(page.getByTestId(resultTestId)).toContainText("22,00");
    });

    test("connects the VAT calculator to the rest of the English VAT cluster", async ({ page }) => {
        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.getByRole("link", { name: /vat reverse calculator/i }).first().click();
        await expect(page).toHaveURL(/\/en\/vat-reverse-calculator$/);

        await page.getByRole("link", { name: /vat removal calculator/i }).first().click();
        await expect(page).toHaveURL(/\/en\/vat-removal-calculator$/);

        await page.getByRole("link", { name: /vat tools/i }).first().click();
        await expect(page).toHaveURL(/\/en\/vat-tools$/);
    });

    test("connects the VAT calculator to the rest of the Italian VAT cluster", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.getByRole("link", { name: /calcolatore iva inverso/i }).first().click();
        await expect(page).toHaveURL(/\/it\/calcolatore-iva-inverso$/);

        await page.getByRole("link", { name: /calcolatore rimozione iva/i }).first().click();
        await expect(page).toHaveURL(/\/it\/calcolatore-rimozione-iva$/);

        await page.getByRole("link", { name: /strumenti iva/i }).first().click();
        await expect(page).toHaveURL(/\/it\/strumenti-iva$/);
    });
});