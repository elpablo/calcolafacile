"use client";

import VatCalculatorCore from "@/components/tools/vat/VatCalculatorCore";
import vatCalculatorIt from "@/components/tools/vat/locales/vatCalculator.it";

export default function IvaCalculator(props) {
    return <VatCalculatorCore content={vatCalculatorIt} {...props} />;
}
