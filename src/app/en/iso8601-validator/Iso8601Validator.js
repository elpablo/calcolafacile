import Iso8601ValidatorCore from "@/components/tools/iso8601-validator/Iso8601ValidatorCore";
import content from "@/components/tools/iso8601-validator/locales/iso8601Validator.en";

export default function Iso8601Validator(props) {
    return <Iso8601ValidatorCore content={content} {...props} />;
}
