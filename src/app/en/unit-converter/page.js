import UnitConverter from "./UnitConverter";

export const metadata = {
    title: "Online Unit Converter - Free",
    description:
        "Convert units online: length, weight, temperature, and volume. Free, fast, and no registration required.",
    alternates: {
        canonical: "https://calcolafacile.org/en/unit-converter",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-unita",
            en: "https://calcolafacile.org/en/unit-converter",
        },
    },
};

export default function ConvertitoreUnitaPage() {
    return <UnitConverter />;
}
