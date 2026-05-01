import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

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
};

export default function RootLayout({ children }) {
  return (
      <html
          lang="it"
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
          <head>
              <meta
                  name="google-site-verification"
                  content="rHl_ZrT78GhkQnlqRyoGtu1kYkLlNwD9hvs6q4uOInE"
              />
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
          </body>
      </html>
  );
}
