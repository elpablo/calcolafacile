# CalcolaFacile — Project Review

_Generated review of the codebase covering quality, correctness, security, SEO,
internationalisation, and the proposed evolution roadmap._

---

## 1. Project at a glance

| Aspect              | Value |
| ------------------- | ----- |
| Framework           | Next.js **16.2.6** (App Router, RSC, JS — no TS) |
| React               | 19.2.4 |
| Styling             | Tailwind v4 (PostCSS) |
| Hosting hints       | Vercel (`@vercel/analytics`, `@vercel/speed-insights`, `@vercel/functions`) |
| Languages           | `it` (default), `en` |
| Routing             | `/`, `/it/...`, `/en/...` + dynamic `/<lang>/[conversion]` |
| Tests               | Playwright E2E only (5 specs). No unit tests. |
| Lint                | ESLint flat config + `eslint-config-next` core-web-vitals |
| Bundle analysis     | `@next/bundle-analyzer` (`npm run analyze`) |

Architecture pattern (per [`.github/skills/tool-migration/SKILL.md`](.github/skills/tool-migration/SKILL.md)):
- `src/components/tools/<tool>/<Name>Core.js` — logic, locale-agnostic.
- `src/locales/tools/<name>.<lang>.js` — strings + FAQ JSX.
- `src/app/<lang>/<route>/<Name>.js` — thin wrapper.
- `src/app/<lang>/<route>/page.js` — metadata-only server component.

---

## 2. Overall quality assessment

| Area                            | Score | Notes |
| ------------------------------- | :---: | ----- |
| Architecture & layering         | **B** | Clean Core+locales pattern for developer tools, but inconsistently applied. |
| Code consistency                | **C+** | Half the tools follow the new pattern; calculators are still duplicated. |
| i18n / SEO                      | **C** | `hreflang` mistakes, missing locale parity, hardcoded `<html lang="it">`. |
| Correctness of logic            | **C** | Several calculators are factually wrong (currency, salary, VAT rates). |
| Accessibility                   | **B-** | Reasonable labels, but some interactive cards are buttons-as-links. |
| Performance                     | **B+** | Static export-friendly, bundle analyzer wired in, lazy syntax highlighter. |
| Security                        | **B** | No CSP, no rate limit on `/api/public-ip`, otherwise tight. |
| Testing                         | **C** | E2E covers happy paths; no unit tests for pure logic. |
| Documentation                   | **C → B** | Now augmented with JSDoc on libs/components/routes (this pass). |

**Headline:** the foundations are good — fast, privacy-friendly, decent SEO
scaffolding, a well-documented migration pattern. The biggest debts are
**localisation correctness** (English calculators dressed in Italian numbers),
**duplication** of half the tools, and a few **broken `hreflang` entries** that
search engines will penalise.

---

## 3. Bugs & correctness issues

### 3.1 Broken / inconsistent hreflang and canonical links (SEO-impacting)

| File | Problem |
| ---- | ------- |
| [src/app/it/calcolatore-iva/page.js](src/app/it/calcolatore-iva/page.js#L11) | `languages.en` points to `/en/vat-calculation` — **404**; correct slug is `/en/vat-calculator`. |
| [src/app/en/public-ip-checker/page.js](src/app/en/public-ip-checker/page.js#L10) | `languages.it` points to `/it/public-ip-checker` — **404**; correct slug is `/it/verifica-ip-pubblico`. |
| [src/app/en/encoding-tools/page.js](src/app/en/encoding-tools/page.js#L12) | `languages.it` falls back to `https://calcolafacile.org/it` (homepage). No IT counterpart exists. |
| [src/app/en/json-tools/page.js](src/app/en/json-tools/page.js#L12) | Same as above — IT version missing. |
| [src/app/en/tools/page.js](src/app/en/tools/page.js#L12) | Same — landing exists only in English. |

### 3.2 Wrong currency / locale in English calculators

All EN calculators format money as **USD** while content still describes
Italian VAT rates (22 / 10 / 4 %), Italian salary semantics, and €-style
narratives. Mixed-up files:

- [src/app/en/vat-calculator/IvaCalculator.js](src/app/en/vat-calculator/IvaCalculator.js#L38) — `currency: "USD"` with VAT rates `22/10/4` (Italian).
- [src/app/en/salary-calculator/SalaryCalculator.js](src/app/en/salary-calculator/SalaryCalculator.js#L18) — USD with a 0.7 multiplier modelled on Italian RAL.
- [src/app/en/percentage-calculator/PercentageCalculator.js](src/app/en/percentage-calculator/PercentageCalculator.js#L39)
- [src/app/en/margin-calculation/MarginCalculator.js](src/app/en/margin-calculation/MarginCalculator.js#L42)
- [src/app/en/markup-calculation/MarkupCalculator.js](src/app/en/markup-calculation/MarkupCalculator.js#L41)
- [src/app/en/inverse-discount-calculation/ReverseDiscountCalculator.js](src/app/en/inverse-discount-calculation/ReverseDiscountCalculator.js#L29)

Additionally, [src/app/it/token-estimator/TokenEstimator.js](src/app/it/token-estimator/TokenEstimator.js#L54) uses `currency: "USD"` with an `it-IT` locale — defensible (OpenAI bills in USD), but worth a UI note.

### 3.3 `ToolInput` silently ignores `prefix`

[`ToolInput`](src/components/ToolLayout.js) renders only a `suffix`. EN calculators pass `prefix="$"`
(e.g. [salary](src/app/en/salary-calculator/SalaryCalculator.js#L73), [VAT](src/app/en/vat-calculator/IvaCalculator.js#L104)). The prop is dropped without warning.

**Fix options:** add `prefix` support to `ToolInput`, or remove the prop and
encode the currency symbol into the label.

### 3.4 Naive salary calculator

Both [IT](src/app/it/calcolo-stipendio-netto/SalaryCalculator.js#L11) and [EN](src/app/en/salary-calculator/SalaryCalculator.js#L11) compute net as `gross * 0.7`. This is
acceptable as a placeholder but is misleading at the extremes (no INPS / IRPEF
brackets, no allowances). Either label clearly as “rough estimate”, or
implement Italian bracket-based math (IRPEF 23/35/43 + INPS ≈ 9.49 % + regional
add-ons).

### 3.5 Sitemap drift

[`src/app/sitemap.js`](src/app/sitemap.js) hardcodes the static-route lists and is out of sync with the
filesystem:
- Missing: `/en/public-ip-checker`, `/en/encoding-tools`, `/en/json-tools`, `/en/tools`.
- Missing: `/it/verifica-ip-pubblico`.

### 3.6 `useSearchParams` without `Suspense`

[`TokenEstimator.js`](src/app/en/token-estimator/TokenEstimator.js) is correctly wrapped in `<Suspense>`, but
[`JwtDecoderCore`](src/components/tools/jwt/JwtDecoderCore.js) and
[`JsonFormatterCore`](src/components/tools/json/JsonFormatterCore.js) also call
`useSearchParams()` — verify their wrapper pages also use `<Suspense>` (Next.js
15+ requires it for static-prerendered pages).

### 3.7 Misc

- `<html lang="it">` is hardcoded in [`layout.js`](src/app/layout.js#L31) — every `/en/*` page reports the wrong document language. Bad for screen readers and SEO.
- `Geist` font is subsetted to `latin` only — fine here, but if Italian uses accented chars, double-check coverage (it does in `latin`).
- `.DS_Store` files are committed under `src/app/`, `src/app/en/`, `src/app/it/`, `src/components/tools/`. Add to `.gitignore` and remove.
- [`PublicIpCheckerCore`](src/components/tools/public-ip/PublicIpCheckerCore.js#L82) effect depends on `labels.errors.loadFailed` — harmless but pointless re-run trigger.
- Inline footers in [it](src/app/it/page.js) / [en](src/app/en/page.js) call `new Date().getFullYear()` in a server component — that locks the year to **build time**, not runtime. Either render on the client or accept yearly redeploys.

---

## 4. Architecture & code smells

### 4.1 Massive duplication in calculators

Per the migration skill, ~7 tools still use the **old duplicated pattern**:

| Tool | IT file | EN file |
| ---- | ------- | ------- |
| VAT calculator        | `it/calcolatore-iva/IvaCalculator.js`                 | `en/vat-calculator/IvaCalculator.js` |
| Percentage calculator | `it/calcolo-percentuale/PercentageCalculator.js`      | `en/percentage-calculator/PercentageCalculator.js` |
| Margin calculator     | `it/calcolo-margine/MarginCalculator.js`              | `en/margin-calculation/MarginCalculator.js` |
| Markup calculator     | `it/calcolo-markup/MarkupCalculator.js`               | `en/markup-calculation/MarkupCalculator.js` |
| Salary calculator     | `it/calcolo-stipendio-netto/SalaryCalculator.js`      | `en/salary-calculator/SalaryCalculator.js` |
| Reverse discount      | `it/calcolo-sconto-inverso/ReverseDiscountCalculator.js` | `en/inverse-discount-calculation/ReverseDiscountCalculator.js` |
| Token estimator       | `it/token-estimator/TokenEstimator.js`                | `en/token-estimator/TokenEstimator.js` |

The new pattern (Core + locales) is fully proven by the eight developer tools
already migrated. **Migrating the seven above would eliminate ~2,500 lines of
duplication** and naturally fix §3.2 (currency mismatch) along the way.

### 4.2 `ToolLayout.js` is a god module

~600 lines containing layout, two input primitives, a global tool registry
(`defaultRelatedTools`), a localisation helper, and i18n strings.

Suggested split:
```
src/components/ToolLayout/
  index.js                 ← <ToolLayout/>
  ToolInput.js
  ResultBox.js
  PracticalExamples.js
  ContextualToolLinks.js
  RelatedToolsGrid.js
  registry.js              ← defaultRelatedTools (single source of truth)
  i18n.js                  ← chrome strings
```

This also lets the homepages, `RecentToolsSection`, and `ToolLayout` share the
same canonical tool list (currently re-declared at least four times: each
homepage, `ToolLayout.defaultRelatedTools`, every locale file’s
`contextualTools`).

### 4.3 No central tool registry

Tool URLs, titles and descriptions are repeated in:
- [`src/app/it/page.js`](src/app/it/page.js), [`src/app/en/page.js`](src/app/en/page.js) (tools grid)
- [`src/components/ToolLayout.js`](src/components/ToolLayout.js) (`defaultRelatedTools`)
- Each `src/locales/tools/*.js` (`contextualTools`)
- [`src/app/sitemap.js`](src/app/sitemap.js)

A single `src/config/tools.js` exporting `{ key, slug: { it, en }, title: { it, en }, description: { it, en }, category }` would let everything else derive from it (homepages, sitemap, hreflang map, related/contextual sections).

### 4.4 Inconsistent hydration pattern

Migrated tools use the “outer shell + inner content, keyed on `hasHydrated`”
pattern from the migration skill. Older calculators still call `useState`
directly. When migrating, adopt the same pattern uniformly to enable
localStorage persistence safely.

---

## 5. Internationalisation gaps

1. **`<html lang>` is static** — should be inferred from the URL (split the
   tree into a `(it)` and `(en)` route group, each with its own `layout.js`).
2. **Asymmetric pages**: `/en/encoding-tools`, `/en/json-tools`, `/en/tools`
   exist with no IT counterpart. Either translate them (`/it/strumenti-...`)
   or remove them and rely on the homepage.
3. **Locales hardcode their counterpart**: each locale file’s `contextualTools`
   list points only at its own language. The cross-language mapping (used in
   `<link rel="alternate" hreflang=...>`) is derived ad-hoc per page → easy to
   drift. Centralise in §4.3.
4. **Italian translations are uneven** — some FAQ JSX is verbatim Italian
   marketing copy while the EN version is shorter / generic. Consider a copy
   review pass.

---

## 6. Security & privacy

- **No `Content-Security-Policy` header** — easy win in `next.config.mjs`
  via `headers()` (style-src self + inline for the theme script with a nonce,
  script-src self + Vercel Analytics + Speed Insights endpoints).
- **`/api/public-ip` has no rate limiting**. Trivial to scrape. Add a simple
  edge-runtime guard (e.g. `@vercel/kv` or `@upstash/ratelimit`).
- The endpoint echoes `x-forwarded-for` and `x-real-ip` back to the caller —
  fine for self-introspection but consider stripping them in production unless
  the UI actively needs them (it does, for the “VPN detection” narrative).
- Theme inline script in `<head>` uses `dangerouslySetInnerHTML` (typical
  pattern, acceptable). With CSP, give it a `nonce`.
- `localStorage` usage is well-guarded by [`canUseBrowserStorage`](src/lib/browserStorage.js) and JSON-safe.

---

## 7. Performance

- `react-syntax-highlighter` is properly lazy-loaded via `next/dynamic`
  ([`JsonCodeBlock.js`](src/components/tools/json/JsonCodeBlock.js)). Good.
- `RecentToolsSection` is `"use client"` and consequently won’t render during
  SSR; this is fine (it’s a personalised UI element).
- The tool catalogue is small; bundle size should be dominated by Tailwind +
  React. Verify with `npm run analyze`.
- Conversion landing pages are statically generated via `generateStaticParams`
  — excellent for SEO and TTFB.
- The `sitemap` regenerates `lastModified = new Date()` for conversion pages
  on every build — fine, but redundant if the catalogue did not change.

---

## 8. Testing

Existing Playwright specs cover homepages, JSON Formatter, JWT Decoder, Unit
Converter and the “recent tools” widget. They’re solid happy-path smoke tests.

**Gaps:**
- Pure logic (token estimation, unit conversion, JWT decode, base64 round-trip,
  VAT/markup/margin math) has **no unit tests**. These are exactly the kinds of
  functions where bugs (cf. §3.2) hide.
- No Lighthouse / a11y assertions.
- No tests for redirects (`/` → `/it`|`/en`) or for `<link rel="alternate">`
  presence.

Suggested addition: introduce **Vitest** with a `src/lib/__tests__` folder for
extracted pure functions. The migration in §4.1 makes this natural — once
`computeVat(amount, rate, mode)` exists as a free function, it can be unit
tested in isolation.

---

## 9. Documentation status (this pass)

Added concise JSDoc / file-level comments to:

- [src/lib/browserStorage.js](src/lib/browserStorage.js) — module doc + JSDoc on each helper.
- [src/lib/toolUsage.js](src/lib/toolUsage.js) — storage shape, helper docs.
- [src/config/conversions.js](src/config/conversions.js) — module doc + `Conversion` typedef.
- [src/app/sitemap.js](src/app/sitemap.js), [src/app/robots.js](src/app/robots.js), [src/app/page.js](src/app/page.js) — purpose comments.
- [src/app/api/public-ip/route.js](src/app/api/public-ip/route.js) — file doc + JSDoc on helpers.
- [src/components/ToolLayout.js](src/components/ToolLayout.js) — file doc, `ToolInput`, `ResultBox`, default export.
- [src/components/RecentToolsSection.js](src/components/RecentToolsSection.js),
  [src/components/ThemeToggle.js](src/components/ThemeToggle.js),
  [src/components/LegalPageLayout.js](src/components/LegalPageLayout.js) — file-level docs.

Not documented (intentionally, to avoid touching code under active migration
or out-of-scope refactors): tool Core components (well-named and structured
already), locale files (self-documenting), individual page wrappers.

The repo also has good in-repo docs already: [`AGENTS.md`](AGENTS.md),
[`CLAUDE.md`](CLAUDE.md), and the [migration skill](.github/skills/tool-migration/SKILL.md).

---

## 10. Prioritised action plan

### Quick wins (≤ 1h each, mostly mechanical)

1. **Fix the two broken hreflang URLs** (§3.1, first two rows).
2. **Update `sitemap.js`** to add missing routes (§3.5).
3. **Remove `prefix="$"` props** from EN calculators, or add `prefix` support to [`ToolInput`](src/components/ToolLayout.js) (§3.3).
4. **Set the correct `<html lang>` per route** by splitting the app into `(it)` and `(en)` route groups, each with its own `layout.js`.
5. **Clean up committed `.DS_Store` files** and add to `.gitignore`.
6. **Centralise the year in the footer** (move to a client component or accept the build-time year).

### Medium effort

7. **Localise EN calculators properly** (§3.2): replace `currency: "USD"` with `currency: "EUR"` and `en-GB`/`en-IE` locale, or commit to a true USD-based UX (different VAT rates, different salary model). Decide which audience EN serves.
8. **Migrate remaining 7 calculators** to the Core+locales pattern (§4.1). The skill at [`.github/skills/tool-migration/SKILL.md`](.github/skills/tool-migration/SKILL.md) is the playbook.
9. **Introduce `src/config/tools.js`** as the single source of truth (§4.3) and re-derive homepages, sitemap, related-tools registry, and hreflang maps from it.
10. **Split `ToolLayout.js`** into a folder of focused modules (§4.2).
11. **Add Vitest** + unit tests for the pure functions extracted during the migration (§8).

### Larger evolutions

12. **Proper i18n framework**: as the tool count grows, an explicit framework
    (`next-intl`, `next-international`, or a hand-rolled `dictionaries` map)
    will outperform per-tool locale files for shared chrome (footer, recently
    used, FAQ scaffolding).
13. **Authority of facts**: salary brackets, VAT rates and LLM prices are
    inputs that drift with policy/market. Move them to a tiny `data/`
    submodule with `lastUpdated` metadata and surface that date in the UI.
14. **Add CSP + rate limiting** (§6).
15. **More tools** that play well with the existing chrome: hash/HMAC tool,
    QR/Barcode generator, color-contrast checker, regex tester, cron parser,
    JSON↔YAML/CSV converter, semver bumper. Each is a small, high-SEO page.
16. **Programmatic SEO**: extend the `[conversion]` model to other domains —
    e.g. currency conversion (`/it/eur-a-usd`), time-zone conversion
    (`/it/da-cet-a-pst`), measurement combos. With the central registry in
    place, this becomes data, not code.
17. **PWA polish**: `manifest.json` is present; add `offline.html`, a service
    worker, and persist tool input across reloads (already done via
    `browserStorage` for migrated tools).
18. **Telemetry hygiene**: Vercel Analytics is enabled — define a small set of
    custom events (e.g. `tool_used`, `tool_copied`, `tool_example_loaded`)
    to inform §15.

---

## 11. TL;DR

The project is in **good shape but uneven**. The migrated tools demonstrate a
clean, fast, hydration-safe pattern; the calculators that haven’t been
migrated drag down quality (duplication, currency bugs, hardcoded English
copy that still talks about Italian VAT). Fix the half-dozen broken links and
the EN currency in a single afternoon, finish the migration of the seven
remaining calculators over a sprint, and you have a tight, sustainable
multilingual tools site ready to scale to many more entries.
