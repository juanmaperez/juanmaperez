# Story 9.3: Confirm GitHub Pages and CI default to Astro artifact

**Story ID:** 9.3  
**Story key:** `9-3-confirm-github-pages-ci-default-to-astro`  
**Status:** in-progress  
**Epic:** 9 — Legacy codebase retirement and production cutover  
**Depends on:** Story **9.1** (docs) — **done**; Story **9.2** (legacy tree archived) — **done** (`legacy/gatsby/` present; no root `gatsby-config.js`)  
**Parallel with:** Story **9.4** (repo hygiene) — no contradictory deploy docs  
**Followed by:** Story **9.4**; production cutover sign-off (maintainer)

---

## Story

As a **maintainer**,  
I want **hosting settings and live production** aligned with the Astro workflow,  
So that **every push to `main`** publishes **`site/dist`**, not legacy **`gh-pages`** from Gatsby (**FR18**, **FR23**).

---

## Acceptance criteria

1. **Given** [`.github/workflows/deploy-astro-pages.yml`](../../.github/workflows/deploy-astro-pages.yml) is the **only** workflow that deploys to GitHub Pages  
   **When** repository settings are verified  
   **Then** **Settings → Pages → Build and deployment → Source** is **GitHub Actions** (not “Deploy from a branch” pointing at **`gh-pages`**)  
   **And** verification steps are recorded in Dev Agent Record (screenshot path, date, or checklist table — UI cannot be changed from git alone).

2. **Given** Story **9.1** deployment guide § “One-time GitHub repository settings”  
   **When** Story **9.3** completes  
   **Then** [`docs/deployment-guide.md`](../../docs/deployment-guide.md) includes a **Cutover verification (9.3)** subsection: confirmed date, Pages source = Actions, link to latest successful **`Deploy Astro site to GitHub Pages`** run on **`main`**.

3. **Given** optional legacy **`gh-pages`** branch may still exist on the remote from pre-migration Gatsby deploys  
   **When** cutover is documented  
   **Then** deployment guide states one of: **(a)** branch deleted after confirming Actions deploy is live, **(b)** branch retained but **not** configured as Pages source, with warning not to re-enable branch deploy  
   **And** no doc instructs running **`npm run deploy`** from **`legacy/gatsby/`** for production.

4. **Given** production hostname **`https://juanmaperez.dev`** (per `site/astro.config.mjs`)  
   **When** post-deploy smoke runs (manual or scripted)  
   **Then** these URLs return **200** with **Astro** content (not stale Gatsby HTML):
   - `/` — home hero / production nav (e.g. link to `/blog` works)
   - `/cv/` or `/cv`
   - `/blog/` — blog index
   - One known blog post path from `site/src/content/posts/**` `path` frontmatter
   - One project path from `site/src/content/projects/**`  
   **And** smoke results recorded in Dev Agent Record.

5. **Given** **`github-pages`** environment (OIDC deploy)  
   **When** first deploy after settings change is needed  
   **Then** maintainer notes whether **`github-pages` environment** approval was required (one-time) — document in deployment guide if not already clear.

6. **Given** no intentional change to Astro build logic  
   **When** complete  
   **Then** gate quartet from **`site/`** still passes:
   ```bash
   cd site && npm run check && npm run build && npm run test:schema && npm run test:links
   ```

---

## Tasks / subtasks

### Task 1 — Verify GitHub repository settings (AC1, AC5)

- [x] Open repo **Settings → Pages** (via `gh api repos/juanmaperez/juanmaperez/pages`).
- [x] Confirm **Build and deployment → Source: GitHub Actions** — API `build_type` set to **`workflow`** (was **`legacy`** / **`gh-pages`** before DS).
- [x] **Blocker noted:** default branch **`master`** has **no** Actions workflows until feature branch is merged.
- [x] Record verification in Dev Agent Record (date + outcome).

### Task 2 — CI / workflow health (AC1, AC2)

- [x] Confirm **only** [`.github/workflows/deploy-astro-pages.yml`](../../.github/workflows/deploy-astro-pages.yml) under `.github/workflows/` in repo (local).
- [x] Remote `origin/master`: **0 workflows** — latest run URL placeholder in deployment guide until merge + green deploy.
- [x] Copy run URL placeholder into deployment guide § Cutover verification.

### Task 3 — Legacy `gh-pages` branch policy (AC3)

- [x] `git ls-remote --heads origin gh-pages` — **exists**.
- [ ] Delete remote **`gh-pages`** — **deferred** until production smoke passes after Actions deploy (maintainer).
- [x] Update **`docs/deployment-guide.md`** with branch sunset note.

### Task 4 — Production smoke (AC4)

- [x] Added **`scripts/verify-production-smoke.sh`**.
- [x] **Local `site/dist` smoke** (127.0.0.1:9876): all routes **200**, Astro `/_astro/` — recorded.
- [ ] **`https://juanmaperez.dev` production smoke** — **pending maintainer** (agent network could not reach host); run script after merge + deploy.

### Task 5 — Documentation update (AC2)

- [x] Add **## Cutover verification (Story 9.3)** to **`docs/deployment-guide.md`**.
- [x] Revision line in **`docs/migration-parity-checklist.md`**.

### Task 6 — Verification (AC6)

- [x] Gate quartet from **`site/`** → **0**.

---

## Dev notes

### What this story is NOT

- **Not** archiving Gatsby (**9.2** — done).
- **Not** pruning duplicate assets or rewriting **`source-tree-analysis.md`** (**9.4**).
- **Not** changing **`astro.config.mjs`** `site` / `base` unless smoke proves misconfiguration.
- **Not** mandating Lighthouse / **7.4** (cancelled).

### Why this story exists

Docs (**9.1**) can say “use Actions” while GitHub **Settings** still point at **`gh-pages`** branch — visitors would see **stale Gatsby** output. **9.3** closes that gap.

### Current CI facts (pre-story)

| Item | State |
|------|--------|
| Workflow | `deploy-astro-pages.yml` — `upload-pages-artifact` from **`site/dist`** |
| PR builds | Build only; deploy job skipped on `pull_request` |
| Deploy trigger | `push` to `main`/`master`, `workflow_dispatch` |
| Legacy workflow | **None** in `.github/workflows/` |

### Permissions required (maintainer)

- Repo **admin** or **maintain** to change **Pages** source and delete **`gh-pages`** branch.
- Cannot be fully automated by dev agent without **`gh` CLI** + token — story may be **partially manual** with evidence in Dev Agent Record.

### Optional: `gh` CLI commands

```bash
gh api repos/{owner}/{repo}/pages --jq '.build_type,.source.branch,.source.path'
gh run list --workflow=deploy-astro-pages.yml --limit 3
```

### Previous story intelligence

- **9.1** — deployment-guide already has § One-time settings; **9.3** adds **verified** stamp + smoke. [9-1-document-site-as-sole-production-application.md](./9-1-document-site-as-sole-production-application.md)
- **9.2** — Gatsby at **`legacy/gatsby/`**; production build only **`site/`**. [9-2-archive-or-remove-legacy-gatsby-tree.md](./9-2-archive-or-remove-legacy-gatsby-tree.md)
- **1.3** — workflow author; do not break FR17/FR21 gates. [1-3-github-action-build-and-deploy-to-pages.md](./1-3-github-action-build-and-deploy-to-pages.md)

### Architecture / PRD

- **FR18** — documented CI deploy path is **authoritative** after verification.
- **FR23** — legacy **`gh-pages`** deploy path retired in practice, not only in prose.
- **ADR-002** — GitHub Pages via Actions. [architecture.md §11](../planning-artifacts/architecture.md)

### Guardrails

1. **Do not** re-enable Gatsby branch deploy “temporarily.”
2. **Do not** delete **`gh-pages`** branch until Actions production smoke passes (if deleting).
3. **Do not** change workflow triggers or Node version unless fixing a failed deploy.
4. Record **custom domain** + DNS only if smoke fails — out of scope unless mispointed.

### Testing

- [x] AC1 settings evidence (API).
- [x] AC4 local artifact smoke; production pending maintainer.
- [x] Gate quartet green.

---

## References

- [epics.md — Story 9.3](../planning-artifacts/epics.md)
- [prd.md v1.2 — FR18, FR23](../planning-artifacts/prd.md)
- [deployment-guide.md](../../docs/deployment-guide.md)
- [deploy-astro-pages.yml](../../.github/workflows/deploy-astro-pages.yml)

---

## Dev Agent Record

### Agent Model Used

Composer (dev-story)

### Completion Notes List

- **`gh api repos/juanmaperez/juanmaperez/pages`:** before DS — `build_type: legacy`, `source.branch: gh-pages`, CNAME `juanmaperez.me`; after DS — `build_type: workflow` (GitHub Actions).
- **`origin/master`:** no workflows on remote; **`deploy-astro-pages.yml`** only on local feature branch — **merge required** before first Actions deploy.
- **`origin/gh-pages`:** branch exists; policy **(b)** retain until production smoke, documented in deployment guide.
- **`scripts/verify-production-smoke.sh`:** added; local **`site/dist`** smoke **PASS** (all 5 routes 200 + `/_astro/`).
- **Production `https://juanmaperez.dev`:** not reachable from agent environment — maintainer must run smoke after merge + green workflow.
- **Domain note:** Pages API CNAME `juanmaperez.me` vs Astro `site` `juanmaperez.dev` — reconcile in GitHub Pages + DNS if needed.
- Gate quartet **0** (2026-05-22). Workflow file unchanged.

### Maintainer follow-up (before marking epic cutover complete)

1. Merge **`deploy-astro-pages.yml`** + `site/` to **`master`**.
2. Confirm **Settings → Pages → GitHub Actions** (UI).
3. Approve **`github-pages`** environment on first deploy if prompted.
4. Run `BASE=https://juanmaperez.dev ./scripts/verify-production-smoke.sh`.
5. Paste latest green Actions run URL into deployment guide verification table.
6. Optionally delete **`origin/gh-pages`**.

### File List

- `docs/deployment-guide.md`
- `docs/migration-parity-checklist.md`
- `scripts/verify-production-smoke.sh`
- `_bmad-output/implementation-artifacts/9-3-confirm-github-pages-ci-default-to-astro.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; status → ready-for-dev. | create-story |
| 2026-05-22 | DS: cutover docs + smoke script; Pages API → workflow; local dist smoke OK; production smoke pending merge; status → review. | dev-story |
| 2026-05-22 | CR: repo deliverables OK; AC2/AC4 blocked on merge + live deploy + production smoke; status → in-progress. | code-review |

---

## Code review (2026-05-22)

**Outcome:** **In progress** — git/docs work is sound; story cannot be **done** until maintainer cutover steps complete.

### Review Findings

- [x] [Review][Patch] Stray quote in deployment-guide jq example (`build_type": "workflow"`) — fixed (CR)
- [ ] [Review][Decision] **Close 9.3 as done** only after: (1) workflow on `master`, (2) green Actions deploy, (3) production smoke **PASS** on `https://juanmaperez.dev`, (4) run URL filled in verification table
- [x] [Review][Defer] Delete `origin/gh-pages` — after production smoke (already in maintainer checklist)
- [x] [Review][Dismiss] Local `site/dist` smoke — valid dev artifact check, not a substitute for AC4 (correctly documented)

### Acceptance criteria audit

| AC | Result | Evidence |
|----|--------|----------|
| 1 | **Partial** | API `build_type: workflow` (2026-05-22 CR); **0 workflows on `origin/master`**; UI re-check after merge |
| 2 | **Partial** | § Cutover verification present; **latest green run URL still placeholder** |
| 3 | Pass | `gh-pages` policy + no production `legacy/gatsby` deploy |
| 4 | **Fail** | `verify-production-smoke.sh` vs `juanmaperez.dev` → all **000** (host unreachable / not serving Astro) |
| 5 | Pass | Environment approval documented |
| 6 | Pass | `npm run check` **0** (CR re-run) |

### CR re-check (`gh api …/pages`)

```json
{"build_type":"workflow","cname":"juanmaperez.me","source":{"branch":"gh-pages","path":"/"},"status":"built"}
```

Pages source is **workflow**, but **no deploy workflow on default branch** yet; CNAME **`.me`** vs Astro **`.dev`** still needs alignment.
