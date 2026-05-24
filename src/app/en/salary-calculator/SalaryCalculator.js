"use client";

import SalaryCalculatorCore from "@/components/tools/salary/SalaryCalculatorCore";
import content from "@/components/tools/salary/locales/salaryCalculator.en";

export default function SalaryCalculator(props) {
    return <SalaryCalculatorCore content={content} {...props} />;
}
