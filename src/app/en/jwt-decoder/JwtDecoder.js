"use client";

import { Suspense } from "react";
import JwtDecoderCore from "@/components/tools/jwt/JwtDecoderCore";
import enContent from "@/components/tools/jwt/locales/jwtDecoder.en";

export default function JwtDecoder() {
    return (
        <Suspense fallback={null}>
            <JwtDecoderCore content={enContent} />
        </Suspense>
    );
}
