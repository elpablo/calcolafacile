import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers";

test.describe("ISO8601 Validator", () => {
    const STORAGE_KEY = "calcolafacile:iso8601-validator";

    test("validates a correct ISO8601 datetime", async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
        await page.goto("/en/iso8601-validator");
        await expectPageReady(page, "iso8601-value", STORAGE_KEY);

        const input = page.getByTestId("iso8601-value");
        await input.fill("2026-05-17T14:30:00+02:00");

        const result = page.getByTestId("iso8601-result");

        await expect(result).toContainText("Valid ISO8601 value");
        await expect(result).toContainText("2026-05-17T14:30:00+02:00");
        await expect(result).toContainText("2026-05-17T12:30:00.000Z");
    });

    test("shows an error for invalid values", async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
        await page.goto("/en/iso8601-validator");
        await expectPageReady(page, "iso8601-value", STORAGE_KEY);

        const input = page.getByTestId("iso8601-value");
        await input.fill("2026-13-99T99:99:99");

        const result = page.getByTestId("iso8601-result");

        await expect(result).toContainText("Invalid ISO8601 value");
    });

    test("loads example values", async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
        await page.goto("/en/iso8601-validator");
        await expectPageReady(page, "iso8601-value", STORAGE_KEY);

        await page.getByRole("button", { name: "2026-05-17T14:30:00Z" }).click();

        const input = page.getByTestId("iso8601-value");
        await expect(input).toHaveValue("2026-05-17T14:30:00Z");

        const result = page.getByTestId("iso8601-result");
        await expect(result).toContainText("Valid ISO8601 value");
    });

    test("clears the input", async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
        await page.goto("/en/iso8601-validator");
        await expectPageReady(page, "iso8601-value", STORAGE_KEY);

        await page.getByRole("button", { name: "Clear" }).click();

        const input = page.getByTestId("iso8601-value");
        await expect(input).toHaveValue("");

        const result = page.getByTestId("iso8601-result");
        await expect(result).toContainText("Invalid ISO8601 value");
    });
});