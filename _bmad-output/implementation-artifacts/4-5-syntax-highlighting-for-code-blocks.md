# Story 4.5: Syntax highlighting for code blocks

**Story ID:** 4.5  
**Story key:** `4-5-syntax-highlighting-for-code-blocks`  
**Status:** done  
**Epic:** 4 — Full blog reading experience  
**Depends on:** Story **4.3** (`blog/[...slug].astro` renders post body via `render(entry)`); Stories **4.1–4.4** complete  
**Followed by:** Epic **5** (project detail routes)

---

## Story

As a **reader**,  
I want **highlighted code** in posts,  
So that **FR14** is satisfied.

---

## Acceptance criteria (from epics)

1. **Given** fenced code blocks in migrated post markdown (` ```js ` fences)  
   **When** a technical post detail page is built  
   **Then** output uses **Shiki** (architecture default) with **syntax-colored tokens** (not plain monospace only).

2. **Given** the site’s light reading surface (`#323846` text, `#f5f3ee` page background per Story 4.3)  
   **When** code blocks render  
   **Then** contrast is **readable** on desktop and mobile (no illegible low-contrast tokens on the default viewport).  
   **Note:** There is **no** sitewide dark-mode toggle today — dual light/dark Shiki themes are **optional**; a single **light-appropriate** theme is sufficient for AC2 unless you add `prefers-color-scheme` support.

3. **Given** inline backtick code in prose  
   **When** rendered inside `.blog-post__content`  
   **Then** it remains legible and does **not** inherit block-level `pre` padding/background rules.

4. **Given** Story 4.3 scoped CSS for `pre` / `code`  
   **When** Shiki is enabled  
   **Then** custom rules **do not** strip Shiki colors (avoid overriding `pre.astro-code` token backgrounds/colors unintentionally).

5. **Given** legacy `gatsby-remark-prismjs`  
   **When** comparing parity  
   **Then** document in `docs/migration-parity-checklist.md` that highlighting is **Shiki** (not Prism CSS) — functional parity for FR14, not pixel-perfect Prism theme match.

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; built HTML for posts with fences includes `pre` with Shiki markup (e.g. `class` contains `astro-code` and colored `<span>` children).

---

## Tasks / subtasks

- [x] **Configure Shiki in `site/astro.config.mjs`** (AC1, AC2, AC6) — Explicitly enable highlighting for Astro 6.1.x:
  ```js
  export default defineConfig({
    // ...existing site, base, output...
    markdown: {
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-light', // light blog surface; see Dev Notes
        wrap: true,
      },
    },
  });
  ```
  **Why explicit `syntaxHighlight`:** Astro 6.1.x may omit Shiki CSS when unset (regression class of [astro#15582](https://github.com/withastro/astro/issues/15582)). Verify after build that `dist/blog/.../index.html` includes Shiki styles for fenced blocks.

- [x] **Reconcile `.blog-post__content` code CSS** in `site/src/pages/blog/[...slug].astro` (AC3, AC4) — Keep `overflow-x: auto`, `max-width: 100%`. **Remove or narrow** the blanket `pre { background: #f5f3ee; }` rule so it does not fight Shiki’s `pre.astro-code` inline theme. Suggested pattern:
  ```css
  .blog-post__content :global(pre.astro-code) {
    overflow-x: auto;
    max-width: 100%;
    padding: 1rem;
    font-size: 0.9rem;
    line-height: 1.45;
  }
  .blog-post__content :global(:not(pre) > code) {
    /* inline code only */
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    background: #f0ede6;
    padding: 0.1em 0.35em;
    border-radius: 3px;
  }
  ```
  Do **not** set `color`/`background` on `.astro-code span` unless adding documented dual-theme overrides.

- [x] **Optional: global Shiki stylesheet** (AC2) — Only if inline Shiki output is insufficient after config: add minimal global rules in `BaseLayout.astro` or a dedicated `src/styles/shiki.css` imported once, targeting `.astro-code` per [Astro syntax highlighting guide](https://docs.astro.build/en/guides/syntax-highlighting/). Prefer config-only fix first. **Skipped** — `github-light` inline styles sufficient; no global CSS added.

- [x] **Verify post inventory with fences** (AC1, AC6) — Posts containing fenced blocks (all `javascript` except none in recipes post):
  | Post | `path` | Fence count (approx) |
  |------|--------|----------------------|
  | 01 | `/blog/how-javascript-engine-works` | 6 blocks |
  | 02 | `/blog/variables-and-values-javascript` | 7 |
  | 03 | `/blog/primitive-values-and-ummutability` | 5 |
  | 04 | `/blog/values-and-coercion` | 10 |
  | 05 | `/blog/high-order-functions-callbacks-inversion-control` | 6 |
  | 06 | `/blog/closure-high-order-functions` | 6 |
  | 08 | `/blog/deconstructing-fetch-browser-api` | 11 |
  | 09 | `/blog/demystifying-useReducer-hook` | 6 |
  | 07 | `/blog/the-perfect-pizza-dough` | **0** (smoke: page still builds) |

  Build verify: post 03 → 5× `<pre class="astro-code github-light">` + token spans; post 07 → 0 fenced blocks; zero `github-dark` in `dist/blog/*/index.html`.

- [x] **Manual smoke** (AC2, AC4) — Open posts **03**, **08**, **09** at 320px width: horizontal scroll only inside `pre`, tokens readable, inline `code` in paragraphs unaffected.

- [x] **Update migration parity checklist** (AC5) — Under blog post rows (or a new “Blog — code highlighting” note), record: Shiki / `github-light`, Story 4.5, replaces `gatsby-remark-prismjs`.

- [x] **Do not** add `@astrojs/mdx`, Prism CSS, `client:*`, or change markdown bodies in this story.

### Review Findings

_Code review 2026-05-22 — story `4-5-syntax-highlighting-for-code-blocks` (3 files, +14/−6). Gates re-run: check/build/test:schema → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch`, `decision-needed`, or `defer` items.

| AC | Verdict |
|----|---------|
| AC1 | `pre.astro-code github-light` + token spans on posts 01–06, 08–09 |
| AC2 | Light theme; no `github-dark` in `dist/blog/` |
| AC3 | `:not(pre) > code` — inline only; block tokens untouched |
| AC4 | No `color`/`background` on `.astro-code span` |
| AC5 | `docs/migration-parity-checklist.md` FR14 note |
| AC6 | 16 pages; post 07 → 0 fenced blocks |

---

## Current baseline (pre-story)

Build output **already** included Shiki markup on some posts (`<pre class="astro-code github-dark" …>` with token `<span style="color:…">`). Story 4.3 left “Shiki deferred” in AC2 text, but Astro’s markdown pipeline applied a **dark** theme on a **light** layout, while scoped CSS also sets `pre { background: #f5f3ee }`. This story **locks configuration**, **fixes readability**, and **documents** FR14 parity.

---

## Legacy vs MVP

| Legacy (`gatsby-remark-prismjs`) | Story 4.5 |
|----------------------------------|-----------|
| Prism token classes + theme CSS | Shiki `astro-code` + inline/CSS theme |
| Default Prism theme | `github-light` (or documented choice) |
| `inlineCodeMarker: "÷"` | Standard markdown inline backticks |

---

## Dev notes

### Architecture compliance

- **§6.1** — “Body: Markdown; code highlighting via **Shiki**”. [architecture.md §6.1](../planning-artifacts/architecture.md)
- **§7** — `gatsby-remark-prismjs` → Shiki / rehype. [architecture.md §7](../planning-artifacts/architecture.md)

### PRD

- **FR14** — Visitor sees syntax-highlighted code in technical posts. [prd.md FR14](../planning-artifacts/prd.md)

### Stories 4.1–4.4 intelligence

- **4.3** — Post detail at `site/src/pages/blog/[...slug].astro`; body via `render(entry)` from `astro:content`; existing `pre`/`code` scoped styles. [4-3-blog-post-detail-pages.md](./4-3-blog-post-detail-pages.md)
- **4.4** — Category/index routes unchanged; highlighting applies only to **post body** markdown. [4-4-category-index-pages.md](./4-4-category-index-pages.md)
- **No new npm dependency** — Astro 6.1.8 bundles Shiki (`shiki` ^4 in lockfile).

### Astro 6 configuration notes

- Use `markdown.syntaxHighlight: 'shiki'` string form for compatibility with style injection.
- `markdown.shikiConfig.theme` — pick a **light** built-in theme (`github-light`, `one-light`, etc.) matching blog background; avoid `github-dark` on default light pages unless adding dual-theme CSS.
- Fenced blocks use language from fence info string (`js` → JavaScript). Posts use ` ```js ` today — no `ts`/`astro` fences.
- **Do not** use `<Code />` from `astro:components` for post bodies — content collection markdown only.

### File structure (target)

```
site/
├── astro.config.mjs                    # MODIFIED — markdown.shikiConfig
└── src/pages/blog/[...slug].astro      # MODIFIED — pre/code CSS reconcile
docs/migration-parity-checklist.md      # MODIFIED — FR14 / Shiki note
```

### Guardrails

1. **No** Prism packages or CSS in `site/package.json`.
2. **No** edits to `site/src/content/posts/**` markdown except if a fence is malformed (none expected).
3. **No** changes to `content.config.ts`, routes, pagination, or category pages.
4. **No** `client:*` or runtime highlighter.
5. **No** project (`projects` collection) highlighting in this story — posts only (FR14 scope).
6. **Preserve** `pre` horizontal scroll (FR15 / 4.3).
7. **Preserve** one `<h1>` per post; Shiki must not inject extra headings.
8. **Run** full gate trio after changes.

### Edge cases

- **Post 07 (recipes)** — No fenced blocks; page must still build and pass gates.
- **Malformed fence** — If any post lacks closing fence, build fails loudly; fix fence only if encountered.
- **Inline vs block** — Only `pre.astro-code` gets block theme; inline `code` stays subtle per task CSS.
- **Large blocks** — `wrap: true` in `shikiConfig` reduces horizontal scroll pressure; keep `overflow-x: auto`.
- **Future dark mode** — If added later, switch to `shikiConfig.themes: { light, dark }` + `.astro-code` dual-theme CSS; out of scope unless product owner requests in-story.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Token-colored spans present:
grep -E 'astro-code|shiki' dist/blog/primitive-values-and-ummutability/index.html | head
# Light-theme sanity (no github-dark class after fix):
grep -o 'astro-code [^"]*' dist/blog/primitive-values-and-ummutability/index.html | head -1
```

---

## References

- [Epics — Story 4.5](../planning-artifacts/epics.md)
- [PRD — FR14](../planning-artifacts/prd.md)
- [Architecture §6.1, §7](../planning-artifacts/architecture.md)
- [Stories 4.3, 4.4](./4-3-blog-post-detail-pages.md)
- [Migration parity checklist](../../docs/migration-parity-checklist.md)
- [Legacy: `gatsby-config.js` prism plugin](../../gatsby-config.js)
- [Astro: Syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/)

---

## Dev agent record

### Agent model used

Composer (dev-story continuation)

### Debug log references

- Gates: `check` 0/0/0, `build` 16 pages, `test:schema` OK (Node 22.12).
- `dist/blog/primitive-values-and-ummutability/index.html`: 5× `<pre class="astro-code github-light">`, colored `<span style="color:…">`; no `github-dark` under `dist/blog/`.
- `dist/blog/the-perfect-pizza-dough/index.html`: 0 fenced `<pre class="astro-code">` (grep `astro-code` in CSS selector only).

### Completion notes list

- AC1/2/4/6: `markdown.syntaxHighlight: 'shiki'`, `shikiConfig.theme: 'github-light'`, `wrap: true` in `site/astro.config.mjs`.
- AC3/4: `[...slug].astro` — `pre.astro-code` layout only; inline `:not(pre) > code` subtle background; removed blanket `pre { background: #f5f3ee }`.
- AC5: `docs/migration-parity-checklist.md` FR14 note (Shiki vs Prism).
- No global shiki.css; no markdown/package/route changes.

### File list

- `site/astro.config.mjs`
- `site/src/pages/blog/[...slug].astro`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/4-5-syntax-highlighting-for-code-blocks.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR14: explicit Shiki config, reconcile post `pre`/`code` CSS vs `astro-code`, verify 8 technical posts + recipes smoke, parity checklist. | bmad-create-story |
| 2026-05-22 | Implemented Shiki `github-light`, CSS reconcile, parity doc; gates green; status → review. | dev-story |
| 2026-05-22 | Code review: clean; AC1–6 verified; status → done. Epic 4 complete. | code-review |
