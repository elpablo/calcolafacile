import ReverseDiscountCalculator from "./ReverseDiscountCalculator";

export const metadata = {
    title: "Inverse Discount Calculation Online - Free",
    description:
        "Calculate the original price from the discounted price and the discount percentage.",
    alternates: {
        canonical: "https://calcolafacile.org/en/inverse-discount-calculation",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-sconto-inverso",
            en: "https://calcolafacile.org/en/inverse-discount-calculation",
        },
    },
};

export default function InverseDiscountCalculationPage() {
    return <ReverseDiscountCalculator />;
}
