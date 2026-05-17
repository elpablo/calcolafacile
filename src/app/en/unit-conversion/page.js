

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free Unit Conversion Tools for Length, Weight, Temperature and More",
    description:
        "Free online unit conversion tools for length, weight, temperature, volume, area, speed and pressure.",
    alternates: {
        canonical: "https://calcolafacile.org/en/unit-conversion",
        languages: {
            it: "https://calcolafacile.org/it/conversioni-unita",
            en: "https://calcolafacile.org/en/unit-conversion",
        },
    },
};

export default function UnitConversionPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="conversion"
            eyebrow="Unit Conversions"
            title="Free unit conversion tools"
            description={
                <p>
                    Convert common units for length, weight, temperature, volume,
                    area, speed and pressure directly in your browser. Use the
                    general converter or dedicated conversion pages for frequent
                    searches such as centimeters to inches, ounces to grams and
                    grams to ounces.
                </p>
            }
            toolsTitle="Available conversion tools"
            seoTitle="Fast unit conversions for everyday and technical use"
            seoText={
                <p>
                    Unit conversions are useful in everyday life, cooking, travel,
                    school, engineering and product work. CalcolaFacile keeps common
                    conversions easy to reach, with clear inputs, instant results and
                    dedicated pages for high-demand conversion pairs.
                </p>
            }
        />
    );
}