"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { unitCategories } from "@/data/unitConverter/units";

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const searchInputClass =
    "mb-2 h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

const quickConversionTargets = {
    length: {
        cm: ["in", "m", "mm"],
        m: ["ft", "cm", "km"],
        km: ["mi", "m", "nmi"],
        in: ["cm", "ft", "mm"],
        ft: ["m", "in", "yd"],
        mi: ["km", "m", "nmi"],
    },
    mass: {
        g: ["oz", "kg", "mg"],
        kg: ["lb", "g", "oz"],
        oz: ["g", "lb", "kg"],
        lb: ["kg", "oz", "g"],
        t: ["kg", "lb"],
    },
    temperature: {
        C: ["F", "K"],
        F: ["C", "K"],
        K: ["C", "F"],
    },
    volume: {
        L: ["gal", "mL", "m3"],
        mL: ["L", "floz", "tsp"],
        gal: ["L", "bbl", "m3"],
        bbl: ["gal", "m3", "L"],
        m3: ["L", "bbl", "gal"],
        scf: ["m3", "Mscf", "MMscf"],
        MMscf: ["Mscf", "scf", "m3"],
    },
    area: {
        m2: ["ft2", "cm2", "ha"],
        km2: ["m2", "ha", "acre"],
        ft2: ["m2", "in2", "yd2"],
        acre: ["ha", "m2", "ft2"],
        ha: ["acre", "m2", "km2"],
    },
    speed: {
        kmh: ["mph", "mps", "kt"],
        mph: ["kmh", "mps", "kt"],
        mps: ["kmh", "mph", "fps"],
        kt: ["kmh", "mph", "mps"],
    },
    pressure: {
        bar: ["psi", "kPa", "atm"],
        psi: ["bar", "kPa", "MPa"],
        kPa: ["bar", "psi", "Pa"],
        MPa: ["bar", "psi", "kPa"],
        atm: ["bar", "psi", "kPa"],
    },
    energy: {
        J: ["kJ", "Wh", "BTU"],
        kJ: ["J", "MJ", "BTU"],
        MJ: ["kWh", "BTU", "GJ"],
        GJ: ["MJ", "MMBtu", "kWh"],
        Wh: ["J", "kWh", "BTU"],
        kWh: ["MJ", "BTU", "Wh"],
        BTU: ["kWh", "J", "MMBtu"],
        MMBtu: ["GJ", "MJ", "kWh"],
    },
    flow: {
        Lmin: ["Ls", "m3h", "m3d"],
        Ls: ["Lmin", "m3h", "m3d"],
        m3h: ["Lmin", "m3d", "bpd"],
        m3d: ["m3h", "bpd", "MMscfd"],
        bpd: ["m3d", "m3h", "Lmin"],
        scfd: ["Mscfd", "MMscfd", "m3d"],
        Mscfd: ["scfd", "MMscfd", "m3d"],
        MMscfd: ["Mscfd", "scfd", "m3d"],
    },
};

function getCategoryLabel(categoryKey, labels) {
    return labels.categories[categoryKey] || categoryKey;
}

function getUnitLabel(categoryKey, unitKey, labels) {
    return labels.units?.[categoryKey]?.[unitKey] || unitKey;
}

function getQuickConversionTargets(categoryKey, fromUnit, toUnit) {
    const categorySuggestions = quickConversionTargets[categoryKey] || {};
    const suggestedTargets = categorySuggestions[fromUnit] || [];

    return suggestedTargets.filter(
        (unitKey) => unitKey !== toUnit && unitCategories[categoryKey]?.units?.[unitKey]
    );
}

function getMatchingUnitKeys(categoryKey, unitKeys, labels, query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return unitKeys;
    }

    return unitKeys
        .map((unitKey) => {
            const normalizedUnitKey = unitKey.toLowerCase();
            const label = getUnitLabel(categoryKey, unitKey, labels).toLowerCase();

            let score = null;

            if (normalizedUnitKey === normalizedQuery) {
                score = 0;
            } else if (normalizedUnitKey.startsWith(normalizedQuery)) {
                score = 1;
            } else if (label.startsWith(normalizedQuery)) {
                score = 2;
            } else if (normalizedUnitKey.includes(normalizedQuery)) {
                score = 3;
            } else if (label.includes(normalizedQuery)) {
                score = 4;
            }

            return { unitKey, score };
        })
        .filter((item) => item.score !== null)
        .sort((a, b) => a.score - b.score)
        .map((item) => item.unitKey);
}

function filterUnitKeys(categoryKey, unitKeys, labels, query, selectedUnit) {
    const filteredKeys = getMatchingUnitKeys(categoryKey, unitKeys, labels, query);

    if (selectedUnit && unitKeys.includes(selectedUnit) && !filteredKeys.includes(selectedUnit)) {
        return [selectedUnit, ...filteredKeys];
    }

    return filteredKeys;
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

    const [fromSearch, setFromSearch] = useState("");
    const [toSearch, setToSearch] = useState("");

    const category = unitCategories[categoryKey];
    const unitKeys = Object.keys(category.units);

    const filteredFromUnitKeys = filterUnitKeys(categoryKey, unitKeys, labels, fromSearch, fromUnit);
    const filteredToUnitKeys = filterUnitKeys(categoryKey, unitKeys, labels, toSearch, toUnit);

    const numericAmount = parseFloat(amount);
    const isValid = !Number.isNaN(numericAmount);

    const result = useMemo(
        () => convertValue(numericAmount, categoryKey, fromUnit, toUnit),
        [numericAmount, categoryKey, fromUnit, toUnit]
    );

    const quickTargets = getQuickConversionTargets(categoryKey, fromUnit, toUnit);

    const handleCategoryChange = (nextCategoryKey) => {
        const nextUnits = Object.keys(unitCategories[nextCategoryKey].units);
        setCategoryKey(nextCategoryKey);
        setFromUnit(nextUnits[0]);
        setToUnit(nextUnits[1] ?? nextUnits[0]);
        setFromSearch("");
        setToSearch("");
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromSearch("");
        setToSearch("");
    };

    const applyQuickConversion = (targetUnit) => {
        setToUnit(targetUnit);
        setToSearch("");
    };

    const handleFromSearchChange = (query) => {
        setFromSearch(query);

        const matches = getMatchingUnitKeys(categoryKey, unitKeys, labels, query);
        if (matches.length > 0) {
            setFromUnit(matches[0]);
        }
    };

    const handleToSearchChange = (query) => {
        setToSearch(query);

        const matches = getMatchingUnitKeys(categoryKey, unitKeys, labels, query);
        if (matches.length > 0) {
            setToUnit(matches[0]);
        }
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
                        <input
                            type="search"
                            value={fromSearch}
                            onChange={(e) => handleFromSearchChange(e.target.value)}
                            className={searchInputClass}
                            placeholder={labels.searchUnitPlaceholder}
                            aria-label={labels.searchFromUnit}
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className={selectClass}
                        >
                            {filteredFromUnitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {getUnitLabel(categoryKey, unitKey, labels)}
                                </option>
                            ))}
                            {filteredFromUnitKeys.length === 0 && (
                                <option value={fromUnit}>{labels.noUnitsFound}</option>
                            )}
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
                        <input
                            type="search"
                            value={toSearch}
                            onChange={(e) => handleToSearchChange(e.target.value)}
                            className={searchInputClass}
                            placeholder={labels.searchUnitPlaceholder}
                            aria-label={labels.searchToUnit}
                        />
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className={selectClass}
                        >
                            {filteredToUnitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {getUnitLabel(categoryKey, unitKey, labels)}
                                </option>
                            ))}
                            {filteredToUnitKeys.length === 0 && (
                                <option value={toUnit}>{labels.noUnitsFound}</option>
                            )}
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

                {isValid && quickTargets.length > 0 && (
                    <div className="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {labels.quickConversionsTitle || (lang === "it" ? "Conversioni rapide" : "Quick conversions")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {quickTargets.map((targetUnit) => {
                                const quickResult = convertValue(numericAmount, categoryKey, fromUnit, targetUnit);

                                return (
                                    <button
                                        key={targetUnit}
                                        type="button"
                                        onClick={() =>
                                            applyQuickConversion(targetUnit)
                                        }
                                        className="rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100 dark:hover:border-blue-700 dark:hover:bg-blue-900/40"
                                    >
                                        {fromUnit} → {targetUnit}:{" "}
                                        {formatNumber(quickResult, locale)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </ResultBox>
        </ToolLayout>
    );
}