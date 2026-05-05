"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function VatCalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState(22);
    const [mode, setMode] = useState("add");

    const calculate = () => {
        const value = parseFloat(amount);
        if (isNaN(value) || value < 0) return { net: 0, vat: 0, gross: 0 };

        if (mode === "add") {
            const vat = value * (rate / 100);
            return {
                net: value,
                vat,
                gross: value + vat,
            };
        }

        const net = value / (1 + rate / 100);
        const vat = value - net;
        return {
            net,
            vat,
            gross: value,
        };
    };

    const result = calculate();

    const formatCurrency = (value) =>
        value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    return (
        <ToolLayout
            title="VAT Calculator online (add or remove VAT)"
            lang="en"
            currentPath="/en/vat-calculator"
            description="Calculate VAT easily at 22%, 10% or 4%. Add VAT to a net amount or remove VAT from a gross total."
            examples={[
                {
                    title: "Add 22% VAT to a net amount",
                    description:
                        "Enter a net amount, select 22% and choose 'Add VAT' to get VAT and gross total.",
                },
                {
                    title: "Remove VAT from a gross price",
                    description:
                        "If you have a total including VAT, select 'Remove VAT' to calculate net amount and tax.",
                },
                {
                    title: "Calculate reduced VAT rates",
                    description:
                        "Use 10% or 4% rates to compare net, VAT and total for reduced taxation scenarios.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">How do you calculate VAT?</h3>
                    <p>
                        Multiply the net amount by the VAT rate and add it to
                        the total.
                    </p>

                    <h3 className="font-semibold mt-2">
                        How do you remove VAT?
                    </h3>
                    <p>
                        Divide the gross amount by 1 plus the VAT rate (e.g.
                        1.22 for 22%).
                    </p>
                </>
            }
        >
            <ToolInput
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                prefix="$"
                placeholder="Ex. 100"
                helpText="Enter the amount to calculate VAT"
            />

            <div className="mb-4">
                <label className={labelClass}>VAT rate</label>
                <select
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className={selectClass}
                >
                    <option value={22}>22%</option>
                    <option value={10}>10%</option>
                    <option value={4}>4%</option>
                </select>
            </div>

            <div className="mb-4">
                <label className={labelClass}>Calculation type</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="add">Add VAT</option>
                    <option value="remove">Remove VAT</option>
                </select>
            </div>

            <ResultBox lang="en">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(result.gross)}
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Net
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.net)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            VAT
                        </p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatCurrency(result.vat)}
                        </p>
                    </div>
                </div>

                {parseFloat(amount) < 0 && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Enter a valid amount greater than or equal to 0.
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}