import { expect, test } from "@playwright/test";

const itPath = "/it/calcolatore-mutuo";
const enPath = "/en/mortgage-calculator";

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.removeItem("calcolafacile:mortgage-calculator");
    });
});

test.describe("Mortgage Calculator", () => {
    test("loads the Italian page and calculates the default mortgage", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByRole("heading", { name: "Calcolatore Mutuo", level: 1 })).toBeVisible();
        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId("mortgage-result");
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

        await expect(page.locator("#mortgage-property-price")).toHaveValue("350000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("35000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("315000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4.5");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId("mortgage-result");
        await expect(resultBox).toContainText(/rata mensile/i);
        await expect(resultBox).toContainText(/loan-to-value/i);
    });

    test("applies the 20-year mortgage preset", async ({ page }) => {
        await page.goto(itPath);

        await page.getByRole("button", { name: /mutuo 20 anni/i }).click();

        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("20");

        await expect(page.getByTestId("mortgage-result")).toContainText("240");
    });

    test("updates the result from custom values", async ({ page }) => {
        await page.goto(
            `${itPath}?propertyPrice=120000&downPayment=20000&loanAmount=100000&annualRate=0&years=10`,
        );

        const resultBox = page.getByTestId("mortgage-result");
        await expect(resultBox).toContainText(/rata mensile/i);
        await expect(resultBox).toContainText("120");
        await expect(resultBox).toContainText(/interessi totali/i);
    });

    test("loads the English page", async ({ page }) => {
        await page.goto(enPath);

        await expect(page.getByRole("heading", { name: "Mortgage Calculator", level: 1 })).toBeVisible();
        await expect(page.locator("#mortgage-property-price")).toHaveValue("300000");
        await expect(page.locator("#mortgage-down-payment")).toHaveValue("50000");
        await expect(page.locator("#mortgage-loan-amount")).toHaveValue("250000");
        await expect(page.locator("#mortgage-annual-rate")).toHaveValue("4");
        await expect(page.locator("#mortgage-years")).toHaveValue("30");

        const resultBox = page.getByTestId("mortgage-result");
        await expect(resultBox).toContainText(/monthly payment/i);
        await expect(resultBox).toContainText("$");
    });
});