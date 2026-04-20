# Source tree analysis

Annotated tree for **portfolio root** (excluding `node_modules`, `.git`, large binary assets).

```
juanmaperez/                    # Repository root
├── gatsby-config.js            # Plugins, siteMetadata, filesystem sources, GA
├── gatsby-node.js              # createPages: blog list, posts, works, categories; webpack aliases (GSAP/ScrollMagic)
├── gatsby-browser.js           # Browser hooks (if any)
├── gatsby-ssr.js               # SSR hooks (if any)
├── package.json                # Scripts: develop, build, deploy (gh-pages → public)
├── package-lock.json
├── README.md                   # Upstream Gatsby starter readme (boilerplate)
├── LICENSE
├── .prettierrc
├── public/                     # Gatsby build output (deploy artifact for gh-pages)
└── src/
    ├── pages/                  # File-based routes
    │   ├── index.js            # Home (GraphQL for works + posts teasers)
    │   ├── cv.js               # CV page
    │   └── 404.js              # Not found
    ├── layouts/
    │   ├── layout.js           # Site shell; StaticQuery (menu, site title)
    │   └── blogLayout.js       # Blog wrapper; StaticQuery
    ├── templates/              # Used by createPage in gatsby-node.js
    │   ├── postTemplate.js     # Single blog post + GraphQL PostQuery
    │   ├── blogListTemplate.js # Paginated /blog
    │   ├── workTemplate.js     # Single project/case study
    │   └── categoryTemplate.js   # /blog/category/:category
    ├── components/             # Reusable UI
    │   ├── seo.js              # Meta tags (useStaticQuery)
    │   ├── header.js, menu.js, menuLink.js, image.js
    │   ├── post-item.js, workItem.js
    │   ├── index/              # Home sections: main-block, about, works, contact
    │   └── cv/                 # CV sections: personal, description, skills, experiences, education
    ├── content/
    │   ├── posts/              # 9 markdown posts (each in own folder)
    │   └── projects/           # 5 markdown case studies (umaicha, sainsburys, etc.)
    ├── styles/
    │   ├── main.css
    │   └── mixins.scss
    └── assets/
        ├── images/             # gatsby-source-filesystem `images`
        ├── icons/            # gatsby-source-filesystem `icons`
        └── fonts/
```

## Entry points

| Entry | Role |
|--------|------|
| `gatsby-config.js` | Site metadata, plugin pipeline |
| `gatsby-node.js` | Programmatic routes and webpack config |
| `src/pages/*.js` | Top-level URLs |
| `src/layouts/layout.js` | Default chrome for pages using it |

## Generated routes (from `gatsby-node.js`)

- `/blog`, `/blog/page/N` — paginated list (`postsPerPage` = 12)  
- `/blog/category/:category` — one page per distinct post category  
- One page per **post** `frontmatter.path`  
- One page per **project** `frontmatter.path`  

## Integration points

- **Build-time only:** Gatsby GraphQL in page components and `gatsby-node.js` (no backend in repo).  
- **Third party:** Google Analytics (plugin), external links in content.  
