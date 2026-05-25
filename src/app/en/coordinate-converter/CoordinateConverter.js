import CoordinateConverterCore from "@/components/tools/coordinate-converter/CoordinateConverterCore";
import coordinateConverterEn from "@/components/tools/coordinate-converter/locales/coordinateConverter.en";

export default function CoordinateConverter() {
    return <CoordinateConverterCore content={coordinateConverterEn} />;
}