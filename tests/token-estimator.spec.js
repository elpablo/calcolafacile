import { expect, test } from "@playwright/test";
import { clearLocalStorageKey, expectPageReady } from "./helpers/toolTestHelpers";

const STORAGE_KEY = "calcolafacile:token-estimator";
// A modelKey that used to exist in the AI model catalog but has since been
// removed, simulating state persisted by a user before the catalog update.
const REMOVED_LEGACY_MODEL_KEY = "gpt-4o-mini";
const CURRENT_SAMPLE_MODEL_KEY = "gpt-5.6-luna";
const VALID_MODEL_KEY = "claude-opus-5";

function getModelSelect(page) {
    return page.getByTestId("token-estimator-model");
}

function getResultBox(page) {
    return page.getByTestId("token-estimator-result");
}

async function seedLocalStorageState(page, payload) {
    await page.addInitScript(
        ([storageKey, value]) => {
            window.localStorage.setItem(storageKey, value);
        },
        [STORAGE_KEY, JSON.stringify(payload)],
    );
}

async function readStoredState(page) {
    return page.evaluate((storageKey) => {
        const raw = window.localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
}

test.describe("LLM Token Estimator - legacy modelKey compatibility", () => {
    test.beforeEach(async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
    });

    test("English route recovers from a removed persisted modelKey", async ({ page }) => {
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await seedLocalStorageState(page, {
            text: "Legacy state regression test",
            modelKey: REMOVED_LEGACY_MODEL_KEY,
            estimatedOutputTokens: "250",
        });

        await page.goto("/en/token-estimator");
        await expectPageReady(page, "token-estimator-model", STORAGE_KEY);

        expect(pageErrors).toEqual([]);

        await expect(getModelSelect(page)).not.toHaveValue(REMOVED_LEGACY_MODEL_KEY);
        await expect(getModelSelect(page)).toHaveValue(CURRENT_SAMPLE_MODEL_KEY);
        await expect(getResultBox(page)).toBeVisible();
        await expect(getResultBox(page)).toContainText(/\$|USD/);

        await page.waitForFunction(
            ([storageKey, removedKey]) => {
                const raw = window.localStorage.getItem(storageKey);
                if (!raw) return false;
                try {
                    return JSON.parse(raw).modelKey !== removedKey;
                } catch {
                    return false;
                }
            },
            [STORAGE_KEY, REMOVED_LEGACY_MODEL_KEY],
        );

        const stored = await readStoredState(page);
        expect(stored.modelKey).toBe(CURRENT_SAMPLE_MODEL_KEY);
        expect(stored.text).toBe("Legacy state regression test");
    });

    test("Italian route recovers from the same removed persisted modelKey", async ({ page }) => {
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await seedLocalStorageState(page, {
            text: "Test di stato legacy",
            modelKey: REMOVED_LEGACY_MODEL_KEY,
            estimatedOutputTokens: "250",
        });

        await page.goto("/it/token-estimator");
        await expectPageReady(page, "token-estimator-model", STORAGE_KEY);

        expect(pageErrors).toEqual([]);

        await expect(getModelSelect(page)).not.toHaveValue(REMOVED_LEGACY_MODEL_KEY);
        await expect(getModelSelect(page)).toHaveValue(CURRENT_SAMPLE_MODEL_KEY);
        await expect(getResultBox(page)).toBeVisible();
        await expect(getResultBox(page)).toContainText(/\$|USD/);

        await page.waitForFunction(
            ([storageKey, removedKey]) => {
                const raw = window.localStorage.getItem(storageKey);
                if (!raw) return false;
                try {
                    return JSON.parse(raw).modelKey !== removedKey;
                } catch {
                    return false;
                }
            },
            [STORAGE_KEY, REMOVED_LEGACY_MODEL_KEY],
        );

        const stored = await readStoredState(page);
        expect(stored.modelKey).toBe(CURRENT_SAMPLE_MODEL_KEY);
        expect(stored.text).toBe("Test di stato legacy");
    });

    test("a valid persisted modelKey remains selected and is not replaced", async ({ page }) => {
        await seedLocalStorageState(page, {
            text: "Keep my valid model",
            modelKey: VALID_MODEL_KEY,
            estimatedOutputTokens: "300",
        });

        await page.goto("/en/token-estimator");
        await expectPageReady(page, "token-estimator-model", STORAGE_KEY);

        await expect(getModelSelect(page)).toHaveValue(VALID_MODEL_KEY);
        await expect(getResultBox(page)).toBeVisible();

        const stored = await readStoredState(page);
        expect(stored.modelKey).toBe(VALID_MODEL_KEY);
        expect(stored.text).toBe("Keep my valid model");
        expect(stored.estimatedOutputTokens).toBe("300");
    });
});
