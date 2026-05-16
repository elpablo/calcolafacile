import { expect, test } from "@playwright/test";
import { expectPageReady } from "./helpers/toolTestHelpers";

const STORAGE_KEY = "calcolafacile:ai-cost-calculator";

async function openAiCostCalculator(page, lang = "en") {
    const path = lang === "it" ? "/it/calcolatore-costi-ai" : "/en/ai-cost-calculator";

    await page.goto(path);
    await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);
    await page.evaluate((storageKey) => {
        window.localStorage.removeItem(storageKey);
    }, STORAGE_KEY);
    await page.reload();
    await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);
}

function getProviderSelect(page) {
    return page.getByTestId("ai-cost-provider");
}

function getModelSelect(page) {
    return page.getByTestId("ai-cost-model");
}

function getInputTokensInput(page) {
    return page.getByTestId("ai-cost-input-tokens");
}

function getOutputTokensInput(page) {
    return page.getByTestId("ai-cost-output-tokens");
}

function getRequestsPerDayInput(page) {
    return page.getByTestId("ai-cost-requests-per-day");
}

function getResultCard(page, testId) {
    return page.getByTestId(testId);
}

async function fillCostScenario(page, {
    inputTokens = "10000",
    outputTokens = "5000",
    requestsPerDay = "100",
} = {}) {
    await getInputTokensInput(page).fill(inputTokens);
    await getOutputTokensInput(page).fill(outputTokens);
    await getRequestsPerDayInput(page).fill(requestsPerDay);
}

test.describe("AI Cost Calculator", () => {

    test("loads the English page and shows the default cost estimate", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await expect(page).toHaveURL(/\/en\/ai-cost-calculator$/);
        await expect(page.getByRole("heading", { name: /AI Cost Calculator/i })).toBeVisible();
        await expect(getProviderSelect(page)).toHaveValue("openai");
        await expect(getModelSelect(page)).toHaveValue("gpt-5.5");
        await expect(page.getByText(/^Cost per request$/i)).toBeVisible();
        await expect(page.getByText(/Pricing disclaimer/i)).toBeVisible();
    });

    test("calculates costs when token values change", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await fillCostScenario(page, {
            inputTokens: "1000000",
            outputTokens: "1000000",
            requestsPerDay: "10",
        });

        await expect(getResultCard(page, "ai-cost-input-cost-content")).toContainText(/5([.,]00)?/);
        await expect(getResultCard(page, "ai-cost-output-cost-content")).toContainText(/30([.,]00)?/);
        await expect(getResultCard(page, "ai-cost-request-cost-content")).toContainText(/35([.,]00)?/);
        await expect(getResultCard(page, "ai-cost-daily-cost-content")).toContainText(/350([.,]00)?/);
        await expect(getResultCard(page, "ai-cost-monthly-cost-content")).toContainText(/10[.,\s]?500([.,]00)?|10500([.,]00)?/);
    });

    test("switches provider and model", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await getProviderSelect(page).selectOption("anthropic");
        await expect(getProviderSelect(page)).toHaveValue("anthropic");

        await expect(getModelSelect(page)).toHaveValue("claude-opus-4.7");
        await getModelSelect(page).selectOption("claude-haiku-4.5");
        await expect(getModelSelect(page)).toHaveValue("claude-haiku-4.5");
    });

    test("persists the last scenario after reload", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await getProviderSelect(page).selectOption("google");
        await expect(getProviderSelect(page)).toHaveValue("google");
        await expect(getModelSelect(page)).toHaveValue("gemini-2.5-pro");

        await fillCostScenario(page, {
            inputTokens: "12345",
            outputTokens: "6789",
            requestsPerDay: "42",
        });
        await page.waitForFunction(
            ([storageKey, providerKey]) => {
                const rawValue = window.localStorage.getItem(storageKey);

                if (!rawValue) {
                    return false;
                }

                try {
                    const stored = JSON.parse(rawValue);
                    return stored?.providerKey === providerKey;
                } catch {
                    return false;
                }
            },
            [STORAGE_KEY, "google"],
        );

        await page.reload();

        await expect(getProviderSelect(page)).toHaveValue("google");
        await expect(getModelSelect(page)).toHaveValue("gemini-2.5-pro");
        await expect(getInputTokensInput(page)).toHaveValue("12345");
        await expect(getOutputTokensInput(page)).toHaveValue("6789");
        await expect(getRequestsPerDayInput(page)).toHaveValue("42");
    });

    test("loads the Italian page with localized chrome", async ({ page }) => {
        await openAiCostCalculator(page, "it");

        await expect(page).toHaveURL(/\/it\/calcolatore-costi-ai$/);
        await expect(page.getByRole("heading", { name: /Calcolatore costi AI/i })).toBeVisible();
        await expect(getProviderSelect(page)).toHaveValue("openai");
        await expect(getModelSelect(page)).toHaveValue("gpt-5.5");
        await expect(page.getByText(/^Costo per richiesta$/i)).toBeVisible();
        await expect(page.getByText(/Nota sui prezzi/i)).toBeVisible();
    });
});