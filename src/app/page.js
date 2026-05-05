import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
    const acceptLanguage = (await headers()).get("accept-language") || "";

    const isItalian = acceptLanguage.toLowerCase().startsWith("it");

    if (isItalian) {
        redirect("/it");
    }

    redirect("/en");
}
