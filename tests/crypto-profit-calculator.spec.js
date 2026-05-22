import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers.js";

const itPath = "/it/calcolatore-profitto-crypto";
const enPath = "/en/crypto-profit-calculator";
const storageKey = "calcolafacile:crypto-profit-calculator";
const resultTestId = "crypto-profit-result";

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Crypto Profit Calculator", () => {
    test("loads the Italian page and calculates the default scenario", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /calcolatore profitto crypto/i })).toBeVisible();
        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("BTC");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("0.1");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("30000");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("65000");

        const resultBox = page.getByTestId(resultTestId);
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
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("ETH");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("2");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("1800");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("3200");
        await expect(page.getByLabel(/commissione acquisto/i)).toHaveValue("12");
        await expect(page.getByLabel(/commissione vendita/i)).toHaveValue("18");
    });

    test("updates the result when changing inputs", async ({ page }) => {
        await page.goto(itPath);
        await expectPageReady(page, resultTestId, storageKey);

        await page.getByLabel(/simbolo crypto/i).fill("SOL");
        await page.getByLabel(/quantità/i).fill("10");
        await page.getByLabel(/prezzo di acquisto/i).fill("180");
        await page.getByLabel(/prezzo di vendita/i).fill("120");
        await page.getByLabel(/commissione acquisto/i).fill("5");
        await page.getByLabel(/commissione vendita/i).fill("5");

        const resultBox = page.getByTestId(resultTestId);
        await expect(resultBox).toContainText(/perdita stimata/i);
        await expect(resultBox).toContainText(/-610/);
    });

    test("loads the Ethereum example scenario", async ({ page }) => {
        await page.goto(
            `${itPath}?cryptoSymbol=ETH&buyPrice=1800&sellPrice=3200&quantity=2&buyFee=12&sellFee=18`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByLabel(/simbolo crypto/i)).toHaveValue("ETH");
        await expect(page.getByLabel(/quantità/i)).toHaveValue("2");
        await expect(page.getByLabel(/prezzo di acquisto/i)).toHaveValue("1800");
        await expect(page.getByLabel(/prezzo di vendita/i)).toHaveValue("3200");
        await expect(page.getByLabel(/commissione acquisto/i)).toHaveValue("12");
        await expect(page.getByLabel(/commissione vendita/i)).toHaveValue("18");
    });

    test("loads the English page with localized currency", async ({ page }) => {
        await page.goto(enPath);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /crypto profit calculator/i })).toBeVisible();
        await expect(page.getByLabel(/crypto symbol/i)).toHaveValue("BTC");
        await expect(page.getByLabel(/quantity/i)).toHaveValue("0.1");
        await expect(page.getByLabel(/buy price/i)).toHaveValue("30000");
        await expect(page.getByLabel(/sell price/i)).toHaveValue("65000");
        await expect(page.getByTestId(resultTestId)).toContainText("$");
    });
});