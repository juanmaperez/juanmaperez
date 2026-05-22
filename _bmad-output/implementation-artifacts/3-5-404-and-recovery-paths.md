# Story 3.5: 404 and recovery paths

**Story ID:** 3.5  
**Story key:** `3-5-404-and-recovery-paths`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 3.1 (`BaseLayout.astro`), Story 3.2 (`SiteHeader` — recovery via global nav + in-page links)  
**Followed by:** Story 3.7 (404 included in responsive/a11y smoke), Story 4.1 (`/blog` link stops 404ing)

---

## Story

As a **visitor**,  
I want **a helpful 404** with links home or to blog index,  
So that **journeys** recover gracefully.

---

## Acceptance criteria (from epics)

1. **Given** the Astro static build  
   **When** `npm run build` completes  
   **Then** `site/dist/404.html` exists at the **artifact root** (Astro convention for `src/pages/404.astro` on static output) so **GitHub Pages** can serve it for unknown URLs with HTTP 404.

2. **Given** a visitor hits an unknown path on the deployed host (or opens `/404` directly)  
   **When** the branded not-found page renders  
   **Then** it uses `BaseLayout` (global header/nav intact) and shows:
   - A prominent **`<h1>404</h1>`** (legacy heading — satisfies one-`h1`-per-page policy)
   - Legacy tagline copy: **“Be focused or …”** with a **Home** link to `/`
   - An additional **Blog** recovery link to `/blog` (epics AC — legacy only linked home; **both** are required)

3. **Given** legacy visual branding  
   **When** the page renders  
   **Then** the full-viewport background uses `404.jpg` copied to `site/public/images/404.jpg` (CSS `background-image` or equivalent), centered cover, with recovery text readable (contrast/stacking via overlay or text shadow if needed).

4. **Given** legacy SEO  
   **When** the page is built  
   **Then** `BaseLayout` receives `title="Juanma Perez | 404"` (legacy `404.js`; no custom description required — default `siteConfig.description` fallback is fine).

5. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0** (Story 2.4 CI gate unchanged).

6. **Given** viewport width **≥ 320px**  
   **When** the 404 page is inspected  
   **Then** it does not introduce horizontal scroll (UX-DR4); scale the large “404” display type responsively (legacy used `font-size: 300px` — unsafe on mobile).

---

## Tasks / subtasks

- [x] **Copy background image** (AC3) — `src/assets/images/404.jpg` → `site/public/images/404.jpg` (~1 MB legacy asset; acceptable for error page until Epic 5 image optimization).

- [x] **Create `site/src/pages/404.astro`** (AC1–AC4) — Use `BaseLayout` + scoped styles. Minimum structure:
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro';
  ---
  <BaseLayout title="Juanma Perez | 404">
    <section class="not-found" aria-labelledby="not-found-heading">
      <h1 id="not-found-heading">404</h1>
      <p class="not-found__message">
        Be focused or <a href="/">go Home</a> or <a href="/blog">browse the blog</a>.
      </p>
    </section>
  </BaseLayout>

  <style>
    .not-found {
      min-height: calc(100vh - 4rem); /* leave room for header */
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background: url('/images/404.jpg') center / cover no-repeat;
      color: #fff;
      text-align: center;
    }
    .not-found h1 {
      font-size: clamp(4rem, 25vw, 18.75rem);
      line-height: 1;
      text-transform: uppercase;
      margin: 0 0 1rem;
    }
    .not-found__message {
      font-size: clamp(1.125rem, 4vw, 2.25rem);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      margin: 0;
    }
    .not-found a {
      color: inherit;
      text-decoration: underline;
    }
    .not-found a:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  </style>
  ```
  Adjust copy punctuation to read naturally while keeping **“Be focused or”** and **“go Home”** legacy phrases. Blog clause is the epics-required addition.

- [x] **Verify GitHub Pages 404 wiring** (AC1) — No workflow change expected: deploy uploads `site/dist` and GitHub Pages automatically uses root `404.html` for missing paths. Document in completion notes:
  - Local: `npm run build` → confirm `site/dist/404.html` exists.
  - Optional local spot-check: `npx serve site/dist -s` (SPA mode) or open `dist/404.html` directly in browser.
  - Production: after deploy, request a nonsense URL (e.g. `/this-route-does-not-exist`) and confirm branded page + **404 status** (browser devtools Network tab).

- [x] **Migration parity checklist** (AC2) — Update `docs/migration-parity-checklist.md` **Not found** row: Motion = **n/a**, Islands = **N**, Notes = “Story 3.5: static 404.html; blog recovery link added per epics (legacy home-only).”

- [x] **Validation gates** (AC5) — From `site/`:
  ```bash
  cd site
  npm run check
  npm run build
  npm run test:schema
  test -f dist/404.html && echo "OK 404.html"
  ```

- [x] **Manual smoke** (AC2, AC6) — Tab to Home and Blog links; Enter activates; 320px width no horizontal scroll; header nav still works.

- [x] **Do not** add client JS, redirects config, or custom server middleware — static GitHub Pages only.

### Review Findings

_Generated by `code-review` workflow on 2026-05-22. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (3) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] `/blog` recovery link 404s until **4.1** — href correct; same Epic 3 deferral as nav.
- [x] [Review][Defer] Post-deploy HTTP **404** on nonsense URL — confirm on GitHub Pages (local `dist/404.html` / `/404` may be 200).
- [x] [Review][Defer] `404.jpg` ~984 KB — acceptable for rare error page until Epic 5 optimization.

**Dismissed** (8):
- AC1 `dist/404.html` at artifact root — **pass** (`test -f` OK; 3-page build).
- AC2 `BaseLayout`, `<h1>404</h1>`, “Be focused or”, Home + Blog links — **pass**.
- AC3 `/images/404.jpg` cover background — **pass**.
- AC4 `title="Juanma Perez | 404"` — **pass**; default description fallback OK.
- AC5 gates 0/0/0 — **pass**.
- AC6 `clamp()` sizing, `max-width: 100%`, no `100vw` — **pass**.
- `text-shadow` on white text — story §Edge cases allows; improves contrast — **pass**.
- No workflow / `content.config` / client JS changes — guardrails respected.

---

## Legacy vs epics delta

| Item | Legacy (`src/pages/404.js`) | This story (epics) |
|------|----------------------------|-------------------|
| Home link | ✅ `<Link to="/">go Home</Link>` | ✅ `href="/"` |
| Blog link | ❌ not present | ✅ **required** `href="/blog"` |
| Background | `404.jpg` full viewport | ✅ same asset in `public/` |
| Layout | Gatsby `Layout` + menu | `BaseLayout` + `SiteHeader` |
| `h1` | `404` | ✅ keep `404` as page `h1` |
| Font | `MFred` on `<p>` | **Omit** custom font (consistent with 3.3/3.4) |

---

## Dev notes

### Architecture compliance

- **§5.1 Routing** — `src/pages/404.astro` → build output `404.html`. [architecture.md §5.1](../planning-artifacts/architecture.md)
- **§11 CI/CD** — Artifact path `site/dist`; no change to workflow. [architecture.md §11](../planning-artifacts/architecture.md)
- **GitHub Pages** — Host serves `404.html` for unknown paths on static sites; no `_redirects` file needed. [Astro: custom 404](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page), [GitHub Pages 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

### PRD / UX requirements

- **User journey recovery** — “404 is friendly and routes back to home or blog index.” [prd.md § User journeys](../planning-artifacts/prd.md)
- **MVP scope** — PRD lists **404** as target page alongside home and CV.
- **UX-DR2** — Semantic `<section>` + single `h1`.
- **UX-DR4 / FR15** — No horizontal scroll; responsive type instead of fixed `300px` / `100vw`.
- **UX-DR5** — `:focus-visible` on recovery links (match `SiteHeader` pattern).

### Story 3.1 / 3.2 intelligence

- Use **`BaseLayout`** so visitors keep global nav (additional recovery beyond in-page links). [3-1-base-layout-and-document-shell.md](./3-1-base-layout-and-document-shell.md)
- **`SiteHeader`** already exposes Home, CV, Blog — 404 body links reinforce primary journeys. [3-2-global-header-and-navigation.md](./3-2-global-header-and-navigation.md)
- Do **not** add a second `<h1>` in the layout/header.

### Deferred route behavior

- **`/blog` still 404s** until Story **4.1** — same intentional Epic 3 deferral as nav Blog link. The recovery link is **correct href** for release; document in completion notes (not FR21 regression during development).
- Direct navigation to **`/404`** may render the branded page with **200** on some local servers — **host-level** unknown URLs are what must return HTTP **404** on GitHub Pages; call out in manual test notes.

### Legacy parity (do **NOT** copy)

| Legacy | Astro MVP |
|--------|-----------|
| `width: 100vw` + `height: 100vh` on wrapper | `min-height` + `max-width: 100%` + `overflow-x: hidden` |
| `font-size: 300px` fixed | `clamp()` responsive sizing |
| Gatsby `<Link>` | `<a href>` |
| Full-screen outside standard content width | Content inside `<main>` below header |

### File structure (target)

```
site/
├── public/images/404.jpg     # NEW
└── src/pages/404.astro       # NEW
docs/migration-parity-checklist.md  # MODIFIED — Not found row
```

No new components directory required (page is small); optional `NotFound.astro` only if the dev agent prefers extraction — not required.

### Guardrails

1. **No** `client:*` or client-side redirect scripts.
2. **No** global CSS / Tailwind / MFred font.
3. **No** `astro.config` redirects map (Story 6.3 owns intentional URL changes).
4. **No** changes to `content.config.ts`, collections, or CI workflow steps.
5. **Do not** remove or alter `index.astro` / `cv.astro`.
6. **Do not** implement blog index — only link to `/blog`.
7. **Do not** edit legacy `src/pages/404.js`.
8. **One `<h1>`** — the digits “404”, not “Page not found” as h1.
9. **Do not** add unit tests — build artifact check + manual smoke suffice.
10. **Preserve** legacy tone (“Be focused or”) — blog link is additive, not a copy rewrite.

### Edge cases

- **Header + full-viewport hero** — `min-height: calc(100vh - …)` approximates legacy full screen below header; tune offset in completion notes if visual QA shows gap.
- **Image LCP on 404** — Large JPG acceptable for rare error views; note for future optimization.
- **`aria-labelledby`** — Section names the `h1` for screen readers.
- **Color contrast** — White text on photo may need subtle `text-shadow` or semi-transparent overlay if contrast fails spot-check (WCAG AA on error page is good practice; document choice in README or completion notes).

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
test -f dist/404.html
grep -c '<h1' dist/404.html        # expect 1
grep 'href="/"' dist/404.html
grep 'href="/blog"' dist/404.html
```

**Manual (post-deploy recommended):** open `https://juanmaperez.dev/nonexistent-path` → branded 404, network status 404, links work.

---

## References

- [Epics — Story 3.5](../planning-artifacts/epics.md)
- [PRD — User journey recovery, MVP 404](../planning-artifacts/prd.md)
- [Architecture §5.1, §11](../planning-artifacts/architecture.md)
- [Story 3.1 — BaseLayout](./3-1-base-layout-and-document-shell.md)
- [Story 3.2 — SiteHeader](./3-2-global-header-and-navigation.md)
- [Migration parity checklist — Not found](../../docs/migration-parity-checklist.md)
- [Legacy: `src/pages/404.js`](../../src/pages/404.js)
- [Astro: Custom 404 page](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer.

### Debug log references

- Node 22.12.0; build → **3 pages** (`index`, `cv`, `404`).
- Artifact: `site/dist/404.html` at dist root (GitHub Pages convention).

### Completion notes list

- **`site/public/images/404.jpg`** — copied from legacy (~984 KB).
- **`site/src/pages/404.astro`** — BaseLayout, `<h1>404</h1>`, Home + Blog recovery links, `clamp()` type, `text-shadow` for contrast.
- **`docs/migration-parity-checklist.md`** — Not found row updated.
- Gates: `check` / `build` / `test:schema` → 0; `test -f dist/404.html` OK.
- `/blog` recovery href present; route still 404 until **4.1**.
- Production HTTP 404 on nonsense URLs: verify post-deploy (Network tab).

### File list

**Added:**
- `site/public/images/404.jpg`
- `site/src/pages/404.astro`

**Modified:**
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-5` → `review`
- `_bmad-output/implementation-artifacts/3-5-404-and-recovery-paths.md` (this file)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). GitHub Pages `404.html` contract, BaseLayout + legacy 404.jpg branding, epics-required `/blog` recovery (legacy home-only), responsive clamp vs 300px/100vw, 10 guardrails. | bmad-create-story |
| 2026-05-22 | 404 page + asset; parity checklist; gates green. | Amelia |
| 2026-05-22 | Code review: clean (0 patch, 3 defer); status → done. | Amelia (review) |
