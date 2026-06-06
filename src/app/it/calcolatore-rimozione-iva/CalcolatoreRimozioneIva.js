"use client";

import VatReverseCore from "@/components/tools/vat/VatReverseCore";
import vatRemovalCalculatorIt from "@/components/tools/vat/locales/vatRemovalCalculator.it";

export default function CalcolatoreRimozioneIva(props) {
    return <VatReverseCore content={vatRemovalCalculatorIt} {...props} />;
}
