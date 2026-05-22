# Story 1.1: Initialize Astro static project

**Story ID:** 1.1  
**Story key:** `1-1-initialize-astro-static-project`  
**Status:** done  

**Note:** Implementation is already present under `site/`. This document is the **as-built / replay spec** for dev agents and audits. Sprint tracking keeps this row as **done**; do not regress status to `ready-for-dev` unless you intentionally reopen the story.

---

## Story

As a **maintainer**,  
I want **an Astro project** with `output: 'static'` and **TypeScript (strict)** enabled,  
So that **all following migration work targets one stack** (ADR-001) **without breaking the legacy Gatsby app** at the repository root.

---

## Acceptance criteria (from epics)

1. **Given** a clean clone focused on the new app  
   **When** dependencies install on **Node ≥ 22.12** (Astro 6 requirement)  
   **Then** `npm run build` completes with **no errors** and emits static HTML under **`site/dist/`**.

2. **`site/package.json`** exposes scripts: **`dev`**, **`build`**, **`preview`** (and optional `astro`).

3. **TypeScript:** project uses Astro’s strict TS baseline (`tsconfig.json` extends `astro/tsconfigs/strict`).

4. **Static output:** `site/astro.config.mjs` sets **`output: 'static'`** explicitly (architecture / ADR-001).

5. **Brownfield constraint:** Gatsby source, `gatsby-*.js`, and root `package.json` **remain the legacy app**; the new SSG lives only under **`site/`** with its **own** `package.json` and `node_modules`.

---

## Tasks / subtasks (verification checklist)

Use this to confirm or replay the story without drift.

- [x] **Scaffold** — `site/` created as Astro minimal template with `src/pages/index.astro`.
- [x] **Astro major** — `astro@^6.1.8` (requires Node `>=22.12.0` per package engines).
- [x] **Config** — `defineConfig({ output: 'static' })` in `astro.config.mjs`.
- [x] **Scripts** — `dev` / `build` / `preview` in `site/package.json`.
- [x] **TypeScript** — `tsconfig.json` → `astro/tsconfigs/strict`; `src/env.d.ts` generated on build.
- [x] **Docs** — `site/README.md` and `docs/development-guide.md` § Astro migration mention Node **22.12+** and `site/.nvmrc`.
- [x] **Telemetry** — optional: `npx astro telemetry disable` in `site/` (local preference).
- [ ] **Explicitly out of scope for 1.1** — `site` / `base` for GitHub Pages (**Story 1.2**); CI (**1.3**); baselines (**1.5**).

---

## Dev notes

### Architecture compliance

- **ADR-001** — Astro, static output, HTML-first direction [architecture.md §3 ADR-001](../planning-artifacts/architecture.md).
- **ADR-002** — Hosting uses GitHub Pages later; **do not** fold `site`/`base` into 1.1 unless combining stories [architecture.md §3 ADR-002](../planning-artifacts/architecture.md).
- **NFR-R1** — Supported Node for the **Astro app** is pinned in `engines` and `.nvmrc` under `site/` [prd.md — NFR-R1](../planning-artifacts/prd.md).

### File structure (do not confuse with Gatsby)

| Area | Path | Role |
|------|------|------|
| New Astro app | `site/` | Only place for `astro build` / `dist/` |
| Legacy site | repo root `src/`, `gatsby-*.js` | Unchanged by this story |
| Planning | `_bmad-output/planning-artifacts/epics.md` | Story 1.1 definition |
| Parity / URLs | `docs/migration-parity-checklist.md` | Used from Epic 7 onward |

### Commands (from `site/`)

```bash
nvm use    # picks site/.nvmrc → 22.12.0
npm install
npm run dev
npm run build
npm run preview
```

### Guardrails for future dev agents

1. **Do not** replace root `package.json` with Astro-only scripts until an agreed **cutover** epic; maintainers run **either** Gatsby **or** Astro from documented directories.
2. **Do not** add `@astrojs/react`, content collections, or MDX in this story unless the PM epic explicitly expands scope (avoid scope creep).
3. **Astro 6** cannot run on Node 18; if CI or a teammate fails install, fix **Node version**, not by silently downgrading Astro without architecture sign-off.

### Testing / quality

- **Smoke:** after `npm run build`, assert `site/dist/index.html` exists.
- No automated test harness required for 1.1 (epics none).

### References

- [Epics — Story 1.1](../planning-artifacts/epics.md) — Epic 1 block.
- [Architecture — ADR-001, §9 tree](../planning-artifacts/architecture.md).
- [PRD — FR16, NFR-R1](../planning-artifacts/prd.md).
- [Development guide — Astro migration](../../docs/development-guide.md).
- [Site README](../../site/README.md).

---

## Dev agent record

### Agent model used

_(Optional — fill when running dev-story / audits.)_

### Debug log references

### Completion notes list

- Astro **6.1.x** in `site/package.json`; **`output: 'static'`**; **`site/dist/`** on build; strict TS; brownfield **`site/`** subdirectory preserves Gatsby root.

### File list (expected touch set for 1.1)

- `site/package.json`
- `site/package-lock.json`
- `site/astro.config.mjs`
- `site/tsconfig.json`
- `site/src/pages/index.astro`
- `site/src/env.d.ts` (generated)
- `site/.gitignore`, `site/.nvmrc`
- `site/README.md`
- `docs/development-guide.md` (Astro subsection)

---

## Latest technical notes (Astro 6)

- **Node:** `astro@6` declares `engines.node: '>=22.12.0'` — align CI and local with `site/.nvmrc`.
- **Init:** `npm create astro@latest` (or pinned `create-astro@5`) is the upstream initializer; this repo was scaffolded then pinned to **Astro 6** under `site/`.
