# Story 9.2: Archive or remove legacy Gatsby application tree

**Story ID:** 9.2  
**Story key:** `9-2-archive-or-remove-legacy-gatsby-tree`  
**Status:** done  
**Epic:** 9 — Legacy codebase retirement and production cutover  
**Depends on:** Story **9.1** (docs state production = `site/`) — **done**  
**Blocks:** Story **9.4** (repo hygiene assumes legacy tree is no longer at repo root)  
**Parallel with:** Story **9.3** (GitHub Pages settings) — no contradictory deploy instructions  
**Followed by:** Story **9.3**, **9.4**

---

## Story

As a **maintainer**,  
I want **repo-root Gatsby** (`gatsby-config.js`, `gatsby-node.js`, legacy `src/`, root `package.json` deploy scripts) retired,  
So that **only `site/`** remains the maintained application (**FR23**, **NFR-R2**).

---

## Acceptance criteria

1. **Given** blog posts, projects, icons, and fonts already live under **`site/`** (Epics 2–5, 8)  
   **When** the legacy Gatsby app is archived  
   **Then** there is **no** `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `gatsby-ssr.js`, or **`src/`** at the **repository root**  
   **And** the full legacy app lives under **`legacy/gatsby/`** (preferred) with a short **`legacy/gatsby/README.md`** (archive date, Node 14/16 only, not production).

2. **Given** PRD **v1.2** / Story **9.1** docs  
   **When** a contributor clones the repo  
   **Then** root **`package.json`** does **not** expose **`gatsby build`**, **`gatsby develop`**, or **`npm run deploy`** (gh-pages)  
   **And** either there is **no** root `package.json`, or a **minimal stub** points to **`site/`** only (no Gatsby dependencies).

3. **Given** Story **9.1** entry docs  
   **When** archive completes  
   **Then** **`README.md`**, **`docs/development-guide.md`**, **`docs/project-overview.md`**, and **`docs/deployment-guide.md`** legacy paths reference **`legacy/gatsby/`** (not “repo root `src/`”)  
   **And** **`docs/index.md`** still lists production commands as **`cd site && …`** only.

4. **Given** optional safety net (recommended)  
   **When** moving files  
   **Then** create an annotated git tag on **`main`** before the move (e.g. `legacy-gatsby-pre-archive-2026-05-22`) documenting the last commit with root Gatsby layout.

5. **Given** no intentional changes to Astro production code  
   **When** complete  
   **Then** gate quartet from **`site/`** passes with **0** errors:
   ```bash
   cd site && npm run check && npm run build && npm run test:schema && npm run test:links
   ```

6. **Given** CI today only builds **`site/`**  
   **When** complete  
   **Then** **`.github/workflows/deploy-astro-pages.yml`** is unchanged unless a path reference was wrong (should not be).

---

## Tasks / subtasks

### Task 1 — Snapshot tag (recommended)

- [x] On current `main`, create annotated tag: `legacy-gatsby-pre-archive-2026-05-22` (or same date as implementation) with message pointing to this story.
- [x] Record tag name in Dev Agent Record (do **not** force-push tags).

### Task 2 — Create archive layout

- [x] Create **`legacy/gatsby/`**.
- [x] **Move** (git mv) into **`legacy/gatsby/`**:
  - `gatsby-config.js`
  - `gatsby-node.js`
  - `gatsby-browser.js`
  - `gatsby-ssr.js`
  - `src/` (entire tree)
  - `package.json`
  - `yarn.lock`
  - `.prettierrc` (legacy formatter for `src/**/*.{js,jsx}` — move with app)
- [x] Add **`legacy/gatsby/README.md`**: archived Gatsby 2 app; production is `../site/`; Node 14/16; `npm install && npm run develop` only for historical diff; **do not deploy**.

### Task 3 — Root package.json retirement

- [x] Remove root **`package.json`** and **`yarn.lock`** after move (they now live under `legacy/gatsby/`).
- [x] **Option A (preferred):** no root `package.json` — production is entirely under `site/package.json`.
- [ ] **Option B:** minimal root `package.json` with `"private": true`, no `dependencies`, scripts only documenting `cd site && npm run dev` — **no** Gatsby scripts. _(not used — Option A)_

### Task 4 — Doc path updates (required for AC3)

- [x] **`README.md`** — legacy line: `legacy/gatsby/` not root `src/`.
- [x] **`docs/development-guide.md`** — Install/commands sections: `cd legacy/gatsby` + Node 14/16; label **archive reference only**.
- [x] **`docs/project-overview.md`** — Legacy location = `legacy/gatsby/`.
- [x] **`docs/deployment-guide.md`** — Legacy deploy table: paths under `legacy/gatsby/`.
- [x] **`docs/migration-parity-checklist.md`** — §7.1 audit source line: `legacy/gatsby/src/` + `legacy/gatsby/gatsby-node.js` (inventory still valid for diff).
- [x] Grep repo for `gatsby-config.js` / root `` `src/` `` in maintainer docs; fix broken references. **Defer** full rewrite of `docs/architecture.md`, `source-tree-analysis.md`, `component-inventory.md` to **9.4** unless a link is actively misleading.

### Task 5 — `.gitignore` (if needed)

- [x] Ensure Gatsby build artifacts under archive still ignored: `.cache/`, `public/` (global rules likely sufficient; add `legacy/gatsby/public` if builds are run there).

### Task 6 — Verification

- [x] `test ! -f gatsby-config.js && test ! -d src` at repo root.
- [x] `test -f legacy/gatsby/gatsby-config.js && test -d legacy/gatsby/src`.
- [x] Gate quartet from **`site/`** → **0**.
- [x] `grep -R "npm run deploy" README.md docs/*.md` — only in **deprecated** / **legacy** context.

---

## Dev notes

### What this story is NOT

- **Not** deleting git history — archive is a **move**, optionally tagged.
- **Not** removing duplicate assets that already exist under **`site/`** (icons, fonts, content) — **9.4**.
- **Not** changing GitHub Pages UI settings — **9.3**.
- **Not** removing the **`gh-pages`** git branch on GitHub remote — **9.3** (document/sunset only).
- **Not** rewriting every BMad planning doc or April 2026 scan JSON — **9.4** / deferred-work.

### Preferred approach (PM / epics)

**Archive to `legacy/gatsby/`** — not hard delete. Keeps FR23 “archived under `legacy/gatsby/`” and supports checklist §7.1 diff without checking out an old tag.

### Current repo root (pre-move)

| Path | Action |
|------|--------|
| `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `gatsby-ssr.js` | → `legacy/gatsby/` |
| `src/` | → `legacy/gatsby/src/` |
| `package.json`, `yarn.lock` | → `legacy/gatsby/` |
| `.prettierrc` | → `legacy/gatsby/` (optional: keep copy at root if tooling needs it — prefer single copy in archive) |
| `site/` | **Do not move or edit** except accidental path fixes |
| `.github/workflows/deploy-astro-pages.yml` | **Do not change** |
| `scripts/capture-legacy-baselines.sh` | Stays at repo root; still uses `_baseline/` |
| `_baseline/`, `_bmad-output/`, `docs/`, `LICENSE`, `README.md` | Stay at root |

No `static/` folder at root today. `public/` is gitignored build output — not tracked.

### Root `package.json` today (remove from root)

```json
"scripts": {
  "build": "gatsby build",
  "deploy": "gatsby build && gh-pages -d public",
  "develop": "rm -rf .cache && gatsby develop",
  ...
}
```

After archive, a clone with `npm install` at **repo root** must **not** install Gatsby 2 / `node-sass`.

### Content already migrated (do not re-copy)

- `site/src/content/posts/**` — 9 posts (Story 2.2)
- `site/src/content/projects/**` — projects (Story 2.3)
- `site/src/assets/icons/**`, fonts, images (Epics 3–5, 8)

Legacy `src/content/**` in archive is **reference only**.

### Previous story intelligence (9.1)

- Production docs already say Gatsby is **deprecated**; paths still say “repo root” — **this story fixes paths**.
- CR deferred full `architecture.md` / `source-tree-analysis.md` refresh — touch only **entry** docs listed in Task 4 unless you find a broken absolute path.
- Gate quartet is the only required automated test.

### Architecture / PRD

- **FR23** — retire legacy tree; archive path `legacy/gatsby/`.
- **NFR-R2** — single maintained application (`site/`).
- **FR18** — unchanged; CI already Astro-only.

### Guardrails

1. Use **`git mv`** to preserve history where possible.
2. **Never** delete `site/` or `.github/workflows/deploy-astro-pages.yml`.
3. **Never** run `npm install` at repo root on Node 22 expecting success after stub removal — verify **no** root install is needed for CI.
4. Do **not** remove `_bmad-output/` or planning artifacts.
5. If `legacy/` already exists, use `legacy/gatsby/` only; do not collide with other legacy folders.

### Testing

- [x] Structural checks (Task 6).
- [x] Gate quartet from `site/` (Node ≥ 22.12).
- [ ] Optional smoke: `cd site && npm run preview` — home `/` returns 200 (manual).

---

## References

- [epics.md — Story 9.2](../planning-artifacts/epics.md)
- [prd.md v1.2 — FR23](../planning-artifacts/prd.md)
- [9-1-document-site-as-sole-production-application.md](./9-1-document-site-as-sole-production-application.md)
- [deferred-work.md](./deferred-work.md) — doc refresh items partially addressed here, rest in **9.4**

---

## Dev Agent Record

### Agent Model Used

Composer (dev-story)

### Completion Notes List

- **`git mv`** moved Gatsby app (`gatsby-*.js`, `src/`, `package.json`, `yarn.lock`, `.prettierrc`) → **`legacy/gatsby/`**; no root `package.json` (Option A).
- Added **`legacy/gatsby/README.md`** with archive notice and Node 14/16 guidance.
- Annotated tag **`legacy-gatsby-pre-archive-2026-05-22`** on pre-move commit (points at repo-root Gatsby layout).
- Updated entry docs: README, development-guide, project-overview, deployment-guide, index, migration-parity-checklist, site/README.
- `.gitignore` global `public` / `.cache/` covers archive builds; no change required.
- Gate quartet from **`site/`**: all **0** (2026-05-22). CI workflow untouched.

### File List

- `legacy/gatsby/` (moved app + README)
- `README.md`
- `site/README.md`
- `docs/development-guide.md`
- `docs/project-overview.md`
- `docs/deployment-guide.md`
- `docs/index.md`
- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/9-2-archive-or-remove-legacy-gatsby-tree.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- Git tag: `legacy-gatsby-pre-archive-2026-05-22`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; status → ready-for-dev. | create-story |
| 2026-05-22 | DS complete; archive + docs; gates green; status → review. | dev-story |
| 2026-05-22 | CR approved; 1 patch (`docs/index.md` primary language line); 3 deferrals; status → done. | code-review |

---

## Code review (2026-05-22)

**Outcome:** Approved → **done**

### Review Findings

- [x] [Review][Patch] `docs/index.md` still said “JavaScript (React) at root” after archive — fixed to **`legacy/gatsby/`** (CR)
- [x] [Review][Defer] `docs/architecture.md` § Deployment still Gatsby/`gh-pages` first — **9.4** [`docs/architecture.md:48`]
- [x] [Review][Defer] `docs/source-tree-analysis.md`, `component-inventory.md`, `project-scan-report.json` — April scan; **9.4**
- [x] [Review][Defer] Checklist §7.1 table rows use `src/...` paths (relative to archive app; audit header already says `legacy/gatsby/`) — optional prefix in **9.4**

### Acceptance criteria audit

| AC | Result | Evidence |
|----|--------|----------|
| 1 | Pass | No root Gatsby files; `legacy/gatsby/` + README |
| 2 | Pass | No root `package.json` |
| 3 | Pass | Entry docs reference `legacy/gatsby/`; index production = `site/` |
| 4 | Pass | Tag `legacy-gatsby-pre-archive-2026-05-22` → root `gatsby-config.js` |
| 5 | Pass | Gate quartet **0** (re-run in CR) |
| 6 | Pass | `deploy-astro-pages.yml` unchanged |

**Dismissed:** Unchecked Task 3 Option B — explicitly not used (Option A).
