# Development guide

## Two apps, two Node lines

This repo hosts **two** static-site apps until Astro cutover:

| App | Location | Node.js | Install & dev |
|-----|----------|---------|----------------|
| **Astro 6** | `site/` | **≥ 22.12** (see `site/.nvmrc` and `site/package.json` → `engines`; CI uses [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) with `node-version-file: site/.nvmrc`) | `cd site && nvm use && npm install && npm run dev` |
| **Gatsby 2** (legacy) | Repository root | **Older LTS only** (e.g. **14.x or 16.x**). **`node-sass` 4.x** and Gatsby 2 **do not** support Node 22. | At repo root: `nvm install 16 && nvm use 16` (example), then `npm install && npm run develop` |

**Do not** run root `npm install` on **Node 22** and expect `node-sass` to compile. Switch Node with **nvm** (or Volta) when moving between **`site/`** and the **Gatsby** tree.

### Live reload (FR16)

- **Astro:** `npm run dev` under `site/` — Vite-powered dev server; edits to `site/src/**` reload without a manual restart (default Astro behavior).
- **Gatsby:** `npm run develop` — hot reload for typical source and Markdown where the starter supports it.

There is **no** root `.nvmrc` (only `site/.nvmrc` for Astro) to avoid implying one Node version for the whole monorepo.

---

## Prerequisites

- **Node.js** — See **[Two apps, two Node lines](#two-apps-two-node-lines)** above. Root **Gatsby** stack needs a **legacy** Node line compatible with **Gatsby 2** and **node-sass 4**; **`site/`** Astro needs **≥ 22.12**.  
- **npm** — Root may use `package-lock.json` (ignored at repo root in `.gitignore`); **`site/package-lock.json`** is tracked for Astro reproducible installs / CI.

## Install (Gatsby — repository root)

```bash
# Use Node 14 or 16 (example) before installing
npm install
```

If native `node-sass` fails, use an **older Node** or treat as a known legacy issue; the migration path is the **`site/`** Astro app.

## Common commands (Gatsby — repository root)

| Command | Purpose |
|---------|---------|
| `npm run develop` | Clears `.cache`, runs `gatsby develop` (default port 8000) |
| `npm run build` | Production build to `public/` |
| `npm run serve` | Serves built site locally |
| `npm run format` | Prettier on `src/**/*.{js,jsx}` |
| `npm run deploy` | `gatsby build` then `gh-pages -d public` |

## Environment

No `.env` files are required for a basic clone; **Google Analytics** tracking ID is **hardcoded** in `gatsby-config.js` (consider env-based config for forks).

## Content authoring

- **Blog posts:** add folder under `src/content/posts/` with `*.md` and required frontmatter (see [data-models.md](./data-models.md)).  
- **Projects:** add folder under `src/content/projects/` with markdown and assets beside files.  
- After content changes, **rebuild** or rely on dev hot reload for markdown.

## GraphQL exploration

Gatsby exposes **GraphiQL** in development (see starter README) for experimenting with queries used by pages and `gatsby-node.js`.

## Code style

- **Prettier:** `.prettierrc`  
- No ESLint config in tree from quick scan  

## Astro migration (`site/`)

The **Astro 6** static app lives under **`site/`** (separate `package.json` from Gatsby). Commands and **Node ≥ 22.12** are summarized in [site/README.md](../site/README.md) and in **Two apps, two Node lines** above. **URLs and hosting:** [deployment-guide.md](./deployment-guide.md). **CI:** push to `main` or `master` runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml).

## Testing

No unit or E2E tests configured; `npm test` is a stub.
