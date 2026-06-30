const tokenEstimatorEn = {
    lang: "en",
    locale: "en-US",
    title: "LLM Token Estimator Online",
    currentPath: "/en/token-estimator",
    description:
        "Estimate how many tokens your text will use in an LLM and calculate approximate API costs. Useful for prompts, API payloads and AI workflows. Everything runs locally in your browser.",
    contextualTools: [
        {
            href: "/en/ai-cost-calculator",
            title: "AI Cost Calculator",
            description:
                "Convert estimated tokens into a daily or monthly cost based on your usage volume.",
        },
        {
            href: "/en/json-formatter",
            title: "JSON Formatter",
            description:
                "Format and validate JSON payloads before estimating their token usage.",
        },
    ],
    examples: [
        {
            title: "Estimate prompt cost before sending",
            description:
                "Paste prompts, instructions or documentation to estimate input tokens and cost for the selected model.",
        },
        {
            title: "Estimate response size",
            description:
                "Set the expected output tokens to calculate the total cost of an API call.",
        },
        {
            title: "Analyze JSON or API payloads",
            description:
                "Paste JSON or large text to check if it fits within model limits or budget.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Is the token estimation accurate?</h3>
            <p>
                No. This is a quick estimate based on characters and words. Actual token counts
                depend on the model tokenizer.
            </p>

            <h3 className="mt-2 font-semibold">Is my text sent to a server?</h3>
            <p>No. All calculations run locally in your browser.</p>

            <h3 className="mt-2 font-semibold">Are these official prices?</h3>
            <p>
                No. Prices are indicative and may change. Always check the official pricing of the
                provider.
            </p>
        </>
    ),
    sampleText: `Write a short description of an app that helps users compare prices of nearby grocery stores using a simple and direct tone.`,
    sample: {
        modelKey: "gpt-4o-mini",
        estimatedOutputTokens: "500",
    },
    labels: {
        textLabel: "Text to estimate",
        textPlaceholder: "Paste prompt, text or content to estimate...",
        textHelp: "Local estimation in your browser. No text is sent to external servers.",
        modelLabel: "Model",
        outputTokensLabel: "Estimated output tokens",
        outputTokensPlaceholder: "Ex. 500",
        outputTokensHelp: "Tokens you expect to receive as a response.",
        useSample: "Use sample",
        clear: "Clear",
        inputTokensResult: "Estimated input tokens",
        characters: "Characters",
        words: "Words",
        noSpaces: "No spaces",
        costTitle: "Estimated cost",
        costInput: "Input",
        costOutput: "Output",
        costTotal: "Total",
        copyText: ({ inputTokens, outputTokens, totalCost }) =>
            `Estimated input tokens: ${inputTokens}\nEstimated output tokens: ${outputTokens}\nEstimated total cost: ${totalCost}`,
    },
};

export default tokenEstimatorEn;
