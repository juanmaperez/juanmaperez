# Story 1.3: GitHub Action — build and deploy to Pages

**Story ID:** 1.3  
**Story key:** `1-3-github-action-build-and-deploy-to-pages`  
**Status:** done  

---

## Story

As a **maintainer**,  
I want **CI to build and publish** the Astro static site on **push to the default branch**,  
So that **FR18** is satisfied without manual FTP and every merge is **deployable** (architecture ADR-002, §11).

---

## Acceptance criteria (from epics)

1. **Given** a push to the **default branch** (`main` or `master`, match the repo’s actual default)  
   **When** the workflow runs  
   **Then** **checkout → Node setup (pinned)** → **`npm ci`** → **`npm run build`** for the **`site/`** app complete successfully  
   **And** the **GitHub Pages** deploy path publishes the built artifact (`site/dist/`).

2. **Node version** is pinned consistently with **Story 1.1 / 1.4** intent: use **`site/.nvmrc`** (or explicit `node-version` matching `site/package.json` `engines`) so CI matches local Astro 6.

3. **Documentation (NFR-R2):** the workflow file path and **one-time GitHub repo settings** (Pages source, branch/environment) are described in **`docs/deployment-guide.md`** and optionally **`site/README.md`**.

---

## Tasks / subtasks

- [x] **Workflow file** — Added [`.github/workflows/deploy-astro-pages.yml`](../../.github/workflows/deploy-astro-pages.yml): `push` to `main` and `master`, `workflow_dispatch`, `concurrency` group `pages`, `npm ci` + `npm run build` with `working-directory: site`, artifact `site/dist`.
- [x] **Deploy mechanism** — `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`, `environment: github-pages`, `permissions` `contents: read`, `pages: write`, `id-token: write`.
- [x] **Permissions** — Set as required for OIDC Pages deploy (no repo secrets).
- [x] **Verify** — Local **`npm ci`** + **`npm run build`** in `site/` succeeded (matches CI).
- [x] **Docs** — [deployment-guide.md](../../docs/deployment-guide.md) **Astro CI GitHub Actions**; [site/README.md](../../site/README.md) CI subsection; [development-guide.md](../../docs/development-guide.md) pointer.
- [x] **Future-proof for Story 2.4** — Workflow top comment + logical `build` job steps for adding `astro check` after `npm ci`.

---

## Dev notes

### Architecture compliance

- **ADR-002** — GitHub Pages + GitHub Actions [architecture.md §3 ADR-002](../planning-artifacts/architecture.md).
- **§11 CI/CD** — Trigger, job order, concurrency, no secrets in repo [architecture.md §11](../planning-artifacts/architecture.md).
- **`site` / `base`** must already be correct (**Story 1.2**); otherwise asset URLs on the deployed site may be wrong.

### PRD

- **FR18** — Documented CI pipeline without manual FTP [prd.md](../planning-artifacts/prd.md).

### Previous story intelligence

- **1.1** — Astro app lives only under **`site/`**; build output **`site/dist/`** [1-1 story](./1-1-initialize-astro-static-project.md).
- **1.2** — `site/astro.config.mjs` has **`site: 'https://juanmaperez.dev'`** and **`base: '/'`** [1-2 story](./1-2-configure-site-url-and-base-for-github-pages.md).

### Technical requirements

| Topic | Guidance |
|-------|------------|
| **Working directory** | All `npm` steps in **`site/`**; do not run root `npm install`. |
| **Lockfile** | **`site/package-lock.json`** is re-included from root `.gitignore` via **`!site/package-lock.json`** so **`npm ci`** works in CI and the lockfile can be committed. |
| **Node** | **`actions/setup-node`** with **`node-version-file: site/.nvmrc`**. |
| **Pages setup** | Repo **Settings → Pages → Build and deployment**: source **GitHub Actions**. |

### Guardrails

1. **Do not** remove or break legacy **`npm run deploy`** / **`gh-pages`** until cutover is explicit; CI is **additive** for **`site/`**.
2. **Do not** add **`secrets.GITHUB_TOKEN`** to env manually—it is injected; avoid other secrets unless PRD requires (**NFR-S1**).
3. **Epic 2 Story 2.4** will add a failing gate on invalid content—structure workflow so that step can plug in after `npm ci`.

### Testing

- Local **`npm ci`** + **`npm run build`** in `site/` (passed).
- GitHub Actions green run after merge (verify on remote).

### References

- [Epics — Story 1.3](../planning-artifacts/epics.md)
- [Architecture — ADR-002, §11](../planning-artifacts/architecture.md)
- [Astro: GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

---

## Change log

- **2026-04-20** — Story 1.3: `deploy-astro-pages.yml`, `.gitignore` exception for `site/package-lock.json`, deployment + dev + site README updates.

---

## Dev agent record

### Agent model used

Composer (Cursor agent)

### Debug log references

### Completion notes list

- Chose **explicit** `checkout` + `setup-node` + `npm ci` + `npm run build` + `upload-pages-artifact` instead of `withastro/action` alone so **`npm ci`** and **`working-directory: site`** match the story literally.
- `actions/checkout@v4`, `actions/setup-node@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4` (widely documented OIDC Pages stack).
- Root **`package-lock.json`** remains ignored; only **`site/package-lock.json`** is tracked.

### File list

- `.github/workflows/deploy-astro-pages.yml`
- `.gitignore`
- `docs/deployment-guide.md`
- `docs/development-guide.md`
- `site/README.md`
- `_bmad-output/implementation-artifacts/1-3-github-action-build-and-deploy-to-pages.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
