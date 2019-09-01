import React from 'react';
import { graphql } from 'gatsby';
import Layout from './../layouts/layout'
import styled from 'styled-components'

import Image from './../components/image';
import ContactBlock from './../components/index/contact-block';

const WorkTemplateView = styled.div`
  background: #fbf9f3;
  width: 100%;

  .work-template-container {
    width: 60%;
    margin: 0px auto;
    padding: 120px 0px;
    max-width: 1000px;
    background: #fbf9f3;
  
    h1 {
      text-transform: uppercase;
      font-size: 140px;
      margin-bottom: 30px;
    }
    .description {
      font-size: 18px;
      font-weight: lighter;
      line-height: 1.4;
      margin-bottom: 60px;
    }
    .work-image {
      margin-bottom: 90px;
      .element {
        transition: opacity 300ms linear;
      }
      img {
        max-width: 100%;
        margin-bottom: 10px;
      }
      h3 { 
        text-transform: uppercase;
        font-size: 20px;
        letter-spacing: 1px;
      }
    }
  }

  @media(max-width: 1024px){
    .work-template-container {
      width:75%;
    }
  }

  @media(max-width: 768px){
    .work-template-container {
      width:80%;
    }
  }

  @media(max-width: 480px){
    .work-template-container {
      width:90%;
      h1 {
        text-transform: uppercase;
        font-size: 100px;
        margin-bottom: 30px;
      }
      .work-image {
        margin-bottom: 50px;
      }
    }
  }
  
`

const WorkTemplate = ( { data, location } ) => {
  const { markdownRemark : work } = data;
  const { frontmatter } = work;
  return (
    <Layout location={ location}>
      <WorkTemplateView>
        <div className="work-template-container">
          <h1>{ frontmatter.title }</h1>
          <div className="description">
            <p>{ frontmatter.description }</p>
          </div>
          { frontmatter.images.map( element => <div key={ element.title } className="work-image">
            <div className="element">
              <Image key={ element.title } imageUrl={element.image.childImageSharp.fluid.src} title={element.title} />
            </div>
            <h3 >{ element.title }</h3>
          </div>)}
        </div>
        <ContactBlock /> 
      </WorkTemplateView>
    </Layout>
  )
}

export const WorkQuery = graphql`
  query WorkByPath($path: String!) {
    markdownRemark ( frontmatter: { path: { eq: $path }}) {
      html
      id
      frontmatter {
        path
        title
        description
        thumbnail {
          childImageSharp {
              fluid(maxWidth: 2500) {
                  src
              }
          }
        }
        images {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 1000) {
                  src
              }
            }
          }
        }
      }
    }
  }
`

export default WorkTemplate;
