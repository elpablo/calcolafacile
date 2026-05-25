import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers.js";

const itPath = "/it/convertitore-coordinate";
const enPath = "/en/coordinate-converter";
const storageKey = "calcolafacile:coordinate-converter";
const singleResultTestId = "coordinate-converter-result";
const pathResultTestId = "coordinate-path-result";
const importResultTestId = "coordinate-geojson-result";

function getLatitudeInput(page) {
    return page.locator("#coordinate-latitude");
}

function getLongitudeInput(page) {
    return page.locator("#coordinate-longitude");
}

function getInputModeSelect(page) {
    return page.locator("#coordinate-input-mode");
}

function getLatitudeDmsInput(page) {
    return page.locator("#coordinate-latitude-dms");
}

function getLongitudeDmsInput(page) {
    return page.locator("#coordinate-longitude-dms");
}

function getPathLatitudeInput(page, index = 0) {
    return page.locator(`#path-latitude-${index}`);
}

function getPathLongitudeInput(page, index = 0) {
    return page.locator(`#path-longitude-${index}`);
}

function getImportTextarea(page) {
    return page.locator("textarea").first();
}

async function openCoordinateConverter(page, lang = "en") {
    const path = lang === "it" ? itPath : enPath;

    await page.goto(path);
    await expectPageReady(page, singleResultTestId, storageKey);
}

async function openTab(page, name) {
    await page.getByRole("button", { name }).click();
}

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Coordinate Converter", () => {
    test("loads the English page and shows the default single coordinate conversion", async ({ page }) => {
        await openCoordinateConverter(page, "en");

        await expect(
            page.getByRole("heading", { name: /GPS Coordinate Converter/i, level: 1 }),
        ).toBeVisible();
        await expect(getInputModeSelect(page)).toHaveValue("decimal");
        await expect(getLatitudeInput(page)).toHaveValue("44.4949");
        await expect(getLongitudeInput(page)).toHaveValue("11.3426");

        const result = page.getByTestId(singleResultTestId);
        await expect(result).toContainText(/Decimal degrees/i);
        await expect(result).toContainText(/44\.4949, 11\.3426/i);
        await expect(result).toContainText(/44° 29' 41\.64" N/i);
        await expect(result).toContainText(/11° 20' 33\.36" E/i);
        await expect(result).toContainText(/Open in Google Maps/i);
        await expect(result).toContainText(/Open in OpenStreetMap/i);
    });

    test("converts DMS input to decimal coordinates", async ({ page }) => {
        await openCoordinateConverter(page, "en");

        await getInputModeSelect(page).selectOption("dms");
        await getLatitudeDmsInput(page).fill('45° 27\' 51.12" N');
        await getLongitudeDmsInput(page).fill('9° 11\' 24" E');

        const result = page.getByTestId(singleResultTestId);
        await expect(result).toContainText(/45\.4642, 9\.19/i);
        await expect(result).toContainText(/45° 27' 51\.12" N/i);
        await expect(result).toContainText(/9° 11' 24" E/i);
    });

    test("loads query params and keeps the requested tab active", async ({ page }) => {
        await page.goto(`${enPath}?tab=single&latitude=45.4642&longitude=9.19`);
        await expectPageReady(page, singleResultTestId, storageKey);

        await expect(getLatitudeInput(page)).toHaveValue("45.4642");
        await expect(getLongitudeInput(page)).toHaveValue("9.19");
        await expect(page.getByTestId(singleResultTestId)).toContainText(/45\.4642, 9\.19/i);

        await page.goto(`${enPath}?tab=path&latitude=45.4642&longitude=9.19`);
        await expectPageReady(page, pathResultTestId, storageKey);

        await expect(page.getByRole("heading", { name: /Path builder/i })).toBeVisible();
        await expect(page.getByTestId(pathResultTestId)).toContainText(/Path preview/i);
    });

    test("uses the path builder tab to add and remove points", async ({ page }) => {
        await openCoordinateConverter(page, "en");
        await openTab(page, /Path builder/i);

        await expect(page.getByRole("heading", { name: /Path builder/i })).toBeVisible();
        await expect(getPathLatitudeInput(page, 0)).toHaveValue("44.4949");
        await expect(getPathLongitudeInput(page, 0)).toHaveValue("11.3426");
        await expect(page.getByText(/^2$/).first()).toBeVisible();

        await page.getByRole("button", { name: /Add point/i }).click();

        await expect(getPathLatitudeInput(page, 2)).toBeVisible();
        await expect(page.getByText(/^3$/).first()).toBeVisible();
        await expect(page.getByTestId(pathResultTestId)).toContainText(/3 pts/i);

        await page.getByRole("button", { name: /Remove/i }).last().click();

        await expect(getPathLatitudeInput(page, 2)).toHaveCount(0);
        await expect(page.getByText(/^2$/).first()).toBeVisible();
        await expect(page.getByTestId(pathResultTestId)).toContainText(/2 pts/i);
    });

    test("imports CSV coordinates and generates GeoJSON only after import", async ({ page }) => {
        await openCoordinateConverter(page, "en");
        await openTab(page, /Import \/ Export/i);

        await expect(page.getByTestId(importResultTestId)).toContainText(
            /Import or paste coordinates to generate GeoJSON output(?: here)?/i,
        );

        await getImportTextarea(page).fill("44.4949, 11.3426\n44.5075, 11.3514");
        await page.getByRole("button", { name: /Import coordinates/i }).click();

        const result = page.getByTestId(importResultTestId);
        await expect(page.getByText(/Imported 2 coordinate points/i)).toBeVisible();
        await expect(result).toContainText(/"type": "LineString"/i);
        await expect(result).toContainText(/11\.3426/);
        await expect(result).toContainText(/44\.5075/);
    });

    test("shows an error for invalid import content", async ({ page }) => {
        await openCoordinateConverter(page, "en");
        await openTab(page, /Import \/ Export/i);

        await getImportTextarea(page).fill("this is not a coordinate file");
        await page.getByRole("button", { name: /Import coordinates/i }).click();

        await expect(page.getByText(/No valid coordinates found/i)).toBeVisible();
        await expect(page.getByTestId(importResultTestId)).toContainText(
            /Import or paste coordinates to generate GeoJSON output(?: here)?/i,
        );
    });

    test("loads the Italian page with localized labels", async ({ page }) => {
        await openCoordinateConverter(page, "it");

        await expect(
            page.getByRole("heading", { name: /Convertitore coordinate GPS/i, level: 1 }),
        ).toBeVisible();
        await expect(page.getByRole("button", { name: /Coordinata singola/i })).toBeVisible();
        await expect(page.getByRole("button", { name: /Costruttore percorso/i })).toBeVisible();
        await expect(page.getByRole("button", { name: /Importa \/ Esporta/i })).toBeVisible();

        await expect(page.getByTestId(singleResultTestId)).toContainText(/Gradi decimali/i);
        await expect(page.getByTestId(singleResultTestId)).toContainText(/Apri in Google Maps/i);

        await openTab(page, /Costruttore percorso/i);
        await expect(page.getByRole("button", { name: /Aggiungi punto/i })).toBeVisible();
        await expect(page.getByTestId(pathResultTestId)).toContainText(/Anteprima percorso/i);

        await openTab(page, /Importa \/ Esporta/i);
        await expect(page.getByText(/Importa coordinate/i)).toBeVisible();
        await expect(page.getByTestId(importResultTestId)).toContainText(
            /Importa o incolla coordinate per generare(?: qui)? l'output GeoJSON/i,
        );
    });
});