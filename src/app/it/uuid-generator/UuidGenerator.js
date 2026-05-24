"use client";

import UuidGeneratorCore from "@/components/tools/uuid-generator/UuidGeneratorCore";
import content from "@/components/tools/uuid-generator/locales/uuidGenerator.it";

export default function UuidGenerator(props) {
    return <UuidGeneratorCore content={content} {...props} />;
}
