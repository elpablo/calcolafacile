import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * Root entry point at `/`.
 *
 * The site is fully bilingual (Italian / English) and there is no neutral
 * landing page: every visitor is redirected to either `/it` or `/en` based
 * on the `Accept-Language` header.
 *
 * - Italian: any `Accept-Language` value starting with `it`.
 * - English: everything else (default).
 */
export default async function Home() {
    const acceptLanguage = (await headers()).get("accept-language") || "";

    const isItalian = acceptLanguage.toLowerCase().startsWith("it");

    if (isItalian) {
        redirect("/it");
    }

    redirect("/en");
}
