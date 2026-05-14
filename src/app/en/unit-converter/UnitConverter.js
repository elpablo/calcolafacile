"use client";

import UnitConverterCore from "@/components/tools/unit-converter/UnitConverterCore";
import enContent from "@/locales/tools/unitConverter.en";

export default function UnitConverter({ contentOverride, ...props }) {
    const content = {
        ...enContent,
        ...contentOverride,
    };

    return <UnitConverterCore content={content} {...props} />;
}