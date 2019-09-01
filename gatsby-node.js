
const path = require('path');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: stage === 'build-html'
        ? [
            {
              test: /ScrollMagic/,
              use: loaders.null(),
            },
            {
              test: /scrollmagic/,
              use: loaders.null(),
            }
          ]
        : []
    },
    resolve: {
      alias: {
          "TweenLite": path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
          "TweenMax": path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
          "TimelineLite": path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
          "TimelineMax": path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
          "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
          "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
          "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
      },
    },
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const WorkTemplate = path.resolve('src/templates/workTemplate.js');

  return graphql (
    `{
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path     
            }
          }
        }
      }
    }`
  ).then( result => {
    if (result.errors) {
      return Promise.reject (result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: WorkTemplate
      })
    })
  })
}


