# Story 1.5: Capture legacy performance baselines

**Story ID:** 1.5  
**Story key:** `1-5-capture-legacy-performance-baselines`  
**Status:** done  

---

## Outcome (scope change)

The **previous public site (`juanmaperez.dev`) is no longer live**, so **pre-migration production Lighthouse baselines** are **out of scope**. Work was **re-scoped** to:

- Document that **NFR-P1 / NFR-P2** will be satisfied by a **first baseline** on the **new** production URL when it exists.  
- Keep **`_baseline/README.md`** as the **procedure + JSON field reference**.  
- Make **`scripts/capture-legacy-baselines.sh`** require explicit **`BASELINE_BASE_URL`** and **`BASELINE_POST_URL`** (no default to a dead host).

---

## Story (original intent)

As a **maintainer**,  
I want **stored Lighthouse baselines** for home and a representative blog post,  
So that **NFR-P1** and **NFR-P2** can be enforced after migration.

---

## Acceptance criteria (epics) — mapping

| AC | Resolution |
|----|------------|
| Legacy prod URLs + Lighthouse + artifacts | **N/A** — legacy host offline; replaced by “first baseline at new prod” plan in [`_baseline/README.md`](../../_baseline/README.md). |
| Procedure for reruns | **Met** — README + architecture §13 alignment. |

---

## Tasks / subtasks (final)

- [x] **`_baseline/README.md`** — States legacy prod **out of scope**; future baseline path documented.  
- [x] **`scripts/capture-legacy-baselines.sh`** — Fails fast unless `BASELINE_BASE_URL` + `BASELINE_POST_URL` set; no dead default.  
- [x] **`_baseline/capture-attempt-2026-04-20.log`** — Updated to reflect maintainer decision.  
- [x] **`docs/deployment-guide.md`**, **`docs/index.md`** — Baseline sections aligned.  
- [x] **Sprint** — Story and **Epic 1** marked **done**.

---

## Dev agent record

### Completion notes list

- Product decision: **no legacy web baselines**; Epic 1 story 1.5 **closed** with documentation-only delivery.

### File list

- `_baseline/README.md`
- `_baseline/capture-attempt-2026-04-20.log`
- `scripts/capture-legacy-baselines.sh`
- `docs/deployment-guide.md`
- `docs/index.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/1-5-capture-legacy-performance-baselines.md`
