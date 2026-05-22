# Story 5.1: Project detail routes

**Story ID:** 5.1  
**Story key:** `5-1-project-detail-routes`  
**Status:** done  
**Epic:** 5 — Project case studies with strong imagery  
**Depends on:** Story **2.3** (five projects in `site/src/content/projects/**`), Stories **3.1–3.6** (`BaseLayout`, nav, contact), Story **4.3** (canonical `path`-keyed `getStaticPaths` + `render(entry)` pattern)  
**Followed by:** Story **5.2** (`astro:assets` thumbnails and gallery optimization — **FR13**)

---

## Story

As a **visitor**,  
I want **each project** at its stable `path`,  
So that **FR6** is met.

---

## Acceptance criteria (from epics)

1. **Given** each project’s `path` frontmatter (e.g. `/projects/umaicha`, `/projects/colossus-bets`)  
   **When** the site is built  
   **Then** a static HTML file exists at that URL for **all 5** projects (via `getStaticPaths` keyed on `path`, **not** collection folder name).

2. **Given** a project detail page  
   **When** rendered  
   **Then** the page shows **`title`**, **`excerpt`** (legacy “description” block), and the full markdown **body** inside a readable layout on background `#fbf9f3` (legacy `WorkTemplate`).

3. **Given** Story 3.1 heading policy  
   **When** HTML is inspected  
   **Then** exactly **one** `<h1>` shows the project `title`; markdown body must **not** emit a second top-level heading.

4. **Given** legacy `workTemplate.js` gallery (`frontmatter.images`)  
   **When** a project has a parsed `images` array (all five have **one** active entry today)  
   **Then** each gallery item renders **title** + **image** using co-located asset paths (same resolution approach as `HomeWorks.astro` — plain `<img>` URLs, **not** `astro:assets` yet).  
   **Note:** Thumbnail hero in legacy template is **commented out** — do **not** require hero thumbnail on detail page in 5.1 (listing uses `HomeWorks`; optimization is **5.2**).

5. **Given** legacy `gatsby-node.js` passes `prev`/`next` project context  
   **When** comparing `src/templates/workTemplate.js`  
   **Then** legacy UI **does not render** prev/next links (context unused). **Do not add** project prev/next in 5.1 unless explicitly documenting as intentional enhancement — record “no legacy prev/next” in parity checklist.

6. **Given** legacy `workTemplate.js` ends with `ContactBlock`  
   **When** the project page renders  
   **Then** include **`HomeContact`** (or equivalent shared contact section) below the case study content so FR20 remains reachable from project journeys.

7. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**; built output includes all 5 project URLs; page count increases by **5** (baseline **16** → **21**).

---

## Tasks / subtasks

- [x] **Create `site/src/utils/projectPosts.ts`** (AC1, AC5) — Mirror `blogPosts.ts` patterns:
  ```ts
  import { getCollection, type CollectionEntry } from 'astro:content';

  export async function getSortedProjects() {
    const projects = await getCollection('projects');
    return [...projects].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }

  export function getProjectSlugFromPath(path: string): string {
    const prefix = '/projects/';
    if (!path.startsWith(prefix) || path === '/projects' || path === '/projects/') {
      throw new Error(`Invalid project path for slug: ${path}`);
    }
    return path.slice(prefix.length);
  }
  ```
  **Critical:** `colossus` folder → slug `colossus-bets` from `path`, not folder name.

- [x] **Optional shared asset resolver** (AC4) — Extract co-located image resolution from `HomeWorks.astro` into e.g. `site/src/utils/resolveProjectAsset.ts` and reuse in gallery + home listing. **If skipped**, duplicate the minimal `import.meta.glob` logic in the project page — keep scope small.

- [x] **Create `site/src/layouts/ProjectLayout.astro`** (AC2, AC3, AC6) — Thin wrapper over `BaseLayout` with `title` / `description` props (same contract as `BlogLayout`). No blog-specific chrome.

- [x] **Create `site/src/pages/projects/[...slug].astro`** (AC1–4, AC6, AC7) — Core route:
  ```astro
  ---
  import ProjectLayout from '../../layouts/ProjectLayout.astro';
  import HomeContact from '../../components/home/HomeContact.astro';
  import { getSortedProjects, getProjectSlugFromPath } from '../../utils/projectPosts';
  import { render, type CollectionEntry } from 'astro:content';

  export async function getStaticPaths() {
    const projects = await getSortedProjects();
    return projects.map((entry) => ({
      params: { slug: getProjectSlugFromPath(entry.data.path) },
      props: { entry },
    }));
  }

  interface Props { entry: CollectionEntry<'projects'>; }
  const { entry } = Astro.props;
  const { Content } = await render(entry);
  ---
  <ProjectLayout title={entry.data.title} description={entry.data.excerpt}>
    <article class="project-detail">...</article>
    <HomeContact />
  </ProjectLayout>
  ```
  - Use `render(entry)` from `astro:content` (Astro 6 — **not** `entry.render()`).
  - Scoped CSS approximating legacy: `#fbf9f3` surface, centered column (~60% / max ~1000px), large uppercase `h1`, excerpt + body typography, gallery `.work-image` spacing, `img { max-width: 100% }`, `overflow-x: hidden` on article (FR15).
  - Shiki: global `astro.config.mjs` markdown config from Story **4.5** applies if body contains fences (unlikely on projects — no change needed).

- [x] **Gallery block** (AC4) — Below `.project-detail__content`, map `entry.data.images ?? []`:
  ```astro
  {entry.data.images?.map((item) => (
    <figure class="project-detail__gallery-item">
      <img src={resolvedSrc} alt={item.title} loading="lazy" />
      <h3>{item.title}</h3>
    </figure>
  ))}
  ```
  Resolve `item.image` (e.g. `./principal.png`) relative to `entry.id` folder via glob or shared helper.

- [x] **Verify all 5 URLs in `dist/`** (AC1, AC7):
  ```bash
  cd site && npm run build
  for p in umaicha sainsburys oysho colossus-bets australis; do
    test -f "dist/projects/${p}/index.html" || echo "MISSING $p"
  done
  ```
  Record emitted path pattern in Dev Agent Record (expect `dist/projects/{slug}/index.html` like blog).

- [x] **Update `docs/migration-parity-checklist.md`** (AC5) — For each project row under “Projects — case studies”, add Notes: `Story 5.1: static detail; no legacy prev/next; gallery via co-located paths; images optimization deferred to 5.2`.

- [x] **Manual smoke** (AC2, AC6) — From home `HomeWorks` links: open **umaicha**, **colossus-bets**, **sainsburys**; one `h1`, excerpt visible, body readable, gallery image loads, `HomeContact` mailto works; 320px width — no horizontal page scroll (FR15).

- [x] **Do not** in this story: `astro:assets` / `<Image />` (5.2), project prev/next nav, edits to `content.config.ts`, markdown body churn, `client:*`, or legacy tree deletion.

### Review Findings

_Code review 2026-05-22 — story `5-1-project-detail-routes`. Gates re-run: check/build/test:schema → 0; 21 pages._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch`, `decision-needed`, or `defer` items.

| AC | Verdict |
|----|---------|
| AC1 | 5× `dist/projects/{slug}/index.html`; `colossus-bets` from `path` |
| AC2 | `title`, excerpt, body, `#fbf9f3` |
| AC3 | 1× `<h1>` per page (e.g. Sainsbury's) |
| AC4 | Gallery via `resolveProjectAsset`; plain `<img>` |
| AC5 | No prev/next; parity checklist updated |
| AC6 | `HomeContact` + `mailto:` on detail pages |
| AC7 | 16 → 21 pages; gates green |

_Note:_ New route files may be untracked in git until commit; implementation verified via build output.

---

## Path inventory (canonical URLs — use `path`, not folder)

| # | Folder | `path` frontmatter | Expected `params.slug` |
|---|--------|---------------------|-------------------------|
| 1 | `australis/` | `/projects/australis` | `australis` |
| 2 | `colossus/` | `/projects/colossus-bets` | `colossus-bets` |
| 3 | `oysho/` | `/projects/oysho` | `oysho` |
| 4 | `sainsburys/` | `/projects/sainsburys` | `sainsburys` |
| 5 | `umaicha/` | `/projects/umaicha` | `umaicha` |

**Trap:** `getStaticPaths` must **not** use `entry.id` or folder name as the URL segment.

---

## Current baseline (pre-story)

- **Data:** All 5 projects validate under `projects` collection ([2-3](./2-3-migrate-project-case-study-markdown.md)).
- **Consumers:** `HomeWorks.astro` links to `project.data.path` but routes **404** until this story.
- **Build:** 16 static pages (no `/projects/*` detail HTML).
- **Legacy:** `gatsby-node.js` creates pages at `frontmatter.path` with `WorkTemplate`; gallery + contact; no prev/next UI.

---

## Legacy vs MVP

| Legacy (`workTemplate.js`) | Story 5.1 |
|-----------------------------|-----------|
| Styled-components, 140px uppercase `h1` | Scoped CSS in `[...slug].astro` / layout — visual parity “good enough”, not pixel-perfect |
| `dangerouslySetInnerHTML` body | `render(entry)` + `<Content />` |
| Gatsby `Image` + `childImageSharp` | Co-located glob → `<img src>` (5.2 upgrades) |
| `ContactBlock` | `HomeContact` |
| `prev`/`next` in pageContext (unused) | Omitted + documented |

---

## Dev notes

### Architecture compliance

- **§5.2** — Project routes from `projects` collection `path`. [architecture.md §5.2](../planning-artifacts/architecture.md)
- **§6.2** — Project schema fields; body markdown. [architecture.md §6.2](../planning-artifacts/architecture.md)
- **§7** — `createPage` per project → `getStaticPaths`. [architecture.md §7](../planning-artifacts/architecture.md)
- **ADR-003** — No schema changes. [architecture.md ADR-003](../planning-artifacts/architecture.md)
- **ADR-006** — Image pipeline **deferred** to Story 5.2.

### PRD

- **FR6** — Visitor can open each project case study at stable public URL. [prd.md FR6](../planning-artifacts/prd.md)
- **FR15** — Core/project pages avoid horizontal overflow (smoke with blog precedent from 3.7 / 4.x).

### Previous epic intelligence (apply directly)

- **4.3** — `blog/[...slug].astro`: `getBlogSlugFromPath`, `render(entry)`, one `h1`, `.blog-post__content` typography. **Copy the routing pattern** for `projects/[...slug].astro`. [4-3-blog-post-detail-pages.md](./4-3-blog-post-detail-pages.md)
- **4.5** — Shiki already global in `astro.config.mjs`; project bodies inherit if fenced code exists. [4-5-syntax-highlighting-for-code-blocks.md](./4-5-syntax-highlighting-for-code-blocks.md)
- **3.3 / 3.6** — `HomeWorks` + `HomeContact`; reuse, do not duplicate mailto strings. [3-6-primary-contact-path.md](./3-6-primary-contact-path.md)
- **2.3** — Folder vs `path` asymmetry (`colossus-bets`); do not rename. [2-3-migrate-project-case-study-markdown.md](./2-3-migrate-project-case-study-markdown.md)

### File structure (target)

```
site/
├── src/
│   ├── layouts/ProjectLayout.astro          # NEW
│   ├── pages/projects/[...slug].astro       # NEW
│   ├── utils/projectPosts.ts                # NEW
│   ├── utils/resolveProjectAsset.ts         # NEW (optional)
│   └── components/home/HomeWorks.astro      # OPTIONAL refactor to shared resolver
docs/migration-parity-checklist.md             # MODIFIED — project rows
```

### Guardrails

1. **No** `astro:assets` / `@astrojs/image` in this story (5.2).
2. **No** edits to `site/src/content/projects/**` except broken markdown fixes if build fails.
3. **No** changes to `content.config.ts`, blog routes, or CI workflow.
4. **No** `client:*` or islands.
5. **Preserve** `HomeWorks` behavior — links must resolve after routes land.
6. **Use** `path` as sole URL authority (redirects for URL changes are Story **6.3**).
7. **Run** full gate trio after changes (`check`, `build`, `test:schema`).

### Edge cases

- **`Sainsbury's` title** — apostrophe in YAML is valid; render as-is in `<h1>`.
- **Missing `images` optional** — treat as empty gallery; page still builds.
- **Commented gallery placeholders** in YAML — remain inert; only parsed array entries render.
- **Large PNGs** — may hurt LCP until 5.2; acceptable for 5.1 functional FR6.
- **Internal links in project body** — if any broken legacy links surface, fix only if they block build or AC2 smoke.

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
# Expect 21 pages
for p in umaicha sainsburys oysho colossus-bets australis; do
  test -f "dist/projects/${p}/index.html" && echo "OK $p"
done
```

---

## References

- [Epics — Story 5.1](../planning-artifacts/epics.md)
- [PRD — FR6](../planning-artifacts/prd.md)
- [Architecture §5.2, §6.2, §7](../planning-artifacts/architecture.md)
- [Stories 2.3, 4.3, 3.6](./2-3-migrate-project-case-study-markdown.md)
- [Migration parity checklist](../../docs/migration-parity-checklist.md)
- [Legacy: `gatsby-node.js` work pages](../../gatsby-node.js)
- [Legacy: `src/templates/workTemplate.js`](../../src/templates/workTemplate.js)
- [Home listing: `site/src/components/home/HomeWorks.astro`](../../site/src/components/home/HomeWorks.astro)

---

## Dev agent record

### Agent model used

Composer (dev-story)

### Debug log references

- Gates: `check` 0/0/0, `build` **21 pages**, `test:schema` OK (Node 22.12).
- Output pattern: `dist/projects/{slug}/index.html` (all 5 OK; `colossus-bets` from `path`, not folder `colossus`).
- Build lists: `/projects/sainsburys`, `colossus-bets`, `australis`, `oysho`, `umaicha`.

### Completion notes list

- AC1/7: `projectPosts.ts` + `projects/[...slug].astro` `getStaticPaths` via `getProjectSlugFromPath`.
- AC2/3/4: `ProjectLayout`, `#fbf9f3` detail shell, one `<h1>`, excerpt, `render(entry)` body, gallery via `resolveProjectAsset`.
- AC5: parity checklist — motion removed, no prev/next, 5.2 deferred for images.
- AC6: `HomeContact` below article.
- `HomeWorks.astro` refactored to `getSortedProjects` + shared resolver.

### File list

- `site/src/utils/projectPosts.ts`
- `site/src/utils/resolveProjectAsset.ts`
- `site/src/layouts/ProjectLayout.astro`
- `site/src/pages/projects/[...slug].astro`
- `site/src/components/home/HomeWorks.astro`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/5-1-project-detail-routes.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR6: project `path` routes, WorkTemplate parity shell, gallery via co-located imgs, no prev/next, HomeContact footer; 5.2 owns astro:assets. | bmad-create-story |
| 2026-05-22 | Implemented routes, layout, gallery, HomeWorks refactor; 21 pages; gates green; status → review. | dev-story |
| 2026-05-22 | Code review: clean; AC1–7 verified; status → done. | code-review |
