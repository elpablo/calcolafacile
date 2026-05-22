import MortgageCalculatorCore from "@/components/tools/mortgage-calculator/MortgageCalculatorCore";
import mortgageCalculatorIt from "@/components/tools/mortgage-calculator/locales/mortgageCalculator.it";

export default function MortgageCalculator() {
    return <MortgageCalculatorCore content={mortgageCalculatorIt} />;
}