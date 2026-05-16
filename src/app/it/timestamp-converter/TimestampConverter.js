"use client";

import { Suspense } from "react";
import TimestampConverterCore from "@/components/tools/timestamp/TimestampConverterCore";
import itContent from "@/locales/tools/timestampConverter.it";

export default function TimestampConverter() {
    return (
        <Suspense fallback={null}>
            <TimestampConverterCore content={itContent} />
        </Suspense>
    );
}
