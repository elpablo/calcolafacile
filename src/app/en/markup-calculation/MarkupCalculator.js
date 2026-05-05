"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function MarkupCalculator() {
    const [mode, setMode] = useState("fromPrice");
    const [cost, setCost] = useState(60);
    const [sellingPrice, setSellingPrice] = useState(100);
    const [targetMarkup, setTargetMarkup] = useState(50);

    const costNumber = parseFloat(cost);
    const sellingPriceNumber = parseFloat(sellingPrice);
    const targetMarkupNumber = parseFloat(targetMarkup);

    const isFromPriceValid =
        !isNaN(costNumber) &&
        !isNaN(sellingPriceNumber) &&
        costNumber > 0 &&
        sellingPriceNumber >= 0;

    const isTargetMarkupValid =
        !isNaN(costNumber) &&
        !isNaN(targetMarkupNumber) &&
        costNumber > 0 &&
        targetMarkupNumber >= 0;

    const isValid = mode === "fromPrice" ? isFromPriceValid : isTargetMarkupValid;

    const profit = isFromPriceValid ? sellingPriceNumber - costNumber : 0;
    const markup = isFromPriceValid ? (profit / costNumber) * 100 : 0;

    const priceFromMarkup = isTargetMarkupValid
        ? costNumber * (1 + targetMarkupNumber / 100)
        : 0;
    const profitFromMarkup = isTargetMarkupValid ? priceFromMarkup - costNumber : 0;

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
            ? `Profit: ${formatCurrency(profit)}\nMarkup: ${formatPercent(markup)}%`
            : `Selling price: ${formatCurrency(priceFromMarkup)}\nProfit: ${formatCurrency(profitFromMarkup)}`;

    return (
        <ToolLayout
            title="Markup Calculator online"
            lang="en"
            currentPath="/en/markup-calculation"
            description="This markup calculator lets you calculate percentage markup from cost and selling price, or find the selling price required to apply a target markup. Useful for ecommerce stores, freelancers and small businesses."
            examples={[
                {
                    title: "Calculate markup from cost and selling price",
                    description:
                        "Enter the product cost and selling price to see the profit and markup percentage.",
                },
                {
                    title: "Find the selling price from a target markup",
                    description:
                        "If you want a 50% markup, enter the product cost and target markup to calculate the selling price.",
                },
                {
                    title: "Compare markup and margin before pricing a product",
                    description:
                        "Use markup to understand the increase over cost, then compare it with margin to avoid pricing mistakes.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        How do you calculate markup?
                    </h3>
                    <p>
                        Markup is calculated by dividing profit by cost and
                        multiplying the result by 100.
                    </p>

                    <h3 className="font-semibold mt-2">
                        What is the difference between markup and margin?
                    </h3>
                    <p>
                        Markup measures the increase compared to cost, while
                        margin measures profit compared to the selling price.
                    </p>

                    <h3 className="font-semibold mt-2">
                        How do I calculate selling price from a target markup?
                    </h3>
                    <p>
                        Multiply the cost by 1 plus the target markup expressed
                        as a decimal. For example, with a cost of $60 and a 50%
                        markup, the selling price is $90.
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
                        Calculate markup from cost and price
                    </option>
                    <option value="targetMarkup">
                        Calculate price from target markup
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

            {mode === "targetMarkup" && (
                <ToolInput
                    label="Target markup"
                    value={targetMarkup}
                    onChange={(e) => setTargetMarkup(e.target.value)}
                    suffix="%"
                    placeholder="Ex. 50"
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
                            Markup
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatPercent(markup)}%
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Enter a cost greater than 0 and a valid selling
                                price (≥ 0).
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                With a cost of {formatCurrency(costNumber)} and
                                a selling price of{" "}
                                {formatCurrency(sellingPriceNumber)}, the markup
                                is {formatPercent(markup)}%.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Selling price
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatCurrency(priceFromMarkup)}
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                            Profit
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(profitFromMarkup)}
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Enter a cost greater than 0 and a valid target
                                markup (≥ 0%).
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                With a cost of {formatCurrency(costNumber)} and
                                a target markup of{" "}
                                {formatPercent(targetMarkupNumber)}%, the
                                selling price should be{" "}
                                {formatCurrency(priceFromMarkup)}.
                            </p>
                        )}
                    </>
                )}
            </ResultBox>
        </ToolLayout>
    );
}