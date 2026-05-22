# Archived Gatsby 2 application

**Status:** Archived **2026-05-22** (Epic 9, Story 9.2). **Not production.**

**Production site:** [`../../site/`](../../site/) — Astro 6, deployed via [`.github/workflows/deploy-astro-pages.yml`](../../.github/workflows/deploy-astro-pages.yml).

This tree is the former repo-root Gatsby portfolio (Gatsby 2.13, React 16, `node-sass`). It is kept for historical diff and migration checklist reference only.

## Requirements

- **Node.js 14.x or 16.x** only (`node-sass` 4.x does not build on Node 22).

## Optional local run (reference)

```bash
cd legacy/gatsby
nvm use 16   # example
npm install  # or yarn
npm run develop
```

## Do not

- Run **`npm run deploy`** (legacy `gh-pages` flow) for production.
- Edit this tree for new content — use **`site/src/content/`**.

Snapshot before archive: git tag **`legacy-gatsby-pre-archive-2026-05-22`** on the parent repository.
