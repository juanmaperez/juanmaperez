# Production site (`site/`)

This directory **is** the **production application** for [juanmaperez.dev](https://juanmaperez.dev): Astro 6 static site (FR18). All day-to-day development and CI deploys run from here.

**Deploy:** push to **`main`** / **`master`** or **`workflow_dispatch`** on [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) → GitHub Pages from **`dist/`**. See [deployment-guide.md](../docs/deployment-guide.md).

Legacy **Gatsby 2** is **archived** under **`legacy/gatsby/`**; do not use its `npm run deploy` for production.

## Requirements

- **Node.js ≥ 22.12** (Astro 6; use `nvm use` in this directory — see `.nvmrc`).

## Commands

```bash
cd site
npm install
npm run dev      # local dev server (Vite; edits under site/src/ reload without restart — FR16)
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
npm run check    # TypeScript + content collection schema validation (FR17)
npm run test:schema  # proves invalid frontmatter fails check (Story 2.1)
```

## Content collections (Story 2.1)

- **Config:** `src/content.config.ts` — `posts` and `projects` with Zod schemas (see [docs/data-models.md](../docs/data-models.md)).
- **Paths:** `src/content/posts/**`, `src/content/projects/**` (empty until Stories 2.2 / 2.3).
- **Schema gate:** `npm run check` validates frontmatter; `npm run test:schema` copies a bad fixture, expects `astro check` to fail, then cleans up.

**Node:** `engines` in `package.json` and **`.nvmrc`** must stay in sync with [CI](../.github/workflows/deploy-astro-pages.yml) (`node-version-file: site/.nvmrc`).

## Configuration

- **Output:** `output: 'static'` in `astro.config.mjs` (PRD / architecture ADR-001).
- **TypeScript:** `tsconfig.json` extends `astro/tsconfigs/strict`.

### Production URL and `base` (GitHub Pages)

- **`site`:** `https://juanmaperez.dev` — canonical origin for `import.meta.env.SITE`, sitemap, and absolute OG URLs (aligned with legacy Gatsby `siteUrl`).
- **Sitemap (Story 6.2):** `npm run build` writes `dist/sitemap-index.xml` and `dist/sitemap-0.xml`; preview at `/sitemap-index.xml` after `npm run preview`.
- **Redirects (Story 6.3):** `redirects` in `astro.config.mjs` from `src/config/redirects.ts` (301: `/projects/colossus` → `/projects/colossus-bets`; trailing-slash policy in parity checklist — not in `redirectMap` due to Astro route conflict). Static GitHub Pages build emits redirect route pages ([configured redirects](https://docs.astro.build/en/guides/routing/#configured-redirects)); audit: `node scripts/collect-redirect-paths.mjs`.
- **`base`:** `'/'` — site is served at the **domain root** (custom domain on GitHub Pages), not from `https://<user>.github.io/<repo>/`.

If you ever publish only to **`https://<user>.github.io/<repository>/`** without a custom domain, set `base: '/<repository>/'` (leading and trailing slash) and set `site` to `https://<user>.github.io` per [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

### CI deploy

Push or pull request targeting **`main`** or **`master`** runs [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) (`npm ci` → `npm run check` → `npm run build` in this folder; deploy only on push). Configure **Settings → Pages → Build and deployment → GitHub Actions** once. Details: [deployment-guide.md](../docs/deployment-guide.md#production-ci-github-actions).

### CI schema validation gate (FR17, Story 2.4)

CI runs `npm run check` (Astro + Zod content schema validation) **before** `npm run build`. Any post or project with invalid frontmatter fails the workflow at this step and blocks deploy. The local equivalent is `cd site && npm run check`.

### CI internal link gate (FR21, Story 6.4)

After `npm run build`, CI runs `npm run test:links`, which crawls `dist/**/*.html` for broken root-relative `href`/`src` targets. Run locally: `cd site && npm run build && npm run test:links`.

### Analytics (GA4, Story 6.5)

Optional GA4 via `PUBLIC_GA_MEASUREMENT_ID` (public `G-…` ID — not a secret API key). Copy `.env.example` to `.env` and set the ID for local builds with analytics, or leave unset for zero third-party scripts.

```bash
cd site
cp .env.example .env   # then set PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run build
grep gtag dist/index.html   # should match when ID is set
```

Production: add repository variable **`PUBLIC_GA_MEASUREMENT_ID`** in GitHub (Settings → Secrets and variables → Actions → Variables). CI passes the variable to the build step in [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml). Legacy Universal Analytics `UA-98892695-1` is not used — create a GA4 property and use its measurement ID.

### Motion / FR19 (Story 7.2)

Legacy motion inventory: [docs/migration-parity-checklist.md](../docs/migration-parity-checklist.md) (**§ Legacy animation & JS inventory**). Implementation uses **GSAP 3 + ScrollTrigger** only (ADR-008) — no ScrollMagic, no `@astrojs/react` (CV stagger via GSAP).

| Route | Scripts loaded |
|-------|----------------|
| `/` | `HomeMotion` → cookie gate, hero intro, about/works/contact scroll, work parallax |
| `/cv/` | `CvMotion` → typewriter + section stagger |
| `/projects/*` | `ProjectContactMotion` → contact cover/content scroll |
| `/`, `/cv/`, `/projects/*` | Header fade-in (`SiteHeader` route-scoped `<script>`) |
| Blog / 404 | **No** GSAP bundles |

**Modules:** `site/src/scripts/motion/*.ts` (orchestration, home blocks, header, CV). **CSS:** `site/src/styles/motion.css` (glitch brand, blink cursor, `data-home-ready` gate).

**`prefers-reduced-motion: reduce`:** Skips timelines; home blocks visible immediately; CV summary shown without typewriter delay.

**Cookie:** `animationCompleted` (1 day) — first visit runs hero intro; return visit skips intro.

**Bundle (post-build, gzip, approximate):** GSAP+ScrollTrigger shared chunk ~27 KiB; home route entry ~18 KiB additional; CV entry ~0.6 KiB + shared chunk. Blog HTML has zero `/_astro/*.js` motion references. Checklist **LCP/JS ex.** documents accepted budget; optional advisory measurement: [`_baseline/README.md`](../_baseline/README.md).

### Typography / FR22 (Story 8.2)

Global styles: `site/src/styles/global.css` imported from `BaseLayout.astro`.

| Asset | Location |
|-------|----------|
| **MFred** (headings, brand) | Self-hosted: `site/public/fonts/mfred/MFred.woff2` (+ woff/ttf fallbacks); preloaded in layout `<head>` |
| **Questrial** (body) | Google Fonts (`display=swap`) |
| **Montserrat** (blog titles, 8.3) | Google Fonts via same stylesheet; CSS var `--font-blog-title` |

**Design tokens** (`:root`): `--color-canvas` `#fbf9f3`, `--color-text` `#323846`, `--color-accent` `#b7c8cb`, `--color-link` `#1c768f`.

**NFR-V1:** `font-display: swap` on MFred; preload woff2 for faster heading render. Home hero is LCP-sensitive — avoid adding render-blocking font requests beyond this set without optional baseline measurement ([`_baseline/README.md`](../_baseline/README.md)).

**Story 8.3:** Per-template layout CSS ported from legacy styled-components (home about/works/contact/hero, CV px scale, blog Montserrat, project MFred hero, 404 display type, fixed header). Shiki vs Prism colors remain **simplified** (FR14).

Inventory: [migration-parity-checklist.md](../docs/migration-parity-checklist.md) (**§ Legacy typography & styling inventory**).

## Heading policy

Each page contributes exactly one `<h1>`. The `<h1>` is owned by the page (or a route-family layout), never by `BaseLayout`. `BaseLayout` emits no headings — it is only the document shell (`src/layouts/BaseLayout.astro`). Later headings on a page follow content order without skipping levels (UX-DR2 / accessibility). Site-wide title and description defaults live in `src/site.config.ts`; pages may pass optional `title` and `description` props to `BaseLayout` (defaults apply when omitted).

## Accessibility (focus)

Global header links use `outline: 2px solid currentColor` with `outline-offset: 2px` on `:focus-visible` (UX-DR5 / WCAG 2.4.11). `currentColor` inherits from text color so the ring meets **3:1 contrast** wherever body text already does — no hardcoded token until a design system lands. Source: `src/components/nav/SiteHeader.astro` scoped styles.

## Contact (FR20)

Primary contact path: **Contact** in the global nav (`mailto:` from `site.config.ts` `contact.email`) and the same address in `SiteFooter` on every `BaseLayout` page. `mailto:` opens the system mail client (no `target="_blank"`). External social links on the home contact block use `target="_blank"` and `rel="noopener noreferrer"`. The home `HomeContact` section duplicates the affordance by design (legacy parity).

## Responsive smoke (FR15 / Story 3.7)

Core routes **`/`**, **`/cv`**, and **`/404`** are checked at these viewport widths before Epic 3 sign-off:

| Token | Width |
|-------|-------|
| `xs` | 320px |
| `sm` | 375px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

**Procedure:** `npm run build && npm run preview` (default http://localhost:4321), then run the matrix in [docs/core-pages-smoke-checklist.md](../docs/core-pages-smoke-checklist.md). PASS when there is no horizontal scroll (`scrollWidth <= clientWidth`) and accessibility rows pass. Blog and project routes extend this pattern in later epics.
