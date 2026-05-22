# juanmaperez.dev — personal site

**Production application:** [**`site/`**](site/) (Astro 6, static output → `site/dist/`).

| What | Where |
|------|--------|
| **Start here** | [docs/index.md](docs/index.md) |
| **Develop** | [site/README.md](site/README.md) — `cd site && npm run dev` |
| **Deploy** | [docs/deployment-guide.md](docs/deployment-guide.md) — GitHub Actions → Pages on push to `main` |

```bash
cd site
nvm use          # Node ≥ 22.12 — see site/.nvmrc
npm install
npm run dev
```

**Legacy Gatsby 2** at the repository root (`src/`, `gatsby-config.js`) is **deprecated** and scheduled for archive in Epic 9 — not the production stack. See [docs/development-guide.md](docs/development-guide.md#production-app-vs-legacy-gatsby-reference).

---

## Historical — upstream Gatsby starter readme

The block below is the original **Gatsby default starter** template shipped with this repo fork. It is **not** current maintainer documentation.

<details>
<summary>Gatsby default starter (historical, collapsed)</summary>

<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">Gatsby's default starter</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

### Quick start (starter template only)

```sh
gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
cd my-default-starter/
gatsby develop
```

Site runs at `http://localhost:8000` in the starter template — **not** this project's production app.

</details>
