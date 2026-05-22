# Development guide

## Production app vs legacy Gatsby (reference)

**Day-to-day work:** only **`site/`** (Astro 6). This is the **production application** (PRD v1.2, Story 9.1).

| App | Status | Location | Node.js | Install & dev |
|-----|--------|----------|---------|----------------|
| **Astro 6** | **Production** | `site/` | **≥ 22.12** (`site/.nvmrc`; CI: [deploy-astro-pages.yml](../.github/workflows/deploy-astro-pages.yml)) | `cd site && nvm use && npm install && npm run dev` |
| **Gatsby 2** | **Archived** (Story 9.2) | `legacy/gatsby/` | **Older LTS only** (e.g. **14.x or 16.x**) — **`node-sass` 4.x** fails on Node 22 | Optional: `cd legacy/gatsby && nvm use 16 && npm install && npm run develop` |

You do **not** need the archived Gatsby app for production maintenance. **Do not** run `npm install` under `legacy/gatsby/` on **Node 22**.

### Live reload (FR16)

- **Astro:** `npm run dev` under `site/` — Vite-powered dev server; edits to `site/src/**` reload without a manual restart (default Astro behavior).
- **Gatsby:** `npm run develop` — hot reload for typical source and Markdown where the starter supports it.

There is **no** root `.nvmrc` (only `site/.nvmrc` for Astro) to avoid implying one Node version for the whole monorepo.

---

## Prerequisites

- **Node.js** — **`site/`** needs **≥ 22.12** (see [Production app vs legacy Gatsby](#production-app-vs-legacy-gatsby-reference)). Legacy root Gatsby needs Node 14/16 only if you still run it.  
- **npm** — **`site/package-lock.json`** is tracked for Astro reproducible installs / CI. There is **no** root `package.json`.

## Production site (`site/`)

The **Astro 6** app under **`site/`** is production. Commands and **Node ≥ 22.12** are in [site/README.md](../site/README.md). **Deploy:** [deployment-guide.md](./deployment-guide.md). **CI:** push to `main` or `master` runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml).

## Archived Gatsby (`legacy/gatsby/`) — reference only

See [legacy/gatsby/README.md](../legacy/gatsby/README.md). Historical install/commands (Node 14/16):

```bash
cd legacy/gatsby
nvm use 16
npm install
npm run develop   # port 8000
```

| Command | Purpose |
|---------|---------|
| `npm run develop` | Clears `.cache`, runs `gatsby develop` |
| `npm run build` | Build to `public/` (gitignored) |
| `npm run deploy` | **Do not use** — legacy `gh-pages`; production uses Astro CI |

## Content authoring (production)

Edit markdown only under:

- **`site/src/content/posts/`** — blog posts (schema in `site/src/content.config.ts`)
- **`site/src/content/projects/`** — case studies

Run `cd site && npm run dev` to preview. **Do not** add new content under **`legacy/gatsby/src/content/`** (archive reference only).

Legacy content paths under **`legacy/gatsby/src/content/`** remain for historical diff; GraphQL applied only to the archived app (`legacy/gatsby/gatsby-node.js`).

## Testing

Production gates: `cd site && npm run check && npm run build && npm run test:schema && npm run test:links`. The archived Gatsby app has no automated test suite.
