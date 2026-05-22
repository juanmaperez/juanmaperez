# Story 4.4: Category index pages

**Story ID:** 4.4  
**Story key:** `4-4-category-index-pages`  
**Status:** done  
**Epic:** 4 — Full blog reading experience  
**Depends on:** Stories **4.1–4.3** (`getSortedPosts`, `BlogPostList`, `BlogPostTeaser`, post routes live)  
**Followed by:** Story **4.5** (syntax highlighting)

---

## Story

As a **reader**,  
I want **`/blog/category/{category}`** listing posts in that category,  
So that **FR5** is satisfied.

---

## Acceptance criteria (from epics)

1. **Given** distinct `category` values on migrated posts  
   **When** the site is built  
   **Then** static routes exist for **exactly** the non-empty categories present in content today:
   - `/blog/category/javascript` (7 posts)
   - `/blog/category/react` (1 post)
   - `/blog/category/recipes` (1 post)  
   **And** no routes are generated for categories with zero posts.

2. **Given** a category page  
   **When** rendered  
   **Then** only posts where `entry.data.category` matches the route param appear, sorted **`date` DESC** (same order as main blog index).

3. **Given** each listed post  
   **When** shown on a category page  
   **Then** teasers match Story 4.1 (title, excerpt, link to `path`, date, category) via reused `BlogPostList` / `BlogPostTeaser`.

4. **Given** legacy category template copy  
   **When** `/blog/category/javascript` loads  
   **Then** page has one `<h1>`: **All about {category}** (legacy used `<h2>` — upgrade per heading policy), `BlogLayout` title `Juanma Perez | {category}`, description `Little of knowledge about {category}`.

5. **Given** category links were deferred in 4.1–4.3  
   **When** this story completes  
   **Then**:
   - `BlogPostTeaser` renders **category as a link** to `/blog/category/{category}`
   - Post detail `[...slug].astro` renders category in meta row as the same link  
   - Main blog index and category pages both use linked categories (FR21: no broken internal links)

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; `dist/blog/category/{cat}/index.html` exists for all three categories.

---

## Tasks / subtasks

- [x] **Extend `site/src/utils/blogPosts.ts`** (AC1, AC2) — Add:
  ```ts
  export function getDistinctCategories(
    posts: CollectionEntry<'posts'>[],
  ): string[] {
    return [...new Set(posts.map((p) => p.data.category))].sort();
  }

  export function getPostsByCategory(
    posts: CollectionEntry<'posts'>[],
    category: string,
  ): CollectionEntry<'posts'>[] {
    return posts.filter((p) => p.data.category === category);
  }

  export function getCategoryPath(category: string): string {
    return `/blog/category/${category}`;
  }
  ```
  Only emit `getStaticPaths` entries for categories returned by `getDistinctCategories` (implicitly excludes empty).

- [x] **Create `site/src/pages/blog/category/[category].astro`** (AC1–AC4) — Pattern:
  ```astro
  ---
  import BlogLayout from '../../../layouts/BlogLayout.astro';
  import BlogIndexShell from '../../../components/blog/BlogIndexShell.astro';
  import { getSortedPosts, getDistinctCategories, getPostsByCategory } from '../../../utils/blogPosts';

  export async function getStaticPaths() {
    const posts = await getSortedPosts();
    const categories = getDistinctCategories(posts);
    return categories.map((category) => ({
      params: { category },
      props: {
        category,
        entries: getPostsByCategory(posts, category),
      },
    }));
  }

  interface Props {
    category: string;
    entries: CollectionEntry<'posts'>[];
  }
  const { category, entries } = Astro.props;
  ---
  <BlogLayout
    title={`Juanma Perez | ${category}`}
    description={`Little of knowledge about ${category}`}
  >
    <BlogIndexShell
      h1={`All about ${category}`}
      entries={entries}
      currentPage={1}
      numPages={1}
    />
  </BlogLayout>
  ```
  - **No pagination** on category pages (legacy `categoryTemplate` used `limit: 2000` — all posts in one list). `numPages={1}` hides `BlogPagination` controls.
  - Optional: link back to `/blog` above list (legacy omitted — nice-to-have, not required).

- [x] **Wire category links in `BlogPostTeaser.astro`** (AC5) — When `category` prop is set, render:
  ```astro
  <a href={getCategoryPath(category)}>{category}</a>
  ```
  Import `getCategoryPath` from `blogPosts.ts` (or pass `categoryHref` from parent). Apply `:focus-visible` on category link.

- [x] **Wire category link in `site/src/pages/blog/[...slug].astro`** (AC5) — Replace plain `<span class="blog-post__category">` text with link to `getCategoryPath(entry.data.category)`; keep icon markup.

- [x] **Route collision check** (AC1) — Confirm `blog/category/[category].astro` takes precedence over `blog/[...slug].astro` for paths like `/blog/category/javascript` (literal `category` segment). Post slugs must not include `category/...` — true today.

- [x] **Update migration parity checklist** — Fill category rows (javascript, react, recipes): Motion **n/a**, Islands **N**, Notes “Story 4.4”.

- [x] **Validation** (AC6) — Build and verify:
  ```bash
  cd site && npm run check && npm run build && npm run test:schema
  for c in javascript react recipes; do
    test -f "dist/blog/category/${c}/index.html" && echo "OK $c"
  done
  # javascript page: 7 teasers; react: 1; recipes: 1
  grep -c 'href="/blog/category/javascript"' dist/blog/index.html dist/blog/category/javascript/index.html
  ```

- [x] **Manual smoke** — From a post detail page, click category → category index; from category page, open a post; 320px no horizontal scroll.

- [x] **Do not** add category pagination, Shiki, or nav header entries for categories.

### Review Findings

_Generated by `code-review` workflow on 2026-05-22 (story 4.4). 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (2) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] [`BlogPostTeaser.astro`](../../site/src/components/blog/BlogPostTeaser.astro) category **icon** is not inside the category `<a>` — legacy `post-item.js` linked only the icon; AC5 satisfied by text link; wrap icon in link if strict icon parity wanted.
- [x] [Review][Defer] [`getPostsByCategory`](../../site/src/utils/blogPosts.ts) preserves caller sort order — safe today via `getSortedPosts()` in `getStaticPaths`; add explicit `date` DESC in helper if reused elsewhere.

**Dismissed** (11):
- AC1 three `dist/blog/category/{javascript,react,recipes}/index.html`; 16 pages built — **pass**.
- AC2 seven / one / one teasers; `date` DESC preserved from sorted input — **pass**.
- AC3 `BlogIndexShell` + `BlogPostList` + `BlogPostTeaser` — **pass**.
- AC4 `<h1>All about {category}</h1>`; `BlogLayout` title/description legacy strings — **pass**.
- AC5 category `<a href="/blog/category/...">` on teaser + post detail; `:focus-visible` on detail — **pass**.
- AC6 `check` / `build` / `test:schema` exit 0 (re-run 2026-05-22, Node ≥22) — **pass**.
- `blog/category/[category].astro` wins over `[...slug].astro` for `/blog/category/*` — **pass**.
- No pagination / Shiki / nav category entries / `client:*` — **pass**.
- `z.string().min(1)` on `category` — no empty-category routes — **pass**.
- Parity checklist three category rows — **pass**.
- `SiteHeader` `aria-current` on Blog for `/blog/category/*` — **pass**.

---

## Category inventory (current content)

| Category | Post count | URL |
|----------|------------|-----|
| `javascript` | 7 | `/blog/category/javascript` |
| `react` | 1 | `/blog/category/react` |
| `recipes` | 1 | `/blog/category/recipes` |

Posts filtered by **exact string match** on `data.category` (case-sensitive). All current values are lowercase.

---

## Legacy vs MVP

| Legacy (`categoryTemplate.js`) | Story 4.4 |
|--------------------------------|-----------|
| `h2` “All about {category}” | `<h1>` via `BlogIndexShell` |
| `PostItem` list | `BlogPostTeaser` via `BlogPostList` |
| Category icon links to category URL | Teaser + detail category links |
| List/grid toggle buttons | Omitted (same as 4.1) |
| All posts in category, no pagination | Same |

---

## Dev notes

### Architecture compliance

- **§5.2** — `/blog/category/[category]/` from distinct category values. [architecture.md §5.2](../planning-artifacts/architecture.md)
- **§7** — Replaces `gatsby-node.js` category `createPage` loop. [architecture.md §7](../planning-artifacts/architecture.md)

### PRD

- **FR5** — Filtered category listing at `/blog/category/:category`. [prd.md FR5](../planning-artifacts/prd.md)
- **FR21** — Category links on index/teasers/detail must resolve after this story.

### Stories 4.1–4.3 intelligence

- **4.1** explicitly deferred category links in `BlogPostTeaser` — **enable in 4.4**. [4-1-blog-index-first-page.md](./4-1-blog-index-first-page.md)
- **4.3** post detail uses plain category text — **upgrade to link** in this story. [4-3-blog-post-detail-pages.md](./4-3-blog-post-detail-pages.md)
- Reuse **`BlogIndexShell`** + **`BlogPostList`** — do not duplicate list markup. [4-2-blog-pagination.md](./4-2-blog-pagination.md)

### Astro routing note

File layout:

```
site/src/pages/blog/
  index.astro
  [...slug].astro          # /blog/{post-slug}
  category/[category].astro  # /blog/category/{cat}  ← more specific
  page/[page].astro
```

Astro matches static `category` before rest param for `/blog/category/javascript`.

### File structure (target)

```
site/src/
├── pages/blog/category/[category].astro   # NEW
├── components/blog/BlogPostTeaser.astro   # MODIFIED — category link
├── pages/blog/[...slug].astro             # MODIFIED — category link
└── utils/blogPosts.ts                     # MODIFIED — category helpers
docs/migration-parity-checklist.md           # MODIFIED
```

### Guardrails

1. **No** category pagination (unless product owner expands — out of legacy scope).
2. **No** categories in global `siteConfig.nav` — discovery via post metadata and teasers only.
3. **Do not** generate pages for hypothetical categories not in any post frontmatter.
4. **Do not** normalize category strings (e.g. don’t rename `javascript` → `JavaScript`).
5. **No** `client:*` list/grid toggle.
6. **Do not** change post `category` frontmatter values in this story.
7. **Case-sensitive** filter — `category` param must match `data.category` exactly.
8. **Do not** break post routes whose slug accidentally equals `category/foo` — N/A with current paths.
9. **One `<h1>`** per category page — “All about {category}”.
10. **Run** full gate trio after changes.

### Edge cases

- **Single-post categories** (`react`, `recipes`) — valid; page shows one teaser.
- **`SiteHeader` `aria-current`** — `/blog/category/javascript` should still mark **Blog** nav active (`startsWith('/blog')`) — no change needed.
- **Future category with space/special chars** — would need encoding; current slugs are simple identifiers.
- **Cross-link from legacy post icon** — now satisfied on detail + list pages.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Count posts on javascript category page in HTML
# Click category from post detail in preview
```

---

## References

- [Epics — Story 4.4](../planning-artifacts/epics.md)
- [PRD — FR5, FR21](../planning-artifacts/prd.md)
- [Architecture §5.2](../planning-artifacts/architecture.md)
- [Stories 4.1–4.3](./4-1-blog-index-first-page.md)
- [Migration parity checklist — categories](../../docs/migration-parity-checklist.md)
- [Legacy: `categoryTemplate.js`](../../src/templates/categoryTemplate.js), [`gatsby-node.js` category loop](../../gatsby-node.js)

---

## Dev agent record

### Agent model used

Composer (Cursor)

### Debug log references

Build: 16 pages; category routes `dist/blog/category/{javascript,react,recipes}/index.html`. Teaser counts: js=7, react=1, recipes=1.

### Completion notes list

- AC1–AC6 satisfied. `getDistinctCategories` / `getPostsByCategory` / `getCategoryPath`.
- Category pages reuse `BlogIndexShell`; `numPages={1}` hides pagination.
- Category links in `BlogPostTeaser` + post detail meta row.
- No routes for empty categories (only 3 from content).

### File list

- `site/src/utils/blogPosts.ts` (modified)
- `site/src/pages/blog/category/[category].astro` (new)
- `site/src/components/blog/BlogPostTeaser.astro` (modified)
- `site/src/pages/blog/[...slug].astro` (modified)
- `docs/migration-parity-checklist.md` (modified)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR5: category routes for javascript/react/recipes, BlogIndexShell reuse, category links in teaser + detail, no empty categories, legacy SEO copy. | bmad-create-story |
| 2026-05-21 | Implemented category index pages + category links; status → review. | bmad-dev-story |
| 2026-05-22 | Code review: 0 patch; AC1–AC6 pass. Status → done. | bmad-code-review |
