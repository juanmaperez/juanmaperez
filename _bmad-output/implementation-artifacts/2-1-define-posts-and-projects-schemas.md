# Story 2.1: Define posts and projects schemas

**Story ID:** 2.1  
**Story key:** `2-1-define-posts-and-projects-schemas`  
**Status:** done  

---

## Story

As an **author**,  
I want **Zod-backed Astro content collections** for **posts** and **projects** that match legacy frontmatter,  
So that **FR8** and **FR9** fields are enforced consistently and **FR17** can fail the build on invalid markdown.

---

## Acceptance criteria (from epics)

1. **Given** `site/src/content.config.ts` (Astro 6 project-default) defining **`posts`** and **`projects`** collections with Zod schemas  
   **When** a content file violates required fields or types  
   **Then** `npx astro check` and/or `npm run build` in **`site/`** reports a **clear** validation error (field-level message preferred)  
   **And** schema fields align with [docs/data-models.md](../../docs/data-models.md) and [architecture.md §6](../planning-artifacts/architecture.md).

2. **Given** valid empty collections (no migrated posts yet)  
   **When** `npm run build` runs  
   **Then** build **succeeds** (schemas wired; migration is **Story 2.2 / 2.3**).

3. **Given** a deliberately invalid fixture (see tasks)  
   **When** `astro check` runs  
   **Then** validation **fails** — proves FR17 gate is real before CI story **2.4**.

---

## Tasks / subtasks

- [x] **Config file** — Add `site/src/content.config.ts` with `defineCollection` for `posts` and `projects` (`type: 'content'`), export `collections` map per [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/).
- [x] **Loader globs** — Point collections at mirrored paths (recommended):
  - `posts`: `src/content/posts/**/*.{md,mdx}` (one `.md` per folder, as legacy)
  - `projects`: `src/content/projects/**/*.{md,mdx}`
  - Create **empty** directory trees (e.g. `.gitkeep`) so globs resolve; **do not** bulk-copy legacy markdown in this story.
- [x] **Posts schema** — Zod object per architecture §6.1 / data-models:

  | Field | Zod (guidance) | Required |
  |-------|----------------|----------|
  | `path` | `z.string().regex(/^\//)` | yes |
  | `title` | `z.string().min(1)` | yes |
  | `date` | `z.coerce.date()` | yes |
  | `type` | `z.literal('post')` | yes |
  | `category` | `z.string().min(1)` | yes |
  | `tags` | `z.array(z.string())` | yes (allow `[]`) |
  | `excerpt` | `z.string()` | yes |
  | `icon` | `z.string()` | optional |
  | `thumbnail` | `z.string()` | optional (legacy posts often omit) |

- [x] **Projects schema** — Per architecture §6.2 / data-models:

  | Field | Zod (guidance) | Required |
  |-------|----------------|----------|
  | `path` | `z.string().regex(/^\//)` | yes |
  | `title` | `z.string().min(1)` | yes |
  | `date` | `z.coerce.date()` | yes |
  | `type` | `z.literal('projects')` | yes |
  | `category` | `z.string().min(1)` | yes |
  | `thumbnail` | `z.string().min(1)` | yes |
  | `excerpt` | `z.string()` | yes |
  | `images` | `z.array(z.object({ title: z.string(), image: z.string() }))` | optional |

- [x] **Scripts** — Add to `site/package.json`: `"check": "astro check"` (and document in `site/README.md`).
- [x] **Validation proof** — Fixture at `site/scripts/fixtures/invalid-post.md`; `npm run test:schema` copies into `posts/_schema-test/`, runs `astro check`, expects failure with field-level errors, then removes test dir (no permanent invalid content in tree).
- [x] **Docs** — Update [docs/data-models.md](../../docs/data-models.md) with a short **“Astro collections (site/)”** pointer to `content.config.ts` (minimal delta; full author guide can wait for 2.2).

### Review Findings

- [x] [Review][Patch] `test:schema` only exercises `posts` — add `invalid-project` fixture and assert `projects` schema rejects bad frontmatter [`site/scripts/verify-content-schema.mjs`]
- [x] [Review][Patch] Use `try/finally` in schema verifier so `posts/_schema-test/` is removed if `astro check` throws [`site/scripts/verify-content-schema.mjs`]
- [x] [Review][Patch] Call `npm run check` instead of `npx astro check` in verifier (matches package scripts) [`site/scripts/verify-content-schema.mjs`]
- [x] [Review][Defer] CI runs `npm run build` only, not `npm run check` / `test:schema` — Story **2.4** owns FR17 CI gate [`.github/workflows/deploy-astro-pages.yml`]
- [x] [Review][Defer] `[glob-loader] No files found` warnings on empty `posts/` / `projects/` until migration — Astro noise, not a build failure
- [x] [Review][Defer] No positive fixture proving legacy-shaped valid frontmatter passes — appropriate for **2.2** when real posts land

---

## Dev notes

### Architecture compliance

- **ADR-003** — Content collections + Zod; build fails on violation [architecture.md §3 ADR-003](../planning-artifacts/architecture.md).
- **§6 Content model** — Field table is authoritative [architecture.md §6](../planning-artifacts/architecture.md).

### PRD

- **FR8**, **FR9** — Author markdown fields enforced.  
- **FR17** — Schema validation gate (full CI enforcement in **Story 2.4**).

### Epic 1 intelligence (dependencies)

- All work under **`site/`**; Node **≥ 22.12**; CI builds `site/` only [1-1](./1-1-initialize-astro-static-project.md), [1-3](./1-3-github-action-build-and-deploy-to-pages.md).
- Legacy content remains at **repo root** `src/content/**` until **2.2 / 2.3** — schemas target **future** `site/src/content/**` copies.

### Legacy frontmatter quirks (for 2.2, not 2.1)

| Quirk | Example | Schema / migration note |
|-------|---------|-------------------------|
| `type` discriminator | `post` vs `projects` | Literals enforce spelling. |
| `icon` / `thumbnail` paths | `../../../assets/icons/...` | Keep as **string** in 2.1; normalize paths when copying assets in 2.2+. |
| `images` YAML array | umaicha `images: [{ title, image }]` | Zod object array; verify coercion on all five projects in 2.3. |
| Post `thumbnail` | Often absent in legacy | **Optional** in schema (matches current repo). |

### File structure (target)

```
site/
├── src/
│   ├── content.config.ts    # collections + Zod (this story)
│   ├── content/
│   │   ├── posts/           # empty until 2.2
│   │   └── projects/        # empty until 2.3
│   └── pages/               # existing
```

### Guardrails

1. **Do not** migrate markdown or images in **2.1** (scope = schemas only).  
2. **Do not** add `@astrojs/mdx` or Shiki unless required for schema wiring (**FR14** is **4.5**).  
3. **Do not** change root Gatsby `src/content/**`.  
4. Use **`astro:content`** imports (`z`, `defineCollection`) — avoid duplicate `zod` version unless Astro docs require explicit dependency.

### Testing

- `cd site && npm run check` — pass with empty collections.  
- `npm run check` — fail with invalid fixture.  
- `npm run build` — pass after schemas wired.

### References

- [Epics — Story 2.1](../planning-artifacts/epics.md)
- [Architecture §6](../planning-artifacts/architecture.md)
- [Data models](../../docs/data-models.md)
- [Astro: Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro: Content schemas](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema)

---

## Dev agent record

### Agent model used

Composer (Amelia / bmad-dev-story)

### Debug log references

- `astro check` requires `@astrojs/check` + `typescript` (installed as devDependencies).
- Invalid fixture must live under `posts/` glob; `_schema-test` at `content/` root is not validated.

### Completion notes list

- `site/src/content.config.ts`: `posts` + `projects` with `glob()` loaders and Zod per architecture §6.
- Empty `site/src/content/posts/`, `site/src/content/projects/` (`.gitkeep`).
- `npm run check`, `npm run test:schema`; devDeps `@astrojs/check`, `typescript`.
- Verified: `npm run check` + `npm run build` pass (empty collections); `npm run test:schema` fails on bad frontmatter with `InvalidContentEntryDataError` field messages.
- Code review patches: dual-collection `test:schema` (`invalid-post` + `invalid-project`), `try/finally` cleanup, `npm run check` in verifier.

### File list

- `site/src/content.config.ts` (new)
- `site/src/content/posts/.gitkeep` (new)
- `site/src/content/projects/.gitkeep` (new)
- `site/scripts/fixtures/invalid-post.md` (new)
- `site/scripts/fixtures/invalid-project.md` (new)
- `site/scripts/verify-content-schema.mjs` (new)
- `site/package.json` (modified)
- `site/package-lock.json` (modified)
- `site/README.md` (modified)
- `docs/data-models.md` (modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
