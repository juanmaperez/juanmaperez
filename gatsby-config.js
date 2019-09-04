module.exports = {
  // pathPrefix: "/photographer",
  siteMetadata: {
    title: `Juanma Perez`,
    description: `I'm a web developer creating blazing fast websites and apps from scratch`,
    author: `Juanma Perez`,
    siteUrl: `https://juanmaperez.me`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
                maxWidth: 1300,
                linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `design`,
        path: `${__dirname}/src/content/design`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ux`,
        path: `${__dirname}/src/content/ux`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juanma Perez Portfolio`,
        short_name: `juanma perez`,
        start_url: `/`,
        background_color: `#fbf9f3`,
        theme_color: `#323846`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png` // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
