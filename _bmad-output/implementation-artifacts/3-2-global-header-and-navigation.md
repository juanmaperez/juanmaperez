# Story 3.2: Global header and navigation

**Story ID:** 3.2  
**Story key:** `3-2-global-header-and-navigation`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 3.1 (`BaseLayout.astro` exists with named `header` slot; `siteConfig` exists in `site/src/site.config.ts`)  
**Followed by:** Story 3.6 (contact path may surface inside the nav)

---

## Story

As a **visitor**,  
I want **keyboard-accessible navigation** between major MVP sections,  
So that **FR7** (header/menu on all primary templates), **FR20** (contact path discoverable via nav), **NFR-A1** (keyboard + visible focus), and **UX-DR1** (focus ring) are met.

---

## Acceptance criteria (from epics)

1. **Given** any page rendered through `BaseLayout.astro`  
   **When** the page is loaded  
   **Then** a global `<header>` element appears (filled via `BaseLayout`'s `header` named slot) containing:
   - A **brand link** to `/` showing `siteConfig.title`. The brand link is **not** an `<h1>` (the one-`h1`-per-page policy from Story 3.1 forbids `h1` in the layout/header).
   - A `<nav aria-label="Primary">` element with the MVP link list (see [Link inventory](#link-inventory) below).

2. **Given** keyboard focus on the page  
   **When** the user presses **Tab** (and **Shift+Tab**)  
   **Then** focus moves through the brand link and every nav link in **DOM order**, with **no traps**, and **Enter** activates the focused link.

3. **Given** any keyboard-focusable element in the nav (brand or any link)  
   **When** it receives focus  
   **Then** a **visible focus ring** is rendered with **color contrast ≥ 3:1** against its background (UX-DR5 / WCAG 2.1 SC 2.4.7 + 2.4.11). Document the chosen color tokens in `site.config.ts` or `site/README.md`.

4. **Given** a visitor on a route matching a nav target  
   **When** the page renders  
   **Then** the corresponding nav link reflects the current page via `aria-current="page"` (e.g. on `/blog` the Blog link gets `aria-current="page"`, prefix-matched for nested routes like `/blog/post-slug`).

5. **Given** the new component(s) and the existing `index.astro`  
   **When** `npm run check` and `npm run build` run  
   **Then** both exit **0** with no new warnings or TypeScript errors. Story 2.4's CI gate continues to pass.

6. **Given** the rendered page on a viewport ≥ **320 px wide**  
   **When** inspected  
   **Then** the header **does not introduce horizontal scroll** (UX-DR4 / FR15). It may wrap, stack, or overflow gracefully — but no `overflow-x: visible` parent allowing wider-than-viewport content.

---

## Tasks / subtasks

- [x] **Add `nav` to `siteConfig`** (AC1) — Extend `site/src/site.config.ts` with a typed nav array. Keep narrow:
  ```ts
  // site/src/site.config.ts (extend, do not rewrite)
  export const siteConfig = {
    title: "Juanma Perez",
    description:
      "I'm a web developer creating blazing fast websites and apps from scratch",
    origin: "https://juanmaperez.dev",
    nav: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      // CV lands when 3.4 ships — keep this entry commented out for now:
      // { label: "CV", href: "/cv" },
    ],
  } as const;

  export type SiteConfig = typeof siteConfig;
  export type NavItem = (typeof siteConfig.nav)[number];
  ```
  **Do not** add `/cv` until Story 3.4 lands the route — a 404'ing nav link violates FR21 (no broken internal links). Same for `/contact` etc. Architecture §FR-to-design row "FR20 → `site.config.ts` nav + home template" confirms `site.config.ts` is the right home for the array.

- [x] **Create `site/src/components/nav/SiteHeader.astro`** (AC1, AC4, AC6) — A pure server-rendered component (no client JS):
  ```astro
  ---
  // site/src/components/nav/SiteHeader.astro
  import { siteConfig } from '../../site.config';

  const currentPath = Astro.url.pathname;
  const isCurrent = (href: string): boolean => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  };
  ---
  <header class="site-header">
    <a class="site-header__brand" href="/">{siteConfig.title}</a>
    <nav aria-label="Primary">
      <ul class="site-header__nav-list">
        {siteConfig.nav.map((item) => (
          <li>
            <a
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>

  <style>
    .site-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      max-width: 100%;
      box-sizing: border-box;
    }
    .site-header__brand {
      font-weight: 700;
      text-decoration: none;
    }
    .site-header__nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .site-header__nav-list a[aria-current='page'] {
      text-decoration: underline;
    }
    /* Focus visibility — UX-DR5 / WCAG 2.4.11. */
    .site-header a:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  </style>
  ```
  Notes:
  - **Brand is an `<a>`, not an `<h1>`** — Story 3.1's one-`h1`-per-page rule.
  - **`<nav aria-label="Primary">`** distinguishes this from any future secondary nav (footer, in-page TOC, etc.).
  - **`aria-current="page"`** must be **omitted** (not `="false"`) when not current — Astro's behavior on `undefined` attribute values is to skip the attribute. Confirm in build output.
  - Component is **scoped-style only**; no global CSS in this story.
  - **No client-side JavaScript.** Astro 6 server-renders the component as static HTML. The legacy hamburger toggle / GSAP animation are **out of scope** (Epic 7 islands).

- [x] **Wire `SiteHeader` into `BaseLayout.astro` via the `header` slot** (AC1) — Edit `site/src/layouts/BaseLayout.astro`. Provide a default fill for the `header` slot using **slot fallback content** so every page consuming `BaseLayout` automatically gets the header:
  ```astro
  ---
  // ...existing imports
  import SiteHeader from '../components/nav/SiteHeader.astro';
  ---
  <!-- ...existing <html>/<head>/<body>... -->
  <body>
    <slot name="header"><SiteHeader /></slot>
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
  ```
  This means `index.astro` (and every future page) gets the header **without** any per-page wiring. A page that wants a custom header can still override by supplying `<Fragment slot="header">…</Fragment>`. **Update the slot-reservation comment** in `BaseLayout.astro` to reflect that `header` now has a default fill (Story 3.2).

- [x] **Verify `index.astro` renders the header** (AC1, AC2, AC4) — No code change required to `index.astro` itself. After the layout edit, `npm run dev` (or `npm run build`) on `/` must produce HTML containing one `<header>`, one brand link, one `<nav aria-label="Primary">`, and the brand + Home link both reachable via Tab. The Home link should have `aria-current="page"` on `/`.

- [x] **Document focus-ring tokens** (AC3) — In `site/README.md`, append a short subsection (3–5 lines) under "Heading policy" or in a sibling "Accessibility" section:
  - State that the global focus ring is `outline: 2px solid currentColor` with `outline-offset: 2px` (chosen for UX-DR5 / WCAG 2.4.11).
  - Note the rationale: `currentColor` inherits from text color, automatically meeting **3:1 contrast against background** wherever body text already meets WCAG (so we don't have to pin a hardcoded color until the design system lands).
  - Pointer to the source: `site/src/components/nav/SiteHeader.astro` `<style>` block.

- [x] **Validation gates** (AC5) — From `site/`:
  ```bash
  cd site
  npm run check     # TS + Astro check on the new component + extended siteConfig
  npm run build     # emits dist/ with the new header rendered
  npm run test:schema  # confirms 2.4 CI gate is still healthy locally
  ```
  All three must exit **0**.

- [x] **Manual a11y / keyboard verification** (AC2, AC3, AC4, AC6) — After `npm run dev`, with the page focused (click into the page first), confirm:
  ```
  1. Press Tab → brand link receives focus, focus ring visible.
  2. Press Tab → "Home" link receives focus, focus ring visible.
  3. Press Tab → "Blog" link receives focus.
  4. Press Shift+Tab three times → focus walks back to the page <body>/start, no trap.
  5. With focus on "Home" link, press Enter → page reloads to /.
  6. On /, view source → "Home" link has aria-current="page", "Blog" link does not.
  7. Resize browser window to 320 px wide → no horizontal scrollbar appears on the header.
  ```
  Capture results (or a brief "all 7 checks pass") in the dev agent record.

- [x] **Do not** add: hamburger menu toggle, mobile drawer, dropdown, JS animation, sticky positioning, scroll-spy, or any client-side behavior. Those belong to **Epic 7** (motion / islands) under FR19.

- [x] **Do not** add CV, About, Works, or Contact links to `siteConfig.nav` yet — Stories **3.4** (CV) and **3.6** (contact path) own those. Adding now would break **FR21** (no broken internal links).

### Review Findings

_Generated by `code-review` workflow on 2026-05-21. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (2 — resolved):
- [x] [Review][Patch] Refresh `site.config.ts` file header comment — now documents `nav` seam for SiteHeader / FR7 / FR20 [`site/src/site.config.ts:1-2`]
- [x] [Review][Patch] Add `// TODO(4.1): /blog route` above Blog nav entry [`site/src/site.config.ts:11`]

**Deferred** (2) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] `/blog` nav href 404s until Story **4.1** — intentional per story §Edge cases / link inventory; not FR21 regression during Epic 3 dev.
- [x] [Review][Defer] `currentColor` focus ring may fail 3:1 on future dark `body` backgrounds — track when design system lands (story §Edge cases); no dark theme today.

**Dismissed** (10):
- AC1–AC6 implementation vs spec — **pass** (header slot fallback, brand `<a>`, `aria-label="Primary"`, `aria-current` on Home at `/`, gates 0/0/0, scoped CSS + flex-wrap).
- Blog link 404 treated as release-time FR21, not Epic 3 blocker — spec-aligned.
- Brand outside `<nav>` without `aria-current` — story §Edge cases recommendation followed.
- `NavItem` type unused — harmless export for 3.6 consumers.
- No unit tests for `isCurrent` — story §Testing forbids automated tests; manual checklist documented.
- No hamburger / client JS / sticky / CV·contact links — guardrails respected.
- README `3:1 contrast` claim for `currentColor` — documented rationale per AC3 either/or (`site.config.ts` OR README).
- Duplicate visible "Juanma Perez" (brand + page `<h1>`) — acceptable until Story **3.3** home content parity.
- `index.astro` unchanged — correct (layout fallback).
- Review targets only `site/` product diff; BMad artifact edits expected.

---

## Link inventory

| Label | href | Status | Why |
|-------|------|--------|-----|
| **Home** | `/` | ✅ enabled | Resolves today via `index.astro` (Story 3.1). |
| **Blog** | `/blog` | ✅ enabled | Will resolve when Story 4.1 ships. **Today this link 404s** — see "Edge cases" section for the call-it-as-it-is rationale. |
| ~~CV~~ | `/cv` | ❌ deferred to 3.4 | Add when Story 3.4 lands the page. |
| ~~Contact~~ | `/contact` or `mailto:` | ❌ deferred to 3.6 | Story 3.6 decides whether contact lives in nav, footer, home page, or all three. |
| ~~About~~ / ~~Works~~ | — | ❌ not in MVP | Legacy Gatsby had these; PRD MVP scope removed them. The CV page absorbs "about". |

---

## Dev notes

### Architecture compliance

- **§9 Project structure** — Component target is `src/components/nav/`. Use this path (not `src/components/`) to match the namespacing already declared. [architecture.md §9](../planning-artifacts/architecture.md)
- **§FR-to-design table** — `FR20 → site.config.ts nav + home template` and `FR7 → 3.2`. The nav array **must** live in `site.config.ts`, not inside the component. [architecture.md §FR-to-design](../planning-artifacts/architecture.md)
- **`<head>` slot is reserved for Story 6.1** — do not touch it from this story.

### PRD / UX requirements

- **FR7** — *"Visitor can navigate between global sections via header/menu on all primary templates."* Met by wiring `SiteHeader` into `BaseLayout`'s default header slot, so every layout consumer inherits it. [prd.md FR7](../planning-artifacts/prd.md)
- **FR20** — *"Visitor can reach at least one primary contact path from home or global navigation."* This story does **not** itself satisfy FR20 — Story **3.6** does. But by establishing the `nav` array in `siteConfig`, this story creates the seam 3.6 will use (either by adding a `Contact` entry to the array or wiring a contact section on the home page). Note: epics.md maps `FR20 → 3.6`, not 3.2. ([epics.md FR20 → 3.6](../planning-artifacts/epics.md))
- **NFR-A1 / UX-DR1** — *"Keyboard operation and visible focus states."* Native `<a>` elements give keyboard support for free; the `:focus-visible` outline rule satisfies the visible-focus requirement.
- **UX-DR5** — *"WCAG 2.1 Level A minimum; document token choices."* Hence the README documentation task. `currentColor` choice is a deliberate punt — it's correct in any color scheme that already meets body-text contrast; a hardcoded token can come when the design system lands (no story owns that yet).
- **UX-DR2** — Layout uses a real `<header>` and a real `<nav>` element with an accessible name. Heading hierarchy unchanged (no headings introduced — page still owns its `<h1>`).
- **UX-DR4 / FR15** — Header must not introduce horizontal scroll on mobile. CSS uses `flex-wrap: wrap`, `gap`, and `box-sizing: border-box` — the header wraps onto two rows below ~360 px instead of overflowing.

### Story 3.1 intelligence (what's already built)

- `site/src/layouts/BaseLayout.astro` exists with **named slots**: `head` (reserved for 6.1), `header` (this story fills it), default-in-`<main>`, `footer` (reserved for 3.6). [Source: `_bmad-output/implementation-artifacts/3-1-base-layout-and-document-shell.md`]
- `site/src/site.config.ts` exists with `title`, `description`, `origin` and an `as const` assertion. **Extend, don't rewrite.** Type narrowing via `as const` matters — keep it.
- `site/src/pages/index.astro` already uses `BaseLayout` and has its own `<h1>Juanma Perez</h1>`. Story 3.2 must **not** duplicate the brand text as another `<h1>` — the header brand is an `<a>`, not a heading.
- One-`h1`-per-page policy is documented in `site/README.md` (Story 3.1). The header brand link being a non-heading is the policy in action.
- Story 3.1 status is **review** at the time of writing. Implementation should land before this story starts; if 3.1 needs CR fixes, those land first.

### Legacy parity (informational only — do **NOT** copy)

The Gatsby site had:
- `src/components/header.js` — a fixed-position, GSAP-animated header with a brand `<h1><Link>` and conditional sub-rendering (different content on `/`, `/blog/*`, etc.).
- `src/components/menu.js` — a stateful hamburger button toggling a `.menu-list` panel, with links to `/`, `/about`, `/works`, `/contact`, `/blog`.
- `src/components/menuLink.js` — buttons with `role="link"` that called `window.scroll` to anchor IDs (`.block-${name}`) on the home page only.

**For Story 3.2:**

- **Brand**: yes → simple `<a>` (was `<h1><Link>` legacy; downgraded to comply with one-`h1` policy).
- **Hamburger / open-close state**: NO — out of scope. Static visible nav. JS-driven menu toggle is **Epic 7** if it ever returns.
- **Scroll-anchor links** (`/about`, `/works`, `/contact` as scroll targets on `/`): NO — those routes don't exist in the MVP. The home page in 3.3 may surface those sections as in-page anchors, but **this** nav links to **routes**, not sections.
- **Fixed positioning + GSAP fade-in**: NO — `position: static` (default) for now. The header may be made sticky later (Epic 3.7 or design polish), but it's a CSS decision deferred until pages need it.
- **`role="link"` on `<button>`**: NO — that was a legacy anti-pattern. Use `<a href>` for navigation.

### Why no client-side JS in this story

- PRD NFR-P2 caps JS budget; islands need explicit approval (Epic 7 / FR19).
- A static `<a>`-list nav meets all 6 ACs without any JS.
- A hamburger / drawer is a **UX choice** (toggle vs always-visible) that has not been made in PRD/UX-DR. Defaulting to "always-visible flex-wrap nav" is the smallest correct increment.
- If the design later demands a mobile drawer, Story 7.2 (Implement approved islands only) is the right home — it forces the islands checklist sign-off.

### File structure changes (target after this story)

```
site/
└── src/
    ├── site.config.ts                     # MODIFIED — adds nav array + NavItem type
    ├── layouts/
    │   └── BaseLayout.astro               # MODIFIED — header slot now has default fill <SiteHeader />
    ├── components/                        # NEW directory
    │   └── nav/                           # NEW subdir
    │       └── SiteHeader.astro           # NEW — global header + nav
    └── pages/
        └── index.astro                    # UNCHANGED (header inherited via layout)

site/README.md                             # MODIFIED — adds focus-ring / a11y note
```

No new dependencies. No CSS framework. No client-side scripts.

### Guardrails (do **NOT** do in this story)

1. **Do not** add a hamburger toggle, mobile drawer, or any open/close UI. Static nav only.
2. **Do not** add `client:*` directives on the header or any nav child. No client JS in this story.
3. **Do not** add `/cv`, `/contact`, `/about`, `/works`, or any link whose destination route does not yet exist in `site/src/pages/`. FR21 forbids broken internal links.
4. **Do not** add a footer or footer slot content — Story **3.6** owns the contact path; `BaseLayout`'s `footer` slot stays unfilled.
5. **Do not** introduce `<h1>` inside the header — violates Story 3.1's one-`h1`-per-page policy.
6. **Do not** import or use GSAP, motion libraries, or scroll listeners. Epic 7 territory.
7. **Do not** make the header `position: fixed` or `sticky` — defer until a styling pass argues for it. Default static positioning satisfies all ACs.
8. **Do not** add a sitewide stylesheet, CSS reset, or design-token system. Use the component's scoped `<style>` block only.
9. **Do not** rename or restructure `BaseLayout.astro`'s slots. Only add a default fill to the existing `header` slot.
10. **Do not** modify any content collection, page other than `index.astro` (and only if needed — likely no change), or any deploy/CI config. Story 2.4's CI gate must continue to pass unchanged.
11. **Do not** parameterize `aria-current` per route family beyond the simple `startsWith(href + '/')` rule shown. Edge cases (e.g. category pages) can be tightened by Story 4.4 if needed.
12. **Do not** add unit tests or testing infrastructure. The 7-step manual keyboard check is the AC verification mechanism.

### Edge cases to watch

- **`/blog` link 404s today** — Story 4.1 lands the route. Per FR21, broken internal links are forbidden at **release**, not during epic 3 development. Including `/blog` now lets the dev agent verify `aria-current` matching and link styling against the eventual route. **Document this in completion notes** so it's not flagged as a regression in code review. If desired, the dev agent may wrap the `/blog` link in a `// TODO(4.1): route lands` comment in `siteConfig`.
- **`aria-current` truthiness** — In Astro, `aria-current={undefined}` correctly **omits** the attribute; `aria-current={false}` would render `aria-current="false"`. Use `undefined` (or the conditional ternary returning `undefined`) — never `false` or `null`.
- **Nav array ordering** — DOM order = focus order = visual order. Keep `siteConfig.nav` ordered as it should appear. No `tabindex` overrides.
- **Brand link target on `/`** — Brand link `href="/"` on the home page resolves to itself. That's standard; `aria-current="page"` will be set on **both** the brand link and the Home nav link when on `/`. Acceptable per WAI-ARIA (multiple `aria-current="page"` is allowed); if confusing, screen readers will announce both. Optional refinement: set `aria-current` only on the nav links, not the brand. **Recommend**: leave brand without `aria-current` to keep the brand semantically separate from the nav. Update the snippet above if you take this route — the brand is an `<a>` outside `<nav>` and the `isCurrent` helper only runs inside the `nav.map`.
- **Empty `nav` array** — If a future change empties `siteConfig.nav`, the `<nav>` element still renders with an empty `<ul>`. That's valid HTML but pointless; not a concern for this story (nav has 2 entries).
- **Astro slot fallback rendering** — The `<slot name="header"><SiteHeader /></slot>` pattern emits the fallback **only when no page provides override content**. Confirm by viewing the rendered HTML on `/` (header should appear) AND optionally testing with a throwaway page that does `<Fragment slot="header">CUSTOM</Fragment>` to verify override works (then discard).
- **Astro 6 `Astro.url`** — `Astro.url.pathname` returns `/` for the homepage and `/blog` (no trailing slash by default config) for blog index. Astro defaults to `trailingSlash: 'ignore'`; if a future story sets `trailingSlash: 'always'`, the `isCurrent` helper's `startsWith(href + '/')` check still works because `/blog/` would match `'/blog/'.startsWith('/blog/')`. Robust.
- **`currentColor` focus ring on dark backgrounds** — If a future page sets a dark `body` background and the header inherits dark text, the `currentColor` ring will be dark on dark — bad. Today there's no dark background, so this is fine. Track as a follow-up when the design system lands; not a 3.2 concern.

### Testing

```bash
# Local proof the header works (AC1, AC5)
cd site
npm run check        # TS + Astro check pass on new component + extended config
npm run build        # dist/index.html contains <header>, <nav aria-label="Primary">, brand link, 2 nav links
npm run test:schema  # Story 2.4 gate still healthy

# Spot-check rendered HTML
grep -c '<header' dist/index.html               # → 1
grep -c '<nav aria-label="Primary"' dist/index.html  # → 1
grep -c 'aria-current="page"' dist/index.html   # → 1 (Home link, on /)
grep -c '<h1' dist/index.html                   # → 1 (page <h1>, NOT in header)
```

### References

- [Epics — Story 3.2](../planning-artifacts/epics.md)
- [Epics — UX-DR1, UX-DR5, NFR-A1](../planning-artifacts/epics.md)
- [Architecture §9 + §FR-to-design](../planning-artifacts/architecture.md)
- [PRD — FR7, FR20, NFR-A1](../planning-artifacts/prd.md)
- [Story 3.1 — BaseLayout (prerequisite)](./3-1-base-layout-and-document-shell.md)
- [Story 2.4 — CI gate (must continue passing)](./2-4-ci-gate-schema-validation-on-every-build.md)
- [Astro: Slots and slot fallback](https://docs.astro.build/en/basics/astro-components/#fallback-content-for-slots)
- [WAI-ARIA: aria-current](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html)
- [WCAG 2.1 SC 2.4.7 (focus visible)](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible)
- [WCAG 2.4.11 (focus appearance, AAA but referenced for token choice)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance)
- [Legacy: `src/components/header.js`, `menu.js`, `menuLink.js`](../../src/components/) (reference only — do **not** copy)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer.

### Debug log references

- Node 22.12.0 (`nvm use`); `astro check` → **9 files**, 0/0/0.
- `/blog` in `siteConfig.nav` — **404 until Story 4.1** (documented; not FR21 regression at epic-3 dev time).

### Completion notes list

- **`site/src/site.config.ts`** — `nav` (Home, Blog); `NavItem` type; CV entry commented per story.
- **`site/src/components/nav/SiteHeader.astro`** — brand `<a>`, `<nav aria-label="Primary">`, `isCurrent` + `aria-current`, scoped CSS, `:focus-visible` ring.
- **`site/src/layouts/BaseLayout.astro`** — `<slot name="header"><SiteHeader /></slot>`; slot comment updated.
- **`site/README.md`** — §Accessibility (focus) for UX-DR5 tokens.
- **`index.astro`** — unchanged (header via layout fallback).
- Gates: `check` / `build` / `test:schema` → exit 0.
- HTML spot-check `dist/index.html`: 1×`<header>`, 1×`aria-label="Primary"`, 1×`aria-current="page"` (Home on `/`), 1×`<h1>` in `<main>`; brand without `aria-current`.
- Manual a11y checklist (7 steps): **all pass** (Tab order brand → Home → Blog; Shift+Tab no trap; Enter on Home reloads `/`; 320px no horizontal scroll on header).

### File list

**Added:**
- `site/src/components/nav/SiteHeader.astro`

**Modified:**
- `site/src/site.config.ts` — `nav`, `NavItem`
- `site/src/layouts/BaseLayout.astro` — header slot default + import
- `site/README.md` — §Accessibility (focus)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-2` → `review`
- `_bmad-output/implementation-artifacts/3-2-global-header-and-navigation.md` (this file)

**Unchanged (per guardrails):**
- `site/src/pages/index.astro`, content collections, CI workflow, no client JS / hamburger / CV·contact nav links.

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Story drafted (ready-for-dev). Ultimate context engine analysis: epic 3.2, FR7/FR20/NFR-A1/UX-DR1/UX-DR5, architecture §9 + FR-to-design table, Story 3.1 BaseLayout/siteConfig integration, legacy Gatsby header/menu/menuLink intelligence (parity decisions documented), 12 explicit guardrails, slot-fallback wiring pattern, scope-locked: no JS, no hamburger, no broken links. | bmad-create-story |
| 2026-05-21 | SiteHeader + siteConfig.nav + BaseLayout slot fallback; README focus docs; gates green; status → review. | Amelia |
| 2026-05-21 | Code review: 2 patch (comment + TODO), 2 defer (`/blog` 404, dark-theme focus); AC1–AC6 pass. | Amelia (review) |
| 2026-05-21 | Review patches applied; status → done. | Amelia (review) |
