# Story 2.3: Migrate project case study markdown

**Story ID:** 2.3  
**Story key:** `2-3-migrate-project-case-study-markdown`  
**Status:** done  
**Epic:** 2 — Validated content collections for posts and projects  
**Depends on:** Story 2.1 (`projects` schema in `site/src/content.config.ts`), Story 2.2 (mirrors the proven copy-and-validate pattern)

---

## Story

As an **author**,  
I want **all five legacy project case studies** migrated into the Astro `projects` collection under `site/src/content/projects/**`,  
So that **FR9** is satisfied, **FR17** schema validation passes on real project content, and project rendering work (Epic 5) can begin against real data.

---

## Acceptance criteria (from epics)

1. **Given** existing project folders under legacy `src/content/projects/`  
   **When** files are copied into the Astro content tree (`site/src/content/projects/`) and frontmatter is parsed against the Zod `projects` schema from Story 2.1  
   **Then** **all five** projects validate — `cd site && npm run check` exits **0** with no schema errors.

2. **Given** the migrated collection  
   **When** `cd site && npm run build` runs  
   **Then** the build **succeeds** and emits `dist/` with no schema or content-related errors.

3. **Given** the migrated projects  
   **When** the project `path` values are extracted  
   **Then** every `path` value is **unique** and starts with `/projects/` (matching legacy public URLs — see [Path inventory](#path-inventory) below).

4. **Given** `npm run test:schema` (the dual-collection verifier from Story 2.1)  
   **When** it runs after migration  
   **Then** it still **passes** (invalid `posts` and `projects` fixtures still fail; real projects coexist with the test harness).

5. **Given** the migrated `images` arrays  
   **When** `astro check` parses them  
   **Then** each entry validates as `{ title: string, image: string }` (image-pipeline wiring via `astro:assets` is **deferred to Epic 5**).

---

## Tasks / subtasks

- [x] **Copy project folders** (AC1) — Mirror legacy structure into Astro tree. For each of the 5 folders under `src/content/projects/<slug>/`, copy the folder and its single `.md` file plus the co-located thumbnail image (`principal.png` for australis/colossus/oysho/sainsburys; `umaicha.png` for umaicha) to `site/src/content/projects/<slug>/`. Preserve the **slug folder name** and the **inner `.md` filename** (e.g. `australis/australis.md`). Do **not** flatten or rename.

- [x] **Do not copy commented-out images** (AC1, AC5) — Each legacy file has one real image entry plus 4 YAML-commented placeholder entries (`# { title: ..., image: ... }`). Leave the comments alone — they're already YAML-inert and the parsed `images` array contains only the uncommented entry. Do **not** uncomment, delete, or "tidy" them; minimize diff churn (per Story 2.2 precedent).

- [x] **Verify thumbnail relative paths still work** (AC1, AC5) — From a migrated project at `site/src/content/projects/<slug>/<slug>.md`, the `thumbnail: ./principal.png` (or `./umaicha.png`) resolves to a sibling file in the same folder. Confirm the thumbnail file exists alongside each migrated `.md`. **Do not change** the `thumbnail` string — schema accepts any non-empty string; Epic 5 owns `<Image>` wiring.

- [x] **Frontmatter normalization** (AC1) — Verify (do **not** restructure) that each migrated project's frontmatter parses cleanly under the schema in `site/src/content.config.ts`:
  - `path`: string starting with `/` (all 5 conform — `/projects/australis`, `/projects/colossus-bets`, `/projects/oysho`, `/projects/sainsburys`, `/projects/umaicha`).
  - `title`: non-empty string. **`Sainsbury's`** has an apostrophe inside double quotes — this is valid YAML; **keep it as-is**.
  - `date`: ISO datetime (legacy uses `2018-05-18T12:34:00+00:00`-style strings; `z.coerce.date()` accepts).
  - `type`: literal `projects` (note the **plural**, deliberately differs from posts' `post`). Legacy uses `projects` unquoted — keep.
  - `category`: non-empty string (all 5 use `projects`).
  - `thumbnail`: non-empty string (all 5 conform — relative paths like `./principal.png`).
  - `excerpt`: string (all 5 present and non-empty).
  - `images`: array of `{ title, image }` (all 5 have one parsed entry; commented entries are ignored).
  - Quote style (`'...'` vs `"..."`) is **irrelevant** to YAML — do not churn diffs normalizing it.

- [x] **Run validation locally** (AC1, AC2, AC4) — Execute in order:
  ```bash
  cd site
  npm run check        # AC1 — schema + TS pass on all 5 projects
  npm run build        # AC2 — full build succeeds
  npm run test:schema  # AC4 — invalid post + project fixtures still rejected
  ```
  All three must exit **0**.

- [x] **Remove `.gitkeep`** (housekeeping) — After at least one project folder lands under `site/src/content/projects/`, delete `site/src/content/projects/.gitkeep` (no longer needed). This mirrors the 2.2 cleanup of the posts `.gitkeep`.

- [x] **Do not delete legacy `src/content/projects/`** — Legacy Gatsby tree stays at repo root until cutover (Epic 7). Story 2.3 is **copy**, not **move**.

- [x] **Documentation delta** (minimal) — Append a short "Projects migrated (Story 2.3)" note to `docs/data-models.md` Validation section, pointing to `site/src/content/projects/` as the live location post-migration. Keep it to 1–2 lines; do not duplicate field tables. Mirror the 2.2 doc-delta pattern.

### Review Findings

_Generated by `code-review` workflow on 2026-05-21. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Decision needed:** 0.

**Patch** (3 — all resolved):
- [x] [Review][Patch] Untrack review-diff artifact `_bmad-output/tmp/story-2-3-review.diff` (recurrence from Story 2.2) — deleted; added `_bmad-output/tmp/` rule to root `.gitignore` so it won't recur on the next review.
- [x] [Review][Patch] Document the deliberate plural in `type: z.literal('projects')` — added a 1-line comment in `site/src/content.config.ts` explaining why the literal is plural (distinct from `posts'` singular `'post'`) so a future schema-cleanup pass doesn't silently break all 5 projects.
- [x] [Review][Patch] Extend `.gitattributes` belt-and-suspenders binary list — added `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.ico` so future image migrations can't be text-tracked by accident (same hygiene class as Story 2.2's `icons.ai` fix).

**Deferred** (8) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] No consumer of `projects` collection — schema is the only gate; Epic 5 owns project routes (duplicate of 2.2 finding).
- [x] [Review][Defer] Cross-collection `path` uniqueness not enforced — posts and projects could collide; Story 2.4 (CI gate hardening).
- [x] [Review][Defer] `thumbnail` is bare string, not `image()` ref — Epic 5 image-pipeline wiring.
- [x] [Review][Defer] `images[].image` same bare-string issue — Epic 5.
- [x] [Review][Defer] Commented `images` placeholders reference non-existent files (`./pier.jpg` etc.) — Guardrail §6 keeps them inert; revisit during Epic 5 if uncommenting.
- [x] [Review][Defer] Migrated thumbnails are 13–17 MB total, no bundle-size baseline — Epic 5 image-pipeline scope needs a size guard.
- [x] [Review][Defer] `verify-content-schema.mjs` not idempotent — Story 2.4 (CI gate hardening) should add pre-clean of `_schema-test/`.
- [x] [Review][Defer] Glob loader doesn't exclude `_schema-test/` — stranded fixture would be picked up; Story 2.4 should add `ignore: ['**/_schema-test/**']`.

**Dismissed** (14) — false positives (e.g. "`images` arrays malformed YAML" — verified all 5 parse cleanly as single-entry `[{title, image}]`), process artifacts (status flip, narrative gates), and items explicitly out of scope per Guardrails (quote-style normalization, trailing newlines, doc-delta verbosity).

## Path inventory (verify all 5 unique after migration)

| # | Folder | `path` frontmatter | Thumbnail file |
|---|--------|---------------------|----------------|
| 1 | `australis/` | `/projects/australis` | `principal.png` |
| 2 | `colossus/` | `/projects/colossus-bets` | `principal.png` |
| 3 | `oysho/` | `/projects/oysho` | `principal.png` |
| 4 | `sainsburys/` | `/projects/sainsburys` | `principal.png` |
| 5 | `umaicha/` | `/projects/umaicha` | `umaicha.png` |

**Asymmetry note:** folder name `colossus` vs `path` `/projects/colossus-bets` is **intentional** — folder slug differs from public URL. Renaming either would break URLs (Story 6.3 owns redirects).

**Asymmetry note 2:** `umaicha`'s thumbnail is `umaicha.png` (not `principal.png`). Don't "normalize" it.

---

## Dev notes

### Architecture compliance

- **ADR-003** — Content collections + Zod; build fails on violation. Migration must round-trip through `astro check`. [architecture.md §3 ADR-003](../planning-artifacts/architecture.md)
- **§6.2 Projects schema** — Authoritative field table. Schema already implemented in `site/src/content.config.ts` per Story 2.1. [architecture.md §6.2](../planning-artifacts/architecture.md)
- **§6.3 Content locations** — "Copy existing markdown; normalize frontmatter against schema; fix paths to images." Mirror legacy folder layout to minimize churn. [architecture.md §6.3](../planning-artifacts/architecture.md)
- **§9 Project structure** — Target: `site/src/content/projects/` with one folder per project. [architecture.md §9](../planning-artifacts/architecture.md)

### PRD

- **FR9** — Author can add or edit projects using markdown with required fields. This story makes FR9 **real** by validating all 5 legacy projects against the schema.
- **FR17** — Schema validation gate. Already wired in Story 2.1; first real project content flows through it here.

### Story 2.1 / 2.2 intelligence (what's already built)

- `site/src/content.config.ts` defines `projects` with: `path` (regex `/^\//`), `title` (non-empty), `date` (coerced), `type` (literal `projects`), `category` (non-empty), `thumbnail` (non-empty), `excerpt` (string), `images` (optional array of `{title, image}`). **Do not modify** — schema is frozen.
- `site/src/content/projects/.gitkeep` exists (placeholder, to be removed after first real project lands).
- `site/scripts/verify-content-schema.mjs` runs **dual-collection** invalid-fixture checks: it copies fixtures into `posts/_schema-test/` AND `projects/_schema-test/`, then cleans up via `try/finally`. **Real projects must not interfere** — the `_schema-test/` directory name is reserved and not used by any real legacy project (legacy uses lowercase brand slugs).
- Scripts available in `site/package.json`: `dev`, `build`, `preview`, `check`, `test:schema`.
- Astro: **6.1.8**; Node: **≥ 22.12** (see `site/.nvmrc`).
- 2.2 confirmed: `[glob-loader] No files found` warning for `projects/` will **disappear** once real projects land — expected, no action needed.
- 2.2 confirmed: pure copy + zero frontmatter edits passed validation. **Same expectation here** — none of the 5 projects need frontmatter changes.

### Legacy frontmatter observations (all 5 projects inspected)

| Field | All projects conform? | Notes |
|-------|----------------------|-------|
| `path` | Yes — all start with `/projects/` | All 5 unique (see inventory). |
| `title` | Yes | Non-empty; `Sainsbury's` has apostrophe inside `"..."` — valid. |
| `date` | Yes — ISO 8601 with offset | `z.coerce.date()` accepts. |
| `type` | Yes — literal `projects` | Unquoted in YAML; valid. **Plural**, distinct from posts. |
| `category` | Yes | All 5 use the value `projects` (legacy convention). |
| `thumbnail` | Yes — non-empty relative path | 4 use `./principal.png`, 1 uses `./umaicha.png`. |
| `excerpt` | Yes | All present, non-empty. |
| `images` | Yes — single-entry array | Commented placeholder entries present (4 per file); inert YAML, ignored by parser. |

### Asset strategy (thumbnails + images)

- Thumbnails are **co-located** with the markdown (`./principal.png` or `./umaicha.png` resolving to a sibling file). Copying the whole folder preserves this.
- The schema treats `thumbnail` and `images[].image` as plain strings (`z.string().min(1)` and `z.string()` respectively) — no `astro:assets` `<Image>` wiring in this story. **Epic 5 owns image pipeline migration**.
- Only **one** real image file per project today (`principal.png` for 4 projects, `umaicha.png` for 1). Commented YAML entries reference files (`./pier.jpg`, `./surfing.jpg`, etc.) that **do not exist** in the legacy tree — that's fine because the comments aren't parsed.
- **Do not copy** any image files beyond the one each folder already has.
- **Do not** modify `thumbnail` or `images[].image` strings — Epic 5 will rewrite them when wiring `<Image>` imports.

### File structure (target after this story)

```
site/
└── src/
    └── content/
        ├── posts/                    # populated by 2.2
        │   └── …                     # 9 post folders (untouched here)
        └── projects/                 # NEW (this story)
            ├── australis/
            │   ├── australis.md
            │   └── principal.png
            ├── colossus/
            │   ├── colossus.md
            │   └── principal.png
            ├── oysho/
            │   ├── oysho.md
            │   └── principal.png
            ├── sainsburys/
            │   ├── sainsburys.md
            │   └── principal.png
            └── umaicha/
                ├── umaicha.md
                └── umaicha.png
```

`site/src/content/projects/.gitkeep` is **removed** at the end of this story.

### Guardrails (do **NOT** do in this story)

1. **Do not** modify `site/src/content.config.ts` (schemas are frozen by Story 2.1).
2. **Do not** add `@astrojs/mdx`, Shiki, or any code-highlighting setup (out of scope; FR14 is Story 4.5).
3. **Do not** rewrite `thumbnail` or `images[].image` to use `astro:assets` `<Image>` imports — frontmatter must stay schema-string-typed (Epic 5 owns image pipeline).
4. **Do not** delete or modify the legacy `src/content/projects/` at repo root — it remains until cutover (Epic 7).
5. **Do not** rename folders or change project `path` values (would silently break legacy public URLs — redirects are Story 6.3). In particular, **do not rename `colossus/` to `colossus-bets/`** to "match" the path — folder slug ≠ URL slug, and that's by design.
6. **Do not** uncomment, "clean up", or remove the YAML-commented `images` placeholder entries — they're already inert; touching them adds churn for zero functional gain.
7. **Do not** add image files for the commented entries (`./pier.jpg`, `./surfing.jpg`, etc.) — those are aspirational placeholders, out of scope.
8. **Do not** quote-normalize, reformat, or reorder YAML keys "for cleanliness". Only edit a field if validation forces it.
9. **Do not** touch `site/src/content/posts/` — Story 2.2 owns it (and it's already in review).
10. **Do not** add new dependencies. The migration is pure file copy.

### Edge cases to watch

- **`Sainsbury's` apostrophe** — `title: "Sainsbury's"`. Valid YAML inside double quotes. Don't switch to single quotes (would need escaping).
- **`type: projects` plural** — `z.literal('projects')` matches the legacy value exactly. Critically, this is **plural** (mirroring the collection name), unlike posts' singular `type: post`. If a project mistakenly has `type: project`, the schema **will fail** the build with a Zod error — that's the right behavior; fix the data, not the schema.
- **`category: projects`** — all 5 legacy projects use the value `projects` for `category` too (a legacy quirk). Schema only requires non-empty, so it passes. Do not "fix" to a more semantic value (would silently change category-routing behavior in Epic 5+).
- **YAML-commented `images` entries** — valid YAML; `astro check` ignores them. Don't "fix" them.
- **`_schema-test/`** directory inside `site/src/content/projects/` — reserved by `verify-content-schema.mjs`. No legacy folder uses that name, so no collision.
- **Empty `projects/` glob warning from 2.1/2.2** — should disappear automatically once any real project lands.
- **Astro caches** — if `check` mysteriously fails after copy, run `rm -rf site/.astro site/node_modules/.astro` and retry; Astro caches collection content (verified workaround in 2.2 dev notes).

### Testing

Run from repo root (or `cd site` first):

```bash
cd site
npm run check        # AC1 — schema + TS pass on all 5 projects
npm run build        # AC2 — full build succeeds
npm run test:schema  # AC4 — invalid posts + projects fixtures still rejected
```

**Manual spot-check** (no test framework needed):

```bash
# Confirm 5 project folders migrated
ls site/src/content/projects/ | grep -v gitkeep | wc -l   # → 5

# Confirm all paths are unique and start with /projects/
grep -h '^path:' site/src/content/projects/**/*.md | sort -u | wc -l   # → 5
grep -h '^path:' site/src/content/projects/**/*.md | grep -c '/projects/'   # → 5

# Confirm each project has its thumbnail file co-located
for d in australis colossus oysho sainsburys; do
  ls "site/src/content/projects/$d/principal.png" >/dev/null && echo "$d ok"
done
ls site/src/content/projects/umaicha/umaicha.png >/dev/null && echo "umaicha ok"

# Confirm .gitkeep removed
[ ! -e site/src/content/projects/.gitkeep ] && echo "gitkeep removed"
```

### References

- [Epics — Story 2.3](../planning-artifacts/epics.md)
- [Architecture §6 — Content model](../planning-artifacts/architecture.md)
- [Data models](../../docs/data-models.md)
- [Story 2.1 — schemas](./2-1-define-posts-and-projects-schemas.md)
- [Story 2.2 — posts migration (precedent)](./2-2-migrate-blog-post-markdown.md)
- [Astro: Content collections](https://docs.astro.build/en/guides/content-collections/)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Claude Opus 4.7.

### Debug log references

- Clean run, no surprises. Validation trio executed under Node 22.12.0 (via `nvm use` against `site/.nvmrc`).
- `[glob-loader] No files found matching "**/*.{md,mdx}" in directory "src/content/projects"` warning **disappeared** once the 5 projects landed, matching the prediction in Dev Notes §Story 2.1/2.2 intelligence.
- No frontmatter edits required — all 5 legacy projects validate against the frozen `projects` Zod schema as-is (including `Sainsbury's` apostrophe inside `"..."`, plural `type: projects`, mixed quote styles, and the YAML-commented `images` placeholder entries).

### Completion notes list

- Pure copy: 5 project folders + co-located thumbnail PNGs → `site/src/content/projects/<slug>/`. Legacy `src/content/projects/` untouched (per Guardrails §4).
- Zero frontmatter edits — schema acceptance confirmed on first run via `astro check`.
- YAML-commented `images` placeholder entries left untouched (per Guardrails §6); parsed `images` array contains exactly the single uncommented entry per project, satisfying the `{title, image}` shape (AC5 ✅).
- Removed `site/src/content/projects/.gitkeep`; the `posts/` tree from Story 2.2 was not touched (per Guardrails §9).
- Acceptance gates (from `site/`, Node 22.12.0):
  - `npm run check` → **0 errors, 0 warnings, 0 hints** across 6 Astro files (AC1 ✅)
  - `npm run build` → static build, 1 page, completed in ~1.27s (AC2 ✅)
  - `npm run test:schema` → invalid `posts` AND `projects` fixtures still rejected (AC4 ✅)
- Spot checks: 5 folders, 5 unique `/projects/...` paths (including intentional `colossus → /projects/colossus-bets` asymmetry), all 5 thumbnails co-located, `.gitkeep` gone (AC3 ✅).
- Documentation: 1-line "Projects migrated (Story 2.3)" note appended to `docs/data-models.md` §Validation, mirroring 2.2's pattern.

### File list

**Added** (copied from legacy):
- `site/src/content/projects/australis/australis.md`
- `site/src/content/projects/australis/principal.png`
- `site/src/content/projects/colossus/colossus.md`
- `site/src/content/projects/colossus/principal.png`
- `site/src/content/projects/oysho/oysho.md`
- `site/src/content/projects/oysho/principal.png`
- `site/src/content/projects/sainsburys/sainsburys.md`
- `site/src/content/projects/sainsburys/principal.png`
- `site/src/content/projects/umaicha/umaicha.md`
- `site/src/content/projects/umaicha/umaicha.png`

**Modified:**
- `docs/data-models.md` — added 1-line "Projects migrated (Story 2.3)" note in §Validation.
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — status transitions `ready-for-dev` → `in-progress` → `review` → `done`; `last_updated` bumped.
- `site/src/content.config.ts` — added 4-line code comment above `type: z.literal('projects')` documenting the deliberate plural (review-patch).
- `.gitignore` (root) — added `_bmad-output/tmp/` rule so review-diff scratch artifacts stop recurring across reviews (review-patch).
- `.gitattributes` (root) — extended binary list with raster image formats (`*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.ico`) as belt-and-suspenders hygiene (review-patch).

**Deleted:**
- `site/src/content/projects/.gitkeep` (placeholder consumed by real content).

**Unchanged (per guardrails):**
- Schema shape itself (`site/src/content.config.ts` Zod object body), `site/src/content/posts/**` (owned by Story 2.2), all legacy `src/content/projects/**`.

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Story drafted (ready-for-dev). Ultimate context engine analysis: epic 2.3, architecture §6.2, schema in `content.config.ts`, 2.1/2.2 intelligence integrated, all 5 legacy project frontmatter inspected, image strategy deferred to Epic 5. | bmad-create-story |
| 2026-05-21 | Migrated 5 legacy project case studies + co-located thumbnails into `site/src/content/projects/`; validation gates (`check`, `build`, `test:schema`) pass on first run with zero frontmatter edits. | Amelia |
