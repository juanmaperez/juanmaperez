# Story 8.2: Global design tokens and font loading

**Story ID:** 8.2  
**Story key:** `8-2-global-design-tokens-and-font-loading`  
**Status:** done  
**Epic:** 8 — Typography and visual design parity  
**Depends on:** Story **8.1** (typography inventory + Visual parity **`same`**)  
**Parallel with:** Story **7.2** (motion) — ship **8.2 before** or **with** 7.2 header so MFred/Questrial apply to `SiteHeader`  
**Followed by:** Story **8.3** (per-template visual reconciliation + sign-off)

---

## Story

As a **visitor**,  
I want **body and heading typography to match the legacy site**,  
So that **FR22** brand recognition holds across routes.

---

## Acceptance criteria (from epics)

1. **Given** Story **8.1** inventory rows with **`global-token`** recommended fix  
   **When** `site/src/styles/global.css` (or equivalent) is linked from `BaseLayout.astro`  
   **Then** **Questrial** applies to body copy (`*` / `body`) and **MFred** applies to `h1`–`h6` and `.site-header__brand` per legacy `main.css`.

2. **Given** legacy self-hosted MFred  
   **When** fonts are migrated  
   **Then** `MFred.woff2` (and fallbacks `woff`, `ttf` as needed) live under `site/public/fonts/mfred/` (copied from `src/assets/fonts/mfred/`) with `@font-face` in global CSS — **no** runtime dependency on repo-root `src/assets/` paths in production build.

3. **Given** legacy Google fonts  
   **When** Questrial loads  
   **Then** use Google Fonts link with `display=swap` (or self-host if documented) — match legacy `main.css` import; **Amatic SC** only if inventory/8.3 needs it (optional in 8.2 if unused on MVP routes).

4. **Given** legacy palette  
   **When** tokens are defined  
   **Then** CSS custom properties exist and are used for page background and text on `html`/`body`:

   | Token | Value | Legacy use |
   |-------|-------|------------|
   | `--color-canvas` | `#fbf9f3` | `main.css` body background |
   | `--color-text` | `#323846` | Home links, primary text |
   | `--color-accent` | `#b7c8cb` | CV accents, footer border, contact band |
   | `--color-link` | `#1c768f` | `main.css` `a` (`--secondaryColor`) |
   | `--font-body` | Questrial stack | Body |
   | `--font-heading` | MFred, Oswald, sans-serif | Headings |
   | `--font-mono` | Consolas, Menlo, … | Code (blog — wire in 8.3 or minimal global `pre, code`) |

5. **Given** **NFR-V1**  
   **When** fonts load  
   **Then** `@font-face` uses `font-display: swap`; MFred `woff2` preloaded in `BaseLayout` `<head>` (or documented subset strategy); `site/README.md` documents loading approach and LCP caution for home hero.

6. **Given** **Montserrat** for blog teasers (inventory)  
   **When** 8.2 completes  
   **Then** either (a) add `--font-blog-title` + Google Fonts Montserrat in global CSS for use in **8.3**, or (b) document **defer to 8.3** in Dev Agent Record — body/heading brand fonts must not block on Montserrat.

7. **Given** gate quartet from `site/` on Node **22.12**  
   **When** run after changes  
   **Then** `check`, `build`, `test:schema`, `test:links` → **0**.

8. **Given** scoped component CSS from Epics 3–5  
   **When** globals land  
   **Then** remove redundant `font-family` overrides that fight globals only where they duplicate body stack; **do not** fully reconcile per-template **layout, image crops, or styled-components positioning** (Story **8.3** — home about/works/contact are explicit scope).

---

## Tasks / subtasks

- [x] **Copy font assets** (AC2) — From `src/assets/fonts/mfred/` → `site/public/fonts/mfred/` (`MFred.woff2`, `MFred.woff`, `MFred.ttf` minimum).

- [x] **Create `site/src/styles/global.css`** (AC1, AC4) — Contents:
  - `@font-face` MFred (`font-display: swap`)
  - `:root` tokens (table above)
  - `html, body { background: var(--color-canvas); color: var(--color-text); font-family: var(--font-body); }`
  - `h1–h6 { font-family: var(--font-heading); }`
  - `a { color: var(--color-link); }` (or inherit with link color on `main a`)
  - Optional: `code, pre { font-family: var(--font-mono); }`
  - Base `box-sizing` / minimal reset if needed (avoid fighting Astro defaults)

- [x] **Wire `BaseLayout.astro`** (AC1) — In `<head>` after charset/viewport:
  ```html
  <link rel="preload" href="/fonts/mfred/MFred.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" />
  ```
  Import global CSS:
  ```astro
  import '../styles/global.css';
  ```
  (Astro pattern: frontmatter import or `<link>` to built asset — use project convention.)

- [x] **Questrial + optional Montserrat** (AC3, AC6) — Google Fonts `display=swap`; add Montserrat weights 400/800 if loading in 8.2 for blog.

- [x] **Site header brand** (AC1) — Ensure `.site-header__brand` uses heading font (MFred) via global rule or token; remove `font-weight: 700` as substitute for brand face where MFred applies.

- [x] **Smoke visual** (AC1) — `npm run build && npm run preview`:
  - Home: body Questrial, `h1` MFred visible
  - `/cv/`: section headings MFred
  - `/blog`: body Questrial (teaser Montserrat may wait for 8.3)
  - Computed `font-family` on `body` and `h1` not system-ui

- [x] **Update `site/README.md`** (AC5) — Expand **Typography / FR22**: font paths, preload, NFR-V1, what 8.3 will finish (teaser sizes, glitch).

- [x] **Update checklist** (optional) — `docs/migration-parity-checklist.md` inventory **Notes** on Global/Fonts rows: “8.2 shipped global.css”.

- [x] **Gate quartet** (AC7) — All **0**.

- [x] **Do not** in this story: full template pixel parity (8.3), glitch keyframes (7.2/8.3), sign-off column, change motion code beyond font coordination.

---

## Inventory map (8.1 → 8.2)

| Inventory row | 8.2 action |
|---------------|------------|
| Global | `global.css` + `BaseLayout` link |
| Fonts | `public/fonts/mfred` + Questrial link |
| Header | MFred on brand via global heading/body rules |
| Footer | Inherits body font + accent border token |
| Blog/Project/Home/CV component-css | **Defer** sizing/Montserrat to **8.3** — globals only |

---

## Dev notes

### Architecture compliance

- **ADR-005** — Global CSS + scoped components. [architecture.md ADR-005](../planning-artifacts/architecture.md)  
- **§12** — Visual parity sign-off still **8.3**.  
- **NFR-V1** — `font-display: swap`, preload MFred.

### PRD

- **FR22** — Brand fonts on all routes via layout.  
- **NFR-A1** — Contrast: verify `#323846` on `#fbf9f3` for body text after global apply.

### Previous story intelligence

- **8.1** — No `site/src/styles/` today; all Visual **`same`**. [8-1-legacy-typography-and-styling-inventory.md](./8-1-legacy-typography-and-styling-inventory.md)  
- **7.2** — Glitch CSS may land in `global.css` or `motion.css`; avoid duplicate `@font-face`.

### File structure (target)

```
site/public/fonts/mfred/MFred.woff2
site/public/fonts/mfred/MFred.woff
site/src/styles/global.css
site/src/layouts/BaseLayout.astro
site/README.md
docs/migration-parity-checklist.md   # optional note
```

### Guardrails

1. **No** motion libraries in this story.  
2. **No** Visual parity sign-off (8.3).  
3. Keep component scoped CSS; globals set baseline only.  
4. Fonts served from `site/public/` for stable URLs on GitHub Pages.

### Testing / verification checklist

- [x] `@font-face` resolves (no 404 on `/fonts/mfred/MFred.woff2`)
- [x] Body and headings use correct families on `/`, `/cv/`, `/blog`
- [x] Canvas background `#fbf9f3` on all pages
- [x] Gate quartet green

---

## References

- [epics.md — Story 8.2](../planning-artifacts/epics.md)  
- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md) — § Legacy typography inventory  
- Legacy: `src/styles/main.css`, `src/assets/fonts/mfred/`  
- Astro: [styling](https://docs.astro.build/en/guides/styling/#external-css)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Copied MFred woff2/woff/ttf to `site/public/fonts/mfred/`.
- Added `site/src/styles/global.css` with tokens, `@font-face`, body/heading/link/mono rules, `.site-header__brand` MFred styling.
- `BaseLayout.astro`: import global CSS; preload MFred; Google Fonts Questrial + Montserrat (`display=swap`).
- `SiteHeader.astro`: removed `font-weight: 700` on brand (MFred via global).
- Montserrat: `--font-blog-title` token loaded; teaser styles deferred to **8.3**.
- Amatic SC deferred (unused on MVP routes).
- Build verify: `dist/fonts/mfred/*` present; global CSS inlined in HTML with Questrial/MFred vars.
- Gates: check/build/test:schema/test:links → 0.

### File List

- `site/public/fonts/mfred/MFred.woff2`
- `site/public/fonts/mfred/MFred.woff`
- `site/public/fonts/mfred/MFred.ttf`
- `site/src/styles/global.css`
- `site/src/layouts/BaseLayout.astro`
- `site/src/components/nav/SiteHeader.astro`
- `site/README.md`
- `docs/migration-parity-checklist.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created from 8.1 inventory; status → ready-for-dev. | create-story |
| 2026-05-22 | Global CSS, fonts, tokens; gates green; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | Code review: clean; gates re-verified; status → done. | code-review |

---

### Review Findings

_Code review 2026-05-22 — story `8-2-global-design-tokens-and-font-loading`. Gates re-run from `site/`: check/build/test:schema/test:links → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch` or `decision-needed` items.

| AC | Verdict |
|----|---------|
| AC1 | `global.css` + `BaseLayout` import; Questrial on `body`, MFred on `h1`–`h6` and `.site-header__brand`; brand `font-weight: 700` removed |
| AC2 | `site/public/fonts/mfred/{woff2,woff,ttf}`; `@font-face` without repo-root `src/assets` paths |
| AC3 | Google Fonts Questrial + Montserrat with `display=swap`; Amatic SC deferred (unused on MVP) |
| AC4 | Palette and font tokens on `:root`; canvas/text on `html`/`body`; mono on `code, pre` |
| AC5 | `font-display: swap`; MFred `woff2` preload + `crossorigin`; `site/README.md` documents loading / LCP note |
| AC6 | `--font-blog-title` + Montserrat 400/800 in layout (teaser sizes → **8.3**) |
| AC7 | Quartet green (re-run at CR) |
| AC8 | No broad removal of scoped `font-weight`; no template size reconciliation (correct scope) |

**defer (informational):**

- Legacy `* { font-family: Questrial }` vs Astro `body` only — inheritance covers normal content; no change required.
- Link color scoped to `main a` (not global `a`) — header/nav links stay body text color, matching legacy header styling; in-main links get `#1c768f`.
- `--color-accent` token defined but not wired to footer/CV/home bands yet — **8.3**; scoped hex literals remain.
- Montserrat requested on every page for blog token readiness — acceptable per AC6(a); **8.3** may narrow to blog routes or self-host.
- Optional: `preconnect` to `fonts.googleapis.com` if font latency becomes measurable.
- `blog/[...slug].astro` still uses `ui-monospace` on code — reconcile with `--font-mono` in **8.3** / **4.5** follow-up.
