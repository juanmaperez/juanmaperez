import React, { Component } from "react"
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import PostItem from './../components/post-item'

const CategoryView = styled.div`
  margin: 150px auto 80px;
  width: 100%;
  min-height: 10px;
  .category-header {
    margin: 100px auto;
    box-sizing: border-box;
    width: 35%;
    p {
      text-align: center;
      font-size: 50px;
      color: var(--primaryColor);
    }
    .category-title {
      text-align: center;
      margin-top: -10px;
      font-size: 24px;
      color: var(--tertiaryColor);
    }
    @media(max-width:1590px){ width: 40% }
    @media(max-width:1100px){ width:55% }
    @media(max-width:878px){ width:65% }
    @media(max-width:510px){
      width:95%;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    padding: 0px;
    margin: 0px auto 40px !important;
    button {
      color: var(--primaryColor);
      display:block;
      border: 0px;
      -webkit-appearance: none !important;
      background:var(--bgColor); 
      color:var(--primaryColor); 
      margin: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      outline: none;
      box-shadow: 0 0 0 1px rgba(var(--primaryColorRGB), 0.05), 0 2px 4px rgba(var(--primaryColorRGB), 0.08);      
      &.active {
        background: #a3cccc;
      }
    }
    @media(max-width:510px){
      display:none;
    }
  }

  .post-list {
    display: block;

    &.grid {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
  @media(min-width: 768px){
    .post-list {
      transition: all 1s linear;
      &.grid {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
      }
    }
  }

`
class CategoryTemplate extends Component {

  render() {
    const { pageContext, data, location } = this.props;
    const { category } = pageContext;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout location={location}>
        <SEO title={`${ category } pills`} description={`Little of knowledge about ${category}`} keywords={[ category, 'javascript', 'code' ]}/>
        <CategoryView>
          <div className="category-header">
            <h2 className="category-title">All about {category}</h2>
          </div>
          <div className={`post-list list`}>
            {posts.map(({node: post})=>{
              const { frontmatter } = post;
              return (
                <PostItem listPath={ this.props.location.pathname } key={frontmatter.path} frontmatter={frontmatter}/>
              )
            })}
          </div>
        </CategoryView>
      </Layout>
    )
  }
}
export const CategoryQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "post"}, category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            excerpt
            category
            thumbnail {
              childImageSharp {
                  fluid(maxWidth: 500) {
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
  }
`


export default CategoryTemplate
