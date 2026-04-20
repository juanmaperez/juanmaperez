# API contracts

## Summary

This repository **does not expose a REST or GraphQL HTTP API** at runtime. All **GraphQL** usage is **Gatsby build-time** only (`graphql` tagged templates in pages/templates and queries inside `gatsby-node.js`).

## Build-time GraphQL (contract for migrators)

| Location | Purpose |
|----------|---------|
| `gatsby-node.js` | `graphql()` queries: list posts (`type: post`), list projects (`type: projects`); drives `createPage` paths and context |
| `src/pages/index.js` | Page query for home teasers |
| `src/templates/postTemplate.js` | `PostQuery` — single post by `path` |
| `src/templates/blogListTemplate.js` | Paginated blog list query |
| `src/templates/workTemplate.js` | `WorkQuery` — single project |
| `src/templates/categoryTemplate.js` | Posts filtered by category |
| `src/layouts/layout.js`, `blogLayout.js` | `StaticQuery` for shared layout data |
| `src/components/seo.js` | `useStaticQuery` for `siteMetadata` |

## Runtime integrations

| Integration | Mechanism |
|-------------|-----------|
| Google Analytics | `gatsby-plugin-google-analytics` (injected script) |

No `fetch()` / axios API layer was identified in the quick scan; any client calls would live in individual components (not cataloged line-by-line in quick mode).

## Migration note

When moving to **Astro** (or similar), treat each exported `graphql` document as a **functional spec** for which fields the UI needs from Markdown and images — reproduce with **content collections** or ESM imports rather than porting GraphQL verbatim.
