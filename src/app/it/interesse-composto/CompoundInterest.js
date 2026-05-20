import CompoundInterestCore from "@/components/tools/compound-interest/CompoundInterestCore";
import content from "@/components/tools/compound-interest/locales/compoundInterest.it";

export default function CompoundInterest(props) {
    return <CompoundInterestCore content={content} {...props} />;
}
