# Story 7.2: Implement approved islands only

**Story ID:** 7.2  
**Story key:** `7-2-implement-approved-islands-only`  
**Status:** review  
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

- [x] **Add dependency** — `cd site && npm install gsap` (v3; register `ScrollTrigger` in modules).
- [x] **Spike modules** — Folded into `home-main-block.ts` + `home-work-item.ts` (no throwaway spike files).
- [x] **Spike wiring** — `HomeMotion.astro` on `index.astro` (Astro `<script>` bundle, not `client:visible` island).
- [x] **Measure** — Gzip: GSAP chunk ~27 KiB; home entry ~18 KiB; CV entry ~0.6 KiB (+ shared). Total home ~47 KiB gz — note for **7.4**.
- [x] **Do not merge spike-only throwaway** — N/A (spike folded in).

### Task 1 — Home motion (`/`)

- [x] **`home-orchestration.ts`** — Cookie `animationCompleted`; `data-home-ready` on `<html>`; `[data-home-block]` hidden until intro.
- [x] **`home-main-block.ts`** — Hero intro + ScrollTrigger list fade.
- [x] **`home-about.ts`** — Paragraph scroll reveal + image slide/pin.
- [x] **`home-work-item.ts`** — Parallax on `[data-work-item]` cards.
- [x] **`home-contact.ts`** — Cover `scaleY` + content fade/slide.
- [x] **`HomeMotion.astro`** — Route-scoped on `index.astro` only.
- [x] **Markup hooks** — `data-home-*`, `data-work-*` on home components.

### Task 2 — Header intro (global, route-scoped load)

- [x] **`header-intro.ts`** — GSAP fade/slide header.
- [x] **Load strategy** — Conditional `<script>` in `SiteHeader.astro` on `/`, `/cv*`, `/projects*` only (not blog/404).
- [x] **Coordinate with 8.2** — Opacity/transform only; MFred from global CSS.

### Task 3 — Project contact motion (`/projects/*`)

- [x] **Reuse `home-contact.ts`** — `initHomeContact()` from `ProjectContactMotion.astro`.
- [x] **`ProjectContactMotion.astro`** — On `projects/[...slug].astro`.

### Task 4 — CV motion (`/cv/`)

- [x] **`cv-typewriter.ts`** — Typewriter + `cv:ready` event; blink in `motion.css`.
- [x] **`cv-stagger.ts`** — GSAP stagger on `[data-cv-reveal]`; photo slide — **no** React/spring fallback needed.
- [x] **Spike fallback** — Not required (GSAP stagger acceptable).
- [x] **`CvMotion.astro`** — On `cv.astro` only.

### Task 5 — CSS motion (no GSAP)

- [x] **Port glitch + scroll indicator** — Glitch on `.site-header__brand` in `motion.css`; scroll-indicator deferred (unused in legacy templates).

### Task 6 — Reduced motion & cleanup

- [x] **`prefers-reduced-motion`** — `reduced-motion.ts` guard in all inits.
- [x] **`ScrollTrigger.kill()`** — Static MPA; bfcache not required for MVP.
- [x] **Update checklist Notes** — Baseline line updated for 7.2.

### Task 7 — Verification

- [x] **Manual** — Build verify: blog HTML has no `/_astro/*.js`; home/cv/project load motion scripts.
- [x] **Gate quartet** — All **0**.
- [x] **Do not** in this story: **7.3**, **7.4**, blog motion, ScrollMagic.

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

- [x] Spike: intro + one parallax scene behave plausibly vs legacy  
- [x] Reduced motion: all sections visible without waiting  
- [x] Blog: zero motion network requests  
- [x] Gate quartet green  
- [x] Bundle size recorded

---

## References

- [epics.md — Story 7.2](../planning-artifacts/epics.md)  
- [motion-technology-decision.md](../planning-artifacts/motion-technology-decision.md)  
- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md) — § Legacy animation inventory  
- Legacy: `src/pages/index.js`, `src/components/index/*`, `src/components/workItem.js`, `src/components/header.js`, `src/components/cv/*`

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Added `gsap@^3`; motion modules under `site/src/scripts/motion/`.
- Home: cookie gate, hero intro, about/works/contact ScrollTrigger, work parallax; `data-home-ready` + noscript/reduced-motion fallbacks.
- CV: typewriter summary + GSAP stagger (no `@astrojs/react`).
- Projects: shared contact scroll via `ProjectContactMotion`.
- Header intro on motion routes only (excludes blog/404 per AC4).
- `motion.css`: glitch brand, blink cursor, home/CV reveal helpers.
- Astro 6: route scripts via `<script>` in `.astro` (not `client:visible` on empty Astro components).
- Bundle gzip: ~27 KiB GSAP+ScrollTrigger shared; ~47 KiB total on `/` including home modules.

### File List

- `site/package.json`
- `site/package-lock.json`
- `site/src/scripts/motion/reduced-motion.ts`
- `site/src/scripts/motion/cookies.ts`
- `site/src/scripts/motion/home-orchestration.ts`
- `site/src/scripts/motion/home-main-block.ts`
- `site/src/scripts/motion/home-about.ts`
- `site/src/scripts/motion/home-work-item.ts`
- `site/src/scripts/motion/home-contact.ts`
- `site/src/scripts/motion/home-init.ts`
- `site/src/scripts/motion/header-intro.ts`
- `site/src/scripts/motion/cv-typewriter.ts`
- `site/src/scripts/motion/cv-stagger.ts`
- `site/src/styles/motion.css`
- `site/src/components/motion/HomeMotion.astro`
- `site/src/components/motion/CvMotion.astro`
- `site/src/components/motion/ProjectContactMotion.astro`
- `site/src/pages/index.astro`
- `site/src/pages/cv.astro`
- `site/src/pages/projects/[...slug].astro`
- `site/src/layouts/BaseLayout.astro`
- `site/src/components/nav/SiteHeader.astro`
- `site/src/components/home/HomeHero.astro`
- `site/src/components/home/HomeAbout.astro`
- `site/src/components/home/HomeWorks.astro`
- `site/src/components/home/HomeContact.astro`
- `site/src/components/cv/CvSummary.astro`
- `site/src/components/cv/CvPersonal.astro`
- `site/src/components/cv/CvExperiences.astro`
- `site/src/components/cv/CvEducation.astro`
- `site/src/components/cv/CvSkills.astro`
- `site/README.md`
- `docs/migration-parity-checklist.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; ADR-008 spike-first plan; status → ready-for-dev. | create-story |
| 2026-05-22 | GSAP 3 motion port; gates green; status → review. | Amelia (bmad-dev-story) |
