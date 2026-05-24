"use client";

import AiCostCalculatorCore from "@/components/tools/ai-cost-calculator/AiCostCalculatorCore";
import content from "@/components/tools/ai-cost-calculator/locales/aiCostCalculator.en";

export default function AiCostCalculator(props) {
    return <AiCostCalculatorCore content={content} {...props} />;
}