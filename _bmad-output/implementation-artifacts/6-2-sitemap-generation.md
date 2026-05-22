# Story 6.2: Sitemap generation

**Story ID:** 6.2  
**Story key:** `6-2-sitemap-generation`  
**Status:** done  
**Epic:** 6 — Discovery, redirects, analytics, and link integrity  
**Depends on:** Story **1.2** (`site` in `astro.config.mjs` = `https://juanmaperez.dev`); Stories **4.1–4.4**, **5.1** (all MVP routes built); Story **6.1** (`noindex` on `/404` — sitemap must respect exclusion)  
**Followed by:** Story **6.3** (redirect map); Story **6.4** (link integrity may validate sitemap URLs)

---

## Story

As a **search engine**,  
I want **a sitemap listing indexable routes**,  
So that **FR11** is met.

---

## Acceptance criteria (from epics)

1. **Given** `@astrojs/sitemap` configured with the same `site` as `astro.config.mjs`  
   **When** `npm run build` completes from `site/`  
   **Then** `dist/` contains `sitemap-index.xml` and at least one `sitemap-*.xml` with absolute `https://juanmaperez.dev/...` `<loc>` entries.

2. **Given** the current static route set (21 HTML pages at last build)  
   **When** the sitemap is generated  
   **Then** it includes all **indexable** MVP routes: `/`, `/cv`, `/blog`, all blog posts, all category index pages, all project detail pages, and any `/blog/page/N` pages emitted by `getStaticPaths` (today: **none** beyond page 1 because 9 posts &lt; `POSTS_PER_PAGE` 12).

3. **Given** Story **6.1** `/404` with `noindex`  
   **When** the sitemap is generated  
   **Then** **`https://juanmaperez.dev/404` is excluded** (via `filter` or equivalent — do not rely on crawlers ignoring a listed error URL).

4. **Given** PRD “Sitemap and **robots** compatible with new generator”  
   **When** build completes  
   **Then** crawlers can discover the sitemap — either `public/robots.txt` (static) or `src/pages/robots.txt.ts` (dynamic, reusing `site`) with a `Sitemap:` line pointing at `https://juanmaperez.dev/sitemap-index.xml` (or the integration’s actual index filename).

5. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/` on Node **22.12**  
   **Then** all exit **0**; spot-check sitemap URL count ≈ **20** (21 built pages minus `/404`).

---

## Tasks / subtasks

- [x] **Install `@astrojs/sitemap`** (AC1) — From `site/`:
  ```bash
  npx astro add sitemap
  ```
  Or manually: `npm install @astrojs/sitemap` and register in `astro.config.mjs`. **Do not** change `site` / `base` values from Story 1.2.

- [x] **Configure integration in `site/astro.config.mjs`** (AC1, AC3) — Example:
  ```js
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://juanmaperez.dev',
    base: '/',
    integrations: [
      sitemap({
        filter: (page) => !page.endsWith('/404') && !page.endsWith('/404/'),
      }),
    ],
    // ...existing markdown/shiki config
  });
  ```
  - **`filter` receives full absolute URLs** (including `site` origin). Adjust if Astro emits `/404.html` as a different URL shape — verify against `dist/sitemap-0.xml` after first build.
  - **Do not** add `customPages` unless auto-discovery misses a route (unlikely for this static site).

- [x] **Add `robots.txt` discovery** (AC4) — Prefer **`site/src/pages/robots.txt.ts`** (Astro endpoint) so `Sitemap:` stays in sync with `import.meta.env.SITE`:
  ```ts
  import type { APIRoute } from 'astro';

  const robotsTxt = `
  User-agent: *
  Allow: /

  Sitemap: ${import.meta.env.SITE}/sitemap-index.xml
  `.trim();

  export const GET: APIRoute = () =>
    new Response(robotsTxt, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  ```
  Alternative: static `site/public/robots.txt` if you want zero TS — still must use production origin in `Sitemap:` line.

- [x] **Verify built artifacts** (AC2, AC5) — After `npm run build`:
  ```bash
  ls -la dist/sitemap*.xml dist/robots.txt
  grep -c '<loc>' dist/sitemap-0.xml   # expect ~20
  grep 'juanmaperez.dev/404' dist/sitemap-0.xml && echo FAIL || echo OK
  grep 'how-javascript-engine-works' dist/sitemap-0.xml
  grep 'projects/umaicha' dist/sitemap-0.xml
  grep 'blog/category/javascript' dist/sitemap-0.xml
  ```
  Record `<loc>` count and sample URLs in **Dev Agent Record**.

- [x] **Update `docs/migration-parity-checklist.md`** (AC2) — Extend **SEO** footer line: Story **6.2** — `@astrojs/sitemap` + `robots.txt` `Sitemap:` pointer; legacy `gatsby-plugin-sitemap` parity for FR11.

- [x] **Update `site/README.md`** (optional, AC1) — One sentence under `site` config: build emits `sitemap-index.xml`; local preview at `/sitemap-index.xml`.

- [x] **Do not** in this story: `astro.config` **redirects** (6.3), link crawler (6.4), analytics (6.5), change SEO components from 6.1, add `og:image`, or modify collection schemas.

### Review Findings

_Code review 2026-05-22 — story `6-2-sitemap-generation`. Gates re-run: check/build/test:schema → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch`, `decision-needed`, or `defer` items.

| AC | Verdict |
|----|---------|
| AC1 | `sitemap-index.xml` + `sitemap-0.xml` with absolute `https://juanmaperez.dev/...` locs |
| AC2 | 20 indexable routes: home, cv, blog hub, 9 posts, 3 categories, 5 projects |
| AC3 | `/404` absent from sitemap (`filter`) |
| AC4 | `dist/robots.txt` → `Sitemap: https://juanmaperez.dev/sitemap-index.xml` |
| AC5 | Gates green; loc count = 20 |

**Note (informational, not blocking):** Sitemap `<loc>` URLs use trailing slashes; 6.1 canonicals omit them — both resolve; revisit in 6.3/6.4 if strict URL parity is required.

---

## Current baseline (pre-story)

| Item | State |
|------|--------|
| `astro.config.mjs` | `site: 'https://juanmaperez.dev'`, `base: '/'`, **no** integrations |
| `@astrojs/sitemap` | **Not installed** |
| `robots.txt` | **None** (`site/public/` empty) |
| Built pages | **21** (see Story 6.1 build log): home, cv, 404, blog index, 9 posts, 3 categories, 5 projects |
| `/404` | `noindex` via `PageHead.astro` (6.1) — must **exclude** from sitemap |
| Legacy | `gatsby-plugin-sitemap` in root `gatsby-config.js` — auto sitemap on Gatsby build |

### Expected indexable URL inventory (verify after implementation)

| Route pattern | Count (today) | Notes |
|---------------|---------------|--------|
| `/` | 1 | `index.astro` |
| `/cv` | 1 | |
| `/blog` | 1 | page 1 only (9 posts) |
| `/blog/page/{n}` | 0 | appears when `posts > 12` |
| `/blog/{slug}` | 9 | from `posts` collection `path` |
| `/blog/category/{cat}` | 3 | javascript, react, recipes |
| `/projects/{slug}` | 5 | from `path` frontmatter |
| `/404` | 0 in sitemap | built but **noindex** |

**Target sitemap entries:** ~**20** `<loc>` elements.

---

## Legacy vs MVP

| Legacy | Story 6.2 |
|--------|-----------|
| `gatsby-plugin-sitemap` (automatic on build) | `@astrojs/sitemap` integration |
| `siteMetadata.siteUrl` | `astro.config.mjs` `site` (already aligned) |
| No explicit robots in repo | `robots.txt` with `Sitemap:` line (PRD compatibility) |

---

## Dev notes

### Architecture compliance

- **§10 SEO** — `@astrojs/sitemap` with production `site`. [architecture.md §10](../planning-artifacts/architecture.md)
- **`siteConfig.origin`** (`site/src/site.config.ts`) must remain identical to `astro.config.mjs` `site` (6.1 canonical/OG already depend on this).

### PRD

- **FR11** — Sitemap covers all public indexable MVP routes. [prd.md](../planning-artifacts/prd.md)
- **Robots compatibility** — minimal `Allow: /` + sitemap pointer; no `Disallow` rules unless product asks later.

### Previous story intelligence (6.1)

- **`canonicalUrl()`** and sitemap `<loc>` should use the **same path shape** (no trailing-slash drift). Today canonicals use paths like `/blog/how-javascript-engine-works` without trailing slash — if sitemap URLs differ, document in completion notes (usually Astro sitemap matches built route URLs).
- **Do not** remove or weaken `noindex` on 404 to “fix” sitemap — **filter exclusion** is the correct fix.
- Gates: always run **`check` + `build` + `test:schema`** trio from `site/`.

### Library / version notes

- Project uses **Astro ^6.1.8** — install `@astrojs/sitemap` via `astro add` so peer versions align (registry shows **3.7.x** line for Astro 6).
- Integration hooks **`astro:build:done`** — no manual sitemap script required.
- Docs: [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

### File structure (target)

```
site/
├── astro.config.mjs              # MODIFIED — sitemap integration + filter
├── package.json                  # MODIFIED — @astrojs/sitemap dependency
├── src/pages/robots.txt.ts       # NEW (or public/robots.txt)
docs/migration-parity-checklist.md # MODIFIED — FR11 note
site/README.md                    # OPTIONAL — sitemap mention
```

### Guardrails

1. **No** redirect rules in `astro.config` (6.3).
2. **No** changes to `PageHead.astro` / `seo.ts` unless required for robots (prefer separate `robots.txt.ts`).
3. **No** analytics scripts (6.5).
4. **Preserve** 21-page build output; sitemap is additive XML + robots only.
5. **CI** — `.github/workflows/deploy-astro-pages.yml` already runs `npm run build`; no workflow change required if build passes.

### Testing / verification checklist

- [x] `dist/sitemap-index.xml` exists and references chunk file(s)
- [x] ~20 URLs; **no** `/404`
- [x] Includes home, cv, blog index, ≥1 post, ≥1 category, ≥1 project
- [x] `dist/robots.txt` (or served route) contains `Sitemap: https://juanmaperez.dev/sitemap-index.xml`
- [x] All gates green

---

## References

- [epics.md — Story 6.2](../planning-artifacts/epics.md) (FR11)
- [architecture.md §10](../planning-artifacts/architecture.md)
- [6-1-per-page-title-description-and-open-graph.md](./6-1-per-page-title-description-and-open-graph.md)
- [1-2-configure-site-url-and-base-for-github-pages.md](./1-2-configure-site-url-and-base-for-github-pages.md)
- Astro: [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Installed `@astrojs/sitemap@^3.7.2`; `astro.config.mjs` integration with `filter` excluding `/404`.
- `site/src/pages/robots.txt.ts` → `dist/robots.txt` with `Sitemap: https://juanmaperez.dev/sitemap-index.xml`.
- Build: `sitemap-index.xml` + `sitemap-0.xml` with **20** indexable URLs (21 HTML pages minus `/404`; `robots.txt` is separate route).
- Sitemap `<loc>` URLs use **trailing slashes** (e.g. `/blog/how-javascript-engine-works/`); 6.1 canonicals omit trailing slash — both resolve; note for 6.3/6.4 if strict URL parity needed.
- Gates: `check` / `build` / `test:schema` → 0.

### File List

- `site/package.json` — added `@astrojs/sitemap`
- `site/package-lock.json` — lockfile update
- `site/astro.config.mjs` — sitemap integration + filter
- `site/src/pages/robots.txt.ts` — NEW
- `site/README.md` — sitemap note
- `docs/migration-parity-checklist.md` — FR11 note

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created from sprint backlog; status → ready-for-dev. | create-story |
| 2026-05-22 | Implemented sitemap + robots; 20 URLs; gates green; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | Code review: clean; AC1–5 verified; status → done. | code-review |
