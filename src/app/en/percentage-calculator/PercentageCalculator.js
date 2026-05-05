"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

const modes = {
    percentOf: "percentOf",
    ratio: "ratio",
    change: "change",
    discount: "discount",
};

export default function PercentageCalculator() {
    const [mode, setMode] = useState(modes.percentOf);
    const [value, setValue] = useState(100);
    const [percentage, setPercentage] = useState(22);
    const [part, setPart] = useState(25);
    const [total, setTotal] = useState(200);
    const [base, setBase] = useState(100);
    const [changePercent, setChangePercent] = useState(10);
    const [changeType, setChangeType] = useState("increase");
    const [price, setPrice] = useState(120);
    const [discount, setDiscount] = useState(30);

    const parseNumber = (inputValue) => {
        const number = parseFloat(inputValue);
        return isNaN(number) ? null : number;
    };

    const formatNumber = (inputValue) =>
        inputValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatCurrency = (inputValue) =>
        inputValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    const renderResult = () => {
        if (mode === modes.percentOf) {
            const number = parseNumber(value);
            const percentageValue = parseNumber(percentage);
            const resultValue = number === null || percentageValue === null ? 0 : (number * percentageValue) / 100;

            return {
                title: "Result",
                value: formatNumber(resultValue),
                detail: `${percentage || 0}% of ${value || 0} = ${formatNumber(resultValue)}`,
            };
        }

        if (mode === modes.ratio) {
            const partNumber = parseNumber(part);
            const totalNumber = parseNumber(total);
            const resultValue =
                partNumber === null || totalNumber === null || totalNumber === 0
                    ? 0
                    : (partNumber / totalNumber) * 100;

            return {
                title: "Percentage",
                value: `${formatNumber(resultValue)}%`,
                detail: `${part || 0} is ${formatNumber(resultValue)}% of ${total || 0}`,
            };
        }

        if (mode === modes.change) {
            const baseNumber = parseNumber(base);
            const changeNumber = parseNumber(changePercent);

            if (changeType === "decrease" && changeNumber !== null && changeNumber > 100) {
                return {
                    title: "Invalid value",
                    value: "-",
                    detail: "The decrease cannot be greater than 100%.",
                };
            }

            const multiplier = changeType === "increase" ? 1 : -1;
            const delta = baseNumber === null || changeNumber === null ? 0 : (baseNumber * changeNumber) / 100;
            const resultValue = baseNumber === null ? 0 : baseNumber + multiplier * delta;

            return {
                title: changeType === "increase" ? "Increased value" : "Reduced value",
                value: formatNumber(resultValue),
                detail: `${base || 0} ${changeType === "increase" ? "+" : "-"} ${changePercent || 0}% = ${formatNumber(resultValue)}`,
            };
        }

        const priceNumber = parseNumber(price);
        const discountNumber = parseNumber(discount);

        if (discountNumber !== null && discountNumber > 100) {
            return {
                title: "Invalid discount",
                value: "-",
                detail: "The discount cannot be greater than 100%.",
            };
        }

        const savings = priceNumber === null || discountNumber === null ? 0 : (priceNumber * discountNumber) / 100;
        const finalPrice = priceNumber === null ? 0 : priceNumber - savings;

        return {
            title: "Discounted price",
            value: formatCurrency(finalPrice),
            detail: `Savings: ${formatCurrency(savings)} on ${formatCurrency(priceNumber || 0)}`,
        };
    };

    const result = renderResult();

    return (
        <ToolLayout
            title="Percentage Calculator online"
            lang="en"
            currentPath="/en/percentage-calculator"
            description="This percentage calculator helps you quickly calculate percentages, percentage ratios, increases, reductions and discounts. Useful for shopping, work, school, estimates and everyday calculations."
            examples={[
                {
                    title: "Calculate 20% of an amount",
                    description:
                        "Select 'What is X% of a number', enter 20 as the percentage and 150 as the starting number to get 30.",
                },
                {
                    title: "Calculate a percentage discount",
                    description:
                        "Use the discounted price mode to find out how much you pay after a discount, for example 30% off $120.",
                },
                {
                    title: "Calculate an increase or decrease",
                    description:
                        "Increase or reduce a value by a percentage, for example to estimate a 10% price increase or a 15% reduction.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        How do you calculate 20% of a number?
                    </h3>
                    <p>
                        Multiply the number by 20 and divide the result by 100.
                    </p>

                    <h3 className="font-semibold mt-2">
                        How do I calculate what percentage one number is of
                        another?
                    </h3>
                    <p>
                        Divide the part by the total and multiply the result by
                        100.
                    </p>

                    <h3 className="font-semibold mt-2">
                        How do you calculate a percentage discount?
                    </h3>
                    <p>
                        Multiply the original price by the discount percentage
                        and divide by 100. Then subtract the discount from the
                        original price.
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
                    <option value={modes.percentOf}>
                        What is X% of a number?
                    </option>
                    <option value={modes.ratio}>
                        What percentage is one number of a total?
                    </option>
                    <option value={modes.change}>
                        Increase or decrease a number by X%
                    </option>
                    <option value={modes.discount}>
                        Calculate discounted price
                    </option>
                </select>
            </div>

            {mode === modes.percentOf && (
                <>
                    <ToolInput
                        label="Starting number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ex. 100"
                    />

                    <ToolInput
                        label="Percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        suffix="%"
                        placeholder="Ex. 22"
                    />
                </>
            )}

            {mode === modes.ratio && (
                <>
                    <ToolInput
                        label="Part"
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        placeholder="Ex. 25"
                    />

                    <ToolInput
                        label="Total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        placeholder="Ex. 200"
                    />
                </>
            )}

            {mode === modes.change && (
                <>
                    <ToolInput
                        label="Starting number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="Ex. 100"
                    />

                    <ToolInput
                        label="Change"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        suffix="%"
                        placeholder="Ex. 10"
                    />

                    <div className="mb-4">
                        <label className={labelClass}>Change type</label>
                        <select
                            value={changeType}
                            onChange={(e) => setChangeType(e.target.value)}
                            className={selectClass}
                        >
                            <option value="increase">Increase</option>
                            <option value="decrease">Decrease</option>
                        </select>
                    </div>
                </>
            )}

            {mode === modes.discount && (
                <>
                    <ToolInput
                        label="Original price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        prefix="$"
                        placeholder="Ex. 120"
                    />

                    <ToolInput
                        label="Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        suffix="%"
                        placeholder="Ex. 30"
                    />
                </>
            )}

            <ResultBox copyText={`${result.title}: ${result.value}`} lang="en">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {result.title}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {result.value}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {result.detail}
                </p>
            </ResultBox>
        </ToolLayout>
    );
}
