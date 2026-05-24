import { localizeAngleConverterExamples } from "../angleConverterExamples";

const angleConverterIt = {
    lang: "it",
    locale: "it-IT",
    currentPath: "/it/convertitore-angoli",
    toolKey: "angleConverter",
    metadata: {
        title: "Convertitore angoli",
        description:
            "Converti gradi, radianti, gradianti e giri con anteprima visuale dell'angolo su un cerchio.",
        intro: "Inserisci un angolo e scegli l'unità di partenza. Il convertitore mostra i valori equivalenti e una visualizzazione sul cerchio.",
    },
    description:
        "Converti angoli tra gradi, radianti, gradianti e giri. Usa l'anteprima visuale per capire dove si trova l'angolo sul cerchio.",
    sample: {
        value: 45,
        unit: "degrees",
    },
    labels: {
        valueLabel: "Valore angolo",
        valuePlaceholder: "Es. 45",
        unitLabel: "Unità di partenza",
        units: {
            degrees: "Gradi (°)",
            radians: "Radianti (rad)",
            gradians: "Gradianti (gon)",
            turns: "Giri",
        },
        degreesLabel: "Gradi",
        radiansLabel: "Radianti",
        gradiansLabel: "Gradianti",
        turnsLabel: "Giri",
        preview: {
            previewTitle: "Anteprima angolo",
            previewDescription:
                "Posizione visuale dell'angolo normalizzato su un cerchio.",
            previewAriaLabel:
                "Anteprima visuale dell'angolo convertito su un cerchio",
            quadrant1: "Quadrante I",
            quadrant2: "Quadrante II",
            quadrant3: "Quadrante III",
            quadrant4: "Quadrante IV",
            axisPositiveX: "Asse X positivo",
            axisPositiveY: "Asse Y positivo",
            axisNegativeX: "Asse X negativo",
            axisNegativeY: "Asse Y negativo",
        },
    },
    examples: localizeAngleConverterExamples("it", "/it/convertitore-angoli"),
    contextualTools: [],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">
                Come si convertono i gradi in radianti?
            </h3>
            <p>
                Moltiplica i gradi per π e dividi per 180. Per esempio, 45°
                corrisponde a π/4 radianti, circa 0,785398.
            </p>

            <h3 className="mt-4 font-semibold">Che cos&apos;è un giro?</h3>
            <p>
                Un giro rappresenta una rotazione completa. 1 giro equivale a
                360 gradi, 2π radianti e 400 gradianti.
            </p>

            <h3 className="mt-4 font-semibold">
                Perché l&apos;anteprima è normalizzata?
            </h3>
            <p>
                L&apos;anteprima visuale mostra sempre l&apos;angolo dentro un singolo
                cerchio da 0° a 360°, quindi valori come 450° vengono
                visualizzati nella stessa posizione di 90°.
            </p>
        </>
    ),
};

export default angleConverterIt;