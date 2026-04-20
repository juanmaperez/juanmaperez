# Astro site (migration target)

This directory is the **Gatsby → Astro** rebuild (**Epic 1** — Stories **1.1**–**1.3** plus **1.4** Node/docs alignment). The legacy Gatsby app remains at the repository root; work here until cutover.

## Requirements

- **Node.js ≥ 22.12** (Astro 6; use `nvm use` in this directory — see `.nvmrc`).

## Commands

```bash
cd site
npm install
npm run dev      # local dev server (Vite; edits under site/src/ reload without restart — FR16)
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
```

**Node:** `engines` in `package.json` and **`.nvmrc`** must stay in sync with [CI](../.github/workflows/deploy-astro-pages.yml) (`node-version-file: site/.nvmrc`).

## Configuration

- **Output:** `output: 'static'` in `astro.config.mjs` (PRD / architecture ADR-001).
- **TypeScript:** `tsconfig.json` extends `astro/tsconfigs/strict`.

### Production URL and `base` (GitHub Pages)

- **`site`:** `https://juanmaperez.dev` — canonical origin for `import.meta.env.SITE`, sitemap, and absolute OG URLs (aligned with legacy Gatsby `siteUrl`).
- **`base`:** `'/'` — site is served at the **domain root** (custom domain on GitHub Pages), not from `https://<user>.github.io/<repo>/`.

If you ever publish only to **`https://<user>.github.io/<repository>/`** without a custom domain, set `base: '/<repository>/'` (leading and trailing slash) and set `site` to `https://<user>.github.io` per [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

### CI deploy

Push to **`main`** or **`master`** runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) (`npm ci` + `npm run build` in this folder). Configure **Settings → Pages → Build and deployment → GitHub Actions** once. Details: [deployment-guide.md](../docs/deployment-guide.md#astro-ci-github-actions).
