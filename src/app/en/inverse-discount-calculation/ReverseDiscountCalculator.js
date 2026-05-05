"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function ReverseDiscountCalculator() {
    const [discountedPrice, setDiscountedPrice] = useState(70);
    const [discount, setDiscount] = useState(30);

    const discountedPriceNumber = parseFloat(discountedPrice);
    const discountNumber = parseFloat(discount);

    const isValid =
        !isNaN(discountedPriceNumber) &&
        !isNaN(discountNumber) &&
        discountedPriceNumber >= 0 &&
        discountNumber >= 0 &&
        discountNumber < 100;

    const originalPrice = isValid
        ? discountedPriceNumber / (1 - discountNumber / 100)
        : 0;

    const savings = isValid ? originalPrice - discountedPriceNumber : 0;

    const formatCurrency = (value) =>
        value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <ToolLayout
            title="Inverse Discount Calculator online"
            lang="en"
            currentPath="/en/inverse-discount-calculation"
            description="Use this inverse discount calculator to find the original price starting from the discounted price and the discount percentage."
            examples={[
                {
                    title: "Find the original price during a sale",
                    description:
                        "If a product costs $70 after a 30% discount, enter the discounted price and discount percentage to calculate the original price.",
                },
                {
                    title: "Check if a listed discount is correct",
                    description:
                        "Use the inverse discount calculation to verify whether the original price shown by a store matches the applied discount.",
                },
                {
                    title: "Calculate savings and starting price",
                    description:
                        "The tool shows both the original price and the amount saved, useful when comparing deals and promotions.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">
                        How do you calculate the original price from a discount?
                    </h3>
                    <p>
                        Divide the discounted price by 1 minus the discount
                        percentage divided by 100.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        What is an inverse discount calculation useful for?
                    </h3>
                    <p>
                        It helps you find the starting price when you know the
                        final price and the discount that was applied.
                    </p>
                </>
            }
        >
            <ToolInput
                label="Discounted price"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                prefix="$"
                placeholder="Ex. 70"
                helpText="Enter the final price after the discount"
            />

            <ToolInput
                label="Applied discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                suffix="%"
                placeholder="Ex. 30"
            />

            <ResultBox
                copyText={isValid ? formatCurrency(originalPrice) : ""}
                lang="en"
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Original price
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(originalPrice)}
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    Savings
                </p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatCurrency(savings)}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Enter a valid discounted price and a discount between 0%
                        and 99.99%.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        With a discounted price of{" "}
                        {formatCurrency(discountedPriceNumber)} and a discount
                        of {discountNumber.toLocaleString("en-US")}%, the
                        original price was {formatCurrency(originalPrice)}.
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
