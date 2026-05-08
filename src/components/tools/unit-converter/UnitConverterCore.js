"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { unitCategories } from "@/data/unitConverter/units";

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

function getCategoryLabel(categoryKey, labels) {
    return labels.categories[categoryKey] || categoryKey;
}

function getUnitLabel(categoryKey, unitKey, labels) {
    return labels.units?.[categoryKey]?.[unitKey] || unitKey;
}

function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    if (fromUnit === "C") celsius = value;
    if (fromUnit === "F") celsius = (value - 32) * (5 / 9);
    if (fromUnit === "K") celsius = value - 273.15;

    if (toUnit === "C") return celsius;
    if (toUnit === "F") return celsius * (9 / 5) + 32;
    if (toUnit === "K") return celsius + 273.15;

    return value;
}

function convertValue(value, categoryKey, fromUnit, toUnit) {
    const category = unitCategories[categoryKey];

    if (!category || Number.isNaN(value)) {
        return 0;
    }

    if (categoryKey === "temperature") {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const from = category.units[fromUnit];
    const to = category.units[toUnit];

    if (!from || !to) {
        return 0;
    }

    const valueInBaseUnit = value * from.factor;
    return valueInBaseUnit / to.factor;
}

function formatNumber(value, locale) {
    return value.toLocaleString(locale, {
        maximumFractionDigits: 6,
    });
}

function getFirstUnit(categoryKey) {
    return Object.keys(unitCategories[categoryKey].units)[0];
}

function getSecondUnit(categoryKey) {
    return Object.keys(unitCategories[categoryKey].units)[1] ?? getFirstUnit(categoryKey);
}

export default function UnitConverterCore({
    content,
    initialCategory = "length",
    initialFrom = "cm",
    initialTo = "in",
    initialValue = 1,
}) {
    const {
        lang,
        locale,
        title,
        currentPath,
        description,
        examples,
        faq,
        labels,
    } = content;

    const safeInitialCategory = unitCategories[initialCategory] ? initialCategory : "length";
    const safeInitialFrom = unitCategories[safeInitialCategory].units[initialFrom]
        ? initialFrom
        : getFirstUnit(safeInitialCategory);
    const safeInitialTo = unitCategories[safeInitialCategory].units[initialTo]
        ? initialTo
        : getSecondUnit(safeInitialCategory);

    const [categoryKey, setCategoryKey] = useState(safeInitialCategory);
    const [fromUnit, setFromUnit] = useState(safeInitialFrom);
    const [toUnit, setToUnit] = useState(safeInitialTo);
    const [amount, setAmount] = useState(initialValue);

    const category = unitCategories[categoryKey];
    const unitKeys = Object.keys(category.units);

    const numericAmount = parseFloat(amount);
    const isValid = !Number.isNaN(numericAmount);

    const result = useMemo(
        () => convertValue(numericAmount, categoryKey, fromUnit, toUnit),
        [numericAmount, categoryKey, fromUnit, toUnit]
    );

    const handleCategoryChange = (nextCategoryKey) => {
        const nextUnits = Object.keys(unitCategories[nextCategoryKey].units);
        setCategoryKey(nextCategoryKey);
        setFromUnit(nextUnits[0]);
        setToUnit(nextUnits[1] ?? nextUnits[0]);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            description={description}
            examples={examples}
            faq={faq}
        >
            <div className="mb-4">
                <label className={labelClass}>{labels.category}</label>
                <select
                    value={categoryKey}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={selectClass}
                >
                    {Object.entries(unitCategories).map(([key, item]) => (
                        <option key={key} value={key}>
                            {getCategoryLabel(key, labels)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className={labelClass}>{labels.value}</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={labels.valuePlaceholder}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.valueHelper}
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                    <div>
                        <label className={labelClass}>{labels.from}</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className={selectClass}
                        >
                            {unitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {getUnitLabel(categoryKey, unitKey, labels)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={swapUnits}
                        className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-xl font-semibold text-zinc-700 shadow-sm transition hover:scale-105 hover:border-blue-300 hover:bg-blue-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                        aria-label={labels.swapUnits}
                        title={labels.swapUnits}
                    >
                        ⇄
                    </button>

                    <div>
                        <label className={labelClass}>{labels.to}</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className={selectClass}
                        >
                            {unitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {getUnitLabel(categoryKey, unitKey, labels)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <ResultBox
                copyText={
                    isValid
                        ? `${formatNumber(numericAmount, locale)} ${fromUnit} = ${formatNumber(result, locale)} ${toUnit}`
                        : ""
                }
                lang={lang}
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.result}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(result, locale)} {toUnit}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.errors.invalidNumber}
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {formatNumber(numericAmount, locale)} {fromUnit} ={" "}
                        {formatNumber(result, locale)} {toUnit}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}