

import UrlEncoderDecoder from "./UrlEncoderDecoder";

export const metadata = {
    title: "Online URL Encoder and Decoder",
    description:
        "Encode and decode URLs directly in the browser. Useful for query strings, API parameters, redirects, and debugging without sending data to external servers.",
    alternates: {
        canonical: "https://calcolafacile.org/en/url-encoder-decoder",
        languages: {
            it: "https://calcolafacile.org/it/url-encoder-decoder",
            en: "https://calcolafacile.org/en/url-encoder-decoder",
        },
    },
};

export default function UrlEncoderDecoderPage() {
    return <UrlEncoderDecoder />;
}