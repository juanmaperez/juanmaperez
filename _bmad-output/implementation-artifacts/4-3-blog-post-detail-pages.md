# Story 4.3: Blog post detail pages

**Story ID:** 4.3  
**Story key:** `4-3-blog-post-detail-pages`  
**Status:** done  
**Epic:** 4 — Full blog reading experience  
**Depends on:** Stories **4.1–4.2** (`getSortedPosts`, `BlogLayout`, teasers linking to `data.path`), Epic **2.2** (migrated posts)  
**Followed by:** Story **4.4** (category index — can link categories from post header), Story **4.5** (Shiki syntax highlighting)

---

## Story

As a **reader**,  
I want **each post at its canonical `path`**,  
So that **FR4** is met.

---

## Acceptance criteria (from epics)

1. **Given** each post’s `path` frontmatter (e.g. `/blog/how-javascript-engine-works`)  
   **When** the site is built  
   **Then** a static HTML file exists at that URL for **all 9** posts (via `getStaticPaths` keyed on `path`, **not** folder name).

2. **Given** a post detail page  
   **When** rendered  
   **Then** the full markdown **body** renders inside `BlogLayout` with readable typography (`line-height`, heading spacing, `pre`/`code` blocks unstyled but legible — **Shiki deferred to 4.5**).

3. **Given** Story 3.1 heading policy  
   **When** HTML is inspected  
   **Then** exactly **one** `<h1>` shows the post `title`; markdown body must **not** emit a second top-level heading (legacy used `<h2>` for title — upgrade to `<h1>` per policy).

4. **Given** legacy post metadata row  
   **When** the page renders  
   **Then** it shows **formatted date**, **category** (plain text + optional icon from `resolvePostIcon` — **no** category link until 4.4), and uses `title` / `excerpt` for `BlogLayout` SEO props.

5. **Given** legacy prev/next (`gatsby-node.js` + `postTemplate.js`)  
   **When** posts are sorted **`date` DESC** (same as `getSortedPosts`)  
   **Then** adjacent navigation matches legacy indexing:
   - **`prev`** (left, ←): post at **index − 1** = **newer** article (null on newest post)
   - **`next`** (right, →): post at **index + 1** = **older** article (null on oldest post)  
   Document this in `docs/migration-parity-checklist.md` per-post rows (motion **n/a**, note prev/next parity).

6. **Given** deferred content fixes from Story 2.2 review  
   **When** detail routes render  
   **Then** these are corrected in markdown source:
   - Post **06** line 12: link → `/blog/high-order-functions-callbacks-inversion-control`
   - Post **09** line 122: link → `/blog/high-order-functions-callbacks-inversion-control` (remove erroneous quote wrapping)
   - Post **07**: newline after frontmatter closing `---`
   - Post **03**: `title` / `tags` typos `ummutability` → `immutability` (**keep** `path: '/blog/primitive-values-and-ummutability'` unchanged)
   - Post **03** body image `reassignment.png` resolves (co-located file; verify after `render()`)

7. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; built output includes all 9 post URLs.

---

## Tasks / subtasks

- [x] **Extend `site/src/utils/blogPosts.ts`** (AC5) — Add helpers:
  ```ts
  import type { CollectionEntry } from 'astro:content';

  export function getBlogSlugFromPath(path: string): string {
    const prefix = '/blog/';
    if (!path.startsWith(prefix) || path === '/blog' || path === '/blog/') {
      throw new Error(`Invalid post path for blog slug: ${path}`);
    }
    return path.slice(prefix.length);
  }

  export function getAdjacentPosts(
    posts: CollectionEntry<'posts'>[],
    entry: CollectionEntry<'posts'>,
  ) {
    const index = posts.findIndex((p) => p.id === entry.id);
    if (index < 0) return { prev: null, next: null };
    return {
      prev: index > 0 ? posts[index - 1]! : null,
      next: index < posts.length - 1 ? posts[index + 1]! : null,
    };
  }
  ```

- [x] **Create `site/src/pages/blog/[...slug].astro`** (AC1, AC2, AC3) — Core route:
  ```astro
  ---
  import BlogLayout from '../../layouts/BlogLayout.astro';
  import BlogPostNav from '../../components/blog/BlogPostNav.astro';
  import { getSortedPosts, getBlogSlugFromPath, getAdjacentPosts } from '../../utils/blogPosts';
  import { resolvePostIcon } from '../../utils/resolvePostIcon';
  import type { CollectionEntry } from 'astro:content';

  export async function getStaticPaths() {
    const posts = await getSortedPosts();
    return posts.map((entry) => ({
      params: { slug: getBlogSlugFromPath(entry.data.path) },
      props: { entry },
    }));
  }

  type Props = { entry: CollectionEntry<'posts'> };
  const { entry } = Astro.props;
  const posts = await getSortedPosts();
  const { prev, next } = getAdjacentPosts(posts, entry);
  const { Content } = await entry.render();
  const iconSrc = resolvePostIcon(entry.data.icon);
  ---
  <BlogLayout title={entry.data.title} description={entry.data.excerpt}>
    <article class="blog-post">
      <h1>{entry.data.title}</h1>
      <p class="blog-post__meta">...</p>
      <div class="blog-post__content">
        <Content />
      </div>
      <BlogPostNav prev={prev} next={next} />
    </article>
  </BlogLayout>
  ```
  - **`params.slug`** must reproduce `entry.data.path` as `/blog/{slug}` (Astro file `blog/[...slug].astro`).
  - Scoped CSS for `.blog-post__content` : `max-width: 670px` center column (legacy ~50% width), `pre { overflow-x: auto }`, `max-width: 100%`, no horizontal scroll (FR15).

- [x] **Create `site/src/components/blog/BlogPostNav.astro`** (AC5) — Props `prev` / `next` as `CollectionEntry<'posts'> | null`. Render only non-null sides. Links use `entry.data.path` and `entry.data.title`. Text: `← {prev.title}` / `{next.title} →`. Match legacy flex row; `:focus-visible` rings.

- [x] **Content repair pass** (AC6) — Edit only the files listed in AC6; do not change `path` values.

- [x] **Verify all 9 URLs in `dist/`** (AC1, AC7) — After build:
  ```bash
  cd site && npm run build
  for p in \
    how-javascript-engine-works \
    variables-and-values-javascript \
    primitive-values-and-ummutability \
    values-and-coercion \
    high-order-functions-callbacks-inversion-control \
    closure-high-order-functions \
    the-perfect-pizza-dough \
    deconstructing-fetch-browser-api \
    demystifying-useReducer-hook
  do
    test -f "dist/blog/${p}/index.html" -o -f "dist/blog/${p}.html" || echo "MISSING $p"
  done
  ```
  Record which pattern Astro emits in completion notes.

- [x] **Migration parity checklist** (AC5) — For each post row under “Blog — posts”, add Notes: `Story 4.3: static detail; prev/next per legacy DESC index`.

- [x] **Manual smoke** — Open newest + oldest post from `/blog` teasers; internal links in post 06 navigate correctly; `reassignment.png` loads on post 03; keyboard through prev/next; one `h1`.

- [x] **Do not** add Shiki, category index routes, or project routes (4.4, 4.5, 5.1).

### Review Findings

_Generated by `code-review` workflow on 2026-05-21 (story 4.3). 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (3) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] `[...slug].astro` calls `getSortedPosts()` twice per page (paths + render) — acceptable at build scale; dedupe in props if post count grows.
- [x] [Review][Defer] `<title>` uses post title only (not `Juanma Perez | …`) — matches story template; Story **6.1** may unify SEO pattern.
- [x] [Review][Defer] No category links until **4.4** — plain text per guardrails.

**Dismissed** (12):
- AC1 nine `dist/blog/{slug}/index.html` from `data.path` — **pass**.
- AC2 `render(entry)` from `astro:content`; typography + `pre` scroll — **pass**.
- AC3 one `<h1>` per post — **pass**.
- AC4 date, category, icon, title/excerpt SEO — **pass**.
- AC5 prev=newer / next=older on newest (next only) and oldest (prev only) — **pass**; `rel="prev"`/`rel="next"`.
- AC6 posts 03/06/07/09 fixes; `path` on 03 unchanged — **pass**; `reassignment` → `/_astro/reassignment.*.webp`.
- AC7 gates 0/0/0; 13 pages — **pass**.
- Post 06 body link `/blog/high-order-functions-callbacks-inversion-control` — **pass**.
- No Shiki / category routes / `client:*` — **pass**.
- `blog/page/[page].astro` routing not shadowed by catch-all — **pass**.
- Parity checklist 9 rows updated — **pass**.
- Astro 6 `render()` import (not `entry.render()`) — **pass**.

---

## Post URL inventory (authoritative)

| `path` | Folder (do not use for routing) |
|--------|----------------------------------|
| `/blog/how-javascript-engine-works` | `01-how-javascript-engine-works/` |
| `/blog/variables-and-values-javascript` | `02-variables-and-values/` |
| `/blog/primitive-values-and-ummutability` | `03-primitive-values-and-ummutability/` |
| `/blog/values-and-coercion` | `04-values-and-coercion/` |
| `/blog/high-order-functions-callbacks-inversion-control` | `05-functions-and-callbacks/` |
| `/blog/closure-high-order-functions` | `06-high-order-functions-and-closure/` |
| `/blog/the-perfect-pizza-dough` | `07-poolish-and-pizza-dough/` |
| `/blog/deconstructing-fetch-browser-api` | `08-deconstructing-fetch/` |
| `/blog/demystifying-useReducer-hook` | `09-demystifying-useReducer/` |

---

## Legacy prev/next semantics (must match)

Posts array sorted **`date` DESC** (newest first), same as `getSortedPosts()`:

| Index | Post (example) | `prev` link | `next` link |
|-------|----------------|-------------|-------------|
| 0 | Newest | — | older (#1) |
| 1 | Middle | newer (#0) | older (#2) |
| 8 | Oldest | newer (#7) | — |

Legacy labels “Previous” / “Next” are **index-based**, not chronological reader terms — match for parity.

---

## Dev notes

### Architecture compliance

- **§5.2** — `getStaticPaths` from `posts` collection using `path` as URL key. Implement as `pages/blog/[...slug].astro` with `slug` = segment after `/blog/`. [architecture.md §5.2](../planning-artifacts/architecture.md)
- **§7** — Replaces per-post `createPage` in `gatsby-node.js`. [architecture.md §7](../planning-artifacts/architecture.md)
- **`entry.render()`** — Use Astro content `render()` for markdown body (not raw `entry.body` unless required by Astro 6 docs).

### PRD

- **FR4** — Individual blog post at public URL with full body. [prd.md FR4](../planning-artifacts/prd.md)
- **FR21** — Fixing internal markdown links in AC6 prevents broken links **on** post pages.

### Stories 4.1 / 4.2 intelligence

- Teasers already link to `entry.data.path` — this story makes targets resolve. [4-1-blog-index-first-page.md](./4-1-blog-index-first-page.md)
- Reuse `getSortedPosts()`, `BlogLayout`, `resolvePostIcon`. [4-2-blog-pagination.md](./4-2-blog-pagination.md)
- Do **not** register routes under `pages/[...slug].astro` at repo root unless slug includes full path — prefer **`blog/[...slug].astro`** so only `/blog/*` posts are generated here (projects use `/projects/*` in Epic 5).

### Epic 2.2 deferred work (in scope for 4.3)

See [deferred-work.md](./deferred-work.md) — items explicitly assigned to Story 4.3 in AC6.

### Typography / code blocks

- Legacy `post-content` styles: 17px body, 1.6 line-height, blockquote border — approximate with scoped CSS; no global stylesheet.
- Fenced ```js blocks: plain monospace OK until **4.5** (Shiki). Ensure `pre` scrolls horizontally inside column without page overflow.

### Body images

- Co-located images (e.g. `reassignment.png` next to `primitive-values-and-ummutability.md`) should resolve relative to the content file when using `render()`. If broken after build, fix markdown to explicit relative path `./reassignment.png` or document Astro image remark plugin deferral to 5.2 — **must not** ship broken image on post 03.

### File structure (target)

```
site/src/
├── pages/blog/
│   └── [...slug].astro           # NEW — all post detail URLs
├── components/blog/
│   └── BlogPostNav.astro         # NEW
├── utils/blogPosts.ts            # MODIFIED — slug + adjacent helpers
└── content/posts/**              # MODIFIED — AC6 content fixes only
docs/migration-parity-checklist.md
```

### Guardrails

1. **No** Shiki / `rehype-pretty-code` — 4.5.
2. **No** `/blog/category/` routes or category links — 4.4 (plain category text OK).
3. **No** `client:*` resize listeners (legacy `postTemplate` window height) — static layout.
4. **No** Font Awesome dependency — use text arrows `←` `→`.
5. **Do not** derive URL from content folder name (post 05 mismatch).
6. **Do not** change any post `path` frontmatter (URL stability / 6.3 redirects).
7. **One `<h1>`** — post title only; strip or avoid `# Title` as first line in markdown if any post has it.
8. **Do not** add root-level catch-all that could collide with future `/projects/*` routes.
9. **Do not** implement “Back to list” unless desired — legacy commented it out; optional link to `/blog` is nice-to-have, not required.
10. **Run** `npm run check` after content edits — schema must stay valid.

### Edge cases

- **Slug with special characters** — paths are kebab-case; no issues expected.
- **`useReducer` casing in path** — preserve exact frontmatter `demystifying-useReducer-hook`.
- **Markdown `h2` in body** — allowed below page `<h1>`; do not skip heading levels in authored content (pre-existing).
- **Duplicate paths** — schema does not enforce uniqueness; if duplicate `path`, last wins — not an issue with current 9 posts.
- **Prev/next on only 9 posts** — all middle posts show both links; newest/oldest show one side.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Spot-check one post HTML contains <article and <h1
# Click-through from dist/blog/index.html teaser hrefs
```

---

## References

- [Epics — Story 4.3](../planning-artifacts/epics.md)
- [PRD — FR4, FR21](../planning-artifacts/prd.md)
- [Architecture §5.2, §7](../planning-artifacts/architecture.md)
- [Story 2.2 — posts + deferred fixes](./2-2-migrate-blog-post-markdown.md)
- [Story 4.1](./4-1-blog-index-first-page.md), [Story 4.2](./4-2-blog-pagination.md)
- [Migration parity checklist — Blog posts](../../docs/migration-parity-checklist.md)
- [Legacy: `gatsby-node.js` post loop](../../gatsby-node.js), [`postTemplate.js`](../../src/templates/postTemplate.js)
- [Astro: Content `render()`](https://docs.astro.build/en/guides/content-collections/#rendering-body-content)
- [Astro: Dynamic routes](https://docs.astro.build/en/guides/routing/#dynamic-routes)

---

## Dev agent record

### Agent model used

Composer (Cursor)

### Debug log references

Astro 6: `import { render } from 'astro:content'` (not `entry.render()`). Output pattern: `dist/blog/{slug}/index.html` (13 pages total).

### Completion notes list

- AC1–AC7 satisfied. All 9 posts at `dist/blog/{slug}/index.html`.
- `getBlogSlugFromPath` + `getAdjacentPosts` (prev=newer, next=older, DESC index).
- AC6: posts 03/06/07/09 content fixes; `path` on post 03 unchanged.
- `reassignment.png` resolves (Astro optimized to `/_astro/reassignment.*.webp` in build).
- No Shiki; category text only (no links until 4.4).

### File list

- `site/src/utils/blogPosts.ts` (modified)
- `site/src/pages/blog/[...slug].astro` (new)
- `site/src/components/blog/BlogPostNav.astro` (new)
- `site/src/content/posts/03-primitive-values-and-ummutability/primitive-values-and-ummutability.md` (modified)
- `site/src/content/posts/06-high-order-functions-and-closure/high-order-functions-and-closure.md` (modified)
- `site/src/content/posts/07-poolish-and-pizza-dough/poolish-and-pizza-dough.md` (modified)
- `site/src/content/posts/09-demystifying-useReducer/demystifying-useReducer.md` (modified)
- `docs/migration-parity-checklist.md` (modified)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR4: `blog/[...slug].astro` from `path`, render body, legacy prev/next, AC6 content fixes, typography without Shiki, 9 URL inventory. | bmad-create-story |
| 2026-05-21 | Implemented post detail routes + AC6 fixes; status → review. | bmad-dev-story |
| 2026-05-21 | Code review: 0 patch; AC1–AC7 pass. Status → done. | bmad-code-review |
