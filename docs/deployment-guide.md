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

CI deploy for Astro is tracked separately (Epic 1 — GitHub Actions); legacy Gatsby may still use `npm run deploy` until cutover.

## CI/CD

No `.github/workflows/` in repository from quick scan — deploy is **manual** from a developer machine unless CI is added later.
