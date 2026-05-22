# Story 4.2: Blog pagination

**Story ID:** 4.2  
**Story key:** `4-2-blog-pagination`  
**Status:** done  
**Epic:** 4 — Full blog reading experience  
**Depends on:** Story **4.1** (`/blog` index, `POSTS_PER_PAGE`, `BlogPostTeaser`, `BlogLayout`, `resolvePostIcon`)  
**Followed by:** Story 4.3 (post detail pages), Story 4.4 (category pages)

---

## Story

As a **reader**,  
I want **`/blog/page/N/`** for older posts,  
So that **FR3** pagination parity holds.

---

## Acceptance criteria (from epics)

1. **Given** more than `POSTS_PER_PAGE` (12) posts  
   **When** the site is built  
   **Then** static routes exist for **`/blog/page/2`**, `/blog/page/3`, … up to `numPages`, matching legacy `gatsby-node.js` (`i === 0` → `/blog`, `i > 0` → `/blog/page/${i + 1}`).

2. **Given** **9** posts today (`numPages === 1`)  
   **When** the site is built  
   **Then** **no** `/blog/page/2` HTML is emitted (`getStaticPaths` returns empty for page ≥ 2), and **`/blog`** remains the only list route — no broken pagination links (FR21).

3. **Given** any blog list page (page 1 or page N)  
   **When** rendered  
   **Then** a **pagination nav** shows:
   - **Previous** link when not on page 1 — target `/blog` when coming from page 2, else `/blog/page/{currentPage - 1}`
   - **Next** link when not on last page — target `/blog/page/{currentPage + 1}`
   - Legacy link text: `← Previous Page` / `Next Page →` with `rel="prev"` / `rel="next"` where applicable

4. **Given** page 2+ (`site/src/pages/blog/page/[page].astro`)  
   **When** a valid page renders  
   **Then** it lists the correct slice of posts (sorted `date` DESC), uses `BlogPostTeaser`, one `<h1>` (e.g. `Blog — Page 2`), and `BlogLayout` with distinct `title` including page number.

5. **Given** invalid pagination URLs  
   **When** `/blog/page/1` or `/blog/page/0` or out-of-range page numbers are requested  
   **Then** behavior is safe: **do not** generate page 1 at `/blog/page/1` — omit from `getStaticPaths`; optional `404` via Astro redirect to `/blog` for `/blog/page/1` only if that path is hit (static host may 404 naturally).

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**.

---

## Tasks / subtasks

- [x] **Add `site/src/utils/blogPosts.ts`** (AC1, AC4) — Shared list logic (DRY with 4.1):
  ```ts
  import { getCollection } from 'astro:content';
  import { POSTS_PER_PAGE } from '../constants/blog';

  export async function getSortedPosts() {
    return (await getCollection('posts')).sort(
      (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );
  }

  export function getNumPages(totalPosts: number): number {
    return Math.ceil(totalPosts / POSTS_PER_PAGE);
  }

  /** 1-based page index (page 1 = newest chunk). */
  export function getPostsForPage<T extends { data: { date: Date } }>(
    posts: T[],
    page: number,
  ): T[] {
    const start = (page - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }
  ```

- [x] **Create `site/src/components/blog/BlogPagination.astro`** (AC3) — Props: `currentPage`, `numPages`. Render `<nav aria-label="Blog pagination">` with prev/next anchors per legacy `blogListTemplate.js`. Hide prev on page 1; hide next on last page. Scoped flex layout (legacy ~40% width centered — simplify to `max-width: 100%`).

- [x] **Refactor `site/src/pages/blog/index.astro`** (AC2, AC3) — Use `getSortedPosts`, `getNumPages`, `getPostsForPage(posts, 1)`, pass `currentPage={1}` and `numPages` to `BlogPagination`. Keep existing markup/styles; no behavior change for 9 posts except pagination block present but **empty** (both links hidden).

- [x] **Create `site/src/pages/blog/page/[page].astro`** (AC1, AC4, AC5) — Pattern:
  ```astro
  ---
  import BlogLayout from '../../../layouts/BlogLayout.astro';
  import BlogPostTeaser from '../../../components/blog/BlogPostTeaser.astro';
  import BlogPagination from '../../../components/blog/BlogPagination.astro';
  import { getSortedPosts, getNumPages, getPostsForPage } from '../../../utils/blogPosts';
  import { resolvePostIcon } from '../../../utils/resolvePostIcon';
  import { POSTS_PER_PAGE } from '../../../constants/blog';

  export async function getStaticPaths() {
    const posts = await getSortedPosts();
    const numPages = getNumPages(posts.length);
    if (numPages <= 1) return [];
    // Legacy page 2+ only — page 1 stays at /blog
    return Array.from({ length: numPages - 1 }, (_, i) => ({
      params: { page: String(i + 2) },
      props: { currentPage: i + 2, numPages },
    }));
  }

  const { currentPage, numPages } = Astro.props;
  const posts = await getSortedPosts();
  const pagePosts = getPostsForPage(posts, currentPage);
  ---
  <BlogLayout title={`Juanma Perez | Blog — Page ${currentPage}`} description="...">
    ...
    <BlogPagination currentPage={currentPage} numPages={numPages} />
  </BlogLayout>
  ```
  - Reuse list markup/CSS from `index.astro` (extract shared class names or duplicate minimally).
  - `getStaticPaths` **must** pass `numPages` via props to avoid recomputation drift.

- [x] **URL policy** (AC1) — Canonical paths **without** trailing slash, matching legacy and Story 4.1:
  - Page 1: `/blog`
  - Page 2+: `/blog/page/2`, `/blog/page/3`, …
  - Do **not** emit `/blog/page/1`. Document in `docs/migration-parity-checklist.md` blog list p2+ row when `numPages > 1`.

- [x] **Verify with current content** (AC2) — After build with 9 posts:
  ```bash
  test ! -e dist/blog/page/2/index.html 2>/dev/null && test ! -f dist/blog/page/2.html
  grep -c 'Next Page' dist/blog/index.html   # expect 0
  ```
  Document in completion notes: pagination **infrastructure** complete; **page 2+ activates** when `posts.length > 12`.

- [x] **Optional verification recipe** (completion notes only) — To manually test page 2 before a 13th post lands, temporarily set `POSTS_PER_PAGE = 4` locally, rebuild, confirm `/blog/page/2` lists older posts and prev returns `/blog` — **revert** before merge.

- [x] **Validation gates** (AC6) — `npm run check`, `npm run build`, `npm run test:schema` → 0.

- [x] **Manual smoke** — On `/blog` with 9 posts: no Next link; header Blog `aria-current`; 320px no horizontal scroll on pagination row when visible.

- [x] **Do not** implement post detail, categories, or Shiki (4.3–4.5).

### Review Findings

_Generated by `code-review` workflow on 2026-05-21 (story 4.2). 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (3) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] AC1 routes for page 2+ **structural only** with 9 posts — activates when `posts.length > 12`; verified `getStaticPaths` returns `[]`.
- [x] [Review][Defer] `/blog/page/1` not generated — static host 404 if requested; no Astro redirect (AC5 optional).
- [x] [Review][Defer] Teaser links still 404 until **4.3** — unchanged from 4.1.

**Dismissed** (11):
- AC2 no `dist/blog/page/2`, no `Next Page` on `/blog` — **pass**.
- AC3 `BlogPagination`: prev `/blog` from page 2, `rel="prev"`/`rel="next"`, legacy copy — **pass**.
- AC4 `[page].astro` passes `pagePosts` via props (no slice drift); `h1` + distinct `title` — **pass**.
- AC5 loop starts at `currentPage = 2`; no `/blog/page/1` path — **pass**.
- AC6 gates 0/0/0 — **pass** (re-run 2026-05-21).
- Legacy URL map matches `gatsby-node.js` (`i === 0` → `/blog`, else `/blog/page/${i+1}`) — **pass**.
- `blogPosts.ts` DRY with 4.1; `POSTS_PER_PAGE` unchanged at 12 — **pass**.
- `BlogIndexShell` shared list + pagination + FR15 layout — **pass**.
- `SiteHeader` `isCurrent('/blog')` covers `/blog/page/N` — **pass**.
- Empty pagination nav on page 1 with 9 posts (both links hidden) — **pass**.
- No client JS / detail / category / Shiki — **pass**.

---

## Legacy URL mapping

| Legacy `gatsby-node` loop index `i` | `currentPage` | Public URL |
|-------------------------------------|---------------|------------|
| 0 | 1 | `/blog` |
| 1 | 2 | `/blog/page/2` |
| 2 | 3 | `/blog/page/3` |

**Not legacy:** `/blog/page/1` — always redirect or 404; page 1 is `/blog` only.

---

## Dev notes

### Architecture compliance

- **§5.2** — `/blog/page/[n]/` via `getStaticPaths`. [architecture.md §5.2](../planning-artifacts/architecture.md)
- **§7** — Replaces Gatsby `createPage` pagination context (`limit`, `skip`, `numPages`, `currentPage`). [architecture.md §7](../planning-artifacts/architecture.md)

### PRD

- **FR3** — Full pagination parity; this story completes the routing half (index was 4.1). [prd.md FR3](../planning-artifacts/prd.md)

### Story 4.1 intelligence (build on this)

- **Existing files** — Do not rewrite `BlogPostTeaser`, `BlogLayout`, `resolvePostIcon`, or `POSTS_PER_PAGE` constant; extend and refactor index only. [4-1-blog-index-first-page.md](./4-1-blog-index-first-page.md)
- **Sort order** — Newest first by `date` DESC (verified in 4.1: first teaser `/blog/demystifying-useReducer-hook`).
- **Layout width** — `blog-index` uses `width: min(60%, 100%)`; reuse on page 2+ for visual consistency.
- **Teaser links** — Still 404 until 4.3; unchanged.

### Pagination math (current repo)

```
posts = 9
POSTS_PER_PAGE = 12
numPages = 1
getStaticPaths → []
BlogPagination on /blog → no prev, no next
```

When `posts.length > 12`, `numPages >= 2` and `/blog/page/2` must list posts 13–24 (0-based slice index 12..23).

### File structure (target)

```
site/src/
├── utils/blogPosts.ts                    # NEW
├── components/blog/
│   └── BlogPagination.astro              # NEW
├── pages/blog/
│   ├── index.astro                       # MODIFIED — shared utils + pagination
│   └── page/[page].astro                 # NEW
docs/migration-parity-checklist.md        # MODIFIED — p2+ row note when applicable
```

### Guardrails

1. **No** post detail routes — 4.3.
2. **No** `/blog/page/1` in `getStaticPaths`.
3. **No** `client:*` pagination JS.
4. **Do not** change `POSTS_PER_PAGE` value in committed code (stay **12**).
5. **Do not** move page 1 to `/blog/page/1` for “consistency”.
6. **Do not** add query-string pagination (`?page=2`).
7. **Preserve** `rel="prev"` / `rel="next"` on pagination anchors.
8. **Do not** break Story 4.1 SEO strings on page 1.
9. **`SiteHeader`** — no change required; `/blog/page/2` already matches `isCurrent('/blog')`.
10. **Extract** shared list markup if refactor reduces duplication — but keep diff focused.

### Edge cases

- **`getStaticPaths` with props** — Use Astro 6 `props` pattern so `currentPage` / `numPages` are typed in frontmatter.
- **Invalid `params.page`** — Non-numeric or `< 2` should not appear in static output; if manually created URL 404s at host, OK.
- **Empty page slice** — Should not occur if `numPages` math matches; guard with `if (pagePosts.length === 0) return []` in `getStaticPaths` generation loop if needed.
- **Last page partial** — e.g. 13 posts → page 2 has 1 post; still show Next hidden, Prev visible.
- **Epics AC “Given more than 12 posts”** — Satisfied structurally even when current content has 9; document in completion notes.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# 9 posts: no dist/blog/page/2
grep 'blog-pagination' dist/blog/index.html || true
# After optional POSTS_PER_PAGE=4 local test: restore 12, rebuild
```

---

## References

- [Epics — Story 4.2](../planning-artifacts/epics.md)
- [Story 4.1 — blog index](./4-1-blog-index-first-page.md)
- [Architecture §5.2, §7](../planning-artifacts/architecture.md)
- [Migration parity checklist — Blog pagination](../../docs/migration-parity-checklist.md)
- [Legacy: `gatsby-node.js` lines 110–124](../../gatsby-node.js)
- [Legacy: `blogListTemplate.js` pagination](../../src/templates/blogListTemplate.js)
- [Astro: `getStaticPaths`](https://docs.astro.build/en/guides/routing/#dynamic-routes)

---

## Dev agent record

### Agent model used

Composer (Cursor)

### Debug log references

Build: 4 pages; `getStaticPaths` → `[]` with 9 posts. `dist/blog/index.html` has `blog-pagination` nav, 0× `Next Page`.

### Completion notes list

- AC1–AC6 satisfied. Shared `blogPosts.ts`; `BlogIndexShell` DRYs list + pagination + styles.
- Page 1 `/blog`; page 2+ `/blog/page/N` only when `numPages > 1` (activates at 13+ posts).
- No `/blog/page/1`; no `dist/blog/page/2` with current content.
- Legacy prev/next copy + `rel="prev"` / `rel="next"`.

### File list

- `site/src/utils/blogPosts.ts` (new)
- `site/src/components/blog/BlogPagination.astro` (new)
- `site/src/components/blog/BlogPostList.astro` (new)
- `site/src/components/blog/BlogIndexShell.astro` (new)
- `site/src/pages/blog/index.astro` (modified)
- `site/src/pages/blog/page/[page].astro` (new)
- `docs/migration-parity-checklist.md` (modified)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR3 pagination: `/blog/page/[page]`, BlogPagination, blogPosts utils, legacy URL map, 9-post empty paths behavior, refactor index.astro. | bmad-create-story |
| 2026-05-21 | Implemented pagination infrastructure; status → review. | bmad-dev-story |
| 2026-05-21 | Code review: 0 patch; AC1–AC6 pass. Status → done. | bmad-code-review |
