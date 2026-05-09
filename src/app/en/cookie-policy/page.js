

import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Cookie Policy | CalcolaFacile",
    description:
        "CalcolaFacile cookie policy: technical cookies, localStorage, browser storage and privacy-friendly use of online tools.",
};

export default function CookiePolicyPage() {
    return (
        <LegalPageLayout
            title="Cookie Policy"
            lastUpdated="Last updated: May 9, 2026"
            intro="This Cookie Policy explains how CalcolaFacile uses cookies, localStorage and similar browser technologies to provide fast, privacy-friendly online tools."
        >
            <LegalSection title="What cookies and similar technologies are">
                <p>
                    Cookies are small text files stored by the browser when a
                    user visits a website. Similar technologies include
                    localStorage, sessionStorage and other browser-based storage
                    mechanisms that may save information locally on the
                    user&apos;s device.
                </p>
            </LegalSection>

            <LegalSection title="How CalcolaFacile uses these technologies">
                <p>
                    CalcolaFacile may use cookies or similar technologies only
                    where useful for the operation, security or usability of the
                    website and its tools.
                </p>

                <LegalList>
                    <li>
                        technical cookies or equivalent mechanisms required for
                        the website to work correctly;
                    </li>
                    <li>
                        localStorage or sessionStorage to remember interface
                        preferences, tool settings or recent local state;
                    </li>
                    <li>
                        aggregated or anonymous analytics tools, where enabled,
                        to understand general website usage and improve the
                        service.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Local processing and browser storage">
                <p>
                    Many CalcolaFacile tools run directly inside the user&apos;s
                    browser. Data entered into tools such as JSON formatters,
                    JWT decoders, timestamp converters or unit converters is
                    normally processed locally and is not intentionally sent to
                    CalcolaFacile servers.
                </p>

                <p>
                    Browser storage may be used to remember non-sensitive local
                    preferences, for example the selected theme, last selected
                    units or other settings that make the tools easier to use.
                </p>
            </LegalSection>

            <LegalSection title="Technical and functional storage">
                <p>
                    Technical and functional storage is used to provide the
                    service requested by the user or to improve the usability of
                    the website without profiling the user for advertising
                    purposes.
                </p>

                <p>
                    These technologies generally do not require prior consent
                    where they are strictly necessary or functional to the
                    service requested by the user, according to applicable EU
                    and Italian cookie rules.
                </p>
            </LegalSection>

            <LegalSection title="Advertising and profiling cookies">
                <p>
                    CalcolaFacile does not currently use advertising profiling
                    cookies for behavioral advertising.
                </p>

                <p>
                    If advertising, remarketing or non-essential profiling tools
                    are introduced in the future, this Cookie Policy will be
                    updated and, where required, users will be asked for consent
                    through an appropriate consent mechanism.
                </p>
            </LegalSection>

            <LegalSection title="Managing cookies and local storage">
                <p>
                    Users can manage, block or delete cookies and local browser
                    storage through their browser settings.
                </p>

                <LegalList>
                    <li>deleting cookies may reset website preferences;</li>
                    <li>
                        deleting localStorage may remove saved tool settings or
                        recent local state;
                    </li>
                    <li>
                        blocking technical storage may prevent some features
                        from working as expected.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Relationship with the Privacy Policy">
                <p>
                    For more information about personal data processing,
                    purposes, legal bases, retention and user rights, please
                    refer to the CalcolaFacile Privacy Policy.
                </p>
            </LegalSection>

            <LegalSection title="Changes to this Cookie Policy">
                <p>
                    This Cookie Policy may be updated over time to reflect
                    legal, technical or functional changes to the website.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}