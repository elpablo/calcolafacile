"use client";

import MarkupCalculatorCore from "@/components/tools/markup/MarkupCalculatorCore";
import content from "@/locales/tools/markupCalculator.en";

export default function MarkupCalculator(props) {
    return <MarkupCalculatorCore content={content} {...props} />;
}
