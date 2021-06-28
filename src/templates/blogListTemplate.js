import React, { Component } from "react"
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import PostItem from './../components/post-item'
import Image from './../components/image'
import juanma from './../assets/images/juanma_perez.jpg'


const BlogView = styled.div`
  margin: 0px auto 0px;
  width: 100%;
	padding: 100px 0 80px;
  min-height: 10px;
  @media(max-width: 768px){
    margin: 0px auto 0px;
		padding: 50px 0 80px;
  }
  @media(max-width: 510px){
    margin: 0px auto 0px;
		padding: 100px 0 80px;
  }
  .list-header {
    margin: 100px auto 0px;
    box-sizing: border-box;
    width: 30%;
    display:flex;
    padding: 20px;
   

    .image-wrapper {
      margin-right: 20px;

      img {
        display:block;
        max-width: 90px;
        max-height: 90px;
        border-radius: 50%;
        width: 100%;
        overflow: hidden;
        box-shadow: 0 0 0 1px rgba(var(--primaryColorRGB), 0.05), 0 2px 4px rgba(var(--primaryColorRGB), 0.08);      
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .list-title {
        text-align: left;
        font-size: 24px;
        margin: 0px 0px 0px;
        color: var(--tertiaryColor);       
      }
      p {
        font-size: 11px;
        line-height:1.2;
        &.title {
          font-size: 15px;
          color: var(--tertiaryColor);
          font-weight: 600;
          a {
          color: var(--tertiaryColor);
          text-decoration:underline;
        }
        }
      }
      @media(max-width: 510px) {
        .list-title {
          font-size: 18px;
          text-align:center;
        }
        p {
          font-size: 16px;
        }
      }
    }
  
    @media(max-width:1590px){ width: 30% }
    @media(max-width:1100px){ width:30% }
    @media(max-width:878px){ width:65% }
    @media(max-width:510px){
      margin: 0px auto 50px;
      width:98%;
      flex-direction: column;
      align-items: center;
      .image-wrapper {
        margin-bottom: 20px;
      }
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

  .pagination {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 10px auto;
    @media(max-width: 480px) {
      width: 95%; 
    }
  }
  @media(min-width: 768px){
    .post-list {
      transition: all 1s linear;
      &.grid {
        margin: 0px auto;
        max-width: 1496px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
      }
    }
  }

  
`

class BlogPage extends Component {
  
  render() {
		const { location } = this.props
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const { currentPage, numPages } = this.props.pageContext 
    const isFirst = currentPage === 1;
    const isLast = currentPage ===  numPages;
    const prevPage = currentPage -1 === 1 ? '/blog' : `/blog/page/${(currentPage - 1 ).toString()}`
    const nextPage = `/blog/page/${(currentPage  + 1).toString()}`
    return (
      <Layout location={location}>
        <SEO 
          title="Blog" 
          description={'Juanma Perez personal blog about javascript and other technologies related to front end development'} 
          keywords={['javascript', 'development', 'front end', 'react', 'angular', 'gatsbyjs']} 
        />
        <BlogView>
          <div className="list-header">
            <div className="image-wrapper">
              <Image width="90" height="90" imageUrl={juanma} title="juanma perez" />
            </div>
            <div className="info">
              <p className="title">Personal blog by <a href="https://twitter.com/juanmaperezvar" target="blank">Juanma Perez</a></p>
              <p>What I learned about javascript</p>
            </div>
          </div>
          <div className={`post-list list`}>
            {posts.map(({node: post})=>{
              const { frontmatter } = post;
              return (
                <PostItem listPath={location.pathname} key={frontmatter.path} frontmatter={frontmatter} />
              )
            })}
          </div>
          <div className="pagination">
            <div>
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  ← Previous Page
                </Link>
              )}
            </div>
            <div>
              {!isLast && (
                <Link to={nextPage} rel="next">
                  Next Page →
                </Link>
              )}
            </div>
          </div>
        </BlogView>
      </Layout>
    )
  }

}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark (
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {type: {eq: "post"}}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            type
            excerpt
            category
            thumbnail {
              childImageSharp {
                  fluid(maxWidth: 800) {
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

export default BlogPage