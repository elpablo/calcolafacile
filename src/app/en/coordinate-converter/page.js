import CoordinateConverter from "./CoordinateConverter";

export const metadata = {
    title: "GPS Coordinate Converter | CalcolaFacile",
    description:
        "Convert GPS coordinates, generate GeoJSON Point and LineString data, build simple paths and import/export coordinate files.",
};

export default function CoordinateConverterPage() {
    return <CoordinateConverter />;
}