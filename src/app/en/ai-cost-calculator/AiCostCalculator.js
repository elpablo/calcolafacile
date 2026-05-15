

"use client";

import AiCostCalculatorCore from "@/components/tools/ai-cost-calculator/AiCostCalculatorCore";
import content from "@/locales/tools/aiCostCalculator.en";

export default function AiCostCalculator(props) {
    return <AiCostCalculatorCore content={content} {...props} />;
}