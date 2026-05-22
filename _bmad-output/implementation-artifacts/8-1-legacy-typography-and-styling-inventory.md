# Story 8.1: Legacy typography and styling inventory

**Story ID:** 8.1  
**Story key:** `8-1-legacy-typography-and-styling-inventory`  
**Status:** review  
**Epic:** 8 — Typography and visual design parity  
**Depends on:** Epics **1–6** complete (static Astro routes live); may run **in parallel** with Story **7.1** (motion inventory)  
**Followed by:** Story **8.2** (global tokens & fonts), then **8.3** (per-template visual reconciliation)

---

## Story

As a **maintainer**,  
I want **a comparison of legacy vs Astro fonts, colors, and key CSS per template**,  
So that **FR22** gaps are data-driven.

---

## Acceptance criteria

1. **Given** legacy `src/styles/main.css`, `src/styles/mixins.scss`, and component-level styled rules in `src/` audited (repo root)  
   **When** inventory is written into `docs/migration-parity-checklist.md`  
   **Then** section **`## Legacy typography & styling inventory (Story 8.1)`** lists each **template/area**, **legacy fonts & CSS sources**, **current Astro (`site/`) state**, **gap summary**, and **recommended fix** (`global-token` | `component-css` | `n/a`).

2. **Given** every public route class in the checklist (core, blog, projects)  
   **When** inventory is complete  
   **Then** each row includes **Visual parity** (`same` | `simplified` | `removed` | `n/a`) defaulting to **`same`** where legacy used brand fonts or shared palette; **matches** the audit (Epics 3–5 used system fonts and scattered component CSS—document as interim).

3. **Given** known pre-audit gaps (2026-05-22)  
   **When** inventory is written  
   **Then** at minimum these gaps are explicitly recorded:

   | Area | Legacy | Astro today (gap) |
   |------|--------|-------------------|
   | **Global** | `main.css`: Questrial body, MFred headings, `#fbf9f3` canvas | No `site/src/styles/`; `BaseLayout` loads **no** fonts |
   | **Fonts** | Google: Questrial, Amatic SC; self-host: MFred (`src/assets/fonts/mfred/`) | System UI stack only |
   | **Header** | MFred brand + glitch mixins (`mixins.scss`) | `SiteHeader`: `font-weight: 700`, no MFred/glitch |
   | **Blog teasers** | Montserrat titles (`post-item.js`) | Inherited system sans |
   | **Home** | Section-specific legacy components + mixins | Scoped clamps; partial palette match |
   | **CV** | px-based section titles (44px / 22px / 18px) | rem-based; sizes close but wrong font family |
   | **Code** | Consolas stack in `main.css` | `ui-monospace` on blog post only |

4. **Given** `site/` has no global font pipeline yet  
   **When** inventory completes  
   **Then** inventory recommends **8.2** scope: copy MFred assets into `site/public` or `site/src/assets`, wire `global.css`, document **NFR-V1** loading strategy; **no** font files or global CSS added in **this** story.

5. **Given** gate quartet from `site/` on Node **22.12**  
   **When** run after doc-only changes  
   **Then** all exit **0**.

---

## Tasks / subtasks

- [x] **Audit legacy styles** (AC1, AC3) — From repo root:

  ```bash
  rg -l 'font-family|font-size|@import|@font-face' src/styles src/components src/pages src/templates
  ```

  Capture: `src/styles/main.css`, `mixins.scss`, header, home blocks, `post-item.js`, CV components, project templates, blog templates.

- [x] **Audit Astro `site/`** (AC1) — Record per-template `<style>` blocks and any colors/fonts; confirm `BaseLayout.astro` has no global stylesheet import.

- [x] **Extend checklist** (AC2) — Update **Purpose** line to cite **FR22** and **Visual parity** column. Add usage steps for Visual parity (mirror Motion parity). Add inventory section table:

  | Template / area | Legacy source(s) | Legacy fonts & key rules | Astro source(s) | Gap | Recommended fix | Visual parity | Notes |

- [x] **Reconcile route tables** (AC2) — Add **Visual parity** column to Core / Blog / Projects tables (or sub-table per architecture §12). Defaults:

  - **Home, CV, header (global), blog list/post, projects:** **`same`**
  - **404:** **`same`** or **`simplified`** if full-bleed image styling is close enough
  - **Sign-off:** blank until Story **8.3**

- [x] **Cross-doc pointer** — `site/README.md` **Typography / FR22** subsection → checklist inventory; points to **8.2** for implementation.

- [x] **Architecture §12** — Update `_bmad-output/planning-artifacts/architecture.md` checklist template table to include **Visual parity** column (doc sync in this story).

- [x] **Gate quartet** (AC5) — `cd site && npm run check && npm run build && npm run test:schema && npm run test:links` → 0.

- [x] **Do not** in this story: add fonts to `site/`, create `global.css`, change component markup for styling, or sign off Visual parity rows (Story **8.3**).

---

## Product direction

Reproduce **legacy typography and styling where possible** — same default as Epic 7 motion: checklist target **`same`**, not “system font MVP is final.”

---

## Dev notes

### Architecture compliance

- **ADR-005** — Scoped Astro styles + ported global CSS. Inventory informs port plan. [architecture.md ADR-005](../planning-artifacts/architecture.md)
- **§12 Migration parity checklist** — Add Visual parity column. [architecture.md §12](../planning-artifacts/architecture.md)

### PRD

- **FR22** — Typography, color, spacing via checklist. [prd.md](../planning-artifacts/prd.md)
- **NFR-V1** — Font loading must not silently harm LCP. [prd.md](../planning-artifacts/prd.md)

### Previous story intelligence

- **3.1–3.7, 4.x, 5.x** — Layout/content parity without global legacy CSS port.
- **7.1** — Motion inventory separate; run **7.1** and **8.1** in parallel if desired.

### File structure (target)

```
docs/migration-parity-checklist.md              # MODIFIED — Visual parity + inventory section
_bmad-output/planning-artifacts/architecture.md # MODIFIED — §12 template column
site/README.md                                  # MODIFIED — FR22 pointer
_bmad-output/implementation-artifacts/8-1-legacy-typography-and-styling-inventory.md
```

### Testing / verification checklist

- [x] Inventory covers all legacy font families (Questrial, MFred, Amatic SC, Montserrat, code stack)
- [x] Route tables include Visual parity aligned with inventory
- [x] No fonts or global CSS added under `site/`
- [x] Gate quartet green

---

## References

- [epics.md — Story 8.1](../planning-artifacts/epics.md)
- Legacy: `src/styles/main.css`, `src/styles/mixins.scss`, `src/assets/fonts/mfred/`
- Astro: `site/src/layouts/BaseLayout.astro`, `site/src/components/**`

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Audited `main.css`, `mixins.scss`, header, home blocks, CV, `post-item.js`, blog/project templates vs Astro scoped CSS.
- Added **§ Legacy typography & styling inventory** (15 rows) with gaps and `global-token` / `component-css` fixes for **8.2** / **8.3**.
- All route tables gained **Visual parity** → **`same`** (blog/projects/core); Prism/Shiki row **`simplified`** for code colors only.
- Confirmed no `site/src/styles/`, no fonts in `site/`, `BaseLayout` has no global CSS import.
- `architecture.md` §12 already included **Visual parity** column + FR22 note — no edit required.
- Gates: check/build/test:schema/test:links → 0.

### File List

- `docs/migration-parity-checklist.md`
- `site/README.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; Epic 8 opened; FR22/NFR-V1 added to PRD. | EP / John (PM) |
| 2026-05-22 | Typography inventory + Visual parity columns; gates green; status → review. | Amelia (bmad-dev-story) |
