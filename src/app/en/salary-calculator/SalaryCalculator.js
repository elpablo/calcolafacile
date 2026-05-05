"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function SalaryCalculator() {
    const [grossAnnualIncome, setGrossAnnualIncome] = useState(60000);

    const grossAnnualIncomeNumber = parseFloat(grossAnnualIncome);
    const isValid = !isNaN(grossAnnualIncomeNumber) && grossAnnualIncomeNumber > 0;

    const estimatedAnnualNet = isValid ? grossAnnualIncomeNumber * 0.7 : 0;
    const estimatedMonthlyNet = estimatedAnnualNet / 12;

    const formatCurrency = (value) =>
        value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <ToolLayout
            title="Net Salary Calculator from Gross Income"
            lang="en"
            currentPath="/en/salary-calculator"
            description="This net salary calculator estimates take-home pay from gross annual income. The result is a quick average estimate of monthly and annual net income."
            examples={[
                {
                    title: "Estimate net salary from $60,000 gross income",
                    description:
                        "Enter 60000 as gross annual income to estimate monthly and annual take-home pay.",
                },
                {
                    title: "Compare job offers",
                    description:
                        "Enter different gross salary amounts to quickly compare how monthly take-home pay may change between offers.",
                },
                {
                    title: "Estimate take-home pay before accepting a contract",
                    description:
                        "Use the calculator to get a rough monthly net salary estimate before accepting a new role or contract.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        How is net salary estimated from gross income?
                    </h3>
                    <p>
                        Net salary depends on taxes, deductions and local rules.
                        This tool uses a simplified average estimate to provide
                        a quick result.
                    </p>

                    <h3 className="font-semibold mt-2">Is the result exact?</h3>
                    <p>
                        No. It is only an estimate. Actual take-home pay depends
                        on location, tax rules, benefits, deductions and
                        employment type.
                    </p>
                </>
            }
        >
            <ToolInput
                label="Gross annual income"
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(e.target.value)}
                prefix="$"
                placeholder="Ex. 60000"
                helpText="Enter your gross annual income"
            />

            <ResultBox
                copyText={
                    isValid
                        ? `${formatCurrency(estimatedMonthlyNet)} per month`
                        : ""
                }
                lang="en"
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Estimated monthly net salary
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(estimatedMonthlyNet)}
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    Estimated annual net salary
                </p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatCurrency(estimatedAnnualNet)}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Enter a valid gross annual income greater than 0.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        With a gross annual income of{" "}
                        {formatCurrency(grossAnnualIncomeNumber)}, the estimated
                        take-home pay is {formatCurrency(estimatedMonthlyNet)}{" "}
                        per month.
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
