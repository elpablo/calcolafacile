"use client";

import { Suspense } from "react";
import JsonFormatterCore from "@/components/tools/json/JsonFormatterCore";
import itContent from "@/components/tools/json/locales/jsonFormatter.it";

export default function JsonFormatter() {
    return (
        <Suspense fallback={null}>
            <JsonFormatterCore content={itContent} />
        </Suspense>
    );
}
