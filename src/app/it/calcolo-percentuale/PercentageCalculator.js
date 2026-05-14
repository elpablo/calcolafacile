"use client";

import PercentageCalculatorCore from "@/components/tools/percentage/PercentageCalculatorCore";
import content from "@/locales/tools/percentageCalculator.it";

export default function PercentageCalculator(props) {
    return <PercentageCalculatorCore content={content} {...props} />;
}
