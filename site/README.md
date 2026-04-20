# Astro site (migration target)

This directory is the **Gatsby → Astro** rebuild (**Epic 1** — Stories **1.1** scaffold, **1.2** `site`/`base`). The legacy Gatsby app remains at the repository root; work here until cutover.

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

### Production URL and `base` (GitHub Pages)

- **`site`:** `https://juanmaperez.dev` — canonical origin for `import.meta.env.SITE`, sitemap, and absolute OG URLs (aligned with legacy Gatsby `siteUrl`).
- **`base`:** `'/'` — site is served at the **domain root** (custom domain on GitHub Pages), not from `https://<user>.github.io/<repo>/`.

If you ever publish only to **`https://<user>.github.io/<repository>/`** without a custom domain, set `base: '/<repository>/'` (leading and trailing slash) and set `site` to `https://<user>.github.io` per [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
