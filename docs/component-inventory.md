# UI component inventory

> **Production = `site/src/components/`** (Astro). **Legacy reference = `legacy/gatsby/src/components/`** (Gatsby 2, archived). Updated Story **9.4** (2026-05-22).

## Production (`site/src/components/`)

| Area | Path | Role |
|------|------|------|
| Nav | `nav/SiteHeader.astro`, `SiteFooter.astro` | Global chrome (FR7, FR20) |
| Home | `home/HomeHero.astro`, `HomeAbout.astro`, `HomeWorks.astro`, `HomeContact.astro` | Home sections (FR1) |
| Motion | `motion/HomeMotion.astro`, `CvMotion.astro` | FR19 client islands |
| Blog | `blog/BlogPostTeaser.astro`, `BlogPostList.astro`, `BlogIndexShell.astro`, … | FR3–FR5, FR14 |
| CV | `cv/Cv*.astro` | FR2 |
| Projects | `projects/ProjectImage.astro` | FR6, FR13 |
| SEO / analytics | `seo/PageHead.astro`, `analytics/Analytics.astro` | FR10, FR11, NFR-S2 |

Layouts: `site/src/layouts/BaseLayout.astro`, `BlogLayout.astro`, `ProjectLayout.astro`.

---

## Legacy archive (`legacy/gatsby/src/components/`) — historical scan

**Quick scan (2026-04)** — components under archived `src/components/` (purpose inferred from paths and names).

## Layout and chrome

| Component | Path | Role (inferred) |
|-----------|------|------------------|
| Layout / header / menu | `layouts/layout.js`, `components/header.js`, `menu.js`, `menuLink.js` | Site navigation and wrapper |
| SEO | `components/seo.js` | `react-helmet` + `useStaticQuery` for default meta |

## Home (`src/components/index/`)

| Component | Role (inferred) |
|-----------|------------------|
| `main-block.js` | Hero / primary home block |
| `about-block.js` | About section |
| `works-block.js` | Projects / work teaser |
| `contact-block.js` | Contact section |

## Blog

| Component | Path | Role (inferred) |
|-----------|------|------------------|
| Post list item | `components/post-item.js` | Teaser row/card for blog list |
| Templates | `templates/blogListTemplate.js`, `postTemplate.js`, `categoryTemplate.js` | Full pages (not under `components/` but primary UI for blog) |

## Projects / work

| Component | Path | Role (inferred) |
|-----------|------|------------------|
| Work item | `components/workItem.js` | Teaser for project list |
| Template | `templates/workTemplate.js` | Case study page |

## CV

| Component | Path | Role (inferred) |
|-----------|------|------------------|
| `cv/personal.js` | Personal / header info |
| `cv/description.js` | Summary text |
| `cv/skills.js` | Skills list |
| `cv/experiences.js` | Work history |
| `cv/education.js` | Education |

## Shared utilities

| Component | Path | Role (inferred) |
|-----------|------|------------------|
| `image.js` | Wrapper around gatsby-image or similar |

## Design system

No separate design-system package; **styled-components** + **global CSS/SCSS** define look and feel.

## Templates as page-level UI

| File | Route driver |
|------|----------------|
| `src/pages/index.js` | `/` |
| `src/pages/cv.js` | `/cv/` |
| `src/pages/404.js` | `/404/` |
| `templates/*` | Created in `gatsby-node.js` |
