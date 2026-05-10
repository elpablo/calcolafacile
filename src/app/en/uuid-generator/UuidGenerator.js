"use client";

import UuidGeneratorCore from "@/components/tools/uuid-generator/UuidGeneratorCore";
import content from "@/locales/tools/uuidGenerator.en";

export default function UuidGenerator(props) {
    return <UuidGeneratorCore content={content} {...props} />;
}
