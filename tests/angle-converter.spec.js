import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers.js";

const itPath = "/it/convertitore-angoli";
const enPath = "/en/angle-converter";
const storageKey = "calcolafacile:angle-converter";
const resultTestId = "angle-converter-result";

function getValueInput(page) {
    return page.locator("#angle-value");
}

function getUnitSelect(page) {
    return page.locator("#angle-unit");
}

function getResultBox(page) {
    return page.getByTestId(resultTestId);
}

function getPreviewSection(page) {
    return page
        .locator("div")
        .filter({ hasText: /Angle preview|Anteprima angolo/i })
        .first();
}

async function openAngleConverter(page, lang = "en") {
    const path = lang === "it" ? itPath : enPath;

    await page.goto(path);
    await expectPageReady(page, resultTestId, storageKey);
}

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Angle Converter", () => {
    test("loads the English page and shows the default conversion", async ({ page }) => {
        await openAngleConverter(page, "en");

        await expect(page.getByRole("heading", { name: /Angle Converter/i, level: 1 })).toBeVisible();
        await expect(getValueInput(page)).toHaveValue("45");
        await expect(getUnitSelect(page)).toHaveValue("degrees");

        const resultBox = getResultBox(page);
        await expect(resultBox).toContainText(/Degrees/i);
        await expect(resultBox).toContainText("45°");
        await expect(resultBox).toContainText(/Radians/i);
        await expect(resultBox).toContainText(/0\.785398 rad/i);
        await expect(resultBox).toContainText(/Gradians/i);
        await expect(resultBox).toContainText(/50 gon/i);
        await expect(resultBox).toContainText(/Turns/i);
        await expect(resultBox).toContainText(/0\.125 turn/i);

        await expect(getPreviewSection(page)).toContainText(/Angle preview/i);
        await expect(getPreviewSection(page)).toContainText("45°");
        await expect(getPreviewSection(page)).toContainText(/Quadrant I/i);
    });

    test("converts radians to degrees", async ({ page }) => {
        await openAngleConverter(page, "en");

        await getValueInput(page).fill("3.1415926536");
        await getUnitSelect(page).selectOption("radians");

        const resultBox = getResultBox(page);
        await expect(resultBox).toContainText("180°");
        await expect(resultBox).toContainText(/3\.141593 rad/i);
        await expect(resultBox).toContainText(/200 gon/i);
        await expect(resultBox).toContainText(/0\.5 turn/i);
        await expect(getPreviewSection(page)).toContainText(/Negative X axis/i);
    });

    test("converts turns to degrees", async ({ page }) => {
        await openAngleConverter(page, "en");

        await getValueInput(page).fill("0.25");
        await getUnitSelect(page).selectOption("turns");

        const resultBox = getResultBox(page);
        await expect(resultBox).toContainText("90°");
        await expect(resultBox).toContainText(/1\.570796 rad/i);
        await expect(resultBox).toContainText(/100 gon/i);
        await expect(resultBox).toContainText(/0\.25 turn/i);
        await expect(getPreviewSection(page)).toContainText(/Positive Y axis/i);
    });

    test("loads values from English query params", async ({ page }) => {
        await page.goto(`${enPath}?value=0.5&unit=turns`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getValueInput(page)).toHaveValue("0.5");
        await expect(getUnitSelect(page)).toHaveValue("turns");
        await expect(getResultBox(page)).toContainText("180°");
        await expect(getPreviewSection(page)).toContainText(/Negative X axis/i);
    });

    test("normalizes visual preview for angles over 360 degrees", async ({ page }) => {
        await page.goto(`${enPath}?value=450&unit=degrees`);
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getValueInput(page)).toHaveValue("450");
        await expect(getResultBox(page)).toContainText("450°");
        await expect(getPreviewSection(page)).toContainText("90°");
        await expect(getPreviewSection(page)).toContainText(/Positive Y axis/i);
    });

    test("loads the Italian page with localized labels", async ({ page }) => {
        await openAngleConverter(page, "it");

        await expect(page.getByRole("heading", { name: /Convertitore angoli/i, level: 1 })).toBeVisible();
        await expect(getValueInput(page)).toHaveValue("45");
        await expect(getUnitSelect(page)).toHaveValue("degrees");

        const resultBox = getResultBox(page);
        await expect(resultBox).toContainText(/Gradi/i);
        await expect(resultBox).toContainText("45°");
        await expect(resultBox).toContainText(/Radianti/i);
        await expect(resultBox).toContainText(/0,785398 rad/i);
        await expect(resultBox).toContainText(/Gradianti/i);
        await expect(resultBox).toContainText(/50 gon/i);
        await expect(resultBox).toContainText(/Giri/i);
        await expect(resultBox).toContainText(/0,125 turn/i);

        await expect(getPreviewSection(page)).toContainText(/Anteprima angolo/i);
        await expect(getPreviewSection(page)).toContainText("45°");
        await expect(getPreviewSection(page)).toContainText(/Quadrante I/i);
    });
});