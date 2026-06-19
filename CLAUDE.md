# CalcolaFacile project notes for Claude Code

This project is CalcolaFacile, a multilingual Next.js web app containing browser-based calculators and developer tools.

## Stack

- Next.js App Router
- React client components for interactive tools
- Tailwind CSS
- Vitest for pure logic/unit tests
- Playwright for end-to-end/browser tests
- Localized Italian and English pages

## General architecture

Most tools follow this structure:

```txt
src/components/tools/<tool-name>/
  <ToolName>Core.js              # Interactive client component
  <toolName>Logic.js             # Pure functions, parsing, calculations, formatting
  locales/
    <toolName>.en.js             # English localized content and labels
    <toolName>.it.js             # Italian localized content and labels
  <toolName>Examples.js          # Optional examples / query-param presets
  __tests__/
    <toolName>Logic.test.js      # Vitest tests for pure logic
```

Some older tools may still have logic mixed into the Core component. When refactoring, prefer extracting pure logic into a dedicated `*Logic.js` file and adding Vitest coverage.

## Pages and wrappers

Localized routes usually live under:

```txt
src/app/en/<tool-slug>/page.js
src/app/it/<tool-slug>/page.js
```

A page usually imports the localized content and renders the corresponding Core component.

Example pattern:

```js
import ToolCore from "@/components/tools/<tool-name>/<ToolName>Core";
import content from "@/components/tools/<tool-name>/locales/<toolName>.en";

export default function Page() {
    return <ToolCore content={content} />;
}
```

Do not assume Italian slugs are translated. Check the existing route and `currentPath` in the locale files.

## ToolLayout and ResultBox

Most tools use:

```js
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
```

`ToolLayout` provides the standard page structure: title, description, examples, FAQ and related/contextual tools.

`ResultBox` provides the standard result container and copy-to-clipboard button.

Current `ResultBox` supports:

```jsx
<ResultBox
    lang={lang}
    copyText={textToCopy}
    testId="some-result-testid"
>
    ...result content...
</ResultBox>
```

For small cards where the full copy button would be too wide, use:

```jsx
<ResultBox compactCopy ...>
```

When adding or updating a tool, prefer using `ResultBox` instead of custom copy buttons.

## Locales

Locale files usually export a content object with:

```js
{
    lang: "en" | "it",
    locale: "en-US" | "it-IT",
    title,
    currentPath,
    description,
    contextualTools,
    examples,
    faq,
    sample,
    labels,
}
```

Labels used inside Core components must be present in both English and Italian locale files.

## Tools listing page

The English tools overview page is:

```txt
src/app/en/tools/page.js
```

It manually lists tool groups and links. When adding a new public tool, update this page if the tool should appear in the public toolbox listing.

There may also be homepage/category registries elsewhere. Check existing patterns before adding new entries.

## Vitest conventions

Use Vitest for pure logic tests. Prefer testing logic files directly, not React components.

Typical location:

```txt
src/components/tools/<tool-name>/__tests__/<toolName>Logic.test.js
```

Run a single Vitest file with:

```bash
npm run test -- src/components/tools/<tool-name>/__tests__/<toolName>Logic.test.js
```

or, if the project script differs, use the existing package.json test command pattern.

Good Vitest coverage should include:

- valid input
- invalid input
- edge cases
- locale-specific formatting/parsing
- copy/output text when relevant
- regression tests for bugs discovered manually

Keep logic functions deterministic when possible. Avoid testing browser layout in Vitest.

## Playwright conventions

Playwright tests live in:

```txt
tests/<tool-name>.spec.js
```

Shared helpers live in:

```txt
tests/helpers/toolTestHelpers.js
```

Useful helpers include:

```js
clearLocalStorageKey(page, storageKey)
expectPageReady(page, testId, storageKey)
```

However, some older tools may not have stable `data-testid` values yet. When adding Playwright tests, prefer adding explicit `testId` props to `ResultBox` or stable IDs to important inputs/buttons if it improves test reliability.

Playwright tests should cover:

- English page loads
- Italian page loads
- main happy path
- invalid input/error state
- copy/result visibility when relevant
- examples/query parameters when relevant
- mobile/responsive behavior only when the tool has known responsive risks

Be careful with localized routes and labels. Use regexes that match the actual locale strings from the locale files.

## Browser storage

Many tools persist state with:

```js
loadLocalState
saveLocalState
```

from:

```txt
src/lib/browserStorage
```

When adding Playwright tests, clear the tool storage key before each test to avoid state leakage.

## Current refactoring style

When modernizing older tools:

1. Extract pure logic into `*Logic.js`.
2. Keep visual layout unchanged unless the task explicitly asks for UI changes.
3. Add Vitest tests for the logic.
4. Add or update Playwright tests only after the logic is stable.
5. Use `ResultBox` for result/copy UX.
6. Keep localStorage and existing URL/query-param behavior intact.
7. Avoid broad rewrites in the same patch.

## JSON Formatter notes

The JSON Formatter currently needs modernization.

Desired direction:

- Extract formatting/minifying/error parsing into `jsonFormatterLogic.js`.
- Keep drag & drop behavior unchanged.
- Keep localStorage behavior unchanged.
- Keep current ResultBox behavior unchanged.
- Improve invalid JSON diagnostics by extracting position, line and column when possible.
- Generate a small error context preview around the failing line.
- Add Vitest tests before doing larger UI changes.
- Do not implement a full line-number textarea UI in the first refactor step.

## Coding preferences

- Prefer small, focused patches.
- Preserve existing UI unless asked otherwise.
- Do not introduce new dependencies unless clearly justified.
- Keep both Italian and English localizations aligned.
- Keep accessibility in mind: buttons should have clear text or aria-labels.
- Favor stable selectors for Playwright over brittle text-only selectors when practical.