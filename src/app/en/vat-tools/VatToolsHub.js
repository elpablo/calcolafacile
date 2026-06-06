"use client";

import VatToolsHubCore from "@/components/tools/vat/VatToolsHubCore";
import vatToolsHubEn from "@/components/tools/vat/locales/vatToolsHub.en";

export default function VatToolsHub(props) {
    return <VatToolsHubCore content={vatToolsHubEn} {...props} />;
}
