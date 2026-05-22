---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: []
workflowType: research
lastStep: 6
research_type: technical
research_topic: Gatsby 2 portfolio migration to Astro
research_goals: static-first output, simple hosting (e.g. GitHub Pages), sustainable dependencies
user_name: Juanma
date: 2026-04-20
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-04-20  
**Author:** Juanma  
**Research Type:** technical  

---

## Research Overview

This report evaluates migrating **juanmaperez-portfolio** from **Gatsby 2** (React 16, GraphQL build-time data layer, sharp/gatsby-image, remark, styled-components, `gh-pages` to `public`) to **Astro**, driven by goals of **static-first delivery** and **simple hosting**.

Official Astro documentation covers **migration from Gatsby** (structural and data differences), **content collections** (typed, build-time content as a GraphQL alternative for MD/MDX), **islands architecture** (minimal client JS), and **GitHub Pages deployment** (including `site`, `base`, and the recommended GitHub Action). The executive synthesis recommends an **Astro-first static** target, a **page-by-page or section-by-section port** rather than a big-bang rewrite, and an early **spike** covering routing, images, and one complex layout.

**Primary sources:** [Astro: Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby), [Content collections](https://docs.astro.build/en/guides/content-collections), [Islands architecture](https://docs.astro.build/en/concepts/islands/), [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github), [Martin Fowler: Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html), [Vercel Academy: Incremental migration](https://vercel.com/academy/microfrontends-on-vercel/incremental-migration).

---

## Technical Research Scope Confirmation

**Research Topic:** Gatsby 2 portfolio migration to Astro  
**Research Goals:** Static-first output; simple hosting; maintainable toolchain  

**Technical research scope:**

- Architecture analysis — SSG patterns, islands vs SPA, content pipeline  
- Implementation approaches — migration sequencing, tooling, CI/CD  
- Technology stack — JavaScript/TypeScript, Astro, integrations, deploy targets  
- Integration patterns — Markdown/MDX, analytics, assets, optional APIs  
- Performance considerations — payload size, build time, Core Web Vitals  

**Research methodology:** Current public documentation and guides; claims tied to URLs where possible; confidence noted for anecdotal migration posts.

**Scope confirmed:** 2026-04-20 (user **[C] Continue**).

---

## Technology Stack Analysis

### Programming languages

_Portfolio context:_ Modern Astro projects typically use **TypeScript** for `astro.config` and content schemas; JavaScript remains valid. Gatsby 2 in this repo uses **JavaScript/React 16** with legacy **node-sass** (native bindings friction on modern Node).

_Evolution:_ Moving to Astro decouples “authoring UI” from “shipping React everywhere”; React can remain in **islands** only where needed ([Astro + React integration](https://docs.astro.build/en/guides/integrations-guide/react/) when opted in).

_Source:_ [Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby) (Astro docs).

### Development frameworks and libraries

_Major stack shift:_ **Gatsby 2** uses a **GraphQL data layer at build time** and a **single-page-app-style root**; **Astro** uses **file-based routing**, `.astro` components (HTML-first), and **ESM imports** / `getCollection()` instead of GraphQL ([Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)).

_Content:_ **Content collections** provide schemas, type-safety, and loaders for Markdown, MDX, JSON, etc. ([Content collections](https://docs.astro.build/en/guides/content-collections)).

_This repo’s notable dependencies to replan:_ `gatsby-image` + sharp pipeline → Astro **Image** / assets pipeline; `react-helmet` → Astro layouts and `<head>`; `styled-components` + Sass → scoped Astro styles, global Sass, or React islands with styled-components only where justified; GSAP / scroll libraries → verify **client-only** boundaries in `.astro` pages.

### Database and storage technologies

_No relational DB in-scope._ **Storage** for a static portfolio is **Git-backed files** (Markdown/MDX/assets) plus optional **remote head** or CMS later. Astro documents **build-time collections** vs **live collections** (remote data) ([Content collections](https://docs.astro.build/en/guides/content-collections)) — for “static-first,” prefer build-time unless you add a CMS.

### Development tools and platforms

_Build:_ Node LTS, `npm`/`pnpm`, Astro CLI (`npm create astro@latest` per [migration guide](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)).

_Deploy:_ **GitHub Pages** via official workflow (`withastro/action`, `actions/deploy-pages`), `site` and `base` in `astro.config` ([GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github)). Current repo uses **`gh-pages` publishing `public/`** — equivalent output is Astro’s static `outDir` mapped to Pages.

_Quality:_ Prettier/ESLint optional; **Playwright** or visual checks optional for regression on key routes (not mandated by this research).

### Cloud infrastructure and deployment

_Target alignment:_ **GitHub Pages** = static file hosting + HTTPS; fits “simple hosting.” Alternatives (Netlify, Cloudflare Pages) stay available without changing the core Astro static model ([Deploy your Astro site](https://docs.astro.build/en/guides/deploy)).

### Technology adoption trends

_Migration pattern:_ Official **Gatsby → Astro** guide exists, signaling maintained migration path and demand ([Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)).

_Community experience:_ Multiple practitioner write-ups describe faster builds and less client JS by default; treat timing numbers as **low confidence** unless reproduced on your tree.

---

## Integration Patterns Analysis

### API design patterns

_Portfolio boundary:_ Mostly **no application API**. Optional **contact forms** via third-party endpoints or serverless elsewhere; static Astro does not require REST/GraphQL **for content** if files are local.

_Gatsby-specific:_ Build-time **GraphQL** is not carried forward; replaced by **imports**, `getCollection()`, and loaders ([Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)).

### Communication protocols

**HTTPS** delivery of static assets and HTML (GitHub Pages). No WebSocket/gRPC requirement for stated goals.

### Data formats and standards

**Markdown / MDX** with frontmatter; **JSON/YAML** for config and schemas in content collections ([Content collections](https://docs.astro.build/en/guides/content-collections)). **Open Graph** meta via Astro layouts replaces `react-helmet` patterns.

### System interoperability

**Analytics:** Replace `gatsby-plugin-google-analytics` with a minimal script or privacy-preserving alternative in a layout component.

**Icons:** `@fortawesome/react-fontawesome` can become **SVG sprites**, Astro components, or limited React islands.

**Sitemap / manifest / offline:** Map to `@astrojs/sitemap`, web app manifest static JSON, and a conscious decision on **service worker** scope (often dropped for portfolios).

### Microservices and enterprise integration

**Not applicable** to this static portfolio scope; no API gateway or message broker required.

### Event-driven integration

**Not applicable** unless you add client analytics streams; keep third-party scripts load **idle/deferred** where possible.

### Integration security patterns

**Dependency hygiene:** Replacing Gatsby 2 + `node-sass` removes a major native-build pain and CVE tail risk.  
**Secrets:** None in static repo; CI uses **GitHub Actions secrets** only if needed for deploy tokens ([GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github)).

---

## Architectural Patterns and Design

### System architecture patterns

**Static site generation (default):** Astro emits **mostly static HTML**; interactivity is opt-in via **islands** ([Islands architecture](https://docs.astro.build/en/concepts/islands/)).

**Contrast with Gatsby 2:** React-centric runtime assumptions vs HTML-first with selective hydration.

### Design principles

**Separation of concerns:** Layouts (`*.astro`) for structure/SEO; content in `src/content`; interactive widgets isolated.

**Progressive enhancement:** Ship HTML that works without JS; enhance with islands.

### Scalability and performance

_Portfolio scale:_ Build and runtime scale are modest; still plan **image optimization** and **lazy** loading for media-heavy pages ([Astro image guidance in docs](https://docs.astro.build/en/guides/images)).

_Islands benefit:_ JS loaded only for components that need it ([Islands architecture](https://docs.astro.build/en/concepts/islands/)).

### Integration and communication (architecture view)

Content **schemas** validate frontmatter at build time ([Content collections](https://docs.astro.build/en/guides/content-collections)), reducing silent content breakage vs ad-hoc GraphQL shapes.

### Security architecture

Minimize third-party scripts; **Subresource Integrity** where applicable; **HTTPS** by host.

### Data architecture

**File-based source of truth** in Git; optional future CMS with loaders — not required for initial migration.

### Deployment and operations

**GitHub Actions** pipeline as single path to production; preview deploys optional if you add Netlify/CF later ([Deploy](https://docs.astro.build/en/guides/deploy)).

---

## Implementation Approaches and Technology Adoption

### Technology adoption strategies

**Incremental migration (recommended):** Use a **strangler**-style approach — ship a new Astro site alongside learning, route by route, rather than blocking until feature parity ([Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)). For a personal site, “incremental” often means **one branch**, **migrate templates in order of traffic/complexity** ([Incremental migration](https://vercel.com/academy/microfrontends-on-vercel/incremental-migration) — concept applies beyond micro-frontends).

**Spike-first:** Port **home**, **one blog listing + post**, and **one animation-heavy page** to validate GSAP/scroll + images.

### Development workflows and tooling

New repo or **same repo big-bang folder replace** — your choice; many teams use **`npm create astro@latest`** in a branch and swap `main` when ready ([Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)).

### Testing and quality assurance

Smoke checklist: links, OG tags, Lighthouse spot check, mobile nav, code blocks (Prism → Shiki or `@astrojs/mdx` highlighter).

### Deployment and operations practices

Adopt **official GitHub Action** for Astro → Pages; set **`site`** and **`base`** for `username.github.io/repo` paths ([GitHub Pages](https://docs.astro.build/en/guides/deploy/github)).

### Team organization and skills

Solo-friendly; primary learning curve is **`.astro` syntax`**, **content collections**, and **image** pipeline differences.

### Cost optimization

**GitHub Pages** hosting cost ~ $0 for public personal sites; CI minutes within free tier for typical portfolio build frequency.

### Risk assessment and mitigation

| Risk | Mitigation |
|------|------------|
| Animation libs assume DOM/React lifecycle | Prototype in one island or client script |
| URL changes hurt SEO | `redirects` in `astro.config` / host redirects |
| Image regression | Side-by-side visual compare critical pages |
| Scope creep (SSR, CMS) | Lock “static Phase 1” until live |

### Technical research recommendations

1. **Target:** Astro, `output: 'static'`, GitHub Pages via documented Action.  
2. **Content:** Content collections for posts/pages with shared schema.  
3. **Interactivity:** Islands + `client:*` directives only where measured need exists ([Islands](https://docs.astro.build/en/concepts/islands/)).  
4. **Process:** Spike → parallel content port → cutover deploy ([Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html)).

### Implementation roadmap (phased)

1. **Week 0:** Spike project + Pages deploy + one MDX post.  
2. **Phase 1:** Global layout, SEO, sitemap, analytics.  
3. **Phase 2:** Migrate content in batches; redirects.  
4. **Phase 3:** Remove Gatsby; archive old `public` deploy path if URL changes.

### Success metrics

Lighthouse **performance ≥ prior** on home; **zero console errors**; **build < few minutes** on CI; **all critical URLs** return 200 or intentional 301.

---

## Synthesis: From Legacy Gatsby 2 to Astro

### Executive summary

Migrating from **Gatsby 2** to **Astro** aligns with **static-first** and **simple GitHub Pages hosting**. Astro’s official **from-Gatsby** guide documents the core mental-model shift: **GraphQL → ESM/content collections**, **SPA root → multi-page `.astro`**, and optional **React via integration** ([Migrate from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby)). **Islands** keep default JS low ([Islands](https://docs.astro.build/en/concepts/islands/)). **GitHub Pages** deployment is first-class in Astro docs ([GitHub Pages](https://docs.astro.build/en/guides/deploy/github)). An **incremental** port reduces risk versus a monolithic rewrite ([Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html)).

**Top recommendations:** (1) Confirm **static-only** Phase 1 scope. (2) Run a **three-page spike** (home + blog + hardest interactive page). (3) Implement **content collections** early. (4) Wire **GitHub Actions** deploy with correct **`site`/`base`**. (5) Map **images and SEO** before bulk content moves.

### Table of contents

1. [Research Overview](#research-overview)  
2. [Scope Confirmation](#technical-research-scope-confirmation)  
3. [Technology Stack Analysis](#technology-stack-analysis)  
4. [Integration Patterns](#integration-patterns-analysis)  
5. [Architecture](#architectural-patterns-and-design)  
6. [Implementation](#implementation-approaches-and-technology-adoption)  
7. [This synthesis](#synthesis-from-legacy-gatsby-2-to-astro)  

### Current repo baseline (for implementation agents)

From `package.json`: **gatsby ^2.13.21**, **react ^16.8.6**, **gatsby-image**, **gatsby-transformer-remark**, **gatsby-plugin-sharp**, **styled-components**, **node-sass**, **react-helmet**, **gh-pages** deploy to **`public`**.

### Technical research methodology

- Official Astro documentation (migration, content, islands, deploy).  
- Established migration pattern literature (Strangler Fig, incremental migration).  
- Practitioner blogs cited only as **illustrative**, not benchmarks.

### Source index

| Topic | URL |
|--------|-----|
| Migrate from Gatsby | https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby |
| Content collections | https://docs.astro.build/en/guides/content-collections |
| Islands architecture | https://docs.astro.build/en/concepts/islands/ |
| Deploy overview | https://docs.astro.build/en/guides/deploy |
| GitHub Pages | https://docs.astro.build/en/guides/deploy/github |
| Strangler Fig pattern | https://martinfowler.com/bliki/StranglerFigApplication.html |
| Incremental migration (concept) | https://vercel.com/academy/microfrontends-on-vercel/incremental-migration |

### Technical research conclusion

**Decision:** Proceed with **Astro** as the primary target for a **static** portfolio on **GitHub Pages**, using **content collections** and **islands** for selective interactivity. **Next step in BMad:** **[DP] Document Project** to inventory routes and plugins, or **[QQ] Quick Dev** to execute the spike once scope is frozen.

---

**Technical research completion date:** 2026-04-20  
**Workflow status:** Steps 1–6 completed (single session with user **[C] Continue**).  
**Document location:** `_bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md`
