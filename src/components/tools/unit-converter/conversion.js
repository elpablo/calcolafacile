/**
 * @file Pure conversion math for the Unit Converter tool. Extracted from
 * `UnitConverterCore.js` so it can be unit-tested without rendering React.
 */

import { unitCategories } from "@/data/unitConverter/units";

/**
 * Convert a temperature value between Celsius, Fahrenheit and Kelvin.
 *
 * @param {number} value
 * @param {"C" | "F" | "K"} fromUnit
 * @param {"C" | "F" | "K"} toUnit
 * @returns {number}
 */
export function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    if (fromUnit === "C") celsius = value;
    if (fromUnit === "F") celsius = (value - 32) * (5 / 9);
    if (fromUnit === "K") celsius = value - 273.15;

    if (toUnit === "C") return celsius;
    if (toUnit === "F") return celsius * (9 / 5) + 32;
    if (toUnit === "K") return celsius + 273.15;

    return value;
}

/**
 * Convert a numeric value within a single category. Returns `0` for
 * unknown categories/units or `NaN` inputs.
 *
 * @param {number} value
 * @param {string} categoryKey
 * @param {string} fromUnit
 * @param {string} toUnit
 * @returns {number}
 */
export function convertValue(value, categoryKey, fromUnit, toUnit) {
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
