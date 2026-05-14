"use client";

import UnitConverterCore from "@/components/tools/unit-converter/UnitConverterCore";
import itContent from "@/locales/tools/unitConverter.it";

export default function UnitConverter({ contentOverride, ...props }) {
    const content = {
        ...itContent,
        ...contentOverride,
    };

    return <UnitConverterCore content={content} {...props} />;
}
