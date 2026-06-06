"use client";

import VatToolsHubCore from "@/components/tools/vat/VatToolsHubCore";
import vatToolsHubIt from "@/components/tools/vat/locales/vatToolsHub.it";

export default function StrumentiIvaHub(props) {
    return <VatToolsHubCore content={vatToolsHubIt} {...props} />;
}
