"use client";

import AiCostToolsHubCore from "@/components/tools/ai-cost-calculator/AiCostToolsHubCore";
import aiCostToolsHubIt from "@/components/tools/ai-cost-calculator/locales/aiCostToolsHub.it";

export default function StrumentiCostiAiHub(props) {
    return <AiCostToolsHubCore content={aiCostToolsHubIt} {...props} />;
}
