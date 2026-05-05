"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const categories = {
    length: {
        label: "Length",
        baseUnit: "m",
        units: {
            mm: { label: "Millimeters (mm)", factor: 0.001 },
            cm: { label: "Centimeters (cm)", factor: 0.01 },
            m: { label: "Meters (m)", factor: 1 },
            km: { label: "Kilometers (km)", factor: 1000 },
            in: { label: "Inches (in)", factor: 0.0254 },
            ft: { label: "Feet (ft)", factor: 0.3048 },
            yd: { label: "Yards (yd)", factor: 0.9144 },
            mi: { label: "Miles (mi)", factor: 1609.344 },
            nmi: { label: "Nautical miles (nmi)", factor: 1852 },
        },
    },
    mass: {
        label: "Mass",
        baseUnit: "g",
        units: {
            mg: { label: "Milligrams (mg)", factor: 0.001 },
            g: { label: "Grams (g)", factor: 1 },
            kg: { label: "Kilograms (kg)", factor: 1000 },
            t: { label: "Tonnes (t)", factor: 1000000 },
            oz: { label: "Ounces (oz)", factor: 28.349523125 },
            lb: { label: "Pounds (lb)", factor: 453.59237 },
            st: { label: "Stone (st)", factor: 6350.29318 },
        },
    },
    temperature: {
        label: "Temperature",
        baseUnit: "C",
        units: {
            C: { label: "Celsius (°C)" },
            F: { label: "Fahrenheit (°F)" },
            K: { label: "Kelvin (K)" },
        },
    },
    volume: {
        label: "Volume",
        baseUnit: "L",
        units: {
            mL: { label: "Milliliters (mL)", factor: 0.001 },
            L: { label: "Liters (L)", factor: 1 },
            tsp: { label: "US Teaspoons (tsp)", factor: 0.00492892159375 },
            tbsp: { label: "US Tablespoons (tbsp)", factor: 0.01478676478125 },
            cup: { label: "US Cups", factor: 0.2365882365 },
            floz: { label: "US Fluid Ounces", factor: 0.0295735295625 },
            pt: { label: "US Pints (pt)", factor: 0.473176473 },
            qt: { label: "US Quarts (qt)", factor: 0.946352946 },
            gal: { label: "US Gallons", factor: 3.785411784 },
        },
    },
    area: {
        label: "Area",
        baseUnit: "m2",
        units: {
            mm2: { label: "Square millimeters (mm²)", factor: 0.000001 },
            cm2: { label: "Square centimeters (cm²)", factor: 0.0001 },
            m2: { label: "Square meters (m²)", factor: 1 },
            km2: { label: "Square kilometers (km²)", factor: 1000000 },
            ha: { label: "Hectares (ha)", factor: 10000 },
            in2: { label: "Square inches (in²)", factor: 0.00064516 },
            ft2: { label: "Square feet (ft²)", factor: 0.09290304 },
            yd2: { label: "Square yards (yd²)", factor: 0.83612736 },
            acre: { label: "Acres (acre)", factor: 4046.8564224 },
        },
    },
    speed: {
        label: "Speed",
        baseUnit: "mps",
        units: {
            mps: { label: "Meters per second (m/s)", factor: 1 },
            kmh: { label: "Kilometers per hour (km/h)", factor: 1 / 3.6 },
            mph: { label: "Miles per hour (mph)", factor: 0.44704 },
            kt: { label: "Knots (kn)", factor: 0.514444444 },
            fps: { label: "Feet per second (ft/s)", factor: 0.3048 },
        },
    },
    pressure: {
        label: "Pressure",
        baseUnit: "Pa",
        units: {
            Pa: { label: "Pascal (Pa)", factor: 1 },
            kPa: { label: "Kilopascal (kPa)", factor: 1000 },
            MPa: { label: "Megapascal (MPa)", factor: 1000000 },
            bar: { label: "Bar (bar)", factor: 100000 },
            atm: { label: "Atmospheres (atm)", factor: 101325 },
            psi: { label: "Pounds per square inch (psi)", factor: 6894.757293168 },
            mmHg: { label: "Millimeters of mercury (mmHg)", factor: 133.322387415 },
            Torr: { label: "Torr", factor: 133.322368421 },
        },
    },
};

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

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
    const category = categories[categoryKey];

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

function formatNumber(value) {
    return value.toLocaleString("en-US", {
        maximumFractionDigits: 6,
    });
}

function getFirstUnit(categoryKey) {
    return Object.keys(categories[categoryKey].units)[0];
}

function getSecondUnit(categoryKey) {
    return Object.keys(categories[categoryKey].units)[1] ?? getFirstUnit(categoryKey);
}

export default function UnitConverter({
    initialCategory = "length",
    initialFrom = "cm",
    initialTo = "in",
    initialValue = 1,
}) {
    const safeInitialCategory = categories[initialCategory] ? initialCategory : "length";
    const safeInitialFrom = categories[safeInitialCategory].units[initialFrom]
        ? initialFrom
        : getFirstUnit(safeInitialCategory);
    const safeInitialTo = categories[safeInitialCategory].units[initialTo]
        ? initialTo
        : getSecondUnit(safeInitialCategory);

    const [categoryKey, setCategoryKey] = useState(safeInitialCategory);
    const [fromUnit, setFromUnit] = useState(safeInitialFrom);
    const [toUnit, setToUnit] = useState(safeInitialTo);
    const [amount, setAmount] = useState(initialValue);

    const category = categories[categoryKey];
    const unitKeys = Object.keys(category.units);

    const numericAmount = parseFloat(amount);
    const isValid = !Number.isNaN(numericAmount);

    const result = useMemo(
        () => convertValue(numericAmount, categoryKey, fromUnit, toUnit),
        [numericAmount, categoryKey, fromUnit, toUnit]
    );

    const handleCategoryChange = (nextCategoryKey) => {
        const nextUnits = Object.keys(categories[nextCategoryKey].units);
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
            title="Unit Converter Online"
            lang="en"
            currentPath="/en/unit-converter"
            description="Convert length, mass, temperature, volume, area, speed and pressure quickly. Choose a category, select units and get instant results directly in your browser."
            faq={
                <>
                    <h3 className="font-semibold">What units can I convert?</h3>
                    <p>
                        You can convert length, mass, temperature, volume, area,
                        speed and pressure. More categories may be added over
                        time.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Can I convert ounces to grams?
                    </h3>
                    <p>
                        Yes. Select the Mass category, choose ounces as the
                        input unit and grams as the output unit.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        Can I convert centimeters to inches?
                    </h3>
                    <p>
                        Yes. Select the Length category, choose centimeters as
                        the input unit and inches as the output unit.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className={labelClass}>Category</label>
                <select
                    value={categoryKey}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={selectClass}
                >
                    {Object.entries(categories).map(([key, item]) => (
                        <option key={key} value={key}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className={labelClass}>Value</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Ex. 10"
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Enter the value to convert
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                    <div>
                        <label className={labelClass}>From</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className={selectClass}
                        >
                            {unitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {category.units[unitKey].label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={swapUnits}
                        className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-xl font-semibold text-zinc-700 shadow-sm transition hover:scale-105 hover:border-blue-300 hover:bg-blue-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                        aria-label="Swap units"
                        title="Swap units"
                    >
                        ⇄
                    </button>

                    <div>
                        <label className={labelClass}>To</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className={selectClass}
                        >
                            {unitKeys.map((unitKey) => (
                                <option key={unitKey} value={unitKey}>
                                    {category.units[unitKey].label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <ResultBox
                copyText={
                    isValid
                        ? `${formatNumber(numericAmount)} ${fromUnit} = ${formatNumber(result)} ${toUnit}`
                        : ""
                }
                lang="en"
            >
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Result
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(result)} {toUnit}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Enter a valid numeric value.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {formatNumber(numericAmount)} {fromUnit} ={" "}
                        {formatNumber(result)} {toUnit}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}