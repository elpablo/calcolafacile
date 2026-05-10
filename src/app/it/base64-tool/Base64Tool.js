"use client";

import Base64ToolCore from "@/components/tools/base64/Base64ToolCore";
import content from "@/locales/tools/base64Tool.it";

export default function Base64Tool(props) {
    return <Base64ToolCore content={content} {...props} />;
}
