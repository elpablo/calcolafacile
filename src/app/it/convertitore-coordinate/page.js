import CoordinateConverter from "./CoordinateConverter";

export const metadata = {
    title: "Convertitore coordinate GPS | CalcolaFacile",
    description:
        "Converti coordinate GPS, genera GeoJSON Point e LineString, costruisci percorsi semplici e importa/esporta file di coordinate.",
};

export default function CoordinateConverterPage() {
    return <CoordinateConverter />;
}
