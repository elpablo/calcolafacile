import { expect, test } from "@playwright/test";
import {
    clearLocalStorageKey,
    expectPageReady,
} from "./helpers/toolTestHelpers.js";

const itPath = "/it/convertitore-fusi-orari";
const enPath = "/en/time-zone-converter";
const storageKey = "calcolafacile:time-zone-converter";
const resultTestId = "time-zone-converter-result";

function getDateInput(page) {
    return page.locator("#time-zone-date");
}

function getTimeInput(page) {
    return page.locator("#time-zone-time");
}

function getSourceSelect(page) {
    return page.locator("#time-zone-source");
}

function getTargetSelect(page, index = 0) {
    return page.locator(`#time-zone-target-${index}`);
}

function getResultBox(page) {
    return page.getByTestId(resultTestId);
}

function getTimelineSection(page) {
    return page
        .locator("section")
        .filter({ hasText: /24-hour timeline|Timeline 24 ore/i })
        .first();
}

function getResultCardsArea(page) {
    return page.locator("div.mt-6.grid.gap-4").first();
}

async function openTimeZoneConverter(page, lang = "en") {
    const path = lang === "it" ? itPath : enPath;

    await page.goto(path);
    await expectPageReady(page, resultTestId, storageKey);
}

test.beforeEach(async ({ page }) => {
    await clearLocalStorageKey(page, storageKey);
});

test.describe("Time Zone Converter", () => {
    test("loads the English page and shows the default conversion", async ({ page }) => {
        await openTimeZoneConverter(page, "en");

        await expect(
            page.getByRole("heading", { name: /Time Zone Converter/i, level: 1 }),
        ).toBeVisible();
        await expect(getDateInput(page)).toHaveValue("2026-05-24");
        await expect(getTimeInput(page)).toHaveValue("14:00");
        await expect(getSourceSelect(page)).toHaveValue("Europe/Rome");
        await expect(getTargetSelect(page, 0)).toHaveValue("UTC");

        await expect(getResultBox(page)).toContainText(/Source time/i);
        await expect(getResultBox(page)).toContainText(/14:00/);
        await expect(getResultBox(page)).toContainText(/Rome \/ Milan/i);
        await expect(getResultBox(page)).toContainText(/UTC\+02:00/i);

        await expect(getResultCardsArea(page)).toContainText(/London/i);
        await expect(getResultCardsArea(page)).toContainText(/New York/i);
        await expect(getResultCardsArea(page)).toContainText(/Tokyo/i);
        await expect(getResultCardsArea(page)).toContainText(/12:00/);
        await expect(getResultCardsArea(page)).toContainText(/08:00/);
        await expect(getResultCardsArea(page)).toContainText(/21:00/);

        await expect(getTimelineSection(page)).toBeVisible();
        await expect(getTimelineSection(page)).toContainText(/24-hour timeline/i);
        await expect(getTimelineSection(page)).toContainText(/Rome \/ Milan/i);
        await expect(getTimelineSection(page)).toContainText(/Tokyo/i);
    });

    test("loads scenario values from English query params", async ({ page }) => {
        await page.goto(
            `${enPath}?date=2026-05-24&time=18%3A00&sourceTimeZone=UTC&targetTimeZones=America%2FNew_York%2CAmerica%2FChicago%2CAmerica%2FLos_Angeles`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getDateInput(page)).toHaveValue("2026-05-24");
        await expect(getTimeInput(page)).toHaveValue("18:00");
        await expect(getSourceSelect(page)).toHaveValue("UTC");
        await expect(getTargetSelect(page, 0)).toHaveValue("America/New_York");
        await expect(getTargetSelect(page, 1)).toHaveValue("America/Chicago");
        await expect(getTargetSelect(page, 2)).toHaveValue("America/Los_Angeles");

        await expect(getResultBox(page)).toContainText(/18:00/);
        await expect(getResultCardsArea(page)).toContainText(/New York/i);
        await expect(getResultCardsArea(page)).toContainText(/Chicago/i);
        await expect(getResultCardsArea(page)).toContainText(/Los Angeles/i);
        await expect(getResultCardsArea(page)).toContainText(/14:00/);
        await expect(getResultCardsArea(page)).toContainText(/13:00/);
        await expect(getResultCardsArea(page)).toContainText(/11:00/);
    });

    test("updates target time zones from the controls", async ({ page }) => {
        await openTimeZoneConverter(page, "en");

        await getTargetSelect(page, 0).selectOption("America/Los_Angeles");

        await expect(getTargetSelect(page, 0)).toHaveValue("America/Los_Angeles");
        await expect(getResultCardsArea(page)).toContainText(/Los Angeles/i);
        await expect(getResultCardsArea(page)).toContainText(/05:00/);
        await expect(getResultCardsArea(page)).toContainText(/Night/i);
    });

    test("adds and removes a target time zone", async ({ page }) => {
        await page.goto(
            `${enPath}?date=2026-05-24&time=14%3A00&sourceTimeZone=Europe%2FRome&targetTimeZones=UTC`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getTargetSelect(page, 0)).toHaveValue("UTC");
        await expect(getTargetSelect(page, 1)).toHaveCount(0);

        await page.getByRole("button", { name: /Add time zone/i }).click();

        await expect(getTargetSelect(page, 1)).toBeVisible();
        await expect(getTargetSelect(page, 1)).not.toHaveValue("Europe/Rome");

        await page.getByRole("button", { name: /Remove time zone/i }).last().click();

        await expect(getTargetSelect(page, 1)).toHaveCount(0);
    });

    test("shows previous and next day indicators", async ({ page }) => {
        await page.goto(
            `${enPath}?date=2026-05-24&time=23%3A30&sourceTimeZone=Europe%2FRome&targetTimeZones=Asia%2FTokyo`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getResultCardsArea(page)).toContainText(/Tokyo/i);
        await expect(getResultCardsArea(page)).toContainText(/06:30/);
        await expect(getResultCardsArea(page)).toContainText(/Next day/i);

        await page.goto(
            `${enPath}?date=2026-05-24&time=01%3A30&sourceTimeZone=Europe%2FRome&targetTimeZones=America%2FLos_Angeles`,
        );
        await expectPageReady(page, resultTestId, storageKey);

        await expect(getResultCardsArea(page)).toContainText(/Los Angeles/i);
        await expect(getResultCardsArea(page)).toContainText(/16:30/);
        await expect(getResultCardsArea(page)).toContainText(/Previous day/i);
    });

    test("loads the Italian page with localized labels", async ({ page }) => {
        await openTimeZoneConverter(page, "it");

        await expect(
            page.getByRole("heading", { name: /Convertitore fusi orari/i, level: 1 }),
        ).toBeVisible();
        await expect(getDateInput(page)).toHaveValue("2026-05-24");
        await expect(getTimeInput(page)).toHaveValue("14:00");
        await expect(getSourceSelect(page)).toHaveValue("Europe/Rome");

        await expect(getResultBox(page)).toContainText(/Ora di partenza/i);
        await expect(getResultBox(page)).toContainText(/14:00/);
        await expect(getResultBox(page)).toContainText(/Roma \/ Milan/i);
        await expect(getResultBox(page)).toContainText(/UTC\+02:00/i);

        await expect(page.getByText(/Fusi orari di destinazione/i)).toBeVisible();
        await expect(getResultCardsArea(page)).toContainText(/Ore centrali/i);
        await expect(getResultCardsArea(page)).toContainText(/Giorno/i);
        await expect(getTimelineSection(page)).toContainText(/Timeline 24 ore/i);
    });
});