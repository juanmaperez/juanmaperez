# Story 1.2: Configure site URL and base for GitHub Pages

**Story ID:** 1.2  
**Story key:** `1-2-configure-site-url-and-base-for-github-pages`  
**Status:** ready-for-dev  

---

## Story

As a **maintainer**,  
I want `**site` and `base`** set correctly in `**site/astro.config.mjs**`,  
So that **asset URLs, canonical links, and future sitemap/OG integrations** resolve correctly for the **real** GitHub Pages URL pattern (custom domain vs `github.io` project path).

---

## Acceptance criteria (from epics)

1. **Given** the agreed **production origin** (canonical URL) and whether Pages is served from **site root** or a **repository subpath**
  **When** `site/astro.config.mjs` is updated per architecture and [Astro GitHub Pages deploy](https://docs.astro.build/en/guides/deploy/github/) guidance  
   **Then** `defineConfig` includes a correct `**site`** (absolute `https://…` with no trailing path)  
   **And** `**base`** matches hosting: `**'/'**` (or `''` per Astro version convention) for apex / user-site / custom-domain root, **or** `'/repo-name/'` for `https://<user>.github.io/<repo>/` project sites (leading and trailing slashes as Astro expects).
2. **After `npm run build`** from `site/`, built HTML (or injected meta helpers that rely on `site`) must be consistent with the chosen `**site**` so later **OG/sitemap** work can use `Astro.site` / `import.meta.env.SITE` without rework.
3. **Documentation (NFR-R2):** behavior is written in `**docs/`** (update [deployment-guide.md](../../docs/deployment-guide.md) and/or [development-guide.md](../../docs/development-guide.md)) **and** summarized in `**site/README.md`** — explicitly state **user site vs project site** assumption and how to change `base`.

---

## Tasks / subtasks

- Custom domain / apex (legacy `siteUrl`: `https://juanmaperez.dev` in [gatsby-config.js](../../gatsby-config.js)) → typically `**base: '/'`** and `**site: 'https://juanmaperez.dev'**`.
- **Implement** — Edit `site/astro.config.mjs`: add `site`, set `base` (keep existing `output: 'static'`).
- **Verify** — `cd site && nvm use && npm run build`; open `dist/index.html` and confirm asset `href`/`src` prefixes match `base` (no broken root-relative paths when `base !== '/'`).
- **Docs** — Deployment guide: Astro `site`/`base` + link to official Astro Pages guide; development guide: one-line pointer if useful; `site/README`: “Production URL / base” subsection.

---

## Dev notes

### Architecture compliance

- **ADR-002** — GitHub Pages + Actions; `**site` and `base`** must be correct before relying on deploy [architecture.md §3 ADR-002](../planning-artifacts/architecture.md).
- **§10 SEO** — `site` must equal production URL for future `@astrojs/sitemap` and OG absolute URLs (`https://juanmaperez.dev` **or** as configured) [architecture.md §10](../planning-artifacts/architecture.md).
- **§11 CI/CD** — CI story **1.3** will assume this config exists; do not implement the workflow in **1.2**.

### PRD

- Deploy assumption: `**site` / `base`** correctly set for hosting URL [prd.md — Technical assumptions](../planning-artifacts/prd.md).

### Previous story (1.1) intelligence

- Astro app **only** under `**site/`**; do not touch root Gatsby config for this change.
- **Node ≥ 22.12** for Astro 6 — unchanged.
- [Story 1.1 as-built](./1-1-initialize-astro-static-project.md) — `astro.config.mjs` currently has `**output: 'static'`** only; **1.2 extends the same file**.

### Technical requirements (Astro 6)

- `**site`:** full canonical origin, e.g. `https://juanmaperez.dev`. Used for `import.meta.env.SITE`, sitemap, absolute canonicals.
- `**base`:** path prefix for all asset and route URLs when not served from domain root. Default static hosting at apex: `**'/'`** (see [Astro `base` docs](https://docs.astro.build/en/reference/configuration-reference/#base)).
- If you use **trailing slash** strategy later, coordinate with `**trailingSlash`** in the same config file (optional in **1.2** unless epic expanded).

### File structure


| File                        | Action                                                               |
| --------------------------- | -------------------------------------------------------------------- |
| `site/astro.config.mjs`     | Add `site`, `base`                                                   |
| `site/README.md`            | Document chosen URLs                                                 |
| `docs/deployment-guide.md`  | Astro + Pages URL section (alongside legacy Gatsby `gh-pages` notes) |
| `docs/development-guide.md` | Optional cross-link                                                  |


### Guardrails

1. **Do not** change legacy `**gatsby-config.js` `siteUrl`** in this story unless explicitly bundling “single source of truth” (out of scope); **mirror** the same canonical URL in Astro `site` for parity.
2. `**repository.url`** in root `package.json` still points at Gatsby starter — **do not** infer GitHub repo name from it; use the **actual** GitHub remote / Pages settings Juanma uses, and document that in `docs/deployment-guide.md`.
3. **Preview:** `astro preview` respects `base`; use it to smoke-test non-root `base` before CI.

### Testing

- **Build smoke:** `npm run build` in `site/`.
- **Optional:** `npm run preview` and load `/` (and with project `base`, ensure CSS/JS load).

### References

- [Epics — Story 1.2](../planning-artifacts/epics.md)
- [Architecture — ADR-002, §10, §11](../planning-artifacts/architecture.md)
- [PRD — assumptions](../planning-artifacts/prd.md)
- [Deployment guide (legacy + extend)](../../docs/deployment-guide.md)
- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

---

## Dev agent record

### Agent model used

*(Fill on implementation.)*

### Debug log references

### Completion notes list

### File list

*(Fill on implementation.)*