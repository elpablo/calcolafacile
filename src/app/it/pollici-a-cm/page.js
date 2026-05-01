import UnitConverter from "../convertitore-unita/UnitConverter";

export const metadata = {
    title: "Converti Pollici in Centimetri (in → cm) Online - Gratis",
    description: "Converti pollici in centimetri online in modo rapido. Inserisci il valore in in e ottieni subito il risultato in cm.",
    alternates: {
        canonical: "https://calcolafacile.org/it/pollici-a-cm",
    },
};

export default function PolliciACmPage() {
    return (
        <UnitConverter
            initialCategory="length"
            initialFrom="in"
            initialTo="cm"
            initialValue={1}
        />
    );
}
