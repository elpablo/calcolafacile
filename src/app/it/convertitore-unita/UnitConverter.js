"use client";

import { useMemo, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const categories = {
    length: {
        label: "Lunghezza",
        baseUnit: "m",
        units: {
            mm: { label: "Millimetri (mm)", factor: 0.001 },
            cm: { label: "Centimetri (cm)", factor: 0.01 },
            m: { label: "Metri (m)", factor: 1 },
            km: { label: "Chilometri (km)", factor: 1000 },
            in: { label: "Pollici (in)", factor: 0.0254 },
            ft: { label: "Piedi (ft)", factor: 0.3048 },
            yd: { label: "Iarde (yd)", factor: 0.9144 },
            mi: { label: "Miglia (mi)", factor: 1609.344 },
            nmi: { label: "Miglia nautiche (nmi)", factor: 1852 },
        },
    },
    mass: {
        label: "Peso / Massa",
        baseUnit: "g",
        units: {
            mg: { label: "Milligrammi (mg)", factor: 0.001 },
            g: { label: "Grammi (g)", factor: 1 },
            kg: { label: "Chilogrammi (kg)", factor: 1000 },
            t: { label: "Tonnellate (t)", factor: 1000000 },
            oz: { label: "Once (oz)", factor: 28.349523125 },
            lb: { label: "Libbre (lb)", factor: 453.59237 },
            st: { label: "Stone (st)", factor: 6350.29318 },
        },
    },
    temperature: {
        label: "Temperatura",
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
            mL: { label: "Millilitri (mL)", factor: 0.001 },
            L: { label: "Litri (L)", factor: 1 },
            tsp: { label: "Cucchiaini USA (tsp)", factor: 0.00492892159375 },
            tbsp: { label: "Cucchiai USA (tbsp)", factor: 0.01478676478125 },
            cup: { label: "Cup USA", factor: 0.2365882365 },
            floz: { label: "Fluid ounces USA", factor: 0.0295735295625 },
            pt: { label: "Pinte USA (pt)", factor: 0.473176473 },
            qt: { label: "Quarti USA (qt)", factor: 0.946352946 },
            gal: { label: "Galloni USA", factor: 3.785411784 },
        },
    },
    area: {
        label: "Area",
        baseUnit: "m2",
        units: {
            mm2: { label: "Millimetri quadrati (mm²)", factor: 0.000001 },
            cm2: { label: "Centimetri quadrati (cm²)", factor: 0.0001 },
            m2: { label: "Metri quadrati (m²)", factor: 1 },
            km2: { label: "Chilometri quadrati (km²)", factor: 1000000 },
            ha: { label: "Ettari (ha)", factor: 10000 },
            in2: { label: "Pollici quadrati (in²)", factor: 0.00064516 },
            ft2: { label: "Piedi quadrati (ft²)", factor: 0.09290304 },
            yd2: { label: "Iarde quadrate (yd²)", factor: 0.83612736 },
            acre: { label: "Acri (acre)", factor: 4046.8564224 },
        },
    },
    speed: {
        label: "Velocità",
        baseUnit: "mps",
        units: {
            mps: { label: "Metri al secondo (m/s)", factor: 1 },
            kmh: { label: "Chilometri orari (km/h)", factor: 1 / 3.6 },
            mph: { label: "Miglia orarie (mph)", factor: 0.44704 },
            kt: { label: "Nodi (kn)", factor: 0.514444444 },
            fps: { label: "Piedi al secondo (ft/s)", factor: 0.3048 },
        },
    },
    pressure: {
        label: "Pressione",
        baseUnit: "Pa",
        units: {
            Pa: { label: "Pascal (Pa)", factor: 1 },
            kPa: { label: "Kilopascal (kPa)", factor: 1000 },
            MPa: { label: "Megapascal (MPa)", factor: 1000000 },
            bar: { label: "Bar (bar)", factor: 100000 },
            atm: { label: "Atmosfere (atm)", factor: 101325 },
            psi: { label: "Libbre per pollice quadrato (psi)", factor: 6894.757293168 },
            mmHg: { label: "Millimetri di mercurio (mmHg)", factor: 133.322387415 },
            Torr: { label: "Torr", factor: 133.322368421 },
        },
    },
};

const selectClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

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
    return value.toLocaleString("it-IT", {
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
            title="Convertitore unità di misura online"
            currentPath="/it/convertitore-unita"
            description="Questo convertitore di unità di misura ti permette di convertire rapidamente lunghezza, peso, temperatura, volume, area, velocità e pressione. Puoi scegliere la categoria, indicare le unità di partenza e destinazione e ottenere subito il risultato."
            faq={
                <>
                    <h3 className="font-semibold">Quali unità posso convertire?</h3>
                    <p>
                        Puoi convertire unità di lunghezza, peso, temperatura, volume, area, velocità e pressione. Altre categorie potranno essere aggiunte nel tempo.
                    </p>

                    <h3 className="mt-2 font-semibold">Posso convertire once in grammi?</h3>
                    <p>
                        Sì. Seleziona la categoria Peso / Massa, scegli once come unità di partenza e grammi come unità di destinazione.
                    </p>

                    <h3 className="mt-2 font-semibold">Posso convertire centimetri in pollici?</h3>
                    <p>
                        Sì. Seleziona la categoria Lunghezza, scegli centimetri come unità di partenza e pollici come unità di destinazione.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className={labelClass}>Categoria</label>
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
                <label className={labelClass}>Valore</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Es. 10"
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Inserisci il valore da convertire
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                    <div>
                        <label className={labelClass}>Da</label>
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
                        className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-xl font-semibold text-zinc-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-blue-500 dark:hover:bg-zinc-800"
                        aria-label="Inverti unità"
                        title="Inverti unità"
                    >
                        ⇄
                    </button>

                    <div>
                        <label className={labelClass}>A</label>
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

            <ResultBox>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Risultato</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(result)} {toUnit}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Inserisci un valore numerico valido.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {formatNumber(numericAmount)} {fromUnit} = {formatNumber(result)} {toUnit}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}