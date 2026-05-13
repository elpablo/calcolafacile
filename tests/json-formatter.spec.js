import { expect, test } from "@playwright/test";

const sampleJson = JSON.stringify({
    user: {
        id: 123,
        name: "Ada Lovelace",
        roles: ["admin", "developer"],
    },
    active: true,
});

const expectSlow = { timeout: 15000 };

async function openJsonFormatter(page, lang = "en") {
    await page.goto(lang === "it" ? "/it/json-formatter" : "/en/json-formatter", {
        waitUntil: 'networkidle',
    });
}

async function getJsonTextarea(page) {
    return page.locator("textarea").first();
}

test.describe("JSON Formatter", () => {
    test("formats valid JSON in pretty view", async ({ page }) => {
        await openJsonFormatter(page, "en");

        const textarea = await getJsonTextarea(page);
        await textarea.fill(sampleJson);
        await expect(textarea).toHaveValue(sampleJson, expectSlow);
        await page.getByRole("button", { name: /Pretty view/i }).click();

        await expect(page.getByText(/Formatted for readability/i)).toBeVisible(expectSlow);
        await expect(page.getByRole("button", { name: /Copy result/i })).toBeVisible(expectSlow);
    });

    test("switches to minified view", async ({ page }) => {
        await openJsonFormatter(page, "en");

        const textarea = await getJsonTextarea(page);
        await textarea.fill(sampleJson);
        await expect(textarea).toHaveValue(sampleJson, expectSlow);
        await page.getByRole("button", { name: /Minified view/i }).click();

        await expect(page.getByText(/Minified for compact payloads/i)).toBeVisible(expectSlow);
        await expect(page.getByRole("button", { name: /Copy result/i })).toBeVisible(expectSlow);
    });

    test("shows an error for invalid JSON", async ({ page }) => {
        await openJsonFormatter(page, "en");

        const textarea = await getJsonTextarea(page);
        await textarea.fill('{"user":');
        await expect(textarea).toHaveValue('{"user":', expectSlow);

        await expect(page.getByText(/Invalid JSON:/i)).toBeVisible(expectSlow);
    });

    test("loads JSON content from a dropped file", async ({ page }) => {
        await openJsonFormatter(page, "en");

        const textarea = await getJsonTextarea(page);

        const dataTransfer = await page.evaluateHandle((jsonText) => {
            const data = new DataTransfer();
            const file = new File([jsonText], "sample.json", {
                type: "application/json",
            });
            data.items.add(file);
            return data;
        }, sampleJson);

        await textarea.dispatchEvent("dragover", { dataTransfer });
        await textarea.dispatchEvent("drop", { dataTransfer });

        await expect(textarea).toHaveValue(sampleJson);
        await expect(page.getByText(/Formatted for readability/i)).toBeVisible(expectSlow);
        await expect(page.getByRole("button", { name: /Copy result/i })).toBeVisible(expectSlow);
    });

    test("Italian page formats valid JSON", async ({ page }) => {
        await openJsonFormatter(page, "it");

        const textarea = await getJsonTextarea(page);
        await textarea.fill(sampleJson);
        await expect(textarea).toHaveValue(sampleJson, expectSlow);
        await page.getByRole("button", { name: /Vista leggibile/i }).click();

        await expect(page.getByText(/Formattato per la leggibilità/i)).toBeVisible(expectSlow);
        await expect(page.getByRole("button", { name: /Copia risultato/i })).toBeVisible(expectSlow);
    });
});
