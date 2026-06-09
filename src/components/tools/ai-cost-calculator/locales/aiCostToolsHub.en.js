const faqItems = [
    {
        question: "How much does it cost to use AI APIs?",
        answer:
            "AI API costs depend on the model, provider and usage volume. Most providers charge per token processed — typically between $0.10 and $60 per million tokens depending on the model. Use the AI Cost Calculator to estimate your specific costs based on expected token usage and daily request volume.",
    },
    {
        question: "What is the cheapest LLM for production use?",
        answer:
            "Budget-friendly models like GPT-4o mini (~$0.15/M input tokens), Claude Haiku (~$0.25/M) and Gemini Flash (~$0.10/M) offer the lowest per-token pricing while maintaining strong performance for many production tasks. The best choice depends on your quality requirements and use case complexity.",
    },
    {
        question: "How are AI API costs calculated?",
        answer:
            "AI API costs are calculated by multiplying the number of tokens processed (input tokens + output tokens) by the model's per-token price. Providers quote prices per million tokens. Your total cost equals (input tokens × input price) + (output tokens × output price), multiplied by the number of requests.",
    },
    {
        question: "What is the difference between input tokens and output tokens?",
        answer:
            "Input tokens are the tokens in your prompt (the text you send to the model). Output tokens are the tokens the model generates in its response. Output tokens are typically 2–6× more expensive than input tokens because they require computation-intensive generation during inference.",
    },
    {
        question: "How can I reduce my AI API costs?",
        answer:
            "Common cost reduction strategies include: choosing a smaller model for simpler tasks, shortening prompts by removing unnecessary context, caching frequent responses, batching requests, setting output token limits, and using provider-specific features like prompt caching or batch APIs that offer discounted rates.",
    },
    {
        question: "Are these AI cost tools free?",
        answer:
            "Yes. All tools on CalcolaFacile are free, require no signup and run entirely in your browser. No data is sent to a server — your prompts and calculations stay private on your device.",
    },
];

const aiCostToolsHubEn = {
    lang: "en",
    backLabel: "← Back to all tools",
    eyebrow: "AI Cost Tools",
    heading: "Free AI cost estimation tools for LLM APIs",
    intro:
        "Estimate API costs, count tokens and plan budgets for AI-powered applications. Compare pricing across OpenAI, Anthropic and Google models before shipping to production. All tools run in your browser — no signup or API key required.",
    toolkitTitle: "AI cost toolkit",
    toolkitDescription:
        "Choose the right tool depending on whether you need to estimate total API spend or count tokens in a specific text.",
    tools: [
        {
            href: "/en/ai-cost-calculator",
            title: "AI Cost Calculator",
            badge: "Most popular",
            description:
                "Estimate monthly API costs for OpenAI, Anthropic and Google models. Enter token counts and daily requests to calculate cost per request, daily and monthly spend.",
        },
        {
            href: "/en/token-estimator",
            title: "Token Estimator",
            badge: null,
            description:
                "Count how many tokens a prompt, text or JSON payload uses. Estimate approximate cost for GPT, Claude and other LLM models directly in your browser.",
        },
    ],
    useCasesTitle: "Common AI cost planning scenarios",
    useCases: [
        {
            title: "Budget a new AI feature",
            description:
                "Before building an AI-powered feature, estimate how many tokens each request will use and multiply by expected daily volume to project monthly API spend.",
        },
        {
            title: "Compare model pricing",
            description:
                "Switch between GPT-4o, Claude Sonnet, Gemini Pro and budget models to find the best cost-performance balance for your specific use case.",
        },
        {
            title: "Optimise prompt costs",
            description:
                "Use the Token Estimator to measure prompt length, then reduce unnecessary context to lower input token costs without sacrificing output quality.",
        },
        {
            title: "Forecast scaling costs",
            description:
                "Model how costs grow as your product scales from 100 to 10,000 daily requests — helping you plan pricing tiers and infrastructure budgets.",
        },
    ],
    pricingOverviewTitle: "AI model pricing overview (approximate)",
    pricingOverviewDescription:
        "Prices below are approximate public rates per million tokens. Actual pricing may differ based on volume discounts, cached tokens, batch APIs or regional billing. Always verify on the provider's official pricing page.",
    providers: [
        {
            title: "OpenAI",
            models: [
                { label: "GPT-4o", value: "$2.50 / $10 per M" },
                { label: "GPT-4o mini", value: "$0.15 / $0.60 per M" },
                { label: "GPT-4.1", value: "$2.00 / $8.00 per M" },
            ],
        },
        {
            title: "Anthropic",
            models: [
                { label: "Claude Sonnet 4", value: "$3.00 / $15 per M" },
                { label: "Claude Haiku 3.5", value: "$0.80 / $4.00 per M" },
                { label: "Claude Opus 4", value: "$15 / $75 per M" },
            ],
        },
        {
            title: "Google",
            models: [
                { label: "Gemini 2.5 Pro", value: "$1.25 / $10 per M" },
                { label: "Gemini 2.5 Flash", value: "$0.15 / $0.60 per M" },
                { label: "Gemini 2.0 Flash", value: "$0.10 / $0.40 per M" },
            ],
        },
    ],
    faqTitle: "Frequently asked questions",
    faqItems,
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
    relatedTitle: "Related tools",
    relatedTools: [
        {
            href: "/en/json-formatter",
            title: "JSON Formatter",
            description:
                "Format and validate API payloads before sending them to AI models.",
        },
        {
            href: "/en/ai-tools",
            title: "All AI Tools",
            description:
                "Browse the full collection of AI-related developer tools.",
        },
        {
            href: "/en/roi-calculator",
            title: "ROI Calculator",
            description:
                "Calculate return on investment to evaluate AI feature profitability.",
        },
        {
            href: "/en/business-calculators",
            title: "Business Calculators",
            description:
                "Salary, ROI, compound interest and more business finance tools.",
        },
    ],
    privacyTitle: "Browser-based and privacy-friendly",
    privacyDescription:
        "All calculations run locally in your browser. No prompts, tokens or cost estimates are ever sent to a server. Your data stays on your device.",
};

export default aiCostToolsHubEn;
