

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    safelist: [
        "bg-blue-600",
        "bg-emerald-600",
        "bg-violet-600",
        "bg-amber-500",
        "text-white",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};