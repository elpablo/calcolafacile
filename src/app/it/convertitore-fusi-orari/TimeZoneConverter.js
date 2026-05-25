import TimeZoneConverterCore from "@/components/tools/time-zone-converter/TimeZoneConverterCore";
import timeZoneConverterIt from "@/components/tools/time-zone-converter/locales/timeZoneConverter.it";

export default function TimeZoneConverter() {
    return <TimeZoneConverterCore content={timeZoneConverterIt} />;
}
