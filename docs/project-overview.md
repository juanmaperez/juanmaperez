# Project overview: juanmaperez-portfolio

## Purpose

Personal **portfolio and blog** for Juanma Perez: landing experience, **CV** page, **case-study style project pages**, and **technical blog posts**. Marketing copy describes fast websites and apps; live site metadata targets `https://juanmaperez.me` (`gatsby-config.js`).

## Repository type

**Monolith** — single Gatsby application at repository root.

## Technology summary

| Layer | Technology | Notes |
|--------|------------|--------|
| Framework | Gatsby 2.x | Build-time GraphQL, static generation |
| UI | React 16.8 | Class / function components, hooks where used |
| Styling | styled-components, SCSS | Global `main.css`, mixins |
| Content | Markdown + remark | Posts under `src/content/posts/`, projects under `src/content/projects/` |
| Images | gatsby-image, sharp | Fluid transforms in GraphQL |
| SEO | react-helmet via `components/seo.js` | `useStaticQuery` for site metadata |
| Analytics | gatsby-plugin-google-analytics | UA ID in config (legacy UA) |

## Architecture classification

**Static site generator (SSG)** with **client-side enhancements** (animations: GSAP, ScrollMagic; webpack null-loader for SSR of ScrollMagic).

## Documentation map

| Document | Role |
|----------|------|
| [index.md](./index.md) | Master index for AI / humans |
| [architecture.md](./architecture.md) | Structure, routing, data flow |
| [source-tree-analysis.md](./source-tree-analysis.md) | Directory purposes |
| [component-inventory.md](./component-inventory.md) | React components |
| [development-guide.md](./development-guide.md) | Local dev and scripts |
| [deployment-guide.md](./deployment-guide.md) | GitHub Pages via gh-pages |
| [api-contracts.md](./api-contracts.md) | Build-time GraphQL usage (no REST API) |
| [data-models.md](./data-models.md) | Markdown frontmatter schemas |

## Scan metadata

- **Workflow:** initial_scan  
- **Depth:** quick (structure, configs, patterns; not every source line)  
- **Date:** 2026-04-20  
