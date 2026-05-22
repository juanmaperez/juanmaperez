---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - _bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/source-tree-analysis.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/deployment-guide.md
  - docs/api-contracts.md
  - docs/data-models.md
documentCounts:
  briefCount: 0
  researchCount: 1
  brainstormingCount: 0
  projectDocsCount: 9
workflowType: prd
classification:
  projectType: web_app
  domain: personal_portfolio_and_content
  complexity: low
  projectContext: brownfield
prdVersion: '1.1'
completedDate: '2026-04-20'
lastEdited: '2026-05-22'
editSource: 'Epic 7 motion stack (GSAP 3 + ScrollTrigger, ADR-008) + Epic 8 visual parity ([EP] Edit PRD)'
---

# Product Requirements Document — juanmaperez

**Author:** Juanma Perez  
**Date:** 2026-04-20  
**Status:** Complete — revised **v1.1** per validation report (measurability, traceability, implementation leakage in FRs).

---

## Executive Summary

Replatform the **juanmaperez** personal site from **legacy Gatsby 2** to **Astro** with **static-first** output and **GitHub Pages** (or equivalent static hosting). The product outcome is the **same audience-facing experience**—home, CV, project case studies, and paginated blog with categories—while **eliminating unmaintainable dependencies** (e.g. `node-sass` / Gatsby 2-era stack), **simplifying the content model** (replace build-time GraphQL with file-based / content-collection patterns), and **establishing a CI-backed deploy path** suitable for a solo maintainer.

### What makes this special

This is not a generic “new website”; it is a **precision migration**: preserve **SEO, URLs, and content** where possible, default to **minimal client JavaScript**, and reserve interactivity (animations, legacy React widgets) for **explicit islands** only where validated—aligning the public site with performance and maintenance goals documented in technical research.

## Project classification

| Dimension | Value |
|-----------|--------|
| **Project type** | Web — marketing / portfolio static site (MPA-oriented after migration) |
| **Domain** | Personal brand, developer content, portfolio case studies |
| **Complexity** | **Low** — no regulated data, no multi-tenant product, no transactional backend |
| **Context** | **Brownfield** — existing repo, content, and routes documented under `docs/` |

---

## Success criteria

### User success

- **Visitors** find the same (or intentionally improved) information: projects, posts, CV, contact paths; no broken primary journeys.
- **Readers** can consume blog posts with code highlighting and readable layout on common mobile and desktop viewports.
- **Returning users / SEO** — critical URLs either remain valid or return **301** to documented new paths.

### Business success (personal / career)

- Site remains a **credible professional presence** (performance, correctness, up-to-date stack).
- **Time to ship** migration MVP is bounded: one owner can cut over without prolonged dual maintenance unless explicitly chosen.

### Technical success

- **Build** succeeds on a **documented Node LTS** without native `node-sass` pain.
- **Deploy** is reproducible (e.g. GitHub Action → Pages) with **`site` / `base`** correctly set for the hosting URL.
- **Content** is driven from **versioned files** with a clear schema (posts vs projects).
- **Analytics** uses a **maintained** approach (replace legacy UA-only assumptions).

### Measurable outcomes

| Metric | Target |
|--------|--------|
| Route smoke | 100% of listed MVP routes return 200 or approved 301 |
| Lighthouse (home) | Performance score **≥** pre-migration baseline (see Assumptions for capture method) on same throttling class |
| JS payload (home) | **≤** pre-migration baseline **+ 20 KiB** transferred (mobile profile) unless a route-level exception is recorded in the migration parity checklist |
| Build time (CI) | **≤ 10 min** on free-tier runner for MVP scope |

## Product scope

### MVP — minimum viable migration

- Target static site (stack per **Architecture**) with **static output**; **home**, **CV**, **404**.
- **All project case studies** and **all blog posts** migrated with **matching slugs** or redirects.
- **Blog list pagination** (`/blog`, `/blog/page/N`) and **category pages** (`/blog/category/:category`).
- **Global layout**: header/menu, footer as applicable, **meta/OG** via the target stack’s templating approach (per Architecture).
- **Images**: responsive behavior preserved; broken images none on MVP routes.
- **Sitemap** and **robots** compatible with new generator.
- **Deploy** to GitHub Pages (or user-approved static host) via pipeline.
- **One** analytics integration (new tag or privacy-preserving alternative) documented.

### Growth (post-MVP)

- **Content collections** schemas with validation; optional MDX where needed.
- **Search** or **tag** pages if desired later.
- **Preview deploys** (e.g. Cloudflare/Netlify) for branch previews.

### Vision (future)

- Optional **headless CMS** or **live content** loaders if authoring frequency justifies it.
- **i18n** if scope expands beyond primary language.

---

## User journeys

### 1. Hiring manager / peer (visitor)

**Opening:** Lands from LinkedIn or search on a project or blog URL.  
**Rising action:** Scans hero, credibility blocks, case study or article.  
**Climax:** Finds evidence of skills and impact without layout shift or long blank screens.  
**Resolution:** Saves profile or continues to CV; trust preserved.

**Recovery:** 404 is friendly and routes back to home or blog index.

### 2. Technical reader (blog)

**Opening:** Opens a deep-dive post from search or social.  
**Rising action:** Scrolls, reads code blocks, follows internal links.  
**Climax:** Code and headings remain legible; page does not ship unnecessary JS.  
**Resolution:** Completes read or navigates to related category.

### 3. Juanma (author / maintainer)

**Opening:** Needs to add a post or tweak copy.  
**Rising action:** Edits markdown in repo; runs dev server or relies on CI preview.  
**Climax:** Content appears with correct frontmatter validation.  
**Resolution:** Merges to main; pipeline publishes static output.

### 4. Maintainer (future you / agent)

**Opening:** Returns after months away.  
**Rising action:** Reads `docs/index.md` + this PRD + project config for the target stack (see Architecture).  
**Climax:** Understands routing, content schema, deploy in **< 30 minutes**.  
**Resolution:** Safe change with predictable build.

---

## Domain-specific requirements

**Complexity is low.** No HIPAA/PCI scope. Apply **sensible defaults**: GDPR-aware analytics choice, no secrets in repo, **HTTPS** only on hosting.

---

## Innovation focus

**Primary “innovation” is architectural:** HTML-first static delivery with **selective client islands** only where interaction demands it—reducing default JS vs legacy React-centric pages. Not a consumer product novelty; success is **measured maintainability and performance**, not feature novelty.

---

## Web / static product requirements (project-type deep dive)

Derived from `web_app` signals (SEO, browser support, performance, accessibility):

- **MPA / static** is the default; document any exception (e.g. server endpoints) explicitly if introduced later.
- **SEO:** title, description, canonical, OG tags per template; sitemap includes all public indexable routes.
- **Browser matrix:** latest two versions of Chrome, Safari, Firefox; mobile Safari and Chrome Android for MVP smoke.
- **Responsive:** layouts match or exceed current breakpoints behaviorally.
- **Accessibility:** semantic headings, alt text for meaningful images, keyboard-navigable menus, focus visible—target **WCAG 2.1 Level A** as minimum bar for new templates.

---

## Scoping decisions (MVP guardrails)

| In MVP | Out of MVP (unless re-scoped) |
|--------|--------------------------------|
| Parity routes & content | Full redesign rebrand |
| Static hosting + CI | Dynamic server features |
| GA4 or single analytics | Full cookie consent platform (unless legally required) |
| Redirect plan for URL changes | Automatic external link checker |
| Legacy motion (FR19) | Deferred to **Epic 7** after static MVP |
| Legacy typography, color, spacing (FR22) | Deferred to **Epic 8** after static MVP |

### Post-MVP — brand & visual parity (Epic 8)

- **Typography & styling inventory** comparing legacy Gatsby CSS/fonts to Astro (checklist-driven).
- **Global design tokens** (fonts, palette, base typography) applied via shared styles in `site/`.
- **Per-template visual reconciliation** so the migrated site matches the legacy brand feel, not only layout and copy.

---

## Functional requirements

*Implementation-agnostic capabilities. IDs stable for epics/stories.*

### Content & information architecture

- **FR1:** Visitor can view a **home** page summarizing identity, work, and paths to blog and CV.
- **FR2:** Visitor can view a **CV** page with professional history structured as today (sections: personal, summary, skills, experience, education).
- **FR3:** Visitor can browse a **paginated blog index** with consistent ordering (newest first).
- **FR4:** Visitor can open an **individual blog post** at its public URL with full body content.
- **FR5:** Visitor can browse posts filtered by **category** at `/blog/category/:category`.
- **FR6:** Visitor can open each **project case study** at its stable public URL.
- **FR7:** Visitor can navigate between global sections via **header/menu** on all primary templates.
- **FR8:** Author can add or edit **posts** using markdown with required fields (path, date, title, type, category, tags, excerpt, icon/thumbnail as applicable per schema).
- **FR9:** Author can add or edit **projects** using markdown with required fields (path, date, title, type, category, thumbnail, images gallery as applicable).

### SEO & discovery

- **FR10:** System emits **per-page title and meta description** suitable for social previews.
- **FR11:** System publishes a **sitemap** covering all indexable MVP routes.
- **FR12:** System supports **301 redirects** for any URL that intentionally changes.

### Media & presentation

- **FR13:** Visitor sees **optimized images** for hero/list thumbnails without manual width tuning per page.
- **FR14:** Visitor sees **syntax-highlighted** code in technical posts.
- **FR15:** Visitor can use the site on **mobile and desktop** widths without horizontal scroll on standard pages.

### Operations & quality

- **FR16:** Maintainer can run a **local dev server** with **content live reload** appropriate to the chosen static site generator (behavior defined in Architecture; no vendor lock-in at PRD level).
- **FR17:** Maintainer can run a **production build** that **fails** when **content schema validation** is enabled — validation is a **mandatory MVP cutover gate** (enabled before production deploy), not an optional follow-up.
- **FR18:** Maintainer can deploy via **documented CI pipeline** without manual FTP.

### Optional / explicit islands (only if parity demands)

- **FR19:** For any route where legacy scroll- or timeline-driven UI cannot be reproduced with static HTML alone, **visitor can complete the same primary narrative** (same section order and substantive copy as recorded in the **migration parity checklist** for that route). **Motion** may be *same*, *simplified*, or *removed*; the checklist entry must state which applies and must be approved before cutover. **Epic 7 default:** where legacy used GSAP, ScrollMagic, react-spring, or equivalent, inventory and implementation should target **`same`** unless evidence shows *simplified* or *removed* is required; checklist may record **NFR-P2 LCP/JS exceptions** on routes that need them to ship **`same`** motion. **Implementation technology (Architecture ADR-008):** replace legacy **GSAP 2 + ScrollMagic** with **GSAP 3 + ScrollTrigger** in **client-only** Astro modules or islands; do not port ScrollMagic. CV stagger prefers GSAP/Motion over reintroducing legacy **react-spring@8** unless a documented spike shows parity requires a CV-only React island.

### Contact and link integrity

- **FR20:** Visitor can reach **at least one primary contact path** (e.g. mailto, social profile, or contact section link) from the **home** page or **global navigation** without leaving the primary site experience.
- **FR21:** Visitor does not hit **broken internal links** on MVP routes (verified by **release checklist**: automated link crawl or manual pass documented per release).

### Brand, typography, and visual presentation

- **FR22:** Visitor experiences **typography, color, and spacing** consistent with the legacy site’s brand as recorded in the **migration parity checklist** **Visual parity** column (`same` | `simplified` | `removed` | `n/a`). **Epic 8 default:** where legacy used named fonts (e.g. Questrial body, MFred headings), shared palette (`#fbf9f3`, `#323846`, `#b7c8cb`), or template-specific rules in `src/styles/`, inventory and implementation target **`same`** unless *simplified* is documented with rationale. Global fonts and tokens load from **`site/`** (not ad hoc per-component system stacks only).

---

## Non-functional requirements

### Performance

- **NFR-P1:** **LCP** (Largest Contentful Paint) on **home** and on **one representative blog post URL** must be **≤** the pre-migration values. **Baseline capture:** same URLs (or agreed staging equivalents), same **Lighthouse CLI or Chrome DevTools Lighthouse** preset and **throttling class**, documented once before migration freeze; results stored with the release record (e.g. in repo or CI artifact).
- **NFR-P2:** **Transferred JavaScript** (initial navigation, mobile network profile in Lighthouse or agreed equivalent) for **home** and the **same representative blog post** must not exceed the pre-migration measurement by more than **20 KiB** unless that route has an **approved exception** in the migration parity checklist (named island or legacy parity requirement). **Hydrated or island components** load only on routes **explicitly authorized** in Architecture or that checklist (no unlisted global client bundles).

### Reliability & maintainability

- **NFR-R1:** Dependencies must be **installable on documented Node LTS** without deprecated native binding toolchains for core workflow.
- **NFR-R2:** Repository documents **entry commands** and hosting assumptions in `docs/` and/or README addendum.

### Security & privacy

- **NFR-S1:** No API keys or private tokens committed for MVP static deploy.
- **NFR-S2:** Third-party scripts (analytics) load with **defer/async** strategy and minimal surface.

### Accessibility

- **NFR-A1:** New navigation and form controls (if any) meet **keyboard** operation and visible **focus** states.

### Visual / font loading

- **NFR-V1:** **Web font loading** for FR22 must use a documented strategy (`self-host` preferred for MFred; Google Fonts or equivalent for Questrial/Amatic/Montserrat if retained) with **`font-display: swap`** (or better) and must not regress **NFR-P1 LCP** on home without a checklist-noted mitigation (subset, preload, or exception documented alongside FR22 sign-off).

---

## Assumptions and dependencies

- **Assumption:** Primary hosting remains **GitHub Pages** unless Juanma changes; `base` path must match repo vs user site URL.
- **Assumption:** Content volume stays **small** (9 posts, 5 projects per current inventory); no enterprise CMS in MVP.
- **Assumption:** **Performance baselines** (Lighthouse / LCP / JS transfer for NFR-P1–P2) are captured from the **current production or agreed reference build** before migration freeze, using a method documented in Architecture or release checklist so reruns are comparable.
- **Dependency:** DNS / GitHub settings outside repo for custom domain.

## Out of scope

- Native mobile apps, authenticated admin UI, e-commerce checkout, user-generated content platform features.

## References

- Technical research: `_bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md`
- Brownfield index: `docs/index.md`

---

## Next steps (BMad)

1. **[CA] Create Architecture** — Astro folder structure, content collections, redirect map, CI, migration parity checklist template, baseline capture steps.  
2. **[CE] Create Epics and Stories** — break FRs (including FR20–FR21) into implementation backlog.  
3. **[IR] Check Implementation Readiness** before heavy build sprint.  
4. **Epic 8** — typography & visual parity inventory and implementation (FR22, NFR-V1).  
5. **Re-validate** — run `bmad-validate-prd` again after major PRD or architecture changes.

---

_Polished for single-document coherence; headers use `##` / `###` for downstream sharding._
