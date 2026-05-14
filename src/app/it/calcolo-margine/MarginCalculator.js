"use client";

import MarginCalculatorCore from "@/components/tools/margin/MarginCalculatorCore";
import content from "@/locales/tools/marginCalculator.it";

export default function MarginCalculator(props) {
    return <MarginCalculatorCore content={content} {...props} />;
}
