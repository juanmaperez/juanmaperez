import React from "react"
import styled from "styled-components"
import SEO from "./../components/seo"
import Layout from "../layouts/layout"
import { graphql, Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const BlogPostView = styled.div`
  padding-bottom: 50px;
  position: relative;
  overflow: hidden;

  .post-container {
    max-width: 670px;
    box-sizing: border-box;
    width: 50%;
    margin: 0px auto;
    padding: 100px 0 40px;
    @media (max-width: 1590px) {
      width: 50%;
    }
    @media (max-width: 1100px) {
      width: 55%;
    }
    @media (max-width: 878px) {
      padding: 50px 0 40px;
      width: 75%;
    }

    @media (max-width: 510px) {
      width: 95%;
      padding: 100px 10px 40px;
    }
    .step-buttons {
      margin: 60px 0px;
      display: flex;
      font-size: 14px;
      flex-direction: row;
      justify-content: flex-start;
      div {
        flex: 1;
        display: flex;
        &:hover {
          text-decoration: underline;
        }
        &.next {
          text-align: right;
          div {
            text-align: right;
            display: flex;
            justify-content: flex-end;
          }
        }
        &.prev {
          text-align: left;
        }
        svg {
          margin: 0px 10px;
        }
      }
    }

    .post-date {
      font-size: 13px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      color: var(--primaryColor);
      margin-bottom: 1px;
      .post-icon {
        position: relative;
        top: -3px;
        margin-right: 10px;
        display: inline-block;
        width: 10px;
        height: 17px;
        background: url(${props => props.icon});
        border-radius: 50%/25%;
        background-size: 130%;
        background-position: center 1px;
        background-repeat: no-repeat;
        overflow: hidden;
        background-color: transparent;
      }
    }
    .back {
      font-size: 14px;
      opacity: 0.5;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--primaryColor);
      width: 100%;
      display: block;
      margin-bottom: 10px;
    }
    .post-title {
      font-family: "Montserrat", sans-serif;
      margin: 30px 0px 10px;
      font-size: 32px;
      font-weight: 800;
      color: var(--tertiaryColor);

      @media (max-width: 510px) {
        font-size: 28px;
        margin: 0px 0px 10px;
      }
    }

    .post-content {
      margin-top: 30px;
      line-height: 1.6;
      font-size: 17px;
      blockquote {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 20px;
        margin: 30px 0 30px 0px;
        border-left: 5px solid var(--primaryColor);
        font-style: italic;
        font-size: 24px;
        line-height: 1.4;
        * {
          margin: 0px !important;
        }
      }
      pre {
        max-width: 100%;
        font-size: 14px;
        line-height: 1.2;
        display: block;
        padding: 5px;
      }
      p {
        margin-bottom: 20px;
        color: var(--primaryColor);
      }
      h2 {
        color: var(--tertiaryColor);
        margin: 10px 0px 10px;
        font-size: 20px;
        font-family: "Questrial", sans-serif;
        font-weight: bold;
        text-decoration: underline;
      }
      h3 {
        margin: 10px 0px;
        text-decoration: underline;
        font-family: "Questrial", sans-serif;
      }
      a {
        color: #ff5252;
        text-decoration: none;
      }
      ol {
        margin: 20px 0px 20px;
        padding-left: 0px;
        counter-reset: my-counter;
        list-style: none;

        li {
          counter-increment: my-counter;
        }
        li::before {
          content: counter(my-counter) ".  ";
          font-family: "MFred";
          font-size: 24px;
          padding-right: 5px;
        }
      }
      ul {
        margin: 20px 0px 20px;
        list-style: circle !important;
        padding-left: 20px;

        li {
          margin-bottom: 10px;
        }
        li:before {
          list-style: disc !important;
          padding-right: 15px;
          font-size: 14px;
        }
      }
    }
  }
`

function PostTemplate(props) {
  const [height, setHeight] = React.useState(0)

  function resize() {
    setHeight(window.innerHeight)
  }

  React.useEffect(() => {
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  const { location } = props
  const { markdownRemark: post } = props.data
  const { frontmatter, html } = post
  const { next, prev } = props.pageContext
  // const backPath = location.state ? location.state.prevPath || '/blog' : '/blog';

  return (
    <Layout location={location}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.excerpt}
        keywords={frontmatter.tags}
      />
      <BlogPostView
        height={height}
        icon={frontmatter.icon.childImageSharp.fluid.src}
      >
        <div className="post-container">
          {/* <Link className="back" to={ backPath }>
							Back to the list
					</Link> */}
          <h2 className="post-title">{frontmatter.title}</h2>
          <div className="post-date">
            <Link
              className="post-icon"
              to={`/blog/category/${frontmatter.category}`}
            >
              <img
                width="10"
                src={frontmatter.icon.childImageSharp.fluid.src}
                alt={frontmatter.category}
              />
            </Link>
            <span>{frontmatter.date}</span>
          </div>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="step-buttons">
            <div className="prev">
              {prev && (
                <div>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <Link to={prev.frontmatter.path}>
                    {prev.frontmatter.title}
                  </Link>
                </div>
              )}
            </div>

            <div className="next">
              {next && (
                <div>
                  <Link to={next.frontmatter.path}>
                    {next.frontmatter.title}
                  </Link>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              )}
            </div>
          </div>
        </div>
      </BlogPostView>
    </Layout>
  )
}

export const PostQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM, DD, YYYY")
        path
        excerpt
        category
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 2000) {
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
`

export default PostTemplate
