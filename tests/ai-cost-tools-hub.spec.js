import { expect, test } from "@playwright/test";

async function expectFaqSchema(page) {
    const faqScript = page.locator('script[type="application/ld+json"]');
    await expect(faqScript.first()).toHaveCount(1);
    const rawSchema = await faqScript.first().textContent();
    expect(rawSchema ?? "").toContain("FAQPage");
    expect(rawSchema ?? "").toContain("Question");
    expect(rawSchema ?? "").toContain("acceptedAnswer");
}

async function getMetaDescription(page) {
    return page.locator('meta[name="description"]').getAttribute("content");
}

test.describe("AI Cost Tools Hub", () => {
    test("EN hub page renders heading, tools and FAQ schema", async ({ page }) => {
        await page.goto("/en/ai-cost-tools");

        await expect(page).toHaveURL(/\/en\/ai-cost-tools$/);
        await expect(
            page.getByRole("heading", { name: /free ai cost estimation tools/i, level: 1 }),
        ).toBeVisible();

        await expect(page.getByRole("link", { name: /AI Cost Calculator/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /Token Estimator/i }).first()).toBeVisible();

        await expect(page.getByText(/AI cost toolkit/i)).toBeVisible();
        await expect(page.getByText(/Common AI cost planning scenarios/i)).toBeVisible();
        await expect(page.getByText(/AI model pricing overview/i)).toBeVisible();
        await expect(page.getByText(/Frequently asked questions/i)).toBeVisible();

        await expectFaqSchema(page);
    });

    test("EN hub page has optimized metadata", async ({ page }) => {
        await page.goto("/en/ai-cost-tools");

        await expect(page).toHaveTitle(/AI Cost Tools/i);
        const description = await getMetaDescription(page);
        expect(description).toContain("AI cost");
    });

    test("EN hub links navigate to correct tool pages", async ({ page }) => {
        await page.goto("/en/ai-cost-tools");

        const calcLink = page.getByRole("link", { name: /AI Cost Calculator/i }).first();
        await expect(calcLink).toHaveAttribute("href", "/en/ai-cost-calculator");

        const tokenLink = page.getByRole("link", { name: /Token Estimator/i }).first();
        await expect(tokenLink).toHaveAttribute("href", "/en/token-estimator");
    });

    test("EN hub shows provider pricing reference", async ({ page }) => {
        await page.goto("/en/ai-cost-tools");

        await expect(page.getByRole("heading", { name: "OpenAI" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Anthropic" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Google" })).toBeVisible();
        await expect(page.getByText("GPT-4o").first()).toBeVisible();
    });

    test("IT hub page renders heading, tools and FAQ schema", async ({ page }) => {
        await page.goto("/it/strumenti-costi-ai");

        await expect(page).toHaveURL(/\/it\/strumenti-costi-ai$/);
        await expect(
            page.getByRole("heading", { name: /strumenti gratuiti per stimare i costi/i, level: 1 }),
        ).toBeVisible();

        await expect(page.getByRole("link", { name: /Calcolatore Costi AI/i }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: /Token Estimator/i }).first()).toBeVisible();

        await expect(page.getByText(/Toolkit costi AI/i)).toBeVisible();
        await expect(page.getByText(/Scenari comuni di pianificazione/i)).toBeVisible();
        await expect(page.getByText(/Panoramica prezzi modelli AI/i)).toBeVisible();
        await expect(page.getByText(/Domande frequenti/i)).toBeVisible();

        await expectFaqSchema(page);
    });

    test("IT hub page has optimized metadata", async ({ page }) => {
        await page.goto("/it/strumenti-costi-ai");

        await expect(page).toHaveTitle(/Strumenti Costi AI/i);
        const description = await getMetaDescription(page);
        expect(description).toContain("costi");
    });

    test("IT hub links navigate to correct tool pages", async ({ page }) => {
        await page.goto("/it/strumenti-costi-ai");

        const calcLink = page.getByRole("link", { name: /Calcolatore Costi AI/i }).first();
        await expect(calcLink).toHaveAttribute("href", "/it/calcolatore-costi-ai");

        const tokenLink = page.getByRole("link", { name: /Token Estimator/i }).first();
        await expect(tokenLink).toHaveAttribute("href", "/it/token-estimator");
    });

    test("AI Cost Calculator EN has FAQ schema markup", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expect(page.getByTestId("ai-cost-provider")).toBeVisible();

        await expectFaqSchema(page);
    });

    test("AI Cost Calculator IT has FAQ schema markup", async ({ page }) => {
        await page.goto("/it/calcolatore-costi-ai");
        await expect(page.getByTestId("ai-cost-provider")).toBeVisible();

        await expectFaqSchema(page);
    });

    test("AI Cost Calculator EN has optimized title and description", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");

        await expect(page).toHaveTitle(/AI Cost Calculator.*GPT.*Claude.*Gemini/i);
        const description = await getMetaDescription(page);
        expect(description).toContain("Free AI cost calculator");
        expect(description).toContain("OpenAI");
    });

    test("AI Cost Calculator deep-link examples point to correct paths", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expect(page.getByTestId("ai-cost-provider")).toBeVisible();

        await expect(
            page.locator('a[href*="/en/ai-cost-calculator?"]').first(),
        ).toBeVisible();
    });

    test("AI Cost Calculator contextual tools include hub page link", async ({ page }) => {
        await page.goto("/en/ai-cost-calculator");
        await expect(page.getByTestId("ai-cost-provider")).toBeVisible();

        await expect(
            page.getByRole("link", { name: /AI Cost Tools/i }),
        ).toBeVisible();
    });
});
