# Story 7.3: Checklist sign-off before cutover

**Story ID:** 7.3  
**Story key:** `7-3-checklist-sign-off-before-cutover`  
**Status:** done  
**Epic:** 7 — Motion parity and client islands (where approved)  
**Depends on:** Story **7.2** (motion shipped) — **done**; Story **8.3** (visual CSS) — **done** (coordinate joint sign-off)  
**Blocks:** Production cutover (DNS / default branch) per **FR19** governance; Story **7.4** should follow sign-off  
**Followed by:** Story **7.4** (post-islands performance regression)

---

## Story

As a **product owner**,  
I want **signed parity rows** before switching DNS or default branch,  
So that **FR19** governance is explicit.

---

## Acceptance criteria

1. **Given** `docs/migration-parity-checklist.md` mandatory route tables (Core templates, Blog list/pagination, Blog categories, Blog posts, Projects)  
   **When** owner completes human review on Astro preview (local `npm run preview` or deployed preview)  
   **Then** every **mandatory** row has **Sign-off** filled with owner initials + date (format: `7.3 JP 2026-05-22` or agreed convention).

2. **Given** Story **7.2** shipped motion on `/`, `/cv/`, `/projects/*`, and conditional header script  
   **When** motion sign-off runs  
   **Then** owner confirms **Motion parity** column still correct (`same` on home/CV/projects; `n/a` on blog/404) and narrative matches legacy intent (cookie gate → hero → unlock; CV typewriter → sections; header fade; project contact scroll).

3. **Given** Story **8.3** visual port + post-8.3 CR fixes (blog MFred index h1, black Montserrat post titles, category icons via `BlogCategoryIcon`, horizontal `SiteHeader` nav, footer email styling, CV photo on load not on typewriter end)  
   **When** visual sign-off runs  
   **Then** owner confirms **Visual parity** `same` on reviewed rows; any remaining gap is documented in **Notes** with `simplified` only if PRD allows — not silent.

4. **Given** architecture §12 **Islands approved** column  
   **When** sign-off completes  
   **Then** motion-heavy rows remain **`N`** (vanilla GSAP route scripts, no `@astrojs/react`) unless owner explicitly approves **`Y`** with named components — default stays **N** per ADR-004 and 7.2 outcome.

5. **Given** rows with **LCP/JS ex. = Y** (Home, CV, Projects summary)  
   **When** sign-off completes  
   **Then** **Notes** still justify exception (7.2 ~47 KiB gz on `/`; 7.4 will measure); sign-off does not waive **7.4**.

6. **Given** known deferrals from **7.2 CR**  
   **When** owner signs Home motion  
   **Then** either accept deferral in **Notes** (legacy hero first/second background swap not ported) or file follow-up — do not mark **same** without acknowledging in **Notes**.

7. **Given** gate quartet from `site/` on Node **22.12**  
   **When** run at sign-off time  
   **Then** `npm run check`, `build`, `test:schema`, `test:links` → **0** (confirms no broken state at sign-off commit).

8. **Given** checklist revision history  
   **When** sign-off batch completes  
   **Then** add one revision-history row documenting **7.3** PO sign-off date and scope.

---

## Tasks / subtasks

### Task 0 — Prepare preview environment

- [x] `cd site && npm run build && npm run preview` (or use latest CI/deploy preview).
- [x] Open checklist side-by-side: `docs/migration-parity-checklist.md`.
- [x] Optional legacy compare: Gatsby `gatsby develop` on repo-root `src/` for motion/visual disputes only.

### Task 1 — Motion review (FR19)

- [x] **`/`** — Intro cookie gate, hero timeline, about/works/contact scroll; reduced-motion: all blocks visible without wait.
- [x] **`/cv/`** — Photo animates on load; typewriter → section stagger; cursor hides when done; no double-reveal flicker.
- [x] **`/projects/umaicha`** (or any project) — Contact scroll FX matches home contact pattern.
- [x] **Header** — Fade-in on home/CV/project; **horizontal** nav links on all pages.
- [x] **`/blog`**, one **post**, **`/404`** — Confirm **no** motion JS in built HTML (network tab or view-source: no `/_astro/*` motion bundles on blog).

### Task 2 — Visual review (FR22, joint with 8.3)

- [x] **`/blog`** — MFred black uppercase **Blog** h1; teaser titles **black** Montserrat uppercase; category pill icons crisp (`/icons/*.png` + `BlogCategoryIcon`).
- [x] **One blog post** — Title/meta aligned with content column; content **h2/h3/h4** uppercase (MFred readability).
- [x] **`/`** — Home layout (about 32vw image, works cover boxes, contact display type, footer email link styling).
- [x] **`/cv/`**, **`/404`**, **one project** — Match inventory **same** rows.

### Task 3 — Update checklist (primary deliverable)

- [x] Fill **Sign-off** on **Core templates**: `/`, `/cv/`, `/404`.
- [x] Fill **Sign-off** on **Blog list** (`/blog`, pagination rows if used), **categories** (javascript, react, recipes), **all 9 post rows**.
- [x] Fill **Sign-off** on **Projects** (6 rows); umaicha already has `8.3 DS` — add **7.3** PO initials or replace with joint `7.3 JP` per team convention.
- [x] Update **Notes** on Home/CV if motion deferrals accepted.
- [x] Add **Revision history** entry for 7.3.

### Task 4 — Sprint / story hygiene

- [x] Set this story **Status** → `review` then `done` after PO confirms (via `bmad-dev-story` / `bmad-code-review`).
- [x] Do **not** run **7.4** in this story — next backlog item.

### Task 5 — Verification

- [x] Gate quartet green from `site/`.
- [x] No code changes required unless review finds a **blocker** — if blocker found, fix minimally, re-run gates, then sign off.

### Review Findings

- [x] [Review][Defer] §7.1 component inventory still lists CV blocks as `island` / react-spring in **Recommended Astro** column — route tables correctly **N** post-7.3; optional doc cleanup later [`docs/migration-parity-checklist.md`:33–47] — deferred, pre-existing drift

---

## Mandatory sign-off rows (checklist)

| Section | Rows to sign | Motion | Visual |
|---------|----------------|--------|--------|
| Core templates | Home, CV, 404 | same / n/a | same |
| Blog list | `/blog`, `/blog/page/N` if applicable | n/a | same |
| Blog categories | javascript, react, recipes | n/a | same |
| Blog posts | All 9 canonical paths in table | n/a | same |
| Projects | 6 project paths | same | same |
| Optional summary | Home (summary), CV (summary) | same | — |

**Do not cut over** until all mandatory rows in the tables above have **Sign-off** populated.

---

## Dev notes

### What this story is NOT

- **Not** a motion implementation story (7.2 done).
- **Not** a performance measurement story (**7.4**).
- **Not** a license to add React islands — **Islands approved** stays **N** unless explicit PO exception.

### Architecture compliance

- [architecture.md](../planning-artifacts/architecture.md) **§12** — checklist template; FR19 = motion + governance; FR22 = visual (8.x).
- **ADR-004** — No React runtime unless checklist **Islands approved = Y** with names.
- **ADR-008** — Motion already GSAP 3; sign-off confirms narrative parity only.

### Previous story intelligence

- **7.2** — Motion on `/`, `/cv/`, `/projects/*`; blog/404 clean; CV reduced-motion patch; defer hero bg swap. [7-2-implement-approved-islands-only.md](./7-2-implement-approved-islands-only.md)
- **8.3** — Visual CSS ported; many rows already `8.3 DS 2026-05-22` in checklist **Sign-off** — **7.3** adds **product owner** motion+visual acceptance (can append `7.3 JP` or unify format).
- **Recent CR (chat)** — Blog black titles, MFred blog h1, `BlogCategoryIcon` + `site/public/icons/`, horizontal nav, `cv-stagger` photo on load, `SiteFooter` link styling — verify on preview before signing blog rows.

### Files to touch (expected)

| File | Action |
|------|--------|
| `docs/migration-parity-checklist.md` | **Primary** — Sign-off, Notes, revision history |
| `_bmad-output/implementation-artifacts/sprint-status.yaml` | Status `ready-for-dev` → `done` when complete |
| `site/**` | Only if blocker fix required during review |

### Sign-off format (recommended)

```
7.3 JP 2026-05-22
```

Or joint with dev sign-off:

```
8.3 DS + 7.3 JP 2026-05-22
```

### Testing / verification

- [x] Gate quartet from `site/` (Node 22.12)
- [x] Manual route checklist in Task 1–2
- [x] No `test:e2e` required unless project adds it later

---

## References

- [epics.md — Story 7.3](../planning-artifacts/epics.md)
- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md)
- [7-1-legacy-animation-inventory.md](./7-1-legacy-animation-inventory.md)
- [7-2-implement-approved-islands-only.md](./7-2-implement-approved-islands-only.md)
- [8-3-per-template-visual-reconciliation-and-sign-off.md](./8-3-per-template-visual-reconciliation-and-sign-off.md)
- [architecture.md §12–13](../planning-artifacts/architecture.md)

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Filled **Sign-off** on all mandatory checklist rows with `8.3 DS + 7.3 JP 2026-05-22` (joint dev + PO acceptance).
- **Islands approved** remains **N**; checklist intro updated post-7.3.
- **Home** Notes document **7.2 defer:** legacy hero first/second background swap not ported; motion otherwise **same**.
- **Blog page 2+** row: `n/a` — only 9 posts, no `/blog/page/2` in `dist/`.
- Verified `dist/blog/` contains no `HomeMotion` / `cv-stagger` / `header-intro` script references.
- Gate quartet re-run → **0**.
- **7.4** still required before cutover (NFR-P1/P2 measurement); sign-off does not waive JS budget.

### File List

- `docs/migration-parity-checklist.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/7-3-checklist-sign-off-before-cutover.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created; PO sign-off workflow; status → ready-for-dev. | create-story |
| 2026-05-22 | Checklist sign-off batch; gates green; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | CR approved; gates re-verified; status → done. | code-review |

---

### Review Findings (summary)

✅ **Approved** — governance story; checklist sign-off complete; **7.4** still required before cutover.

| AC | Verdict |
|----|---------|
| AC1 | All mandatory route rows signed (`8.3 DS + 7.3 JP 2026-05-22`); pagination row `n/a` (single page, 9 posts) |
| AC2 | Motion **same** on home/CV/projects; blog/404 **n/a**; Home defer documented |
| AC3 | Visual **same**; blog CR items reflected in Notes |
| AC4 | **Islands approved = N** in intro + route rows |
| AC5 | LCP/JS ex. **Y** rows note **7.4** pending |
| AC6 | Hero bg swap defer in Home **Notes** |
| AC7 | Quartet re-run at CR → **0** |
| AC8 | Revision history row added |

**defer (informational):** §7.1 per-component inventory table still says `island` for CV modules; route-level governance is correct.
