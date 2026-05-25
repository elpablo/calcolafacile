import TimeZoneConverter from "./TimeZoneConverter";

export const metadata = {
    title: "Convertitore fusi orari | UTC, orari mondo e riunioni",
    description:
        "Converti date e orari tra fusi orari con timeline visuale a 24 ore, offset UTC, cambio giorno e indicatori degli orari lavorativi.",
    alternates: {
        canonical: "https://calcolafacile.org/it/convertitore-fusi-orari",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-fusi-orari",
            en: "https://calcolafacile.org/en/time-zone-converter",
        },
    },
};

export default function Page() {
    return <TimeZoneConverter />;
}