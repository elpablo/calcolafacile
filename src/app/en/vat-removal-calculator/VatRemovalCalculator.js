"use client";

import VatReverseCore from "@/components/tools/vat/VatReverseCore";
import vatRemovalCalculatorEn from "@/components/tools/vat/locales/vatRemovalCalculator.en";

export default function VatRemovalCalculator(props) {
    return <VatReverseCore content={vatRemovalCalculatorEn} {...props} />;
}
