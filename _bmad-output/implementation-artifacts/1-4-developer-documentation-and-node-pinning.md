# Story 1.4: Developer documentation and Node pinning

**Story ID:** 1.4  
**Story key:** `1-4-developer-documentation-and-node-pinning`  
**Status:** done  

---

## Story

As a **maintainer**,  
I want **`.nvmrc` or `engines` and clear dev commands** documented for **both** the legacy Gatsby app and the Astro app,  
So that **FR16** (local dev with content reload where applicable) and **NFR-R1 / NFR-R2** (supported Node + discoverable entry commands) are satisfied without **`node-sass`-class surprises** on the wrong runtime.

---

## Acceptance criteria (from epics)

1. **Given** the **Node versions** that match each stack (**Astro 6** needs **≥ 22.12**; **Gatsby 2 / node-sass 4** needs an **older, documented** Node line)  
   **When** a developer reads **`docs/`** (and minimal **repo** pointers, e.g. `README` or [docs/index.md](../../docs/index.md))  
   **Then** they can install and run **`npm run dev`** for **`site/`** (Astro) and **`npm run develop`** for the **root** (Gatsby) **without** mixing incompatible Node versions unknowingly.

2. **`npm install`** and **`npm run dev`** succeed for **Astro** on the pinned line (no native toolchain failures for the Astro dependency tree).

3. **Content live reload:** document that **Astro** `dev` reflects edits per Astro defaults (**FR16**); **Gatsby** behavior stays as today (hot reload where supported).

---

## Tasks / subtasks

- [x] **Inventory** — Documented: **`site/.nvmrc`** `22.12.0`, **`site/package.json` `engines.node` `>=22.12.0`**, CI **`node-version-file: site/.nvmrc`**. **No root `.nvmrc`** (only `site/.nvmrc`) — stated in [development-guide.md](../../docs/development-guide.md).
- [x] **Dual-stack doc** — [development-guide.md](../../docs/development-guide.md) **Two apps, two Node lines** + **Live reload (FR16)** + clarified Gatsby **Install** / **Common commands** labels.
- [x] **Project truth** — [project-overview.md](../../docs/project-overview.md) repository type + technology table rows for Astro.
- [x] **Discoverability** — [docs/index.md](../../docs/index.md) quick reference + getting started link to anchor; [site/README.md](../../site/README.md) FR16 / engines / CI sync note.
- [x] **Root README** — Maintainer blockquote at top of [README.md](../../README.md) pointing to `docs/index.md`.
- [x] **Verify** — Astro `npm run dev` smoke on **Node 22.12**: server ready on port 4321 within ~1s (log captured). Gatsby on Node 22 **not** claimed; docs require **14/16** for root.

---

## Dev notes

### Architecture compliance

- **NFR-R1** — Dependencies installable on **documented Node** for core workflow [prd.md — NFR-R1](../planning-artifacts/prd.md).
- **NFR-R2** — **Entry commands** and hosting assumptions in **`docs/`** / README [prd.md — NFR-R2](../planning-artifacts/prd.md).
- **FR16** — Maintainer can run **local dev** with **content-appropriate reload** [prd.md — FR16](../planning-artifacts/prd.md).

### PRD

- **FR16**, **NFR-R1**, **NFR-R2** as above.

### Previous story intelligence

- **1.3** — CI uses **`site/.nvmrc`**; local docs **must** match CI [1-3 story](./1-3-github-action-build-and-deploy-to-pages.md).

### Technical requirements

| Topic | Guidance |
|-------|------------|
| **Single source for Astro Node** | **`site/.nvmrc`** + **`site/package.json` `engines`** in sync; CI reads `.nvmrc`. |
| **Gatsby Node** | Document **older Node** (14/16 example) for root; do not claim Gatsby on Node 22. |

### Guardrails

1. **Do not** remove **`site/.nvmrc`** or loosen **`engines`** below Astro 6’s requirement without architecture sign-off.
2. **Do not** replace the entire root **`README.md`** with Astro-only content until cutover; keep **minimal** pointer pattern.
3. **Epic 2+** — content under `site/src/content/` when added; **1.4** documents reload for `site/src/**`.

### Testing

- Manual: Astro `npm run dev` smoke on Node 22.12+ (passed).

### References

- [Epics — Story 1.4](../planning-artifacts/epics.md)
- [Development guide](../../docs/development-guide.md)
- [Project overview](../../docs/project-overview.md)

---

## Change log

- **2026-04-20** — Story 1.4: dual-stack Node + commands across `development-guide`, `project-overview`, `docs/index`, `site/README`, root `README` blurb; Astro dev smoke.

---

## Dev agent record

### Agent model used

Composer (Cursor agent)

### Debug log references

### Completion notes list

- Added **Two apps, two Node lines** table and explicit **no root `.nvmrc`** rationale.
- Gatsby commands section labeled **(repository root)**; Astro section cross-links.
- Root **README** gets a short maintainer pointer without removing Gatsby starter body.

### File list

- `docs/development-guide.md`
- `docs/project-overview.md`
- `docs/index.md`
- `site/README.md`
- `README.md`
- `_bmad-output/implementation-artifacts/1-4-developer-documentation-and-node-pinning.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
