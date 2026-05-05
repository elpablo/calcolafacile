"use client";

import JwtDecoderCore from "@/components/tools/jwt/JwtDecoderCore";
import itContent from "@/locales/tools/jwtDecoder.it";

export default function JwtDecoder() {
    return <JwtDecoderCore content={itContent} />;
}
