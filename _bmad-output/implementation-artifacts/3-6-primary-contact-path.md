# Story 3.6: Primary contact path

**Story ID:** 3.6  
**Story key:** `3-6-primary-contact-path`  
**Status:** done  
**Epic:** 3 — Global experience, core pages, and contact  
**Depends on:** Story 3.1 (`BaseLayout` footer slot reserved), Story 3.2 (`SiteHeader`, `siteConfig.nav`), Story 3.3 (`HomeContact` — home contact block exists; refactor to shared config)  
**Followed by:** Story 3.7 (site-wide chrome smoke)

---

## Story

As a **visitor**,  
I want **at least one obvious contact method** from home or global nav,  
So that **FR20** is satisfied.

---

## Acceptance criteria (from epics)

1. **Given** contact settings in `site/src/site.config.ts`  
   **When** the config is loaded at build time  
   **Then** a **`contact`** object exists with at minimum:
   - `email: 'juanmaperezvar@gmail.com'` (legacy primary contact — matches `HomeContact` and `cvData.personal.email`)
   - `navLabel: 'Contact'` (or equivalent) for the global nav affordance

2. **Given** any page rendered through `BaseLayout` (home, CV, 404, and future routes)  
   **When** the page loads  
   **Then** a **global contact affordance** is visible **without scrolling** on typical viewports (header nav counts):
   - Primary nav includes a **Contact** item whose `href` is `mailto:juanmaperezvar@gmail.com`
   - Activating it opens the user’s mail client (no `target="_blank"` on `mailto:`)

3. **Given** the reserved `footer` slot in `BaseLayout`  
   **When** any `BaseLayout` page renders  
   **Then** a default **`<footer>`** is emitted (via slot fallback) containing at least one obvious contact link (recommended: same `mailto:` as nav, with visible link text such as the email address or “Email me”).

4. **Given** Story 3.3 `HomeContact.astro`  
   **When** refactored for this story  
   **Then** the home contact block’s `mailto:` **reads from `siteConfig.contact.email`** (no duplicated hardcoded address strings in `HomeContact`).

5. **Given** external `https://` links in footer or home social rows  
   **When** rendered  
   **Then** they use `target="_blank"` and `rel="noopener noreferrer"` (existing home pattern). **`mailto:`** links do **not** use `target="_blank"`.

6. **Given** `npm run check`, `npm run build`, and `npm run test:schema`  
   **When** run from `site/`  
   **Then** all exit **0**.

---

## Tasks / subtasks

- [x] **Extend `site/src/site.config.ts`** (AC1) — Add `contact` (and export type). Keep `as const`:
  ```ts
  export const siteConfig = {
    // ...existing title, description, origin, nav
    contact: {
      email: 'juanmaperezvar@gmail.com',
      navLabel: 'Contact',
    },
    nav: [
      { label: 'Home', href: '/' },
      { label: 'CV', href: '/cv' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: 'mailto:juanmaperezvar@gmail.com' },
    ],
  } as const;

  export type ContactConfig = (typeof siteConfig)['contact'];
  ```
  **Alternative:** derive nav Contact `href` as `` `mailto:${siteConfig.contact.email}` `` in `SiteHeader` if you prefer a single email literal — either pattern is fine if there is **one** source of truth for the address.

- [x] **Update `SiteHeader.astro`** (AC2, AC5) — Render the Contact nav item from `siteConfig.nav`. Adjust `isCurrent()` so **`mailto:`** (and `http(s):`) links **never** receive `aria-current="page"`:
  ```ts
  const isPageLink = (href: string) =>
    href.startsWith('/') && !href.startsWith('//');
  const isCurrent = (href: string): boolean => {
    if (!isPageLink(href)) return false;
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  };
  ```
  Add `:focus-visible` styles for nav links if not already inherited (already present). Confirm Tab order reaches Contact after other nav items.

- [x] **Create `site/src/components/nav/SiteFooter.astro`** (AC3, AC5) — Semantic footer landmark:
  ```astro
  ---
  import { siteConfig } from '../../site.config';
  const mailto = `mailto:${siteConfig.contact.email}`;
  ---
  <footer class="site-footer">
    <p>
      <a href={mailto}>{siteConfig.contact.email}</a>
    </p>
  </footer>
  ```
  Scoped CSS: padding, `max-width: 100%`, `box-sizing: border-box`, subtle top border; `:focus-visible` ring matching header (`currentColor` outline). **No `<h1>`** in footer.

- [x] **Wire footer into `BaseLayout.astro`** (AC3) — Same pattern as header slot fallback:
  ```astro
  import SiteFooter from '../components/nav/SiteFooter.astro';
  // ...
  <slot name="footer"><SiteFooter /></slot>
  ```
  Update the slot comment: footer now has default fill (Story 3.6).

- [x] **Refactor `HomeContact.astro`** (AC4) — Import `siteConfig`; set `href={`mailto:${siteConfig.contact.email}`}` and visible text from `siteConfig.contact.email`. Keep legacy layout/copy (“Say hello”, social row) unchanged.

- [x] **FR20 verification matrix** (AC2, AC4) — After build, confirm `mailto:` appears in:
  | Page | Header Contact | Footer mailto | Home section mailto |
  |------|----------------|---------------|---------------------|
  | `/` | ✅ | ✅ | ✅ |
  | `/cv` | ✅ | ✅ | n/a |
  | `/404` | ✅ | ✅ | n/a |

  ```bash
  cd site && npm run build
  for f in dist/index.html dist/cv/index.html dist/404.html; do
    echo "== $f =="
    grep -o 'mailto:juanmaperezvar@gmail.com' "$f" | wc -l
  done
  ```

- [x] **Document contact policy in `site/README.md`** (AC5) — Short §Contact (3–5 lines):
  - Primary path: nav **Contact** + footer email (`site.config.ts`).
  - `mailto:` opens mail client; external social links open new tab.
  - Home `HomeContact` duplicates affordance by design (legacy parity).

- [x] **Validation gates** (AC6) — `npm run check`, `npm run build`, `npm run test:schema` → exit 0.

- [x] **Manual smoke** — On `/cv`: Contact visible in header without scrolling; keyboard activates mailto; footer link focus ring visible; no horizontal scroll from footer on 320px.

- [x] **Do not** add `/contact` route, contact form, API, or client JS.

### Review Findings

_Generated by `code-review` workflow on 2026-05-22. 3 layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor._

**Patch** (0)

**Deferred** (2) — see `_bmad-output/implementation-artifacts/deferred-work.md`:
- [x] [Review][Defer] `contact.navLabel` unused — nav uses `label: 'Contact'` literal; values match today; consolidate in future config refactor.
- [x] [Review][Defer] `cv.ts` `personal.email` duplicate literal — story §Email table: leave for later consolidation.

**Dismissed** (9):
- AC1 `contact` object + email — **pass**.
- AC2 nav Contact `mailto:` visible; no `target="_blank"` on mailto in dist — **pass**.
- AC3 `SiteFooter` slot fallback + `<footer>` on index/cv/404 — **pass**.
- AC4 `HomeContact` reads `siteConfig.contact.email` — **pass**.
- AC5 external social `target`+`rel`; mailto without `target` — **pass**.
- AC6 gates 0/0/0 — **pass**.
- `isPageLink` excludes mailto from `aria-current` (CV page: one `aria-current` on `/cv` only) — **pass**.
- FR20 matrix mailto counts 3/3/2 — **pass**.
- Nav `mailto:` href duplicates `contact.email` string — story example allows; both literals identical — **pass**.

---

## FR20 satisfaction rationale

| Path | Before 3.6 | After 3.6 |
|------|------------|-------------|
| Home `HomeContact` mailto | ✅ (hardcoded) | ✅ (from `siteConfig`) |
| Global nav on all pages | ❌ no Contact item | ✅ `mailto:` in nav |
| Footer on all pages | ❌ empty slot | ✅ `SiteFooter` |

Epics require contact from **home or global nav** — nav + home exceeds minimum; footer is additive UX-DR2 landmark, not a substitute for nav visibility.

---

## Dev notes

### Architecture compliance

- **FR-to-design** — `FR20 → site.config.ts nav + home template`. This story completes the **nav** half and centralizes config; home template already exists, refactored to import config. [architecture.md](../planning-artifacts/architecture.md)
- **§9** — Footer component under `src/components/nav/` (paired with `SiteHeader`) or `src/components/footer/` — prefer **`nav/SiteFooter.astro`** to avoid new top-level folder unless you prefer `footer/`. [architecture.md §9](../planning-artifacts/architecture.md)
- **UX-DR2** — Real `<footer>` landmark on every `BaseLayout` page.

### PRD requirements

- **FR20** — At least one primary contact path from home **or** global navigation, without leaving the site. Nav `mailto:` satisfies global; home block remains. [prd.md FR20](../planning-artifacts/prd.md)

### Story 3.2 / 3.3 intelligence

- Story 3.2 **explicitly deferred** Contact nav to this story. [3-2-global-header-and-navigation.md](./3-2-global-header-and-navigation.md)
- `BaseLayout` footer slot comment already says “Story 3.6”. [BaseLayout.astro](../../site/src/layouts/BaseLayout.astro)
- `HomeContact.astro` already implements legacy mailto + social — **do not remove**; wire to config only. [3-3-home-page-content-and-layout-parity.md](./3-3-home-page-content-and-layout-parity.md)

### Legacy parity (informational)

- Gatsby `menu.js` linked **Contact** to scroll target `.block-contact` on home (`MenuLink name="contact"`), not a `/contact` URL.
- MVP: **no** `/contact` page; nav `mailto:` + home section is the correct static replacement.
- Do **not** add scroll-anchor Contact link in nav (would only work on `/`).

### Email single source of truth

| Location | Action |
|----------|--------|
| `site.config.ts` `contact.email` | **Authoritative** for FR20 |
| `HomeContact.astro` | Read from config |
| `site/data/cv.ts` `personal.email` | **Leave as-is** for CV parity strings (duplicate literal OK until a later consolidation story) |

### File structure (target)

```
site/src/
├── site.config.ts              # MODIFIED — contact + Contact nav item
├── layouts/BaseLayout.astro    # MODIFIED — footer slot fallback
├── components/nav/
│   ├── SiteHeader.astro        # MODIFIED — isCurrent excludes mailto
│   └── SiteFooter.astro        # NEW
└── components/home/
    └── HomeContact.astro       # MODIFIED — mailto from siteConfig
site/README.md                  # MODIFIED — §Contact
```

### Guardrails

1. **No** `/contact` route (FR21 — would 404).
2. **No** contact form, Netlify forms, or third-party embeds.
3. **No** `client:*` or copy-to-clipboard JS.
4. **No** global CSS framework.
5. **Do not** remove `HomeContact` from home — FR20 allows home path; keep both.
6. **Do not** add Contact to nav as `/contact` internal link.
7. **`mailto:`** — no `target="_blank"` (differs from legacy `HomeContact` — **fix** home to drop `target="_blank"` on mailto when refactoring).
8. **Do not** change `content.config.ts` or collections.
9. **One `<h1>` policy** — footer uses `<p>`/links only, no headings required in footer.
10. **Do not** duplicate nav Contact in a way that breaks `NavItem` typing — extend `as const` nav array cleanly.

### Edge cases

- **`aria-current` on mailto** — Must be omitted; `isPageLink` guard prevents `aria-current="false"`.
- **Blog nav still 404s** until 4.1 — unchanged; Contact is `mailto:` so not affected.
- **CV page** — Footer + nav provide FR20 without scrolling to email in body (CV shows plain-text email in personal block — optional future linkify out of scope).
- **404 page** — Footer + nav mailto must appear (recovery + contact).
- **Nav order** — Suggested: Home, CV, Blog, Contact (Contact last = common pattern for primary CTA).

### Testing

```bash
cd site
npm run check && npm run build && npm run test:schema
grep 'mailto:juanmaperezvar@gmail.com' dist/index.html
grep '<footer' dist/cv/index.html dist/404.html dist/index.html
# Manual: Tab to Contact in header on /cv; activate mailto
```

---

## References

- [Epics — Story 3.6](../planning-artifacts/epics.md)
- [PRD — FR20](../planning-artifacts/prd.md)
- [Architecture — FR20 mapping](../planning-artifacts/architecture.md)
- [Story 3.1 — footer slot](./3-1-base-layout-and-document-shell.md)
- [Story 3.2 — nav deferral](./3-2-global-header-and-navigation.md)
- [Story 3.3 — HomeContact](./3-3-home-page-content-and-layout-parity.md)
- [Legacy: `menu.js` Contact scroll](../../src/components/menu.js), [`contact-block.js`](../../src/components/index/contact-block.js)

---

## Dev agent record

### Agent model used

Amelia (Senior Software Engineer) — Composer.

### Debug log references

- Node 22.12.0; `astro check` → **22 files**, 0/0/0.
- FR20 matrix `mailto:` counts: `index.html` 3, `cv/index.html` 3, `404.html` 2; `<footer` 1 each.

### Completion notes list

- **`site.config.ts`** — `contact.email`, `contact.navLabel`; nav Contact `mailto:` (Home, CV, Blog, Contact).
- **`SiteHeader.astro`** — `isPageLink` guard; mailto never gets `aria-current`.
- **`SiteFooter.astro`** — footer `mailto:` + email text.
- **`BaseLayout.astro`** — `<slot name="footer"><SiteFooter /></slot>`.
- **`HomeContact.astro`** — mailto from config; removed `target="_blank"` on mailto.
- **`site/README.md`** — §Contact (FR20).
- Gates green.

### File list

**Added:**
- `site/src/components/nav/SiteFooter.astro`

**Modified:**
- `site/src/site.config.ts`
- `site/src/components/nav/SiteHeader.astro`
- `site/src/layouts/BaseLayout.astro`
- `site/src/components/home/HomeContact.astro`
- `site/README.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — `3-6` → `review`
- `_bmad-output/implementation-artifacts/3-6-primary-contact-path.md` (this file)

### Change log

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Story drafted (ready-for-dev). FR20 via siteConfig.contact, nav mailto Contact, SiteFooter slot fallback, HomeContact config refactor, isCurrent mailto guard, no /contact route, 10 guardrails. | bmad-create-story |
| 2026-05-22 | FR20: contact config, nav/footer mailto, HomeContact refactor; gates green. | Amelia |
| 2026-05-22 | Code review: clean (0 patch, 2 defer); status → done. | Amelia (review) |
