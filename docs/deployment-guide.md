# Deployment guide

## Target

**GitHub Pages** via the **`gh-pages`** npm package.

## Evidence

- `package.json` scripts: `"deploy": "gatsby build && gh-pages -d public"`  
- Build output directory: **`public/`** (Gatsby default)

## Steps (typical)

1. `npm run build` — generates static assets in `public/`.  
2. `npm run deploy` — pushes `public/` contents to the **`gh-pages`** branch of the configured `repository` remote (see `package.json` `repository`; may still point at Gatsby starter — **verify remote** before deploy).

## Site URL configuration

- `gatsby-config.js` → `siteMetadata.siteUrl`: `https://juanmaperez.dev`  
- **Sitemap** plugin uses site URL for absolute links.  
- If the site is served from a **path prefix**, uncomment/configure `pathPrefix` in `gatsby-config.js` (currently commented example `/photographer`).

## PWA / offline

`gatsby-plugin-offline` is **commented out** in `gatsby-config.js` — production is a **plain static** deploy unless re-enabled.

## Analytics

`gatsby-plugin-google-analytics` with tracking ID in config — ensure compliance with your privacy policy; plan **GA4** or removal if UA is deprecated.

## Astro site (`site/`) — URL and `base`

The migration target uses **Astro** with output in **`site/dist/`** (not Gatsby `public/`).

| Setting | Value | Why |
|---------|--------|-----|
| **`site`** (`site/astro.config.mjs`) | `https://juanmaperez.dev` | Same canonical origin as legacy `gatsby-config.js` → `siteMetadata.siteUrl`; required for `import.meta.env.SITE`, sitemap, OG. |
| **`base`** | `'/'` | Production is treated as **custom domain at site root** (not `github.io/<repo>/`). |

**User site vs project site (GitHub Pages):**

- **Custom domain / apex (this repo’s assumption):** `site` = your HTTPS origin, `base` = `'/'`.
- **Project site** at `https://<user>.github.io/<repo>/`: set `site` to `https://<user>.github.io` and `base` to `'/repo/'` so assets and routes resolve.

Official reference: [Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

## Astro CI GitHub Actions

**Workflow:** [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml)

| Behavior | Detail |
|----------|--------|
| **Trigger** | Push or pull request targeting **`main`** or **`master`**, plus **`workflow_dispatch`** (manual run from the Actions tab). |
| **Build** | `actions/setup-node` reads **`site/.nvmrc`**; **`npm ci`**, **`npm run check`** (FR17 schema gate), and **`npm run build`** run in **`site/`**; artifact uploaded from **`site/dist/`**. Deploy runs only on **push** or **workflow_dispatch**, not on PRs. |
| **Deploy** | **`actions/deploy-pages`** with environment **`github-pages`** (OIDC; no deploy tokens in the repo — **NFR-S1**). |
| **Concurrency** | Group **`pages`** with **`cancel-in-progress: true`** to avoid overlapping deployments. |

### One-time GitHub repository settings

1. **Settings → Pages → Build and deployment**  
   - **Source:** **GitHub Actions** (not “Deploy from a branch” / `gh-pages` unless you intentionally keep legacy Gatsby on branch deploy).  
2. First workflow run may prompt you to **approve** the **`github-pages`** environment (organization/repo policy).  
3. **Custom domain:** when you attach a hostname in GitHub Pages + DNS, keep Astro `site` in `site/astro.config.mjs` aligned with that hostname (today’s config may still point at a former domain — update when the new site is live).

Legacy **Gatsby** deploy (`npm run deploy` → **`gh-pages`** branch) remains available until cutover; it does not use this workflow.

## Performance baselines (Lighthouse)

**Legacy production baselines** (against the old live site) are **out of scope** — the previous host is offline. **NFR-P1 / NFR-P2** will be satisfied by capturing baselines from the **new** production URL when it exists; procedure and JSON field reference: [**`_baseline/README.md`**](../_baseline/README.md). Optional scripted run (requires explicit `BASELINE_*` URLs): [`scripts/capture-legacy-baselines.sh`](../scripts/capture-legacy-baselines.sh).

## CI/CD (legacy Gatsby)

Deploy is still **manual** from a developer machine via **`npm run deploy`** unless you remove it. The **Astro** pipeline above is separate.
