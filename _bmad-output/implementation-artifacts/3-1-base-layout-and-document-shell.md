# Story 3.1: Base layout and document shell

**Story ID:** 3.1  
**Story key:** `3-1-base-layout-and-document-shell`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 1.2 (`astro.config.mjs` with `site` and `base`), Story 2.4 (CI schema gate active — must continue to pass after this story)  
**First story of Epic 3** — establishes the layout primitive that 3.2–3.7 (and Epics 4/5) will all consume.

---

## Story

As a **visitor**,  
I want **consistent HTML structure and SEO defaults**,  
So that **UX-DR2** (semantic landmarks + heading hierarchy) is satisfied and **FR10** (per-page title and meta description) has a concrete extension point ready when Story 6.1 lands.

---

## Acceptance criteria (from epics)

1. **Given** any page using `BaseLayout.astro`  
   **When** rendered (dev or build)  
   **Then** the document includes:
   - `<html lang="en">`
   - `<meta charset="utf-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - `<title>` populated from a `title` prop with a documented site-default fallback
   - `<meta name="description">` populated from a `description` prop with a documented site-default fallback.

2. **Given** a `BaseLayout.astro`-rendered page  
   **When** its rendered HTML is inspected  
   **Then** the page uses semantic landmarks: a `<main>` element wraps primary content (the layout's default slot). `<header>`, `<nav>`, and `<footer>` elements are **not introduced in this story** (3.2 owns global header/nav, contact path lands in 3.6) — `BaseLayout` exposes them as **named slots** so later stories can fill them without re-architecting.

3. **Given** the **one-`h1`-per-page** policy  
   **When** the project is documented  
   **Then** there is a short written policy (in `site/README.md` or `docs/`) stating that **each page contributes exactly one `h1`**, that the **`h1` lives inside the page (not the layout)**, and that the layout itself emits **no `h1`**.

4. **Given** the converted `src/pages/index.astro`  
   **When** built  
   **Then** it uses `BaseLayout.astro`, supplies its own `<h1>` inside the default slot, and `npm run check` + `npm run build` exit 0 with **zero** new warnings or errors. Story 2.4's CI gate continues to pass.

5. **Given** site-wide title/description defaults  
   **When** a maintainer needs to change them  
   **Then** the values live in **one** place — a `site.config.ts` (or equivalent single source) consumed by `BaseLayout.astro` — not duplicated across pages. Mirrors architecture §10 ("Global defaults in `BaseLayout.astro` from `site.config.ts`").

---

## Tasks / subtasks

- [x] **Create `site/src/site.config.ts`** (AC5) — Single-source config consumed by the layout. Minimum:
  ```ts
  // site/src/site.config.ts
  // Single source of truth for site-wide title, description, and canonical origin.
  // Keep narrow — only fields BaseLayout (and future SEO components) need.
  export const siteConfig = {
    title: "Juanma Perez",
    description:
      "I'm a web developer creating blazing fast websites and apps from scratch",
    // Canonical production origin. Must match astro.config.mjs `site`.
    origin: "https://juanmaperez.dev",
  } as const;

  export type SiteConfig = typeof siteConfig;
  ```
  Source values from **legacy `gatsby-config.js`** (`siteMetadata.title`, `siteMetadata.description`) so production parity is preserved. **Do not** add nav, social, or analytics fields here — out of scope (3.2 / 6.5 own those).

- [x] **Create `site/src/layouts/BaseLayout.astro`** (AC1, AC2, AC5) — The reusable HTML shell. Required structure:
  ```astro
  ---
  // site/src/layouts/BaseLayout.astro
  import { siteConfig } from '../site.config';

  interface Props {
    title?: string;
    description?: string;
  }

  const { title, description } = Astro.props;
  const resolvedTitle = title ?? siteConfig.title;
  const resolvedDescription = description ?? siteConfig.description;
  ---
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="generator" content={Astro.generator} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <slot name="head" />
    </head>
    <body>
      <slot name="header" />
      <main>
        <slot />
      </main>
      <slot name="footer" />
    </body>
  </html>
  ```
  Notes: keep slots **named and minimal** — `head`, `header`, `footer` are placeholders future stories will fill. The default slot is the page body inside `<main>`. **No styles are loaded in this story** (Epic 3.7 / styling work is separate). **No `<h1>` lives in this layout** (AC3).

- [x] **Convert `site/src/pages/index.astro` to use `BaseLayout`** (AC4) — Replace its current ad-hoc `<html>…</html>` with a `BaseLayout` import. Provide a placeholder `<h1>` in the default slot. Keep the page minimal — Story 3.3 owns home content; this story only proves the layout works:
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro';
  ---
  <BaseLayout>
    <h1>Juanma Perez</h1>
    <p>Site under migration. Content lands progressively in Epics 3–7.</p>
  </BaseLayout>
  ```
  Result: the page now exercises the layout and yields a single `<h1>` inside `<main>`.

- [x] **Document the one-`h1`-per-page policy** (AC3) — Add a short section to `site/README.md` titled "Heading policy". 4–6 lines. State:
  - Each page contributes exactly one `<h1>`.
  - The `<h1>` is **owned by the page** (or the page-specific layout for a route family), **never** by `BaseLayout`.
  - `BaseLayout` emits **no headings**; it is purely the document shell.
  - Subsequent headings on a page follow content order (no level-skipping); rationale: UX-DR2 + a11y.
  - Pointer: `site/src/layouts/BaseLayout.astro` for the document shell.

- [x] **Verify slots are extension-ready (no behavioral test required)** (AC2) — Confirm the layout exposes named slots `head`, `header`, `footer` and the default slot wraps `<main>`. This is structural readiness for 3.2 (global header/nav) and 3.6 (contact path). **Do not** implement those slots' contents here. Add a brief inline comment in `BaseLayout.astro` listing which story will fill each slot:
  ```astro
  <!--
    Slots:
      - head:   reserved (Story 6.1 — per-page SEO/OG tags)
      - header: reserved (Story 3.2 — global header + nav)
      - default (in <main>): page content (this story onwards)
      - footer: reserved (Story 3.6 — primary contact path) — may also surface site-wide links
  -->
  ```

- [x] **Validation gates** (AC4) — From `site/`, all three must exit **0**:
  ```bash
  cd site
  npm run check     # AC4 — TS + Astro check; no new warnings
  npm run build     # AC4 — emits dist/; no new warnings
  npm run test:schema  # confirms 2.4 CI gate is still healthy locally
  ```
  Confirm in the dev agent record that the new files (`site.config.ts`, `BaseLayout.astro`) are picked up by Astro's TypeScript and that no tsconfig changes are needed.

- [x] **Manual rendered-HTML spot-check** (AC1, AC2) — Run dev server briefly OR `npm run preview` after build, and confirm the rendered `/` page contains:
  - `<html lang="en">` (one element)
  - `<meta name="viewport"…>` (one element)
  - `<title>Juanma Perez</title>`
  - `<meta name="description" content="I'm a web developer …">`
  - exactly one `<main>` element wrapping the page body
  - exactly one `<h1>` element (and it lives **inside** `<main>`)
  
  Capture the trimmed `dist/index.html` or the spot-check output in the dev agent record.

- [x] **Do not** scaffold further pages (`cv.astro`, `404.astro`, blog/projects routes) — Stories **3.4** (CV), **3.5** (404), **4.x** (blog), **5.x** (projects) own those. Only `index.astro` is touched, and only minimally (just enough to validate the layout end-to-end).

### Review Findings

_Generated by `code-review` workflow on 2026-05-21. Layers: Blind Hunter, Acceptance Auditor (Edge Case Hunter aborted). On-disk verification performed for untracked adds `site.config.ts` + `BaseLayout.astro`._

**Decision needed:** 0.

**Patch** (2 — resolved):
- [x] [Review][Patch] Slot-reservation comment moved to frontmatter `//` comments — no longer emitted in `dist/index.html`.
- [x] [Review][Patch] README §Heading policy documents optional `title` / `description` props on `BaseLayout`.

**Deferred** (2):
- [x] [Review][Defer] `siteConfig.origin` unused in layout today — intentional for Story 6.1 canonical/OG; must stay aligned with `astro.config.mjs` `site` (both `https://juanmaperez.dev` today).
- [x] [Review][Defer] `title ?? siteConfig.title` does not treat empty string as missing — if a page passes `title=""`, `<title>` is empty. Story 6.1 can switch to `title || siteConfig.title` when wiring collection frontmatter.

**Dismissed** (5):
- Blind Hunter "core files absent from diff" — review diff omitted untracked files; implementation verified on disk; Acceptance Auditor AC1–AC5 pass.
- Sprint `backlog → review` without `in-progress` in YAML hunk — process artifact.
- Gates unproven in diff — re-ran `npm run check` → 0/0/0 during review.
- Unicode en dash in placeholder copy (`Epics 3–7`) — cosmetic.
- Large story artifact in changeset — BMad workflow norm.

**AC summary:** AC1–AC5 pass on disk. FR17 gate intact (`check` 0/0/0).

---

## Dev notes

### Architecture compliance

- **§9 Project structure** — `src/layouts/BaseLayout.astro` is the named target. **No `BlogLayout.astro` in this story** (Epic 4). [architecture.md §9](../planning-artifacts/architecture.md)
- **§10 SEO and metadata** — "Global defaults in `BaseLayout.astro` from `site.config.ts`." This story stands up that pipeline; **per-page title/description from collection frontmatter** is Story 6.1 (`@astrojs/sitemap` and OG tags also 6.1/6.2). Today: title/description fallback chain only. [architecture.md §10](../planning-artifacts/architecture.md)
- **`<head>` slot pattern** — Story 6.1 will introduce SEO components (`<Seo>`, OG tags, canonical). Layout exposes a named `head` slot now so 6.1 doesn't have to refactor the shell.

### PRD / UX requirements

- **UX-DR2** — *"Pages use semantic landmarks (`header`, `main`, `nav`, `footer` as appropriate) and heading order matches content hierarchy."* This story delivers `<main>` + named slots for the rest, plus the heading-policy doc. [epics.md UX-DR2](../planning-artifacts/epics.md)
- **FR10** — Per-page title and meta description; layout's prop interface (`title`, `description`) **is** the seam Story 6.1 will use to pipe per-page values from collection frontmatter. Today the props default to site-config values — minimum needed for valid documents on every page.
- **NFR-A1 / UX-DR1** — Keyboard-operable nav and visible focus are **Story 3.2's** scope. This layout must **not** preempt those decisions (no nav markup, no global CSS that affects focus visibility).

### Epic 1 / Epic 2 intelligence (what's already built)

- `site/astro.config.mjs` is set with `site: 'https://juanmaperez.dev'`, `base: '/'`, `output: 'static'` (Story 1.2). [Source: `site/astro.config.mjs`]
- `site/src/pages/index.astro` is the Astro starter scaffold — has its own `<html>` shell with `lang="en"`, charset, viewport, favicons, `<title>Astro</title>`, `<h1>Astro</h1>`. **Replace, don't extend** — the favicons go into `BaseLayout` so every page gets them.
- `site/src/content.config.ts` defines `posts` and `projects` collections (Stories 2.1–2.3) — **not consumed by this story**, but mention because future SEO work (6.1) will use entry frontmatter to set `title` / `description` props on `BaseLayout`.
- CI gate (Story 2.4): `.github/workflows/deploy-astro-pages.yml` runs `npm run check` before `npm run build`. **This story must keep both green.**
- Astro: **6.1.8**; Node: **≥ 22.12** (`site/.nvmrc`).
- Devs from 2.1 noted Astro caches under `site/.astro/` — `rm -rf site/.astro` if `check` mysteriously stalls after structural changes.

### Legacy parity (siteMetadata)

`gatsby-config.js` exposes:
- `siteMetadata.title: "Juanma Perez"`
- `siteMetadata.description: "I'm a web developer creating blazing fast websites and apps from scratch"`

These are the **exact** values to seed `siteConfig` so social-preview parity is preserved when Story 6.1 wires OG tags. **Do not reword** the description for "improvement" — that's a content decision, not an infrastructure one.

### Why a separate `site.config.ts` (not inline constants in `BaseLayout`)

- Architecture §10 explicitly names `site.config.ts` as the source.
- Story 6.1 needs the same defaults from a non-`.astro` module (component imports, sitemap config, etc.). A plain `.ts` file is importable from anywhere; an `.astro` frontmatter constant is not.
- Encourages **single source of truth** — fewer drift risks when the title/description change.
- Type-safety: `as const` + exported `SiteConfig` type lets future consumers (Story 6.1's `<Seo>` component) typecheck.

### File structure changes (target after this story)

```
site/
└── src/
    ├── content.config.ts            # unchanged (Stories 2.1–2.3)
    ├── env.d.ts                     # unchanged
    ├── site.config.ts               # NEW — siteConfig single source of truth
    ├── layouts/                     # NEW directory
    │   └── BaseLayout.astro         # NEW — html shell + named slots
    ├── pages/
    │   └── index.astro              # MODIFIED — uses BaseLayout
    └── …                            # everything else untouched

site/README.md                       # MODIFIED — adds "Heading policy" section
```

No `BlogLayout.astro`, no components, no styles, no nav. All deferred.

### Guardrails (do **NOT** do in this story)

1. **Do not** create `BlogLayout.astro`, `BaseLayout` variants, or any other layout — Epic 4 owns blog layout.
2. **Do not** introduce a global CSS file, Tailwind, or any styling system — out of scope. The layout ships unstyled HTML.
3. **Do not** add a `<header>`, `<nav>`, or `<footer>` element with content — only **named slots** for later stories.
4. **Do not** add SEO components, `<link rel="canonical">`, OG tags, or `@astrojs/sitemap` — Story 6.1 / 6.2 own those.
5. **Do not** include or import any `astro:content` collections in `BaseLayout` — keep it a pure shell. Per-page values flow in via **props**.
6. **Do not** add nav links, social links, or analytics tags. Stories 3.2, 6.5, etc. own them.
7. **Do not** modify `astro.config.mjs` — this story is layout-only.
8. **Do not** scaffold `cv.astro`, `404.astro`, or any blog/projects routes.
9. **Do not** broaden `siteConfig` beyond `title`, `description`, `origin`. New fields land with the stories that need them (e.g. `nav` in 3.2).
10. **Do not** change the `<title>` of `index.astro` to anything beyond the default `siteConfig.title` — Story 3.3 owns home page content/copy.
11. **Do not** add unit tests or testing infrastructure — Astro 6 + `astro check` is sufficient for AC4. (Test framework decisions are deferred; Test Architect module isn't installed in this project per the help catalog.)
12. **Do not** modify `site/scripts/verify-content-schema.mjs` or any content collections — layout work and content validation are orthogonal.

### Edge cases to watch

- **Doctype** — Astro requires `<!doctype html>` at the top of the layout file (lowercase or uppercase both valid; lowercase is conventional in Astro docs).
- **Lang attribute** — `<html lang="en">` matches legacy starter and the index.astro Astro left in place. If multilingual support ever lands, that's a separate decision.
- **Favicons** — Move the two `<link rel="icon">` lines from `index.astro` into `BaseLayout` so every page inherits them. The files (`/favicon.svg`, `/favicon.ico`) live in `site/public/` (default Astro convention) — confirm they exist before moving the links. If missing, leave the lines anyway; Astro will 404 gracefully but the dev agent should flag for `public/` housekeeping in completion notes.
- **Viewport** — Legacy `index.astro` has `width=device-width` only. Add `, initial-scale=1` because UX-DR4 (no horizontal scroll) is downstream of this; missing initial-scale on iOS causes zoom quirks. This is a small upgrade, justified by UX-DR4 / FR15.
- **`Astro.generator`** — Useful debugging metadata; keep it.
- **Slot ordering in `<body>`** — `header` slot before `<main>`, `footer` slot after. This is the only layout decision that's hard to change later without breaking page authoring patterns; lock it now.
- **TypeScript** — `Props` interface in `BaseLayout` frontmatter must be exported via the standard Astro pattern (`interface Props { … }`) so `Astro.props` is typed. Do not switch to a separate `.d.ts` file.
- **`as const`** in `site.config.ts` — required so `siteConfig.title` narrows to a string literal type; keeps future SEO components honest. Without it, the type widens to `string` and you lose the literal.
- **CI continues to pass** — Story 2.4's `Schema validation (FR17)` step runs `npm run check`. Layout changes touch TypeScript + Astro components, both of which `astro check` validates. **Run it locally before pushing.**

### Testing

```bash
# Local proof the layout works (AC1, AC4)
cd site
npm run check        # exits 0 — TS + Astro check pass on new files
npm run build        # exits 0 — dist/ emitted with index.html
npm run test:schema  # exits 0 — Story 2.4 gate still healthy

# Spot-check rendered HTML (AC1, AC2)
cat dist/index.html  # confirm: lang="en", charset, viewport, title, description, <main>, <h1>

# Optional: dev server visual check
npm run dev          # then visit http://localhost:4321/
```

**Quick a11y sanity check** (no extra tooling needed):

```bash
# Confirm exactly one h1 in the rendered page
grep -c '<h1' dist/index.html   # → 1

# Confirm <main> wraps content
grep -c '<main' dist/index.html  # → 1

# Confirm description meta is non-empty
grep '<meta name="description"' dist/index.html  # → matches with non-empty content=
```

### References

- [Epics — Story 3.1](../planning-artifacts/epics.md)
- [Epics — UX-DR1–5](../planning-artifacts/epics.md)
- [Architecture §9 Project structure](../planning-artifacts/architecture.md)
- [Architecture §10 SEO and metadata](../planning-artifacts/architecture.md)
- [PRD — FR1, FR10, FR15](../planning-artifacts/prd.md)
- [Story 2.4 — CI gate (must continue passing)](./2-4-ci-gate-schema-validation-on-every-build.md)
- [Story 1.2 — `astro.config.mjs` site/base](./1-2-configure-site-url-and-base-for-github-pages.md)
- [Astro: Layouts](https://docs.astro.build/en/basics/layouts/)
- [Astro: Slots](https://docs.astro.build/en/basics/astro-components/#slots)
- [MDN: `<main>` element](https://developer.mozilla.org/docs/Web/HTML/Element/main)
- [Legacy: `gatsby-config.js`](../../gatsby-config.js)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Claude Opus 4.7.

### Debug log references

- Clean run under Node 22.12.0 (`nvm use` against `site/.nvmrc`).
- `astro check` now reports **8 files** (was 6) — picks up `site.config.ts`, `BaseLayout.astro`, updated `index.astro`; no `tsconfig` changes required.
- Slot-reservation docs live in frontmatter `//` comments (review patch removed HTML comment from production output).

### Completion notes list

- **`site/src/site.config.ts`** — `title`, `description`, `origin` seeded from legacy `gatsby-config.js` `siteMetadata` (byte-identical copy strings).
- **`site/src/layouts/BaseLayout.astro`** — document shell with `lang="en"`, charset, viewport (`initial-scale=1`), favicons (`/favicon.svg`, `/favicon.ico` confirmed in `site/public/`), `title`/`description` props with `siteConfig` fallbacks, named slots `head`/`header`/`footer`, default slot inside `<main>`, no headings in layout.
- **`site/src/pages/index.astro`** — uses `BaseLayout`; one `<h1>` inside `<main>`; placeholder migration copy.
- **`site/README.md`** — §Heading policy added (AC3).
- Gates (Node 22.12.0): `npm run check` → 0/0/0; `npm run build` → 1 page ~979ms; `npm run test:schema` → posts + projects OK (Story 2.4 gate intact).
- Spot-check `dist/index.html`: `lang="en"`, viewport with `initial-scale=1`, `<title>Juanma Perez</title>`, description meta with legacy string, **1** `<main>`, **1** `<h1>` inside `<main>`.

### File list

**Added:**
- `site/src/site.config.ts`
- `site/src/layouts/BaseLayout.astro`

**Modified:**
- `site/src/pages/index.astro` — replaced ad-hoc `<html>` shell with `BaseLayout`
- `site/README.md` — §Heading policy
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-1` → `in-progress` → `review`
- `_bmad-output/implementation-artifacts/3-1-base-layout-and-document-shell.md` (this file)

**Unchanged (per guardrails):**
- `site/astro.config.mjs`, `site/src/content.config.ts`, content collections, workflow, no new pages/routes/styles/nav/SEO components.

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Story drafted (ready-for-dev). Ultimate context engine analysis: epic 3.1, UX-DR2, architecture §9 + §10, legacy `gatsby-config.js` siteMetadata parity, slot reservations for stories 3.2/3.6/6.1, 2.4 CI-gate continuity, 11 explicit guardrails (no styling/nav/SEO scope leak). | bmad-create-story |
| 2026-05-21 | Added `site.config.ts`, `BaseLayout.astro`; converted `index.astro`; heading policy in README; all gates green. | Amelia |
| 2026-05-21 | Code review patches: slot docs moved to frontmatter comments; README documents `title`/`description` props. | Amelia (review) |
