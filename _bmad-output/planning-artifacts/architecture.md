---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: architecture
lastStep: 8
status: complete
completedAt: '2026-04-20'
project_name: juanmaperez
user_name: Juanma
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md
  - docs/index.md
  - docs/architecture.md
  - docs/source-tree-analysis.md
  - docs/data-models.md
  - docs/api-contracts.md
---

# Architecture — juanmaperez portfolio migration

**Author:** Juanma  
**Date:** 2026-04-20  
**Inputs:** PRD v1.1, technical research, brownfield `docs/`  
**Status:** Complete (single-pass **[CA]** synthesis for implementation agents)

---

## 1. Purpose and scope

This document is the **technical single source of truth** for replatforming the personal site from **Gatsby 2** to **Astro** with **static output**, **GitHub Pages** deployment, and **PRD v1.1** compliance (including migration parity checklist, baselines, FR16–FR21, NFR-P1–P2).

**In scope:** Routing parity, content collections, build/deploy, SEO/redirects, image pipeline, client-island policy, performance baseline procedure.  
**Out of scope:** Product redesign, headless CMS, SSR product features (post-MVP per PRD).

---

## 2. Context summary

| Source | Implication |
|--------|-------------|
| **PRD** | Static-first MPA; mandatory content schema validation before cutover; LCP/JS baselines; contact + internal link requirements. |
| **Brownfield `docs/`** | Current routes from `gatsby-node.js`; Markdown under `src/content/posts` and `projects`; build-time GraphQL only. |
| **Research** | Astro + content collections + GitHub Actions deploy; islands for selective hydration. |

---

## 3. Architecture decision records (ADRs)

### ADR-001 — Static site generator: **Astro**

- **Decision:** Use **Astro** (current LTS major per `npm create astro@latest` at implementation time) with `output: 'static'`.  
- **Rationale:** Aligns with PRD/research: HTML-first, Markdown/MDX, content collections, optional React islands, official Gatsby migration guide, GitHub Pages documentation.  
- **Consequences:** New repo layout; team learns `.astro` and content config; GraphQL eliminated.

### ADR-002 — Hosting: **GitHub Pages** + **GitHub Actions**

- **Decision:** Deploy static assets via **official Astro deploy workflow** (`withastro/action` + `actions/deploy-pages` or equivalent maintained pattern).  
- **Rationale:** PRD assumption; matches existing `gh-pages` mental model; reproducible CI.  
- **Consequences:** Correct `site` and `base` in `astro.config.mjs`; custom domain remains a GitHub/DNS concern.

### ADR-003 — Content: **Astro Content Collections** with **Zod** schemas

- **Decision:** Two collections — `posts` and `projects` — with Zod schemas mirroring `docs/data-models.md` fields; **build fails** on schema violation (PRD **FR17**).  
- **Rationale:** Typed content replaces GraphQL shape enforcement.  
- **Consequences:** `src/content.config.ts` (or project-default path per Astro version); authors must satisfy schema.

### ADR-004 — Client JS: **islands only when checklist-approved**

- **Decision:** Default pages ship **no React runtime**. Use `@astrojs/react` (or similar) only on routes/components listed in **migration parity checklist** with owner sign-off (PRD **FR19**, **NFR-P2**).  
- **Rationale:** Legacy GSAP/ScrollMagic; SSR pitfalls in Gatsby `gatsby-node` null-loader pattern → move to **client-only** boundaries in Astro.  
- **Consequences:** Explicit `client:visible` / `client:load` choices documented per component.

### ADR-005 — Styling: **scoped `.astro` + ported global CSS + optional Sass**

- **Decision:** Phase 1: migrate **critical global styles** (`main.css`, mixins) into `src/styles/` and component-scoped CSS; **port styled-components rules verbatim** (layout, image boxes, breakpoints) into Astro `<style>` blocks — do not re-derive with generic flex/`clamp()` only. Avoid **runtime** styled-components unless inside an approved React island.  
- **Rationale:** Remove CSS-in-JS runtime; preserve **visual** parity from legacy `*View = styled.div` definitions (Epic **8.3**, FR22). Home **workItem** / **about-block** image sizing is CSS-driven, not `gatsby-image`.  
- **Consequences:** Story **8.3** owns per-template port; fonts in **8.2** alone are insufficient for home/projects look.

### ADR-006 — Images: **`astro:assets`** (or documented Astro image pipeline)

- **Decision:** Use Astro’s documented image integration for responsive images; co-locate or map assets from `src/assets/` mirroring current `gatsby-source-filesystem` roots.  
- **Rationale:** Replaces `gatsby-image` / `childImageSharp` fluid paths.  
- **Consequences:** Rework image references in Markdown (or use remark/rehype patterns per Astro docs).

### ADR-007 — Analytics: **GA4 (gtag) or privacy-first alternative**

- **Decision:** Replace Universal Analytics plugin with **one** documented snippet (e.g. GA4) injected in base layout with **async/defer** (PRD **NFR-S2**).  
- **Rationale:** UA sunset; PRD technical success.  
- **Consequences:** Measurement ID via env at build time if needed: `PUBLIC_GA_ID`.

### ADR-008 — Motion stack: **GSAP 3 + ScrollTrigger** (default); islands only where needed

- **Decision:** Epic **7.2** replaces legacy **GSAP 2 + ScrollMagic** with **GSAP 3** (`gsap` npm package) and the **ScrollTrigger** plugin (official scroll/scene replacement). Do **not** port `scrollmagic` or `react-scrollmagic` to `site/`.  
- **Rationale:** ScrollMagic is unmaintained; ScrollTrigger is the supported GSAP path for pin, scrub, and scroll-linked tweens. GSAP 3 tree-shakes (`gsap`, `ScrollTrigger` only) and maps 1:1 from legacy `TimelineMax` / `TweenMax` / `ScrollMagic.Scene`. Legacy audit: [migration-parity-checklist.md](../../docs/migration-parity-checklist.md) § Legacy animation inventory.  
- **Astro integration:**  
  - **Home + project contact scroll FX:** one or few **client-only** modules under `site/src/scripts/motion/` (or `site/src/components/motion/*.astro`) loaded via `client:visible` on `/` and project layout only — **no** motion JS in global `BaseLayout`.  
  - **Header intro:** small `client:visible` island or script on `SiteHeader` (GSAP timeline on mount).  
  - **CV:** prefer **GSAP 3** or **Motion** (`motion` / `@motionone/dom`) for stagger reveals to avoid pulling **react-spring@8** + full React runtime; if spring **feel** cannot be matched in a spike, allow a **CV-only** `@astrojs/react` island with `@react-spring/web` (single route, checklist-approved).  
  - **Cookie gate / orchestration:** vanilla `document.cookie` + callbacks; no extra library.  
  - **CSS-only** (glitch, blink cursor): port keyframes; no GSAP.  
- **Alternatives considered (reject for primary path unless spike fails):**  
  | Option | Verdict | Why |
  |--------|---------|-----|
  | **ScrollMagic 2** (port as-is) | Reject | Unmaintained; SSR/build issues already forced null-loader in Gatsby; no Astro benefit. |
  | **GSAP 2** | Reject | Superseded; smaller win than GSAP 3 + ScrollTrigger migration. |
  | **CSS scroll-driven animations only** | Fallback / *simplified* | Cannot match pin + scrub + parallax scenes without rework; use only if product accepts *simplified*. |
  | **Motion One / anime.js / WAAPI** | Secondary | Viable for CV stagger or micro-interactions; not a drop-in for existing ScrollMagic scenes. |
  | **Lenis + ScrollTrigger** | Optional polish | Smooth scroll not in legacy; add only if desired post-parity. |
  | **Framer Motion** | Reject default | Heavy React dependency; conflicts with ADR-004 default. |
- **NFR / a11y:** Register `ScrollTrigger.matchMedia` and honor **`prefers-reduced-motion`** (static end state, no pin). Document transferred JS per route for **NFR-P2**; expect checklist **LCP/JS ex. = Y** on `/` and `/cv/`.  
- **Spike (7.2 task 0):** Port `main-block.js` intro timeline + one `ScrollMagic.Scene` (e.g. `workItem` parallax) in a throwaway Astro page; measure bundle size before full home port.  
- **Consequences:** `site/package.json` adds `gsap` (v3); optional `@astrojs/react` only if CV spike chooses react-spring path. Inventory **Recommended Astro** column should cite **ADR-008** stack, not generic “vanilla-script” alone.

---

## 4. Logical view (C4-lite)

```mermaid
flowchart LR
  subgraph authors [Authors]
    MD[Markdown in Git]
  end
  subgraph build [CI Build]
    Astro[Astro build]
    Val[Zod schema validation]
    Astro --> Val
  end
  subgraph host [GitHub Pages]
    Static[Static HTML CSS JS]
  end
  subgraph readers [Readers]
    Browser[Browser]
  end
  MD --> Astro
  Val --> Static
  Static --> Browser
```

No application server in MVP. Third-party: analytics host only.

---

## 5. Routing and URL parity

### 5.1 Static file routes (file-based)

| URL | Astro implementation (pattern) |
|-----|----------------------------------|
| `/` | `src/pages/index.astro` |
| `/cv/` | `src/pages/cv.astro` or `src/pages/cv/index.astro` |
| `/404` | `src/pages/404.astro` |

### 5.2 Dynamic segments (build-time `getStaticPaths`)

| Pattern | Source | Notes |
|---------|--------|--------|
| `/blog/` | Paginate collection `posts` | Match legacy: page 1 at `/blog/`, others `/blog/page/N/` (trailing slash policy: pick one and redirect—document in checklist). |
| `/blog/page/[n]/` | Same | `postsPerPage = 12` per legacy `gatsby-node.js`. |
| `/blog/category/[category]/` | Distinct `category` from posts | One page per category value. |
| `[...slug]` for posts | `posts` collection `path` field | Legacy `frontmatter.path` like `/blog/how-javascript-engine-works` — use `path` as canonical URL key in `getStaticPaths`. |
| Project routes | `projects` collection `path` | e.g. `/projects/umaicha`. |

### 5.3 Redirects

- Implement via `astro.config` `redirects` map **or** host-level (GitHub Pages `_redirects` not native—prefer **astro redirects** static export compatibility per Astro version docs).  
- Every intentional URL change: row in **parity checklist** + redirect entry + SEO validation.

---

## 6. Content model (collections)

**Config file:** `src/content.config.ts` (adjust if Astro version uses different entry; follow official docs).

### 6.1 Collection: `posts`

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `path` | string | yes | Leading slash; unique; used as canonical URL. |
| `title` | string | yes | |
| `date` | date or string | yes | Parse consistently; sort DESC for lists. |
| `type` | literal `post` | yes | Discriminator. |
| `category` | string | yes | Drives category index. |
| `tags` | array(string) | yes | Allow empty array if legacy missing—prefer require and fix content. |
| `excerpt` | string | yes | |
| `icon` | string (path) | optional | Map to image import or public path. |
| `thumbnail` | string (path) | optional | List views. |

Body: Markdown; code highlighting via **Shiki** (recommended) or `@astrojs/mdx` + highlighter—decide in implementation; satisfies **FR14**.

### 6.2 Collection: `projects`

| Field | Type | Required | Notes |
|-------|------|----------|--------|
| `path` | string | yes | |
| `title` | string | yes | |
| `date` | date or string | yes | |
| `type` | literal `projects` | yes | |
| `category` | string | yes | Often `projects`. |
| `thumbnail` | string | yes | Case study hero. |
| `images` | array `{ title, image }` | optional | Normalize to schema Zod allows. |
| `excerpt` | string | yes | |

### 6.3 Content locations

- **Physical paths:** `src/content/posts/**` and `src/content/projects/**` (mirror current repo to minimize git churn) **or** single flat `src/content/post/*.md`—pick one structure and update `loader` globs accordingly.  
- **Migration:** Copy existing markdown; normalize frontmatter against schema; fix paths to images.

---

## 7. Gatsby GraphQL → Astro mapping (agent reference)

| Gatsby usage | Astro replacement |
|--------------|---------------------|
| `allMarkdownRemark` filters (`type: post` / `projects`) | `getCollection('posts' \| 'projects')` with optional `filter` in page |
| `createPage` blog list + context `limit/skip` | `getStaticPaths` + slice paginated array |
| `createPage` per post/project path | `getStaticPaths` returning `params` derived from `path` |
| `StaticQuery` / `useStaticQuery` in layouts | Import site config from `src/site.config.ts` or JSON |
| `gatsby-plugin-react-helmet` | `<head>` in layouts + SEO component |
| `gatsby-image` / `childImageSharp` | `<Image />` / `getImage` patterns per `astro:assets` docs |
| `gatsby-remark-images` | Astro markdown + asset pipeline or MDX |
| `gatsby-remark-prismjs` | Shiki / rehype |

Source of field usage: `docs/api-contracts.md` and `gatsby-node.js` (repo).

---

## 8. Islands and legacy animation

1. **Inventory** each template using GSAP, ScrollMagic, `react-spring`, etc. (from `src/`). Story **7.1** complete — see checklist inventory table.  
2. **Implement** per **ADR-008**: GSAP 3 + ScrollTrigger for scroll/timeline parity; CSS for glitch/typewriter cursor; CV stagger via GSAP/Motion first, React spring only as checklist-approved fallback.  
3. For each surface, choose delivery: **static HTML/CSS**, **client `<script>` module** (preferred for home scroll scenes), or **Astro island** with `client:visible` / `client:media` (header, optional CV).  
4. **No** scroll-animation library during prerender — init in `connectedCallback`, `DOMContentLoaded`, or island mount only (parity with Gatsby `build-html` null-loader).  
5. Record motion parity and **7.2 component names** in **migration parity checklist** (section 12).  
6. **7.2 file layout (target):**

```
site/src/scripts/motion/
  home-orchestration.ts    # cookie gate, section unlock
  home-main-block.ts       # intro timeline (from main-block.js)
  home-about.ts
  home-contact.ts
  home-work-item.ts        # ScrollTrigger parallax per card
  header-intro.ts
site/src/components/motion/
  HomeMotion.astro         # client:visible — imports home-* on index only
  CvMotion.astro           # client:visible — CV route only (or per-section islands)
```

---

## 9. Project structure (target)

```
repo-root/
├── .github/workflows/deploy.yml    # Astro → GitHub Pages
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                          # static assets not processed
├── src/
│   ├── content.config.ts            # collections + Zod
│   ├── content/
│   │   ├── posts/                   # migrated post folders
│   │   └── projects/                # migrated project folders
│   ├── layouts/
│   │   ├── BaseLayout.astro         # html shell, SEO slot
│   │   └── BlogLayout.astro
│   ├── components/
│   │   ├── seo/
│   │   ├── nav/
│   │   ├── blog/
│   │   ├── home/
│   │   └── cv/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cv.astro
│   │   ├── 404.astro
│   │   ├── blog/
│   │   │   ├── index.astro          # page 1
│   │   │   └── page/[page].astro
│   │   ├── blog/category/[category].astro
│   │   └── ...                      # dynamic post layout under chosen pattern
│   ├── styles/
│   ├── site.config.ts               # title, description, url, nav
│   └── assets/                      # images, fonts (mirrors legacy)
├── _baseline/                       # optional: committed Lighthouse JSON (git-lfs if large)
└── docs/
    └── migration-parity-checklist.md
```

Adjust `pages` nesting to match Astro’s `getStaticPaths` file routing convention for the chosen Astro major.

---

## 10. SEO and metadata

- **Global defaults** in `BaseLayout.astro` from `site.config.ts` (site title, description, `site` URL for OG absolute URLs).  
- **Per-page** title/description from collection entry frontmatter.  
- **`@astrojs/sitemap`** with `site` set to production URL (`https://juanmaperez.dev` or as configured).  
- **Canonical** and **OG** tags: component pattern; validate with PRD **FR10–FR11**.

---

## 11. CI/CD — GitHub Actions

1. **Trigger:** push to `main` (or `master` per repo default).  
2. **Jobs:** checkout → setup Node (LTS version pinned in `.nvmrc` or `package.json` engines) → `npm ci` → `npm run build` → upload Pages artifact.  
3. **Secrets:** none for public GA ID if using `PUBLIC_*` build args; avoid committing secrets (**NFR-S1**).  
4. **Concurrency:** `concurrency: group: pages` to avoid overlapping deploys.

Reference: [Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github).

---

## 12. Migration parity checklist (template)

Maintain `docs/migration-parity-checklist.md` (or path in `inputDocuments` once created). **Each row = one legacy URL or template class.**

| Route / template | Legacy path | Motion parity (same / simplified / removed / n/a) | Visual parity (same / simplified / removed / n/a) | Islands approved (Y/N, names) | LCP/JS exception (Y/N) | Sign-off | Notes |
|------------------|-------------|-----------------------------------------------------|---------------------------------------------------|-------------------------------|--------------------------|----------|-------|
| Home | `/` | | | | | |
| CV | `/cv/` | | | | | |
| Blog list p1 | `/blog/` | | | | | |
| Example post | `/blog/...` | | | | | |
| Example project | `/projects/...` | | | | | |

**FR19** approval: product owner checks “motion parity” and narrative columns before cutover.  
**FR22** approval: product owner checks “visual parity” (typography, color, spacing) before cutover; see **Legacy typography & styling inventory** (Epic 8, Story 8.1).

---

## 13. Performance baseline procedure (NFR-P1, NFR-P2)

1. **Freeze URLs:** record production (or staging) URLs for **`/`** and **one representative blog post** (same as PRD table).  
2. **Tool:** Lighthouse CLI **or** Chrome DevTools Lighthouse; record **preset** (e.g. mobile), **throttling**, **Chrome version**.  
3. **Artifacts:** save JSON/HTML under `_baseline/` or CI artifact with **git SHA** and **date** in filename.  
4. **Metrics:** LCP, Performance score (optional but PRD mentions score for home), **total transferred JS** for navigation.  
5. **Post-migration:** rerun identical method; fail release if regression beyond PRD thresholds unless checklist-approved exception exists.

---

## 14. Functional requirements traceability (summary)

| FR | Architecture anchor |
|----|---------------------|
| FR1–FR7 | Sections 5, 9, 10 |
| FR8–FR9 | Section 6 |
| FR10–FR12 | Section 10 + redirects (5.3) |
| FR13–FR15 | Sections 6, 9, ADR-006 |
| FR16 | ADR-001 + dev command in README |
| FR17 | ADR-003 |
| FR18 | Section 11 |
| FR19 | Sections 8, 12 |
| FR22 | Sections 9, 12; ADR-005 |
| FR20 | `site.config.ts` nav + home template |
| FR21 | CI step: `npx astro check` + link checker script (optional `lychee` or similar) on `dist/` |

---

## 15. Open decisions (resolve during implementation)

1. **Trailing slashes:** match legacy behavior exactly vs Astro defaults—document choice.  
2. **MDX vs Markdown-only** for posts with embedded components—default Markdown; upgrade selective files.  
3. **Repo strategy:** new branch replacing `src` vs new repo—operational, not architectural blocker.  
4. **Exact Node version:** set `engines` + `.nvmrc` to the version that works with chosen Astro major.

---

## 16. Handoff — next BMad steps

1. **`[CE] Create Epics and Stories`** — decompose FRs into stories (parity checklist rows, collection setup, CI, per-template migration).  
2. **`[IR] Check Implementation Readiness`** after epics drafted.  
3. **`bmad-dev-story`** — execute implementation per sprint.

---

_Architecture workflow steps 1–8 synthesized in one document for Agent mode implementation._
