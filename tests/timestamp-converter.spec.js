import { expect, test } from "@playwright/test";
import { clearLocalStorageKey } from "./helpers/toolTestHelpers.js";

const itPath = "/it/timestamp-converter";
const enPath = "/en/timestamp-converter";
const storageKey = "calcolafacile:timestamp-converter";
const resultTestId = "timestamp-converter-result";

function getResultBox(page) {
    return page.getByTestId(resultTestId);
}

function getVisibleTextInput(page) {
    return page.locator('input:not([type="radio"]):visible').first();
}

function getTimestampInput(page) {
    return getVisibleTextInput(page);
}

function getTimestampUnitSelect(page) {
    return page.locator("select:visible").first();
}

function getDateTimeInput(page) {
    return getVisibleTextInput(page);
}

async function selectMode(page, name) {
    const radio = page.getByRole("radio", { name }).first();

    if ((await radio.count()) > 0) {
        await radio.click();
        return;
    }

    const button = page.getByRole("button", { name }).first();

    if ((await button.count()) > 0) {
        await button.click();
        return;
    }

    await page.getByText(name).first().click();
}

async function openTimestampConverter(page, lang = "en") {
    const path = lang === "it" ? itPath : enPath;

    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    await expect(getResultBox(page)).toBeVisible();

    if (storageKey) {
        await page.waitForFunction(
            (key) => window.localStorage.getItem(key) !== null,
            storageKey,
        );
    }
}

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Timestamp Converter", () => {
    test("loads the English page and converts seconds to date", async ({ page }) => {
        await openTimestampConverter(page, "en");

        await expect(
            page.getByRole("heading", { name: /Timestamp Converter/i, level: 1 }),
        ).toBeVisible();
        await expect(getTimestampInput(page)).toBeVisible();
        await expect(getTimestampUnitSelect(page)).toHaveValue("seconds");

        await getTimestampInput(page).fill("1748520000");

        const result = getResultBox(page);
        await expect(result).toContainText(/Local date(?:\/| and )time/i);
        await expect(result).toContainText(/UTC date(?:\/| and )time/i);
        await expect(result).toContainText(/ISO/i);
        await expect(result).toContainText(/2025-05-29T12:00:00\.000Z/i);
        await expect(result).toContainText(/Seconds/i);
        await expect(result).toContainText(/1748520000/i);
        await expect(result).toContainText(/Milliseconds/i);
        await expect(result).toContainText(/1748520000000/i);
        await expect(result).not.toContainText(/1,748,520,000/i);
    });

    test("converts milliseconds to date", async ({ page }) => {
        await openTimestampConverter(page, "en");

        await getTimestampUnitSelect(page).selectOption("milliseconds");
        await getTimestampInput(page).fill("1748520000000");

        const result = getResultBox(page);
        await expect(result).toContainText(/2025-05-29T12:00:00\.000Z/i);
        await expect(result).toContainText(/1748520000/i);
        await expect(result).toContainText(/1748520000000/i);
    });

    test("converts English date input to raw timestamps", async ({ page }) => {
        await openTimestampConverter(page, "en");
        await selectMode(page, /Date\s*(?:→|to)\s*Timestamp/i);

        await getDateTimeInput(page).fill("05/29/2025 14:30");

        const result = getResultBox(page);
        await expect(result).toContainText(/Seconds/i);
        await expect(result).toContainText(/Milliseconds/i);
        await expect(result).not.toContainText(/\d,\d{3}/);
    });

    test("shows an error for invalid timestamp input", async ({ page }) => {
        await openTimestampConverter(page, "en");

        await getTimestampInput(page).fill("123.45");

        await expect(page.getByText(/Invalid timestamp/i)).toBeVisible();
    });

    test("shows an error for invalid date input", async ({ page }) => {
        await openTimestampConverter(page, "en");
        await selectMode(page, /Date\s*(?:→|to)\s*Timestamp/i);

        await getDateTimeInput(page).fill("02/31/2025 12:00");

        await expect(page.getByText(/Invalid date/i)).toBeVisible();
    });

    test("uses the Now button to populate both inputs", async ({ page }) => {
        await openTimestampConverter(page, "en");

        await page.getByRole("button", { name: /Now/i }).click();

        await expect(getTimestampUnitSelect(page)).toHaveValue("seconds");
        await expect(getTimestampInput(page)).not.toHaveValue("");
        await selectMode(page, /Date\s*(?:→|to)\s*Timestamp/i);
        await expect(getDateTimeInput(page)).not.toHaveValue("");
    });

    test("loads the Italian page and converts Italian date input", async ({ page }) => {
        await openTimestampConverter(page, "it");

        await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
        await selectMode(page, /Data\s*(?:→|a)\s*Timestamp/i);

        await getDateTimeInput(page).fill("29/05/2025 14:30");

        const result = getResultBox(page);
        await expect(result).toContainText(/Secondi/i);
        await expect(result).toContainText(/Millisecondi/i);
        await expect(result).not.toContainText(/1[.,]748[.,]/);
    });
});