"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";

const STORAGE_KEY = "calcolafacile:salary-calculator";

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState, sample) {
    if (!shouldLoadSavedState) {
        return { ...sample };
    }
    const stored = loadLocalState(STORAGE_KEY, {});
    return {
        grossAnnualIncome:
            typeof stored?.grossAnnualIncome === "string"
                ? stored.grossAnnualIncome
                : sample.grossAnnualIncome,
    };
}

export default function SalaryCalculatorCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <SalaryCalculatorCoreContent
            key={hasHydrated ? "hydrated" : "ssr"}
            content={content}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function SalaryCalculatorCoreContent({ content, shouldLoadSavedState }) {
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
    const [grossAnnualIncome, setGrossAnnualIncome] = useState(
        initialState.grossAnnualIncome,
    );

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, { grossAnnualIncome });
    }, [shouldLoadSavedState, grossAnnualIncome]);

    const grossAnnualIncomeNumber = parseFloat(grossAnnualIncome);
    const isValid = !Number.isNaN(grossAnnualIncomeNumber) && grossAnnualIncomeNumber > 0;

    const estimatedAnnualNet = isValid ? grossAnnualIncomeNumber * 0.7 : 0;
    const estimatedMonthlyNet = estimatedAnnualNet / 12;

    const formatCurrency = (value) =>
        value.toLocaleString(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const copyText = isValid ? labels.copyText(formatCurrency(estimatedMonthlyNet)) : "";

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
                label={labels.grossLabel}
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(e.target.value)}
                placeholder={labels.grossPlaceholder}
                helpText={labels.grossHelp}
            />

            <ResultBox copyText={copyText} lang={lang}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.monthlyLabel}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(estimatedMonthlyNet)}
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.annualLabel}
                </p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatCurrency(estimatedAnnualNet)}
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.invalid}
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {labels.detail({
                            gross: formatCurrency(grossAnnualIncomeNumber),
                            monthly: formatCurrency(estimatedMonthlyNet),
                        })}
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
