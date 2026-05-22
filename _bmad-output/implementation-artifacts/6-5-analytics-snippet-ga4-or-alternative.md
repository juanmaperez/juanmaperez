# Story 6.5: Analytics snippet (GA4 or alternative)

**Story ID:** 6.5  
**Story key:** `6-5-analytics-snippet-ga4-or-alternative`  
**Status:** done  
**Epic:** 6 — Discovery, redirects, analytics, and link integrity  
**Depends on:** Story **3.1** (`BaseLayout.astro` + `head` slot); Story **6.1** (`PageHead` — inject analytics **after** SEO tags, before optional `head` slot)  
**Followed by:** Epic **6** retrospective (optional); Epic **7** motion parity

---

## Story

As a **site owner**,  
I want **maintained analytics** with minimal performance impact,  
So that **NFR-S2** and PRD analytics goals are met without **NFR-S1** violations.

---

## Acceptance criteria (from epics)

1. **Given** a GA4 measurement ID supplied via **safe config** (not a secret API key; may be public `G-` ID)  
   **When** `PUBLIC_GA_MEASUREMENT_ID` is set at build time  
   **Then** every page using `BaseLayout` includes the **GA4 gtag** snippet (async loader + inline config) in `<head>`.

2. **Given** `PUBLIC_GA_MEASUREMENT_ID` is **unset** (local dev default)  
   **When** the site is built  
   **Then** **no** analytics scripts are emitted (zero third-party requests from analytics component).

3. **Given** PRD **NFR-S2** and ADR-007  
   **When** analytics is enabled  
   **Then** the gtag loader uses **`async`**; **no** Google Tag Manager container; **no** extra marketing pixels — single GA4 property only.

4. **Given** legacy Universal Analytics `UA-98892695-1` in `gatsby-config.js`  
   **When** this story completes  
   **Then** docs note **UA → GA4** migration: owner must create/obtain a **GA4** measurement ID (`G-XXXXXXXX`); UA ID is **not** reused.

5. **Given** `npm run check`, `npm run build`, `npm run test:schema`, and `npm run test:links`  
   **When** run from `site/` on Node **22.12**  
   **Then** all exit **0** (with and without `PUBLIC_GA_MEASUREMENT_ID` — document which command used for gated build in Dev Agent Record).

6. **Given** production deploy  
   **When** analytics should run on `https://juanmaperez.dev`  
   **Then** measurement ID is configured via **`site/.env`** (local) or GitHub Actions **repository variable / secret** mapped to `PUBLIC_GA_MEASUREMENT_ID` at build time — **not** hardcoded in committed source.

---

## Tasks / subtasks

- [x] **Create `site/src/components/analytics/Analytics.astro`** (AC1, AC2, AC3) — Conditional on env:

  ```astro
  ---
  const gaId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
  const enabled = Boolean(gaId?.trim());
  ---
  {enabled && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
      <script is:inline define:vars={{ gaId }}>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', gaId);
      </script>
    </>
  )}
  ```

  - Use official [GA4 gtag.js](https://developers.google.com/analytics/devguides/collection/ga4) pattern.
  - **Do not** add GTM (`googletagmanager.com/gtm.js` container).
  - Optional: set `anonymize_ip` or `send_page_view` only if product asks — default GA4 config is enough for MVP.

- [x] **Wire into `site/src/layouts/BaseLayout.astro`** (AC1) — After `<PageHead />`, before `<slot name="head" />`:

  ```astro
  import Analytics from '../components/analytics/Analytics.astro';
  // …
  <PageHead ... />
  <Analytics />
  <slot name="head" />
  ```

  Applies to all layout consumers (including `/404` unless you explicitly skip — default: include on all `BaseLayout` pages).

- [x] **Env and examples** (AC2, AC6) — Add `site/.env.example`:

  ```
  # GA4 measurement ID (public; optional for local dev)
  # Create at https://analytics.google.com/ — do not commit real values in .env if you prefer CI-only injection
  PUBLIC_GA_MEASUREMENT_ID=
  ```

  - Ensure `site/.gitignore` ignores `.env` (verify; add if missing).
  - Document in `site/README.md`: how to enable analytics locally and in GitHub Actions (`env: PUBLIC_GA_MEASUREMENT_ID: ${{ vars.PUBLIC_GA_MEASUREMENT_ID }}` on build job when ID is configured).

- [x] **CI / deploy configuration** (AC6) — Update `.github/workflows/deploy-astro-pages.yml` **only if** repo already uses Actions vars for secrets:
  ```yaml
  - name: Build
    run: npm run build
    working-directory: site
    env:
      PUBLIC_GA_MEASUREMENT_ID: ${{ vars.PUBLIC_GA_MEASUREMENT_ID }}
  ```
  If the variable is unset, build must still pass (AC2). **Do not** fail CI when ID missing.

- [x] **Update docs** (AC4, AC6) — `docs/migration-parity-checklist.md` footer: Story **6.5** — GA4 via `Analytics.astro`; legacy UA `UA-98892695-1` retired. `docs/deployment-guide.md` § Analytics: Astro path + env var (one short paragraph).

- [x] **Verify built HTML** (AC1, AC3, AC5) — With ID set locally:
  ```bash
  cd site
  PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run build
  grep -o 'googletagmanager.com/gtag/js' dist/index.html | head -1
  grep 'G-XXXXXXXXXX' dist/index.html | head -1
  ```
  Without ID: `npm run build` → `grep gtag dist/index.html` returns nothing.

- [x] **Gate quartet** (AC5) — `check`, `build`, `test:schema`, `test:links` → 0.

- [x] **Do not** in this story: cookie consent banner / CMP (unless legally required later), GTM, multiple trackers, Partytown (optional future perf story), changes to SEO/sitemap/redirects.

### Review Findings

_Code review 2026-05-22 — story `6-5-analytics-snippet-ga4-or-alternative`. Gates re-run: check/build/test:schema/test:links → 0 (no env). Spot-check with `PUBLIC_GA_MEASUREMENT_ID=G-CRVERIFY1`: gtag present on `index.html`, `404.html`, `blog/index.html`._

✅ **Clean review** — Blind Hunter, Edge Case Hunter, Acceptance Auditor: no `patch` or `decision-needed` items.

| AC | Verdict |
|----|---------|
| AC1 | `Analytics.astro` + `BaseLayout`; async gtag loader + inline config on all layout-backed HTML routes |
| AC2 | `gaId?.trim()` guard; no `gtag` in dist when env unset |
| AC3 | `async` on loader; single GA4 snippet — no GTM container script |
| AC4 | UA → GA4 documented in README, deployment guide, parity checklist |
| AC5 | Full quartet exit 0 |
| AC6 | `.env.example`, CI `vars.PUBLIC_GA_MEASUREMENT_ID` on build step |

**defer (informational):** Architecture ADR-007 names `PUBLIC_GA_ID`; implementation uses `PUBLIC_GA_MEASUREMENT_ID` (documented in Dev Agent Record). Optional future: validate `G-` format if env typo becomes an ops issue. Production analytics requires owner to set GitHub variable — not a code defect.

---

## Current baseline (pre-story)

| Item | State |
|------|--------|
| Legacy analytics | `gatsby-plugin-google-analytics` — **UA-98892695-1** (deprecated UA) |
| Astro site | **No** analytics scripts in `BaseLayout` |
| Env | No `site/.env.example`; no `PUBLIC_*` analytics var |
| CI | Build step has no analytics env |
| ADR-007 | GA4 gtag in layout; `PUBLIC_GA_ID` naming in architecture — use **`PUBLIC_GA_MEASUREMENT_ID`** (clearer) and note alias in completion notes |

---

## Legacy vs MVP

| Legacy | Story 6.5 |
|--------|-----------|
| `gatsby-plugin-google-analytics` | Minimal `Analytics.astro` + gtag.js |
| `UA-98892695-1` in repo | **GA4** `G-…` via env only |
| Plugin injects on all pages | `BaseLayout` injects on all pages |

---

## Dev notes

### Architecture compliance

- **ADR-007** — Single async/defer analytics snippet in base layout. [architecture.md ADR-007](../planning-artifacts/architecture.md)
- **§11 CI** — No secrets in repo; public measurement ID via env. [architecture.md §11](../planning-artifacts/architecture.md)

### PRD

- **NFR-S1** — No API keys or private tokens in repo. [prd.md](../planning-artifacts/prd.md)
- **NFR-S2** — Third-party scripts async/defer, minimal surface. [prd.md](../planning-artifacts/prd.md)

### Previous story intelligence

- **6.1** — `PageHead` first; analytics **after** SEO, not inside `PageHead.astro`. [6-1-per-page-title-description-and-open-graph.md](./6-1-per-page-title-description-and-open-graph.md)
- **6.4** — `test:links` skips `https://` URLs; gtag external scripts won't break link checker. [6-4-internal-link-integrity-check.md](./6-4-internal-link-integrity-check.md)
- **3.1** — `head` slot remains for page-specific tags only. [3-1-base-layout-and-document-shell.md](./3-1-base-layout-and-document-shell.md)

### Astro env vars

- Only `PUBLIC_*` vars are exposed to client/build in Astro ([environment variables](https://docs.astro.build/en/guides/environment-variables/)).
- `.env` loaded automatically in dev/build from `site/`.

### Privacy / product note (document only)

- PRD mentions GDPR-aware analytics choice — GA4 + env config satisfies MVP; **no** cookie banner in this story. Owner enables measurement ID when policy allows.

### File structure (target)

```
site/
├── src/components/analytics/Analytics.astro  # NEW
├── src/layouts/BaseLayout.astro            # MODIFIED
├── .env.example                            # NEW
├── README.md                               # MODIFIED
.github/workflows/deploy-astro-pages.yml     # MODIFIED (optional env on build)
docs/migration-parity-checklist.md          # MODIFIED
docs/deployment-guide.md                    # MODIFIED (Analytics §)
```

### Guardrails

1. **No** GTM, Facebook Pixel, Hotjar, etc.
2. **No** hardcoded real measurement ID in committed files.
3. **No** breaking changes to gates when env unset.
4. Run full gate quartet after changes.

### Testing / verification checklist

- [x] With `PUBLIC_GA_MEASUREMENT_ID` set → gtag in `dist/index.html`
- [x] Without env → no gtag in dist
- [x] All gates green
- [x] README documents CI/local setup

---

## References

- [epics.md — Story 6.5](../planning-artifacts/epics.md) (NFR-S1, NFR-S2)
- [architecture.md ADR-007](../planning-artifacts/architecture.md)
- [Google GA4 gtag install](https://developers.google.com/analytics/devguides/collection/ga4/tag-options)
- Legacy: `gatsby-config.js` → `UA-98892695-1`

---

## Dev Agent Record

### Agent Model Used

Amelia (Senior Software Engineer) — Composer

### Completion Notes List

- Added `Analytics.astro` — GA4 gtag (async loader + inline config) when `PUBLIC_GA_MEASUREMENT_ID` is non-empty; zero scripts when unset.
- Wired into `BaseLayout.astro` after `PageHead`, before `head` slot (all layout pages including `/404`).
- `site/.env.example`, README analytics section, CI build `env` from `vars.PUBLIC_GA_MEASUREMENT_ID`.
- Docs: migration parity checklist + deployment guide (UA `UA-98892695-1` → GA4 `G-…` via env; architecture alias `PUBLIC_GA_ID` noted here as `PUBLIC_GA_MEASUREMENT_ID`).
- HTML verify: no `gtag` without env; with `G-TEST1234567` → `googletagmanager.com/gtag/js` + ID in `dist/index.html`.
- Gates (without env): `check`, `build`, `test:schema`, `test:links` — all exit 0.

### File List

- `site/src/components/analytics/Analytics.astro` (new)
- `site/src/layouts/BaseLayout.astro`
- `site/.env.example` (new)
- `site/README.md`
- `.github/workflows/deploy-astro-pages.yml`
- `docs/migration-parity-checklist.md`
- `docs/deployment-guide.md`

---

## Change log

| Date | Change | Agent |
|------|--------|-------|
| 2026-05-22 | Story created from sprint backlog; status → ready-for-dev. | create-story |
| 2026-05-22 | Implemented GA4 analytics; gates green; status → review. | Amelia (bmad-dev-story) |
| 2026-05-22 | Code review: clean; AC1–6 verified; status → done. | code-review |
