import { expect, test } from "@playwright/test";
import { clearLocalStorageKey, expectPageReady } from "./helpers/toolTestHelpers.js";

const storageKey = "calcolafacile:vat-calculator";

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

async function expectFaqSchema(page) {
    const faqScript = page.locator('script[type="application/ld+json"]');
    await expect(faqScript.first()).toHaveCount(1);
    const rawSchema = await faqScript.first().textContent();
    expect(rawSchema ?? "").toContain("FAQPage");
}

async function getMetaDescription(page) {
    return page.locator('meta[name="description"]').getAttribute("content");
}

test.describe("Cluster IVA italiano", () => {
    test("hub strumenti IVA mostra i tre tool principali e FAQ schema", async ({ page }) => {
        await page.goto("/it/strumenti-iva");

        await expect(page.getByRole("heading", {
            name: /calcolatori iva gratuiti online/i,
            level: 1,
        })).toBeVisible();

        await expect(page.getByRole("link", { name: /calcolatore iva/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /calcolatore iva inverso/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /calcolatore rimozione iva/i })).toBeVisible();

        await expectFaqSchema(page);
    });

    test("gli esempi italiani puntano a href reali con query params", async ({ page }) => {
        await page.goto("/it/calcolatore-iva-inverso");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(
            page.locator('a[href="/it/calcolatore-iva-inverso?amount=122&rate=22"]'),
        ).toHaveCount(1);
        await expect(
            page.locator('a[href="/it/calcolatore-iva-inverso?amount=120&rate=20"]'),
        ).toHaveCount(1);

        await page.goto("/it/calcolatore-rimozione-iva");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(
            page.locator('a[href="/it/calcolatore-rimozione-iva?amount=244&rate=22"]'),
        ).toHaveCount(1);
        await expect(
            page.locator('a[href="/it/calcolatore-rimozione-iva?amount=110&rate=10"]'),
        ).toHaveCount(1);
    });

    test("calcolatore IVA inverso calcola imponibile e quota IVA", async ({ page }) => {
        await page.goto("/it/calcolatore-iva-inverso?amount=120&rate=20");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(
            page.getByRole("heading", { name: /calcolatore iva inverso/i, level: 1 }),
        ).toBeVisible();

        await expect(page).toHaveTitle(/iva inverso/i);
        await expect(page.locator("main")).toContainText(/lordo a imponibile|lordo a netto/i);

        await expect(page.locator("#vr-amount")).toHaveValue("120");
        await expect(page.locator("#vr-rate")).toHaveValue("20");

        const resultBox = page.getByTestId("vat-reverse-result");
        await expect(resultBox).toContainText(/imponibile/i);
        await expect(resultBox).toContainText(/quota iva/i);
        await expect(resultBox).toContainText("100,00");
        await expect(resultBox).toContainText("20,00");
        await expect(resultBox).toContainText("€");

        await expect(page.getByRole("link", { name: /calcolatore iva/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /calcolatore rimozione iva/i }).first()).toBeVisible();
        await expectFaqSchema(page);
    });

    test("calcolatore rimozione IVA calcola IVA rimossa e imponibile", async ({ page }) => {
        await page.goto("/it/calcolatore-rimozione-iva?amount=120&rate=20");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(
            page.getByRole("heading", { name: /calcolatore rimozione iva/i, level: 1 }),
        ).toBeVisible();

        await expect(page).toHaveTitle(/rimozione iva/i);
        await expect(page.locator("main")).toContainText(/prezzo senza iva|sottrarre l'iva/i);

        await expect(page.locator("#vr-amount")).toHaveValue("120");
        await expect(page.locator("#vr-rate")).toHaveValue("20");

        const resultBox = page.getByTestId("vat-reverse-result");
        await expect(resultBox).toContainText(/prezzo senza iva/i);
        await expect(resultBox).toContainText(/iva rimossa/i);
        await expect(resultBox).toContainText("100,00");
        await expect(resultBox).toContainText("20,00");
        await expect(resultBox).toContainText("€");

        await expect(page.getByRole("link", { name: /calcolatore iva/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /calcolatore iva inverso/i }).first()).toBeVisible();
        await expectFaqSchema(page);
    });

    test("reverse e rimozione IVA hanno title, meta description e copy distinti", async ({ page }) => {
        await page.goto("/it/calcolatore-iva-inverso");
        await expectPageReady(page, "vat-reverse-result", undefined);
        const reverseTitle = await page.title();
        const reverseDescription = await getMetaDescription(page);
        await expect(
            page.getByRole("heading", { name: /calcolatore iva inverso/i, level: 1 }),
        ).toBeVisible();
        await expect(page.locator("main")).toContainText(/iva a ritroso|lordo a netto/i);

        await page.goto("/it/calcolatore-rimozione-iva");
        await expectPageReady(page, "vat-reverse-result", undefined);
        const removalTitle = await page.title();
        const removalDescription = await getMetaDescription(page);
        await expect(
            page.getByRole("heading", { name: /calcolatore rimozione iva/i, level: 1 }),
        ).toBeVisible();
        await expect(page.locator("main")).toContainText(/prezzo senza iva|rimuovi l'iva/i);

        expect(reverseTitle).not.toBe(removalTitle);
        expect(reverseDescription).not.toBe(removalDescription);
    });

    test("navigazione interna tra le tre pagine IVA italiane", async ({ page }) => {
        await page.goto("/it/calcolatore-iva");
        await expectPageReady(page, "vat-result", storageKey);

        await page.getByRole("link", { name: /calcolatore iva inverso/i }).first().click();
        await expect(page).toHaveURL(/\/it\/calcolatore-iva-inverso$/);

        await page.getByRole("link", { name: /calcolatore rimozione iva/i }).first().click();
        await expect(page).toHaveURL(/\/it\/calcolatore-rimozione-iva$/);

        await page.getByRole("link", { name: /strumenti iva/i }).first().click();
        await expect(page).toHaveURL(/\/it\/strumenti-iva$/);
    });
});

test.describe("English VAT cluster", () => {
    test("reverse and removal pages have distinct metadata, copy and example hrefs", async ({ page }) => {
        await page.goto("/en/vat-reverse-calculator");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(page).toHaveTitle(/reverse calculator/i);
        await expect(
            page.getByRole("heading", { name: /vat reverse calculator/i, level: 1 }),
        ).toBeVisible();
        await expect(page.locator("main")).toContainText(/calculate vat backwards|gross to net/i);
        await expect(
            page.locator('a[href="/en/vat-reverse-calculator?amount=120&rate=20"]'),
        ).toHaveCount(1);

        const reverseDescription = await getMetaDescription(page);

        await page.goto("/en/vat-removal-calculator");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await expect(page).toHaveTitle(/removal calculator/i);
        await expect(
            page.getByRole("heading", { name: /vat removal calculator/i, level: 1 }),
        ).toBeVisible();
        await expect(page.locator("main")).toContainText(/price without vat|remove vat from a price/i);
        await expect(
            page.locator('a[href="/en/vat-removal-calculator?amount=120&rate=20"]'),
        ).toHaveCount(1);

        const removalDescription = await getMetaDescription(page);
        expect(reverseDescription).not.toBe(removalDescription);
    });

    test("reverse and removal calculators both return 100 and 20 from 120 at 20%", async ({ page }) => {
        await page.goto("/en/vat-reverse-calculator?amount=120&rate=20");
        await expectPageReady(page, "vat-reverse-result", undefined);
        await expect(page.locator("#vr-amount")).toHaveValue("120");
        await expect(page.locator("#vr-rate")).toHaveValue("20");
        await expect(page.getByTestId("vat-reverse-result")).toContainText("$100.00");
        await expect(page.getByTestId("vat-reverse-result")).toContainText("$20.00");

        await page.goto("/en/vat-removal-calculator?amount=120&rate=20");
        await expectPageReady(page, "vat-reverse-result", undefined);
        await expect(page.locator("#vr-amount")).toHaveValue("120");
        await expect(page.locator("#vr-rate")).toHaveValue("20");
        await expect(page.getByTestId("vat-reverse-result")).toContainText("$100.00");
        await expect(page.getByTestId("vat-reverse-result")).toContainText("$20.00");
    });

    test("related calculator links connect the English VAT cluster", async ({ page }) => {
        await page.goto("/en/vat-reverse-calculator");
        await expectPageReady(page, "vat-reverse-result", undefined);

        await page.locator('a[href="/en/vat-removal-calculator"]').first().click();
        await expect(page).toHaveURL(/\/en\/vat-removal-calculator$/);

        await page.locator('a[href="/en/vat-calculator"]').first().click();
        await expect(page).toHaveURL(/\/en\/vat-calculator$/);

        await page.locator('a[href="/en/vat-tools"]').first().click();
        await expect(page).toHaveURL(/\/en\/vat-tools$/);
    });
});
