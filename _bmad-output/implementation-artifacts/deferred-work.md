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

## Deferred from: code review of 2-3-migrate-project-case-study-markdown (2026-05-21)

- **No consumer of the `projects` collection yet** — schema validation via `astro check` is the only gate; runtime breakage (broken image paths, routing) won't surface until a route is wired. Address in **Epic 5** (project detail routes). Same finding as 2.2 deferred for posts.
- **Cross-collection `path` uniqueness not enforced** — both `posts` and `projects` schemas use `path: z.string().regex(/^\//)`, so a future post could declare `path: '/projects/sainsburys'` and silently shadow a project. Tighten to `regex(/^\/blog\//)` on posts and `regex(/^\/projects\//)` on projects during **Story 2.4** (CI gate / schema hardening).
- **`thumbnail` is a bare relative string, not an `image()` reference** — schema is `z.string().min(1)`; the `./principal.png` / `./umaicha.png` values won't resolve through Astro's image pipeline until **Epic 5** wires `image()` schema helper or `import.meta.glob`.
- **`images[].image` same bare-string issue** — uses `z.string()`, no `image()` wrap. Same Epic 5 image-pipeline scope.
- **Commented `images` placeholders reference files that don't exist** (e.g. `./pier.jpg`, `./surfing.jpg`). Guardrail §6 keeps them inert. Revisit during **Epic 5** if anyone uncomments — schema is just `string()` so missing files would pass validation but fail at render time.
- **Migrated thumbnails are ~13.7 MB total** (`australis`: 4.17 MB, `oysho`: 4.69 MB, `umaicha`: 4.16 MB, `colossus`: 3.59 MB, `sainsburys`: 1.13 MB). No bundle-size guard. Add a baseline assertion during **Epic 5** when `<Image>` optimization lands, or earlier in **Story 2.4** if a generic CI size budget makes sense.
- **`verify-content-schema.mjs` not idempotent** — if the test process is killed between `mkdirSync` and the `finally` `rmSync`, the invalid fixture lingers under `site/src/content/posts/_schema-test/` (or `projects/_schema-test/`) and the next `npm run check` fails on real content. Add a pre-clean `rmSync(testDir, { recursive: true, force: true })` before `mkdirSync` in **Story 2.4** (CI gate hardening).
- **Glob loader doesn't exclude `_schema-test/`** — if a stranded fixture survives a killed test run, Astro's glob loader picks it up as a real entry. Add `ignore: ['**/_schema-test/**']` to both collection loader configs in `site/src/content.config.ts` during **Story 2.4**.

## Deferred from: code review of 2-4-ci-gate-schema-validation-on-every-build (2026-05-21)

- **AC3 branch protection** — mark the `build` job / workflow as a **required status check** on `main` in GitHub Settings → Branches. Code cannot enforce this; story already flagged maintainer follow-up #3.
- **AC2 GitHub Actions log proof** — optional throwaway branch with broken frontmatter to capture a readable Zod/`astro check` error in the Actions log (story §Testing recipe). Local `npm run test:schema` is the proxy used today.
- **Push and observe real CI run** — link a green Actions run showing `Schema validation (FR17)` step after merge (maintainer follow-up #1 from dev-story).
- **`_schema-test/` accidental commit** — if `posts/_schema-test/` or `projects/_schema-test/` is committed, CI `npm run check` fails on invalid fixture. Add `**/_schema-test/` to `.gitignore` in a follow-up hardening pass.
- **Dev note PR overstatement** — story Dev Notes §Edge cases claimed build job runs on PRs; workflow has no `pull_request` trigger until decision on Review Finding #1 is resolved.
