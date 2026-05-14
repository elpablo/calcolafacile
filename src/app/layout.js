import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Derives the active locale from the pathname injected by `proxy.js`
 * (`x-pathname` request header). Defaults to Italian since the root `/`
 * route redirects Italian-speaking users to `/it` and the marketing
 * primary language is Italian.
 */
function resolveLang(pathname) {
    if (typeof pathname !== "string") return "it";
    if (pathname.startsWith("/en")) return "en";
    return "it";
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: {
        default: "CalcolaFacile - Strumenti di calcolo online",
        template: "%s | CalcolaFacile",
    },
    description:
        "Calcolatori online gratuiti per IVA, stipendio, percentuali e molto altro.",
    metadataBase: new URL("https://calcolafacile.org"),
    manifest: "/manifest.json",
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const lang = resolveLang(headerList.get("x-pathname"));
  return (
      <html
          lang={lang}
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
          <head>
              <Script
                  id="theme-init"
                  strategy="beforeInteractive"
                  dangerouslySetInnerHTML={{
                      __html: `
              (function () {
                try {
                  var key = "cf-theme";
                  var storedTheme = localStorage.getItem(key);
                  var isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = storedTheme === "dark" || storedTheme === "light"
                    ? storedTheme
                    : (isSystemDark ? "dark" : "light");

                  document.documentElement.classList.remove("light", "dark");
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute("data-theme", theme);
                } catch (e) {
                  document.documentElement.classList.remove("dark");
                  document.documentElement.classList.add("light");
                  document.documentElement.setAttribute("data-theme", "light");
                }
              })();
            `,
                  }}
              />
          </head>
          <body className="min-h-full flex flex-col" suppressHydrationWarning>
              <div className="fixed right-4 top-4 z-50">
                  <ThemeToggle />
              </div>
              {children}
              <Analytics />
              <SpeedInsights />
          </body>
      </html>
  );
}
