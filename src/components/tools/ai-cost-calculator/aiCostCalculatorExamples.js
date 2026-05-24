export const aiCostCalculatorExamples = [
    {
        key: "support-chatbot",
        title: {
            it: "Chatbot per supporto clienti",
            en: "Customer support chatbot",
        },
        description: {
            it: "Stima il costo mensile di un chatbot con volume medio e risposte brevi.",
            en: "Estimate monthly cost for a chatbot with medium volume and short replies.",
        },
        params: {
            inputTokens: 3000,
            outputTokens: 1200,
            requestsPerDay: 500,
            preset: "support-chatbot",
        },
    },
    {
        key: "rag-search",
        title: {
            it: "Sistema RAG su documenti",
            en: "RAG document search",
        },
        description: {
            it: "Valuta i costi di un sistema RAG con contesto ampio e risposte sintetiche.",
            en: "Estimate costs for a RAG system with large retrieved context and concise answers.",
        },
        params: {
            inputTokens: 12000,
            outputTokens: 1800,
            requestsPerDay: 250,
            preset: "rag-search",
        },
    },
    {
        key: "coding-assistant",
        title: {
            it: "Assistente AI per coding",
            en: "AI coding assistant",
        },
        description: {
            it: "Simula prompt lunghi, output di codice e uso frequente durante lo sviluppo.",
            en: "Simulate long prompts, code output and frequent usage during development.",
        },
        params: {
            inputTokens: 10000,
            outputTokens: 5000,
            requestsPerDay: 150,
            preset: "coding-assistant",
        },
    },
    {
        key: "agentic-workflow",
        title: {
            it: "Workflow agentico AI",
            en: "AI agent workflow",
        },
        description: {
            it: "Stima un agente con più step, tool calling e contesto ricorrente.",
            en: "Estimate an agent with multiple steps, tool calling and recurring context.",
        },
        params: {
            inputTokens: 25000,
            outputTokens: 9000,
            requestsPerDay: 300,
            preset: "agentic-workflow",
        },
    },
    {
        key: "content-generation",
        title: {
            it: "Generazione contenuti",
            en: "Content generation",
        },
        description: {
            it: "Calcola il costo mensile per generare articoli, email o testi marketing.",
            en: "Calculate monthly cost for generating articles, emails or marketing copy.",
        },
        params: {
            inputTokens: 2500,
            outputTokens: 3500,
            requestsPerDay: 200,
            preset: "content-generation",
        },
    },
];