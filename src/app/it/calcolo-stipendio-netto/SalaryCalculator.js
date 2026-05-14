"use client";

import SalaryCalculatorCore from "@/components/tools/salary/SalaryCalculatorCore";
import content from "@/locales/tools/salaryCalculator.it";

export default function SalaryCalculator(props) {
    return <SalaryCalculatorCore content={content} {...props} />;
}
