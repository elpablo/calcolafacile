import { localizeCoordinateConverterExamples } from "../coordinateConverterExamples";

const coordinateConverterIt = {
    lang: "it",
    locale: "it-IT",
    currentPath: "/it/convertitore-coordinate",
    toolKey: "coordinateConverter",
    metadata: {
        title: "Convertitore coordinate GPS",
        description:
            "Converti coordinate di latitudine e longitudine, genera punti GeoJSON e costruisci percorsi GeoJSON da più coordinate GPS.",
        intro: "Converti una coordinata GPS, crea un percorso da più punti, importa file di coordinate ed esporta GeoJSON per app, mappe e progetti mobile.",
    },
    description:
        "Converti latitudine e longitudine decimali in gradi, minuti e secondi, genera GeoJSON Point e LineString, apri le coordinate in Google Maps o OpenStreetMap e importa liste da CSV, JSON o GeoJSON.",
    sample: {
        latitude: "44.4949",
        longitude: "11.3426",
    },
    labels: {
        tabs: {
            single: "Coordinata singola",
            path: "Costruttore percorso",
            importExport: "Importa / Esporta",
        },
        singlePointTitle: "Coordinata singola",
        singlePointDescription:
            "Inserisci latitudine e longitudine per convertire il punto e generare una feature GeoJSON.",
        inputModeLabel: "Formato input",
        inputModes: {
            decimal: "Gradi decimali",
            dms: "Gradi, minuti, secondi",
        },
        latitudeDmsInputLabel: "Latitudine DMS",
        longitudeDmsInputLabel: "Longitudine DMS",
        latitudeLabel: "Latitudine",
        longitudeLabel: "Longitudine",
        decimalLabel: "Gradi decimali",
        dmsLabel: "Gradi, minuti, secondi",
        openGoogleMapsLabel: "Apri in Google Maps",
        openStreetMapLabel: "Apri in OpenStreetMap",
        pathBuilderTitle: "Costruttore percorso",
        pathBuilderDescription:
            "Aggiungi più coordinate per costruire un percorso ed esportarlo come GeoJSON LineString.",
        addPointLabel: "Aggiungi punto",
        removePointLabel: "Rimuovi",
        pointsCountLabel: "Punti",
        distanceLabel: "Distanza approx.",
        centerLabel: "Centro",
        importExportTitle: "Importa ed esporta",
        importExportDescription:
            "Incolla coordinate, righe CSV, array JSON o GeoJSON. Puoi anche trascinare un file nell'area di testo.",
        importPlaceholder:
            "Esempi:\n44.4949, 11.3426\n44.5075, 11.3514\n\nOppure incolla qui (o trascina un file) GeoJSON / JSON.",
        emptyImportResult: "Importa o incolla coordinate per generare l'output GeoJSON.",
        importButtonLabel: "Importa coordinate",
        pickFileLabel: "Scegli file",
        exportFeatureCollectionLabel: "Esporta FeatureCollection",
        exportPathLabel: "Esporta percorso",
        importSuccess: "Importati {count} punti coordinata.",
        importError: "Nessuna coordinata valida trovata.",
        preview: {
            previewTitle: "Anteprima percorso",
            previewDescription:
                "Una preview schematica leggera del percorso importato o creato manualmente.",
            previewAriaLabel: "Anteprima schematica del percorso di coordinate",
            emptyPreview:
                "Aggiungi almeno una coordinata valida per vedere l'anteprima del percorso.",
            pointsShortLabel: "pt",
        },
    },
    examples: localizeCoordinateConverterExamples("it", "/it/convertitore-coordinate"),
    contextualTools: [],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">
                In che ordine usa le coordinate GeoJSON?
            </h3>
            <p>
                GeoJSON salva le coordinate come longitudine, latitudine. Questo
                strumento ti permette di inserire latitudine e longitudine
                nell&apos;ordine più comune per le persone, poi esporta GeoJSON
                usando l&apos;ordine corretto longitudine-latitudine.
            </p>

            <h3 className="mt-4 font-semibold">
                Posso importare un file GeoJSON?
            </h3>
            <p>
                Sì. Puoi incollare o trascinare GeoJSON con geometrie Point,
                MultiPoint, LineString, Feature o FeatureCollection. Quando
                possibile, lo strumento estrae i punti coordinata.
            </p>

            <h3 className="mt-4 font-semibold">La distanza è esatta?</h3>
            <p>
                La distanza del percorso è una stima geodetica approssimata
                basata sulla formula di Haversine. È utile per stime rapide, ma
                non è una distanza stradale e non segue vie, sentieri o terreno.
            </p>
        </>
    ),
};

export default coordinateConverterIt;