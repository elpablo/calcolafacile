"use client";

import JwtDecoderCore from "@/components/tools/jwt/JwtDecoderCore";
import enContent from "@/locales/tools/jwtDecoder.en";

export default function JwtDecoder() {
    return <JwtDecoderCore content={enContent} />;
}
