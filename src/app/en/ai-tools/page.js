import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free AI Tools for Tokens, LLM Costs and Developer Workflows",
    description:
        "Free browser-based AI tools to estimate LLM tokens, calculate API costs and plan AI product usage.",
    alternates: {
        canonical: "https://calcolafacile.org/en/ai-tools",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-ai",
            en: "https://calcolafacile.org/en/ai-tools",
        },
    },
};

export default function AiToolsPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="ai"
            eyebrow="AI Tools"
            title="Free AI tools for LLM tokens and API costs"
            description={
                <p>
                    Estimate token usage, compare AI API costs and plan LLM-powered
                    workflows directly in your browser. These tools are useful for
                    developers, makers and product teams building features with
                    OpenAI, Anthropic, Google Gemini and other AI models.
                </p>
            }
            toolsTitle="Available AI tools"
            seoTitle="Why AI cost and token tools matter"
            seoText={
                <p>
                    LLM applications can become expensive quickly when prompts,
                    outputs and request volumes grow. Estimating token counts and
                    API costs before shipping a feature helps you choose the right
                    model, define pricing and avoid unpleasant surprises in
                    production.
                </p>
            }
        />
    );
}