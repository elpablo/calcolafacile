import { expect, test } from "@playwright/test";

const itPath = "/it/interesse-composto";
const enPath = "/en/compound-interest";

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.removeItem("calcolafacile:compound-interest");
    });
});

test.describe("Compound Interest Calculator", () => {
    test("loads the Italian page and calculates the default scenario", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByRole("heading", { name: /calcolatore interesse composto/i })).toBeVisible();
        await expect(page.getByLabel(/capitale iniziale/i)).toHaveValue("5000");
        await expect(page.getByLabel(/versamento mensile/i)).toHaveValue("200");
        await expect(page.getByLabel(/rendimento medio annuo/i)).toHaveValue("5");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("20");

        const resultBox = page.getByTestId("compound-interest-result");
        await expect(resultBox).toBeVisible();
        await expect(resultBox.getByText(/^capitale finale$/i)).toBeVisible();
        await expect(resultBox.getByText(/^interessi maturati$/i)).toBeVisible();
        await expect(page.getByRole("img", { name: /curva di crescita/i })).toBeVisible();
        await expect(page.getByRole("columnheader", { name: /anno/i })).toBeVisible();
    });

    test("loads values from Italian query params", async ({ page }) => {
        await page.goto(
            `${itPath}?principal=10000&monthlyContribution=0&annualRate=4&years=15&compoundingFrequency=yearly`,
        );

        await expect(page.getByLabel(/capitale iniziale/i)).toHaveValue("10000");
        await expect(page.getByLabel(/versamento mensile/i)).toHaveValue("0");
        await expect(page.getByLabel(/rendimento medio annuo/i)).toHaveValue("4");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("15");
        await expect(page.getByLabel(/frequenza di capitalizzazione/i)).toHaveValue("yearly");
    });

    test("updates the result when changing inputs", async ({ page }) => {
        await page.goto(itPath);

        const finalBalance = page.getByTestId("compound-interest-result");
        await expect(finalBalance).toContainText(/capitale finale/i);

        await page.getByLabel(/capitale iniziale/i).fill("10000");
        await page.getByLabel(/versamento mensile/i).fill("300");
        await page.getByLabel(/rendimento medio annuo/i).fill("7");
        await page.getByLabel(/^anni$/i).fill("15");

        await expect(page.getByTestId("compound-interest-result")).toContainText(/totale investito/i);
        await expect(page.getByTestId("compound-interest-result")).toContainText(/interessi maturati/i);
    });

    test("loads the English page with localized currency", async ({ page }) => {
        await page.goto(enPath);

        await expect(page.getByRole("heading", { name: /compound interest calculator/i })).toBeVisible();
        await expect(page.getByLabel(/initial capital/i)).toHaveValue("5000");
        await expect(page.getByLabel(/monthly contribution/i)).toHaveValue("200");
        await expect(page.getByLabel(/average annual return/i)).toHaveValue("5");
        await expect(page.getByLabel(/^years$/i)).toHaveValue("20");
        await expect(page.getByTestId("compound-interest-result")).toContainText("$");
        await expect(page.getByRole("img", { name: /growth curve/i })).toBeVisible();
    });
});