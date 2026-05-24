"use client";

import PercentageCalculatorCore from "@/components/tools/percentage/PercentageCalculatorCore";
import content from "@/components/tools/percentage/locales/percentageCalculator.en";

export default function PercentageCalculator(props) {
    return <PercentageCalculatorCore content={content} {...props} />;
}
