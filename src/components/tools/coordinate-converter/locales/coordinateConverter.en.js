import { localizeCoordinateConverterExamples } from "../coordinateConverterExamples";

const coordinateConverterEn = {
    lang: "en",
    locale: "en-US",
    currentPath: "/en/coordinate-converter",
    toolKey: "coordinateConverter",
    metadata: {
        title: "GPS Coordinate Converter",
        description:
            "Convert latitude and longitude coordinates, generate GeoJSON points and build simple GeoJSON paths from multiple GPS coordinates.",
        intro: "Convert a single GPS coordinate, create a route from multiple points, import coordinate files and export GeoJSON for apps, maps and mobile projects.",
    },
    description:
        "Convert decimal latitude and longitude to DMS, generate GeoJSON Point and LineString data, open coordinates in Google Maps or OpenStreetMap, and import coordinate lists from CSV, JSON or GeoJSON.",
    sample: {
        latitude: "44.4949",
        longitude: "11.3426",
    },
    labels: {
        tabs: {
            single: "Single coordinate",
            path: "Path builder",
            importExport: "Import / Export",
        },
        singlePointTitle: "Single coordinate",
        singlePointDescription:
            "Enter latitude and longitude to convert the point and generate a GeoJSON feature.",
        inputModeLabel: "Input format",
        inputModes: {
            decimal: "Decimal degrees",
            dms: "Degrees, minutes, seconds",
        },
        latitudeDmsInputLabel: "Latitude DMS",
        longitudeDmsInputLabel: "Longitude DMS",
        latitudeLabel: "Latitude",
        longitudeLabel: "Longitude",
        decimalLabel: "Decimal degrees",
        dmsLabel: "Degrees, minutes, seconds",
        openGoogleMapsLabel: "Open in Google Maps",
        openStreetMapLabel: "Open in OpenStreetMap",
        pathBuilderTitle: "Path builder",
        pathBuilderDescription:
            "Add multiple coordinates to build a route and export it as a GeoJSON LineString.",
        addPointLabel: "Add point",
        removePointLabel: "Remove",
        pointsCountLabel: "Points",
        distanceLabel: "Approx. distance",
        centerLabel: "Center",
        importExportTitle: "Import and export",
        importExportDescription:
            "Paste coordinates, CSV rows, JSON arrays or GeoJSON. You can also drop a file into the text area.",
        importPlaceholder:
            "Examples:\n44.4949, 11.3426\n44.5075, 11.3514\n\nOr paste (or drop a file) GeoJSON / JSON here.",
        emptyImportResult:
            "Import or paste coordinates to generate GeoJSON output.",
        importButtonLabel: "Import coordinates",
        pickFileLabel: "Pick file",
        exportFeatureCollectionLabel: "Export FeatureCollection",
        exportPathLabel: "Export path",
        importSuccess: "Imported {count} coordinate points.",
        importError: "No valid coordinates found.",
        preview: {
            previewTitle: "Path preview",
            previewDescription:
                "A lightweight schematic preview of the imported or manually created path.",
            previewAriaLabel: "Schematic preview of the coordinate path",
            emptyPreview:
                "Add at least one valid coordinate to preview the path.",
            pointsShortLabel: "pts",
        },
    },
    examples: localizeCoordinateConverterExamples(
        "en",
        "/en/coordinate-converter",
    ),
    contextualTools: [],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">
                What coordinate order does GeoJSON use?
            </h3>
            <p>
                GeoJSON stores coordinates as longitude, latitude. This tool
                lets you enter latitude and longitude in the usual
                human-readable order, then exports GeoJSON using the correct
                longitude-latitude order.
            </p>

            <h3 className="mt-4 font-semibold">Can I import a GeoJSON file?</h3>
            <p>
                Yes. You can paste or drop GeoJSON containing Point, MultiPoint,
                LineString, Feature or FeatureCollection geometries. The tool
                will extract the coordinate points when possible.
            </p>

            <h3 className="mt-4 font-semibold">Is the distance exact?</h3>
            <p>
                The path distance is an approximate great-circle distance based
                on the Haversine formula. It is useful for estimation, but it is
                not a road distance and does not follow streets or terrain.
            </p>
        </>
    ),
};

export default coordinateConverterEn;