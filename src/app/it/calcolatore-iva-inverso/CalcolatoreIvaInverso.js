"use client";

import VatReverseCore from "@/components/tools/vat/VatReverseCore";
import vatReverseCalculatorIt from "@/components/tools/vat/locales/vatReverseCalculator.it";

export default function CalcolatoreIvaInverso(props) {
    return <VatReverseCore content={vatReverseCalculatorIt} {...props} />;
}
