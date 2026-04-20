# Project overview: juanmaperez-portfolio

## Purpose

Personal **portfolio and blog** for Juanma Perez: landing experience, **CV** page, **case-study style project pages**, and **technical blog posts**. Marketing copy describes fast websites and apps; live site metadata targets `https://juanmaperez.dev` (`gatsby-config.js`).

## Repository type

**Monolith — dual static generators (transition):** legacy **Gatsby 2** at the repository root and the **Astro 6** migration target under **`site/`**, until cutover replaces Gatsby for production.

## Technology summary

| Layer | Technology | Notes |
|--------|------------|--------|
| Framework (legacy) | Gatsby 2.x | Build-time GraphQL, static generation; root `package.json` |
| Framework (migration) | Astro 6.x | Static output, `site/package.json`; Node **≥ 22.12** (`site/.nvmrc`) |
| UI | React 16.8 | Class / function components, hooks where used |
| Styling | styled-components, SCSS | Global `main.css`, mixins |
| Content | Markdown + remark | Posts under `src/content/posts/`, projects under `src/content/projects/` |
| Images | gatsby-image, sharp | Fluid transforms in GraphQL |
| SEO | react-helmet via `components/seo.js` | `useStaticQuery` for site metadata |
| Analytics | gatsby-plugin-google-analytics | UA ID in config (legacy UA) |

## Architecture classification

**Static site generator (SSG)** with **client-side enhancements** on the Gatsby site (animations: GSAP, ScrollMagic; webpack null-loader for SSR of ScrollMagic). The **`site/`** Astro app is static-first with optional islands later (see planning architecture).

## Documentation map

| Document | Role |
|----------|------|
| [index.md](./index.md) | Master index for AI / humans |
| [architecture.md](./architecture.md) | Structure, routing, data flow |
| [source-tree-analysis.md](./source-tree-analysis.md) | Directory purposes |
| [component-inventory.md](./component-inventory.md) | React components |
| [development-guide.md](./development-guide.md) | Local dev and scripts |
| [deployment-guide.md](./deployment-guide.md) | Gatsby `gh-pages` + Astro GitHub Actions |
| [api-contracts.md](./api-contracts.md) | Build-time GraphQL usage (no REST API) |
| [data-models.md](./data-models.md) | Markdown frontmatter schemas |

## Scan metadata

- **Workflow:** initial_scan  
- **Depth:** quick (structure, configs, patterns; not every source line)  
- **Date:** 2026-04-20  
