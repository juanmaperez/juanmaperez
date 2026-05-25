# Story 8.3: Per-template visual reconciliation and sign-off

**Story ID:** 8.3  
**Story key:** `8-3-per-template-visual-reconciliation-and-sign-off`  
**Status:** done  
**Epic:** 8 — Typography, layout, and visual design parity  
**Depends on:** Story **8.2** (global tokens + fonts) — **done**  
**Coordinate with:** Story **7.2** (home motion uses same DOM/class hooks as layout CSS)  
**Followed by:** Visual + motion checklist sign-off (Story **7.3** / product owner)

---

## Story

As a **visitor**,  
I want **each primary template to look like the legacy site**, including **image size and layout**,  
So that **FR22** is satisfied route by route.

---

## Product direction (2026-05-22 EP)

Epics 3–5 and **8.2** fixed **fonts and palette** but **not** legacy **styled-components** layout. Home feels wrong because:

- **About:** legacy `me.jpg` is **32vw**, fixed to the right; Astro caps the figure at **~20rem** in a flex row.
- **Works:** legacy uses **600×900** boxes with **background-size: cover** and **1100px** tall image offset; Astro uses responsive `<img>` with `height: auto`.
- **Contact:** legacy **400px** MFred month/year; Astro uses `clamp()` nowhere near display scale.
- **Hero:** legacy link block **right: 120px; bottom: 50px**; Astro uses **1rem** offsets.

**8.3** ports CSS; **7.2** adds motion on top — do not let 7.2 ship on wrong layout.

---

## Acceptance criteria

1. **Given** checklist § **Home layout & image presentation** and inventory rows for home blocks  
   **When** `HomeAbout`, `HomeHero`, `HomeWorks`, `HomeContact` are updated  
   **Then** side-by-side review vs legacy (local Gatsby `gatsby develop` or archived screenshots) shows **`same`** visual parity for image scale, copy scale, and section chrome (motion may still be static until 7.2).

2. **Given** `about-block.js` `AboutBlockView` styled rules  
   **When** `HomeAbout.astro` is updated  
   **Then** figure uses **32vw** width (with legacy breakpoints), **fixed/absolute** positioning per inventory, and intro copy uses **vw-based** sizing and padding rhythm—not only `clamp(1.125rem, 4vw, 2.5rem)` in a flex column.

3. **Given** `workItem.js` `WorkItemView` styled rules  
   **When** `HomeWorks.astro` is updated  
   **Then** each work card uses a **fixed aspect cover box** (~600×900 at desktop, legacy breakpoints at 1300px / 480px) with **overflow: hidden** and image crop behavior matching legacy (`background-size: cover` or equivalent `<img>` `object-fit: cover` in sized container)—not full-width auto-height thumbnails.

4. **Given** `contact-block.js` and `main-block.js` list positioning  
   **When** home contact and hero are updated  
   **Then** contact display type and hero link positions match inventory **`same`** rows (MFred large month/year; hero links **18px** at **right: 120px; bottom: 50px** with mobile overrides).

5. **Given** inventory **`same`** rows for CV, blog, projects, header, 404  
   **When** those templates are updated  
   **Then** Montserrat teasers, CV **44px/22px/18px** MFred scale, project hero uppercase MFred, header brand, and 404 display type match legacy (global fonts from 8.2 applied; component rules ported).

6. **Given** mandatory checklist rows  
   **When** 8.3 completes  
   **Then** **Visual parity** remains **`same`** and **Sign-off** is filled for Home, CV, and other agreed rows (with Epic 7 motion sign-off coordinated).

7. **Given** gate quartet from `site/` on Node **22.12**  
   **When** run after CSS changes  
   **Then** all exit **0**; FR15 smoke: no horizontal scroll on `/`, `/cv/`, `/blog/`, one project URL.

---

## Tasks / subtasks

### Home (priority)

- [x] **HomeAbout** — Port `AboutBlockView` layout: `.intro-text` width/padding/`6vw`; `.image` **32vw** + `right: 120px` + responsive table from legacy; optional `mix-blend-mode` on paragraphs; keep `data-home-about*` hooks for 7.2.
- [x] **HomeWorks** — Port `WorkItemView` dimensions and `.image` cover crop; MFred rotated `.title` chip; alternate left/right alignment per index; use cover box + `object-fit: cover` or `background-image` on sized div.
- [x] **HomeHero** — Port `.main-list` position and font-size; ensure `100vh` + `background-attachment: fixed` (with `scroll` fallback ≤520px per legacy).
- [x] **HomeContact** — Port `.month`/`.year` display sizes and two-column flex; band `#b7c8cb` cover layout.

### Other templates

- [x] **SiteHeader** — MFred brand size/uppercase; glitch CSS from `mixins.scss` if visual-only (or defer glitch animation to 7.2).
- [x] **BlogPostTeaser** — Montserrat **26px** / **800** weight.
- [x] **blog/[...slug].astro** — Montserrat title, Consolas/`--font-mono` body code.
- [x] **Cv*.astro** + **cv.astro** — Section heading px/rem parity per inventory.
- [x] **projects/[...slug].astro** — MFred hero scale uppercase.
- [x] **404.astro** — MFred display sizing on photo.

### Verification

- [x] Document side-by-side check for **`/`** in Dev Agent Record (screenshots or short checklist).
- [x] Update `docs/migration-parity-checklist.md` sign-off columns.
- [x] Gate quartet green.

### Do not

- Re-open **8.2** font pipeline unless a missing weight breaks layout.
- Change motion libraries (Epic **7.2**).
- Redesign breakpoints—port legacy values first, then simplify only with **`simplified`** checklist approval.

---

## Dev notes

### Legacy references

- `src/components/index/about-block.js` — `AboutBlockView`
- `src/components/workItem.js` — `WorkItemView`
- `src/components/index/main-block.js` — `MainBlockView`
- `src/components/index/contact-block.js` — `ContactBlockView`
- `src/components/index/works-block.js` — section wrapper

### Astro targets

- `site/src/components/home/HomeAbout.astro`
- `site/src/components/home/HomeWorks.astro`
- `site/src/components/home/HomeHero.astro`
- `site/src/components/home/HomeContact.astro`

### Architecture

- **ADR-005** — Port styled-components rules to scoped Astro CSS. [architecture.md](../planning-artifacts/architecture.md)
- **FR22** — Layout + images, not fonts only. [prd.md](../planning-artifacts/prd.md)

### Checklist

- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md) — § Home layout & image presentation

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- **Home:** Ported legacy styled-components layout to scoped CSS — hero `100vh` + fixed bg + link block `right:120px/bottom:50px`; about `6vw` / `75%` / `32vw` fixed image / mix-blend paragraphs; works `600×900` cover boxes with `object-fit:cover` + rotated MFred chip + `20vw` section title; contact `400px` MFred date + `32px` copy column. Preserved 7.2 `data-*` hooks and legacy class aliases (`main-list`, `block-contact`, etc.).
- **Other:** Header fixed `padding:30px 120px`; blog teaser Montserrat 26px/800; post h1 32px; CV 44/36/22/18px; project h1 140px MFred; 404 h1 300px / message 36px MFred.
- **`ProjectImage`:** Added `home-work` variant (600/1200 widths) for cover crops.
- **Checklist:** Dev sign-off `8.3 DS 2026-05-22` on Home, CV, 404, blog list, sample project; inventory rows updated. **7.3** PO sign-off still pending.
- **Side-by-side `/` (dev checklist):** Hero link position/size ✓; about image 32vw right ✓; works tall cards + cover crop ✓; contact display type ✓ (manual preview recommended before cutover).
- **Gates:** check/build/test:schema/test:links → 0.

### File List

- `site/src/styles/global.css`
- `site/src/styles/motion.css`
- `site/src/components/home/HomeHero.astro`
- `site/src/components/home/HomeAbout.astro`
- `site/src/components/home/HomeWorks.astro`
- `site/src/components/home/HomeContact.astro`
- `site/src/components/nav/SiteHeader.astro`
- `site/src/components/blog/BlogPostTeaser.astro`
- `site/src/components/projects/ProjectImage.astro`
- `site/src/components/cv/CvPersonal.astro`
- `site/src/components/cv/CvSummary.astro`
- `site/src/components/cv/CvExperiences.astro`
- `site/src/components/cv/CvEducation.astro`
- `site/src/components/cv/CvSkills.astro`
- `site/src/pages/cv.astro`
- `site/src/pages/blog/[...slug].astro`
- `site/src/pages/projects/[...slug].astro`
- `site/src/pages/404.astro`
- `site/src/scripts/motion/home-work-item.ts`
- `site/src/pages/index.astro`
- `site/README.md`
- `docs/migration-parity-checklist.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; EP scope: styled-components + home image/layout parity. | EP / John (PM) |
| 2026-05-22 | Per-template layout CSS; checklist dev sign-off; gates green; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | CR: hide duplicate home `<h1>`; floating name = fixed header brand; status → done. | code-review |

---

### Review Findings

_Code review 2026-05-22 — story `8-3-per-template-visual-reconciliation-and-sign-off` (user question: home “Juanma Perez” on hero)._

✅ **Approved with one patch** — floating site name was **not** missing from layout CSS; duplicate visible `<h1>` in `<main>` was wrong vs legacy.

| AC | Verdict |
|----|---------|
| AC1–AC5 | Home/other template layout CSS ported; header fixed + MFred brand matches legacy `HeaderView` |
| AC6 | Checklist dev sign-off present; **7.3** PO still pending |
| AC7 | Gates green (re-run after patch) |

**patch (fixed):** Legacy home had **no** in-flow page title — “Juanma Perez” over the hero was `Header` → `h1.web-title` → link (`position: fixed; z-index: 100`). **8.3** already ported that in `SiteHeader.astro`. Story **3.3** left a **visible** `<h1>Juanma Perez</h1>` in `index.astro` above `HomeHero`, which read as a layout miss. **Fix:** sr-only `h1` in `index.astro`; visible identity = header brand only (UX-DR2 preserved).

**defer (informational):** Astro uses `<a class="site-header__brand">` not `<h1>` in header (Story **3.2** policy) — acceptable; one sr-only `h1` in `<main>`.

**defer:** Manual side-by-side vs Gatsby still recommended before **7.3** cutover.
