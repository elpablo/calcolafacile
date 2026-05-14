"use client";

import TokenEstimatorCore from "@/components/tools/token-estimator/TokenEstimatorCore";
import content from "@/locales/tools/tokenEstimator.it";

export default function TokenEstimator(props) {
    return <TokenEstimatorCore content={content} {...props} />;
}
