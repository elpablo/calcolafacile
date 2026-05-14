"use client";

import UnitConverterCore from "@/components/tools/unit-converter/UnitConverterCore";
import enContent from "@/locales/tools/unitConverter.en";

export default function UnitConverter(props) {
    return <UnitConverterCore content={enContent} {...props} />;
}