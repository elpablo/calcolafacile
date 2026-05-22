import MortgageCalculatorCore from "@/components/tools/mortgage-calculator/MortgageCalculatorCore";
import mortgageCalculatorEn from "@/components/tools/mortgage-calculator/locales/mortgageCalculator.en";

export default function MortgageCalculator() {
    return <MortgageCalculatorCore content={mortgageCalculatorEn} />;
}