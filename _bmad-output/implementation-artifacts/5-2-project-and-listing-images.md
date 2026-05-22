# Story 5.2: Project and listing images

**Story ID:** 5.2  
**Story key:** `5-2-project-and-listing-images`  
**Status:** done  
**Epic:** 5 — Project case studies with strong imagery  
**Depends on:** Story **5.1** (`projects/[...slug].astro`, `HomeWorks.astro`, `resolveProjectAsset.ts`); Story **2.3** (five projects with co-located PNGs); Story **2.1** (`content.config.ts` schemas)  
**Followed by:** Epic **6** (SEO/discovery) — optional Epic 5 retrospective

---

## Story

As a **visitor**,  
I want **responsive optimized images** for thumbnails and galleries,  
So that **FR13** is met for portfolio content.

---

## Acceptance criteria (from epics)

1. **Given** project `thumbnail` and `images[].image` in the `projects` collection  
   **When** `site/` is built  
   **Then** thumbnails on **`/`** (`HomeWorks`) and gallery images on **`/projects/*`** use the **Astro image pipeline** (`<Image />` from `astro:assets` per **ADR-006**), with explicit `widths` / `sizes` (not raw multi‑MB PNG URLs in final HTML).

2. **Given** all five migrated projects  
   **When** home and each project detail page render  
   **Then** **no broken images** — every parsed `thumbnail` and `images[]` entry shows a visible optimized image (FR13 / story AC “no broken images on MVP project routes”).

3. **Given** Story 5.1 layout and routes  
   **When** this story completes  
   **Then** project **routes, copy, gallery structure, and `HomeContact`** remain unchanged; only image wiring and related schema/CSS adjust.

4. **Given** legacy Gatsby `childImageSharp` (`fluid(maxWidth: 1000)` gallery, list thumbnails)  
   **When** comparing behavior  
   **Then** document in `docs/migration-parity-checklist.md` that portfolio images use **Astro `<Image />`** (functional FR13 parity, not pixel-perfect Gatsby art direction).

5. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; built HTML for project pages references `/_astro/` optimized assets (not bare `/src/content/...png` paths).

---

## Tasks / subtasks

- [x] **Upgrade `projects` schema to `image()` helpers** (AC1, AC2, AC5) — In `site/src/content.config.ts`, change the `projects` collection schema to use the Astro `image()` helper (same pattern as [Astro Content Collections images](https://docs.astro.build/en/guides/images/#images-in-content-collections)):
  ```ts
  const projects = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
      z.object({
        path: z.string().regex(/^\//),
        title: z.string().min(1),
        date: z.coerce.date(),
        type: z.literal('projects'),
        category: z.string().min(1),
        thumbnail: image(), // was z.string().min(1)
        excerpt: z.string(),
        images: z
          .array(
            z.object({
              title: z.string(),
              image: image(), // was z.string()
            }),
          )
          .optional(),
      }),
  });
  ```
  - Keep frontmatter strings as `./principal.png` / `./umaicha.png` — **no** markdown file churn unless `astro check` errors.
  - Run `npm run check` after schema change; fix any path resolution errors per Astro docs.
  - **`posts` collection unchanged** in this story.

- [x] **Replace `resolveProjectAsset.ts` glob + `<img>`** (AC1, AC3) — Remove the eager `import.meta.glob` raw-URL helper (or reduce to a thin wrapper only if still needed for non-schema assets). Consumers must use **`ImageMetadata`** from `entry.data.thumbnail` and `item.image` directly.

- [x] **Create `site/src/components/projects/ProjectImage.astro`** (AC1, AC2) — Shared wrapper to avoid duplicating width presets:
  ```astro
  ---
  import { Image } from 'astro:assets';
  import type { ImageMetadata } from 'astro';

  interface Props {
    src: ImageMetadata;
    alt: string;
    variant: 'listing' | 'gallery';
    class?: string;
  }
  const { src, alt, variant, class: className } = Astro.props;
  const listing = { widths: [400, 800] as const, sizes: '(max-width: 768px) 50vw, 14rem' };
  const gallery = { widths: [640, 1000, 1600] as const, sizes: '(max-width: 1000px) 100vw, 1000px' };
  const cfg = variant === 'listing' ? listing : gallery;
  ---
  <Image
    src={src}
    alt={alt}
    widths={[...cfg.widths]}
    sizes={cfg.sizes}
    class={className}
    loading="lazy"
    decoding="async"
  />
  ```
  Adjust `widths`/`sizes` if layout smoke shows oversized downloads; document final values in Dev Agent Record.

- [x] **Update `site/src/components/home/HomeWorks.astro`** (AC1, AC2) — Replace plain `<img src={thumbSrc}>` with `<ProjectImage src={project.data.thumbnail} alt={project.data.title} variant="listing" />`. Remove `resolveProjectAsset` import. Keep sort via `getSortedProjects()`.

- [x] **Update `site/src/pages/projects/[...slug].astro`** (AC1, AC2, AC3) — Gallery loop:
  ```astro
  {entry.data.images?.map((item) => (
    <figure class="project-detail__gallery-item">
      <ProjectImage src={item.image} alt={item.title} variant="gallery" />
      <h3>{item.title}</h3>
    </figure>
  ))}
  ```
  Drop `galleryItems` pre-map with string `src`; use schema-resolved `image()` fields directly.

- [x] **Verify optimized output** (AC1, AC5) — After `npm run build`:
  ```bash
  # No raw content-tree PNG URLs in project HTML:
  ! grep -r 'content/projects' dist/projects/ && echo "OK no raw content paths"
  # Optimized hashed assets present:
  ls dist/_astro/*principal* dist/_astro/*umaicha* 2>/dev/null | head
  # All five routes still exist (21 pages total):
  for p in umaicha sainsburys oysho colossus-bets australis; do
    test -f "dist/projects/${p}/index.html" || echo "MISSING $p"
  done
  ```
  Optionally note total `dist/_astro/` bytes for project images vs ~17 MB source PNGs (deferred-work baseline).

- [x] **Update migration parity checklist** (AC4) — Extend project row Notes: `Story 5.2: astro:assets <Image /> for listing + gallery; FR13`.

- [x] **Manual smoke** (AC2, FR15) — `/` project grid + `/projects/colossus-bets`, `/projects/umaicha`: images load, no horizontal scroll at 320px; Network tab shows `/_astro/` (or `srcset`) not 4MB single PNG.

- [x] **Do not** in this story: change home hero JPGs in `public/images/home/`, blog post body images, `404.jpg`, `content.config.ts` `posts` schema, project routes/prev-next, or add `client:*`.

### Review Findings

_Code review 2026-05-22 — story `5-2-project-and-listing-images` (5 files + `ProjectImage.astro` new, `resolveProjectAsset.ts` deleted). Gates re-run: check/build/test:schema → 0._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch`, `decision-needed`, or `defer` items.

| AC | Verdict |
|----|---------|
| AC1 | `<Image />` + `srcset`/`sizes` on `/` + `/projects/*`; `/_astro/*.webp` |
| AC2 | 5 projects build; no `content/projects` in HTML |
| AC3 | Routes/copy/HomeContact unchanged |
| AC4 | Parity checklist FR13 notes |
| AC5 | 21 pages; `test:schema` OK |

---

## Image inventory (source → consumer)

| Project | Thumbnail file | Gallery entry (parsed) | Consumers |
|---------|----------------|------------------------|-----------|
| australis | `./principal.png` (~4.0 MB) | Main → `./principal.png` | HomeWorks + detail |
| colossus | `./principal.png` (~3.4 MB) | Main App → `./principal.png` | HomeWorks + detail |
| oysho | `./principal.png` (~4.5 MB) | Main → `./principal.png` | HomeWorks + detail |
| sainsburys | `./principal.png` (~1.1 MB) | Main → `./principal.png` | HomeWorks + detail |
| umaicha | `./umaicha.png` (~4.0 MB) | Main Blog → `./umaicha.png` | HomeWorks + detail |

**Total raw PNG ~17 MB** — build should emit smaller responsive variants under `/_astro/`.

---

## Current baseline (pre-story)

- **5.1** — `resolveProjectAsset.ts` eager-glob → Vite-processed `/_astro/*.png` URLs in HTML; **no** `<Image />`, **no** `widths`/`srcset` discipline.
- **Legacy** — `gatsby-image` / `fluid(maxWidth: 1000)` on gallery; list thumbnails via GraphQL `fluid(maxWidth: 2500)` on detail (hero commented out).
- **Blog post 03** — `reassignment.png` already optimized via markdown asset pipeline (`.webp` in `dist`) — **out of scope** for 5.2 (not portfolio FR13).

---

## Legacy vs MVP

| Legacy | Story 5.2 |
|--------|-----------|
| `childImageSharp.fluid` | `<Image widths={...} sizes={...} />` |
| Runtime src from GraphQL | Build-time `image()` in collection schema |
| `resolveProjectAsset` string paths | `ImageMetadata` on `entry.data` |

---

## Dev notes

### Architecture compliance

- **ADR-006** — `astro:assets` for responsive images. [architecture.md ADR-006](../planning-artifacts/architecture.md)
- **§6.2** — `thumbnail` + `images[]` fields become image pipeline inputs. [architecture.md §6.2](../planning-artifacts/architecture.md)
- **§7** — Replaces `gatsby-image` mapping. [architecture.md §7](../planning-artifacts/architecture.md)

### PRD

- **FR13** — Optimized images for hero/list thumbnails without per-page manual tuning. [prd.md FR13](../planning-artifacts/prd.md) — **this story = portfolio surfaces** (`/` works grid + `/projects/*` gallery).
- **FR15** — Preserve no horizontal overflow on project pages (5.1 CSS retained).

### Story 5.1 intelligence (must preserve)

- Routes at `site/src/pages/projects/[...slug].astro`; slug from `getProjectSlugFromPath(entry.data.path)`.
- `colossus` folder ≠ `colossus-bets` URL — do not rename.
- No project prev/next; `HomeContact` footer stays.
- [5-1-project-detail-routes.md](./5-1-project-detail-routes.md)

### Deferred-work callbacks

- **2.3 / 3.3** — ~17 MB thumbnails; add build-output size note when `<Image />` lands.
- **`thumbnail` / `images[].image` bare strings** — this story closes that debt for projects.

### Astro 6 implementation notes

- **Built-in images** — Astro 6 includes image services without extra `@astrojs/image` package; use `import { Image } from 'astro:assets'`.
- **`image()` + glob loader** — Co-located paths in frontmatter resolve relative to each `.md` file; verify all five projects after schema change.
- **Deleting `resolveProjectAsset.ts`** — Preferred once `image()` works; avoids duplicate glob maps.
- **If `image()` migration blocks** (unlikely): fallback documented in Astro docs is explicit static `import` per file — **not** preferred for five projects; fix schema paths instead.

### File structure (target)

```
site/
├── src/
│   ├── content.config.ts              # MODIFIED — image() on projects
│   ├── components/
│   │   ├── home/HomeWorks.astro       # MODIFIED — ProjectImage listing
│   │   └── projects/ProjectImage.astro # NEW
│   ├── pages/projects/[...slug].astro # MODIFIED — ProjectImage gallery
│   └── utils/resolveProjectAsset.ts   # DELETED (if fully replaced)
docs/migration-parity-checklist.md     # MODIFIED — FR13 note on project rows
```

### Guardrails

1. **Scope = projects only** — no home hero JPG pipeline, no blog markdown image refactors.
2. **No** new npm deps unless `astro check` proves a missing integration (Astro 6.1.8 should not need one).
3. **No** `client:*`, Prism, or route changes.
4. **Preserve** `test:schema` behavior — invalid-project fixture still fails without valid `image()` fields.
5. **Do not** uncomment YAML placeholder `images` entries (files do not exist).
6. **Run** full gate trio after changes.

### Edge cases

- **`Sainsbury's` / unicode titles** — `alt` from `title` string; unchanged.
- **Optional `images` omitted** — empty gallery OK; thumbnail still required by schema.
- **Same file for thumbnail and gallery** — umaicha/colossus etc. use one PNG twice; `<Image />` may dedupe in `_astro/` cache — acceptable.
- **Schema change breaks check** — fix paths only; do not flatten folder structure.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# 21 pages; optimized assets:
grep -o '_astro/[^"]*' dist/projects/umaicha/index.html | head -5
du -ch dist/_astro/*.{webp,png,jpg} 2>/dev/null | tail -1
```

---

## References

- [Epics — Story 5.2](../planning-artifacts/epics.md)
- [PRD — FR13](../planning-artifacts/prd.md)
- [Architecture ADR-006, §6.2](../planning-artifacts/architecture.md)
- [Story 5.1](./5-1-project-detail-routes.md)
- [Story 2.3](./2-3-migrate-project-case-study-markdown.md)
- [Astro: Images in content collections](https://docs.astro.build/en/guides/images/#images-in-content-collections)
- [Astro: `<Image />` component](https://docs.astro.build/en/guides/images/#image--)
- [Legacy: `workTemplate.js` WorkQuery](../../src/templates/workTemplate.js)
- [Migration parity checklist](../../docs/migration-parity-checklist.md)

---

## Dev agent record

### Agent model used

Composer (dev-story)

### Debug log references

- Gates: `check` 0/0/0, `build` 21 pages, 31 optimized image variants, `test:schema` OK (Node 22.12).
- `dist/_astro/*.webp` total ~1.5 MB vs ~17 MB source PNGs.
- `dist/projects/umaicha/index.html`: `srcset` 640/1000/1600w + `sizes`; no `content/projects` paths.
- Listing: `widths=[400,800]`, `sizes=(max-width: 768px) 50vw, 14rem`.

### Completion notes list

- AC1/2/5: `projects` schema `image()` on `thumbnail` + `images[].image`; `ProjectImage.astro` + `<Image />` on HomeWorks + gallery.
- AC3: routes/copy/HomeContact unchanged; deleted `resolveProjectAsset.ts`.
- AC4: parity checklist FR13 note on all 5 project rows.
- Build log: sainsburys principal 1101kB→17–56kB webp variants; colossus/oysho/australis/umaicha similarly compressed.

### File list

- `site/src/content.config.ts`
- `site/src/components/projects/ProjectImage.astro`
- `site/src/components/home/HomeWorks.astro`
- `site/src/pages/projects/[...slug].astro`
- `site/src/utils/resolveProjectAsset.ts` (deleted)
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/5-2-project-and-listing-images.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR13: `image()` schema, `<Image />` on HomeWorks + project gallery, remove glob raw URLs, parity doc. | bmad-create-story |
| 2026-05-22 | Implemented `image()` + ProjectImage; deleted resolveProjectAsset; 1.5MB webp output; gates green; status → review. | dev-story |
| 2026-05-22 | Code review: clean; AC1–5 verified; status → done. Epic 5 complete. | code-review |
