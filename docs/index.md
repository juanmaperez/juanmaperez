# Project documentation index

**Project:** juanmaperez-portfolio  
**Type:** Monolith — **web** (legacy **Gatsby 2** at root + **Astro 6** under `site/` until cutover)  
**Primary language:** JavaScript (React) at root; TypeScript + Astro in `site/`  
**Architecture:** Gatsby: static generation with Markdown and build-time GraphQL. Astro: static `dist/` build (see [development-guide.md](./development-guide.md#two-apps-two-node-lines)).  

## Quick reference

- **Legacy stack (root):** Gatsby 2.13, React 16.8, remark, sharp, styled-components, SCSS — **use older Node (e.g. 14/16)** for `npm install` / `npm run develop` (`node-sass` is not compatible with Node 22).  
- **Migration stack (`site/`):** Astro 6, **Node ≥ 22.12** (`site/.nvmrc`) — `cd site && nvm use && npm install && npm run dev`.  
- **Gatsby entry points:** `gatsby-config.js`, `gatsby-node.js`, `src/pages/`  
- **Gatsby content:** `src/content/posts/` (9 posts), `src/content/projects/` (5 projects)  
- **Deploy:** Gatsby: `public/` → `gh-pages` branch. Astro: `site/dist/` → [GitHub Actions → Pages](./deployment-guide.md#astro-ci-github-actions).  
- **Perf baselines (NFR-P1/P2):** legacy host offline — first baseline at **new** production URL; see [`_baseline/README.md`](../_baseline/README.md).  

## Generated documentation

- [Project overview](./project-overview.md)  
- [Architecture](./architecture.md)  
- [Source tree analysis](./source-tree-analysis.md)  
- [Component inventory](./component-inventory.md)  
- [Development guide](./development-guide.md)  
- [Deployment guide](./deployment-guide.md)  
- [API contracts](./api-contracts.md) — build-time GraphQL; no REST API  
- [Data models](./data-models.md) — Markdown frontmatter  
- [Migration parity checklist](./migration-parity-checklist.md) — Astro cutover (FR19 / NFR-P2)  

## Existing documentation

- [README.md](../README.md) — upstream **Gatsby default starter** text (not project-specific; treat as boilerplate)

## Getting started

1. Read [development-guide.md](./development-guide.md) — especially **[Two apps, two Node lines](./development-guide.md#two-apps-two-node-lines)** — for install and scripts.  
2. Read [architecture.md](./architecture.md) and [source-tree-analysis.md](./source-tree-analysis.md) before structural changes.  
3. For **Astro migration**, pair this index with `_bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md` and [migration parity checklist](./migration-parity-checklist.md).  

## Scan state

- **Workflow:** `initial_scan`  
- **Depth:** `quick`  
- **State file:** [project-scan-report.json](./project-scan-report.json)  

---

_Documentation generated 2026-04-20 as part of BMad **[DP] Document Project**._
