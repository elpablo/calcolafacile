"use client";

import VatReverseCore from "@/components/tools/vat/VatReverseCore";
import vatReverseCalculatorEn from "@/components/tools/vat/locales/vatReverseCalculator.en";

export default function VatReverseCalculator(props) {
    return <VatReverseCore content={vatReverseCalculatorEn} {...props} />;
}
