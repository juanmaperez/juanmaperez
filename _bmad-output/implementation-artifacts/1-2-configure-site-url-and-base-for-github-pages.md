# Story 1.2: Configure site URL and base for GitHub Pages

**Story ID:** 1.2  
**Story key:** `1-2-configure-site-url-and-base-for-github-pages`  
**Status:** done  

---

## Story

As a **maintainer**,  
I want **`site` and `base`** set correctly in **`site/astro.config.mjs`**,  
So that **asset URLs, canonical links, and future sitemap/OG integrations** resolve correctly for the **real** GitHub Pages URL pattern (custom domain vs `github.io` project path).

---

## Acceptance criteria (from epics)

1. **Given** the agreed **production origin** (canonical URL) and whether Pages is served from **site root** or a **repository subpath**  
   **When** `site/astro.config.mjs` is updated per architecture and [Astro GitHub Pages deploy](https://docs.astro.build/en/guides/deploy/github/) guidance  
   **Then** `defineConfig` includes a correct **`site`** (absolute `https://…` with no trailing path)  
   **And** **`base`** matches hosting: **`'/'`** for apex / user-site / custom-domain root, **or** `'/repo-name/'` for `https://<user>.github.io/<repo>/` project sites (leading and trailing slashes as Astro expects).

2. **After `npm run build`** from `site/`, built HTML (or injected meta helpers that rely on `site`) must be consistent with the chosen **`site`** so later **OG/sitemap** work can use `Astro.site` / `import.meta.env.SITE` without rework.

3. **Documentation (NFR-R2):** behavior is written in **`docs/`** (update [deployment-guide.md](../../docs/deployment-guide.md) and/or [development-guide.md](../../docs/development-guide.md)) **and** summarized in **`site/README.md`** — explicitly state **user site vs project site** assumption and how to change `base`.

---

## Tasks / subtasks

- [x] **Decision record** — Custom domain / apex: legacy `siteUrl` in `gatsby-config.js` is `https://juanmaperez.dev` → **`site: 'https://juanmaperez.dev'`**, **`base: '/'`**.
- [x] **Implement** — Edit `site/astro.config.mjs`: add `site`, `base` (keep `output: 'static'`).
- [x] **Verify** — `cd site && nvm use && npm run build`; `dist/index.html` asset paths use root `/` (correct for `base: '/'`).
- [x] **Docs** — `docs/deployment-guide.md` (Astro `site`/`base` + Pages link), `docs/development-guide.md` (pointer), `site/README.md` (“Production URL and `base`”).

---

## Dev notes

### Architecture compliance

- **ADR-002** — GitHub Pages + Actions; **`site` and `base`** must be correct before relying on deploy [architecture.md §3 ADR-002](../planning-artifacts/architecture.md).
- **§10 SEO** — `site` must equal production URL for future `@astrojs/sitemap` and OG absolute URLs [architecture.md §10](../planning-artifacts/architecture.md).
- **§11 CI/CD** — CI story **1.3** will assume this config exists; do not implement the workflow in **1.2**.

### PRD

- Deploy assumption: **`site` / `base`** correctly set for hosting URL [prd.md — Technical assumptions](../planning-artifacts/prd.md).

### Previous story (1.1) intelligence

- Astro app **only** under **`site/`**; do not touch root Gatsby config for this change.
- **Node ≥ 22.12** for Astro 6 — unchanged.
- [Story 1.1 as-built](./1-1-initialize-astro-static-project.md) — `astro.config.mjs` extended with `site` / `base`.

### Technical requirements (Astro 6)

- **`site`:** full canonical origin, `https://juanmaperez.dev`. Used for `import.meta.env.SITE`, sitemap, absolute canonicals.
- **`base`:** `'/'` for domain root. See [Astro `base` docs](https://docs.astro.build/en/reference/configuration-reference/#base).

### File structure

| File | Action |
|------|--------|
| `site/astro.config.mjs` | Add `site`, `base` |
| `site/README.md` | Document chosen URLs |
| `docs/deployment-guide.md` | Astro + Pages URL section |
| `docs/development-guide.md` | Cross-link |

### Guardrails

1. **Do not** change legacy **`gatsby-config.js` `siteUrl`** in this story; **mirror** the same canonical URL in Astro `site`.
2. **Do not** infer GitHub repo name from root `package.json` `repository.url` (starter placeholder).
3. **Preview:** `astro preview` respects `base`; use it to smoke-test non-root `base` before CI.

### Testing

- **Build smoke:** `npm run build` in `site/` (passed).

### References

- [Epics — Story 1.2](../planning-artifacts/epics.md)
- [Architecture — ADR-002, §10, §11](../planning-artifacts/architecture.md)
- [PRD — assumptions](../planning-artifacts/prd.md)
- [Deployment guide](../../docs/deployment-guide.md)
- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

---

## Change log

- **2026-04-20** — Story 1.2: `site` / `base` in `astro.config.mjs`; deployment + site README; dev guide link.

---

## Dev agent record

### Agent model used

Composer (Cursor agent)

### Debug log references

### Completion notes list

- Set `site: 'https://juanmaperez.dev'` and `base: '/'` in `site/astro.config.mjs` with short inline comment for project-site variant.
- Documented user vs project GitHub Pages in `site/README.md`, `docs/deployment-guide.md`, and linked from `docs/development-guide.md`.
- `npm run build` in `site/` succeeds; `dist/index.html` uses root-absolute asset paths appropriate for `base: '/'`.

### File list

- `site/astro.config.mjs`
- `site/README.md`
- `docs/deployment-guide.md`
- `docs/development-guide.md`
- `_bmad-output/implementation-artifacts/1-2-configure-site-url-and-base-for-github-pages.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
