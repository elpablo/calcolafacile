import { expect } from "@playwright/test";

export async function clearLocalStorageKey(page, key) {
    await page.addInitScript((storageKey) => {
        window.localStorage.removeItem(storageKey);
    }, key);
}

export async function waitForLocalStorageKey(page, key) {
    await page.waitForFunction((storageKey) => {
        return window.localStorage.getItem(storageKey) !== null;
    }, key);
}

export async function expectPageReady(page, testId, storageKey) {
    await expect(page.getByTestId(testId)).toBeVisible();

    if (storageKey) {
        await waitForLocalStorageKey(page, storageKey);
    }
}
