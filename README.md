# CalcolaFacile


[![Website](https://img.shields.io/badge/Website-calcolafacile.org-2563eb?style=flat)](https://calcolafacile.org)
![License](https://img.shields.io/badge/License-PolyForm%20NC-success?style=flat)
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-149eca?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)
![Vitest](https://img.shields.io/badge/Tested-Vitest-6E9F18?style=flat&logo=vitest)
![Playwright](https://img.shields.io/badge/E2E-Playwright-45ba63?style=flat&logo=playwright)
![Client-side](https://img.shields.io/badge/Privacy-Client--side-blue?style=flat)


Privacy-first collection of browser-based web tools for developers, AI workflows, finance and everyday calculations.

Fast, free and privacy-first utilities with no registration and no server-side processing whenever possible.


## Features

- 🤖 AI tools (AI Cost Calculator, Token Estimator)
- 👨‍💻 Developer tools (JSON Formatter, JWT Decoder, Regex Tester, UUID Generator, Base64, URL Encoder)
- 💰 Finance tools (VAT, Margin, Markup, ROI, Mortgage, Crypto Profit)
- 📏 Unit and time converters
- 🔒 Privacy-first: calculations run locally in your browser whenever possible

## Philosophy

CalcolaFacile is built around a few simple principles.

- Privacy comes first.
- Fast tools beat complex software.
- Every calculator should solve one problem well.
- Continuous improvement over feature bloat.
- Accessible from any device.
- Open development with a transparent roadmap.

## Built with

- **Next.js** (App Router)
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Vitest**
- **Playwright**
- **Vercel**

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

## License

CalcolaFacile is released under the **PolyForm Noncommercial License 1.0.0**.

See the [LICENSE](LICENSE) file for license details and commercial usage terms.
