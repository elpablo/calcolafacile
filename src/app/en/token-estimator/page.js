import { Suspense } from "react";
import TokenEstimator from "./TokenEstimator";

export const metadata = {
    title: "Online LLM Token Estimator (GPT, Claude)",
    description:
        "Calculate the tokens of your text and estimate the cost for AI models like GPT and Claude. Everything happens in the browser.",
    alternates: {
        canonical: "https://calcolafacile.org/en/token-estimator",
        languages: {
            it: "https://calcolafacile.org/it/token-estimator",
            en: "https://calcolafacile.org/en/token-estimator",
        },
    },
};

export default function TokenEstimatorPage() {
    return (
        <Suspense fallback={null}>
            <TokenEstimator />
        </Suspense>
    );
}
