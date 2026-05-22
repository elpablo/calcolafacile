import { expect, test } from "@playwright/test";

const itPath = "/it/calcolatore-profitto-crypto";
const enPath = "/en/crypto-profit-calculator";

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.removeItem("calcolafacile:crypto-profit-calculator");
    });
});

test.describe("Crypto Profit Calculator", () => {
    test("loads the Italian page and calculates the default scenario", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByRole("heading", { name: /calcolatore profitto crypto/i })).toBeVisible();
        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("BTC");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("0.1");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("30000");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("65000");

        const resultBox = page.getByTestId("crypto-profit-result");
        await expect(resultBox).toBeVisible();
        await expect(resultBox.getByText(/profitto stimato/i)).toBeVisible();
        await expect(resultBox.getByText(/roi/i)).toBeVisible();
        await expect(resultBox.getByText(/costo totale/i)).toBeVisible();
        await expect(resultBox.getByText(/prezzo di pareggio/i)).toBeVisible();
    });

    test("loads values from Italian query params", async ({ page }) => {
        await page.goto(
            `${itPath}?cryptoSymbol=ETH&buyPrice=1800&sellPrice=3200&quantity=2&buyFee=12&sellFee=18`,
        );

        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("ETH");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("2");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("1800");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("3200");
        await expect(page.getByLabel(/commissione acquisto/i)).toHaveValue("12");
        await expect(page.getByLabel(/commissione vendita/i)).toHaveValue("18");
    });

    test("updates the result when changing inputs", async ({ page }) => {
        await page.goto(itPath);

        await page.getByLabel(/simbolo crypto/i).fill("SOL");
        await page.getByLabel(/quantità/i).fill("10");
        await page.getByLabel(/prezzo di acquisto/i).fill("180");
        await page.getByLabel(/prezzo di vendita/i).fill("120");
        await page.getByLabel(/commissione acquisto/i).fill("5");
        await page.getByLabel(/commissione vendita/i).fill("5");

        const resultBox = page.getByTestId("crypto-profit-result");
        await expect(resultBox).toContainText(/perdita stimata/i);
        await expect(resultBox).toContainText(/-610/);
    });

    test("applies example presets", async ({ page }) => {
        await page.goto(itPath);

        await page.getByRole("button", { name: /ethereum with fees/i }).click();

        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("ETH");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("2");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("1800");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("3200");
    });

    test("loads the English page with localized currency", async ({ page }) => {
        await page.goto(enPath);

        await expect(page.getByRole("heading", { name: /crypto profit calculator/i })).toBeVisible();
        await expect(page.getByLabel(/crypto symbol/i)).toHaveValue("BTC");
        await expect(page.getByLabel(/quantity/i)).toHaveValue("0.1");
        await expect(page.getByLabel(/buy price/i)).toHaveValue("30000");
        await expect(page.getByLabel(/sell price/i)).toHaveValue("65000");
        await expect(page.getByTestId("crypto-profit-result")).toContainText("$");
    });
});