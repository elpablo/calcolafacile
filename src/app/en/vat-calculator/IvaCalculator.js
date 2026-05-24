"use client";

import VatCalculatorCore from "@/components/tools/vat/VatCalculatorCore";
import vatCalculatorEn from "@/components/tools/vat/locales/vatCalculator.en";

export default function IvaCalculator(props) {
    return <VatCalculatorCore content={vatCalculatorEn} {...props} />;
}
