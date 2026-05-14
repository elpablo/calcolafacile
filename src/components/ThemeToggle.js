"use client";

/**
 * @file Dark/light theme toggle, mounted globally in `app/layout.js`.
 *
 * The initial theme is applied by a blocking inline script in the document
 * head (see `src/app/layout.js`) to avoid flash-of-unstyled-content. This
 * component:
 *   - subscribes to `<html class>` mutations via {@link useSyncExternalStore}
 *     so its icon stays in sync with the document state,
 *   - persists the user's choice under `localStorage["cf-theme"]`,
 *   - infers the UI language from the current URL prefix (`/it` vs `/en`)
 *     when no `lang` prop is provided.
 */

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const THEME_KEY = "cf-theme";

const labels = {
    it: {
        light: "Passa alla modalità chiara",
        dark: "Passa alla modalità scura",
    },
    en: {
        light: "Switch to light mode",
        dark: "Switch to dark mode",
    },
};

function getThemeSnapshot() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot() {
    return "light";
}

function subscribeToTheme(callback) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
}

export default function ThemeToggle({ lang }) {
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

    const pathname = usePathname();
    const inferredLang = pathname?.startsWith("/en") ? "en" : "it";
    const activeLang = lang || inferredLang;

    const applyTheme = (nextTheme) => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
    };

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
    };

    const localizedLabels = labels[activeLang] || labels.it;
    const label = theme === "dark" ? localizedLabels.light : localizedLabels.dark;

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-xl shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            aria-label={label}
            title={label}
        >
            {theme === "dark" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-zinc-800 dark:text-zinc-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-zinc-800 dark:text-zinc-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .34 0 .67.05 1A7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
