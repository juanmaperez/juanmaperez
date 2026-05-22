# Story 6.3: Redirect map for URL changes

**Story ID:** 6.3  
**Story key:** `6-3-redirect-map-for-url-changes`  
**Status:** done  
**Epic:** 6 — Discovery, redirects, analytics, and link integrity  
**Depends on:** Stories **1.2** (`site` + `base`), **2.2–2.3** (stable `path` frontmatter), **4.1–5.1** (MVP routes), **6.1** (canonical URLs), **6.2** (sitemap — trailing-slash policy must align with redirects)  
**Followed by:** Story **6.4** (link integrity — may crawl redirect sources); optional trailing-slash / sitemap alignment cleanup

---

## Story

As a **returning visitor**,  
I want **301 redirects** when paths change,  
So that **FR12** and SEO goals hold.

---

## Acceptance criteria (from epics)

1. **Given** every **intentional** legacy → Astro URL difference documented in `docs/migration-parity-checklist.md`  
   **When** `site/` is built  
   **Then** each documented old path is listed in a **version-controlled** redirect map and wired into `astro.config.mjs` `redirects`.

2. **Given** `output: 'static'` on GitHub Pages (no SSR adapter)  
   **When** `npm run build` completes  
   **Then** Astro emits redirect routes for every `redirects` entry (verify `dist/` — redirect HTML or route artifacts per Astro 6 docs); map uses **`status: 301`** object form where supported.

3. **Given** content `path` frontmatter was **not** renamed during migration (Stories 2.2, 2.3, 4.3, 5.1)  
   **When** auditing redirects  
   **Then** **no** redirects change post/project slugs — only **aliases** (trailing slashes, known wrong guesses, legacy host quirks).

4. **Given** project folder `colossus` vs public `path` `/projects/colossus-bets`  
   **When** a visitor requests `/projects/colossus`  
   **Then** they are redirected to `/projects/colossus-bets` (301).

5. **Given** canonical policy from Story **6.1** (`entry.data.path` and `canonicalUrl()` — **no trailing slash** on posts/projects) and Story **6.2** sitemap (currently emits **trailing-slash** `<loc>` URLs)  
   **When** redirects are applied  
   **Then** at minimum, **trailing-slash variants** of indexable content paths redirect to the **non-trailing** canonical path (e.g. `/blog/how-javascript-engine-works/` → `/blog/how-javascript-engine-works`); hub routes (`/`, `/blog`, `/cv`, categories) documented in checklist **Notes** column.

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/` on Node **22.12**  
   **Then** all exit **0**; spot-check built redirect targets for `/projects/colossus` and one blog post trailing-slash pair.

---

## Tasks / subtasks

- [x] **Audit legacy vs Astro URLs** (AC1, AC3) — Walk `docs/migration-parity-checklist.md` tables; for each row compare **Legacy path** vs built Astro URL (from `dist/` or `path` frontmatter). Record findings in a new checklist subsection **## Redirect map (FR12)** with columns: `From (redirect source) | To (canonical) | Reason | Story 6.3`.

  **Expected findings (pre-audit):**

  | From | To | Reason |
  |------|-----|--------|
  | `/projects/colossus` | `/projects/colossus-bets` | Folder slug ≠ `path` frontmatter (Story 2.3) |
  | `/{path}/` | `{path}` | Trailing-slash alias for each post/project `path` and hub/category URLs where canonical omits slash |
  | *(none)* | — | Post `path` values unchanged vs legacy checklist |

  **Do not** add redirects that change canonical slugs (e.g. never redirect `/projects/colossus-bets` → elsewhere).

- [x] **Create `site/src/config/redirects.ts`** (AC1, AC2) — Single source of truth exported as `redirectMap` for `astro.config.mjs`:

  ```ts
  /** FR12 — version-controlled redirect map. Keys = source paths (no domain). */
  export const redirectMap: Record<string, string | { status: number; destination: string }> = {
    '/projects/colossus': { status: 301, destination: '/projects/colossus-bets' },
    // Add trailing-slash → canonical pairs from audit (posts, projects, /blog/, /cv/, categories, …)
  };
  ```

  **Implementation options (pick one, document in Dev Agent Record):**
  - **A (preferred):** Small build-time helper `site/scripts/collect-redirect-paths.mjs` reads `src/content` globs + hub list, appends `path + '/'` → `path` for each indexable route (keeps map in sync when content grows).
  - **B:** Hand-maintained entries in `redirects.ts` if script is overkill for 9 posts + 5 projects + hubs.

  **Guardrail:** Astro does **not** support paired keys like `'/foo'` and `'/foo/'` as one entry — each source path must be explicit ([Astro redirects docs](https://docs.astro.build/en/reference/configuration-reference/#redirects)).

- [x] **Wire `site/astro.config.mjs`** (AC2) — Import and spread:

  ```js
  import { redirectMap } from './src/config/redirects.ts';

  export default defineConfig({
    // …existing site, base, integrations…
    redirects: redirectMap,
  });
  ```

  Preserve existing `sitemap` integration unchanged unless audit proves a redirect target mismatch.

- [x] **Document static-host behavior** (AC2) — In `site/README.md` (short) + completion notes: GitHub Pages + `output: 'static'` without adapter → Astro generates **redirect route pages** (see [routing redirects](https://docs.astro.build/en/guides/routing/#configured-redirects)); configured status is **301** for GET. True server-level `Location` headers may require a host that honors them — acceptable MVP per architecture §5.3 (`astro.config` preferred over Netlify-style `_redirects`).

- [x] **Update `docs/migration-parity-checklist.md`** (AC1) — Add **Redirect map (FR12)** section listing every `redirectMap` key with rationale; add **FR12** bullet next to FR10/FR11 in SEO header.

- [x] **Verify build output** (AC4, AC5, AC6) — After `npm run build`:

  ```bash
  # Confirm redirect routes exist (exact paths depend on Astro version — list dist for redirect artifacts)
  find dist -name '*.html' | head -30
  # Manual: request preview paths or inspect redirect HTML for /projects/colossus
  cd site && npm run preview  # optional curl -I if server returns headers
  ```

  Record redirect count and sample `From → To` in Dev Agent Record.

- [x] **Do not** in this story: analytics (6.5), link crawler (6.4), change post/project `path` frontmatter, remove 6.2 sitemap (optional follow-up: filter or `serialize` to non-trailing URLs — **not required** for 6.3 AC).

### Review Findings

_Code review 2026-05-22 — story `6-3-redirect-map-for-url-changes`. Gates re-run: check/build/test:schema → 0._

| Layer | Result |
|-------|--------|
| Blind Hunter | Focused map; version-controlled `redirects.ts`; colossus redirect verified in `dist/` |
| Edge Case Hunter | Trailing-slash → non-trailing omitted due to Astro `path/index.html` conflict (build-tested); documented |
| Acceptance Auditor | AC1–4, AC6 met; AC5 **defer** (see below); AC2 uses meta-refresh HTML on static GH Pages (expected per story) |

**defer — AC5 trailing-slash redirects:** Not in `redirectMap` — Astro fails when redirect source matches prerendered page. Mitigation: GH Pages serves both `/path` and `/path/`; 6.1 canonicals use non-trailing `path`. Follow-up: align sitemap `<loc>` shape (6.2) or host policy if strict parity required.

**patch (applied in CR):** `site/README.md` — README no longer implied trailing-slash entries exist in `redirectMap`.

---

## Current baseline (pre-story)

| Item | State |
|------|--------|
| `astro.config.mjs` | `redirects` **unset** |
| Content URLs | Post/project `path` frontmatter **matches** legacy checklist (no slug renames) |
| Known alias | `/projects/colossus` (folder name) ≠ public `/projects/colossus-bets` |
| Trailing slashes | Sitemap `<loc>` uses trailing slash; 6.1 canonicals on content pages use `path` **without** trailing slash; hubs use `Astro.url.pathname` |
| Legacy Gatsby | No `createRedirect` in `gatsby-node.js` — paths from `frontmatter.path` only |
| GitHub Pages | No `_redirects` file; use Astro `redirects` map |

---

## Legacy vs MVP

| Legacy | Story 6.3 |
|--------|-----------|
| Stable `frontmatter.path` | Same paths in Astro collections — redirects only for **aliases** |
| Implicit trailing-slash tolerance | Explicit `redirectMap` + checklist rows |
| — | `/projects/colossus` → `/projects/colossus-bets` |

---

## Dev notes

### Architecture compliance

- **§5.3 Redirects** — `astro.config` `redirects` map; every intentional change → checklist row. [architecture.md §5.3](../planning-artifacts/architecture.md)
- **§10** — Redirect targets must match **canonical** URLs from 6.1 (`canonicalUrl` / `path` frontmatter).

### PRD

- **FR12** — 301 redirects for URLs that intentionally change. [prd.md](../planning-artifacts/prd.md)
- Migration PRD: “matching slugs **or redirects**” — slugs already match; redirects cover aliases only.

### Previous story intelligence

- **6.2** — Sitemap trailing-slash URLs; 6.3 redirects trailing → non-trailing canonicals (aligns with 6.1, not with sitemap loc shape yet). [6-2-sitemap-generation.md](./6-2-sitemap-generation.md)
- **6.1** — Do not weaken `noindex` on `/404`. [6-1-per-page-title-description-and-open-graph.md](./6-1-per-page-title-description-and-open-graph.md)
- **2.3 / 5.1** — Never rename `colossus/` folder; redirect wrong URL instead. [2-3-migrate-project-case-study-markdown.md](./2-3-migrate-project-case-study-markdown.md)
- **4.3** — Do not change post `path` values. [4-3-blog-post-detail-pages.md](./4-3-blog-post-detail-pages.md)
- **3.4** — Legacy `/cv/` vs Astro `/cv` — include in audit. [3-4-cv-page-parity.md](./3-4-cv-page-parity.md)

### Astro / GitHub Pages constraints

- `redirects` keys are **static strings** (no dynamic `[...slug]` redirect to different dynamic shape unless Astro allows matching pattern — only use patterns from official docs if needed).
- **Trailing slash:** Astro docs: `'/product1/'` and `'/product1'` are **not** auto-linked — list both explicitly in map **only where** a real alias exists.
- **Static build:** Verify [configuration `redirects`](https://docs.astro.build/en/reference/configuration-reference/#redirects) and [`build.redirects`](https://docs.astro.build/en/reference/configuration-reference/#buildredirects) defaults for `output: 'static'`.

### File structure (target)

```
site/
├── astro.config.mjs           # MODIFIED — redirects: redirectMap
├── src/config/redirects.ts    # NEW — version-controlled map
├── scripts/collect-redirect-paths.mjs  # OPTIONAL — generate trailing-slash pairs
docs/migration-parity-checklist.md  # MODIFIED — Redirect map section + FR12
site/README.md                 # MODIFIED — short redirect / static host note
```

### Guardrails

1. **No** analytics (6.5) or link-check script (6.4).
2. **No** edits to `PageHead.astro` / sitemap filter unless required for redirect correctness.
3. **No** post/project `path` frontmatter changes.
4. Run full gate trio after changes.

### Testing / verification checklist

- [x] `redirectMap` keys documented in parity checklist
- [x] `/projects/colossus` → `/projects/colossus-bets` (301)
- [x] Trailing-slash policy documented (Astro page conflict; GH Pages serves both)
- [x] Gates green

---

## References

- [epics.md — Story 6.3](../planning-artifacts/epics.md) (FR12)
- [architecture.md §5.3](../planning-artifacts/architecture.md)
- [migration-parity-checklist.md](../../docs/migration-parity-checklist.md)
- Astro: [Configured redirects](https://docs.astro.build/en/guides/routing/#configured-redirects), [redirects config](https://docs.astro.build/en/reference/configuration-reference/#redirects)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- `site/src/config/redirects.ts` — **1** active redirect: `/projects/colossus` → `/projects/colossus-bets` (301).
- Trailing-slash → non-trailing **not** added: Astro build fails when redirect source matches prerendered `path/index.html` (e.g. `/blog/` vs `blog/index.astro`). Documented in code, checklist, README.
- `dist/projects/colossus/index.html` — meta-refresh redirect page to `/projects/colossus-bets`.
- Audit: 19 canonical paths unchanged vs legacy checklist; `node scripts/collect-redirect-paths.mjs` lists active entries.
- Gates: `check` / `build` / `test:schema` → 0.

### File List

- `site/src/config/redirects.ts` — NEW
- `site/scripts/collect-redirect-paths.mjs` — NEW
- `site/astro.config.mjs` — `redirects: redirectMap`
- `site/README.md` — redirect note
- `docs/migration-parity-checklist.md` — FR12 + redirect map section

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created from sprint backlog; status → ready-for-dev. | create-story |
| 2026-05-22 | Redirect map wired; colossus 301; trailing-slash constraint documented; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | Code review: AC1–4/6 done; AC5 defer documented; README patch; status → done. | code-review |
