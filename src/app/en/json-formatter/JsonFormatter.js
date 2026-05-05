"use client";

import JsonFormatterCore from "@/components/tools/json/JsonFormatterCore";
import enContent from "@/locales/tools/jsonFormatter.en";

export default function JsonFormatter() {
    return <JsonFormatterCore content={enContent} />;
}
