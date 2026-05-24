"use client";

import { Suspense } from "react";
import JwtDecoderCore from "@/components/tools/jwt/JwtDecoderCore";
import itContent from "@/components/tools/jwt/locales/jwtDecoder.it";

export default function JwtDecoder() {
    return (
        <Suspense fallback={null}>
            <JwtDecoderCore content={itContent} />
        </Suspense>
    );
}
