"use client";

import VatCalculatorCore from "@/components/tools/vat/VatCalculatorCore";
import content from "@/locales/tools/vatCalculator.it";

export default function IvaCalculator(props) {
    return <VatCalculatorCore content={content} {...props} />;
}
