import UnitConverter from "../convertitore-unita/UnitConverter";

export const metadata = {
    title: "Converti Chilogrammi in Libbre (kg → lb) Online - Gratis",
    description: "Converti chilogrammi in libbre online in modo rapido. Inserisci il valore in kg e ottieni subito il risultato in lb.",
    alternates: {
        canonical: "https://calcolafacile.org/it/kg-a-libbre",
    },
};

export default function KgALibbrePage() {
    return (
        <UnitConverter
            initialCategory="mass"
            initialFrom="kg"
            initialTo="lb"
            initialValue={1}
        />
    );
}
