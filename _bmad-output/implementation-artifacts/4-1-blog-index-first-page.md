# Story 4.1: Blog index (first page)

**Story ID:** 4.1  
**Story key:** `4-1-blog-index-first-page`  
**Status:** done  
**Epic:** 4 — Full blog reading experience  
**First story of Epic 4** — enables `/blog` nav link (FR21 on blog index route); pagination and post bodies land in 4.2–4.5.  
**Depends on:** Epic 2 (migrated `posts` collection), Epic 3 (`BaseLayout`, `SiteHeader`, core chrome)  
**Followed by:** Story 4.2 (pagination `/blog/page/N`), Story 4.3 (post detail at `path`), Story 4.4 (category links)

---

## Story

As a **reader**,  
I want **the latest posts** on `/blog/`,  
So that **FR3** (first page) is met.

---

## Acceptance criteria (from epics)

1. **Given** all entries in the `posts` content collection passing schema validation  
   **When** `site/src/pages/blog/index.astro` is built  
   **Then** route **`/blog`** resolves (Astro: `dist/blog/index.html` or equivalent) and lists posts sorted by **`date` DESC** (newest first).

2. **Given** legacy `postsPerPage = 12` (`gatsby-node.js`)  
   **When** the first page renders  
   **Then** at most **12** posts appear — today **all 9** migrated posts show on page 1.

3. **Given** each post on the index  
   **When** rendered as a teaser  
   **Then** it includes:
   - **Title** linked to `entry.data.path` (canonical URL from frontmatter, e.g. `/blog/how-javascript-engine-works`)
   - **Excerpt** (`entry.data.excerpt`) as visible text
   - Teaser is a single logical unit (e.g. `<article>` or list item) with the link target clear to assistive tech

4. **Given** the page uses site chrome  
   **When** `/blog` loads  
   **Then** `BaseLayout` wraps content, global header shows **`aria-current="page"`** on Blog, and exactly **one** `<h1>` exists inside `<main>`.

5. **Given** legacy blog list SEO (`blogListTemplate.js`)  
   **When** built  
   **Then** page supplies `title="Juanma Perez | Blog"` and `description="Juanma Perez personal blog about javascript and other technologies. Sometimes I also write about bread or recipes"` to `BaseLayout`.

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**.

---

## Tasks / subtasks

- [x] **Add shared blog constant** (AC2, prep 4.2) — `site/src/constants/blog.ts`:
  ```ts
  /** Legacy gatsby-node.js postsPerPage */
  export const POSTS_PER_PAGE = 12;
  ```

- [x] **Create `site/src/layouts/BlogLayout.astro`** (AC4, AC5) — Thin wrapper over `BaseLayout` (architecture §9). Accepts optional `title` / `description` props; default slot for page body. No extra landmarks beyond what the page provides.

- [x] **Create `site/src/components/blog/BlogPostTeaser.astro`** (AC3) — Props: `title`, `path`, `excerpt`, optional `date`, optional `category`, optional `iconSrc`. Markup:
  ```astro
  ---
  interface Props {
    title: string;
    path: string;
    excerpt: string;
    date?: Date;
    category?: string;
    iconSrc?: string;
  }
  const { title, path, excerpt, date, category, iconSrc } = Astro.props;
  ---
  <article class="blog-teaser">
    <h2 class="blog-teaser__title">
      <a href={path}>{title}</a>
    </h2>
    {date && <p class="blog-teaser__date"><time datetime={date.toISOString()}>{date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>}
    {category && <p class="blog-teaser__category">{category}</p>}
    <p class="blog-teaser__excerpt">{excerpt}</p>
  </article>
  ```
  - Use **`<h2>`** per teaser (page owns `<h1>`).
  - **Do not** link category to `/blog/category/...` yet — Story **4.4**; plain text avoids FR21 broken internal links.
  - Optional icon `<img>` if `iconSrc` resolves — `alt=""` if decorative beside category text, or `alt={category}` if icon is meaningful (UX-DR3).

- [x] **Icon resolution helper** (AC3, optional visual) — In `blog/index.astro` or `site/src/utils/resolvePostIcon.ts`, map `entry.data.icon` (e.g. `./../../../assets/icons/javascript.png`) to built URL via:
  ```ts
  const iconModules = import.meta.glob<{ default: { src: string } }>(
    '/src/assets/icons/*.png',
    { eager: true },
  );
  // Match basename: javascript.png
  ```
  If unresolved, render teaser without icon (no build failure).

- [x] **Create `site/src/pages/blog/index.astro`** (AC1–AC5) — Core logic:
  ```astro
  ---
  import BlogLayout from '../../layouts/BlogLayout.astro';
  import BlogPostTeaser from '../../components/blog/BlogPostTeaser.astro';
  import { getCollection } from 'astro:content';
  import { POSTS_PER_PAGE } from '../../constants/blog';

  const allPosts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const pagePosts = allPosts.slice(0, POSTS_PER_PAGE);
  ---
  <BlogLayout
    title="Juanma Perez | Blog"
    description="Juanma Perez personal blog about javascript and other technologies. Sometimes I also write about bread or recipes"
  >
    <h1>Blog</h1>
    <section aria-labelledby="blog-recent-heading">
      <h2 id="blog-recent-heading" class="visually-hidden">Recent posts</h2>
      <ol class="blog-index__list">
        {pagePosts.map((entry) => (
          <li>
            <BlogPostTeaser
              title={entry.data.title}
              path={entry.data.path}
              excerpt={entry.data.excerpt}
              date={entry.data.date}
              category={entry.data.category}
              iconSrc={resolveIcon(entry.data.icon)}
            />
          </li>
        ))}
      </ol>
    </section>
  </BlogLayout>
  ```
  - Scoped CSS: readable list, `max-width: 100%`, no horizontal scroll (FR15 / UX-DR4). Simplified layout vs legacy grid toggle — **no** list/grid JS control (Epic 7 if ever).

- [x] **Trailing slash policy** (AC1) — Canonical index URL is **`/blog`** (matches `siteConfig.nav` `{ href: '/blog' }`). Do **not** add `blog/page/1` redirect in this story (4.2 owns page 2+). Document in completion notes if Astro emits `/blog/` directory — `SiteHeader` `isCurrent` already handles both.

- [x] **Update migration parity checklist** — Blog list page 1 row: Motion **n/a** or **removed**, Islands **N**, Notes “Story 4.1: static index, 9/12 posts”.

- [x] **Validation gates** (AC6) — From `site/`:
  ```bash
  npm run check
  npm run build
  npm run test:schema
  test -f dist/blog/index.html
  grep -c 'href="/blog/' dist/blog/index.html   # expect ≥9 post links
  ```

- [x] **Manual smoke** — `/blog`: 9 teasers newest-first; Blog nav `aria-current`; Tab to first post link; 320px no horizontal scroll.

- [x] **Do not** in this story: `blog/page/[page].astro`, post detail routes, category routes, Shiki, pagination prev/next UI (4.2 — with 9 posts numPages=1 anyway).

### Review Findings

_Generated by `code-review` workflow on 2026-05-21. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (3) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] Teaser `href` targets 404 until Story **4.3** — intentional; index route FR7/FR21 satisfied.
- [x] [Review][Defer] `resolvePostIcon` eager `import.meta.glob('*.png')` processes all icons under `assets/icons/` (incl. favicon-sized assets) — tighten in Epic 5 image pipeline.
- [x] [Review][Defer] `/blog` not yet in `docs/core-pages-smoke-checklist.md` FR15 matrix — extend in **4.2** or quick 4.1 follow-up smoke.

**Dismissed** (10):
- AC1 `dist/blog/index.html`, 9 posts, `date` DESC (first: `demystifying-useReducer-hook`) — **pass**.
- AC2 `POSTS_PER_PAGE = 12`, slice shows 9 — **pass**.
- AC3 `<article>`, `<h2><a href={path}>`, excerpt, decorative icon `alt=""` — **pass**.
- AC4 `BlogLayout` + one `<h1>`; Blog `aria-current="page"` — **pass**.
- AC5 legacy title/description strings — **pass**.
- AC6 `check` / `build` / `test:schema` exit 0 — **pass** (re-run 2026-05-21).
- No pagination/detail/category/Shiki/client JS — **pass** (guardrails).
- Category plain text (no `/blog/category/` links) — **pass**.
- `site.config.ts` TODO(4.1) removed — **pass**.
- `migration-parity-checklist.md` blog list row updated — **pass**.

---

## Post inventory (all 9 on page 1 today)

| # | Title (short) | `path` |
|---|---------------|--------|
| 1 | How javascript engine works | `/blog/how-javascript-engine-works` |
| 2 | Variables and values | `/blog/variables-and-values-javascript` |
| 3 | Primitive values… | `/blog/primitive-values-and-ummutability` |
| 4 | Values and coercion | `/blog/values-and-coercion` |
| 5 | High order functions… | `/blog/high-order-functions-callbacks-inversion-control` |
| 6 | Closure… | `/blog/closure-high-order-functions` |
| 7 | Perfect pizza dough | `/blog/the-perfect-pizza-dough` |
| 8 | Deconstructing fetch | `/blog/deconstructing-fetch-browser-api` |
| 9 | demystifying useReducer | `/blog/demystifying-useReducer-hook` |

Teaser links use **`entry.data.path`** exactly — **not** folder slugs. Post URLs **404 until Story 4.3** (document; not FR21 regression for index route itself).

---

## Legacy vs MVP (4.1 scope)

| Legacy (`blogListTemplate.js`) | Story 4.1 |
|--------------------------------|-----------|
| Author sidebar + portrait | **Omit** (not in epics AC) |
| List/grid toggle buttons | **Omit** (client UI) |
| Pagination prev/next | **Defer** to 4.2 (only 1 page with 9 posts) |
| Category icon link | **Plain category text** until 4.4 |
| `PostItem` styled widths | Simplified responsive list |

---

## Dev notes

### Architecture compliance

- **§5.2** — Page 1 at `/blog/` pattern → implement as `pages/blog/index.astro`. [architecture.md §5.2](../planning-artifacts/architecture.md)
- **§6.1** — Load via `getCollection('posts')`, sort DESC. [architecture.md §6.1](../planning-artifacts/architecture.md)
- **§7** — Replaces Gatsby `createPage` + GraphQL skip/limit for index 0. [architecture.md §7](../planning-artifacts/architecture.md)
- **§9** — `BlogLayout.astro`, `components/blog/`, `pages/blog/index.astro`. [architecture.md §9](../planning-artifacts/architecture.md)

### PRD / FR mapping

- **FR3** — Paginated blog index, newest first; **first page only** in this story. [prd.md FR3](../planning-artifacts/prd.md)
- **FR15** — No horizontal scroll on blog index (extend `docs/core-pages-smoke-checklist.md` in 4.2+ or quick note in 4.1 completion). [epics.md FR15](../planning-artifacts/epics.md)
- **FR7** — Blog nav link stops 404ing after this story. [prd.md FR7](../planning-artifacts/prd.md)

### Epic 2 / Epic 3 intelligence

- **9 posts** migrated under `site/src/content/posts/**` — [2-2-migrate-blog-post-markdown.md](./2-2-migrate-blog-post-markdown.md)
- Icons at `site/src/assets/icons/` — frontmatter `icon` paths point there via relative `../../../assets/icons/`.
- **Deferred body link fixes** (posts 06, 07, 09) — Story **4.3**, not 4.1.
- `BaseLayout` + `SiteHeader` — no changes required except new pages consume layout. [3-2-global-header-and-navigation.md](./3-2-global-header-and-navigation.md)
- **Do not** modify `content.config.ts` unless glob `ignore` for `_schema-test` already landed in 2.4.

### Pagination math (context for 4.2)

```
posts.length = 9
POSTS_PER_PAGE = 12
numPages = ceil(9/12) = 1
```

Story **4.2** adds `/blog/page/2` only when `numPages > 1`; no page-2 file needed until post count exceeds 12.

### File structure (target)

```
site/src/
├── constants/blog.ts              # NEW — POSTS_PER_PAGE
├── layouts/BlogLayout.astro       # NEW
├── components/blog/
│   └── BlogPostTeaser.astro       # NEW
├── pages/blog/
│   └── index.astro                # NEW
└── utils/resolvePostIcon.ts       # NEW (optional)
docs/migration-parity-checklist.md # MODIFIED — blog list p1 row
```

### Guardrails

1. **No** `blog/page/[page].astro` — Story 4.2.
2. **No** post detail route (`[...slug]`, dynamic `path`, etc.) — Story 4.3.
3. **No** `/blog/category/[category]` — Story 4.4.
4. **No** Shiki / rehype-highlight — Story 4.5.
5. **No** `client:*` or list/grid toggle JS.
6. **No** category `<a href>` until category routes exist.
7. **No** changes to legacy `src/` or `gatsby-node.js`.
8. **No** full legacy blog sidebar unless product owner expands AC.
9. **`POSTS_PER_PAGE`** must be **12** to match legacy — do not paginate at 9.
10. **One `<h1>`** on index — “Blog”; teasers use `<h2>`.

### Edge cases

- **Empty collection** — Impossible today (9 posts); if zero, render empty `<ol>` and note in dev record.
- **`path` vs folder name** — Post 05 folder ≠ path slug; always use `data.path`. [2-2 deferred note]
- **Date timezone** — `z.coerce.date()`; format for display in en-GB or ISO; consistency matters less than sort order.
- **`ummutability` URL typo** — Preserve in links; redirect is Story 6.3.
- **Nav `isCurrent('/blog')`** — Matches `/blog` and `/blog/` prefixes via existing helper.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Verify sort: first teaser should be newest post by date (check frontmatter)
# dist/blog/index.html: 9 articles, mailto/header present
```

---

## References

- [Epics — Story 4.1](../planning-artifacts/epics.md)
- [Epics — Epic 4 goal](../planning-artifacts/epics.md)
- [PRD — FR3, FR7, FR8](../planning-artifacts/prd.md)
- [Architecture §5–7, §9](../planning-artifacts/architecture.md)
- [Story 2.2 — posts migration](./2-2-migrate-blog-post-markdown.md)
- [Migration parity checklist — Blog list](../../docs/migration-parity-checklist.md)
- [Legacy: `gatsby-node.js`](../../gatsby-node.js), [`blogListTemplate.js`](../../src/templates/blogListTemplate.js), [`post-item.js`](../../src/components/post-item.js)
- [Astro: Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro: Dynamic routing](https://docs.astro.build/en/guides/routing/)

---

## Dev agent record

### Agent model used

Composer (Cursor)

### Debug log references

Build output: `dist/blog/index.html` (4 pages total). First teaser: `/blog/demystifying-useReducer-hook` (2021-11-30). Astro emits `/blog/` directory; nav `isCurrent('/blog')` matches.

### Completion notes list

- AC1–AC6 satisfied. `POSTS_PER_PAGE = 12`; 9 posts on page 1, `date` DESC.
- Teaser `href` uses `entry.data.path` only (post detail 404 until **4.3** — expected).
- Category plain text; no category links (4.4).
- Trailing slash: canonical `/blog` → `dist/blog/index.html`.
- Gates: `check` / `build` / `test:schema` exit 0.

### File list

- `site/src/constants/blog.ts` (new)
- `site/src/layouts/BlogLayout.astro` (new)
- `site/src/components/blog/BlogPostTeaser.astro` (new)
- `site/src/utils/resolvePostIcon.ts` (new)
- `site/src/pages/blog/index.astro` (new)
- `docs/migration-parity-checklist.md` (modified)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). Epic 4.1 FR3 first page: `/blog` index, 12/page slice (9 shown), BlogLayout + BlogPostTeaser, path-based links, SEO strings, icon glob optional, no pagination/categories/posts body (4.2–4.5). | bmad-create-story |
| 2026-05-21 | Implemented blog index; status → review. | bmad-dev-story |
| 2026-05-21 | Code review: 0 patch; AC1–AC6 pass. Status → done. | bmad-code-review |
