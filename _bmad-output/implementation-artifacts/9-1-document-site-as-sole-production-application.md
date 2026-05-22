# Story 9.1: Document `site/` as sole production application

**Story ID:** 9.1  
**Story key:** `9-1-document-site-as-sole-production-application`  
**Status:** done  
**Epic:** 9 — Legacy codebase retirement and production cutover  
**Depends on:** Epics **1–8** and Story **7.3** (parity sign-off) — **done**; PRD **v1.2**  
**Blocks:** Story **9.2** (legacy tree removal is clearer after docs state the truth)  
**Parallel with:** Story **9.3** (hosting settings) — coordinate messaging, no duplicate contradictions  
**Followed by:** Story **9.2** (archive/remove Gatsby), **9.4** (hygiene)

---

## Story

As a **maintainer**,  
I want **docs and README** to state clearly that production is **`site/`** + **`deploy-astro-pages.yml`**,  
So that **FR18** and **FR23** intent are obvious to future me and contributors.

---

## Acceptance criteria

1. **Given** PRD **v1.2** ( **`site/`** = sole production app)  
   **When** a new contributor reads repo entry docs  
   **Then** **`docs/index.md`** and **`docs/project-overview.md`** describe **Astro under `site/`** as the **production application**, not “dual stack until cutover” as the default mental model  
   **And** legacy Gatsby at repo root is labeled **deprecated / pre-cutover reference** pending Story **9.2**.

2. **Given** [`.github/workflows/deploy-astro-pages.yml`](../../.github/workflows/deploy-astro-pages.yml)  
   **When** **`docs/deployment-guide.md`** is updated  
   **Then** the **Target** section leads with **GitHub Actions → Pages** from **`site/dist/`**  
   **And** legacy **`npm run deploy`** / **`gh-pages`** branch flow is in a clearly marked **Legacy (deprecated)** section, not the primary path  
   **And** **Settings → Pages → GitHub Actions** steps remain accurate (Story **1.3** + **9.3**).

3. **Given** root [`README.md`](../../README.md)  
   **When** Story **9.1** completes  
   **Then** the top maintainer banner states **`site/`** is production; points to **`docs/index.md`** and **`site/README.md`**  
   **And** the Gatsby starter boilerplate below is collapsed, moved to **`legacy/`** doc pointer, or prefixed with **“Historical — not production”** so it is not mistaken for current setup.

4. **Given** [`site/README.md`](../../site/README.md)  
   **When** updated  
   **Then** opening line says this folder **is** the production app (not “until cutover”)  
   **And** production deploy = push to **`main`** / **`workflow_dispatch`** on **`deploy-astro-pages.yml`**  
   **And** gate quartet commands remain documented (`check`, `build`, `test:schema`, `test:links`).

5. **Given** **`docs/development-guide.md`**  
   **When** reviewed  
   **Then** **“Two apps, two Node lines”** section explains: **day-to-day work = `site/` only**; legacy root Gatsby is **optional reference** until **9.2** removes/archives it  
   **And** no doc implies **`npm run develop`** at repo root is required for production work.

6. **Given** Story **7.3** checklist sign-off and PRD **v1.2** (Story **7.4** cancelled)  
   **When** docs mention performance gates  
   **Then** they reference **checklist LCP/JS ex.** and optional **`_baseline/README.md`** — not a mandatory **7.4** regression story.

7. **Given** documentation-only change (no Gatsby deletion in this story)  
   **When** complete  
   **Then** gate quartet from **`site/`** still passes if any accidental edits touched config (unlikely).

---

## Tasks / subtasks

### Task 1 — Deployment guide (primary)

- [x] Rewrite **`docs/deployment-guide.md` opening**: **Target = GitHub Pages via GitHub Actions** + **`site/dist/`**.
- [x] Move current Gatsby **`gh-pages`** / **`public/`** content under **## Legacy Gatsby deploy (deprecated)**.
- [x] Keep Astro CI table (triggers, `check` before `build`, `test:links`, GA4 env) — cross-link **`site/README.md`**.

### Task 2 — Project docs index

- [x] **`docs/project-overview.md`** — Repository type: **Astro production app in `site/`**; legacy Gatsby **deprecated pending 9.2**.
- [x] **`docs/index.md`** — Quick reference: **Production = `cd site && npm run dev|build`**; deploy = Actions workflow; remove “until cutover” as primary framing.

### Task 3 — README files

- [x] **Root `README.md`** — Short project-specific header; de-emphasize or relocate Gatsby starter template body.
- [x] **`site/README.md`** — Production framing; remove “work here until cutover” wording.

### Task 4 — Development guide alignment

- [x] **`docs/development-guide.md`** — Clarify maintainer default path is **`site/`**; legacy section labeled optional/archive path.

### Task 5 — Verification

- [x] Grep docs for misleading phrases: `until cutover`, `dual stack` as default, `npm run deploy` without **deprecated** context — fix or annotate.
- [x] `cd site && npm run check && npm run build && npm run test:schema && npm run test:links` → **0**.

---

## Dev notes

### What this story is NOT

- **Not** deleting or moving Gatsby files (**9.2**).
- **Not** changing GitHub Pages settings in the UI (**9.3**).
- **Not** pruning duplicate assets (**9.4**).

### Architecture / PRD compliance

- **PRD v1.2** — FR18 (sole CI deploy path), FR23 (docs prelude to legacy retirement), NFR-R2.
- **ADR-002** — GitHub Pages + Actions remains authoritative; docs must match [architecture.md §11](../planning-artifacts/architecture.md).

### Previous story intelligence

- **1.3** — Workflow and deployment-guide Astro section already exist; **9.1** reframes **priority**, not greenfield CI. [1-3-github-action-build-and-deploy-to-pages.md](./1-3-github-action-build-and-deploy-to-pages.md)
- **1.4** — `site/README.md` maintainer commands; extend, do not duplicate. [1-4-developer-documentation-and-node-pinning.md](./1-4-developer-documentation-and-node-pinning.md)
- **7.3** — Cutover sign-off done; **7.4** cancelled per PRD **v1.2**. [7-3-checklist-sign-off-before-cutover.md](./7-3-checklist-sign-off-before-cutover.md)

### Files to touch (expected)

| File | Action |
|------|--------|
| `docs/deployment-guide.md` | **Primary** — production-first structure |
| `docs/index.md` | Production quick reference |
| `docs/project-overview.md` | Repo type / tech summary |
| `docs/development-guide.md` | Default maintainer path |
| `README.md` | Root entry banner |
| `site/README.md` | Production app intro |
| `docs/migration-parity-checklist.md` | Optional one-line: Epic **9** docs sign-off (only if team wants traceability) |

### Guardrails

1. **Do not** remove `gatsby-config.js` or legacy `src/` in this story.
2. **Do not** change `.github/workflows/deploy-astro-pages.yml` unless a doc claim is wrong.
3. Keep **Node version** facts accurate: **`site/`** ≥ 22.12; legacy Gatsby older Node if still documented for archive reference.
4. **English** prose; match existing doc tone in `docs/`.

### Testing

- [x] Doc review: new contributor path **README → docs/index → site/README → deployment-guide** has no contradictory deploy instructions.
- [x] Gate quartet from `site/` (Node 22.12).

---

## References

- [epics.md — Story 9.1](../planning-artifacts/epics.md)
- [prd.md v1.2 — FR18, FR23](../planning-artifacts/prd.md)
- [deployment-guide.md](../../docs/deployment-guide.md)
- [deploy-astro-pages.yml](../../.github/workflows/deploy-astro-pages.yml)

---

## Dev Agent Record

### Agent Model Used

Composer (dev-story continuation)

### Completion Notes List

- Reframed all entry docs: production = **`site/`** + **`deploy-astro-pages.yml`**; legacy Gatsby **deprecated** (pending **9.2**).
- **`docs/deployment-guide.md`**: production Target/CI first; Gatsby **`gh-pages`** under **Legacy Gatsby deploy (deprecated)**.
- **`docs/development-guide.md`**: renamed section to **Production app vs legacy Gatsby (reference)**; root commands labeled deprecated.
- Root **`README.md`**: maintainer banner + collapsed historical Gatsby starter in `<details>`.
- Grep on `docs/`, `README.md`, `site/README.md`: no `until cutover` / dual-stack-as-default; `npm run deploy` annotated deprecated in dev guide + deployment legacy section.
- Gate quartet from **`site/`**: all **0** (2026-05-22).

### File List

- `docs/deployment-guide.md`
- `docs/index.md`
- `docs/project-overview.md`
- `docs/development-guide.md`
- `docs/migration-parity-checklist.md` (revision history)
- `README.md`
- `site/README.md` (CR: fixed deploy-guide anchor)
- `_bmad-output/implementation-artifacts/9-1-document-site-as-sole-production-application.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; PRD v1.2 Epic 9; status → ready-for-dev. | create-story |
| 2026-05-22 | DS complete; all tasks done; gate quartet green; status → review. | dev-story |
| 2026-05-22 | CR approved; 1 patch (broken deploy-guide anchor); 4 deferrals; status → done. | code-review |

---

## Code review (2026-05-22)

**Outcome:** Approved → **done**

**Layers:** Acceptance Auditor + Edge Case Hunter + Blind Hunter (inline; no subagents)

### Review Findings

- [x] [Review][Patch] Broken deployment-guide fragment link in `site/README.md` — `#astro-ci-github-actions` → `#production-ci-github-actions` (fixed in CR)
- [x] [Review][Defer] `docs/architecture.md` § Deployment still describes `public/` + `gh-pages` as primary — pre-existing scan doc; fix in **9.4** or dedicated doc pass [`docs/architecture.md:48`]
- [x] [Review][Defer] `docs/source-tree-analysis.md` + `project-scan-report.json` still Gatsby-first — out of 9.1 file list [`docs/source-tree-analysis.md`]
- [x] [Review][Defer] `docs/development-guide.md` **Content authoring** still lists legacy `src/content/*` without a “legacy only” label — contributor trap if read before § Production site [`docs/development-guide.md:51-55`]
- [x] [Review][Defer] `docs/index.md` checklist blurb still says “Astro cutover” — cosmetic; optional in **9.4** [`docs/index.md:26`]

### Acceptance criteria audit

| AC | Result | Evidence |
|----|--------|----------|
| 1 | Pass | `docs/index.md`, `docs/project-overview.md` — production = `site/`, Gatsby deprecated |
| 2 | Pass | `docs/deployment-guide.md` — Target + Production CI first; legacy section marked deprecated |
| 3 | Pass | Root `README.md` — banner + collapsed historical starter |
| 4 | Pass | `site/README.md` — production framing, deploy workflow, gates documented (`check`, `build`, `test:schema`, `test:links`) |
| 5 | Pass | `docs/development-guide.md` — production-default section; root develop not required |
| 6 | Pass | Perf advisory in deployment-guide + index; no mandatory 7.4 |
| 7 | Pass | Gate quartet green (DS log) |

**Dismissed:** AC5 literal heading “Two apps, two Node lines” — renamed section satisfies intent.
