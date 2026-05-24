"use client";

import PublicIpCheckerCore from "@/components/tools/public-ip/PublicIpCheckerCore";
import content from "@/components/tools/public-ip/locales/publicIpChecker.en";

export default function PublicIpChecker(props) {
    return <PublicIpCheckerCore content={content} {...props} />;
}