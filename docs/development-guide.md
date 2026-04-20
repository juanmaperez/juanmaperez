# Development guide

## Prerequisites

- **Node.js** compatible with **Gatsby 2** and **node-sass 4** (legacy stack; modern Node versions often require upgrades or Volta/nvm pinning — verify locally before `npm install`).  
- **npm** (lockfile present: `package-lock.json`).

## Install

```bash
npm install
```

If native `node-sass` fails, treat as a known legacy issue; consider migration or pinned older Node per project policy.

## Common commands

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

The **Astro 6** static app lives under **`site/`** (separate `package.json` from Gatsby). It requires **Node ≥ 22.12** (`site/.nvmrc`). See [site/README.md](../site/README.md) for install and `dev` / `build` / `preview`. Production **`site`** / **`base`** for GitHub Pages are documented there and in [deployment-guide.md](./deployment-guide.md#astro-site-site--url-and-base).

## Testing

No unit or E2E tests configured; `npm test` is a stub.
