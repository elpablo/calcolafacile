import CryptoProfitCalculatorCore from "@/components/tools/crypto-profit-calculator/CryptoProfitCalculatorCore";
import cryptoProfitCalculatorEn from "@/components/tools/crypto-profit-calculator/locales/cryptoProfitCalculator.en";

export default function CryptoProfitCalculator() {
    return <CryptoProfitCalculatorCore content={cryptoProfitCalculatorEn} />;
}