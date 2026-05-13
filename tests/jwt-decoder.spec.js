import { expect, test } from "@playwright/test";

const validJwt = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "eyJzdWIiOiJ1c2VyXzEyMyIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjo0MTAyNDQ0ODAwfQ",
    "signature",
].join(".");

const expiredJwt = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "eyJzdWIiOiJvbGRfdXNlciIsImV4cCI6MTcwMDAwMDAwMH0",
    "signature",
].join(".");

async function openJwtDecoder(page, lang = "en") {
    await page.goto(lang === "it" ? "/it/jwt-decoder" : "/en/jwt-decoder", {
        waitUntil: 'networkidle',
    });
}

async function getTokenTextarea(page) {
    return page.locator("textarea").first();
}

const expectSlow = { timeout: 15000 };

test.describe("JWT Decoder", () => {
    test("decodes a valid JWT token", async ({ page }) => {
        await openJwtDecoder(page, "en");

        const textarea = await getTokenTextarea(page);
        await textarea.fill(validJwt);
        await expect(textarea).toHaveValue(validJwt, expectSlow);

        await expect(page.getByText(/test@example\.com/i)).toBeVisible(expectSlow);
        await expect(page.getByText(/user_123/i)).toBeVisible(expectSlow);
        await expect(page.getByText(/HS256/i)).toBeVisible(expectSlow);
    });

    test("shows an error for malformed tokens", async ({ page }) => {
        await openJwtDecoder(page, "en");

        const textarea = await getTokenTextarea(page);
        await textarea.fill("this-is-not-a-jwt");
        await expect(textarea).toHaveValue("this-is-not-a-jwt", expectSlow);

        await expect(page.getByText(/The token must contain at least/i)).toBeVisible(expectSlow);
    });

    test("shows expired status for expired JWT token", async ({ page }) => {
        await openJwtDecoder(page, "en");

        const textarea = await getTokenTextarea(page);
        await textarea.fill(expiredJwt);
        await expect(textarea).toHaveValue(expiredJwt, expectSlow);

        await expect(page.getByText('Token expired')).toBeVisible(expectSlow);
        await expect(page.getByText(/old_user/i)).toBeVisible(expectSlow);
    });

    test("restores the last token from localStorage", async ({ page }) => {
        await page.addInitScript((token) => {
            window.localStorage.setItem(
                "calcolafacile:jwt-decoder",
                JSON.stringify({ token }),
            );
        }, validJwt);

        await openJwtDecoder(page, "en");

        const textarea = await getTokenTextarea(page);
        await expect(textarea).toHaveValue(validJwt, expectSlow);
        await expect(page.getByText(/test@example\.com/i)).toBeVisible(expectSlow);
    });

    test("URL example takes priority over saved localStorage state", async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem(
                "calcolafacile:jwt-decoder",
                JSON.stringify({ token: "this-is-not-a-jwt" }),
            );
        });

        await page.goto("/en/jwt-decoder?example=validToken", {
            waitUntil: 'networkidle',
        });

        const textarea = await getTokenTextarea(page);
        await expect(textarea).not.toHaveValue("this-is-not-a-jwt", expectSlow);
        await expect(page.getByText(/The token must contain at least/i)).toHaveCount(0);
    });

    test("Italian page decodes a valid JWT token", async ({ page }) => {
        await openJwtDecoder(page, "it");

        const textarea = await getTokenTextarea(page);
        await textarea.fill(validJwt);
        await expect(textarea).toHaveValue(validJwt, expectSlow);

        await expect(page.getByText(/test@example\.com/i)).toBeVisible(expectSlow);
        await expect(page.getByText(/user_123/i)).toBeVisible(expectSlow);
        await expect(page.getByText(/HS256/i)).toBeVisible(expectSlow);
    });
});
