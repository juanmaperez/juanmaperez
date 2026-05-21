# Story 3.3: Home page content and layout parity

**Story ID:** 3.3  
**Story key:** `3-3-home-page-content-and-layout-parity`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 3.1 (`BaseLayout.astro`, `site.config.ts`), Story 3.2 (`SiteHeader` via layout), Stories 2.2–2.3 (migrated `posts` + `projects` collections)  
**Followed by:** Story 3.4 (CV route makes `/cv` link resolve), Story 3.6 (contact path may extend home contact block), Epic 4.1 (`/blog` route), Epic 5.1 (project detail routes)

---

## Story

As a **visitor**,  
I want **the home page** to reflect identity, work teasers, and paths to blog and CV,  
So that **FR1** is satisfied.

---

## Acceptance criteria (from epics)

1. **Given** migrated `projects` collection data (Epic 2)  
   **When** `/` loads  
   **Then** the page presents **four primary content regions** matching legacy intent (static HTML, no animation gate):
   - **Hero** — identity/social entry point with outbound social links and a prominent link to the blog index (`/blog`).
   - **About** — substantive intro copy and a **“Read more”** link to `/cv`.
   - **Works** — teasers for **all five** migrated projects (title, thumbnail, link using each entry’s `path` frontmatter), sorted **newest `date` first** (legacy GraphQL used `order: DESC`).
   - **Contact** — freelance availability copy, `mailto:` primary contact, and secondary links (social + blog) mirroring legacy `ContactBlock` substance.

2. **Given** the page is rendered through `BaseLayout`  
   **When** `/` is inspected  
   **Then** exactly **one** `<h1>` exists inside `<main>` (Story 3.1 heading policy), section headings use logical order (`h2`+), and each major region is a `<section>` with an accessible name (`aria-labelledby` pointing at its `h2`, or an `h2` inside the section).

3. **Given** outbound and internal links on the home page  
   **When** a visitor activates them  
   **Then**:
   - Blog paths use `href="/blog"` (consistent with `siteConfig.nav` and legacy `MainBlock` / `ContactBlock`).
   - CV path uses `href="/cv"` (legacy `AboutBlock` “Read more”).
   - Project teasers use each collection entry’s `data.path` (e.g. `/projects/umaicha`, `/projects/colossus-bets`).
   - External links use `rel="noopener noreferrer"` and `target="_blank"` where they open a new browsing context (social, mailto behavior unchanged).

4. **Given** hero/about imagery from the legacy site  
   **When** `/` loads  
   **Then** hero and about sections include the legacy images (`first.jpg`, `second.jpg` hero backgrounds; `girl.jpg` in about) served from `site/public/` (or equivalent static path), with **non-empty `alt` text** on meaningful images (UX-DR3). Thumbnails for project cards resolve at build time without `client:*` JS (see [Project thumbnails](#project-thumbnails)).

5. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0** (Story 2.4 CI gate unchanged).

6. **Given** viewport width **≥ 320px**  
   **When** `/` is inspected  
   **Then** the home sections do not introduce **horizontal scroll** on the page (UX-DR4 / FR15). Scoped CSS may stack/wrap; no `100vw` overflow tricks without `overflow-x` containment.

---

## Tasks / subtasks

- [x] **Copy legacy home imagery into Astro `public/`** (AC4) — Copy from repo-root `src/assets/images/` → `site/public/images/home/`:
  - `first.jpg`, `second.jpg` (hero backgrounds — legacy `MainBlock` alternation becomes a **static** presentation; pick one hero image or a simple CSS crossfade-free single background for MVP).
  - `girl.jpg` (about section portrait).
  - Do **not** copy unused assets (`404.jpg`, `juanma_perez.jpg`, `icon.png`) in this story.

- [x] **Create home section components under `site/src/components/home/`** (AC1, AC2, AC6) — Architecture §9 target. Suggested split (adjust names if clearer, keep under `home/`):
  - `HomeHero.astro` — hero region + social list + blog link (legacy `MainBlock` content, **no** GSAP/cookie gate).
  - `HomeAbout.astro` — about copy + portrait + `/cv` link (legacy `AboutBlock` paragraphs verbatim — preserve typos like “perfomance”).
  - `HomeWorks.astro` — loads projects, renders teaser grid/list (legacy `WorksBlock` + `WorkItem` structure simplified).
  - `HomeContact.astro` — contact copy + mailto + social/blog links (legacy `ContactBlock` copy; static month/year text is fine).

- [x] **Wire `index.astro` as orchestrator** (AC1–AC4) — Replace placeholder migration copy in `site/src/pages/index.astro`:
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro';
  import HomeHero from '../components/home/HomeHero.astro';
  import HomeAbout from '../components/home/HomeAbout.astro';
  import HomeWorks from '../components/home/HomeWorks.astro';
  import HomeContact from '../components/home/HomeContact.astro';
  ---
  <BaseLayout
    title="Juanma Perez | Home"
    description="Personal website by Juanma Perez, I'm Juanma Perez, a software engineer from Seville working at Cazoo."
  >
    <h1>Juanma Perez</h1>
    <HomeHero />
    <HomeAbout />
    <HomeWorks />
    <HomeContact />
  </BaseLayout>
  ```
  - Keep **one** `<h1>` in the page (not inside child components). Child sections use **`h2`** for region titles.
  - Passing SEO strings satisfies future **FR10** seam without Story 6.1 components.

- [x] **Load projects in `HomeWorks.astro` via `astro:content`** (AC1) — Pattern:
  ```astro
  ---
  import { getCollection } from 'astro:content';

  const projects = (await getCollection('projects')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  ---
  ```
  - Render **all five** entries; legacy grouped by `frontmatter.type` but every migrated project uses `type: projects`, so one section titled **“projects”** (or “Work”) is correct.
  - Each teaser links to `{project.data.path}` with visible `{project.data.title}`.

- [x] **Project thumbnails** (AC1, AC4) — Thumbnails live beside markdown (`./principal.png`, `./umaicha.png`). Until Epic 5 `<Image>` pipeline, resolve at build time with **`import.meta.glob`** (eager) for `site/src/content/projects/**/*.{png,jpg}` and map `entry.data.thumbnail` (e.g. `./umaicha.png`) to the matching file. Example approach:
  ```ts
  const thumbModules = import.meta.glob<{ default: { src: string } }>(
    '/src/content/projects/**/*.{png,jpg}',
    { eager: true },
  );
  function resolveThumb(entryId: string, thumbnail: string): string | undefined {
    const needle = thumbnail.replace('./', '');
    const key = Object.keys(thumbModules).find((k) => k.endsWith(needle));
    return key ? thumbModules[key].default.src : undefined;
  }
  ```
  - If `resolveThumb` fails, render title-only teaser and note in completion notes (should not happen for migrated set).
  - Add `alt={project.data.title}` on `<img>` (UX-DR3).

- [x] **Legacy copy inventory (do not “improve” prose)** (AC1) — Source of truth: legacy React components.

  **Hero social + blog** (`src/components/index/main-block.js` render):
  - Instagram → `https://www.instagram.com/finejavascript/` (label legacy: `@encapsulated.io`)
  - Twitter → `https://twitter.com/juanmaperezvar`
  - LinkedIn → `https://www.linkedin.com/in/juanmaperezvargas/`
  - Blog → `/blog` (legacy `//blog` label acceptable)

  **About paragraphs** (`about-block.js`):
  1. I'm **Juanma Perez**, a web developer from Seville and based in London.
  2. I build blazing fast and high perfomance websites or apps based on the most modern technologies.
  3. I love Javascript and all the frameworks related to this language such as React, Angular or Vue.
  4. As a freelance I work with companies, agencies, startups and individuals all around the world.
  5. **Read more.** → `/cv`

  **Contact** (`contact-block.js`):
  - I'm available for freelance works.
  - Say hello → `mailto:juanmaperezvar@gmail.com`
  - Footer links: LinkedIn, Instagram (`encapsulated.io`), Twitter, Blog (`/blog`)
  - Decorative date display (`Sep` / `'21`) optional static text — no JS-driven clock.

- [x] **Motion / islands guardrail** (AC1) — **No** `client:*` directives, **no** GSAP, ScrollMagic, cookie `animationCompleted` gate, or scroll listeners. All sections render immediately in HTML. Update `docs/migration-parity-checklist.md` **Home** row: Motion parity = **`removed`** (or `simplified` if team documents static hero), Islands = **N**.

- [x] **Scoped CSS only** (AC6) — Style inside each `home/*.astro` `<style>` block (mirror `SiteHeader` pattern). No global stylesheet, Tailwind, or design-token system. Use `box-sizing: border-box`, `max-width: 100%`, avoid naked `width: 100vw` without overflow control.

- [x] **Validation gates** (AC5) — From `site/`:
  ```bash
  cd site
  npm run check
  npm run build
  npm run test:schema
  ```
  Spot-check `dist/index.html`:
  ```bash
  grep -c '<h1' dist/index.html          # → 1
  grep -c '<main' dist/index.html       # → 1
  grep -c 'href="/blog"' dist/index.html # → ≥1
  grep -c 'href="/cv"' dist/index.html   # → ≥1
  grep -c 'href="/projects/' dist/index.html # → 5
  ```

- [x] **Manual smoke** (AC3, AC6) — At 320px and desktop widths: no horizontal scroll; Tab order reaches hero links → about → project links → contact; `:focus-visible` inherits global header behavior on nav (header is outside `<main>`).

- [x] **Do not** add blog index route, CV page, project detail routes, footer slot content, hamburger nav, or Epic 7 animation — owned by Stories 4.1, 3.4, 5.1, 3.6, 7.x respectively.

### Review Findings

_Generated by `code-review` workflow on 2026-05-21. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (1 — resolved):
- [x] [Review][Patch] `resolveThumb()` matches first `principal.png` globally — fixed: scope by `project.id` folder + thumbnail filename [`site/src/components/home/HomeWorks.astro:10-18`]

**Deferred** (3) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] `/blog`, `/cv`, `/projects/*` 404 until Stories 4.1 / 3.4 / 5.1 — documented in story §Edge cases.
- [x] [Review][Defer] `second.jpg` copied to `public/images/home/` but unused (hero uses `first.jpg` only) — task allowed single static hero; optional CSS use later.
- [x] [Review][Defer] Large project PNGs (~13 MB) bundled via glob — Epic 5 image pipeline / LCP (Story 2.3 review carryover).

**Dismissed** (8):
- AC1 four regions + legacy copy — **pass** (hero/about/works/contact present).
- AC2 one `<h1>`, sections + `h2`/`aria-labelledby` — **pass** (4 `<section>` in build output).
- AC3 link policy — **pass** (external `rel`+`target`; internal paths correct).
- AC4 `girl.jpg` + hero `first.jpg` + thumbnails present — **pass** modulo wrong principal mapping (patch above).
- AC5 gates — **pass** (`check`/`build`/`test:schema` 0).
- AC6 no `100vw` overflow pattern — **pass** (scoped `max-width: 100%`).
- Duplicate `.visually-hidden` in four components — acceptable per scoped-CSS guardrail.
- `grep -c` spot-check undercounts on minified HTML — use `grep -o … | wc -l` for occurrence counts.

---

## Link and route inventory

| Link | href | Resolves today? | Notes |
|------|------|-----------------|-------|
| Blog (hero/contact) | `/blog` | ❌ until **4.1** | Same intentional deferral as `siteConfig.nav` Blog entry |
| CV (“Read more”) | `/cv` | ❌ until **3.4** | Required by AC3; landing route is next story |
| Project teasers (×5) | `/projects/...` | ❌ until **5.1** | URLs must match `path` frontmatter now (FR21 at release) |
| Social / mailto | external / mailto | ✅ | |

---

## Dev notes

### Architecture compliance

- **§9 Project structure** — Home UI lives in `src/components/home/`; page orchestrator stays `src/pages/index.astro`. [architecture.md §9](../planning-artifacts/architecture.md)
- **§6 Content model** — `getCollection('projects')` replaces legacy `allMarkdownRemark(filter: { type: projects })`. Sort by `date` DESC. [architecture.md §6](../planning-artifacts/architecture.md)
- **§7 Gatsby mapping** — No GraphQL at runtime; build-time collection load only. [architecture.md §7](../planning-artifacts/architecture.md)
- **§8 Islands** — Legacy home used GSAP + ScrollMagic + cookie animation gate. **Out of scope** — static HTML for this story; Epic 7 revisits approved motion. [architecture.md §8](../planning-artifacts/architecture.md)
- **FR-to-design** — `FR1 → home template`; `FR20` primary contact is **Story 3.6**, but home **contact section** mirrors legacy and supports discoverability ahead of 3.6. [architecture.md FR table](../planning-artifacts/architecture.md)

### PRD / UX requirements

- **FR1** — Home summarizes identity, work, paths to blog and CV. [prd.md FR1](../planning-artifacts/prd.md)
- **FR13** — Optimized images deferred to **Story 5.2** / Epic 5; this story uses static `<img>` + glob-resolved URLs (document weight; migrated PNGs are large per Story 2.3 review).
- **FR15 / UX-DR4** — No horizontal scroll on standard breakpoints.
- **UX-DR2** — Semantic `<section>` + heading hierarchy; one `h1` in page.
- **UX-DR3** — Alt text on meaningful images (portrait + project thumbnails).
- **UX-DR5** — Inherit focus ring from `SiteHeader` for chrome; home links should include `:focus-visible` outline in scoped CSS (`currentColor` pattern OK).

### Story 3.1 / 3.2 intelligence (build on this)

- `BaseLayout` already wraps content in `<main>` and injects `SiteHeader` via header slot fallback. [3-1-base-layout-and-document-shell.md](./3-1-base-layout-and-document-shell.md)
- `index.astro` currently has placeholder `<h1>` + migration paragraph — **replace** body, keep single `h1`. [site/src/pages/index.astro](../../site/src/pages/index.astro)
- **Do not** add `<h1>` inside `SiteHeader` (3.2 policy). Brand remains `<a>` outside nav.
- `siteConfig.nav` has Home + Blog only; **do not** add CV to global nav here (3.4). Home page **may** link to `/cv` in about copy per AC3.
- Review note from 3.2: duplicate visible “Juanma Perez” (brand + page `h1`) is acceptable until this story lands real hero/about content — consider visually de-emphasizing `h1` or merging identity into hero while keeping exactly one `h1` in DOM.

### Epic 2 intelligence (content ready)

- **Five projects** under `site/src/content/projects/` with canonical paths — see [Story 2.3 path inventory](./2-3-migrate-project-case-study-markdown.md).
- **Nine posts** exist but **FR1 does not require** blog teasers on home — legacy home did not list posts. Optional “latest post” is **out of scope**.
- `npm run test:schema` must stay green — do not touch `content.config.ts` unless fixing an unrelated regression.

### Legacy parity (informational — do **NOT** copy mechanics)

| Legacy piece | MVP Astro choice |
|--------------|------------------|
| `animationCompleted` cookie gate hiding sections | **Removed** — all sections always visible |
| GSAP hero timeline + background swap | **Removed** — static hero image/CSS |
| ScrollMagic fade-in paragraphs | **Removed** — static text |
| `WorksBlock` per `type` key | Single section — all entries share `type: projects` |
| `WorkItem` 1000px scroll-pinned layout | Simplified card/list layout |
| `menuLink` scroll-to `#block-*` | **Not used** — route links only |

### File structure (target after implementation)

```
site/
├── public/
│   └── images/
│       └── home/              # NEW — first.jpg, second.jpg, girl.jpg
├── src/
│   ├── components/
│   │   ├── home/              # NEW
│   │   │   ├── HomeHero.astro
│   │   │   ├── HomeAbout.astro
│   │   │   ├── HomeWorks.astro
│   │   │   └── HomeContact.astro
│   │   └── nav/               # unchanged
│   └── pages/
│       └── index.astro        # MODIFIED — orchestrates home sections
docs/
└── migration-parity-checklist.md  # MODIFIED — Home row motion parity
```

### Guardrails (do **NOT** in this story)

1. **No** `client:*`, React islands, GSAP, ScrollMagic, or `document.cookie` animation gate.
2. **No** global CSS, Tailwind, or font-face loading (legacy `MFred` font is **not** required for FR1 MVP).
3. **No** `getCollection('posts')` blog teasers unless product owner expands scope (not in epics AC).
4. **No** new routes (`blog/`, `cv.astro`, `projects/[...slug]`) — link targets may 404 until downstream stories.
5. **No** changes to `siteConfig.nav` (CV nav entry still commented until 3.4).
6. **No** footer slot fill — 3.6 owns global contact path extension.
7. **No** `astro:assets` `<Image>` / `image()` schema changes — Epic 5.
8. **No** edits to legacy `src/` Gatsby tree.
9. **No** unit test framework — `astro check` + build + manual smoke suffice.
10. **Do not** rewrite marketing copy — parity means legacy strings, typos included.

### Edge cases

- **`/blog` and `/cv` 404 during Epic 3** — Document in completion notes (same pattern as 3.2 `/blog` nav). Not an FR21 release regression while routes are intentionally pending.
- **Project `href`s 404 until Epic 5** — URLs must still use `data.path` exactly (`/projects/colossus-bets` not folder name `colossus`).
- **Thumbnail glob miss** — If glob key fails, log in completion notes; fix path join before merge.
- **Large PNG weight** — Teasers may hurt LCP; note for Epic 5 optimization (NFR-P1 baseline comparison deferred until cutover).
- **Instagram URL mismatch** — Hero legacy uses `finejavascript`; contact uses `encapsulated.io` — **preserve both** as legacy did.
- **Single `h1` vs hero design** — If hero also displays name prominently, keep one `<h1>` in DOM; use CSS for visual hierarchy.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# HTML assertions on dist/index.html (see Tasks)
```

---

## References

- [Epics — Story 3.3](../planning-artifacts/epics.md)
- [PRD — FR1, FR13, FR15, FR20](../planning-artifacts/prd.md)
- [Architecture §6–9](../planning-artifacts/architecture.md)
- [Story 3.1 — BaseLayout](./3-1-base-layout-and-document-shell.md)
- [Story 3.2 — SiteHeader](./3-2-global-header-and-navigation.md)
- [Story 2.3 — Projects migration](./2-3-migrate-project-case-study-markdown.md)
- [Migration parity checklist — Home row](../../docs/migration-parity-checklist.md)
- [Legacy: `src/pages/index.js`](../../src/pages/index.js), [`src/components/index/*`](../../src/components/index/)
- [Astro: `getCollection`](https://docs.astro.build/en/guides/content-collections/#querying-collections)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer.

### Debug log references

- Node 22.12.0; `astro check` → **13 files**, 0/0/0.
- Thumbnail glob: all 5 resolve (`principal.png` hashed per Vite; `umaicha.png` distinct).
- Hero: single static background `first.jpg` (legacy dual-swap removed per AC1).

### Completion notes list

- **`site/public/images/home/`** — `first.jpg`, `second.jpg`, `girl.jpg` copied from legacy `src/assets/images/`.
- **`site/src/components/home/`** — `HomeHero`, `HomeAbout`, `HomeWorks`, `HomeContact` (server-only, scoped CSS, `:focus-visible`).
- **`site/src/pages/index.astro`** — orchestrator; one `<h1>`; `BaseLayout` title/description props for FR10 seam.
- **`HomeWorks.astro`** — `getCollection('projects')` sorted `date` DESC; 5 teasers with `data.path` + glob thumbnails.
- Legacy copy verbatim (typos: perfomance); Instagram URLs differ hero vs contact per legacy.
- **`docs/migration-parity-checklist.md`** — Home motion = `removed`, islands = N.
- Gates: `check` / `build` / `test:schema` → exit 0.
- `dist/index.html`: 1×`<h1>`, 4×`<section>`, `/blog`×2, `/cv`×1, `/projects/*`×5 (sainsburys → umaicha order).
- **404 deferrals:** `/blog` (4.1), `/cv` (3.4), project detail routes (5.1) — URLs correct now.

### File list

**Added:**
- `site/public/images/home/first.jpg`
- `site/public/images/home/second.jpg`
- `site/public/images/home/girl.jpg`
- `site/src/components/home/HomeHero.astro`
- `site/src/components/home/HomeAbout.astro`
- `site/src/components/home/HomeWorks.astro`
- `site/src/components/home/HomeContact.astro`

**Modified:**
- `site/src/pages/index.astro`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-3` → `review`
- `_bmad-output/implementation-artifacts/3-3-home-page-content-and-layout-parity.md` (this file)

**Unchanged (per guardrails):**
- `siteConfig.nav`, `BaseLayout`, content schemas, no routes, no client JS.

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Story drafted (ready-for-dev). Ultimate context engine: FR1/UX-DR2–4, architecture §6–9 home components, Epic 2 projects collection wiring, legacy Main/About/Works/Contact parity (static), 3.1/3.2 layout+nav integration, thumbnail glob pattern, explicit 404 deferrals for /blog /cv /projects routes, 10 guardrails (no JS/motion/global CSS). | bmad-create-story |
| 2026-05-21 | Home sections + imagery + index orchestrator; parity checklist; gates green. | Amelia |
| 2026-05-21 | Code review: 1 patch (`resolveThumb` principal.png collision), 3 defer; AC1–AC6 pass modulo thumbnails. | Amelia (review) |
| 2026-05-21 | Review patch: `resolveThumb(project.id, …)`; status → done. | Amelia (review) |
