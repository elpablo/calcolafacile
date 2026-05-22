import CryptoProfitCalculatorCore from "@/components/tools/crypto-profit-calculator/CryptoProfitCalculatorCore";
import cryptoProfitCalculatorIt from "@/components/tools/crypto-profit-calculator/locales/cryptoProfitCalculator.it";

export default function CryptoProfitCalculator() {
    return <CryptoProfitCalculatorCore content={cryptoProfitCalculatorIt} />;
}
