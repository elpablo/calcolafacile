"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:reverse-discount-calculator";

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState, sample) {
    if (!shouldLoadSavedState) {
        return { ...sample };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        discountedPrice:
            typeof stored?.discountedPrice === "string"
                ? stored.discountedPrice
                : sample.discountedPrice,
        discount:
            typeof stored?.discount === "string" ? stored.discount : sample.discount,
    };
}

export default function ReverseDiscountCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <ReverseDiscountCalculatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function ReverseDiscountCalculatorCoreContent({ content, shouldLoadSavedState }) {
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
    const [discountedPrice, setDiscountedPrice] = useState(initialState.discountedPrice);
    const [discount, setDiscount] = useState(initialState.discount);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { discountedPrice, discount });
    }, [shouldLoadSavedState, discountedPrice, discount]);

    const discountedPriceNumber = parseFloat(discountedPrice);
    const discountNumber = parseFloat(discount);

    const isValid =
        !Number.isNaN(discountedPriceNumber) &&
        !Number.isNaN(discountNumber) &&
        discountedPriceNumber >= 0 &&
        discountNumber >= 0 &&
        discountNumber < 100;

    const originalPrice = isValid
        ? discountedPriceNumber / (1 - discountNumber / 100)
        : 0;
    const savings = isValid ? originalPrice - discountedPriceNumber : 0;

    const formatCurrency = (value) =>
        value.toLocaleString(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatPercent = (value) => value.toLocaleString(locale);

    const copyText = isValid ? formatCurrency(originalPrice) : "";

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
            <ToolInput
                label={labels.discountedPriceLabel}
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                placeholder={labels.discountedPricePlaceholder}
                helpText={labels.discountedPriceHelp}
            />

            <ToolInput
                label={labels.discountLabel}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder={labels.discountPlaceholder}
            />

            <ResultBox copyText={copyText} lang={lang}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.originalPriceLabel}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(originalPrice)}
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.savingsLabel}
                </p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatCurrency(savings)}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.invalid}
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.detail({
                            discountedPrice: formatCurrency(discountedPriceNumber),
                            discount: formatPercent(discountNumber),
                            originalPrice: formatCurrency(originalPrice),
                        })}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
