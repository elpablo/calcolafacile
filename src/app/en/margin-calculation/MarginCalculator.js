"use client";

import MarginCalculatorCore from "@/components/tools/margin/MarginCalculatorCore";
import content from "@/components/tools/margin/locales/marginCalculator.en";

export default function MarginCalculator(props) {
    return <MarginCalculatorCore content={content} {...props} />;
}
