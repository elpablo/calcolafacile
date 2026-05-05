"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function MarginCalculator() {
    const [mode, setMode] = useState("fromPrice");
    const [cost, setCost] = useState(60);
    const [sellingPrice, setSellingPrice] = useState(100);
    const [targetMargin, setTargetMargin] = useState(30);

    const costNumber = parseFloat(cost);
    const sellingPriceNumber = parseFloat(sellingPrice);
    const targetMarginNumber = parseFloat(targetMargin);

    const isFromPriceValid =
        !isNaN(costNumber) &&
        !isNaN(sellingPriceNumber) &&
        costNumber >= 0 &&
        sellingPriceNumber > 0;

    const isTargetMarginValid =
        !isNaN(costNumber) &&
        !isNaN(targetMarginNumber) &&
        costNumber >= 0 &&
        targetMarginNumber >= 0 &&
        targetMarginNumber < 100;

    const isValid = mode === "fromPrice" ? isFromPriceValid : isTargetMarginValid;

    const profit = isFromPriceValid ? sellingPriceNumber - costNumber : 0;
    const margin = isFromPriceValid ? (profit / sellingPriceNumber) * 100 : 0;

    const priceFromMargin = isTargetMarginValid
        ? costNumber / (1 - targetMarginNumber / 100)
        : 0;
    const profitFromMargin = isTargetMarginValid ? priceFromMargin - costNumber : 0;

    const formatCurrency = (value) =>
        value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatPercent = (value) =>
        value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    const copyText =
        mode === "fromPrice"
            ? `Profit: ${formatCurrency(profit)}\nMargin: ${formatPercent(margin)}%`
            : `Selling price: ${formatCurrency(priceFromMargin)}\nProfit: ${formatCurrency(profitFromMargin)}`;

    return (
        <ToolLayout
            title="Margin Calculator online"
            lang="en"
            currentPath="/en/margin-calculation"
            description="This margin calculator lets you calculate profit margin from cost and selling price, or find the selling price required to reach a target margin. Useful for freelancers, ecommerce stores and small businesses."
            examples={[
                {
                    title: "Calculate margin on an online product",
                    description:
                        "Enter the product cost and selling price to see how much profit you generate and what margin percentage you get.",
                },
                {
                    title: "Find the selling price from a target margin",
                    description:
                        "If you want a 30% margin, enter the product cost and target margin to calculate the minimum selling price.",
                },
                {
                    title: "Check margin and profit before publishing a price list",
                    description:
                        "Use the calculator to quickly verify whether a price covers costs and leaves a sustainable margin for your business.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        How do you calculate profit margin?
                    </h3>
                    <p>
                        Profit margin is calculated by dividing profit by the
                        selling price and multiplying the result by 100.
                    </p>

                    <h3 className="font-semibold mt-2">
                        What is the difference between margin and markup?
                    </h3>
                    <p>
                        Margin measures profit compared to the selling price,
                        while markup measures the increase compared to cost.
                    </p>

                    <h3 className="font-semibold mt-2">
                        How do I calculate selling price from a target margin?
                    </h3>
                    <p>
                        Divide the cost by 1 minus the target margin expressed
                        as a decimal. For example, with a cost of $70 and a 30%
                        margin, the selling price is $100.
                    </p>
                </>
            }
        >
            <div className="mb-6">
                <label className={labelClass}>Calculation type</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="fromPrice">
                        Calculate margin from cost and price
                    </option>
                    <option value="targetMargin">
                        Calculate price from target margin
                    </option>
                </select>
            </div>

            <ToolInput
                label="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                prefix="$"
                placeholder="Ex. 60"
                helpText="Enter the product cost"
            />

            {mode === "fromPrice" && (
                <ToolInput
                    label="Selling price"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    prefix="$"
                    placeholder="Ex. 100"
                />
            )}

            {mode === "targetMargin" && (
                <ToolInput
                    label="Target margin"
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(e.target.value)}
                    suffix="%"
                    placeholder="Ex. 30"
                />
            )}

            <ResultBox copyText={copyText} lang="en">
                {mode === "fromPrice" ? (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Profit
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatCurrency(profit)}
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            Margin
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatPercent(margin)}%
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Enter a valid cost (≥ 0) and a selling price
                                greater than 0.
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                With a cost of {formatCurrency(costNumber)} and
                                a selling price of{" "}
                                {formatCurrency(sellingPriceNumber)}, the margin
                                is {formatPercent(margin)}%.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Selling price
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatCurrency(priceFromMargin)}
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            Profit
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(profitFromMargin)}
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Enter a valid cost (≥ 0) and a target margin
                                between 0% and 99.99%.
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                With a cost of {formatCurrency(costNumber)} and
                                a target margin of{" "}
                                {formatPercent(targetMarginNumber)}%, the
                                selling price should be{" "}
                                {formatCurrency(priceFromMargin)}.
                            </p>
                        )}
                    </>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
