# Architecture: juanmaperez-portfolio

## Executive summary

The site is a **Gatsby 2 static site**: Markdown drives **blog posts** and **project case studies**; **GraphQL** runs only at **build time** to query `allMarkdownRemark` and image nodes. **React** renders pages and templates; **styled-components** and **SCSS** handle styling. **Programmatic routing** in `gatsby-node.js` creates blog pagination, post pages, project pages, and category indexes.

## Technology stack

See [project-overview.md](./project-overview.md) for the summary table. Primary moving parts: **Gatsby**, **React 16**, **gatsby-transformer-remark**, **gatsby-plugin-sharp** / **gatsby-image**, **styled-components**.

## Architecture pattern

| Pattern | How it appears here |
|---------|---------------------|
| SSG | HTML generated at `gatsby build` |
| Component-based UI | `src/components`, `src/templates`, `src/pages` |
| Build-time data | GraphQL in `gatsby-node.js` and page/template exports |
| Plugin pipeline | remark (prism, images), filesystem sources, manifest, sitemap, GA |

## Data architecture

- **Source of truth:** Markdown files under `src/content/posts/**` and `src/content/projects/**`.  
- **Discrimination:** `frontmatter.type` is `post` vs `projects` (used in `gatsby-node.js` filters).  
- **Detail:** [data-models.md](./data-models.md).

## Routing

1. **Declarative:** `src/pages/index.js`, `cv.js`, `404.js` → `/`, `/cv/`, `/404/`.  
2. **Programmatic:** `createPage` for blog list, posts, works, categories (paths from frontmatter or conventions).

## API design

There is **no application-owned HTTP API**. “API surface” is **Gatsby’s GraphQL** at build time only — see [api-contracts.md](./api-contracts.md).

## Component overview

High-level groups: **layout** (shell, menu), **home blocks**, **blog** (list, post, category), **work** template, **CV** sections, **SEO**. Full list: [component-inventory.md](./component-inventory.md).

## Build and bundling notes

`gatsby-node.js` **onCreateWebpackConfig**:

- **Null-loader** for ScrollMagic during `build-html` (avoids `window` during SSR).  
- **Aliases** for GSAP minified paths and ScrollMagic plugins (animation integration).

## Deployment architecture

Static files emitted to **`public/`**, published with **`gh-pages`** to the configured GitHub Pages branch. See [deployment-guide.md](./deployment-guide.md).

## Testing strategy

`package.json` `test` script is a placeholder (`echo`). No automated test suite in tree.

## Risks relevant to migration (e.g. Astro)

1. **GraphQL →** must become imports / content collections / file routing.  
2. **gatsby-image fluid** → new image pipeline.  
3. **ScrollMagic + GSAP** → verify browser-only execution in new framework.  
4. **styled-components** → map to scoped styles or islands.  
5. **Universal Analytics** → replace with GA4 or alternative before UA sunset (already a product concern).  
