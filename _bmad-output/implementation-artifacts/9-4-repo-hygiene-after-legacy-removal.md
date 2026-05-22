# Story 9.4: Repo hygiene after legacy removal

**Story ID:** 9.4  
**Story key:** `9-4-repo-hygiene-after-legacy-removal`  
**Status:** done  
**Epic:** 9 — Legacy codebase retirement and production cutover  
**Depends on:** Story **9.2** (legacy tree under **`legacy/gatsby/`**) — **done**; Story **9.3** (Pages → Actions) — **complete or parallel** (hygiene docs should not contradict live deploy)  
**Followed by:** Epic **9** retrospective optional; maintainer treats repo as single-product

---

## Story

As a **maintainer**,  
I want **duplicate legacy assets and stale doc references cleaned up**,  
So that the repo reflects **one product** under **`site/`** (**FR23**, **NFR-R2**).

---

## Acceptance criteria

1. **Given** Story **9.2** moved Gatsby app to **`legacy/gatsby/`**  
   **When** hygiene pass completes  
   **Then** **no** duplicate **production** asset trees exist outside **`site/`** except **`legacy/gatsby/**`** (archive-only) and **`_baseline/**`**  
   **And** any prune of **`site/src/assets/icons/`** removes only files **unreferenced** by `site/` (grep / build), keeping `javascript.png`, `react.png`, `recipes.png` and favicons in **`site/public/`**.

2. **Given** deferred-work and **9.1** code review noted stale scan docs  
   **When** docs are updated  
   **Then** **`docs/source-tree-analysis.md`** describes **`site/`** as the **application root** and **`legacy/gatsby/`** as archived reference  
   **And** **`docs/architecture.md`** (brownfield `docs/` copy) opening sections state **Astro production** + link to **`_bmad-output/planning-artifacts/architecture.md`** for migration ADRs — not Gatsby-as-primary.

3. **Given** **`docs/component-inventory.md`** and **`docs/project-scan-report.json`** may still describe Gatsby-first layout  
   **When** hygiene completes  
   **Then** each file has a **top banner** or **Last updated** note: *Production = `site/`; legacy inventory under `legacy/gatsby/` — see Story 9.4*  
   **Or** minimal rewrite of root paths (`src/` → `site/src/`, `legacy/gatsby/src/` for historical components).

4. **Given** **`.github/workflows/`**  
   **When** verified  
   **Then** **no** workflow on **`main`** runs **`gatsby build`** or deploys **`legacy/gatsby/public`** to Pages  
   **And** finding recorded in Dev Agent Record (workflow list).

5. **Given** maintainer-facing docs grep  
   **When** complete  
   **Then** no **active** instruction runs **`npm run develop`** or **`npm run deploy`** at **repo root** without **deprecated/archive** label  
   **And** **`docs/development-guide.md`** § Content authoring points only to **`site/src/content/`** (legacy path labeled archive-only)  
   **And** **`docs/index.md`** uses “production” framing, not “Astro cutover” as primary mental model (cosmetic AC from 9.1 CR deferral).

6. **Given** optional **`scripts/`** or tooling referencing root **`src/`**  
   **When** scanned  
   **Then** update or annotate scripts that assume repo-root Gatsby (e.g. comments in **`scripts/capture-legacy-baselines.sh`** remain valid for **`_baseline/`** only).

7. **Given** gate quartet from **`site/`**  
   **When** run after any `site/` asset or doc-driven config touch  
   **Then** all exit **0**.

---

## Tasks / subtasks

### Task 1 — Duplicate asset inventory (AC1)

- [x] Compare **`site/src/assets/icons/`** vs **`legacy/gatsby/src/assets/icons/`**:
  - Production uses: `javascript.png`, `react.png`, `recipes.png` (per deferred-work / BlogCategoryIcon).
  - Candidates to **delete from `site/`** if unreferenced: `angular`, `css3`, `gatsbyjs`, `git`, `graphql`, `html5`, `nodejs`, `typescript`, `vuejs`, `icons.ai` (verify with `rg` / `npm run build`).
- [x] Confirm **`site/public/fonts/mfred/`** is canonical; **`legacy/gatsby/src/assets/fonts/mfred/`** stays in archive only.
- [x] Confirm home images live under **`site/public/images/home/`** (or documented path); **`legacy/gatsby/src/assets/images/`** not copied again.
- [x] Document prune list in Dev Agent Record.

### Task 2 — Prune unreferenced `site/` assets (AC1)

- [x] Remove unreferenced icons under **`site/src/assets/icons/`** only after grep proves zero imports.
- [x] Do **not** delete **`legacy/gatsby/**`** content in this story (archive retention).

### Task 3 — Refresh `docs/source-tree-analysis.md` (AC2) — primary deliverable

- [x] Replace Gatsby-root tree with:

  ```
  repo-root/
  ├── site/                 # PRODUCTION — Astro 6 app
  ├── legacy/gatsby/        # ARCHIVE — Gatsby 2 (reference)
  ├── docs/
  ├── _bmad-output/
  ├── .github/workflows/deploy-astro-pages.yml
  └── _baseline/
  ```

- [x] Brief § on `site/src/pages`, `site/src/content`, `site/src/components`.

### Task 4 — Refresh `docs/architecture.md` (AC2)

- [x] Update § Overview + Deployment to match **`deployment-guide.md`** (Actions → **`site/dist`**).
- [x] Keep historical Gatsby paragraph under **## Legacy (archived)** subheading.

### Task 5 — Banner updates for scan artifacts (AC3)

- [x] **`docs/component-inventory.md`** — production vs archive paths.
- [x] **`docs/project-scan-report.json`** — add `"superseded_by": "Story 9.4"` / `"production_root": "site/"` metadata field OR companion note in **`docs/index.md`** if JSON rewrite is noisy.

### Task 6 — Doc grep pass (AC5)

- [x] `rg -n 'npm run deploy|gatsby develop|repo.root src/' docs README.md site/README.md` — fix or label deprecated.
- [x] **`docs/development-guide.md`** — ensure § Content authoring is production-first.
- [x] **`docs/index.md`** — replace “cutover” primary framing if still present.

### Task 7 — CI / workflow audit (AC4)

- [x] `ls .github/workflows/` — confirm Astro-only deploy.
- [x] `rg -l 'gatsby|gh-pages' .github/` — expect comments only or none.

### Task 8 — Deferred-work hygiene (optional)

- [x] Add **`deferred-work.md`** Epic 9 section: resolved “legacy `src/content` at repo root” → archived; icon prune done in **9.4**.

### Task 9 — Verification (AC7)

- [x] Gate quartet from **`site/`** → **0**.
- [x] `npm run build` in **`site/`** after icon prune — no missing asset errors.

---

## Dev notes

### What this story is NOT

- **Not** deleting **`legacy/gatsby/`** (archive kept for FR23 diff).
- **Not** changing GitHub Pages UI (**9.3**).
- **Not** rewriting **`_bmad-output/planning-artifacts/architecture.md`** (BMad ADRs) unless a broken link from `docs/`.
- **Not** re-migrating content from archive to **`site/`**.

### Duplicate icons context (deferred-work)

Story **2.2** deferred pruning unused icons; copies may exist in both trees after migration. **9.4** prunes **`site/`** only.

### Files expected to touch

| File | Action |
|------|--------|
| `docs/source-tree-analysis.md` | **Rewrite** production tree |
| `docs/architecture.md` | Update overview + deployment |
| `docs/component-inventory.md` | Banner or path fix |
| `docs/index.md` | Wording |
| `docs/development-guide.md` | Content authoring clarity |
| `site/src/assets/icons/*` | Prune unreferenced |
| `docs/migration-parity-checklist.md` | Revision history optional |
| `_bmad-output/implementation-artifacts/deferred-work.md` | Optional closure notes |

### Previous story intelligence

- **9.1 CR deferrals** — `architecture.md`, `source-tree-analysis.md`, `index.md` cutover wording → **this story**. [9-1-document-site-as-sole-production-application.md](./9-1-document-site-as-sole-production-application.md)
- **9.2** — archive path; grep targets use **`legacy/gatsby/`**. [9-2-archive-or-remove-legacy-gatsby-tree.md](./9-2-archive-or-remove-legacy-gatsby-tree.md)
- **9.3** — production smoke proves live site before deleting remote **`gh-pages`** (coordinate if same session).

### Architecture / PRD

- **FR23** — single maintained application; repo layout matches reality.
- **NFR-R2** — docs reflect **`site/`** entry commands.
- **ADR-005** — production styles under **`site/src/styles/`**.

### Guardrails

1. **Never** remove referenced icons or images from **`site/`**.
2. **Never** delete **`legacy/gatsby/`** in hygiene pass.
3. Prefer **banner + pointer** over full rewrite of large inventories when time-boxed.
4. Run **`npm run build`** after asset deletes.

### Testing

- [x] `rg` shows no misleading root `src/` paths in entry docs.
- [x] Gate quartet green.

---

## References

- [epics.md — Story 9.4](../planning-artifacts/epics.md)
- [prd.md v1.2 — FR23](../planning-artifacts/prd.md)
- [deferred-work.md](./deferred-work.md)
- [9-2-archive-or-remove-legacy-gatsby-tree.md](./9-2-archive-or-remove-legacy-gatsby-tree.md)

---

## Dev Agent Record

### Agent Model Used

Composer (dev-story)

### Completion Notes List

- Pruned **10** unused icon files from **`site/public/icons/`** and **`site/src/assets/icons/`** (angular, css3, gatsbyjs, git, graphql, html5, nodejs, typescript, vuejs; `icons.ai` from src only). Kept **javascript**, **react**, **recipes** + favicon PNGs (icon16/32/64/manifest).
- Rewrote **`docs/source-tree-analysis.md`** and **`docs/architecture.md`** for Astro production + `legacy/gatsby/` archive.
- Updated **`component-inventory.md`**, **`project-scan-report.json`**, **`index.md`**, **`development-guide.md`** (§ Content authoring).
- **CI audit:** only `.github/workflows/deploy-astro-pages.yml`; `rg gatsby|gh-pages .github/` → no matches.
- **`scripts/capture-legacy-baselines.sh`** — already documents offline legacy host; no change required (AC6).
- Gate quartet (Node **22.12**): check, build, test:schema, test:links → **0**.

### File List

- `docs/source-tree-analysis.md`
- `docs/architecture.md`
- `docs/component-inventory.md`
- `docs/project-scan-report.json`
- `docs/index.md`
- `docs/development-guide.md`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `site/public/icons/` (removed 8 PNGs)
- `site/src/assets/icons/` (removed 9 files)
- `_bmad-output/implementation-artifacts/9-4-repo-hygiene-after-legacy-removal.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; status → ready-for-dev. | create-story |
| 2026-05-22 | DS complete; docs refresh + icon prune; gate quartet green; status → review. | dev-story |
| 2026-05-22 | CR approved; all AC pass; status → done. | code-review |

---

## Code review (2026-05-22)

**Outcome:** Approved → **done**

### Review Findings

- [x] [Review][Defer] Checklist §7.1/§8.1 table rows still use short `src/...` paths — headers cite `legacy/gatsby/`; cosmetic prefix optional (**9.2 CR defer**, unchanged)
- [x] [Review][Defer] Duplicate icon copies in `site/public/icons/` and `site/src/assets/icons/` (7 files) — intentional: frontmatter uses `assets/icons/` paths; runtime teasers use `/icons/` via `resolvePostIcon.ts`

### Acceptance criteria audit

| AC | Result | Evidence |
|----|--------|----------|
| 1 | Pass | Unused icons pruned; kept js/react/recipes + favicons; `legacy/gatsby/` intact; build OK |
| 2 | Pass | `source-tree-analysis.md`, `architecture.md` production-first |
| 3 | Pass | Banners on `component-inventory.md`, `project-scan-report.json` metadata |
| 4 | Pass | Only `deploy-astro-pages.yml`; no gatsby/gh-pages in `.github/` |
| 5 | Pass | No root deploy/develop; § Content authoring → `site/src/content/`; no “cutover” in `index.md` |
| 6 | Pass | `capture-legacy-baselines.sh` unchanged (valid) |
| 7 | Pass | Gate quartet **0** (CR re-run) |

**Dismissed:** None.
