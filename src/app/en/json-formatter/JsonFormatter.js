"use client";

import { Suspense } from "react";
import JsonFormatterCore from "@/components/tools/json/JsonFormatterCore";
import enContent from "@/locales/tools/jsonFormatter.en";

export default function JsonFormatter() {
    return (
        <Suspense fallback={null}>
            <JsonFormatterCore content={enContent} />
        </Suspense>
    );
}
