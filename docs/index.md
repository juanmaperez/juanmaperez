# Project documentation index

**Project:** juanmaperez-portfolio  
**Type:** Monolith — **web** — **production:** **Astro 6** in **`site/`**; legacy **Gatsby 2** at repo root is **deprecated** (archive pending Epic 9).  
**Primary language:** TypeScript + Astro in **`site/`** (production); JavaScript (React) at root (legacy reference only).  
**Architecture:** Production: static `site/dist/` build, content collections, GitHub Actions deploy. Legacy Gatsby tree: static generation + GraphQL (not production).  

## Quick reference

- **Production (`site/`):** Astro 6, **Node ≥ 22.12** (`site/.nvmrc`) — `cd site && nvm use && npm install && npm run dev|build`.  
- **Content (production):** `site/src/content/posts/`, `site/src/content/projects/`.  
- **Deploy (production):** `site/dist/` → [GitHub Actions → Pages](./deployment-guide.md) on push to `main`.  
- **Legacy Gatsby (deprecated):** repo root — older Node (14/16) only if you must run it before **9.2** removal; see [development-guide.md](./development-guide.md#production-app-vs-legacy-gatsby-reference).  
- **Perf (advisory):** checklist **LCP/JS ex.** + optional [`_baseline/README.md`](../_baseline/README.md); not a mandatory regression gate (PRD v1.2).  

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

- [README.md](../README.md) — production pointer + collapsed historical Gatsby starter text

## Getting started

1. Read [site/README.md](../site/README.md) and [development-guide.md](./development-guide.md) — **`site/`** is the only production app.  
2. Read [deployment-guide.md](./deployment-guide.md) before changing CI or hosting.  
3. [migration-parity-checklist.md](./migration-parity-checklist.md) — motion/visual sign-off (7.3 complete). Legacy Gatsby research: `_bmad-output/planning-artifacts/research/`.  

## Scan state

- **Workflow:** `initial_scan`  
- **Depth:** `quick`  
- **State file:** [project-scan-report.json](./project-scan-report.json)  

---

_Documentation generated 2026-04-20 as part of BMad **[DP] Document Project**._
