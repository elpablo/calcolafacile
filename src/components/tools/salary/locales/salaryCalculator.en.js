const salaryCalculatorEn = {
    lang: "en",
    locale: "en-IE",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "Net Salary Calculator from Gross Income",
    currentPath: "/en/salary-calculator",
    description:
        "This net salary calculator estimates take-home pay from gross annual income. The result is a quick average estimate of monthly and annual net income.",
    contextualTools: [],
    examples: [
        {
            title: "Estimate net salary from $60,000 gross income",
            description:
                "Enter 60000 as gross annual income to estimate monthly and annual take-home pay.",
        },
        {
            title: "Compare job offers",
            description:
                "Enter different gross salary amounts to quickly compare how monthly take-home pay may change between offers.",
        },
        {
            title: "Estimate take-home pay before accepting a contract",
            description:
                "Use the calculator to get a rough monthly net salary estimate before accepting a new role or contract.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                How is net salary estimated from gross income?
            </h3>
            <p>
                Net salary depends on taxes, deductions and local rules. This
                tool uses a simplified average estimate to provide a quick
                result.
            </p>

            <h3 className="font-semibold mt-2">Is the result exact?</h3>
            <p>
                No. It is only an estimate. Actual take-home pay depends on
                location, tax rules, benefits, deductions and employment type.
            </p>
        </>
    ),
    sample: {
        grossAnnualIncome: "60000",
    },
    labels: {
        grossLabel: "Gross annual income ($)",
        grossPlaceholder: "Ex. 60000",
        grossHelp: "Enter your gross annual income",
        monthlyLabel: "Estimated monthly net salary",
        annualLabel: "Estimated annual net salary",
        invalid: "Enter a valid gross annual income greater than 0.",
        copyText: (monthly) => `${monthly} per month`,
        detail: ({ gross, monthly }) =>
            `With a gross annual income of ${gross}, the estimated take-home pay is ${monthly} per month.`,
    },
};

export default salaryCalculatorEn;
