import { expect, test } from "@playwright/test";
import { clearLocalStorageKey, expectPageReady } from "./helpers/toolTestHelpers";

const STORAGE_KEY = "calcolafacile:ai-cost-calculator";

async function openAiCostCalculator(page, lang = "en") {
    const path =
        lang === "it" ? "/it/calcolatore-costi-ai" : "/en/ai-cost-calculator";

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

function getMonthlyCostHero(page) {
    return page
        .locator("section")
        .filter({ hasText: /Estimated monthly cost|Costo mensile stimato/i })
        .first();
}

function getUsagePresetsSection(page) {
    return page
        .locator("section")
        .filter({ hasText: /Usage presets|Preset di utilizzo/i })
        .first();
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
        await expect(getModelSelect(page)).toHaveValue("gpt-5.6-sol");
        await expect(getUsagePresetsSection(page)).toBeVisible();
        await expect(getMonthlyCostHero(page)).toBeVisible();
        await expect(getMonthlyCostHero(page)).toContainText(/Estimated monthly cost/i);
        await expect(page.getByText(/^Cost per request$/i)).toBeVisible();
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
        await expect(getMonthlyCostHero(page)).toContainText(/10[.,\s]?500([.,]00)?|10500([.,]00)?/);
    });

    test("applies a usage preset and updates the monthly estimate", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await page.getByRole("button", { name: /AI agent workflow/i }).click();

        await expect(getInputTokensInput(page)).toHaveValue("25000");
        await expect(getOutputTokensInput(page)).toHaveValue("9000");
        await expect(getRequestsPerDayInput(page)).toHaveValue("300");
        await expect(getUsagePresetsSection(page)).toContainText(/Active preset/i);
        await expect(getUsagePresetsSection(page)).toContainText(/AI agent workflow/i);
        await expect(getMonthlyCostHero(page)).toContainText(/Estimated monthly cost/i);
    });

    test("loads scenario values from query params", async ({ page }) => {
        await page.goto(
            "/en/ai-cost-calculator?inputTokens=25000&outputTokens=9000&requestsPerDay=300&preset=agentic-workflow",
        );
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await expect(getInputTokensInput(page)).toHaveValue("25000");
        await expect(getOutputTokensInput(page)).toHaveValue("9000");
        await expect(getRequestsPerDayInput(page)).toHaveValue("300");
        await expect(getUsagePresetsSection(page)).toContainText(/Active preset/i);
        await expect(getUsagePresetsSection(page)).toContainText(/AI agent workflow/i);
    });

    test("switches provider and model", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await getProviderSelect(page).selectOption("anthropic");
        await expect(getProviderSelect(page)).toHaveValue("anthropic");

        await expect(getModelSelect(page)).toHaveValue("claude-fable-5");
        await getModelSelect(page).selectOption("claude-haiku-4.5");
        await expect(getModelSelect(page)).toHaveValue("claude-haiku-4.5");
    });

    test("persists the last scenario after reload", async ({ page }) => {
        await openAiCostCalculator(page, "en");

        await getProviderSelect(page).selectOption("google");
        await expect(getProviderSelect(page)).toHaveValue("google");
        await expect(getModelSelect(page)).toHaveValue("gemini-3.5-flash");

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
        await expect(getModelSelect(page)).toHaveValue("gemini-3.5-flash");
        await expect(getInputTokensInput(page)).toHaveValue("12345");
        await expect(getOutputTokensInput(page)).toHaveValue("6789");
        await expect(getRequestsPerDayInput(page)).toHaveValue("42");
    });

    test("loads the Italian page with localized chrome", async ({ page }) => {
        await openAiCostCalculator(page, "it");

        await expect(page).toHaveURL(/\/it\/calcolatore-costi-ai$/);
        await expect(page.getByRole("heading", { name: /Calcolatore costi AI/i })).toBeVisible();
        await expect(getProviderSelect(page)).toHaveValue("openai");
        await expect(getModelSelect(page)).toHaveValue("gpt-5.6-sol");
        await expect(getUsagePresetsSection(page)).toBeVisible();
        await expect(getMonthlyCostHero(page)).toBeVisible();
        await expect(getMonthlyCostHero(page)).toContainText(/Costo mensile stimato/i);
        await expect(page.getByText(/^Costo per richiesta$/i)).toBeVisible();
    });
});

test.describe("AI Cost Calculator - stale persisted model/provider recovery", () => {
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

    test.beforeEach(async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
    });

    test("recovers from an unknown persisted provider (EN)", async ({ page }) => {
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await seedLocalStorageState(page, {
            providerKey: "removed-provider",
            modelKey: "removed-model",
            inputTokens: "7777",
            outputTokens: "3333",
            requestsPerDay: "55",
            activePresetKey: null,
        });

        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        expect(pageErrors).toEqual([]);
        await expect(getProviderSelect(page)).toHaveValue("openai");
        await expect(getModelSelect(page)).toHaveValue("gpt-5.6-sol");
        await expect(getMonthlyCostHero(page)).toBeVisible();

        // Non-model fields (tokens, requests) are preserved across the recovery.
        await expect(getInputTokensInput(page)).toHaveValue("7777");
        await expect(getOutputTokensInput(page)).toHaveValue("3333");

        const stored = await readStoredState(page);
        expect(stored.providerKey).toBe("openai");
        expect(stored.modelKey).toBe("gpt-5.6-sol");
    });

    test("recovers from a removed model on an otherwise valid provider (IT)", async ({ page }) => {
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await seedLocalStorageState(page, {
            providerKey: "google",
            modelKey: "gemini-1.0-legacy",
            inputTokens: "5000",
            outputTokens: "2500",
            requestsPerDay: "40",
            activePresetKey: null,
        });

        await page.goto("/it/calcolatore-costi-ai");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        expect(pageErrors).toEqual([]);
        await expect(getProviderSelect(page)).toHaveValue("google");
        await expect(getModelSelect(page)).toHaveValue("gemini-3.5-flash");
        await expect(getMonthlyCostHero(page)).toBeVisible();

        const stored = await readStoredState(page);
        expect(stored.providerKey).toBe("google");
        expect(stored.modelKey).toBe("gemini-3.5-flash");
    });

    test("recovers when the persisted modelKey belongs to a different provider (EN)", async ({ page }) => {
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await seedLocalStorageState(page, {
            providerKey: "google",
            modelKey: "claude-opus-5",
            inputTokens: "5000",
            outputTokens: "2500",
            requestsPerDay: "40",
            activePresetKey: null,
        });

        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        expect(pageErrors).toEqual([]);
        await expect(getProviderSelect(page)).toHaveValue("google");
        await expect(getModelSelect(page)).toHaveValue("gemini-3.5-flash");

        const stored = await readStoredState(page);
        expect(stored.providerKey).toBe("google");
        expect(stored.modelKey).toBe("gemini-3.5-flash");
    });

    test("keeps a valid persisted provider and model unchanged (EN)", async ({ page }) => {
        await seedLocalStorageState(page, {
            providerKey: "anthropic",
            modelKey: "claude-haiku-4.5",
            inputTokens: "5000",
            outputTokens: "2500",
            requestsPerDay: "40",
            activePresetKey: null,
        });

        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await expect(getProviderSelect(page)).toHaveValue("anthropic");
        await expect(getModelSelect(page)).toHaveValue("claude-haiku-4.5");

        const stored = await readStoredState(page);
        expect(stored.providerKey).toBe("anthropic");
        expect(stored.modelKey).toBe("claude-haiku-4.5");
    });
});

test.describe("AI Cost Calculator - cross-model comparison", () => {
    function getComparisonSection(page) {
        return page.getByTestId("ai-cost-comparison");
    }

    function getComparisonChart(page) {
        return page.getByTestId("ai-cost-comparison-chart");
    }

    function getComparisonTable(page) {
        return page.getByTestId("ai-cost-comparison-table");
    }

    function getCheapestCard(page) {
        return page.getByTestId("ai-cost-comparison-cheapest");
    }

    function getMostExpensiveCard(page) {
        return page.getByTestId("ai-cost-comparison-most-expensive");
    }

    function getTableRow(page, providerKey, modelKey) {
        return page.getByTestId(`ai-cost-comparison-row-${providerKey}-${modelKey}`);
    }

    function getChartRow(page, providerKey, modelKey) {
        return page.getByTestId(`ai-cost-comparison-chart-row-${providerKey}-${modelKey}`);
    }

    function getSelectedCard(page) {
        return page.getByTestId("ai-cost-comparison-selected");
    }

    test.beforeEach(async ({ page }) => {
        await clearLocalStorageKey(page, STORAGE_KEY);
    });

    test("renders the comparison chart, table and summaries on the English route", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await expect(getComparisonSection(page)).toBeVisible();
        await expect(page.getByRole("heading", { name: /Compare monthly cost across all models/i })).toBeVisible();
        await expect(getCheapestCard(page)).toBeVisible();
        await expect(getMostExpensiveCard(page)).toBeVisible();
        await expect(getSelectedCard(page)).toBeVisible();
        await expect(getComparisonChart(page)).toBeVisible();
        await expect(getComparisonTable(page)).toBeVisible();

        // The full catalog is compared, not just the OpenAI provider currently selected.
        await expect(getComparisonTable(page)).toContainText(/Anthropic/);
        await expect(getComparisonTable(page)).toContainText(/Google/);
        await expect(getComparisonTable(page)).toContainText(/Mistral/);
    });

    test("renders the comparison chart, table and summaries on the Italian route", async ({ page }) => {
        await page.goto("/it/calcolatore-costi-ai");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await expect(getComparisonSection(page)).toBeVisible();
        await expect(
            page.getByRole("heading", { name: /Confronta il costo mensile tra tutti i modelli/i }),
        ).toBeVisible();
        await expect(getCheapestCard(page)).toBeVisible();
        await expect(getCheapestCard(page)).toContainText(/più economico/i);
        await expect(getMostExpensiveCard(page)).toBeVisible();
        await expect(getMostExpensiveCard(page)).toContainText(/più costoso/i);
        await expect(getSelectedCard(page)).toBeVisible();
        await expect(getSelectedCard(page)).toContainText(/La tua selezione/i);
        await expect(getComparisonChart(page)).toBeVisible();
        await expect(getComparisonTable(page)).toBeVisible();
    });

    test("highlights the currently selected model in both the chart and the table", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        const tableRow = getTableRow(page, "openai", "gpt-5.6-sol");
        const chartRow = getChartRow(page, "openai", "gpt-5.6-sol");

        await expect(tableRow).toBeVisible();
        await expect(tableRow).toHaveAttribute("data-selected", "true");
        await expect(tableRow).toContainText(/Selected/i);

        await chartRow.scrollIntoViewIfNeeded();
        await expect(chartRow).toHaveAttribute("data-selected", "true");
        await expect(chartRow).toContainText(/Selected/i);
    });

    test("moves the highlight when the selected model changes", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await page.getByTestId("ai-cost-provider").selectOption("anthropic");
        await expect(page.getByTestId("ai-cost-model")).toHaveValue("claude-fable-5");

        const previousRow = getTableRow(page, "openai", "gpt-5.6-sol");
        const newRow = getTableRow(page, "anthropic", "claude-fable-5");

        await expect(newRow).toHaveAttribute("data-selected", "true");
        await expect(previousRow).toHaveAttribute("data-selected", "false");
    });

    test("shows the selected-model summary card immediately, without scrolling the ranking", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        // Only scroll the summary card itself into view — never touch the
        // scrollable chart/table containers — to prove the card is
        // discoverable without the user having to scroll the ranking.
        const selectedCard = getSelectedCard(page);
        await selectedCard.scrollIntoViewIfNeeded();
        await expect(selectedCard).toBeVisible();

        await expect(selectedCard).toContainText("OpenAI · GPT-5.6 Sol");
        await expect(selectedCard).toContainText(/Rank \d+ of \d+ models/);
        await expect(selectedCard).toContainText(/more than the cheapest model|cheapest model for this workload/i);

        // The summary card sits above the scrollable ranking containers in
        // the layout, so discovering it never requires scrolling either one.
        const selectedBox = await selectedCard.boundingBox();
        const chartBox = await getComparisonChart(page).boundingBox();
        const tableBox = await getComparisonTable(page).boundingBox();

        expect(selectedBox.y).toBeLessThan(chartBox.y);
        expect(selectedBox.y).toBeLessThan(tableBox.y);
    });

    test("selected-model summary reports rank 1 and 'cheapest' when the selection is the cheapest model", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await page.getByTestId("ai-cost-provider").selectOption("mistral");
        await page.getByTestId("ai-cost-model").selectOption("mistral-small-3.2-24b");

        const selectedCard = getSelectedCard(page);
        await selectedCard.scrollIntoViewIfNeeded();
        await expect(selectedCard).toContainText(/Rank 1 of \d+ models/);
        await expect(selectedCard).toContainText(/cheapest model for this workload/i);

        const cheapestCard = getCheapestCard(page);
        await expect(cheapestCard).toContainText("Mistral · Mistral Small 3.2 24B");
    });

    test("selected-model summary updates its rank when the selection changes", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        const selectedCard = getSelectedCard(page);
        await selectedCard.scrollIntoViewIfNeeded();
        const initialText = await selectedCard.textContent();

        await page.getByTestId("ai-cost-provider").selectOption("anthropic");
        await expect(page.getByTestId("ai-cost-model")).toHaveValue("claude-fable-5");

        await expect(selectedCard).toContainText("Anthropic · Claude Fable 5");
        const updatedText = await selectedCard.textContent();
        expect(updatedText).not.toBe(initialText);
    });

    test("mobile viewport smoke test: comparison stays readable without page overflow", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto("/en/ai-cost-calculator");
        await expectPageReady(page, "ai-cost-provider", STORAGE_KEY);

        await expect(getComparisonSection(page)).toBeVisible();
        await getComparisonChart(page).scrollIntoViewIfNeeded();
        await expect(getComparisonChart(page)).toBeVisible();
        await getComparisonTable(page).scrollIntoViewIfNeeded();
        await expect(getComparisonTable(page)).toBeVisible();

        const hasHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        expect(hasHorizontalOverflow).toBe(false);
    });
});