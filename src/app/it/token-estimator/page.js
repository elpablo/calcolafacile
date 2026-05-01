import { Suspense } from "react";
import TokenEstimator from "./TokenEstimator";

export const metadata = {
    title: "Stima token LLM online (GPT, Claude)",
    description:
        "Calcola i token del tuo testo e stima il costo per modelli AI come GPT e Claude. Tutto avviene nel browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/token-estimator",
    },
};

export default function TokenEstimatorPage() {
    return (
        <Suspense fallback={null}>
            <TokenEstimator />
        </Suspense>
    );
}
