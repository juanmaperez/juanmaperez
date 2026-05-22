# Migration parity checklist

**Purpose:** Track **URL, narrative, motion, visual design, and JS-budget** parity for the Gatsby 2 → Astro migration (PRD **FR19**, **FR22**, **NFR-P2**, **NFR-V1**). One sign-off row per **legacy public URL** (or template class where many URLs share one behavior).

**How to use**

1. Fill **Motion parity** with one of: `same` | `simplified` | `removed` | `n/a` (no legacy motion on this route).  
2. Fill **Visual parity** with one of: `same` | `simplified` | `removed` | `n/a` (typography, color, spacing vs legacy).  
3. **Islands approved:** `Y` only if named islands are required; list component names. Otherwise `N`.  
4. **LCP/JS exception:** `Y` only if post-migration metrics are allowed to exceed baseline + 20 KiB per PRD; document reason in **Notes**.  
5. **Sign-off:** owner initials + date when the row is accepted for cutover (motion + visual per architecture §12).

**References:** `_bmad-output/planning-artifacts/architecture.md` §12–13, `_bmad-output/planning-artifacts/prd.md` (FR19, FR22, NFR-P1–P2, NFR-V1).

**SEO (FR10):** Story **6.1** — per-page `<title>`, meta description, canonical, Open Graph, and Twitter tags via `site/src/components/seo/PageHead.astro`; content titles use legacy Helmet `titleTemplate` parity (`{page} | Juanma Perez`).

**SEO (FR11):** Story **6.2** — `@astrojs/sitemap` emits `sitemap-index.xml` on build; `site/src/pages/robots.txt.ts` points crawlers at the sitemap (legacy `gatsby-plugin-sitemap` parity). `/404` excluded from sitemap via integration `filter`.

**SEO (FR12):** Story **6.3** — `site/src/config/redirects.ts` → `astro.config.mjs` `redirects` (301). Post/project slugs unchanged vs legacy; aliases only. See **Redirect map** below.

**Integrity (FR21):** Story **6.4** — `npm run test:links` after build crawls `site/dist/` for broken internal links; CI gate in `.github/workflows/deploy-astro-pages.yml`.

**Analytics (NFR-S1/S2):** Story **6.5** — GA4 gtag via `site/src/components/analytics/Analytics.astro` in `BaseLayout` when `PUBLIC_GA_MEASUREMENT_ID` is set at build time. Legacy Universal Analytics `UA-98892695-1` (`gatsby-plugin-google-analytics`) is retired; use a new GA4 `G-…` measurement ID (not the UA property).

**Motion (FR19 prep):** Story **7.1** — component-level inventory below; route tables reconciled to product target **`same`** on motion-heavy surfaces. **7.2 stack:** **GSAP 3 + ScrollTrigger** per Architecture **ADR-008** ([motion-technology-decision.md](../_bmad-output/planning-artifacts/motion-technology-decision.md)) — do not port ScrollMagic. **Islands approved** stays **N** until Story **7.3**.

---

## Legacy animation & JS inventory (Story 7.1)

Audit source: repo-root Gatsby `src/` + `gatsby-node.js` (not `site/`). **Build note:** `gatsby-node.js` null-loads ScrollMagic on `build-html` and aliases GSAP min bundles — legacy motion was **client-only** at runtime (same constraint for Astro: no ScrollMagic during static prerender).

| Legacy route(s) | Legacy file(s) | Libraries / deps | Behavior (1 line) | Recommended Astro | Motion parity | Islands (Y/N) | Notes |
|-----------------|----------------|------------------|-------------------|-------------------|---------------|---------------|-------|
| `/` (orchestration) | `src/pages/index.js` | React state, cookie | `animationCompleted` cookie gates About/Works/Contact until intro completes | `vanilla-script` | same | N | 7.2: `HomeOrchestration` — cookie read/write parity |
| `/` | `src/components/index/main-block.js` | GSAP 2, ScrollMagic | Timeline intro on hero list; ScrollMagic fades list on scroll | `vanilla-script` | same | N | 7.2: `HomeMainBlock`; client-only |
| `/` | `src/components/index/about-block.js` | GSAP, ScrollMagic | Scroll-triggered image slide-in + pin/class toggle | `vanilla-script` | same | N | 7.2: `HomeAboutBlock` |
| `/` | `src/components/index/contact-block.js` | GSAP, ScrollMagic | Cover scale + content fade/slide on scroll | `vanilla-script` | same | N | 7.2: `HomeContactBlock`; reuse on project detail |
| `/` | `src/components/workItem.js` | GSAP, ScrollMagic | Per-card parallax on image + work block while scrolling | `vanilla-script` | same | N | 7.2: `HomeWorkItem` (×N cards) |
| `/` + all `Layout` pages | `src/components/header.js` | GSAP | Header fade/slide in on mount | `island` | same | N | 7.2: `SiteHeaderIntro` on `SiteHeader`; global |
| `/` (styles) | `src/styles/mixins.scss` | CSS keyframes | Glitch title + scroll-indicator animations on home | `static` + CSS | same | N | Port keyframes to `site/src/styles/`; no JS if CSS-only |
| `/cv/` | `src/pages/cv.js` | React state | `visible` flag unlocks sections after description “ready” | `island` | same | N | 7.2: `CvOrchestration` |
| `/cv/` | `src/components/cv/description.js` | CSS | Typewriter + blinking cursor (`blink` keyframes) | `vanilla-script` | same | N | 7.2: `CvTypewriter` |
| `/cv/` | `src/components/cv/personal.js` | react-spring | Spring fade/slide for personal block | `island` | same | N | 7.2: `CvPersonal` |
| `/cv/` | `src/components/cv/experiences.js` | react-spring | Staggered spring reveal when `visible` | `island` | same | N | 7.2: `CvExperiences` |
| `/cv/` | `src/components/cv/education.js` | react-spring | Staggered spring reveal when `visible` | `island` | same | N | 7.2: `CvEducation` |
| `/cv/` | `src/components/cv/skills.js` | react-spring | Staggered spring reveal when `visible` | `island` | same | N | 7.2: `CvSkills` |
| `/projects/*` | `src/templates/workTemplate.js` → `contact-block.js` | GSAP, ScrollMagic | Project footer reuses home contact scroll FX | `vanilla-script` | same | N | 7.2: shared `HomeContactBlock` or `ProjectContactMotion` |
| Blog templates | `postTemplate.js`, `blogListTemplate.js`, `categoryTemplate.js` | — | No GSAP/ScrollMagic/react-spring in templates | `n/a` | n/a | N | Static Astro parity sufficient |
| `/404` | `src/pages/404.js` | styled-components | Static full-viewport background | `n/a` | n/a | N | Story 3.5 static 404 |
| Build | `gatsby-node.js` | webpack null-loader, aliases | Strip ScrollMagic from SSR HTML; resolve GSAP min paths | `n/a` | n/a | N | Mirror in 7.2: client-only boundaries |

**Astro baseline (7.2 shipped):** GSAP 3 + ScrollTrigger via route-scoped Astro `<script>` modules (`HomeMotion`, `CvMotion`, `ProjectContactMotion`, conditional header script). **No** `@astrojs/react`. Blog/404: no motion JS. **Islands approved** still **N** until **7.3**.

**Visual (FR22):** Story **8.1** inventory below; Story **8.2** ships global fonts/tokens. **8.3** ports **styled-components layout** and **image presentation** (home priority: about image **32vw**, works **600×900** cover crops, contact display type)—not fonts alone.

---

## Legacy typography & styling inventory (Story 8.1)

Audit source: repo-root Gatsby `src/styles/`, `src/components/`, `src/templates/`, `src/pages/` vs Astro `site/src/`. **No fonts or `global.css` in this story** — **8.2** implements global pipeline (**NFR-V1**: self-host MFred, Questrial with `font-display: swap`, wire from `BaseLayout`).

| Template / area | Legacy source(s) | Legacy fonts & key rules | Astro source(s) | Gap | Recommended fix | Visual parity | Notes |
|-----------------|-------------------|--------------------------|-----------------|-----|-----------------|---------------|-------|
| **Global** | `src/styles/main.css` | `*` Questrial; `h1–h6` MFred; canvas `#fbf9f3`; links `#1c768f` (`--secondaryColor`); code Consolas stack | `site/src/styles/global.css` + `BaseLayout.astro` | **8.2 done** — global tokens + fonts | `global-token` | same | Amatic SC deferred unless 8.3 needs it |
| **Fonts** | `main.css` `@import` + `@font-face` | Google **Questrial**, **Amatic SC**; self-host **MFred** (`src/assets/fonts/mfred/*`) | `site/public/fonts/mfred/` + Google Fonts links | **8.2 done** | `global-token` | same | Montserrat loaded for 8.3 blog teasers |
| **Header (global)** | `header.js`, `mixins.scss` | Brand **MFred** 24px uppercase; nav **Questrial**; glitch mixin on brand | `SiteHeader.astro` | `font-weight: 700` only; no MFred/glitch | `global-token` + `component-css` | same | Glitch tied to Epic 7 motion/CSS port |
| **Home hero** | `main-block.js` (`MainBlockView`) | `100vh`/`100vw`; `background-attachment: fixed`; dual bg swap `first`/`second.jpg`; links `bottom: 50px; right: 120px; font-size: 18px` | `HomeHero.astro` | Single bg; no cover wipe; link `bottom: 1rem; right: 1rem` | `layout-css` | same | Motion: 7.2 cover timeline; **visual**: link position + bg swap CSS |
| **Home about** | `about-block.js` (`AboutBlockView`) | `.intro-text` **75%** width, **6vw** font, `padding: 100vh 120px 50px`; `p` **mix-blend-mode: difference**, `margin-bottom: 100px`; `.image` **32vw** `fixed` `right: 120px` (60–70vw mobile) | `HomeAbout.astro` | **8.3 done** — legacy layout ported | `layout-css` | same | 7.2 `data-home-about*` hooks preserved |
| **Home works** | `workItem.js` (`WorkItemView`) | Section **1000px** tall; card **600×900**; `.image` **1100px** height **`background-size: cover`** + **top: -150px** crop; rotated **MFred** title on `#fbf9f3` chip | `HomeWorks.astro` | **8.3 done** — cover box + chip | `layout-css` | same | 7.2 parallax on `.home-works__image img` |
| **Home contact** | `contact-block.js` (`ContactBlockView`) | `100vh`; cover `#B7C8Cb`; `.month`/`.year` **400px MFred**; right column **32px** | `HomeContact.astro` | **8.3 done** — two-column flex + display type | `layout-css` | same | |
| **CV page** | `cv.js`, `cv/*.js` | Section `h2` **44px** MFred; roles **22px**; body **18px**; accent `#b7c8cb` | `cv.astro`, `Cv*.astro` | rem clamps ≈ sizes; wrong families | `global-token` + `component-css` | same | |
| **Blog teaser** | `post-item.js` | Title **Montserrat** 26px/800; date `var(--primaryColor)` | `BlogPostTeaser.astro` | `1.25rem` system sans | `component-css` | same | Montserrat via Google Fonts in 8.2/8.3 |
| **Blog post** | `postTemplate.js` | Title **Montserrat**; body Questrial; inline `h2` MFred | `blog/[...slug].astro` | System fonts; code `ui-monospace` not Consolas | `global-token` + `component-css` | same | Shiki theme ≠ Prism colors (FR14 **simplified** for code colors only) |
| **Blog list / category** | `blogListTemplate.js`, `categoryTemplate.js` | Card shadows, `--tertiaryColor` accents | `blog/index.astro`, `BlogIndexShell.astro`, category pages | Layout OK; token colors not ported | `global-token` | same | Inherits global once 8.2 lands |
| **Project detail** | `workTemplate.js` | `h1` **MFred** ~140px uppercase; body 18px light; bg `#fbf9f3` | `projects/[...slug].astro` | `clamp` heading; system font | `component-css` | same | `HomeContact` markup present |
| **404** | `pages/404.js` | **MFred** huge uppercase white on photo | `404.astro` | Image + clamp OK; MFred not applied | `component-css` | same | |
| **Footer (global)** | `main.css` / layout | Questrial; contact in global flow | `SiteFooter.astro` | Border `#b7c8cb` OK; fonts system | `global-token` | same | |
| **Prism / code (global)** | `main.css` gatsby-remark-prismjs rules | Consolas + dark pre `#011627` | Shiki `github-light` in `astro.config.mjs` | Different theme | `n/a` | simplified | FR14 functional parity; not FR22 blocker |

**Astro baseline (8.3):** Global tokens/fonts (**8.2**) + per-template layout CSS ported from legacy styled-components (home about/works/contact/hero, CV, blog, projects, 404, header).

### Home layout & image presentation (Story 8.3 — FR22)

Port rules from legacy **styled-components** into Astro `<style>` (coordinate with Epic **7.2** motion on same DOM hooks):

| Block | Legacy CSS to port | Astro file |
|-------|-------------------|------------|
| About image | `width: 32vw`; `position: fixed`; `right: 120px`; `bottom: 10px`; breakpoints 60vw / 70vw | `HomeAbout.astro` |
| About copy | `.intro-text` width **75%**; **6vw** font; vertical padding rhythm; optional `mix-blend-mode` on `p` | `HomeAbout.astro` |
| Works card | `.work-container` **600×900**; `.image` cover **1100px** height, negative `top`, `overflow: hidden` | `HomeWorks.astro` (+ `ProjectImage` or `background-image`) |
| Hero chrome | `.main-list` position **right: 120px; bottom: 50px**; `font-size: 18px` | `HomeHero.astro` |
| Contact display | `.month`/`.year` **400px** MFred, `.right` **32px** | `HomeContact.astro` |

**Do not** rely on `clamp()`-only approximations where legacy used fixed vw/px layout for brand look.

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

| Route / template | Legacy path | Motion parity | Visual parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|---------------|----------------------|------------|----------|-------|
| Home | `/` | same | same | N | Y | 8.3 DS 2026-05-22 | Layout CSS ported (§ Home layout); **7.2** motion; **7.3** PO sign-off pending |
| CV | `/cv/` | same | same | N | Y | 8.3 DS 2026-05-22 | 44px/22px/18px MFred scale; **7.3** PO sign-off pending |
| Not found | `/404/` or host 404 | n/a | same | N | N | 8.3 DS 2026-05-22 | MFred 300px / 36px display type |

---

## Blog — list & pagination

Legacy `gatsby-node.js`: first page `/blog`, further pages `/blog/page/{n}` (1-based page index).

| Route / template | Legacy path | Motion parity | Visual parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|---------------|----------------------|------------|----------|-------|
| Blog list page 1 | `/blog` | n/a | same | N | N | 8.3 DS 2026-05-22 | Montserrat 26px/800 teasers |
| Blog list page 2+ | `/blog/page/2` (add rows if `ceil(posts/12) > 1`) | n/a | same | N | N | | 4.2 pagination; inherits blog list styling |

---

## Blog — categories

Distinct categories from current content: `javascript`, `react`, `recipes`.

| Route / template | Legacy path | Motion parity | Visual parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|---------------|----------------------|------------|----------|-------|
| Category | `/blog/category/javascript` | n/a | same | N | N | | 4.4 static; inherits global + teaser styles |
| Category | `/blog/category/react` | n/a | same | N | N | | 4.4: 1 post |
| Category | `/blog/category/recipes` | n/a | same | N | N | | 4.4: 1 post |

---

## Blog — posts (canonical `path` from frontmatter)

| Route / template | Legacy path | Motion parity | Visual parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|---------------|----------------------|------------|----------|-------|
| Post | `/blog/how-javascript-engine-works` | n/a | same | N | N | | 4.3 static; **8.1** Montserrat title + Consolas code |
| Post | `/blog/variables-and-values-javascript` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/primitive-values-and-ummutability` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/values-and-coercion` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/high-order-functions-callbacks-inversion-control` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/closure-high-order-functions` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/the-perfect-pizza-dough` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/deconstructing-fetch-browser-api` | n/a | same | N | N | | 4.3 static detail |
| Post | `/blog/demystifying-useReducer-hook` | n/a | same | N | N | | 4.3 static detail |

**Code highlighting (FR14):** Story **4.5** — fenced blocks use **Shiki** (`github-light` in `astro.config.mjs`), not legacy `gatsby-remark-prismjs`. Functional parity; not pixel-perfect Prism theme match. Posts **07** (recipes) have no fences.

---

## Projects — case studies (`path` from frontmatter)

| Route / template | Legacy path | Motion parity | Visual parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|---------------|----------------------|------------|----------|-------|
| Project | `/projects/umaicha` | same | same | N | Y | 8.3 DS 2026-05-22 | MFred 140px hero; 18px body |
| Project | `/projects/sainsburys` | same | same | N | Y | | 5.2 images |
| Project | `/projects/oysho` | same | same | N | Y | | 5.2 images |
| Project | `/projects/colossus-bets` | same | same | N | Y | | 5.2 images |
| Project | `/projects/australis` | same | same | N | Y | | 5.2 images |

---

## Optional: high-motion or island-heavy audits

Add a row here only for routes that need **ScrollMagic / GSAP / React** parity review beyond the tables above (e.g. home sections if legacy uses scroll storytelling).

| Route / template | Legacy path | Motion parity | Islands (Y/N, names) | LCP/JS ex. | Sign-off | Notes |
|------------------|-------------|---------------|----------------------|------------|----------|-------|
| Home (summary) | `/` | same | N | Y | | Detail: inventory §7.1 — MainBlock, AboutBlock, WorkItem, ContactBlock, header, mixins |
| CV (summary) | `/cv/` | same | N | Y | | Detail: inventory §7.1 — typewriter + react-spring sections |

---

## Revision history

| Date | Change |
|------|--------|
| 2026-04-20 | Initial checklist seeded from `gatsby-node.js` + `src/content/**` paths |
| 2026-05-22 | Story 6.5 — GA4 analytics env + `Analytics.astro`; UA retired |
| 2026-05-22 | Story 7.1 — legacy animation inventory; Home/CV/projects → **same**; blog → **n/a** |
| 2026-05-22 | Story 8.1 — typography/styling inventory; **Visual parity** column; target **same** (system-font interim) |
| 2026-05-22 | Story 8.2 — `global.css`, MFred/Questrial/Montserrat loading, design tokens |
| 2026-05-22 | EP — expand FR22/Epic 8: home **layout-css** + image presentation; 8.3 scope (not fonts only) |
