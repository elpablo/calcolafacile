"use client";

import { Suspense } from "react";
import JsonFormatterCore from "@/components/tools/json/JsonFormatterCore";
import itContent from "@/locales/tools/jsonFormatter.it";

export default function JsonFormatter() {
    return (
        <Suspense fallback={null}>
            <JsonFormatterCore content={itContent} />
        </Suspense>
    );
}
