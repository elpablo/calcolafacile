import UnitConverter from "../convertitore-unita/UnitConverter";

export const metadata = {
    title: "Converti Libbre in Chilogrammi (lb → kg) Online - Gratis",
    description:
        "Converti libbre in chilogrammi online in modo rapido. Inserisci il valore in lb e ottieni subito il risultato in kg.",
    alternates: {
        canonical: "https://calcolafacile.org/it/libbre-a-kg",
    },
};

export default function LibbreAKgPage() {
    return (
        <UnitConverter
            initialCategory="mass"
            initialFrom="lb"
            initialTo="kg"
            initialValue={1}
        />
    );
}
