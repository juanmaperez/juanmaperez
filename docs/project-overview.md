# Project overview: juanmaperez-portfolio

## Purpose

Personal **portfolio and blog** for Juanma Perez: landing experience, **CV** page, **case-study style project pages**, and **technical blog posts**. Production site: **`https://juanmaperez.dev`** (Astro `site` config).

## Repository type

**Monolith — single production app:** **Astro 6** under **`site/`**, deployed via GitHub Actions to GitHub Pages.

**Legacy (deprecated):** **Gatsby 2** at the repository root remains as a **reference tree** until Epic 9 Story **9.2** archives or removes it. It is **not** the production deploy path.

## Technology summary

| Layer | Technology | Notes |
|--------|------------|--------|
| **Framework (production)** | Astro 6.x | Static output → `site/dist/`; Node **≥ 22.12** (`site/.nvmrc`) |
| **Content (production)** | Astro content collections + Zod | `site/src/content/posts/`, `site/src/content/projects/` |
| **Styling (production)** | Global CSS + scoped Astro styles | `site/src/styles/global.css`, component `<style>` |
| **Motion (production)** | GSAP 3 + ScrollTrigger | Route-scoped scripts; blog/404 have no motion JS |
| **SEO (production)** | `PageHead.astro`, sitemap, redirects | Stories 6.1–6.3 |
| **Analytics (production)** | GA4 via `Analytics.astro` | `PUBLIC_GA_MEASUREMENT_ID` at build time |
| Framework (legacy) | Gatsby 2.x | Deprecated; root `package.json` — do not deploy |
| UI (legacy) | React 16.8 | Legacy `src/` only |

## Architecture classification

**Production:** static-first Astro MPA with **route-scoped** client scripts for home, CV, and project contact motion (see `docs/migration-parity-checklist.md`).

**Legacy Gatsby:** SSG with GraphQL at build time — retained for diff/reference until removal.

## Documentation map

| Document | Role |
|----------|------|
| [index.md](./index.md) | Master index for AI / humans |
| [architecture.md](./architecture.md) | Structure, routing, data flow |
| [source-tree-analysis.md](./source-tree-analysis.md) | Directory purposes |
| [component-inventory.md](./component-inventory.md) | Legacy React components |
| [development-guide.md](./development-guide.md) | Local dev — **`site/`** default |
| [deployment-guide.md](./deployment-guide.md) | **Production:** GitHub Actions; legacy Gatsby deprecated |
| [api-contracts.md](./api-contracts.md) | Legacy GraphQL; production uses content collections |
| [data-models.md](./data-models.md) | Markdown frontmatter schemas |

## Scan metadata

- **Workflow:** initial_scan  
- **Depth:** quick (structure, configs, patterns; not every source line)  
- **Date:** 2026-04-20  
- **Docs refresh:** 2026-05-22 (Story 9.1 — production = `site/`)
