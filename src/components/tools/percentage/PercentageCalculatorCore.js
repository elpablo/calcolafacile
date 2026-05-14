"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:percentage-calculator";

const MODES = ["percentOf", "ratio", "change", "discount"];
const CHANGE_TYPES = ["increase", "decrease"];

function subscribeToHydration() {
    return () => {};
}

function parseNumber(value) {
    const number = parseFloat(value);
    return Number.isNaN(number) ? null : number;
}

function isMode(value) {
    return MODES.includes(value);
}

function isChangeType(value) {
    return CHANGE_TYPES.includes(value);
}

function getInitialState(shouldLoadSavedState, sample) {
    if (!shouldLoadSavedState) {
        return { ...sample };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        mode: isMode(stored?.mode) ? stored.mode : sample.mode,
        value: typeof stored?.value === "string" ? stored.value : sample.value,
        percentage: typeof stored?.percentage === "string" ? stored.percentage : sample.percentage,
        part: typeof stored?.part === "string" ? stored.part : sample.part,
        total: typeof stored?.total === "string" ? stored.total : sample.total,
        base: typeof stored?.base === "string" ? stored.base : sample.base,
        changePercent:
            typeof stored?.changePercent === "string" ? stored.changePercent : sample.changePercent,
        changeType: isChangeType(stored?.changeType) ? stored.changeType : sample.changeType,
        price: typeof stored?.price === "string" ? stored.price : sample.price,
        discount: typeof stored?.discount === "string" ? stored.discount : sample.discount,
    };
}

export default function PercentageCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <PercentageCalculatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function PercentageCalculatorCoreContent({ content, shouldLoadSavedState }) {
    const {
        lang,
        locale,
        currency,
        currencyAffix,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const initialState = getInitialState(shouldLoadSavedState, sample);
    const [mode, setMode] = useState(initialState.mode);
    const [value, setValue] = useState(initialState.value);
    const [percentage, setPercentage] = useState(initialState.percentage);
    const [part, setPart] = useState(initialState.part);
    const [total, setTotal] = useState(initialState.total);
    const [base, setBase] = useState(initialState.base);
    const [changePercent, setChangePercent] = useState(initialState.changePercent);
    const [changeType, setChangeType] = useState(initialState.changeType);
    const [price, setPrice] = useState(initialState.price);
    const [discount, setDiscount] = useState(initialState.discount);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, {
            mode,
            value,
            percentage,
            part,
            total,
            base,
            changePercent,
            changeType,
            price,
            discount,
        });
    }, [
        shouldLoadSavedState,
        mode,
        value,
        percentage,
        part,
        total,
        base,
        changePercent,
        changeType,
        price,
        discount,
    ]);

    const formatNumber = (input) =>
        input.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatCurrency = (input) =>
        input.toLocaleString(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    const computeResult = () => {
        if (mode === "percentOf") {
            const number = parseNumber(value);
            const percentageValue = parseNumber(percentage);
            const resultValue =
                number === null || percentageValue === null ? 0 : (number * percentageValue) / 100;
            return {
                title: labels.percentOf.resultTitle,
                value: formatNumber(resultValue),
                detail: labels.percentOf.detail({
                    percentage: percentage || 0,
                    value: value || 0,
                    result: formatNumber(resultValue),
                }),
            };
        }

        if (mode === "ratio") {
            const partNumber = parseNumber(part);
            const totalNumber = parseNumber(total);
            const resultValue =
                partNumber === null || totalNumber === null || totalNumber === 0
                    ? 0
                    : (partNumber / totalNumber) * 100;
            return {
                title: labels.ratio.resultTitle,
                value: `${formatNumber(resultValue)}%`,
                detail: labels.ratio.detail({
                    part: part || 0,
                    total: total || 0,
                    result: formatNumber(resultValue),
                }),
            };
        }

        if (mode === "change") {
            const baseNumber = parseNumber(base);
            const changeNumber = parseNumber(changePercent);
            if (changeType === "decrease" && changeNumber !== null && changeNumber > 100) {
                return {
                    title: labels.change.invalidTitle,
                    value: "-",
                    detail: labels.change.invalidDetail,
                };
            }
            const multiplier = changeType === "increase" ? 1 : -1;
            const delta =
                baseNumber === null || changeNumber === null ? 0 : (baseNumber * changeNumber) / 100;
            const resultValue = baseNumber === null ? 0 : baseNumber + multiplier * delta;
            return {
                title:
                    changeType === "increase"
                        ? labels.change.resultTitleIncrease
                        : labels.change.resultTitleDecrease,
                value: formatNumber(resultValue),
                detail: labels.change.detail({
                    base: base || 0,
                    sign: changeType === "increase" ? "+" : "-",
                    percent: changePercent || 0,
                    result: formatNumber(resultValue),
                }),
            };
        }

        // discount
        const priceNumber = parseNumber(price);
        const discountNumber = parseNumber(discount);
        if (discountNumber !== null && discountNumber > 100) {
            return {
                title: labels.discount.invalidTitle,
                value: "-",
                detail: labels.discount.invalidDetail,
            };
        }
        const savings =
            priceNumber === null || discountNumber === null
                ? 0
                : (priceNumber * discountNumber) / 100;
        const finalPrice = priceNumber === null ? 0 : priceNumber - savings;
        return {
            title: labels.discount.resultTitle,
            value: formatCurrency(finalPrice),
            detail: labels.discount.detail({
                savings: formatCurrency(savings),
                price: formatCurrency(priceNumber || 0),
            }),
        };
    };

    const result = computeResult();

    return (
        <ToolLayout
            title={title}
            lang={lang}
            currentPath={currentPath}
            description={description}
            examples={examples}
            faq={faq}
            contextualTools={contextualTools}
        >
            <div className="mb-6">
                <label className={labelClass}>{labels.modeLabel}</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="percentOf">{labels.modes.percentOf}</option>
                    <option value="ratio">{labels.modes.ratio}</option>
                    <option value="change">{labels.modes.change}</option>
                    <option value="discount">{labels.modes.discount}</option>
                </select>
            </div>

            {mode === "percentOf" && (
                <>
                    <ToolInput
                        label={labels.percentOf.valueLabel}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={labels.percentOf.valuePlaceholder}
                    />
                    <ToolInput
                        label={labels.percentOf.percentLabel}
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        suffix="%"
                        placeholder={labels.percentOf.percentPlaceholder}
                    />
                </>
            )}

            {mode === "ratio" && (
                <>
                    <ToolInput
                        label={labels.ratio.partLabel}
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        placeholder={labels.ratio.partPlaceholder}
                    />
                    <ToolInput
                        label={labels.ratio.totalLabel}
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        placeholder={labels.ratio.totalPlaceholder}
                    />
                </>
            )}

            {mode === "change" && (
                <>
                    <ToolInput
                        label={labels.change.baseLabel}
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder={labels.change.basePlaceholder}
                    />
                    <ToolInput
                        label={labels.change.percentLabel}
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        suffix="%"
                        placeholder={labels.change.percentPlaceholder}
                    />
                    <div className="mb-4">
                        <label className={labelClass}>{labels.change.typeLabel}</label>
                        <select
                            value={changeType}
                            onChange={(e) => setChangeType(e.target.value)}
                            className={selectClass}
                        >
                            <option value="increase">{labels.change.increase}</option>
                            <option value="decrease">{labels.change.decrease}</option>
                        </select>
                    </div>
                </>
            )}

            {mode === "discount" && (
                <>
                    <ToolInput
                        label={labels.discount.priceLabel}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        prefix={currencyAffix?.prefix}
                        suffix={currencyAffix?.suffix}
                        placeholder={labels.discount.pricePlaceholder}
                    />
                    <ToolInput
                        label={labels.discount.discountLabel}
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        suffix="%"
                        placeholder={labels.discount.discountPlaceholder}
                    />
                </>
            )}

            <ResultBox copyText={`${result.title}: ${result.value}`} lang={lang}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{result.title}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {result.value}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{result.detail}</p>
            </ResultBox>
        </ToolLayout>
    );
}
