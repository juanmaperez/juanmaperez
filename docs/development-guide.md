# Development guide

## Production app vs legacy Gatsby (reference)

**Day-to-day work:** only **`site/`** (Astro 6). This is the **production application** (PRD v1.2, Story 9.1).

| App | Status | Location | Node.js | Install & dev |
|-----|--------|----------|---------|----------------|
| **Astro 6** | **Production** | `site/` | **≥ 22.12** (`site/.nvmrc`; CI: [deploy-astro-pages.yml](../.github/workflows/deploy-astro-pages.yml)) | `cd site && nvm use && npm install && npm run dev` |
| **Gatsby 2** | **Deprecated** (remove in Story 9.2) | Repository root | **Older LTS only** (e.g. **14.x or 16.x**) — **`node-sass` 4.x** fails on Node 22 | Optional: `nvm use 16`, then `npm install && npm run develop` at root |

You do **not** need root `npm run develop` for production maintenance. **Do not** run root `npm install` on **Node 22**. Switch Node with **nvm** only if you still open the legacy tree before archive.

### Live reload (FR16)

- **Astro:** `npm run dev` under `site/` — Vite-powered dev server; edits to `site/src/**` reload without a manual restart (default Astro behavior).
- **Gatsby:** `npm run develop` — hot reload for typical source and Markdown where the starter supports it.

There is **no** root `.nvmrc` (only `site/.nvmrc` for Astro) to avoid implying one Node version for the whole monorepo.

---

## Prerequisites

- **Node.js** — **`site/`** needs **≥ 22.12** (see [Production app vs legacy Gatsby](#production-app-vs-legacy-gatsby-reference)). Legacy root Gatsby needs Node 14/16 only if you still run it.  
- **npm** — Root may use `package-lock.json` (ignored at repo root in `.gitignore`); **`site/package-lock.json`** is tracked for Astro reproducible installs / CI.

## Install (legacy Gatsby — repository root, deprecated)

```bash
# Use Node 14 or 16 (example) before installing
npm install
```

If native `node-sass` fails, use an **older Node** or treat as a known legacy issue; the migration path is the **`site/`** Astro app.

## Common commands (legacy Gatsby — repository root, deprecated)

| Command | Purpose |
|---------|---------|
| `npm run develop` | Clears `.cache`, runs `gatsby develop` (default port 8000) |
| `npm run build` | Production build to `public/` |
| `npm run serve` | Serves built site locally |
| `npm run format` | Prettier on `src/**/*.{js,jsx}` |
| `npm run deploy` | **Deprecated** — `gatsby build` then `gh-pages -d public`; use Astro CI instead ([deployment-guide.md](./deployment-guide.md)) |

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

## Production site (`site/`)

The **Astro 6** app under **`site/`** is production. Commands and **Node ≥ 22.12** are in [site/README.md](../site/README.md). **Deploy:** [deployment-guide.md](./deployment-guide.md). **CI:** push to `main` or `master` runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml).

## Testing

No unit or E2E tests configured; `npm test` is a stub.
