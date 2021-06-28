
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

exports.createPages = async ({ actions, graphql}) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve('src/templates/postTemplate.js');
  const WorkTemplate = path.resolve('src/templates/workTemplate.js');

  const postsResult = await graphql(`{
    allMarkdownRemark (filter: {frontmatter: {type: {eq: "post"}}}, sort: { order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          html
          id
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            path
            title
            excerpt
            tags
            type
            category
            thumbnail {
              childImageSharp {
                  fluid(maxWidth: 1500) {
                      src
                  }
              }
            }
            icon {
              childImageSharp {
                  fluid(maxWidth: 50) {
                      src
                  }
              }
            }
          }
        }
      }
    }
  }`)

  const projectsResult = await graphql(`{
    allMarkdownRemark (filter: {frontmatter: {type: {eq: "projects"}}}, sort: { order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          html
          id
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            path
            title
            excerpt
            type
            category
            icon {
              childImageSharp {
                  fluid(maxWidth: 50) {
                      src
                  }
              }
            }
          }
        }
      }
    }
  }`)


  if (postsResult.errors || projectsResult.errors) {
    const errors = postsResult.errors || projectsResult.errors
    return Promise.reject (errors);
  }

  const works = projectsResult.data.allMarkdownRemark.edges
  const posts = postsResult.data.allMarkdownRemark.edges

  // post list page

  const postsPerPage = 12;
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${ i + 1}`,
      component: path.resolve('./src/templates/blogListTemplate.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
  
  // post pages
  posts.forEach(({node}, index ) => {
    createPage({
      path: `${node.frontmatter.path}`,
      component: BlogPostTemplate,
      context: {
        prev: index === 0 ? null : posts[index - 1 ].node,
        next: index === (posts.length - 1) ? null : posts[index + 1].node
      } 
    })
  })

  // work Pages

  works.forEach(({node}, index)=> {
    createPage({
      path: node.frontmatter.path,
      component: WorkTemplate,
      context: {
        prev: index === 0 ? null : works[index - 1 ].node,
        next: index === (works.length - 1) ? null : works[index + 1].node
      } 
    })
  })

  // categories pages

  const categories = [];
  const categoryTemplate = path.resolve('src/templates/categoryTemplate.js');

  posts.forEach(({node}, index) => {
    if( !categories.includes(node.frontmatter.category)){
      categories.push(node.frontmatter.category);
    }
  })

  categories.forEach(category => {
    createPage({
      path: `/blog/category/${category}`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })


}
