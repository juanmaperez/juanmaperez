# Migration parity checklist

**Purpose:** Track **URL, narrative, motion, and JS-budget** parity for the Gatsby 2 → Astro migration (PRD **FR19**, **NFR-P2**). One sign-off row per **legacy public URL** (or template class where many URLs share one behavior).

**How to use**

1. Fill **Motion parity** with one of: `same` | `simplified` | `removed` | `n/a` (no legacy motion on this route).  
2. **Islands approved:** `Y` only if named islands are required; list component names. Otherwise `N`.  
3. **LCP/JS exception:** `Y` only if post-migration metrics are allowed to exceed baseline + 20 KiB per PRD; document reason in **Notes**.  
4. **Sign-off:** owner initials + date when the row is accepted for cutover.

**References:** `_bmad-output/planning-artifacts/architecture.md` §12–13, `_bmad-output/planning-artifacts/prd.md` (FR19, NFR-P1–P2).

**SEO (FR10):** Story **6.1** — per-page `<title>`, meta description, canonical, Open Graph, and Twitter tags via `site/src/components/seo/PageHead.astro`; content titles use legacy Helmet `titleTemplate` parity (`{page} | Juanma Perez`).

**SEO (FR11):** Story **6.2** — `@astrojs/sitemap` emits `sitemap-index.xml` on build; `site/src/pages/robots.txt.ts` points crawlers at the sitemap (legacy `gatsby-plugin-sitemap` parity). `/404` excluded from sitemap via integration `filter`.

**SEO (FR12):** Story **6.3** — `site/src/config/redirects.ts` → `astro.config.mjs` `redirects` (301). Post/project slugs unchanged vs legacy; aliases only. See **Redirect map** below.

**Integrity (FR21):** Story **6.4** — `npm run test:links` after build crawls `site/dist/` for broken internal links; CI gate in `.github/workflows/deploy-astro-pages.yml`.

**Analytics (NFR-S1/S2):** Story **6.5** — GA4 gtag via `site/src/components/analytics/Analytics.astro` in `BaseLayout` when `PUBLIC_GA_MEASUREMENT_ID` is set at build time. Legacy Universal Analytics `UA-98892695-1` (`gatsby-plugin-google-analytics`) is retired; use a new GA4 `G-…` measurement ID (not the UA property).

---

## Redirect map (FR12)

Source of truth: `site/src/config/redirects.ts` (built from content `path` frontmatter + hub list). List entries: `cd site && node scripts/collect-redirect-paths.mjs`.

| From (redirect source) | To (canonical) | Reason |
|------------------------|----------------|--------|
| `/projects/colossus` | `/projects/colossus-bets` | Folder slug ≠ public `path` (Story 2.3) |
| *(post/project/hub paths)* | *(same as Legacy path column above)* | **No slug change** — migration preserved `path` frontmatter |

**Trailing-slash aliases (not in `redirectMap`):** Astro static output is `path/index.html`; redirecting `path/` → `path` conflicts with the prerendered route (build failure on `/blog/`, etc.). GitHub Pages serves both `/path` and `/path/` for directory indexes; canonicals use non-trailing `path` where set (Story 6.1).

**Legacy `/cv/` note:** Astro serves `/cv` and `/cv/` via `cv/index.html`; no config redirect (same conflict as `/blog/`).

---

## Core templates

| Route / template | Legacy path | Motion parity (same / simplified / removed / n/a) | Islands approved (Y/N, names) | LCP/JS exception (Y/N) | Sign-off | Notes |
|------------------|-------------|------------------------------------------------------|---------------------------------|------------------------|----------|-------|
| Home | `/` | removed | N | | | Story 3.3: static hero/about/works/contact; GSAP + ScrollMagic + cookie gate removed |
| CV | `/cv/` | removed | N | | | Story 3.4: static sections; react-spring + typewriter removed |
| Not found | `/404/` or host 404 | n/a | N | | | Story 3.5: static `404.html`; blog recovery link added per epics (legacy home-only) |

---

## Blog — list & pagination

Legacy `gatsby-node.js`: first page `/blog`, further pages `/blog/page/{n}` (1-based page index).

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Blog list page 1 | `/blog` | removed | N | | | Story 4.1: static index, 9/12 posts; teasers link to `path` (detail 404 until 4.3) |
| Blog list page 2+ | `/blog/page/2` (add rows if `ceil(posts/12) > 1`) | removed | N | | | Story 4.2: `getStaticPaths` emits page 2+ when `posts > 12`; **none** with 9 posts today |

---

## Blog — categories

Distinct categories from current content: `javascript`, `react`, `recipes`.

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Category | `/blog/category/javascript` | removed | N | | | Story 4.4: 7 posts, `BlogPostTeaser` category links |
| Category | `/blog/category/react` | removed | N | | | Story 4.4: 1 post |
| Category | `/blog/category/recipes` | removed | N | | | Story 4.4: 1 post |

---

## Blog — posts (canonical `path` from frontmatter)

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Post | `/blog/how-javascript-engine-works` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/variables-and-values-javascript` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/primitive-values-and-ummutability` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/values-and-coercion` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/high-order-functions-callbacks-inversion-control` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/closure-high-order-functions` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/the-perfect-pizza-dough` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/deconstructing-fetch-browser-api` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |
| Post | `/blog/demystifying-useReducer-hook` | removed | N | | | Story 4.3: static detail; prev/next per legacy DESC index |

**Code highlighting (FR14):** Story **4.5** — fenced blocks use **Shiki** (`github-light` in `astro.config.mjs`), not legacy `gatsby-remark-prismjs`. Functional parity; not pixel-perfect Prism theme match. Posts **07** (recipes) have no fences.

---

## Projects — case studies (`path` from frontmatter)

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Project | `/projects/umaicha` | removed | N | | | Story 5.1: static detail; no legacy prev/next. Story 5.2: `<Image />` listing + gallery (FR13) |
| Project | `/projects/sainsburys` | removed | N | | | Story 5.1: static detail; no legacy prev/next. Story 5.2: `<Image />` listing + gallery (FR13) |
| Project | `/projects/oysho` | removed | N | | | Story 5.1: static detail; no legacy prev/next. Story 5.2: `<Image />` listing + gallery (FR13) |
| Project | `/projects/colossus-bets` | removed | N | | | Story 5.1: static detail; no legacy prev/next. Story 5.2: `<Image />` listing + gallery (FR13) |
| Project | `/projects/australis` | removed | N | | | Story 5.1: static detail; no legacy prev/next. Story 5.2: `<Image />` listing + gallery (FR13) |

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
| 2026-05-22 | Story 6.5 — GA4 analytics env + `Analytics.astro`; UA retired |
