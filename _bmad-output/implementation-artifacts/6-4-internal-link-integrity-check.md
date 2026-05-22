# Story 6.4: Internal link integrity check

**Story ID:** 6.4  
**Story key:** `6-4-internal-link-integrity-check`  
**Status:** done  
**Epic:** 6 — Discovery, redirects, analytics, and link integrity  
**Depends on:** Stories **4.1–5.1** (MVP routes in `dist/`), **6.2** (sitemap optional seed list), **6.3** (`redirectMap` — redirect source paths must resolve in `dist/`)  
**Followed by:** Story **6.5** (analytics); Epic 6 retrospective optional

---

## Story

As a **maintainer**,  
I want **MVP routes checked for broken internal links**,  
So that **FR21** is met.

---

## Acceptance criteria (from epics)

1. **Given** a successful `npm run build` in `site/`  
   **When** `npm run test:links` runs  
   **Then** it exits **0** and reports **zero broken internal links** across all HTML under `dist/` (or prints each broken `href` with source file and exits **1**).

2. **Given** the MVP route set (home, CV, blog index, 9 posts, 3 categories, 5 projects, `/404`, `/robots.txt` — **not** a failure target for HTML link crawl)  
   **When** the checker runs  
   **Then** every **internal** `href` and in-page `src` (if present) pointing to same-origin paths resolves to an existing built file or known **redirect source** from `site/src/config/redirects.ts`.

3. **Given** `.github/workflows/deploy-astro-pages.yml`  
   **When** CI runs on push/PR  
   **Then** a step runs **`npm run test:links` after `npm run build`** (FR21 gate); invalid links **block deploy** the same way schema validation blocks bad frontmatter (Story 2.4 pattern).

4. **Given** `npm run check`, `npm run build`, `npm run test:schema`, and `npm run test:links`  
   **When** run from `site/` on Node **22.12**  
   **Then** all exit **0** on current mainline content.

5. **Given** a deliberate broken internal link introduced in a built page (local negative test)  
   **When** `npm run test:links` runs  
   **Then** it exits **non-zero** with a clear message naming the broken URL and originating HTML file (prove the gate can fail).

---

## Tasks / subtasks

- [x] **Create `site/scripts/verify-internal-links.mjs`** (AC1, AC2, AC5) — Node script (no new npm deps unless justified). Pattern: mirror `scripts/verify-content-schema.mjs` (spawn/build optional, exit codes, clear stderr).

  **Algorithm (recommended):**
  1. Require `site/dist/` exists; if missing, print `Run npm run build first` and exit 1.
  2. Walk all `dist/**/*.html` files.
  3. Extract internal URLs from `href="..."` and `src="..."` (regex or lightweight parse). **Include:**
     - Root-relative paths: `/blog`, `/projects/umaicha`
     - **Exclude:** `mailto:`, `http://`, `https://`, `//`, `#fragment`-only, `data:`, empty.
  4. **Resolve** each path against `dist/` using GitHub Pages static conventions:
     - `/` → `dist/index.html`
     - `/path` → try `dist/path/index.html`, then `dist/path.html`
     - `/path/` → `dist/path/index.html`
  5. **Allow** paths that are keys in `redirectMap` (import or duplicate-read `src/config/redirects.ts` via dynamic import from script — use `node --experimental-strip-types` or read redirect keys from a small shared JSON export; **simplest:** import `redirectMap` from `../src/config/redirects.ts` using Node 22 native TS if available, else inline-read the one known redirect `/projects/colossus` + document sync requirement — **prefer** `import { redirectMap } from '../src/config/redirects.ts'` in `.mjs` with `node --import tsx` **avoid** — use **fs read + regex** on redirects.ts keys or export `REDIRECT_SOURCES` array from redirects.ts for the script to import after adding:
     ```ts
     export const redirectSources = Object.keys(redirectMap);
     ```
  6. On failure: print table `sourceHtml → brokenHref` and `process.exit(1)`.

- [x] **Add `npm run test:links`** (AC1, AC4) — In `site/package.json`:
  ```json
  "test:links": "node scripts/verify-internal-links.mjs"
  ```
  Document: must run **after** `npm run build`.

- [x] **CI gate** (AC3) — In `.github/workflows/deploy-astro-pages.yml`, after `Build` and **before** `Upload Pages artifact`:
  ```yaml
  - name: Internal link integrity (FR21)
    run: npm run test:links
    working-directory: site
  ```
  Update workflow header comment to mention FR21.

- [x] **Negative test** (AC5) — In `verify-internal-links.mjs`, optional self-test mode **or** document manual probe:
  - Temporarily add `<a href="/this-route-does-not-exist">` to `404.astro`, build, run `test:links`, expect exit 1, revert.
  - Record command output in Dev Agent Record (do not commit broken link).

- [x] **Update `site/README.md`** (AC3, AC4) — One paragraph: FR21 gate = `npm run test:links` after build; CI runs it on every PR/push.

- [x] **Update `docs/migration-parity-checklist.md`** (AC2) — Add **FR21** bullet: Story **6.4** — `npm run test:links` crawls `dist/`; release checklist step automated in CI.

- [x] **Fix any broken links found** (AC1) — If the checker reports failures on real content, fix templates/components (common misses: `/cv` vs `/cv/`, project paths, pagination). Re-run until green.

- [x] **Do not** in this story: analytics (6.5), external URL validation (optional warn-only out of scope), markdown source link check (built HTML is source of truth), Playwright E2E framework.

### Review Findings

_Code review 2026-05-22 — story `6-4-internal-link-integrity-check`. Gates re-run: check/build/test:schema/test:links → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch` or `decision-needed` items.

| AC | Verdict |
|----|---------|
| AC1 | `test:links` exit 0; 22 HTML files; 0 broken internal links |
| AC2 | Routes, `/_astro/*`, `/images/*`, favicons resolve; `/projects/colossus` allowed via redirect map |
| AC3 | CI step after build, before artifact upload |
| AC4 | Full quartet green |
| AC5 | Negative probe documented (exit 1 on fake href) |

**defer (informational):** `loadRedirectSources()` parses `redirects.ts` via regex; `redirectSources` export exists but script does not import it — acceptable for single redirect today; import export if map grows.

---

## Current baseline (pre-story)

| Item | State |
|------|--------|
| FR21 automation | **None** — manual release checklist only |
| `package.json` scripts | `check`, `build`, `test:schema` — no `test:links` |
| CI workflow | `check` → `build` → upload (no link step) |
| Known internal links | `site.config.ts` nav (`/`, `/cv`, `/blog`, mailto contact); teasers use `entry.data.path`; HomeWorks uses `project.data.path`; 404 → `/`, `/blog` |
| Redirect page | `dist/projects/colossus/index.html` exists after 6.3 |
| External links | LinkedIn, Instagram, Twitter, etc. — **out of scope** for AC1 |

### MVP internal link inventory (spot-check during implementation)

| Source | Example hrefs |
|--------|-----------------|
| `SiteHeader.astro` | `/`, `/cv`, `/blog`, `mailto:…` |
| `HomeHero.astro` | `/blog`, external social |
| `HomeAbout.astro` | `/cv` |
| `HomeWorks.astro` | `/projects/*` (5 paths) |
| `BlogPostTeaser.astro` | post `path`, category path |
| `BlogPostNav.astro` | prev/next `path` |
| `BlogPagination.astro` | `/blog`, `/blog/page/N` (none today) |
| `404.astro` | `/`, `/blog` |
| Post detail | category link via `getCategoryPath` |

**Expected result:** **0** broken internal links after build.

---

## Legacy vs MVP

| Legacy | Story 6.4 |
|--------|-----------|
| Manual release pass | Scripted `test:links` + CI |
| Gatsby runtime | Static `dist/` filesystem resolve |

---

## Dev notes

### Architecture compliance

- **FR21** — `astro check` + link checker on `dist/` [architecture.md §14](../planning-artifacts/architecture.md)
- **§11 CI** — Extend existing Pages workflow; no new secrets.

### PRD

- **FR21** — No broken internal links on MVP routes; verified by automated crawl or documented manual pass → **automated** in this story. [prd.md](../planning-artifacts/prd.md)

### Previous story intelligence

- **2.4** — CI step pattern: named FR step, runs before deploy artifact, blocks on exit 1. [2-4-ci-gate-schema-validation-on-every-build.md](./2-4-ci-gate-schema-validation-on-every-build.md)
- **6.3** — `/projects/colossus` must resolve (redirect HTML in `dist/`). [6-3-redirect-map-for-url-changes.md](./6-3-redirect-map-for-url-changes.md)
- **6.2** — Sitemap lists trailing-slash URLs; checker should accept both `/path` and `/path/` if both resolve to same file (filesystem resolve handles this).
- **3.2** — Nav must not link to non-existent routes; all nav hrefs should pass checker.

### Implementation hints

- **No new dependency** preferred — regex on HTML is enough for ~22 pages.
- **Trailing slash:** try both `path/index.html` and `path.html` when resolving.
- **`import.meta.url`** for `siteRoot` — same as `verify-content-schema.mjs`.
- **Export `redirectSources`** from `redirects.ts` if script cannot import TS cleanly from `.mjs`.

### File structure (target)

```
site/
├── scripts/verify-internal-links.mjs   # NEW
├── src/config/redirects.ts             # MODIFIED — optional redirectSources export
├── package.json                        # MODIFIED — test:links
.github/workflows/deploy-astro-pages.yml # MODIFIED — FR21 step
site/README.md
docs/migration-parity-checklist.md
```

### Guardrails

1. **No** analytics (6.5).
2. **Do not** fail on external `https://` links (skip).
3. **Do not** change post/project `path` unless checker finds a real bug.
4. Run full gate quartet after implementation: `check`, `build`, `test:schema`, `test:links`.

### Testing / verification checklist

- [x] `npm run test:links` → 0 on clean tree
- [x] CI workflow includes FR21 step after build
- [x] Negative probe exits 1
- [x] All four scripts green

---

## References

- [epics.md — Story 6.4](../planning-artifacts/epics.md) (FR21)
- [architecture.md §14 FR21](../planning-artifacts/architecture.md)
- [2-4-ci-gate-schema-validation-on-every-build.md](./2-4-ci-gate-schema-validation-on-every-build.md)
- [migration-parity-checklist.md](../../docs/migration-parity-checklist.md)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- `site/scripts/verify-internal-links.mjs` — crawls `dist/**/*.html`; resolves routes + assets (`/_astro/*`, `/images/*`, favicons); skips external/mailto; allows `redirectSources` from `redirects.ts`.
- `npm run test:links` — **22** HTML files, **0** broken links.
- CI: `Internal link integrity (FR21)` after build (Story 2.4 pattern).
- Negative probe: `404.html → /__broken-link-probe__` exit 1 (reverted; not committed).
- Gates: `check` / `build` / `test:schema` / `test:links` → 0.

### File List

- `site/scripts/verify-internal-links.mjs` — NEW
- `site/package.json` — `test:links` script
- `site/src/config/redirects.ts` — `redirectSources` export
- `.github/workflows/deploy-astro-pages.yml` — FR21 step
- `site/README.md` — FR21 CI note
- `docs/migration-parity-checklist.md` — FR21 bullet

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created from sprint backlog; status → ready-for-dev. | create-story |
| 2026-05-22 | FR21 link checker + CI gate; 22 HTML files OK; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | Code review: clean; AC1–5 verified; status → done. | code-review |
