import { expect, test } from "@playwright/test";
import { clearLocalStorageKey, expectPageReady } from "./helpers/toolTestHelpers.js";

const itPath = "/it/calcolatore-roi";
const enPath = "/en/roi-calculator";
const storageKey = "calcolafacile:roi-calculator";
const resultTestId = "roi-result";

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("ROI Calculator", () => {
    test("loads the Italian page and calculates the default scenario", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /calcolatore roi/i })).toBeVisible();
        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("10000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("15000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("0");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("1");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toBeVisible();
        await expect(resultBox.getByText(/rendimento positivo/i)).toBeVisible();
        await expect(resultBox).toContainText("50%");
        await expect(resultBox.getByText(/profitto netto/i)).toBeVisible();
        await expect(resultBox.getByText(/roi annualizzato/i)).toBeVisible();
    });

    test("loads values from Italian query params", async ({ page }) => {
        await page.goto(
            `${itPath}?initialInvestment=5000&finalValue=9000&additionalCosts=750&years=0.25`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("5000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("9000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("750");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("0.25");
    });

    test("updates the result when changing inputs", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.getByLabel(/investimento iniziale/i).fill("10000");
        await page.getByLabel(/valore finale/i).fill("7000");
        await page.getByLabel(/costi aggiuntivi/i).fill("1000");
        await page.getByLabel(/^anni$/i).fill("1");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/rendimento negativo/i);
        await expect(resultBox).toContainText(/-36,36%/);
    });

    test("loads the marketing campaign example scenario", async ({ page }) => {
        await page.goto(
            `${itPath}?initialInvestment=5000&finalValue=9000&additionalCosts=750&years=0.25`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("5000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("9000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("750");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("0.25");
    });

    test("loads the English page with localized currency", async ({ page }) => {
        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /roi calculator/i })).toBeVisible();
        await expect(page.getByLabel(/initial investment/i)).toHaveValue("10000");
        await expect(page.getByLabel(/final value/i)).toHaveValue("15000");
        await expect(page.getByLabel(/additional costs/i)).toHaveValue("0");
        await expect(page.getByLabel(/^years$/i)).toHaveValue("1");
        await expect(page.getByTestId(resultTestId)).toContainText("$");
    });
});
