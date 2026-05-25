# CalcolaFacile

Bilingual (Italian / English) website hosting fast, free, browser-based
calculators and developer utilities such as VAT, percentage, margin, salary,
unit conversion, JWT decoding, JSON formatting, Base64, timestamp conversion,
URL encoding, UUID generation, public-IP checking and LLM token estimation.

## Stack

- **Next.js 16** (App Router, React 19, JavaScript — see `AGENTS.md`).
- **Tailwind v4** via `@tailwindcss/postcss`.
- **Vercel**: Analytics, Speed Insights, geolocation helpers.
- **Playwright** for end-to-end tests; **Vitest** for unit tests.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Useful scripts

```bash
npm run lint         # ESLint
npm run build        # Production build
npm test             # Vitest unit tests
npm run test:e2e     # Playwright end-to-end tests
npm run analyze      # Bundle analyzer
```

## Project orientation

- `AGENTS.md` — required reading for AI agents and humans alike; Next.js 16
  has breaking changes from prior versions (notably `middleware` → `proxy`).
- `PROJECT_REVIEW.md` — full quality / improvement report.
- `.github/skills/tool-migration/SKILL.md` — playbook for migrating a
  legacy tool to the Core component + locales architecture.
- `src/config/tools.js` — single source of truth for the tool catalog
  (homepage grid, related tools, sitemap).
- `src/config/conversions.js` — catalog of all unit-conversion landing
  pages.
- `proxy.js` — request preprocessor that exposes `x-pathname` to the root
  layout so it can set `<html lang>` correctly.

## License & ownership

Copyright © NERALAB Srl.

This repository is publicly visible for transparency, educational reference,
and portfolio purposes.

The source code is licensed under the PolyForm Noncommercial License 1.0.0.
Commercial use, redistribution, hosting, resale or creation of competing
commercial services based on this project — modified or unmodified — is not
allowed without prior written permission from NERALAB Srl.


See the `LICENSE` file for the complete license text.
