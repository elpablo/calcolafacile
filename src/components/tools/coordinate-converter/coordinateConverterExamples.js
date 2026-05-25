export const coordinateConverterExamples = [
    {
        key: "geojson-point",
        title: {
            it: "Creare un punto GeoJSON",
            en: "Create a GeoJSON point",
        },
        description: {
            it: "Converti le coordinate di Bologna in decimali, DMS e feature GeoJSON Point.",
            en: "Convert Bologna coordinates into decimal, DMS and a GeoJSON Point feature.",
        },
        params: {
            latitude: "44.4949",
            longitude: "11.3426",
            tab: "single",
        },
    },
    {
        key: "route-builder",
        title: {
            it: "Costruire un percorso semplice",
            en: "Build a simple route",
        },
        description: {
            it: "Aggiungi più coppie latitudine/longitudine ed esportale come GeoJSON LineString.",
            en: "Add several latitude/longitude pairs and export them as a GeoJSON LineString.",
        },
        params: {
            latitude: "44.4949",
            longitude: "11.3426",
            tab: "path",
        },
    },
    {
        key: "csv-import",
        title: {
            it: "Importare coordinate da CSV",
            en: "Import coordinates from CSV",
        },
        description: {
            it: "Incolla una coppia latitudine,longitudine per riga e genera anteprima percorso e output GeoJSON.",
            en: "Paste one latitude,longitude pair per line and generate a path preview and GeoJSON output.",
        },
        params: {
            latitude: "44.4949",
            longitude: "11.3426",
            tab: "importExport",
        },
    },
    {
        key: "maps-link",
        title: {
            it: "Aprire coordinate in mappa",
            en: "Open coordinates on a map",
        },
        description: {
            it: "Genera link rapidi per aprire un punto GPS in Google Maps o OpenStreetMap.",
            en: "Generate quick links to open a GPS point in Google Maps or OpenStreetMap.",
        },
        params: {
            latitude: "45.4642",
            longitude: "9.19",
            tab: "single",
        },
    },
];

export function localizeCoordinateConverterExamples(lang, basePath) {
    return coordinateConverterExamples.map((example) => ({
        title: example.title[lang],
        description: example.description[lang],
        href: `${basePath}?${new URLSearchParams({
            tab: example.params.tab,
            latitude: example.params.latitude,
            longitude: example.params.longitude,
        }).toString()}`,
    }));
}