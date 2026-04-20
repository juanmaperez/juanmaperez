# Astro site (migration target)

This directory is the **Gatsby → Astro** rebuild (**Epic 1 / Story 1.1**). The legacy Gatsby app remains at the repository root; work here until cutover.

## Requirements

- **Node.js ≥ 22.12** (Astro 6; use `nvm use` in this directory — see `.nvmrc`).

## Commands

```bash
cd site
npm install
npm run dev      # local dev server
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
```

## Configuration

- **Output:** `output: 'static'` in `astro.config.mjs` (PRD / architecture ADR-001).
- **TypeScript:** `tsconfig.json` extends `astro/tsconfigs/strict`.
