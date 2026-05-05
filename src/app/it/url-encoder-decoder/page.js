

import UrlEncoderDecoder from "./UrlEncoderDecoder";

export const metadata = {
    title: "URL Encoder e Decoder online",
    description:
        "Codifica e decodifica URL direttamente nel browser. Utile per query string, parametri API, redirect e debugging senza inviare dati a server esterni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/url-encoder-decoder",
        languages: {
            it: "https://calcolafacile.org/it/url-encoder-decoder",
            en: "https://calcolafacile.org/en/url-encoder-decoder",
        },
    },
};

export default function UrlEncoderDecoderPage() {
    return <UrlEncoderDecoder />;
}