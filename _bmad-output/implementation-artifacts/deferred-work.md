# Deferred work

Items deferred from code reviews and stories (not blocking current slice).

## Deferred from: code review of 2-1-define-posts-and-projects-schemas (2026-05-21)

- CI runs `npm run build` only, not `npm run check` / `test:schema` — Story **2.4** owns FR17 CI gate.
- `[glob-loader] No files found` warnings on empty collection dirs until Stories 2.2 / 2.3 migrate content.
- No positive fixture proving legacy-shaped valid frontmatter passes — add during **2.2** migration validation.

## Deferred from: code review of 2-2-migrate-blog-post-markdown (2026-05-21)

- **Broken cross-post link in post 06** — `[High order functions](/high-order-functions-callbacks-inversion-control)` missing `/blog/` prefix [`site/src/content/posts/06-high-order-functions-and-closure/high-order-functions-and-closure.md:12`]. Fix in **Story 4.3** when routes render the body and a smoke check would catch 404s.
- **Broken cross-post link in post 09** — `[inversion of control]('/high-order-functions-callbacks-inversion-control')` missing `/blog/` AND wrapped in literal single quotes [`site/src/content/posts/09-demystifying-useReducer/demystifying-useReducer.md:122`]. Fix in **Story 4.3** alongside link cleanup pass.
- **Post 07 missing newline after frontmatter `---` fence** [`site/src/content/posts/07-poolish-and-pizza-dough/poolish-and-pizza-dough.md:11`]. YAML parses today but body's first line glues to the fence. Fix in **Story 4.3** body cleanup pass (only matters once a route renders the post).
- **Post 03 `title`/`tags` typo `ummutability` / `ummutable values`** [`site/src/content/posts/03-primitive-values-and-ummutability/primitive-values-and-ummutability.md:3-7`]. Story 2.2 spec only justified preserving the typo in `path` (URL stability) — presentational fields should read `immutability`. Fix in **Story 4.3** presentational copy edit.
- **Bulk-copied unused icons + favicon-style assets** [`site/src/assets/icons/`]: only `javascript.png`, `react.png`, `recipes.png` are referenced. Re-home favicons (`icon16/32/64.png`, `icon-manifest.png`) into `site/public/` during **Story 3.1** when favicons are wired. Prune the remaining unused icons (`angular`, `css3`, `gatsbyjs`, `git`, `graphql`, `html5`, `nodejs`, `typescript`, `vuejs`) and `icons.ai` during **Epic 4** asset cleanup.
- `reassignment.png` in post 03 is referenced as a bare filename in body markdown — will 404 once a `/blog/[slug].astro` route renders the post. Fix at **Story 4.3** (blog post detail pages) when `astro:assets` / `<Image>` pipeline lands.
- No route currently consumes the `posts` collection — schema validation is the only gate. Broken body links/images stay invisible until **Epic 4** routes are wired.
- `verify-content-schema.mjs` has no guard before `mkdirSync` / `rmSync` on `_schema-test/` — would clobber any future real folder named `_schema-test`. Add a pre-existence check during **Story 2.4** (schema CI gate).
- Astro `projects` collection points at a near-empty dir and silently yields zero entries until **Story 2.3** migrates project case studies.
- No CI gate compares legacy `src/content/posts/` to migrated `site/src/content/posts/` for drift; risk window closes at **Epic 7** cutover. Add a drift check or sunset the legacy tree explicitly.
- `path: '/blog/primitive-values-and-ummutability'` ships the legacy typo on purpose — record explicit redirect debt for **Story 6.3** if the team ever wants to rename the URL.
- `icon` field is `z.string().optional()` with no file-existence assertion — referenced PNG could be deleted/renamed and schema would still pass. Tighten when **Epic 4** wires `astro:assets`.
- `posts` / `projects` Zod schemas haven't declared `.strict()` vs `.passthrough()` policy — unknown frontmatter keys silently rejected. Document or relax during **Story 2.4**.
- Post 05 folder name (`functions-and-callbacks/`) ≠ canonical `path` slug (`high-order-functions-callbacks-inversion-control`) — any future `[slug].astro` route must read `path` from frontmatter, not derive from folder name. Note in **Story 4.3** dev notes.
- Legacy `src/content/posts/` and `src/assets/icons/` still live at repo root (per Guardrails) — schedule explicit deletion in **Epic 7** (cutover) so the two trees don't drift.
