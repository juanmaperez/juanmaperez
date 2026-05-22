# Source tree analysis

**Last updated:** 2026-05-22 (Story **9.4** — production root = `site/`).

Annotated tree for the **juanmaperez** repository (excluding `node_modules`, `.git`, large binaries).

```
juanmaperez/                              # Repository root
├── site/                                 # PRODUCTION — Astro 6 static app
│   ├── astro.config.mjs
│   ├── package.json
│   ├── .nvmrc                            # Node ≥ 22.12
│   ├── public/                           # Static assets (copied to dist root)
│   │   ├── fonts/mfred/                  # MFred (FR22)
│   │   ├── icons/                        # Blog teaser icons (javascript, react, recipes)
│   │   └── images/                       # Home, 404, etc.
│   └── src/
│       ├── pages/                        # File-based routes (index, cv, blog, projects, 404)
│       ├── layouts/                      # BaseLayout, BlogLayout, ProjectLayout
│       ├── components/                   # nav, home, blog, cv, motion, seo, analytics
│       ├── content/
│       │   ├── posts/                    # 9 blog posts (content collections)
│       │   └── projects/                 # 5 case studies
│       ├── styles/                       # global.css, motion.css
│       ├── scripts/motion/               # GSAP 3 + ScrollTrigger (Epic 7)
│       ├── assets/icons/                 # Frontmatter icon paths (mirrors public/icons subset)
│       └── content.config.ts             # Zod schemas (FR17)
├── legacy/gatsby/                        # ARCHIVE — Gatsby 2 (reference only, Story 9.2)
│   ├── gatsby-config.js, gatsby-node.js
│   ├── src/                              # Historical pages, components, content
│   └── package.json                      # Node 14/16; not production
├── docs/                                 # Brownfield documentation (this folder)
├── _bmad-output/                         # Planning & implementation artifacts
├── .github/workflows/
│   └── deploy-astro-pages.yml            # Sole Pages deploy (FR18)
├── _baseline/                            # Optional Lighthouse captures (advisory)
├── scripts/                              # verify-production-smoke, capture-legacy-baselines
└── README.md                             # Entry → site/ + docs/index.md
```

## Production application (`site/`)

| Area | Path | Role |
|------|------|------|
| Routes | `site/src/pages/` | `/`, `/cv/`, `/blog/`, `/blog/page/[page]`, `/blog/category/[category]`, `/blog/[...slug]`, `/projects/[...slug]`, `/404` |
| Content | `site/src/content/posts/`, `projects/` | Markdown + frontmatter; build fails on schema violation |
| Global shell | `site/src/layouts/BaseLayout.astro` | SEO, analytics, fonts, header/footer slots |
| Motion | `site/src/components/motion/`, `site/src/scripts/motion/` | FR19 islands (home, CV, header) |
| Deploy output | `site/dist/` | GitHub Actions artifact → Pages |

## Archived Gatsby (`legacy/gatsby/`)

Historical **Gatsby 2** tree for diff and parity inventory (§7.1 / §8.1 checklist audits). **Do not deploy.** See [legacy/gatsby/README.md](../legacy/gatsby/README.md).

| Entry | Role |
|--------|------|
| `legacy/gatsby/gatsby-config.js` | Plugins, siteMetadata |
| `legacy/gatsby/gatsby-node.js` | Programmatic routes, webpack GSAP/ScrollMagic aliases |
| `legacy/gatsby/src/pages/` | `/`, `/cv/`, `/404` |
| `legacy/gatsby/src/templates/` | Blog list, post, work, category |

## Integration points (production)

- **Build-time:** Astro content collections + `astro check` (no GraphQL).
- **CI:** `deploy-astro-pages.yml` — `check`, `build`, `test:links` in `site/`.
- **Third party:** GA4 (optional env), external links in markdown.

## Migration ADRs

For Astro migration decisions (ADRs, checklist, FR mapping), see [_bmad-output/planning-artifacts/architecture.md](../_bmad-output/planning-artifacts/architecture.md).
