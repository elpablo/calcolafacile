"use client";

import { Suspense } from "react";
import JwtDecoderCore from "@/components/tools/jwt/JwtDecoderCore";
import itContent from "@/locales/tools/jwtDecoder.it";

export default function JwtDecoder() {
    return (
        <Suspense fallback={null}>
            <JwtDecoderCore content={itContent} />
        </Suspense>
    );
}
