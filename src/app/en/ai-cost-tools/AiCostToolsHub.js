"use client";

import AiCostToolsHubCore from "@/components/tools/ai-cost-calculator/AiCostToolsHubCore";
import aiCostToolsHubEn from "@/components/tools/ai-cost-calculator/locales/aiCostToolsHub.en";

export default function AiCostToolsHub(props) {
    return <AiCostToolsHubCore content={aiCostToolsHubEn} {...props} />;
}
