# Deployment guide

## Target (production)

**GitHub Pages** via **[GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)**.

| Item | Value |
|------|--------|
| **Application** | Astro 6 under **`site/`** |
| **Build output** | **`site/dist/`** |
| **Workflow** | [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml) |
| **Canonical origin** | `https://juanmaperez.dev` (`site/astro.config.mjs` → `site`) |

**Production deploy:** push to **`main`** or **`master`**, or run the workflow manually (**`workflow_dispatch`**). PRs build but do not deploy.

---

## Production CI (GitHub Actions)

**Workflow:** [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml)

| Behavior | Detail |
|----------|--------|
| **Trigger** | Push or pull request targeting **`main`** or **`master`**, plus **`workflow_dispatch`**. |
| **Build** | `actions/setup-node` reads **`site/.nvmrc`**; **`npm ci`**, **`npm run check`** (FR17 schema gate), **`npm run build`**, **`npm run test:links`** in **`site/`**; artifact from **`site/dist/`**. Deploy runs only on **push** or **`workflow_dispatch`**, not on PRs. |
| **Deploy** | **`actions/deploy-pages`** with environment **`github-pages`** (OIDC; no deploy tokens in the repo — **NFR-S1**). |
| **Concurrency** | Group **`pages`** with **`cancel-in-progress: true`**. |

### One-time GitHub repository settings

1. **Settings → Pages → Build and deployment**  
   - **Source:** **GitHub Actions** (not “Deploy from a branch” / legacy **`gh-pages`** branch).  
2. First workflow run may prompt you to **approve** the **`github-pages`** environment (**Settings → Environments → github-pages**).  
3. **Custom domain:** keep Astro `site` in `site/astro.config.mjs` (`https://juanmaperez.dev`) aligned with the hostname configured in Pages + DNS. If GitHub shows a different CNAME (e.g. `juanmaperez.me`), reconcile DNS and Pages settings with the canonical origin you intend to serve.

---

## Cutover verification (Story 9.3)

**Purpose:** Confirm GitHub **publishes the Astro artifact** from [`.github/workflows/deploy-astro-pages.yml`](../.github/workflows/deploy-astro-pages.yml), not legacy Gatsby output from the **`gh-pages`** branch.

### Maintainer checklist

| Step | Action | Pass criteria |
|------|--------|----------------|
| 1 | **Merge** Astro workflow + `site/` to default branch (`master` / `main`) | `.github/workflows/deploy-astro-pages.yml` exists on default branch |
| 2 | **Settings → Pages** | **Build and deployment → Source:** **GitHub Actions** |
| 3 | **Actions** | Latest **Deploy Astro site to GitHub Pages** on default branch: **build** + **deploy** green; artifact **`site/dist`** |
| 4 | **Environments** | Approve **`github-pages`** deployment if prompted (one-time) |
| 5 | **Production smoke** | `./scripts/verify-production-smoke.sh` exits **0** (see below) |
| 6 | **`gh-pages` branch** (optional) | After step 5 passes: delete remote **`gh-pages`** *or* keep but **never** re-enable “Deploy from a branch” |

### Verify Pages source (CLI)

```bash
gh api repos/juanmaperez/juanmaperez/pages --jq '{build_type,source,cname,html_url,status}'
```

Expect **`"build_type": "workflow"`** (GitHub Actions). If you see **`"legacy"`** with **`"source.branch": "gh-pages"`**, switch source to **GitHub Actions** in the UI (or `gh api -X PUT repos/OWNER/REPO/pages -f build_type=workflow`).

### Production smoke script

After a green Actions deploy:

```bash
BASE=https://juanmaperez.dev ./scripts/verify-production-smoke.sh
```

Checks **200** and Astro `/_astro/` markers on `/`, `/cv/`, `/blog/`, one post, and one project. **`npm run preview`** on `site/dist` is a dev-only sanity check, not a substitute for this script.

### Verification record (2026-05-22)

| Item | Result |
|------|--------|
| **Workflows on `origin/master`** | **None** — `deploy-astro-pages.yml` exists only on feature branch until merged |
| **Pages API (`gh api …/pages`)** | Was **`build_type: legacy`**, **`source: gh-pages`**; updated to **`build_type: workflow`** via API during Story 9.3 DS |
| **Remote `gh-pages` branch** | **Exists** (`origin/gh-pages`) — retain until Actions deploy smoke passes; **do not** use as Pages source |
| **GitHub Pages CNAME (API)** | **`juanmaperez.me`** — align with `site/astro.config.mjs` **`juanmaperez.dev`** if both domains should serve the same site |
| **Production smoke (`juanmaperez.dev`)** | **Not run from CI agent** (network) — run `scripts/verify-production-smoke.sh` locally after merge + green deploy |
| **Local artifact smoke** | **`site/dist`** served at `127.0.0.1` — script **OK** (2026-05-22) |

**Latest Actions run URL:** _(fill after first green deploy on default branch)_  
`https://github.com/juanmaperez/juanmaperez/actions/workflows/deploy-astro-pages.yml`

### Legacy `gh-pages` branch policy

- **Production must not** use branch deploy from **`gh-pages`** (Gatsby `legacy/gatsby/` `npm run deploy`).
- **Option A (recommended):** delete **`origin/gh-pages`** after AC smoke passes on Actions.
- **Option B:** keep branch for archaeology only; Pages source stays **GitHub Actions**.

---

### Local commands (same gates as CI)

```bash
cd site
npm ci
npm run check
npm run build
npm run test:links
npm run preview   # optional smoke on dist/
```

Details: [site/README.md](../site/README.md).

---

## URL and `base` (`site/astro.config.mjs`)

| Setting | Value | Why |
|---------|--------|-----|
| **`site`** | `https://juanmaperez.dev` | Canonical origin for sitemap, OG, `import.meta.env.SITE`. |
| **`base`** | `'/'` | Custom domain at site root (not `github.io/<repo>/`). |

If you publish only to **`https://<user>.github.io/<repository>/`**, set `site` to `https://<user>.github.io` and `base` to `'/repo/'` per [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

---

## Analytics (production)

**Astro (`site/`):** `site/src/components/analytics/Analytics.astro` injects GA4 **gtag.js** when `PUBLIC_GA_MEASUREMENT_ID` is set at build time. Copy `site/.env.example` to `site/.env` locally, or set repository variable **`PUBLIC_GA_MEASUREMENT_ID`** in GitHub Actions. When unset, no analytics scripts are emitted. Use a GA4 **`G-…`** measurement ID — not legacy Universal Analytics.

---

## Performance baselines (advisory)

Story **7.3** checklist sign-off and **LCP/JS ex.** rows govern motion budget on heavy routes. Formal Story **7.4** regression gate is **dropped** (PRD **v1.2**).

Optional measurement after production is live: [**`_baseline/README.md`**](../_baseline/README.md) and [`scripts/capture-legacy-baselines.sh`](../scripts/capture-legacy-baselines.sh) (set `BASELINE_*` URLs). Legacy production host is offline — baselines are **reference only**, not a cutover blocker.

---

## Legacy Gatsby deploy (deprecated)

**Do not use for production.** The **Gatsby 2** app is **archived** under **`legacy/gatsby/`** (Story **9.2**).

| Item | Legacy value |
|------|----------------|
| **Location** | **`legacy/gatsby/`** — see [legacy/gatsby/README.md](../legacy/gatsby/README.md) |
| **Output** | **`legacy/gatsby/public/`** (Gatsby default, gitignored) |
| **Deploy script** | `legacy/gatsby/package.json`: `"deploy": "gatsby build && gh-pages -d public"` |
| **Mechanism** | **`gh-pages`** npm package → **`gh-pages`** git branch |
| **Config** | `legacy/gatsby/gatsby-config.js` → `siteMetadata.siteUrl` |

### Legacy steps (historical)

1. `cd legacy/gatsby` on **Node 14/16** (not Node 22): `npm run build` → `public/`.  
2. `npm run deploy` → pushed `public/` to the **`gh-pages`** branch (retired).

**Analytics (legacy):** `gatsby-plugin-google-analytics` with UA `UA-98892695-1` — retired; do not reuse.

**PWA:** `gatsby-plugin-offline` is commented out in `legacy/gatsby/gatsby-config.js`.

This path does **not** use `deploy-astro-pages.yml`.
