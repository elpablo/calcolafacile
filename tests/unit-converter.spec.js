import { expect, test } from "@playwright/test";

async function seedWrongUnitConverterState(page) {
    await page.addInitScript(() => {
        window.localStorage.setItem(
            "calcolafacile:unit-converter",
            JSON.stringify({
                categoryKey: "volume",
                fromUnit: "gal",
                toUnit: "bbl",
                amount: "42",
            }),
        );
    });
}

test.describe("Unit Converter", () => {
    test("English dynamic conversion page is not overwritten by saved localStorage state", async ({ page }) => {
        await seedWrongUnitConverterState(page);

        await page.goto("/en/cm-to-inches");

        await expect(page).toHaveURL(/\/en\/cm-to-inches$/);
        await expect(page.getByRole("heading", { name: /Unit Converter/i })).toBeVisible();
        await expect(page.locator("select").first()).toHaveValue("length");
        await expect(page.locator("select").nth(1)).toHaveValue("cm");
        await expect(page.locator("select").nth(2)).toHaveValue("in");
        await expect(page.getByRole("spinbutton").first()).toHaveValue("1");
        await expect(page.getByText(/0[.,]3937/i).first()).toBeVisible();
    });

    test("Italian dynamic conversion page is not overwritten by saved localStorage state", async ({ page }) => {
        await seedWrongUnitConverterState(page);

        await page.goto("/it/cm-a-pollici");

        await expect(page).toHaveURL(/\/it\/cm-a-pollici$/);
        await expect(page.getByRole("heading", { name: /Convertitore unità/i })).toBeVisible();
        await expect(page.locator("select").first()).toHaveValue("length");
        await expect(page.locator("select").nth(1)).toHaveValue("cm");
        await expect(page.locator("select").nth(2)).toHaveValue("in");
        await expect(page.getByRole("spinbutton").first()).toHaveValue("1");
        await expect(page.getByText(/0[.,]3937/i).first()).toBeVisible();
    });

    test("main English unit converter restores saved localStorage state", async ({ page }) => {
        await seedWrongUnitConverterState(page);

        await page.goto("/en/unit-converter");

        await expect(page).toHaveURL(/\/en\/unit-converter$/);
        await expect(page.locator("select").first()).toHaveValue("volume");
        await expect(page.locator("select").nth(1)).toHaveValue("gal");
        await expect(page.locator("select").nth(2)).toHaveValue("bbl");
        await expect(page.getByRole("spinbutton").first()).toHaveValue("42");
    });

    test("switching from the main converter to an example link applies the example values", async ({ page }) => {
        await seedWrongUnitConverterState(page);

        await page.goto("/en/unit-converter");
        await expect(page.locator("select").first()).toHaveValue("volume");
        await expect(page.locator("select").nth(1)).toHaveValue("gal");

        await page.getByRole("link", { name: /Convert centimeters to inches/i }).click();

        await expect(page).toHaveURL(/\/en\/cm-to-inches$/);
        await expect(page.locator("select").first()).toHaveValue("length");
        await expect(page.locator("select").nth(1)).toHaveValue("cm");
        await expect(page.locator("select").nth(2)).toHaveValue("in");
        await expect(page.getByRole("spinbutton").first()).toHaveValue("1");
    });
});
