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

### One-time GitHub repository settings (Story 9.3)

1. **Settings → Pages → Build and deployment**  
   - **Source:** **GitHub Actions** (not “Deploy from a branch” / legacy **`gh-pages`** branch).  
2. First workflow run may prompt you to **approve** the **`github-pages`** environment.  
3. **Custom domain:** keep Astro `site` in `site/astro.config.mjs` aligned with the hostname configured in Pages + DNS.

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

**Do not use for production.** The repo root still contains a **Gatsby 2** app for reference until [Epic 9 Story 9.2](../_bmad-output/planning-artifacts/epics.md) archives or removes it.

| Item | Legacy value |
|------|----------------|
| **Output** | **`public/`** (Gatsby default) |
| **Deploy script** | Root `package.json`: `"deploy": "gatsby build && gh-pages -d public"` |
| **Mechanism** | **`gh-pages`** npm package → **`gh-pages`** git branch |
| **Config** | `gatsby-config.js` → `siteMetadata.siteUrl` |

### Legacy steps (historical)

1. At repo root on **Node 14/16** (not Node 22): `npm run build` → `public/`.  
2. `npm run deploy` → pushes `public/` to the **`gh-pages`** branch.

**Analytics (legacy):** `gatsby-plugin-google-analytics` with UA `UA-98892695-1` — retired; do not reuse.

**PWA:** `gatsby-plugin-offline` is commented out in `gatsby-config.js`.

This path does **not** use `deploy-astro-pages.yml`.
