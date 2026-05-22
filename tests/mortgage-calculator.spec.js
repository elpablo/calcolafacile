import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers.js";

const itPath = "/it/calcolatore-mutuo";
const enPath = "/en/mortgage-calculator";
const storageKey = "calcolafacile:mortgage-calculator";
const resultTestId = "mortgage-result";

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Mortgage Calculator", () => {
    test("loads the Italian page and calculates the default mortgage", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: "Calcolatore Mutuo", level: 1 })).toBeVisible();
        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toBeVisible();
        await expect(resultBox).toContainText(/rata mensile/i);
        await expect(resultBox).toContainText(/interessi totali/i);
        await expect(resultBox).toContainText(/capitale residuo/i);
        await expect(resultBox).toContainText("360");
    });

    test("loads values from Italian query params", async ({ page }) => {
        await page.goto(
            `${itPath}?propertyPrice=350000&downPayment=35000&loanAmount=315000&annualRate=4.5&years=30`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.locator("#mortgage-property-price")).toHaveValue("350000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("35000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("315000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4.5");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/rata mensile/i);
        await expect(resultBox).toContainText(/rapporto ltv/i);
    });

    test("loads the 20-year mortgage example scenario", async ({ page }) => {
        await page.goto(
            `${itPath}?propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=20`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("20");

        await expect(page.getByTestId(resultTestId)).toContainText("240");
    });

    test("updates the result from custom values", async ({ page }) => {
        await page.goto(
            `${itPath}?propertyPrice=120000&downPayment=20000&loanAmount=100000&annualRate=0&years=10`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/rata mensile/i);
        await expect(resultBox).toContainText("120");
        await expect(resultBox).toContainText(/interessi totali/i);
    });

    test("loads the English page", async ({ page }) => {
        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: "Mortgage Calculator", level: 1 })).toBeVisible();
        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/monthly payment/i);
        await expect(resultBox).toContainText("$");
    });
});