"use client";

import ReverseDiscountCalculatorCore from "@/components/tools/reverse-discount/ReverseDiscountCalculatorCore";
import content from "@/components/tools/reverse-discount/locales/reverseDiscountCalculator.it";

export default function ReverseDiscountCalculator(props) {
    return <ReverseDiscountCalculatorCore content={content} {...props} />;
}
