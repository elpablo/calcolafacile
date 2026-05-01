

import JwtDecoder from "./JwtDecoder";

export const metadata = {
    title: "JWT Decoder Online - Decodifica Header e Payload",
    description:
        "Decodifica JWT online direttamente nel browser. Visualizza header e payload di un JSON Web Token senza inviare dati a server esterni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/jwt-decoder",
    },
};

export default function JwtDecoderPage() {
    return <JwtDecoder />;
}