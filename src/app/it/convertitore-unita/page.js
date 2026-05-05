import UnitConverter from "./UnitConverter";

export const metadata = {
    title: "Convertitore Unità di Misura Online - Gratis",
    description:
        "Converti unità di misura online: lunghezza, peso, temperatura e volume. Strumento gratuito, veloce e senza registrazione.",
    alternates: {
        canonical: "https://calcolafacile.org/it/convertitore-unita",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-unita",
            en: "https://calcolafacile.org/en/unit-converter",
        },
    },
};

export default function ConvertitoreUnitaPage() {
    return <UnitConverter />;
}
