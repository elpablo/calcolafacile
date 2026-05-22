import { expect, test } from "@playwright/test";

const itPath = "/it/test-regex";
const enPath = "/en/regex-tester";

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.removeItem("calcolafacile:regex-tester");
    });
});

test.describe("Regex Tester", () => {
    test("loads the Italian page and shows default matches", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByRole("heading", { name: /test regex/i })).toBeVisible();
        await expect(page.getByLabel(/pattern regex/i)).toHaveValue(
            String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,
        );
        await expect(page.getByLabel(/testo di prova/i)).toContainText(
            "info@example.com",
        );

        const resultBox = page.getByTestId("regex-result");
        await expect(resultBox).toBeVisible();
        await expect(resultBox).toContainText(/match trovati/i);
        await expect(resultBox).toContainText("2");
        await expect(resultBox).toContainText("info@example.com");
        await expect(resultBox).toContainText("support@calcolafacile.org");

        await expect(page.getByText(/anteprima evidenziata/i)).toBeVisible();
    });

    test("loads values from Italian query params", async ({ page }) => {
        await page.goto(
            `${itPath}?pattern=%5Cd%2B&flags=g&testText=123%20abc%20456`,
        );

        await expect(page.getByLabel(/pattern regex/i)).toHaveValue(String.raw`\d+`);
        await expect(page.getByLabel(/testo di prova/i)).toHaveValue("123 abc 456");
        await expect(page.getByTestId("regex-result")).toContainText(/match trovati/i);
        await expect(page.getByTestId("regex-result")).toContainText("123");
        await expect(page.getByTestId("regex-result")).toContainText("456");
    });

    test("shows invalid regex errors", async ({ page }) => {
        await page.goto(`${itPath}?pattern=%28&flags=g&testText=test`);

        await expect(page.locator("#regex-pattern")).toHaveValue("(");

        const resultBox = page.getByTestId("regex-result");
        await expect(resultBox).toContainText(/espressione regolare non valida/i);
    });

    test("toggles pattern library and applies a named groups pattern", async ({ page }) => {
        await page.goto(itPath);

        await expect(page.getByText(/libreria pattern/i)).toBeVisible();
        await expect(page.getByRole("button", { name: /espandi/i })).toBeVisible();
        await expect(page.getByRole("button", { name: /named groups/i })).toHaveCount(0);

        await page.getByRole("button", { name: /espandi/i }).click();

        await expect(page.getByRole("button", { name: /comprimi/i })).toBeVisible();
        await page.getByRole("button", { name: /named groups/i }).click();

        await expect(page.getByLabel(/pattern regex/i)).toHaveValue(
            String.raw`(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})`,
        );
        await expect(page.getByTestId("regex-result")).toContainText("year: 2026");
        await expect(page.getByTestId("regex-result")).toContainText("month: 05");
        await expect(page.getByTestId("regex-result")).toContainText("day: 22");
    });

    test("shows matches for a custom pattern and text", async ({ page }) => {
        await page.goto(
            `${itPath}?pattern=%5B0-9%5D%7B4%7D&flags=g&testText=Years%3A%202024%2C%202025%20and%202026`,
        );

        await expect(page.locator("#regex-pattern")).toHaveValue("[0-9]{4}");
        await expect(page.locator("#regex-test-text")).toHaveValue(
            "Years: 2024, 2025 and 2026",
        );

        const resultBox = page.getByTestId("regex-result");
        await expect(resultBox).toContainText(/match trovati/i);
        await expect(resultBox).toContainText("2024");
        await expect(resultBox).toContainText("2025");
        await expect(resultBox).toContainText("2026");
    });

    test("loads the English page", async ({ page }) => {
        await page.goto(enPath);

        await expect(page.getByRole("heading", { name: "Regex Tester", level: 1 })).toBeVisible();
        await expect(page.getByLabel(/regex pattern/i)).toHaveValue(
            String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,
        );
        await expect(page.getByText(/highlighted preview/i)).toBeVisible();
        await expect(page.getByRole("button", { name: /pattern library/i })).toBeVisible();
    });
});