"use client";

import { Suspense } from "react";
import TimestampConverterCore from "@/components/tools/timestamp/TimestampConverterCore";
import enContent from "@/locales/tools/timestampConverter.en";

export default function TimestampConverter() {
    return (
        <Suspense fallback={null}>
            <TimestampConverterCore content={enContent} />
        </Suspense>
    );
}
