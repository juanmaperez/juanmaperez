# Data models (content)

There is **no SQL/ORM database**. Persisted data is **Markdown files** processed by **`gatsby-transformer-remark`** into `MarkdownRemark` nodes; **Gatsby Image** nodes hang off frontmatter image paths.

## Post (`frontmatter.type: post`)

Observed fields (from sample `src/content/posts/01-how-javascript-engine-works/how-javascript-engine-works.md`):

| Field | Example | Notes |
|-------|---------|--------|
| `path` | `/blog/how-javascript-engine-works` | Canonical URL path; used for `createPage` |
| `date` | ISO string | Sorted in `gatsby-node.js` |
| `title` | string | |
| `type` | `post` | Filter key in GraphQL |
| `icon` | relative path to PNG | Processed through `childImageSharp` in queries |
| `category` | e.g. `javascript` | Drives category index pages |
| `tags` | string array | |
| `excerpt` | string | Teasers |

Optional / query-driven: **`thumbnail`** with `childImageSharp.fluid` appears in list queries in `gatsby-node.js` (ensure each post that needs list thumbnails provides compatible frontmatter).

## Project (`frontmatter.type: projects`)

Observed fields (from `src/content/projects/umaicha/umaicha.md`):

| Field | Example | Notes |
|-------|---------|--------|
| `path` | `/projects/umaicha` | |
| `date` | ISO string | |
| `title` | string | |
| `type` | `projects` | Filter key |
| `category` | e.g. `projects` | |
| `thumbnail` | relative image | Case study hero |
| `images` | array of `{ title, image }` | Gallery (YAML-style in frontmatter) |
| `excerpt` | string | |

## Body

Markdown body becomes `html` in GraphQL for full-article rendering in templates.

## Validation

**Legacy (Gatsby):** conventions are implicit — no JSON Schema in repo.

**Astro (`site/`):** explicit Zod schemas in [`site/src/content.config.ts`](../site/src/content.config.ts) for `posts` and `projects` collections (Story 2.1, ADR-003). Invalid frontmatter fails `cd site && npm run check` / `npm run build`. Field tables above remain the source of truth for migration (Stories 2.2–2.3).
