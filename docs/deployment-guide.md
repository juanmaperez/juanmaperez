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

- `gatsby-config.js` → `siteMetadata.siteUrl`: `https://juanmaperez.me`  
- **Sitemap** plugin uses site URL for absolute links.  
- If the site is served from a **path prefix**, uncomment/configure `pathPrefix` in `gatsby-config.js` (currently commented example `/photographer`).

## PWA / offline

`gatsby-plugin-offline` is **commented out** in `gatsby-config.js` — production is a **plain static** deploy unless re-enabled.

## Analytics

`gatsby-plugin-google-analytics` with tracking ID in config — ensure compliance with your privacy policy; plan **GA4** or removal if UA is deprecated.

## CI/CD

No `.github/workflows/` in repository from quick scan — deploy is **manual** from a developer machine unless CI is added later.
