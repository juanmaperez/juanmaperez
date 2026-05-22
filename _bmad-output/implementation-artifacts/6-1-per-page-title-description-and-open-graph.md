# Story 6.1: Per-page title, description, and Open Graph

**Story ID:** 6.1  
**Story key:** `6-1-per-page-title-description-and-open-graph`  
**Status:** done  
**Epic:** 6 — Discovery, redirects, analytics, and link integrity  
**Depends on:** Story **3.1** (`BaseLayout` + `site.config.ts` + reserved `head` slot); Stories **4.1–4.4**, **5.1–5.2** (all MVP routes exist with `title`/`description` props partially wired)  
**Followed by:** Story **6.2** (sitemap — needs correct `site` + indexable routes)

---

## Story

As a **visitor / recruiter**,  
I want **accurate titles and previews**,  
So that **FR10** is met.

---

## Acceptance criteria (from epics)

1. **Given** each indexable MVP route  
   **When** HTML is built  
   **Then** `<title>` and `<meta name="description">` are **unique** and appropriate (not all identical defaults).

2. **Given** legacy `react-helmet` / `SEO` component (`src/components/seo.js`)  
   **When** comparing title behavior  
   **Then** content pages use **`{Page title} | Juanma Perez`** pattern (Helmet `titleTemplate: '%s | Juanma Perez'`), and section hubs use explicit titles already in Astro pages (e.g. `Juanma Perez | Blog`, `Juanma Perez | CV`, `Juanma Perez | Home`).

3. **Given** `site` / `siteConfig.origin` = `https://juanmaperez.dev`  
   **When** any page renders  
   **Then** Open Graph tags include at minimum: `og:title`, `og:description`, `og:url` (absolute), `og:type` (`website` default; `article` optional for blog posts), `og:site_name`; Twitter tags include `twitter:card` (`summary`), `twitter:title`, `twitter:description`.

4. **Given** canonical URL policy (architecture §10)  
   **When** a page renders  
   **Then** `<link rel="canonical" href="...">` points to the production absolute URL for that route (trailing-slash policy: match Astro static output — verify `dist/` path form and use consistently).

5. **Given** `/404`  
   **When** built  
   **Then** page has distinct title (`Juanma Perez | 404` or equivalent) and a sensible description; **`noindex`** meta is acceptable/recommended so error pages are not promoted (document in completion notes).

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; spot-check `dist/**/index.html` for OG + unique titles on home, one post, one project, blog index, category page.

---

## Tasks / subtasks

- [x] **Create `site/src/utils/seo.ts`** (AC2) — Pure helpers (no Astro imports):
  ```ts
  import { siteConfig } from '../site.config';

  export function formatPageTitle(pageTitle: string): string {
    const site = siteConfig.title;
    if (!pageTitle || pageTitle === site) return site;
    if (pageTitle.startsWith(`${site} |`)) return pageTitle; // already formatted
    return `${pageTitle} | ${site}`;
  }

  export function canonicalUrl(pathname: string): string {
    const base = siteConfig.origin.replace(/\/$/, '');
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${base}${path}`;
  }
  ```
  Add `truncateDescription(text: string, max = 160)` if any excerpt exceeds sensible OG length (optional).

- [x] **Create `site/src/components/seo/PageHead.astro`** (AC3, AC4) — Injected via `BaseLayout` `head` slot (or called from `BaseLayout` when props provided):
  ```astro
  ---
  interface Props {
    title: string;
    description: string;
    canonicalPath: string;
    ogType?: 'website' | 'article';
    noindex?: boolean;
  }
  const { title, description, canonicalPath, ogType = 'website', noindex = false } = Astro.props;
  import { canonicalUrl } from '../../utils/seo';
  const url = canonicalUrl(canonicalPath);
  ---
  <link rel="canonical" href={url} />
  {noindex && <meta name="robots" content="noindex" />}
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content={ogType} />
  <meta property="og:site_name" content="Juanma Perez" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  ```
  **Optional:** single default `og:image` pointing to `siteConfig.origin + '/images/home/first.jpg'` (legacy had no `og:image` — add only if trivial; not required for AC3 minimum set).

- [x] **Extend `site/src/layouts/BaseLayout.astro`** (AC1, AC3, AC4) — Props:
  ```ts
  interface Props {
    title?: string;
    description?: string;
    canonicalPath?: string; // default: Astro.url.pathname
    ogType?: 'website' | 'article';
    noindex?: boolean;
  }
  ```
  - Resolve `resolvedTitle` / `resolvedDescription` (existing fallbacks).
  - Apply `formatPageTitle(resolvedTitle)` for `<title>` **or** apply in each page before pass — pick **one** place (prefer `BaseLayout` so all consumers get template).
  - Render `<PageHead ... />` inside `<slot name="head" />` **before** any page-specific head slot content (pages may append via slot).

- [x] **Wire `BlogLayout.astro` / `ProjectLayout.astro`** — Pass through new optional SEO props to `BaseLayout` (`canonicalPath`, `ogType`, `noindex`).

- [x] **Update page-level titles** (AC1, AC2) — Audit and fix:

  | Route | File | Title input | Description |
  |-------|------|-------------|-------------|
  | `/` | `index.astro` | Keep `Juanma Perez \| Home` (already formatted) | existing |
  | `/cv` | `cv.astro` | Keep `Juanma Perez \| CV` | existing |
  | `/404` | `404.astro` | Keep / add description meta via prop | `noindex: true` |
  | `/blog` | `blog/index.astro` | Keep `Juanma Perez \| Blog` | existing |
  | `/blog/page/N` | `blog/page/[page].astro` | Keep paginated title | existing |
  | `/blog/category/*` | `blog/category/[category].astro` | Keep `Juanma Perez \| {cat}` | existing |
  | `/blog/*` post | `blog/[...slug].astro` | Pass `entry.data.title` (template adds site name) | `entry.data.excerpt`; `ogType: 'article'` |
  | `/projects/*` | `projects/[...slug].astro` | Pass `entry.data.title` | `entry.data.excerpt` |

  **Fix required:** post + project detail currently pass raw `title` only — after `formatPageTitle` in layout they should render `"{Post title} | Juanma Perez"`.

- [x] **Verify built HTML** (AC6) — After build:
  ```bash
  cd site && npm run build
  grep -o '<title>[^<]*</title>' dist/index.html dist/blog/index.html dist/blog/how-javascript-engine-works/index.html dist/projects/umaicha/index.html
  grep -o 'property="og:url" content="[^"]*"' dist/blog/how-javascript-engine-works/index.html
  grep 'noindex' dist/404.html || true
  ```
  Record canonical/OG samples in Dev Agent Record.

- [x] **Update `docs/migration-parity-checklist.md`** (AC2) — Add one-line note under a new **SEO (FR10)** row or footer: Story **6.1** — per-page title/description/OG via `PageHead.astro`; legacy Helmet `titleTemplate` parity.

- [x] **Manual smoke** — View source or devtools on post + project: unique title/description; share-debugger optional (Facebook/Twitter debugger) — document if tested.

- [x] **Do not** in this story: `@astrojs/sitemap` (6.2), `astro.config` redirects (6.3), analytics (6.5), change collection schemas, or add `og:image` per-post pipeline (optional default only).

### Review Findings

_Code review 2026-05-22 — story `6-1-per-page-title-description-and-open-graph`. Gates re-run: check/build/test:schema → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch`, `decision-needed`, or `defer` items.

| AC | Verdict |
|----|---------|
| AC1 | Unique `<title>` + description per route type (spot-check dist) |
| AC2 | `{page} \| Juanma Perez` on post/project; hubs keep `Juanma Perez \| …` |
| AC3 | OG + Twitter on all pages via `PageHead` |
| AC4 | Absolute canonical from `entry.data.path` or `Astro.url.pathname` |
| AC5 | `/404` — `noindex` + description |
| AC6 | 21 pages; gates green |

---

## Current baseline (pre-story)

- **`BaseLayout.astro`** — `<title>` + `<meta name="description">` only; `head` slot reserved empty for 6.1.
- **Hub pages** — Already pass branded titles (`Juanma Perez | Blog`, etc.).
- **Post/project detail** — Pass `entry.data.title` / `excerpt` — **no** `| Juanma Perez` suffix, **no** OG/Twitter/canonical tags.
- **Legacy** — `src/components/seo.js`: `titleTemplate`, `og:*`, `twitter:*`; no `og:image` in default meta array.

---

## Legacy vs MVP

| Legacy (`seo.js` + Helmet) | Story 6.1 |
|----------------------------|-----------|
| `titleTemplate: '%s \| Juanma Perez'` | `formatPageTitle()` in `BaseLayout` |
| `og:title`, `og:description`, `og:type: website` | `PageHead.astro` (+ `article` on posts) |
| `twitter:card`, `twitter:title`, `twitter:description` | Same in `PageHead` |
| No canonical in legacy SEO component | `<link rel="canonical">` (architecture §10) |
| `twitter:creator` from author metadata | Optional defer — not in legacy minimum AC set |

---

## Dev notes

### Architecture compliance

- **§10** — Global defaults + per-page meta; canonical + OG. [architecture.md §10](../planning-artifacts/architecture.md)
- **`siteConfig.origin`** must match `astro.config.mjs` `site` for absolute OG URLs.

### PRD

- **FR10** — Per-page title and meta description suitable for social previews. [prd.md FR10](../planning-artifacts/prd.md)

### Previous story intelligence

- **4.3** — Deferred: post `<title>` without site suffix → **fixed in 6.1**. [4-3-blog-post-detail-pages.md](./4-3-blog-post-detail-pages.md)
- **3.1** — `head` slot reserved for this story. [3-1-base-layout-and-document-shell.md](./3-1-base-layout-and-document-shell.md)
- **5.1** — `ProjectLayout` passes `title`/`description` from entry — extend props only. [5-1-project-detail-routes.md](./5-1-project-detail-routes.md)

### File structure (target)

```
site/
├── src/
│   ├── utils/seo.ts                    # NEW
│   ├── components/seo/PageHead.astro   # NEW
│   ├── layouts/BaseLayout.astro        # MODIFIED
│   ├── layouts/BlogLayout.astro        # MODIFIED — pass-through SEO props
│   ├── layouts/ProjectLayout.astro   # MODIFIED — pass-through SEO props
│   └── pages/**/*.astro                # MODIFIED — 404 description/noindex; verify hubs
docs/migration-parity-checklist.md        # MODIFIED — FR10 note
```

### Guardrails

1. **No** `@astrojs/sitemap` install (6.2).
2. **No** analytics scripts (6.5).
3. **No** `client:*` or React Helmet port.
4. **Single source of truth** — `siteConfig` for site name and origin; do not duplicate strings in `PageHead`.
5. **Preserve** one `<h1>` policy — SEO `<title>` is independent of visible `<h1>`.
6. **Run** full gate trio after changes.

### Edge cases

- **Title already prefixed** — `formatPageTitle` must not produce `Juanma Perez | Home | Juanma Perez`; detect `startsWith(`${site} |`)` or pass `skipFormat` flag for hub pages.
- **404** — `noindex` + recovery links unchanged.
- **Paginated blog** — Page 2+ titles already unique; ensure canonical uses `/blog/page/2/` not `/blog`.
- **Category pages** — Canonical `/blog/category/javascript` (verify trailing slash in `dist`).
- **Empty description** — Fall back to `siteConfig.description` in `BaseLayout`.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Unique titles:
grep -h '<title>' dist/index.html dist/blog/*/index.html dist/projects/umaicha/index.html 2>/dev/null | sort -u
```

---

## References

- [Epics — Story 6.1](../planning-artifacts/epics.md)
- [PRD — FR10](../planning-artifacts/prd.md)
- [Architecture §10](../planning-artifacts/architecture.md)
- [Legacy: `src/components/seo.js`](../../src/components/seo.js)
- [BaseLayout](../../site/src/layouts/BaseLayout.astro)
- [Migration parity checklist](../../docs/migration-parity-checklist.md)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer

### Debug log references

- Gates: `check` 0/0/0, `build` 21 pages, `test:schema` OK (Node 22.12).
- Titles: post `How javascript engine works | Juanma Perez`; hub `Juanma Perez | Blog`; project `Umaicha | Juanma Perez`.
- OG: `og:url` = `https://juanmaperez.dev/blog/how-javascript-engine-works`; `og:type` = `article` on posts.
- `404.html`: `noindex` + description.

### Completion notes list

- AC1–4: `seo.ts`, `PageHead.astro`, `BaseLayout` applies `formatPageTitle` + canonical from `Astro.url.pathname` or `entry.data.path`.
- AC2: Helmet `titleTemplate` parity on post/project detail; hub titles unchanged (already prefixed).
- AC5: `/404` — `noindex`, description, canonical `/404`.
- AC6: spot-check dist HTML on home, blog, post, project, category, 404.
- No `og:image` (legacy had none); `truncateDescription` at 160 chars.

### File list

- `site/src/utils/seo.ts`
- `site/src/components/seo/PageHead.astro`
- `site/src/layouts/BaseLayout.astro`
- `site/src/layouts/BlogLayout.astro`
- `site/src/layouts/ProjectLayout.astro`
- `site/src/pages/blog/[...slug].astro`
- `site/src/pages/projects/[...slug].astro`
- `site/src/pages/404.astro`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/6-1-per-page-title-description-and-open-graph.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR10: PageHead OG/Twitter/canonical, formatPageTitle parity with Helmet, wire all MVP routes, 404 noindex. | bmad-create-story |
| 2026-05-22 | Implemented SEO layer; gates green; status → review. | dev-story |
| 2026-05-22 | Code review: clean; AC1–6 verified; status → done. | code-review |
