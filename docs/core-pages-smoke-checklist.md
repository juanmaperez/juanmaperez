# Core pages — responsive & accessibility smoke

**Epic 3 Story 3.7** — FR15, UX-DR1–5 (core routes only)

| Field | Value |
|-------|-------|
| Date | 2026-05-21 |
| Commit | `484fff2` |
| Preview | http://127.0.0.1:4321 |
| Browser | Chromium (Playwright headless, build preview) |
| Built routes | `dist/index.html`, `dist/cv/index.html`, `dist/404.html` |

## Breakpoints

Standard tokens (documented in `site/README.md` §Responsive smoke):

| Token | Width (px) | Rationale |
|-------|------------|-----------|
| `xs` | 320 | Minimum width cited in Epic 3 stories / FR15 |
| `sm` | 375 | Common mobile viewport |
| `md` | 768 | Tablet / small laptop |
| `lg` | 1024 | Desktop |
| `xl` | 1280 | Wide desktop sanity check |

## Horizontal scroll (FR15 / UX-DR4)

**PASS** = `document.documentElement.scrollWidth <= document.documentElement.clientWidth` (no horizontal overflow).

Verified on production preview (`npm run build && npm run preview`) at each width below. Method: Playwright viewport + in-page `scrollWidth` / `clientWidth` (one-off script; not added to CI per story scope).

| Route | 320 | 375 | 768 | 1024 | 1280 |
|-------|-----|-----|-----|------|------|
| `/` | PASS | PASS | PASS | PASS | PASS |
| `/cv` | PASS | PASS | PASS | PASS | PASS |
| `/404` | PASS | PASS | PASS | PASS | PASS |

## Accessibility

| Check | / | /cv | /404 |
|-------|---|-----|------|
| One h1 in main | PASS | PASS | PASS |
| Landmarks header/nav/main/footer | PASS | PASS | PASS |
| Keyboard: full nav + no trap | PASS | PASS | PASS |
| Focus visible on links | PASS | PASS | PASS |
| Meaningful images alt (or n/a) | PASS | PASS | n/a (no `<img>` in main; decorative bg CSS) |
| CV print readable (n/a on /, /404) | n/a | PASS | n/a |

**Notes**

- **Landmarks:** `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>` present on all three routes (DOM inspection on preview).
- **Headings:** Exactly one `<h1>` inside `<main>` per route.
- **Images:** Home thumbnails and `girl.jpg` have non-empty `alt`; CV portrait has `alt="Juanma Perez"`.
- **Focus:** Global nav uses `:focus-visible` outline in `SiteHeader.astro` (see `site/README.md` §Accessibility). Tab order reaches brand → Home → CV → Blog → Contact → main links → footer mailto without trap.
- **404 images:** Recovery uses text links only; hero background is CSS — decorative, n/a for alt.
- **CV print:** Static sections; no clipped text in print preview at 375px+ (carry-over from Story 3.4).

## Validation gates

| Command | Result |
|---------|--------|
| `npm run check` | exit 0 |
| `npm run build` | exit 0 (3 pages) |
| `npm run test:schema` | exit 0 |

## Sign-off

- [x] All horizontal-scroll cells PASS (15/15)
- [x] All accessibility rows PASS
- [x] `npm run check` / `build` / `test:schema` green

Signed: Amelia (dev agent) — Epic 3.7 smoke complete, no layout CSS changes required.
