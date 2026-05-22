---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/research/technical-gatsby-2-portfolio-migration-to-astro-research-2026-04-20.md
  - docs/index.md
workflowType: epics
project_name: juanmaperez
user_name: Juanma
status: complete
completedAt: '2026-04-20'
---

# juanmaperez — Epic breakdown

## Overview

Epic and story breakdown for the **Gatsby 2 → Astro** portfolio migration, derived from **PRD v1.2** and **`architecture.md`**. Stories are ordered so each completes with only dependencies on **earlier** stories in the same epic or prior epics.

---

## Requirements inventory

### Functional requirements

FR1: Visitor can view a **home** page summarizing identity, work, and paths to blog and CV.  
FR2: Visitor can view a **CV** page with professional history structured as today (sections: personal, summary, skills, experience, education).  
FR3: Visitor can browse a **paginated blog index** with consistent ordering (newest first).  
FR4: Visitor can open an **individual blog post** at its public URL with full body content.  
FR5: Visitor can browse posts filtered by **category** at `/blog/category/:category`.  
FR6: Visitor can open each **project case study** at its stable public URL.  
FR7: Visitor can navigate between global sections via **header/menu** on all primary templates.  
FR8: Author can add or edit **posts** using markdown with required fields (path, date, title, type, category, tags, excerpt, icon/thumbnail as applicable per schema).  
FR9: Author can add or edit **projects** using markdown with required fields (path, date, title, type, category, thumbnail, images gallery as applicable).  
FR10: System emits **per-page title and meta description** suitable for social previews.  
FR11: System publishes a **sitemap** covering all indexable MVP routes.  
FR12: System supports **301 redirects** for any URL that intentionally changes.  
FR13: Visitor sees **optimized images** for hero/list thumbnails without manual width tuning per page.  
FR14: Visitor sees **syntax-highlighted** code in technical posts.  
FR15: Visitor can use the site on **mobile and desktop** widths without horizontal scroll on standard pages.  
FR16: Maintainer can run a **local dev server** with **content live reload** appropriate to the chosen static site generator.  
FR17: Maintainer can run a **production build** that **fails** when **content schema validation** is enabled (mandatory MVP cutover gate).  
FR18: Maintainer can deploy **`site/`** via **documented CI pipeline** (GitHub Actions → Pages) without manual FTP — **sole** production path after cutover.  
FR23: Maintainer can **retire the legacy Gatsby codebase** at repo root so **only `site/`** remains the maintained application (archive or remove; docs updated).  
FR19: For scroll/timeline-heavy routes, visitor completes the same primary narrative per **migration parity checklist**; motion same/simplified/removed and approved.  
FR20: Visitor can reach **at least one primary contact path** from **home** or **global navigation**.  
FR21: Visitor does not hit **broken internal links** on MVP routes (release checklist: automated or manual).  
FR22: Visitor experiences **typography, color, spacing, layout, and image presentation** per checklist Visual parity; Epic 8 restores legacy brand CSS including **styled-components** home/project rules (8.2 fonts, 8.3 layout/images).

### Non-functional requirements

NFR-P1: **LCP** — **target** ≤ baseline where available; **advisory** post-cutover (Story **7.4** dropped in PRD **v1.2**).  
NFR-P2: **Transferred JS** — **target** ≤ baseline + **20 KiB**; **cutover** satisfied by checklist **LCP/JS ex.** rows; formal **7.4** gate **dropped**.  
NFR-R1: Dependencies installable on **documented Node LTS** without deprecated native binding toolchains for core workflow.  
NFR-R2: Repository documents **entry commands** and hosting assumptions in `docs/` and/or README.  
NFR-S1: No API keys or private tokens committed for MVP static deploy.  
NFR-S2: Third-party scripts (analytics) load with **defer/async** and minimal surface.  
NFR-A1: New navigation and form controls meet **keyboard** operation and visible **focus** states.  
NFR-V1: Web font loading for FR22 uses documented strategy; no LCP regression on home without checklist mitigation.

### Additional requirements (from Architecture)

- Use **Astro** with `output: 'static'` (ADR-001).  
- **GitHub Pages** + **GitHub Actions** deploy (ADR-002).  
- **Content collections** with **Zod** for `posts` and `projects`; build fails on schema violation (ADR-003).  
- **Islands** only for checklist-approved client components (ADR-004).  
- **Scoped `.astro` styles** + ported global CSS; avoid styled-components on default path (ADR-005).  
- **`astro:assets`** (or current Astro image pipeline) for responsive images (ADR-006).  
- **GA4 or equivalent** analytics, async/defer (ADR-007).  
- Routing parity: `/blog/`, `/blog/page/[n]/`, `/blog/category/[cat]/`, post and project paths from `path` frontmatter.  
- **`docs/migration-parity-checklist.md`** maintained through cutover.  
- **Baseline artifacts** stored per `architecture.md` section 13.

### UX design requirements (from PRD / Architecture — no separate UX file)

UX-DR1: Global navigation is **keyboard-operable** and shows a visible **focus** ring (NFR-A1).  
UX-DR2: Pages use **semantic landmarks** (`header`, `main`, `nav`, `footer` as appropriate) and heading order matches content hierarchy.  
UX-DR3: Meaningful images expose **descriptive alt** text; decorative images marked empty alt where applicable.  
UX-DR4: Layouts do not introduce **horizontal scroll** on standard mobile and desktop breakpoints (FR15).  
UX-DR5: **WCAG 2.1 Level A** minimum for new templates (color contrast for text/background pairs used in nav and body defaults—document token choices).

---

## FR coverage map

| FR | Epic | Primary story |
|----|------|-----------------|
| FR1 | E3 | 3.3 |
| FR2 | E3 | 3.4 |
| FR3 | E4 | 4.1, 4.2 |
| FR4 | E4 | 4.3 |
| FR5 | E4 | 4.4 |
| FR6 | E5 | 5.1 |
| FR7 | E3 | 3.2 |
| FR8 | E2 | 2.2 |
| FR9 | E2 | 2.3 |
| FR10 | E6 | 6.1 |
| FR11 | E6 | 6.2 |
| FR12 | E6 | 6.3 |
| FR13 | E5 | 5.2 (also 3.3, 4.x images) |
| FR14 | E4 | 4.5 |
| FR15 | E3, E4, E5 | 3.x, 4.x, 5.x visual QA |
| FR16 | E1 | 1.4 |
| FR17 | E2 | 2.1, 2.4 |
| FR18 | E1, E9 | 1.3, 9.1 |
| FR19 | E7 | 7.2, 7.3 |
| FR20 | E3 | 3.6 |
| FR21 | E6 | 6.4 |
| FR22 | E8 | 8.2, 8.3 |
| FR23 | E9 | 9.2, 9.3 |
| NFR-P1/P2 | E1 | 1.5 (reference only) |
| NFR-V1 | E8 | 8.2 |
| NFR-R1/R2 | E1 | 1.1, 1.4 |
| NFR-S1/S2 | E6 | 6.5 |
| NFR-A1 | E3 | 3.2, 3.7 |
| UX-DR1–5 | E3, E4 | Nav + page QA stories |

---

## Epic list

### Epic 1: Automated builds, deploys, and performance baselines
Maintainers get a **reproducible pipeline** and **documented performance baselines** so every later epic can be validated objectively.  
**FRs covered:** FR16, FR18 — **NFRs:** NFR-P1 (setup), NFR-P2 (setup), NFR-R1, NFR-R2  

### Epic 2: Validated content collections for posts and projects
Authors can **add and edit markdown** with schemas that **fail the build** when invalid (cutover gate).  
**FRs covered:** FR8, FR9, FR17  

### Epic 3: Global experience, core pages, and contact
Visitors can use **shared navigation**, **home**, **CV**, **404**, and reach **contact** with accessible chrome.  
**FRs covered:** FR1, FR2, FR7, FR15 (core), FR20 — **UX-DR:** UX-DR1–5 (nav/layout)  

### Epic 4: Full blog reading experience
Readers can **list, paginate, filter by category**, and read **posts with highlighted code**.  
**FRs covered:** FR3, FR4, FR5, FR14, FR15 (blog)  

### Epic 5: Project case studies with strong imagery
Visitors can open **case studies** with **optimized images** and galleries.  
**FRs covered:** FR6, FR13, FR15 (projects)  

### Epic 6: Discovery, redirects, analytics, and link integrity
Search engines and social previews work; **redirects** and **internal links** are verified; **analytics** loads responsibly.  
**FRs covered:** FR10, FR11, FR12, FR21 — **NFRs:** NFR-S1, NFR-S2  

### Epic 7: Motion parity and client islands (where approved)
Where legacy UX demands it, visitors still complete the **narrative** with **controlled motion** and **bounded JS** per checklist.  
**FRs covered:** FR19 — checklist **LCP/JS ex.** documents motion budget (formal **7.4** regression **dropped** per PRD **v1.2**).

### Epic 8: Typography, layout, and visual design parity
Visitors see the **legacy brand** on the Astro site: fonts, palette, **styled-components layout**, and **image crop/scale** (especially home), not a generic system-font + flex approximation.  
**FRs covered:** FR22 (with **FR13** for asset pipeline only) — **NFRs:** NFR-V1, NFR-A1 — **UX-DR:** UX-DR4–5  

### Epic 9: Legacy codebase retirement and production cutover
**`site/`** is the **only** maintained application and **default deployable**; repo-root Gatsby is archived or removed so maintainers cannot accidentally ship the old stack.  
**FRs covered:** FR18 (cutover confirmation), FR23 — **NFRs:** NFR-R2  

---

## Epic 1: Automated builds, deploys, and performance baselines

**Goal:** A minimal Astro site builds in CI, deploys to GitHub Pages (or artifact), Node/toolchain is pinned, and **legacy baselines** exist for later comparison.

### Story 1.1: Initialize Astro static project

As a **maintainer**,  
I want **an Astro repository** with `output: 'static'` and TypeScript enabled,  
So that **all following work targets a consistent stack**.

**Acceptance criteria:**

**Given** a clean branch  
**When** the initializer runs (`npm create astro@latest` per current docs) with static + TS options  
**Then** `npm run build` produces a `dist/` (or configured outDir) with no errors  
**And** `package.json` documents `dev`, `build`, `preview` scripts  

**Maps to:** Architecture ADR-001; NFR-R1 (foundation).

---

### Story 1.2: Configure site URL and base for GitHub Pages

As a **maintainer**,  
I want **`site` and `base`** set correctly in `astro.config.mjs`,  
So that **asset URLs and deploy paths work** for the real GitHub Pages URL pattern.

**Acceptance criteria:**

**Given** the production URL and repo Pages path (user site vs project site)  
**When** `astro.config.mjs` is updated per Architecture section 11  
**Then** built HTML references absolute `site` for OG/sitemap where required  
**And** behavior is documented in `docs/` or README (NFR-R2)  

**Maps to:** Architecture §5, §11; PRD assumptions.

---

### Story 1.3: GitHub Action — build and deploy to Pages

As a **maintainer**,  
I want **CI to build and publish** the static site on push to main,  
So that **FR18** is satisfied without manual FTP.

**Acceptance criteria:**

**Given** push to default branch  
**When** the workflow runs  
**Then** install + build steps complete with pinned Node version  
**And** Pages deploy action (or documented equivalent) publishes the artifact  
**And** workflow file is referenced from `docs/` or README  

**Maps to:** FR18; Architecture §11.

---

### Story 1.4: Developer documentation and Node pinning

As a **maintainer**,  
I want **`.nvmrc` or `engines` and clear dev commands**,  
So that **FR16** and **NFR-R1/R2** are satisfied.

**Acceptance criteria:**

**Given** the chosen Node LTS that supports the Astro major in use  
**When** a developer follows README / `docs/` setup  
**Then** `npm install` and `npm run dev` succeed without `node-sass`-class native failures  
**And** `npm run dev` reflects content edits without manual restart (live reload / HMR per Astro defaults)  

**Maps to:** FR16, NFR-R1, NFR-R2.

---

### Story 1.5: Capture legacy performance baselines

As a **maintainer**,  
I want **stored Lighthouse (or equivalent) baselines** for `/` and one blog post,  
So that **NFR-P1** and **NFR-P2** can be enforced after migration.

**Acceptance criteria:**

**Given** legacy production or agreed staging URLs  
**When** baseline runs execute with documented tool, preset, and throttling (Architecture §13)  
**Then** LCP and transferred-JS numbers are recorded with date and commit SHA under `_baseline/` or CI artifacts  
**And** procedure is documented for rerunning post-migration  

**Maps to:** NFR-P1, NFR-P2; Architecture §13.

---

## Epic 2: Validated content collections for posts and projects

**Goal:** Markdown lives in collections with **Zod**; invalid content **breaks the build**.

### Story 2.1: Define posts and projects schemas

As an **author**,  
I want **schemas that match legacy frontmatter**,  
So that **FR8/FR9** fields are enforced consistently.

**Acceptance criteria:**

**Given** `src/content.config.ts` (or project-default) with `posts` and `projects` loaders  
**When** a file violates required fields or types  
**Then** `astro check` and/or build reports a clear validation error  
**And** schema fields align with `docs/data-models.md` and Architecture §6  

**Maps to:** FR8, FR9, FR17; ADR-003.

---

### Story 2.2: Migrate blog post markdown

As an **author**,  
I want **all posts** in the collection paths,  
So that **FR8** is satisfied and blog work can proceed.

**Acceptance criteria:**

**Given** existing post folders under legacy `src/content/posts`  
**When** files are moved or copied into the Astro content tree and frontmatter normalized  
**Then** all nine posts validate against the schema  
**And** `path` values remain unique and match intended public URLs  

**Maps to:** FR8.

---

### Story 2.3: Migrate project case study markdown

As an **author**,  
I want **all project case studies** validated in `projects`,  
So that **FR9** is satisfied.

**Acceptance criteria:**

**Given** legacy project markdown and assets  
**When** migrated under `projects` collection paths with fixed relative image paths  
**Then** all five projects validate  
**And** thumbnails resolve through the image pipeline plan (Epic 5)  

**Maps to:** FR9.

---

### Story 2.4: CI gate — schema validation on every build

As a **maintainer**,  
I want **CI to fail** on invalid content,  
So that **FR17** is a hard gate before deploy.

**Acceptance criteria:**

**Given** CI workflow from Epic 1  
**When** an invalid markdown file is introduced on a branch  
**Then** the pipeline fails at check/build with a readable schema error  
**When** all content is valid  
**Then** pipeline passes  

**Maps to:** FR17.

---

## Epic 3: Global experience, core pages, and contact

**Goal:** Shared layout, **home**, **CV**, **404**, accessible **nav**, and **contact** entry points.

### Story 3.1: Base layout and document shell

As a **visitor**,  
I want **consistent HTML structure and SEO defaults**,  
So that **UX-DR2** and future **FR10** integration are supported.

**Acceptance criteria:**

**Given** any page using `BaseLayout.astro`  
**When** rendered  
**Then** `lang`, `meta charset`, viewport, and default title/description fallbacks exist  
**And** `main` wraps primary content with one `h1` policy documented  

**Maps to:** UX-DR2; Architecture §9.

---

### Story 3.2: Global header and navigation

As a **visitor**,  
I want **keyboard-accessible navigation** between major sections,  
So that **FR7**, **FR20** (discovery), **NFR-A1**, and **UX-DR1** are met.

**Acceptance criteria:**

**Given** keyboard focus on the nav  
**When** Tab / Shift+Tab and Enter are used  
**Then** all nav links are reachable and activated predictably  
**And** focus visibility meets team-defined contrast (UX-DR5)  

**Maps to:** FR7, NFR-A1, UX-DR1, UX-DR5.

---

### Story 3.3: Home page content and layout parity

As a **visitor**,  
I want **the home page** to reflect identity, work teasers, and paths to blog and CV,  
So that **FR1** is satisfied.

**Acceptance criteria:**

**Given** migrated collection data available (Epic 2)  
**When** `/` loads  
**Then** primary sections from legacy intent are present (hero/about/works/contact blocks as applicable)  
**And** links to `/blog/` and CV route work  

**Maps to:** FR1; supports FR13 on hero images when assets wired.

---

### Story 3.4: CV page parity

As a **visitor**,  
I want **the CV page** with the same section structure as legacy,  
So that **FR2** is satisfied.

**Acceptance criteria:**

**Given** CV content source (markdown or structured data per implementation choice)  
**When** `/cv/` loads  
**Then** personal, summary, skills, experience, and education sections render  
**And** print/readability is no worse than legacy on smoke devices  

**Maps to:** FR2.

---

### Story 3.5: 404 and recovery paths

As a **visitor**,  
I want **a helpful 404** with links home or to blog index,  
So that **journeys** recover gracefully.

**Acceptance criteria:**

**Given** an unknown path  
**When** the server/host returns 404  
**Then** branded 404 content appears with links to `/` and `/blog/`  

**Maps to:** PRD user journey recovery.

---

### Story 3.6: Primary contact path

As a **visitor**,  
I want **at least one obvious contact method** from home or global nav,  
So that **FR20** is satisfied.

**Acceptance criteria:**

**Given** configured mailto, social, or contact section link in `site.config`  
**When** viewing home or any page with global nav  
**Then** the contact affordance is visible without hunting  
**And** link opens or copies per expected behavior (mailto opens client; external opens new tab if policy says so)  

**Maps to:** FR20.

---

### Story 3.7: Core responsive and accessibility smoke

As a **visitor**,  
I want **home, CV, and 404** usable on mobile and desktop widths,  
So that **FR15** and **UX-DR4** hold for core pages.

**Acceptance criteria:**

**Given** documented breakpoints  
**When** viewports are resized for home and CV  
**Then** no unintended horizontal scroll on standard pages  
**And** automated or documented manual smoke checklist is stored  

**Maps to:** FR15, UX-DR4.

---

## Epic 4: Full blog reading experience

**Goal:** Blog index, pagination, posts, categories, syntax highlighting.

### Story 4.1: Blog index (first page)

As a **reader**,  
I want **the latest posts** on `/blog/`,  
So that **FR3** (first page) is met.

**Acceptance criteria:**

**Given** validated posts sorted by date DESC  
**When** `/blog/` loads  
**Then** the first page shows up to 12 posts (legacy `postsPerPage`)  
**And** each teaser shows title, excerpt, and link to post  

**Maps to:** FR3.

---

### Story 4.2: Blog pagination

As a **reader**,  
I want **`/blog/page/N/`** for older posts,  
So that **FR3** pagination parity holds.

**Acceptance criteria:**

**Given** more than 12 posts  
**When** visiting page 2+  
**Then** URLs follow the agreed slash policy and match legacy pattern  
**And** navigation between pages exists  

**Maps to:** FR3.

---

### Story 4.3: Blog post detail pages

As a **reader**,  
I want **each post at its canonical `path`**,  
So that **FR4** is met.

**Acceptance criteria:**

**Given** each post’s `path` from frontmatter  
**When** visiting that URL  
**Then** full markdown body renders with correct typography  
**And** prev/next or legacy navigation patterns are implemented or consciously dropped (document in checklist)  

**Maps to:** FR4.

---

### Story 4.4: Category index pages

As a **reader**,  
I want **`/blog/category/{category}`** listing posts in that category,  
So that **FR5** is met.

**Acceptance criteria:**

**Given** distinct categories from posts  
**When** visiting each generated category URL  
**Then** only posts in that category appear  
**And** empty categories are not generated  

**Maps to:** FR5.

---

### Story 4.5: Syntax highlighting for code blocks

As a **reader**,  
I want **highlighted code** in posts,  
So that **FR14** is met.

**Acceptance criteria:**

**Given** fenced code blocks in markdown  
**When** a technical post renders  
**Then** highlighting matches chosen highlighter (e.g. Shiki) and is readable in dark/light if both exist  

**Maps to:** FR14.

---

## Epic 5: Project case studies with strong imagery

**Goal:** Case study routes and strong image handling.

### Story 5.1: Project detail routes

As a **visitor**,  
I want **each project** at its stable `path`,  
So that **FR6** is met.

**Acceptance criteria:**

**Given** each project entry  
**When** visiting `path`  
**Then** body and metadata render per legacy intent  
**And** navigation between projects behaves as legacy or is documented changed  

**Maps to:** FR6.

---

### Story 5.2: Project and listing images

As a **visitor**,  
I want **responsive optimized images** for thumbnails and galleries,  
So that **FR13** is met for portfolio content.

**Acceptance criteria:**

**Given** project thumbnails and gallery images in content  
**When** pages render  
**Then** images use the Astro image pipeline (ADR-006) with appropriate widths/sizes  
**And** no broken images on MVP project routes  

**Maps to:** FR13 (projects); supports FR15 visual QA on project pages.

---

## Epic 6: Discovery, redirects, analytics, and link integrity

**Goal:** SEO artifacts, redirects, safe analytics, internal link verification.

### Story 6.1: Per-page title, description, and Open Graph

As a **visitor / recruiter**,  
I want **accurate titles and previews**,  
So that **FR10** is met.

**Acceptance criteria:**

**Given** page-level frontmatter or derived meta  
**When** posts, projects, home, and CV render  
**Then** `title`, `meta description`, and OG tags are unique per page  
**And** sharing a URL in a debugger shows expected preview fields  

**Maps to:** FR10.

---

### Story 6.2: Sitemap generation

As a **search engine**,  
I want **a sitemap listing indexable routes**,  
So that **FR11** is met.

**Acceptance criteria:**

**Given** `@astrojs/sitemap` (or equivalent) configured with `site`  
**When** build completes  
**Then** sitemap includes home, CV, blog list pages, posts, projects, categories as indexable  
**And** `noindex` is applied only where intended  

**Maps to:** FR11.

---

### Story 6.3: Redirect map for URL changes

As a **returning visitor**,  
I want **301 redirects** when paths change,  
So that **FR12** and SEO goals hold.

**Acceptance criteria:**

**Given** any URL change vs legacy  
**When** documented in parity checklist  
**Then** `astro.config` redirects (or host-level) implement 301s  
**And** redirect list is version-controlled  

**Maps to:** FR12.

---

### Story 6.4: Internal link integrity check

As a **maintainer**,  
I want **MVP routes checked for broken internal links**,  
So that **FR21** is met.

**Acceptance criteria:**

**Given** built `dist/` or preview URL list  
**When** the release checklist step runs (link crawler or scripted `href` check)  
**Then** zero broken internal links on MVP route set, or issues are filed before cutover  

**Maps to:** FR21.

---

### Story 6.5: Analytics snippet (GA4 or alternative)

As a **site owner**,  
I want **maintained analytics** with minimal performance impact,  
So that **NFR-S2** and PRD analytics goals are met without **NFR-S1** violations.

**Acceptance criteria:**

**Given** measurement ID supplied via safe config (no secrets in repo)  
**When** pages load  
**Then** script uses async/defer as agreed  
**And** tag manager bloat is avoided unless explicitly required  

**Maps to:** NFR-S1, NFR-S2; ADR-007.

---

## Epic 7: Motion parity and client islands (where approved)

**Goal:** Checklist-driven **FR19** delivery with **NFR-P1/P2** regression verification after islands land.

### Story 7.1: Legacy animation inventory

As a **maintainer**,  
I want **a list of legacy JS/animation dependencies per route**,  
So that **FR19** decisions are data-driven.

**Acceptance criteria:**

**Given** legacy `src/` templates audited  
**When** inventory is written into `docs/migration-parity-checklist.md`  
**Then** each affected route has motion parity choice: same / simplified / removed — with **home, CV, header, and legacy contact motion defaulting to `same`** (Stories 3.3/3.4 static MVP is interim, not the cutover target)  
**And** each `same` row records recommended Astro approach (`vanilla-script` | `island`) and likely **LCP/JS exception** for NFR-P2  
**And** Story **7.2** scope is explicitly non-empty when inventory lists non-`static` recommendations  

**Maps to:** FR19 prep; Architecture §8; NFR-P2 exception path.

---

### Story 7.2: Implement approved islands only

As a **visitor**,  
I want **motion or interactivity only where the checklist approves**,  
So that **FR19** and **NFR-P2** are honored.

**Acceptance criteria:**

**Given** checklist-approved components (Story 7.1 inventory)  
**When** implemented per **ADR-008** (GSAP 3 + ScrollTrigger for scroll/timeline; no ScrollMagic port)  
**Then** a **spike** on home intro + one scroll scene ships first; full home/CV/header/project contact motion follows inventory  
**And** motion loads only on routes with checklist approval via `client:visible` / route-scoped scripts (not global layout)  
**And** `prefers-reduced-motion` shows static end states  
**And** bundle contribution (gsap + plugins + any React CV island) is noted for NFR-P2  

**Maps to:** FR19, NFR-P2; ADR-004, ADR-008.

---

### Story 7.3: Checklist sign-off before cutover

As a **product owner**,  
I want **signed parity rows** before switching DNS or default branch,  
So that **FR19** governance is explicit.

**Acceptance criteria:**

**Given** each high-risk route row in checklist  
**When** owner marks approved with date  
**Then** cutover is allowed only when mandatory rows are complete  

**Maps to:** FR19 governance.

---

### ~~Story 7.4: Post-islands performance regression check~~ — **DROPPED** (PRD **v1.2**, 2026-05-22)

Formal Lighthouse/JS regression gate **removed**. Cutover uses **7.3** checklist sign-off + **LCP/JS ex.** rows. Story **1.5** baselines remain **reference only**. Optional advisory measurement post-launch is out of epic backlog.

---

## Epic 8: Typography, layout, and visual design parity

**Goal:** Checklist-driven **FR22** delivery—legacy fonts, **styled-components layout**, and **image presentation** reconciled with the static Astro site without a full redesign.

### Story 8.1: Legacy typography and styling inventory

As a **maintainer**,  
I want **a comparison of legacy vs Astro fonts, colors, and key CSS rules per template**,  
So that **FR22** gaps are data-driven before implementation.

**Acceptance criteria:**

**Given** legacy `src/styles/` (e.g. `main.css`, `mixins.scss`) and component-level styled rules in `src/` audited  
**When** inventory is written into `docs/migration-parity-checklist.md`  
**Then** a **Legacy typography & styling inventory (Story 8.1)** section lists each **template/area**, **legacy fonts/CSS sources**, **current Astro state**, **gap summary**, and **recommended fix** (`global-token` | `component-css` | `n/a`)  
**And** each route table row gains **Visual parity** (`same` / `simplified` / `removed` / `n/a`) defaulting to **`same`** where legacy used brand fonts or shared palette  
**And** known gaps are documented (e.g. no `site/src/styles/`; BaseLayout loads no fonts; header lacks MFred/glitch; blog teasers lack Montserrat)

**Maps to:** FR22 prep; Architecture §12; ADR-005.

---

### Story 8.2: Global design tokens and font loading

As a **visitor**,  
I want **body and heading typography to match the legacy site**,  
So that **FR22** brand recognition holds across routes.

**Acceptance criteria:**

**Given** Story 8.1 inventory approving global tokens  
**When** `site/` implements shared styles (e.g. `site/src/styles/global.css` or equivalent) wired from `BaseLayout.astro`  
**Then** **Questrial** (or documented equivalent) applies to body text and **MFred** (self-hosted from migrated `src/assets/fonts/mfred/`) applies to `h1`–`h6` and brand lockup per inventory  
**And** legacy page background **`#fbf9f3`** and primary text **`#323846`** / accent **`#b7c8cb`** are available as CSS variables used by templates  
**And** font loading follows **NFR-V1** (`font-display: swap`, preload/subset strategy documented in `site/README.md`)  
**And** gate quartet from `site/` still passes

**Maps to:** FR22, NFR-V1, UX-DR5; ADR-005.

---

### Story 8.3: Per-template visual reconciliation and sign-off

As a **visitor**,  
I want **each primary template to look like the legacy site**, not only read the same copy,  
So that **FR22** is satisfied route by route.

**Acceptance criteria:**

**Given** global tokens from Story 8.2 and inventory **`component-css`** / **`layout-css`** rows  
**When** templates are updated by porting legacy **styled-components** rules into scoped Astro `<style>` (or shared `site/src/styles/home.css` if DRY)  
**Then** **home** matches legacy presentation for: hero link position/size; about **girl.jpg** at **32vw** fixed/absolute positioning and **6vw** intro copy with legacy padding; works cards **~600×900** cover crops with overflow clip and MFred rotated titles; contact **MFred** display scale (**400px** month/year class)  
**And** blog teasers, CV sections, project hero, header brand, and 404 match inventory **`same`** rows  
**And** side-by-side smoke (legacy build or screenshots vs `site` dev) documented for **home `/`** in Dev Agent Record  
**And** checklist **Visual parity** and **Sign-off** columns updated; mandatory rows signed before cutover  
**And** no horizontal scroll regression on FR15 smoke routes

**Maps to:** FR22, FR15, UX-DR4–5; ADR-005.

---

## Epic 9: Legacy codebase retirement and production cutover

**Goal:** **`site/`** build is the **default production outcome**; legacy Gatsby at repo root is **not** a second deploy path.

### Story 9.1: Document `site/` as sole production application

As a **maintainer**,  
I want **docs and README** to state clearly that production is **`site/`** + **deploy-astro-pages.yml**,  
So that **FR18** and **FR23** intent is obvious to future me and contributors.

**Acceptance criteria:**

**Given** PRD **v1.2**  
**When** docs are updated (`docs/deployment-guide.md`, `docs/project-overview.md`, root `README.md`, `site/README.md`)  
**Then** **GitHub Pages** source is documented as **GitHub Actions** (Astro workflow), not branch deploy from Gatsby  
**And** entry commands for production are **`cd site && npm run dev|build`** only  
**And** legacy `npm run deploy` is marked **deprecated** or removed from primary instructions  

**Maps to:** FR18, FR23, NFR-R2.

---

### Story 9.2: Archive or remove legacy Gatsby application tree

As a **maintainer**,  
I want **repo-root Gatsby** (`gatsby-config.js`, `gatsby-node.js`, legacy `src/`, root `package.json` scripts) retired,  
So that **only `site/`** remains the maintained app.

**Acceptance criteria:**

**Given** content and assets already migrated under **`site/`**  
**When** legacy tree is archived to **`legacy/gatsby/`** (preferred) or removed after a **git tag** snapshot  
**Then** root **`package.json`** no longer exposes **`gatsby build`** / **`gh-pages`** as the default deploy story  
**And** `docs/index.md` points maintainers to **`site/`**  
**And** gate quartet from **`site/`** still passes  

**Maps to:** FR23, NFR-R2.

---

### Story 9.3: Confirm GitHub Pages and CI default to Astro artifact

As a **maintainer**,  
I want **hosting settings** aligned with the Astro workflow,  
So that **every push to `main`** publishes **`site/dist`** (or workflow artifact), not legacy **`gh-pages`** from Gatsby.

**Acceptance criteria:**

**Given** `.github/workflows/deploy-astro-pages.yml` exists  
**When** cutover checklist is completed  
**Then** repository **Settings → Pages → Build and deployment** uses **GitHub Actions** (documented in deployment guide)  
**And** optional: disable or document sunset of **`gh-pages`** branch from legacy deploy  
**And** production URL serves Astro build (smoke: home, blog, cv return expected content)  

**Maps to:** FR18, FR23.

---

### Story 9.4: Repo hygiene after legacy removal

As a **maintainer**,  
I want **duplicate legacy assets** and stale references cleaned up,  
So that the repo reflects a single product.

**Acceptance criteria:**

**Given** Story **9.2** archive/remove  
**When** hygiene pass runs  
**Then** duplicate icon/font trees at repo root (if redundant with `site/`) are pruned or documented as archive-only  
**And** `docs/source-tree-analysis.md` (or equivalent) notes **`site/`** as application root  
**And** no CI workflow still builds Gatsby on **`main`** unless explicitly quarantined to a non-default branch  

**Maps to:** FR23, NFR-R2.

---

## Final validation (Step 4)

| Check | Result |
|--------|--------|
| **FR coverage** | FR1–FR23 each appear in ≥ one story AC scope (FR23 → Epic 9). |
| **NFR coverage** | NFR-P1/P2 reference in 1.5 only (advisory); NFR-V1 in 8.2; R1/R2 in 1.1/1.4/9.x; S1/S2 in 6.5; A1 in 3.2, 3.7, 8.3. |
| **Architecture** | ADRs reflected in Epics 1–2, 5–7; routing in 4–5; CI in 1. |
| **Story dependencies** | Stories only rely on earlier stories or prior epics (E2 needs E1 CI optionally—E2.4 extends E1.3). |
| **Starter template** | Covered by Story 1.1 (create Astro project per Architecture). |

**Recommendation:** Run **`[IR] Check Implementation Readiness`** after team review of epic order (some teams run **Epic 6** SEO partially earlier—acceptable if stories stay independent).

---

_Workflow **[CE]** steps 1–4 completed in one artifact for Agent implementation._
