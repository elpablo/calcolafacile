import AngleConverter from "./AngleConverter";

export const metadata = {
    title: "Angle Converter | Degrees, Radians, Gradians and Turns",
    description:
        "Convert angles between degrees, radians, gradians and turns with a visual circle preview. Useful for math, geometry, engineering and unit circle examples.",
    alternates: {
        canonical: "https://calcolafacile.org/en/angle-converter",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-angoli",
            en: "https://calcolafacile.org/en/angle-converter",
        },
    },
};

export default function Page() {
    return <AngleConverter />;
}