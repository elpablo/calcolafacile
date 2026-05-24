"use client";

import UnitConverterCore from "@/components/tools/unit-converter/UnitConverterCore";
import itContent from "@/components/tools/unit-converter/locales/unitConverter.it";

export default function UnitConverter(props) {
    return <UnitConverterCore content={itContent} {...props} />;
}
