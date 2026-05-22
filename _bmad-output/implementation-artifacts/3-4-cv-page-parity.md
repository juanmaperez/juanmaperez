# Story 3.4: CV page parity

**Story ID:** 3.4  
**Story key:** `3-4-cv-page-parity`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 3.1 (`BaseLayout.astro`), Story 3.2 (`SiteHeader`, `siteConfig.nav`), Story 3.3 (home links to `/cv` — this story makes that route resolve)  
**Followed by:** Story 3.5 (404), Story 3.7 (responsive/a11y smoke includes CV), Story 6.1 (per-page SEO from data)

---

## Story

As a **visitor**,  
I want **the CV page** with the same section structure as legacy,  
So that **FR2** is satisfied.

---

## Acceptance criteria (from epics)

1. **Given** CV content available at build time (structured data — see [Content source](#content-source))  
   **When** `/cv` loads (Astro route `site/src/pages/cv.astro`)  
   **Then** the page renders **five sections** in this **DOM order**, matching legacy `src/pages/cv.js`:
   - **Personal** — portrait, name, role, email, phone, site URL
   - **Summary** — professional summary text (legacy `Description`; static, no typewriter)
   - **Work experience** — all **active** legacy roles (Sainsbury's Tech, Colossus Bets, Crealogix; **exclude** commented-out InboundCycle block)
   - **Education** — Iron Hack + CEI entries
   - **Skills** — four bullet items

2. **Given** the page uses `BaseLayout`  
   **When** HTML is inspected  
   **Then** exactly **one** `<h1>` exists inside `<main>` (Story 3.1 policy), each major block after personal is a `<section>` with an **`h2`** section title (`Work Experience`, `Education`, `Skills`), and heading levels do not skip.

3. **Given** Story 3.3 linked to `/cv` and global nav is updated in this story  
   **When** a visitor is on `/cv`  
   **Then** `siteConfig.nav` includes `{ label: 'CV', href: '/cv' }` and `SiteHeader` marks it with `aria-current="page"`; the home “Read more” link and CV nav entry both resolve without 404.

4. **Given** legacy SEO for the CV route  
   **When** `/cv` is built  
   **Then** `BaseLayout` receives `title="Juanma Perez | CV"` and `description="Personal Website by Juanma Perez. I'm Juanma Perez and here you can find my update resume."` (legacy `cv.js` strings — preserve “update” typo).

5. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; `dist/cv/index.html` **or** `dist/cv.html` exists (depends on Astro trailing-slash build output — document actual path in completion notes).

6. **Given** viewport **≥ 320px** and **print** preview  
   **When** `/cv` is inspected  
   **Then** content is readable without horizontal scroll (UX-DR4 / FR15), and `@media print` rules keep text contrast and avoid clipping the main column (epics: “print/readability no worse than legacy on smoke devices”).

---

## Tasks / subtasks

- [x] **Add `site/src/data/cv.ts`** (AC1) — Single typed source of truth (epics allow structured data). Export `cvData` with nested objects for `personal`, `summary` (string or `string[]`), `experiences[]`, `education[]`, `skills[]`. **Copy strings verbatim** from legacy components (see [Legacy content inventory](#legacy-content-inventory)). Example shape:
  ```ts
  // site/src/data/cv.ts
  export const cvData = {
    personal: {
      name: 'Juanma Perez',
      role: 'Software Engineer',
      email: 'juanmaperezvar@gmail.com',
      phone: '07447 881 161',
      website: 'https://juanmaperez.dev',
      image: '/images/cv/juanma_perez.jpg',
    },
    summary: [
      'Results-oriented software engineer with 6 years experience with the most advanced technologies in development.',
      "I'm focused on improving UX and product interfaces through finding the best approach to interactions.",
      'Code efficiency is a central feature of my work, as past projects have involved managing large amounts of data.',
    ],
    experiences: [ /* 3 roles — see inventory */ ],
    education: [ /* 2 entries */ ],
    skills: [ /* 4 strings */ ],
  } as const;
  export type CvData = typeof cvData;
  ```

- [x] **Copy portrait asset** (AC1) — `src/assets/images/juanma_perez.jpg` → `site/public/images/cv/juanma_perez.jpg`. Use `<img src="/images/cv/juanma_perez.jpg" alt="Juanma Perez" width="200" height="200">` (UX-DR3). Circular crop via scoped CSS (`border-radius: 50%`), not background-image div.

- [x] **Create `site/src/components/cv/` section components** (AC1, AC2) — Mirror architecture §9 naming:
  - `CvPersonal.astro` — imports `cvData.personal`; **do not** emit `<h1>` here if page owns it
  - `CvSummary.astro` — maps `summary` to `<p>` elements inside `<section aria-labelledby="cv-summary">`
  - `CvExperiences.astro` — `<section>` + `<h2>Work Experience</h2>` + list of roles
  - `CvEducation.astro` — `<section>` + `<h2>Education</h2>`
  - `CvSkills.astro` — `<section>` + `<h2>Skills</h2>` + `<ul>`

- [x] **Create `site/src/pages/cv.astro`** (AC1–AC4) — Orchestrator:
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro';
  import CvPersonal from '../components/cv/CvPersonal.astro';
  import CvSummary from '../components/cv/CvSummary.astro';
  import CvExperiences from '../components/cv/CvExperiences.astro';
  import CvEducation from '../components/cv/CvEducation.astro';
  import CvSkills from '../components/cv/CvSkills.astro';
  ---
  <BaseLayout
    title="Juanma Perez | CV"
    description="Personal Website by Juanma Perez. I'm Juanma Perez and here you can find my update resume."
  >
    <div class="cv-page">
      <div class="cv-container">
        <h1>Juanma Perez</h1>
        <CvPersonal />
        <CvSummary />
        <CvExperiences />
        <CvEducation />
        <CvSkills />
      </div>
    </div>
  </BaseLayout>
  ```
  - Legacy `Personal` used `<h4>`/`<h5>` for name/role — **replace** with styled `<p>`/`<span>` under the page `<h1>` to satisfy one-`h1` policy while keeping visual hierarchy via CSS.
  - Scoped layout CSS: `background: #fbf9f3`, centered column `max-width: 1000px`, `width: min(60%, 100%)`, vertical padding ~`120px 0`, `box-sizing: border-box` (legacy `CvPageWrapper` intent without `100vw` overflow).

- [x] **Enable CV in `siteConfig.nav`** (AC3) — Uncomment/add in `site/src/site.config.ts`:
  ```ts
  { label: 'CV', href: '/cv' },
  ```
  Place after Blog (or between Home and Blog — match logical order: Home, CV, Blog). Verify `SiteHeader` `isCurrent('/cv')` matches `/cv` and `/cv/`.

- [x] **Motion / islands** (AC1) — **No** `client:*`, react-spring, typewriter `setInterval`, or staggered reveal gates. All sections visible on first paint. Update `docs/migration-parity-checklist.md` **CV** row: Motion parity = **`removed`**, Islands = **N**, note static summary replaces typewriter.

- [x] **Print styles** (AC6) — In `cv.astro` (or a dedicated scoped block), add minimal `@media print`:
  - Hide non-essential chrome if any (header may remain for continuity — OK to keep)
  - `background: white`, `color: black` on `.cv-container`
  - Avoid `overflow: hidden` on sections
  - Ensure multi-page print does not clip bullet lists

- [x] **Validation gates** (AC5) — From `site/`:
  ```bash
  cd site
  npm run check
  npm run build
  npm run test:schema
  ```
  Spot-check built CV page:
  ```bash
  find dist -name '*cv*' -type f
  grep -c '<h1' dist/**/cv* 2>/dev/null || grep -c '<h1' dist/cv.html
  grep -c 'Work Experience' dist/**/cv*
  grep -c 'Education' dist/**/cv*
  grep -c 'Skills' dist/**/cv*
  ```

- [x] **Manual smoke** (AC3, AC6) — From `/cv`: CV nav has `aria-current="page"`; Tab reaches all links; 320px width no horizontal scroll; print preview readable.

- [x] **Do not** add content collection for CV, PDF download, JSON-LD resume schema, or Epic 7 animations.

### Review Findings

_Generated by `code-review` workflow on 2026-05-22. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (2) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] Visible duplicate “Juanma Perez” (`<h1>` + `.cv-personal__name`) — legacy `Personal` used `<h4>` beside photo; page `<h1>` satisfies Story 3.1; tune in **3.7** smoke if SR noise matters.
- [x] [Review][Defer] `/blog` still 404 until **4.1** — unchanged.

**Dismissed** (9):
- AC1 five regions + verbatim copy (3 jobs, 2 education, 4 skills; InboundCycle omitted) — **pass**.
- AC2 one `<h1>` in `<main>`; visible `h2` on Work/Education/Skills; Summary `h2` visually-hidden + `aria-labelledby` — **pass**; Personal as `<div>` matches legacy (AC2 scopes `<section>` to blocks after personal).
- AC3 `siteConfig.nav` CV; `aria-current="page"` on `/cv` in `dist/cv/index.html` — **pass**.
- AC4 legacy `title` / `description` (“update resume”) — **pass**.
- AC5 `check` / `build` / `test:schema` → 0; output `dist/cv/index.html` — **pass**.
- AC6 `min(60%,100%)` column, `overflow-x: hidden`, `@media print` white/black — **pass**.
- `mailto:` + external `rel`/`target` on email/website — story §Edge cases allows.
- Nav order Home → CV → Blog — task-allowed.
- No `client:*` / typewriter / react-spring — **pass**.

---

## Legacy content inventory

**Personal** (`personal.js`):
- Name: Juanma Perez
- Role: Software Engineer
- Email: juanmaperezvar@gmail.com (plain text in legacy — optional `mailto:` enhancement is OK if `href` matches same address)
- Phone: 07447 881 161
- Website: https://juanmaperez.dev

**Summary** (`description.js` — render as **three** `<p>`, not typewriter):
1. Results-oriented software engineer with 6 years experience with the most advanced technologies in development.
2. I'm focused on improving UX and product interfaces through finding the best approach to interactions.
3. Code efficiency is a central feature of my work, as past projects have involved managing large amounts of data.

**Work experience** (`experiences.js` — **3** roles only):

| Company | Role | Dates | Bullets |
|---------|------|-------|---------|
| Sainsbury's Tech | Software Engineer | 01/2020 \| nowadays | 7 bullets (React, Redux, TS, Hooks, Jest, NextJS, Go, pairing, GraphQL, Apollo, GatsbyJS y Prisma, CI/CD SCRUM) |
| Colossus Bets | Senior Front End Engineer | 06/2018 \| 01/2020 | 9 bullets |
| Crealogix | Front End Engineer | 11/2017 \| 06/2018 | 6 bullets |

Preserve legacy wording including “nowadays”, “GatsbyJS y Prisma”, “Responsible of pairing”.

**Education** (`education.js`):
1. **Software Development MEAM/MERN stack** | Iron Hack — NodeJs \| Angular \| React \| …
2. **Web Development** | CEI — HTML5 \| CSS3 \| Javascript \| …

**Skills** (`skills.js`):
- Animations with GreenSock, React-Spring and React-transitions
- Problem Solving and bug fixing
- Functional Programming
- UI implementations and UX focus

---

## Content source

| Option | Decision |
|--------|----------|
| Markdown collection | **No** — CV is structured résumé data, not long-form body; no legacy markdown source. |
| **`site/src/data/cv.ts`** | **Yes** — importable from `.astro` and future tests; mirrors component boundaries. |
| Inline in components | **No** — duplicates strings across five files. |

---

## Link and route inventory

| Consumer | href | After this story |
|----------|------|------------------|
| `siteConfig.nav` CV | `/cv` | ✅ resolves |
| Home `HomeAbout` “Read more” | `/cv` | ✅ resolves |
| Legacy public URL | `/cv/` | Astro may emit `/cv`; if trailing slash mismatch matters, note for **Story 6.3** redirects — not blocking FR2 for MVP |

---

## Dev notes

### Architecture compliance

- **§5.1 Routing** — `src/pages/cv.astro` → `/cv`. [architecture.md §5.1](../planning-artifacts/architecture.md)
- **§9 Project structure** — Components under `src/components/cv/`. [architecture.md §9](../planning-artifacts/architecture.md)
- **§8 Islands** — Legacy CV uses react-spring enter animations and typewriter `setInterval`. **Removed** for MVP; Epic 7 only if checklist approves. [architecture.md §8](../planning-artifacts/architecture.md)

### PRD / UX requirements

- **FR2** — Sections: personal, summary, skills, experience, education (epics order lists skills last; legacy DOM order is personal → summary → experience → education → skills — **follow legacy DOM order** for parity). [prd.md FR2](../planning-artifacts/prd.md)
- **FR7** — CV discoverable via header after nav entry enabled. [prd.md FR7](../planning-artifacts/prd.md)
- **UX-DR2** — Semantic sections + one `h1`.
- **UX-DR3** — Portrait `alt` text.
- **UX-DR4 / FR15** — No horizontal scroll; constrained column width.
- **UX-DR5** — `:focus-visible` on any links added in CV body (mailto optional).

### Story 3.3 intelligence

- Home **already links** to `/cv` — completing this story fixes the 404 called out in 3.3 edge cases. [3-3-home-page-content-and-layout-parity.md](./3-3-home-page-content-and-layout-parity.md)
- **Do not** change home components except if a broken relative path is found.
- Shared palette: legacy CV background `#fbf9f3`, accent `#B7C8Cb` — reuse in scoped CSS for section borders under `h2`.

### Story 3.2 intelligence

- `siteConfig.nav` CV line is **commented** with `// CV lands when 3.4` — **this story uncomments it**. [site/src/site.config.ts](../../site/src/site.config.ts)
- After adding CV, `npm run check` should still pass; nav array grows to 3 entries (Home, Blog, CV — order per task).

### Legacy parity (do **NOT** copy mechanics)

| Legacy | Astro MVP |
|--------|-----------|
| react-spring slide-in on personal | Static layout |
| Typewriter summary + `ready()` callback gating later sections | Full static render immediately |
| `visible` prop hiding experience/education/skills until typewriter done | All sections always visible |
| `h4`/`h5` in personal block | Page `<h1>` + styled text for role |
| Background-image div for photo | `<img>` + CSS `border-radius` |
| Commented InboundCycle job | Omitted |

### File structure (target)

```
site/
├── public/images/cv/juanma_perez.jpg   # NEW
├── src/
│   ├── data/cv.ts                      # NEW
│   ├── components/cv/                  # NEW
│   │   ├── CvPersonal.astro
│   │   ├── CvSummary.astro
│   │   ├── CvExperiences.astro
│   │   ├── CvEducation.astro
│   │   └── CvSkills.astro
│   ├── pages/cv.astro                  # NEW
│   └── site.config.ts                  # MODIFIED — nav CV entry
docs/migration-parity-checklist.md       # MODIFIED — CV motion row
```

### Guardrails

1. **No** `client:*`, react-spring, or typewriter JS.
2. **No** global CSS / Tailwind / MFred font loading.
3. **No** `content.config.ts` changes or new Astro collections.
4. **No** PDF export, download button, or schema.org JobPosting.
5. **Do not** include InboundCycle experience (legacy commented out).
6. **Do not** “update” résumé copy, dates, or employer names — parity only.
7. **Do not** scaffold 404, blog, or project routes.
8. **Do not** add unit test framework — gates + manual smoke suffice.
9. **Do not** edit legacy `src/pages/cv.js` or `src/components/cv/*`.
10. **One `<h1>` only** — not in `SiteHeader`, not duplicated in `CvPersonal`.

### Edge cases

- **`/blog` still 404** until 4.1 — unchanged.
- **Phone/email as plain text vs links** — legacy shows plain `<p>`; `mailto:` on email is a small a11y win if added without changing visible text.
- **`nowadays` date string** — keep literal; do not substitute “Present” unless product owner requests (out of parity scope).
- **Build output path** — Astro 6 static may emit `dist/cv/index.html`; grep/find in completion notes.
- **`aria-current` on `/cv/`** — `isCurrent` helper uses `startsWith(href + '/')`; verify trailing-slash config does not break match.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Confirm dist contains CV HTML with 1× h1 and 3× h2 section titles
# Manual: nav CV link, home Read more, 320px width, print preview
```

---

## References

- [Epics — Story 3.4](../planning-artifacts/epics.md)
- [PRD — FR2, FR7, FR15](../planning-artifacts/prd.md)
- [Architecture §5, §8, §9](../planning-artifacts/architecture.md)
- [Story 3.1 — BaseLayout / heading policy](./3-1-base-layout-and-document-shell.md)
- [Story 3.2 — SiteHeader / nav](./3-2-global-header-and-navigation.md)
- [Story 3.3 — Home `/cv` link](./3-3-home-page-content-and-layout-parity.md)
- [Migration parity checklist — CV row](../../docs/migration-parity-checklist.md)
- [Legacy: `src/pages/cv.js`](../../src/pages/cv.js), [`src/components/cv/*`](../../src/components/cv/)
- [Component inventory — CV](../../docs/component-inventory.md)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer.

### Debug log references

- Node 22.12.0; `astro check` → **20 files**, 0/0/0; build → **2 pages**.
- Output path: `dist/cv/index.html` (not `dist/cv.html`).

### Completion notes list

- **`site/src/data/cv.ts`** — personal, summary (3×p), 3 experiences, 2 education, 4 skills; verbatim legacy strings.
- **`site/src/components/cv/`** — CvPersonal (img + role + mailto/website links), CvSummary, CvExperiences, CvEducation, CvSkills.
- **`site/src/pages/cv.astro`** — BaseLayout SEO strings; one visible `<h1>`; print `@media` rules.
- **`site/public/images/cv/juanma_perez.jpg`** — portrait.
- **`site/src/site.config.ts`** — nav: Home, CV, Blog; `/cv` resolves; `aria-current` on CV nav.
- **`docs/migration-parity-checklist.md`** — CV motion `removed`.
- Gates green; `/blog` still 404 until 4.1.

### File list

**Added:**
- `site/src/data/cv.ts`
- `site/public/images/cv/juanma_perez.jpg`
- `site/src/components/cv/CvPersonal.astro`
- `site/src/components/cv/CvSummary.astro`
- `site/src/components/cv/CvExperiences.astro`
- `site/src/components/cv/CvEducation.astro`
- `site/src/components/cv/CvSkills.astro`
- `site/src/pages/cv.astro`

**Modified:**
- `site/src/site.config.ts` — CV nav entry
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-4` → `review`
- `_bmad-output/implementation-artifacts/3-4-cv-page-parity.md` (this file)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Story drafted (ready-for-dev). FR2 five-section parity, `cv.ts` data module, legacy verbatim inventory (3 jobs, 2 education, 4 skills), static HTML (no typewriter/spring), nav CV enablement, print + responsive AC, 3.3 `/cv` link resolution, 10 guardrails. | bmad-create-story |
| 2026-05-22 | CV route + data + components; nav CV; gates green. | Amelia |
| 2026-05-22 | Code review: clean (0 patch, 2 defer); status → done. | Amelia (review) |
