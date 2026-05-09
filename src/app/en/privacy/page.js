import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Privacy Policy | CalcolaFacile",
    description:
        "CalcolaFacile privacy policy under EU Regulation 2016/679 (GDPR).",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            lastUpdated="Last updated: May 9, 2026"
            intro="CalcolaFacile is designed to provide fast and simple browser-based tools while minimizing personal data collection and following a privacy-friendly approach."
        >
            <LegalSection title="Data Controller">
                <p>
                    The data controller is NERALAB Srl, based in Bologna, Italy.
                </p>
                <p>
                    For privacy-related requests or to exercise GDPR rights,
                    users may contact the controller at info@neralab.it.
                </p>
            </LegalSection>

            <LegalSection title="Types of data processed">
                <p>
                    CalcolaFacile does not require user accounts and does not
                    intentionally collect personally identifiable information
                    through the tools available on the website.
                </p>

                <p>
                    CalcolaFacile follows a privacy-first and data minimization
                    approach, aiming to limit the processing of personal data to
                    what is strictly necessary for the technical operation of the service.
                </p>

                <LegalList>
                    <li>
                        technical data required for website and server operation
                        (for example IP address, user-agent and request
                        timestamps);
                    </li>
                    <li>
                        local preferences stored in the browser through
                        localStorage or equivalent technologies;
                    </li>
                    <li>
                        aggregated or anonymous statistical data related to
                        website usage, where analytics tools are enabled.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Data processed by online tools">
                <p>
                    Most tools available on CalcolaFacile process data directly
                    inside the user&apos;s browser.
                </p>

                <p>
                    Content entered into the tools (for example JSON, JWT,
                    timestamps, conversions or other technical data) is not
                    intentionally stored on the website servers except where
                    strictly necessary for technical, security or maintenance
                    purposes.
                </p>
            </LegalSection>

            <LegalSection title="Purpose and legal basis of processing">
                <p>Any processed data is used exclusively to:</p>

                <LegalList>
                    <li>provide online services and tools correctly;</li>
                    <li>ensure website security, stability and maintenance;</li>
                    <li>improve user experience and tool quality;</li>
                    <li>comply with applicable legal obligations.</li>
                </LegalList>

                <p>
                    The legal basis for processing is the legitimate interest of
                    the controller under Article 6(1)(f) GDPR and, where
                    applicable, compliance with legal obligations.
                </p>
            </LegalSection>

            <LegalSection title="Data retention">
                <p>
                    Technical logs and system data are retained only for the
                    time necessary to ensure security, monitoring and service
                    continuity.
                </p>

                <p>
                    Preferences stored locally through localStorage remain only
                    inside the user&apos;s browser until manually or
                    automatically removed.
                </p>
            </LegalSection>

            <LegalSection title="Disclosure and transfer of data">
                <p>
                    Data is not sold and is not used for advertising profiling
                    activities.
                </p>

                <p>
                    Some technical data may be processed by infrastructure,
                    hosting, CDN or analytics providers supporting website
                    operation.
                </p>
            </LegalSection>

            <LegalSection title="User rights">
                <p>
                    Users may exercise the rights provided by Articles 15-22
                    GDPR, including:
                </p>

                <LegalList>
                    <li>access to personal data;</li>
                    <li>rectification or deletion of data;</li>
                    <li>restriction of processing;</li>
                    <li>objection to processing;</li>
                    <li>filing a complaint with the competent authority.</li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Changes to this privacy policy">
                <p>
                    This Privacy Policy may be updated over time to reflect
                    legal, technical or functional changes affecting the
                    website.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}