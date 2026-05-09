
import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Terms of Service | CalcolaFacile",
    description:
        "CalcolaFacile Terms of Service: permitted use, limitations of liability, service availability and online tool usage conditions.",
};

export default function TermsPage() {
    return (
        <LegalPageLayout
            title="Terms of Service"
            lastUpdated="Last updated: May 9, 2026"
            intro="These Terms of Service govern access to and use of CalcolaFacile and the online tools available on the website. By using the website, users agree to the conditions set out on this page."
        >
            <LegalSection title="1. Service information">
                <p>
                    CalcolaFacile is a website offering online tools for
                    calculations, conversions, data formatting and other
                    technical or everyday utilities.
                </p>
                <p>The service is provided by NERALAB Srl, Bologna, Italy.</p>
            </LegalSection>

            <LegalSection title="2. Use of the tools">
                <p>
                    The tools available on CalcolaFacile are provided for
                    informational, practical and operational support purposes.
                    Users are responsible for verifying results before relying
                    on them for professional, technical, economic, tax or legal
                    decisions.
                </p>
                <p>
                    Although care is taken to keep calculations and conversions
                    accurate, CalcolaFacile does not guarantee that results are
                    always complete, up to date, error-free or suitable for
                    every specific use case.
                </p>
            </LegalSection>

            <LegalSection title="3. No professional advice">
                <p>
                    The information and tools available on the website do not
                    constitute legal, tax, financial, accounting, technical or
                    other professional advice.
                </p>
                <p>
                    For decisions requiring specialist evaluation, users should
                    consult a qualified professional.
                </p>
            </LegalSection>

            <LegalSection title="4. Local processing of content">
                <p>
                    Many CalcolaFacile tools run directly in the user&apos;s
                    browser. Whenever possible, data entered into the tools is
                    processed locally and is not intentionally stored on the
                    website servers.
                </p>
                <p>
                    Users are encouraged not to enter personal, sensitive,
                    confidential or legally restricted information unless
                    strictly necessary.
                </p>
            </LegalSection>

            <LegalSection title="5. Permitted use">
                <p>Users agree to use CalcolaFacile lawfully and fairly.</p>
                <LegalList>
                    <li>
                        do not use the website for illegal or fraudulent
                        activities;
                    </li>
                    <li>
                        do not attempt to compromise the security, stability or
                        availability of the service;
                    </li>
                    <li>
                        do not perform mass scraping, aggressive automated
                        requests or uses that may overload the infrastructure;
                    </li>
                    <li>
                        do not attempt to access unauthorized areas, systems or
                        data;
                    </li>
                    <li>
                        do not use the website in a way that may harm other
                        users, the provider or third parties.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="6. Availability and changes to the service">
                <p>
                    CalcolaFacile may be modified, updated, suspended or
                    discontinued at any time, including without prior notice,
                    for technical, organizational, security or product evolution
                    reasons.
                </p>
                <p>
                    Continuous and uninterrupted availability of the website or
                    of specific tools is not guaranteed.
                </p>
            </LegalSection>

            <LegalSection title="7. Limitation of liability">
                <p>
                    To the maximum extent permitted by applicable law, NERALAB
                    Srl shall not be liable for direct or indirect damages,
                    economic losses, errors, omissions, service interruptions or
                    consequences arising from the use of, or inability to use,
                    CalcolaFacile.
                </p>
                <p>
                    Use of the website and of the results produced by the tools
                    is at the user&apos;s own responsibility.
                </p>
            </LegalSection>

            <LegalSection title="8. Intellectual property">
                <p>
                    The website, code, design, text, structure and visual
                    elements of CalcolaFacile are protected by applicable
                    intellectual property laws, unless otherwise agreed or
                    stated.
                </p>
                <p>
                    Unauthorized reproduction of the website or substantial
                    parts of it is prohibited, except for uses permitted by law.
                </p>
            </LegalSection>

            <LegalSection title="9. Links to third-party websites or services">
                <p>
                    CalcolaFacile may contain links to third-party websites,
                    services or resources. NERALAB Srl does not control such
                    content and is not responsible for the availability,
                    accuracy, security or privacy practices of external
                    websites.
                </p>
            </LegalSection>

            <LegalSection title="10. Privacy and cookies">
                <p>
                    Personal data processing and the use of cookies or similar
                    technologies are described in the CalcolaFacile Privacy
                    Policy and Cookie Policy.
                </p>
            </LegalSection>

            <LegalSection title="11. Governing law">
                <p>
                    These Terms of Service are governed by Italian law, without
                    prejudice to any mandatory rules applicable to consumer or
                    user protection.
                </p>
            </LegalSection>

            <LegalSection title="12. Changes to these Terms">
                <p>
                    NERALAB Srl may update these Terms of Service over time to
                    reflect legal, technical, functional or organizational
                    changes. The most recent version is always published on this
                    page.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}