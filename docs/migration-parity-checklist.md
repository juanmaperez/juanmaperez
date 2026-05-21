# Migration parity checklist

**Purpose:** Track **URL, narrative, motion, and JS-budget** parity for the Gatsby 2 → Astro migration (PRD **FR19**, **NFR-P2**). One sign-off row per **legacy public URL** (or template class where many URLs share one behavior).

**How to use**

1. Fill **Motion parity** with one of: `same` | `simplified` | `removed` | `n/a` (no legacy motion on this route).  
2. **Islands approved:** `Y` only if named islands are required; list component names. Otherwise `N`.  
3. **LCP/JS exception:** `Y` only if post-migration metrics are allowed to exceed baseline + 20 KiB per PRD; document reason in **Notes**.  
4. **Sign-off:** owner initials + date when the row is accepted for cutover.

**References:** `_bmad-output/planning-artifacts/architecture.md` §12–13, `_bmad-output/planning-artifacts/prd.md` (FR19, NFR-P1–P2).

---

## Core templates

| Route / template | Legacy path | Motion parity (same / simplified / removed / n/a) | Islands approved (Y/N, names) | LCP/JS exception (Y/N) | Sign-off | Notes |
|------------------|-------------|------------------------------------------------------|---------------------------------|------------------------|----------|-------|
| Home | `/` | removed | N | | | Story 3.3: static hero/about/works/contact; GSAP + ScrollMagic + cookie gate removed |
| CV | `/cv/` | | N | | | |
| Not found | `/404/` or host 404 | n/a | N | | | Match host behavior for GitHub Pages |

---

## Blog — list & pagination

Legacy `gatsby-node.js`: first page `/blog`, further pages `/blog/page/{n}` (1-based page index).

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Blog list page 1 | `/blog` | | N | | | Legacy may omit trailing slash; pick one policy and redirect |
| Blog list page 2+ | `/blog/page/2` (add rows if `ceil(posts/12) > 1`) | | N | | | With 9 posts and 12 per page, **only page 1** exists today |

---

## Blog — categories

Distinct categories from current content: `javascript`, `react`, `recipes`.

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Category | `/blog/category/javascript` | | N | | | |
| Category | `/blog/category/react` | | N | | | |
| Category | `/blog/category/recipes` | | N | | | |

---

## Blog — posts (canonical `path` from frontmatter)

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Post | `/blog/how-javascript-engine-works` | | N | | | |
| Post | `/blog/variables-and-values-javascript` | | N | | | |
| Post | `/blog/primitive-values-and-ummutability` | | N | | | |
| Post | `/blog/values-and-coercion` | | N | | | |
| Post | `/blog/high-order-functions-callbacks-inversion-control` | | N | | | |
| Post | `/blog/closure-high-order-functions` | | N | | | |
| Post | `/blog/the-perfect-pizza-dough` | | N | | | |
| Post | `/blog/deconstructing-fetch-browser-api` | | N | | | |
| Post | `/blog/demystifying-useReducer-hook` | | N | | | |

---

## Projects — case studies (`path` from frontmatter)

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Project | `/projects/umaicha` | | N | | | |
| Project | `/projects/sainsburys` | | N | | | |
| Project | `/projects/oysho` | | N | | | |
| Project | `/projects/colossus-bets` | | N | | | |
| Project | `/projects/australis` | | N | | | |

---

## Optional: high-motion or island-heavy audits

Add a row here only for routes that need **ScrollMagic / GSAP / React** parity review beyond the tables above (e.g. home sections if legacy uses scroll storytelling).

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| *(none yet)* | | | | | | |

---

## Revision history

| Date | Change |
|------|--------|
| 2026-04-20 | Initial checklist seeded from `gatsby-node.js` + `src/content/**` paths |
