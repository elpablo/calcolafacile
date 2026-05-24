export const angleConverterExamples = [
    {
        key: "degrees-to-radians",
        title: {
            it: "Convertire 45 gradi in radianti",
            en: "Convert 45 degrees to radians",
        },
        description: {
            it: "45° è un angolo comune sul cerchio unitario e corrisponde a π/4 radianti.",
            en: "45° is a common unit-circle angle and equals π/4 radians.",
        },
        params: {
            value: 45,
            unit: "degrees",
        },
    },
    {
        key: "radians-to-degrees",
        title: {
            it: "Convertire π radianti in gradi",
            en: "Convert π radians to degrees",
        },
        description: {
            it: "Usa 3,1415926536 radianti per ottenere circa 180 gradi.",
            en: "Use 3.1415926536 radians to get approximately 180 degrees.",
        },
        params: {
            value: 3.1415926536,
            unit: "radians",
        },
    },
    {
        key: "half-turn",
        title: {
            it: "Convertire mezzo giro",
            en: "Convert half a turn",
        },
        description: {
            it: "0,5 giri corrispondono a 180 gradi, π radianti e 200 gradianti.",
            en: "0.5 turns equals 180 degrees, π radians and 200 gradians.",
        },
        params: {
            value: 0.5,
            unit: "turns",
        },
    },
    {
        key: "right-angle",
        title: {
            it: "Angolo retto",
            en: "Right angle",
        },
        description: {
            it: "90° corrispondono a π/2 radianti, 100 gradianti e 0,25 giri.",
            en: "90° equals π/2 radians, 100 gradians and 0.25 turns.",
        },
        params: {
            value: 90,
            unit: "degrees",
        },
    },
];

export function localizeAngleConverterExamples(lang, basePath) {
    return angleConverterExamples.map((example) => ({
        title: example.title[lang],
        description: example.description[lang],
        href: `${basePath}?${new URLSearchParams({
            value: String(example.params.value),
            unit: example.params.unit,
        }).toString()}`,
    }));
}