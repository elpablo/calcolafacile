"use client";

/**
 * @file Opinionated number/text input used by simple calculators.
 */

/**
 * Number/text input with optional `prefix` (e.g. `€`) and/or `suffix`
 * (e.g. `€`, `%`) decorators, plus optional help text.
 *
 * @param {{
 *   label: string,
 *   value: string | number,
 *   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 *   type?: string,
 *   inputMode?: string,
 *   step?: string,
 *   placeholder?: string,
 *   prefix?: string,
 *   suffix?: string,
 *   helpText?: string,
 * }} props
 */
export function ToolInput({
    label,
    value,
    onChange,
    type = "text",
    inputMode = "decimal",
    step,
    placeholder,
    prefix,
    suffix,
    helpText,
}) {
    // Use inline style for padding so Safari's UA stylesheet cannot override it.
    const paddingStyle = {
        paddingLeft: prefix ? "2.5rem" : "0.75rem",
        paddingRight: suffix ? "2.5rem" : "0.75rem",
    };

    return (
        <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                {label}
            </label>
            <div className="relative">
                {prefix && (
                    <span
                        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 flex items-center text-sm font-medium text-zinc-400 dark:text-zinc-500"
                        style={{ width: "2.5rem", justifyContent: "center" }}
                    >
                        {prefix}
                    </span>
                )}
                <input
                    type={type}
                    inputMode={inputMode}
                    step={step}
                    value={value}
                    onChange={onChange}
                    style={paddingStyle}
                    className="w-full rounded-lg border border-zinc-300 bg-white py-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder={placeholder}
                />
                {suffix && (
                    <span
                        className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 flex items-center text-sm font-medium text-zinc-400 dark:text-zinc-500"
                        style={{ width: "2.5rem", justifyContent: "center" }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
            {helpText && (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {helpText}
                </p>
            )}
        </div>
    );
}
