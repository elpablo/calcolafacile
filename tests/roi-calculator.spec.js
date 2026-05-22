import { expect, test } from "@playwright/test";

const itPath = "/it/calcolatore-roi";
const enPath = "/en/roi-calculator";

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.removeItem("calcolafacile:roi-calculator");
    });
});

test.describe("ROI Calculator", () => {
    test("loads the Italian page and calculates the default scenario", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByRole("heading", { name: /calcolatore roi/i })).toBeVisible();
        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("10000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("15000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("0");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("1");

        const resultBox = page.getByTestId("roi-result");
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

        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("5000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("9000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("750");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("0.25");
    });

    test("updates the result when changing inputs", async ({ page }) => {
        await page.goto(itPath);

        await page.getByLabel(/investimento iniziale/i).fill("10000");
        await page.getByLabel(/valore finale/i).fill("7000");
        await page.getByLabel(/costi aggiuntivi/i).fill("1000");
        await page.getByLabel(/^anni$/i).fill("1");

        const resultBox = page.getByTestId("roi-result");
        await expect(resultBox).toContainText(/rendimento negativo/i);
        await expect(resultBox).toContainText(/-36,36%/);
    });

    test("applies example presets", async ({ page }) => {
        await page.goto(itPath);

        await page.getByRole("button", { name: /roi campagna marketing/i }).click();

        await expect(page.getByLabel(/investimento iniziale/i)).toHaveValue("5000");
        await expect(page.getByLabel(/valore finale/i)).toHaveValue("9000");
        await expect(page.getByLabel(/costi aggiuntivi/i)).toHaveValue("750");
        await expect(page.getByLabel(/^anni$/i)).toHaveValue("0.25");
    });

    test("loads the English page with localized currency", async ({ page }) => {
        await page.goto(enPath);

        await expect(page.getByRole("heading", { name: /roi calculator/i })).toBeVisible();
        await expect(page.getByLabel(/initial investment/i)).toHaveValue("10000");
        await expect(page.getByLabel(/final value/i)).toHaveValue("15000");
        await expect(page.getByLabel(/additional costs/i)).toHaveValue("0");
        await expect(page.getByLabel(/^years$/i)).toHaveValue("1");
        await expect(page.getByTestId("roi-result")).toContainText("$");
    });
});
