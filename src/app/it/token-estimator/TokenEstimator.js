"use client";

import { Suspense } from "react";
import TokenEstimatorCore from "@/components/tools/token-estimator/TokenEstimatorCore";
import content from "@/locales/tools/tokenEstimator.it";

export default function TokenEstimator(props) {
    return (
        <Suspense fallback={null}>
            <TokenEstimatorCore content={content} {...props} />
        </Suspense>
    );
}
