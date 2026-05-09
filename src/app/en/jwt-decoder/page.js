

import { Suspense } from "react";
import JwtDecoder from "./JwtDecoder";

export const metadata = {
    title: "JWT Decoder Online - Decode Header and Payload",
    description:
        "Decode JWT online directly in the browser. View the header and payload of a JSON Web Token without sending data to external servers.",
    alternates: {
        canonical: "https://calcolafacile.org/en/jwt-decoder",
        languages: {
            it: "https://calcolafacile.org/it/jwt-decoder",
            en: "https://calcolafacile.org/en/jwt-decoder",
        },
    },
};

export default function JwtDecoderPage() {
    return (
        <Suspense fallback={null}>
            <JwtDecoder />
        </Suspense>
    );
}