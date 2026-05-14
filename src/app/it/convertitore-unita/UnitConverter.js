"use client";

import UnitConverterCore from "@/components/tools/unit-converter/UnitConverterCore";
import itContent from "@/locales/tools/unitConverter.it";

export default function UnitConverter(props) {
    return <UnitConverterCore content={itContent} {...props} />;
}
