import AngleConverterCore from "@/components/tools/angle-converter/AngleConverterCore";
import angleConverterEn from "@/components/tools/angle-converter/locales/angleConverter.en";

export default function AngleConverter() {
    return <AngleConverterCore content={angleConverterEn} />;
}