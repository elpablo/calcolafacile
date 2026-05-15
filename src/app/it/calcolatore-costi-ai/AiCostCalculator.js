

"use client";

import AiCostCalculatorCore from "@/components/tools/ai-cost-calculator/AiCostCalculatorCore";
import content from "@/locales/tools/aiCostCalculator.it";

export default function AiCostCalculator(props) {
    return <AiCostCalculatorCore content={content} {...props} />;
}