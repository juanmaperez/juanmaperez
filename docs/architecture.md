# Architecture: juanmaperez (brownfield docs)

> **Production (2026-05-22):** The live application is **Astro 6** under **`site/`**, deployed via **GitHub Actions** to **`site/dist/`**.  
> **Migration ADRs, FR traceability, and checklist governance:** [_bmad-output/planning-artifacts/architecture.md](../_bmad-output/planning-artifacts/architecture.md).

## Executive summary (production)

The **production** site is an **Astro static** portfolio: **content collections** (`posts`, `projects`) with **Zod** validation, **file-based routing**, **scoped component CSS** + **`site/src/styles/global.css`**, and **selective client islands** for legacy motion parity (GSAP 3 + ScrollTrigger). There is **no** runtime GraphQL and **no** server.

| Concern | Implementation |
|---------|----------------|
| Build | `cd site && npm run build` → `site/dist/` |
| Deploy | [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) → GitHub Pages |
| Content | `site/src/content/posts/`, `site/src/content/projects/` |
| Images | `astro:assets` / `ProjectImage` (FR13) |
| Motion | `site/src/scripts/motion/`, `client:visible` islands (FR19) |
| SEO | `PageHead.astro`, `@astrojs/sitemap`, redirects in `astro.config.mjs` |

## Technology stack (production)

See [project-overview.md](./project-overview.md). Primary stack: **Astro 6**, **TypeScript**, **content collections**, **GitHub Actions**, **GitHub Pages**.

## Architecture pattern

| Pattern | How it appears in `site/` |
|---------|---------------------------|
| SSG | `output: 'static'` in `astro.config.mjs` |
| Component islands | `.astro` + optional React only where checklist-approved |
| Build-time data | `getCollection('posts' \| 'projects')` |
| Validation | `npm run check` / Zod in `content.config.ts` (FR17) |

## Data architecture (production)

- **Source of truth:** Markdown under **`site/src/content/`**.  
- **Schemas:** `site/src/content.config.ts` — see [data-models.md](./data-models.md).  
- **Legacy reference:** `legacy/gatsby/src/content/` (archive only).

## Routing (production)

Declarative routes in **`site/src/pages/`** plus `getStaticPaths` for blog pagination, categories, posts, and projects. Paths come from frontmatter **`path`** fields (stable URLs / FR12 redirects).

## API design

**No application HTTP API.** Build-time only; see [api-contracts.md](./api-contracts.md) for historical GraphQL notes vs current collections.

## Component overview (production)

High-level groups under **`site/src/components/`**: **nav**, **home**, **blog**, **cv**, **projects**, **motion**, **seo**, **analytics**.  

Full historical Gatsby inventory (archive paths): [component-inventory.md](./component-inventory.md).

## Deployment architecture (production)

Static **`site/dist/`** published by **GitHub Actions** (`actions/deploy-pages`). **Not** branch deploy from **`gh-pages`**.

See [deployment-guide.md](./deployment-guide.md) for Settings → Pages = **GitHub Actions** and cutover verification (Story **9.3**).

## Testing strategy (production)

| Gate | Command |
|------|---------|
| Schema / types | `npm run check` |
| Build | `npm run build` |
| Schema fixtures | `npm run test:schema` |
| Internal links | `npm run test:links` |

CI runs the same gates in **`deploy-astro-pages.yml`**.

## Legacy (archived Gatsby 2)

The pre-migration app lives under **`legacy/gatsby/`** (Story **9.2**). It was a **Gatsby 2** static site: Markdown → GraphQL at build time → React + styled-components. **ScrollMagic + GSAP 2** ran client-only (null-loader on `build-html`).

That stack is **not** production. Retained for:

- Parity checklist audits (`legacy/gatsby/src/`)
- Historical comparison during Epic 7–8

**Do not** run `legacy/gatsby/npm run deploy` (retired `gh-pages` path).

---

_For April 2026 scan metadata, see [project-scan-report.json](./project-scan-report.json) (superseded for production layout by Story **9.4**)._
