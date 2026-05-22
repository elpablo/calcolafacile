import RegexTesterCore from "@/components/tools/regex-tester/RegexTesterCore";
import regexTesterEn from "@/components/tools/regex-tester/locales/regexTester.en";

export default function RegexTester() {
    return <RegexTesterCore content={regexTesterEn} />;
}
