# Project documentation index

**Project:** juanmaperez-portfolio  
**Type:** Monolith — **web** (Gatsby 2 static site)  
**Primary language:** JavaScript (React)  
**Architecture:** Static site generation with Markdown content and build-time GraphQL  

## Quick reference

- **Tech stack:** Gatsby 2.13, React 16.8, remark, sharp, styled-components, SCSS  
- **Entry points:** `gatsby-config.js`, `gatsby-node.js`, `src/pages/`  
- **Content:** `src/content/posts/` (9 posts), `src/content/projects/` (5 projects)  
- **Deploy:** `public/` → GitHub Pages via `gh-pages`  

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

1. Read [development-guide.md](./development-guide.md) for install and scripts.  
2. Read [architecture.md](./architecture.md) and [source-tree-analysis.md](./source-tree-analysis.md) before structural changes.  
3. For **Astro migration**, pair this index with `_bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md` and [migration parity checklist](./migration-parity-checklist.md).  

## Scan state

- **Workflow:** `initial_scan`  
- **Depth:** `quick`  
- **State file:** [project-scan-report.json](./project-scan-report.json)  

---

_Documentation generated 2026-04-20 as part of BMad **[DP] Document Project**._
