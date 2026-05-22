# Story 7.2: Implement approved islands only

**Story ID:** 7.2  
**Story key:** `7-2-implement-approved-islands-only`  
**Status:** ready-for-dev  
**Epic:** 7 — Motion parity and client islands (where approved)  
**Depends on:** Story **7.1** (inventory + checklist `same` rows); Epics **3–6** (static routes)  
**Parallel with:** Story **8.2** (global fonts) — coordinate **header** (7.2 `header-intro.ts` after MFred loads in 8.2, or ship header motion last)  
**Followed by:** Story **7.3** (checklist sign-off), **7.4** (performance regression)

---

## Story

As a **visitor**,  
I want **motion or interactivity only where the checklist approves**,  
So that **FR19** and **NFR-P2** are honored.

---

## Acceptance criteria (from epics + ADR-008)

1. **Given** Story **7.1** inventory rows with motion parity **`same`** and non-`static` delivery  
   **When** implementation completes  
   **Then** home (`/`), CV (`/cv/`), global header intro, and project detail **contact scroll FX** reproduce legacy **narrative order** (cookie gate → hero intro → about/works/contact unlock; CV typewriter → section reveals; header fade-in; contact cover/content scroll).

2. **Given** **ADR-008** and [motion-technology-decision.md](../planning-artifacts/motion-technology-decision.md)  
   **When** scroll/timeline motion ships  
   **Then** code uses **GSAP 3** + **ScrollTrigger** only — **no** `scrollmagic`, **no** GSAP 2 `TimelineMax`/`TweenMax` APIs, **no** ScrollMagic port.

3. **Given** a **spike** gate (task 0)  
   **When** spike passes  
   **Then** `main-block.js` intro timeline + one `workItem.js` parallax scene are ported on a dev-only or feature-flagged path; transferred JS size recorded in Dev Agent Record before full home port.

4. **Given** ADR-004 / NFR-P2  
   **When** pages build  
   **Then** motion JS loads **only** on `/`, `/cv/`, and `/projects/*` (contact module) — **not** on blog list/post/category or `/404`; **not** via global `BaseLayout` script that runs on every route.

5. **Given** `prefers-reduced-motion: reduce`  
   **When** user has reduced motion enabled  
   **Then** timelines do not run; cookie-gated sections are **visible** immediately; scroll pins/scrub disabled; no essential content hidden behind animation.

6. **Given** checklist **Islands approved** remains **N** until **7.3**  
   **When** React is introduced  
   **Then** it is **CV-only** and only if GSAP/Motion stagger spike fails — document decision in Dev Agent Record; prefer **no** `@astrojs/react` if GSAP stagger is acceptable.

7. **Given** gate quartet from `site/` on Node **22.12**  
   **When** run after implementation  
   **Then** `check`, `build`, `test:schema`, `test:links` → **0**.

8. **Given** NFR-P2 tracking  
   **When** story completes  
   **Then** Dev Agent Record lists approximate **KB transferred** for motion bundle (gsap + ScrollTrigger + route entry) and notes checklist **LCP/JS ex. = Y** rows still justified.

---

## Tasks / subtasks

### Task 0 — Spike (required before full port)

- [ ] **Add dependency** — `cd site && npm install gsap` (v3; register `ScrollTrigger` in modules).
- [ ] **Spike modules** — `site/src/scripts/motion/spike/home-intro-spike.ts` + `home-work-spike.ts` (or single `spike.ts`):
  - Port `src/components/index/main-block.js` intro: cover scale, stagger `.main-list li`, callback on complete.
  - Port one `workItem.js` scene → `ScrollTrigger` with `scrub` on image + block.
- [ ] **Spike wiring** — Temporary on `index.astro` only: `<script type="module">` or `HomeMotion.astro` with `client:visible` importing spike init.
- [ ] **Measure** — Log/build analyze: gzip size of motion chunk; record in Dev Agent Record. If > ~50 KiB gzipped, note risk for **7.4**.
- [ ] **Do not merge spike-only throwaway** — Fold into production modules below or delete spike files after port.

### Task 1 — Home motion (`/`)

- [ ] **`home-orchestration.ts`** — Cookie `animationCompleted` read/write (legacy `index.js`); toggle `data-home-ready` or class on `<html>`; show About/Works/Contact only after intro (markup: `hidden`/`inert` until ready; noscript fallback unhides).
- [ ] **`home-main-block.ts`** — Hero intro timeline (from `main-block.js`); ScrollTrigger fade `.main-list` on scroll (was `removeSocial` scene).
- [ ] **`home-about.ts`** — Image slide-in + pin/class toggle (from `about-block.js`).
- [ ] **`home-work-item.ts`** — Init all `[data-work-item]` cards; shared `ScrollTrigger` patterns per legacy indices.
- [ ] **`home-contact.ts`** — Cover `scaleY` + content fade/slide (from `contact-block.js`).
- [ ] **`HomeMotion.astro`** — `client:visible`; imports orchestration + modules; mounted **only** on `site/src/pages/index.astro` (not `BaseLayout`).
- [ ] **Markup hooks** — Add stable `data-*` / class hooks on `HomeHero`, `HomeAbout`, `HomeWorks`, `HomeContact` matching legacy selectors where practical.

### Task 2 — Header intro (global, route-scoped load)

- [ ] **`header-intro.ts`** — GSAP fade/slide `header` on mount (from `header.js`).
- [ ] **Load strategy** — Prefer small `SiteHeaderMotion.astro` with `client:visible` inside `SiteHeader.astro` **or** script in header only — **avoid** loading home scroll modules on blog.
- [ ] **Coordinate with 8.2** — Header MFred styling from global CSS; motion is transform/opacity only.

### Task 3 — Project contact motion (`/projects/*`)

- [ ] **Reuse `home-contact.ts`** — Import/init from `HomeContact.astro` on project pages (already rendered in `projects/[...slug].astro`).
- [ ] **Optional `ProjectContactMotion.astro`** — Thin wrapper if index-only `HomeMotion` should not run on projects.

### Task 4 — CV motion (`/cv/`)

- [ ] **`cv-typewriter.ts`** — Port `description.js` interval typewriter + `blink` cursor (CSS keyframes in `site/src/styles/` or scoped); dispatch `cv:ready` event when complete.
- [ ] **`cv-stagger.ts`** — **First:** GSAP stagger on `[data-cv-reveal]` when `cv:ready` (from personal/experiences/education/skills behavior).
- [ ] **Spike fallback** — If spring feel unacceptable, add `@astrojs/react` + `@react-spring/web` **only** on `cv.astro` with `CvMotion.astro` `client:visible` — update checklist Notes (still **Islands approved = N** until 7.3 unless PO approves early).
- [ ] **`CvMotion.astro`** — `client:visible` on `cv.astro` only.

### Task 5 — CSS motion (no GSAP)

- [ ] **Port glitch + scroll indicator** — From `src/styles/mixins.scss` to `site/src/styles/motion.css` or `global.css` (coordinate **8.2**); apply to header brand / home per inventory.

### Task 6 — Reduced motion & cleanup

- [ ] **`prefers-reduced-motion`** — Central guard in each init: `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- [ ] **`ScrollTrigger.kill()`** — On Astro view transitions N/A (static MPA); document bfcache if needed.
- [ ] **Update checklist Notes** — Per inventory row: implemented module name; bundle note.

### Task 7 — Verification

- [ ] **Manual** — `/`: first visit intro + cookie; scroll scenes; return visit skips intro if cookie set. `/cv/`: typewriter → sections appear. `/projects/umaicha`: contact scroll. `/blog`: no motion scripts in Network tab.
- [ ] **Gate quartet** — All **0**.
- [ ] **Do not** in this story: Story **7.3** sign-off, **7.4** Lighthouse, blog motion, ScrollMagic npm package.

---

## Inventory map (7.1 → 7.2 modules)

| Inventory row | 7.2 module |
|---------------|------------|
| `index.js` orchestration | `home-orchestration.ts` |
| `main-block.js` | `home-main-block.ts` |
| `about-block.js` | `home-about.ts` |
| `contact-block.js` | `home-contact.ts` + project reuse |
| `workItem.js` | `home-work-item.ts` |
| `header.js` | `header-intro.ts` |
| `mixins.scss` glitch/scroll | CSS in `site/src/styles/` |
| `cv.js` | `cv-typewriter.ts` + `cv-stagger.ts` |
| `description.js` | `cv-typewriter.ts` |
| `personal/experiences/education/skills` | `cv-stagger.ts` (or React fallback) |

---

## Dev notes

### Architecture compliance

- **ADR-004** — Islands only when checklist-approved; default client modules per route.  
- **ADR-008** — GSAP 3 + ScrollTrigger. [architecture.md](../planning-artifacts/architecture.md) §8  
- [motion-technology-decision.md](../planning-artifacts/motion-technology-decision.md) — execution order

### PRD

- **FR19** — Same narrative; motion `same` on inventory rows.  
- **NFR-P2** — No motion on blog; document JS KB.

### Previous story intelligence

- **7.1** — All motion-heavy rows **`same`**; blog **`n/a`**. [7-1-legacy-animation-inventory.md](./7-1-legacy-animation-inventory.md)  
- **CR defer (vanilla vs island)** — Prefer route-scoped `client:visible` wrappers importing `site/src/scripts/motion/*.ts`; header can be small island without full React app.  
- **3.3–3.4** — Static markup exists; add hooks + hide/show classes, do not rewrite content.

### File structure (target)

```
site/package.json                          # + gsap; optional @astrojs/react
site/src/scripts/motion/
  home-orchestration.ts
  home-main-block.ts
  home-about.ts
  home-contact.ts
  home-work-item.ts
  header-intro.ts
  cv-typewriter.ts
  cv-stagger.ts
site/src/components/motion/
  HomeMotion.astro
  CvMotion.astro
  SiteHeaderMotion.astro   # optional
site/src/pages/index.astro                 # + HomeMotion
site/src/pages/cv.astro                    # + CvMotion
site/src/components/home/*.astro           # data hooks
site/src/components/nav/SiteHeader.astro
site/README.md                             # Motion runtime + reduced-motion
docs/migration-parity-checklist.md         # Notes column updates (optional)
```

### Guardrails

1. **No** ScrollMagic in `package.json`.  
2. **No** motion in `BaseLayout` global script.  
3. **No** breaking gates.  
4. Spike before full home port.

### Testing / verification checklist

- [ ] Spike: intro + one parallax scene behave plausibly vs legacy  
- [ ] Reduced motion: all sections visible without waiting  
- [ ] Blog: zero motion network requests  
- [ ] Gate quartet green  
- [ ] Bundle size recorded

---

## References

- [epics.md — Story 7.2](../planning-artifacts/epics.md)  
- [motion-technology-decision.md](../planning-artifacts/motion-technology-decision.md)  
- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md) — § Legacy animation inventory  
- Legacy: `src/pages/index.js`, `src/components/index/*`, `src/components/workItem.js`, `src/components/header.js`, `src/components/cv/*`

---

## Dev Agent Record

### Agent Model Used

_(fill on implementation)_

### Completion Notes List

_(fill on implementation)_

### File List

_(fill on implementation)_

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; ADR-008 spike-first plan; status → ready-for-dev. | create-story |
