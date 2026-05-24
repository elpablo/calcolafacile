"use client";

import UrlEncoderDecoderCore from "@/components/tools/url-encoder-decoder/UrlEncoderDecoderCore";
import content from "@/components/tools/url-encoder-decoder/locales/urlEncoderDecoder.en";

export default function UrlEncoderDecoder(props) {
    return <UrlEncoderDecoderCore content={content} {...props} />;
}
