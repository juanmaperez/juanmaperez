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
npm run check    # TypeScript + content collection schema validation (FR17)
npm run test:schema  # proves invalid frontmatter fails check (Story 2.1)
```

## Content collections (Story 2.1)

- **Config:** `src/content.config.ts` — `posts` and `projects` with Zod schemas (see [docs/data-models.md](../docs/data-models.md)).
- **Paths:** `src/content/posts/**`, `src/content/projects/**` (empty until Stories 2.2 / 2.3).
- **Schema gate:** `npm run check` validates frontmatter; `npm run test:schema` copies a bad fixture, expects `astro check` to fail, then cleans up.

**Node:** `engines` in `package.json` and **`.nvmrc`** must stay in sync with [CI](../.github/workflows/deploy-astro-pages.yml) (`node-version-file: site/.nvmrc`).

## Configuration

- **Output:** `output: 'static'` in `astro.config.mjs` (PRD / architecture ADR-001).
- **TypeScript:** `tsconfig.json` extends `astro/tsconfigs/strict`.

### Production URL and `base` (GitHub Pages)

- **`site`:** `https://juanmaperez.dev` — canonical origin for `import.meta.env.SITE`, sitemap, and absolute OG URLs (aligned with legacy Gatsby `siteUrl`).
- **`base`:** `'/'` — site is served at the **domain root** (custom domain on GitHub Pages), not from `https://<user>.github.io/<repo>/`.

If you ever publish only to **`https://<user>.github.io/<repository>/`** without a custom domain, set `base: '/<repository>/'` (leading and trailing slash) and set `site` to `https://<user>.github.io` per [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

### CI deploy

Push or pull request targeting **`main`** or **`master`** runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) (`npm ci` → `npm run check` → `npm run build` in this folder; deploy only on push). Configure **Settings → Pages → Build and deployment → GitHub Actions** once. Details: [deployment-guide.md](../docs/deployment-guide.md#astro-ci-github-actions).

### CI schema validation gate (FR17, Story 2.4)

CI runs `npm run check` (Astro + Zod content schema validation) **before** `npm run build`. Any post or project with invalid frontmatter fails the workflow at this step and blocks deploy. The local equivalent is `cd site && npm run check`.
