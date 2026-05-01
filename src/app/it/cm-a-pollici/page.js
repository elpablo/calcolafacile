import UnitConverter from "../convertitore-unita/UnitConverter";

export const metadata = {
    title: "Converti Centimetri in Pollici (cm → in) Online - Gratis",
    description: "Converti centimetri in pollici online in modo rapido. Inserisci il valore in cm e ottieni subito il risultato in pollici.",
    alternates: {
        canonical: "https://calcolafacile.org/it/cm-a-pollici",
    },
};

export default function CmAPolliciPage() {
    return (
        <UnitConverter
            initialCategory="length"
            initialFrom="cm"
            initialTo="in"
            initialValue={1}
        />
    );
}
