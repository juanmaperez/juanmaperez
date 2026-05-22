# Story 7.1: Legacy animation inventory

**Story ID:** 7.1  
**Story key:** `7-1-legacy-animation-inventory`  
**Status:** review  
**Epic:** 7 — Motion parity and client islands (where approved)  
**Depends on:** Epics **1–6** complete (static Astro routes live; checklist rows seeded in Stories **3.x–5.x**). May run **in parallel** with Story **8.1** (typography/styling inventory).  
**Followed by:** Story **7.2** (implement motion parity rows marked **`same`** or **`simplified`** with non-`static` inventory recommendations)

**Product direction (2026-05-22):** Reproduce legacy animations **where possible**. Default inventory target is **`same`** (full cookie gate, home GSAP/ScrollMagic, CV react-spring + typewriter, global header). Record **LCP/JS exception (Y)** on routes where **`same`** likely exceeds NFR-P2 without an approved checklist exception.

---

## Story

As a **maintainer**,  
I want **a list of legacy JS/animation dependencies per route**,  
So that **FR19** decisions are data-driven.

---

## Acceptance criteria (from epics)

1. **Given** legacy Gatsby `src/` templates and components audited (repo root, not `site/`)  
   **When** inventory is written into `docs/migration-parity-checklist.md`  
   **Then** a dedicated **Legacy animation & JS inventory** section lists each legacy **component/file**, **libraries**, **behavior summary**, and **recommended Astro approach** (`static` | `vanilla-script` | `island` | `n/a`).

2. **Given** every public route class in the checklist (core, blog, projects)  
   **When** inventory is complete  
   **Then** each row’s **Motion parity** column is `same` | `simplified` | `removed` | `n/a` and **matches** the audit (update Notes if a row was pre-filled during Epics 3–5 without component-level evidence).

3. **Given** `gatsby-node.js` ScrollMagic null-loader and GSAP webpack aliases  
   **When** documented in inventory Notes  
   **Then** maintainers understand legacy **client-only** intent (no ScrollMagic during SSR/build-html) for any future **7.2** island work.

4. **Given** current Astro site (`site/`)  
   **When** inventory completes  
   **Then** inventory confirms **no** `client:*` hydration and **no** `@astrojs/react` today (baseline for 7.2); gate quartet still passes unchanged.

5. **Given** `npm run check`, `npm run build`, `npm run test:schema`, and `npm run test:links` from `site/` on Node **22.12**  
   **When** run after doc-only changes  
   **Then** all exit **0** (no functional regressions).

6. **Given** inventory rows with motion parity **`same`** on Home and CV (and other motion-heavy surfaces)  
   **When** inventory is complete  
   **Then** each such row notes whether **LCP/JS exception (Y/N)** is **likely required** for NFR-P2 (expect **Y** on `/` and `/cv/`); **Islands approved** remains **N** until Story **7.3** — 7.1 only **proposes** island/component names for 7.2.

---

## Tasks / subtasks

- [x] **Audit legacy `src/`** (AC1) — Systematic pass; record findings in a working table before editing checklist:

  | Area | Legacy entry | Animation / client JS |
  |------|----------------|------------------------|
  | **Home** | `src/pages/index.js` | Cookie gate `animationCompleted`; orchestrates blocks |
  | | `src/components/index/main-block.js` | GSAP `TimelineMax`/`TweenMax`, ScrollMagic intro + scroll-out |
  | | `src/components/index/about-block.js` | ScrollMagic + GSAP image reveal / pin |
  | | `src/components/index/contact-block.js` | ScrollMagic + GSAP cover/content |
  | | `src/components/workItem.js` | ScrollMagic parallax per work card (home works grid) |
  | | `src/components/header.js` | GSAP nav intro (all pages using `Layout`) |
  | **CV** | `src/pages/cv.js` | Chains `visible` state after typewriter |
  | | `src/components/cv/description.js` | CSS `blink` keyframes (typewriter cursor) |
  | | `src/components/cv/personal.js`, `experiences.js`, `education.js`, `skills.js` | `react-spring` `useSpring` / `animated` |
  | **Projects** | `src/templates/workTemplate.js` | Imports `ContactBlock` → same GSAP/ScrollMagic as home contact |
  | **Blog** | `postTemplate.js`, `blogListTemplate.js`, `categoryTemplate.js` | No GSAP/ScrollMagic/react-spring in templates |
  | **404** | `src/pages/404.js` | Static styled background |
  | **Global CSS** | `src/styles/mixins.scss` | Glitch + scroll indicator keyframes (home) |
  | **Build** | `gatsby-node.js` | Null-loader ScrollMagic on `build-html`; GSAP aliases |

  Use `rg -l 'gsap|ScrollMagic|react-spring|TweenMax|TimelineMax' src/` from repo root to catch stragglers.

- [x] **Add checklist section** (AC1, AC2) — In `docs/migration-parity-checklist.md`, after the Story **6.5** bullet and before **Redirect map**, insert:

  **Motion (FR19 prep):** Story **7.1** — component-level inventory below; route tables updated to match.

  Then add `## Legacy animation & JS inventory (Story 7.1)` with columns:

  | Legacy route(s) | Legacy file(s) | Libraries / deps | Behavior (1 line) | Recommended Astro | Motion parity | Islands (Y/N) | Notes |
  |-----------------|----------------|------------------|-------------------|-------------------|---------------|---------------|-------|

  Populate **all** motion-heavy legacy files (table above). **Recommended Astro** per architecture §8: when motion parity is **`same`**, prefer **`vanilla-script`** or **`island`** (not **`static`**); use **`static`** only when parity is **`removed`** or **`n/a`**. Propose **7.2 island/component names** in Notes (e.g. `HomeMotion`, `CvReveal`, `SiteHeaderIntro`) — do not set **Islands approved = Y** in this story.

- [x] **Reconcile route tables** (AC2, AC6) — For each row in Core / Blog / Projects tables:

  - **Home `/`:** **`same`** — cookie `animationCompleted` gate, GSAP intro, ScrollMagic sections, work parallax, global CSS glitch/scroll indicator. Set **LCP/JS ex. = Y** (anticipated). Notes: static MVP in Story 3.3; Epic 7 restores motion.
  - **CV `/cv/`:** **`same`** — react-spring section stagger + typewriter/cursor. Set **LCP/JS ex. = Y** (anticipated). Notes: static MVP in Story 3.4; Epic 7 restores motion.
  - **Global header** (all primary templates): document in inventory; parity **`same`** → likely **`island`** on `SiteHeader`.
  - **Project detail** (`workTemplate` + `ContactBlock`): **`same`** for inherited contact scroll FX (legacy parity); set **LCP/JS ex.** per audit.
  - **Blog list / post / category / 404:** **`n/a`** or **`removed`** — no legacy GSAP/ScrollMagic/spring in templates.
  - **Islands approved:** remain **`N`** on all rows (7.3 sign-off).
  - **Sign-off:** leave blank until Story **7.3**.

- [x] **Update “Optional: high-motion” table** (AC1) — Replace `*(none yet)*` with either consolidated summary (“see inventory §7.1”) or key rows (home MainBlock/AboutBlock/WorkItem) if duplicative—prefer **one** source of truth in inventory section.

- [x] **Cross-doc pointer** (AC3) — Short bullet in `site/README.md` under a new **Motion / FR19** subsection: inventory lives in [migration-parity-checklist.md](../docs/migration-parity-checklist.md); Epic 7 implements only checklist-approved islands (ADR-004).

- [x] **Confirm Astro baseline** (AC4) — Verify:

  ```bash
  rg 'client:' site/src || true   # expect no matches
  rg '@astrojs/react' site/astro.config.mjs site/package.json || true  # expect no integration
  ```

  Record result in Dev Agent Record.

- [x] **Gate quartet** (AC5) — `cd site && npm run check && npm run build && npm run test:schema && npm run test:links` → 0.

- [x] **Do not** in this story: add React islands, GSAP, ScrollMagic, or npm deps to `site/`; change page markup; sign off checklist rows (Story **7.3**); run Lighthouse (Story **7.4**).

---

## Current baseline (pre-story)

| Item | State |
|------|--------|
| Checklist route rows | Home/CV pre-filled **`removed`** in Stories 3.3/3.4 (static MVP); **7.1 reconciles to `same`** per product direction |
| Component-level inventory | **Missing** — no dedicated FR19 dependency table |
| Legacy deps | `gsap@2`, `scrollmagic`, `react-spring@8` in root `package.json` |
| Astro site | Static only; no islands |
| Epic 7 | All stories **backlog** |

---

## Target motion parity (product direction)

| Legacy pattern | Current Astro (Epics 3–5) | Motion parity | Recommended Astro (7.2) | LCP/JS ex. |
|----------------|---------------------------|---------------|-------------------------|------------|
| GSAP + ScrollMagic home narrative | Static `HomeHero`, `HomeAbout`, `HomeWorks`, `HomeContact` | **`same`** | `vanilla-script` and/or **`island`** (client-only; no ScrollMagic at build) | **Y** |
| Cookie `animationCompleted` gate | No cookie; all sections visible | **`same`** | `vanilla-script` (cookie + section orchestration) | **Y** (with home) |
| Home works parallax (`workItem.js`) | Static cards | **`same`** | `vanilla-script` per card or bundled home script | **Y** (with home) |
| CV react-spring stagger | Static sections | **`same`** | **`island`** (react-spring or equivalent stagger) | **Y** |
| CV typewriter + blink cursor | Static copy | **`same`** | `vanilla-script` or **`island`** | **Y** (with CV) |
| Project `ContactBlock` scroll FX | Static project layout | **`same`** | `vanilla-script` / shared home contact module | Per audit |
| Global header GSAP | Static `SiteHeader` | **`same`** | **`island`** or `vanilla-script` | Per audit |
| Blog/category templates | Static Astro layouts | **`n/a`** | **`n/a`** | N |
| Global CSS glitch / scroll indicator | Partial/static CSS | **`same`** | CSS + home script if JS-driven | **Y** (with home) |

**Product note:** Story **7.2** implements every inventory row with **`same`** or **`simplified`** and Recommended Astro ≠ **`static`**. Expect **non-zero** islands/scripts and checklist **LCP/JS exceptions** on `/` and `/cv/`; Story **7.4** verifies NFR-P1/P2 against baselines or documented exceptions.

---

## Dev notes

### Architecture compliance

- **ADR-004** — Islands only when checklist-approved. [architecture.md ADR-004](../planning-artifacts/architecture.md)
- **ADR-008** — **7.2 default stack:** GSAP 3 + ScrollTrigger; no ScrollMagic port; CV prefers GSAP/Motion over react-spring unless spike requires React. [architecture.md ADR-008](../planning-artifacts/architecture.md)
- **§8 Islands and legacy animation** — Inventory → 7.2 implements per ADR-008. [architecture.md §8](../planning-artifacts/architecture.md)
- **Motion technology decision** — Options matrix and porting examples. [motion-technology-decision.md](../planning-artifacts/motion-technology-decision.md)
- **§12 Migration parity checklist** — FR19 governance columns. [architecture.md §12](../planning-artifacts/architecture.md)

### PRD

- **FR19** — URL/narrative/motion parity via checklist. [prd.md](../planning-artifacts/prd.md)
- **NFR-P2** — JS budget; inventory feeds island decisions. [prd.md](../planning-artifacts/prd.md)

### Previous story intelligence

- **3.3** — Home shipped static; checklist said **`removed`** as MVP deferral to Epic 7. **7.1 sets target `same`.** [3-3-home-page-content-and-layout-parity.md](./3-3-home-page-content-and-layout-parity.md)
- **3.4** — CV shipped static; checklist said **`removed`** as MVP deferral. **7.1 sets target `same`** (react-spring + typewriter). [3-4-cv-page-parity.md](./3-4-cv-page-parity.md)
- **5.1** — Project pages static; legacy `workTemplate` had `ContactBlock`. [5-1-project-detail-routes.md](./5-1-project-detail-routes.md)
- **6.5** — Analytics is separate third-party script; not ScrollMagic. [6-5-analytics-snippet-ga4-or-alternative.md](./6-5-analytics-snippet-ga4-or-alternative.md)

### File structure (target)

```
docs/migration-parity-checklist.md   # MODIFIED — inventory section + row reconciliation
site/README.md                       # MODIFIED — FR19 pointer (short)
_bmad-output/implementation-artifacts/7-1-legacy-animation-inventory.md  # this file
```

Optional (only if it speeds audit): `scripts/audit-legacy-animation-inventory.mjs` printing `rg` summary — **not required** if manual table is complete.

### Guardrails

1. Audit **repo-root** `src/`, not only `site/`.
2. Do not approve islands in this story—inventory and parity labels only.
3. Keep checklist as **single source of truth** for 7.2 / 7.3 / 7.4.

### Testing / verification checklist

- [x] Inventory table covers every legacy file using GSAP, ScrollMagic, or react-spring
- [x] Home/CV (and motion-heavy rows) reconciled to **`same`** with non-`static` Recommended Astro
- [x] LCP/JS exception likelihood documented for `/` and `/cv/`
- [x] 7.2 island/component names proposed in inventory Notes; **Islands approved** still **N**
- [x] No Astro islands or animation deps added in **this** story
- [x] Gate quartet green

---

## References

- [epics.md — Story 7.1](../planning-artifacts/epics.md)
- [architecture.md §8, §12](../planning-artifacts/architecture.md)
- Legacy: `gatsby-node.js`, `src/pages/index.js`, `src/components/index/*`, `src/components/workItem.js`, `src/components/cv/*`
- Checklist: [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Audited 9 legacy files with GSAP/ScrollMagic/react-spring + orchestration (`index.js`, `cv.js`, `description.js`, `workTemplate.js`, `mixins.scss`, `gatsby-node.js`).
- Added **§ Legacy animation & JS inventory** to checklist (17 rows) with Recommended Astro + proposed 7.2 component names.
- Reconciled routes: **`same`** + LCP/JS **Y** on `/`, `/cv/`, all projects; **`n/a`** on blog/category/posts/404.
- **Islands approved** remains **N** everywhere (7.3 sign-off).
- Astro baseline: zero `client:*`, no `@astrojs/react`.
- Gates: check/build/test:schema/test:links → 0.

### File List

- `docs/migration-parity-checklist.md`
- `site/README.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; Epic 7 opened; status → ready-for-dev. | create-story |
| 2026-05-22 | Product direction: **`same`** motion parity where possible; full cookie/CV parity; LCP/JS exceptions OK; 7.2 expected non-no-op. | EP / John (PM) |
| 2026-05-22 | **ADR-008:** GSAP 3 + ScrollTrigger for 7.2; motion-technology-decision.md added. | EP / John (PM) |
| 2026-05-22 | Inventory + route reconciliation; gates green; status → review. | Amelia (bmad-dev-story) |
