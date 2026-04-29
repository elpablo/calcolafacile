"use client";

import { useSyncExternalStore } from "react";

const THEME_KEY = "cf-theme";

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

export default function ThemeToggle() {
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

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

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            aria-label={theme === "dark" ? "Passa alla modalita light" : "Passa alla modalita dark"}
            title={theme === "dark" ? "Passa alla modalita light" : "Passa alla modalita dark"}
        >
            {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
    );
}
