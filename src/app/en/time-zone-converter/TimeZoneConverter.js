import TimeZoneConverterCore from "@/components/tools/time-zone-converter/TimeZoneConverterCore";
import timeZoneConverterEn from "@/components/tools/time-zone-converter/locales/timeZoneConverter.en";

export default function TimeZoneConverter() {
    return <TimeZoneConverterCore content={timeZoneConverterEn} />;
}