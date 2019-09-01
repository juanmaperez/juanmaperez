import React, { Component } from "react";
import { graphql } from 'gatsby'

import Layout from "../layouts/layout"
import SEO from "../components/seo"

import MainBlock from '../components/index/main-block'
import AboutBlock from '../components/index/about-block'
import WorksBlock from '../components/index/works-block'
import ContactBlock from '../components/index/contact-block'

class IndexPage extends Component{
  state = {    
    animationCompleted: false,
    workTypes : null 
  }

  componentDidMount(){
    const { edges } = this.props.data.allMarkdownRemark;
    const works =  edges.map(work => work.node.frontmatter); 

    this.setState({
      animationCompleted: !!this.checkCookies(),
      workTypes: works.reduce((workTypes, item) => {
        if(!workTypes[item.type]){
          workTypes[item.type] = { type: item.type, works: [item]}
        } else {
          workTypes[item.type].works = [...workTypes[item.type].works, item]
        }
        return workTypes
      }, {}) 
    })
  }

  completeAnimation = () => {
    this.setState({ animationCompleted : true } )
    this.setCookie();
  }

  checkCookies = () => {
    const cookie = document.cookie;
    const allCookies = {}
    cookie.split(';').forEach((cookie) => {
      let el = cookie.split('=');
      allCookies[el[0].trim().toString()] = el[1];
    })
    return (allCookies['animationCompleted']);
  }

  setCookie = () => {
    const date = new Date();
    const daysToExpire = 1;
    const cookieName = 'animationCompleted';
    const cookieValue = true;
    date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
  }


  
  render(){
    const { animationCompleted, workTypes } = this.state;
    const { location } = this.props;

    return (
      <Layout location={location}>
        <SEO title="Home" />
        { workTypes && <MainBlock markAsCompleted={this.completeAnimation.bind(this)} animationCompleted={animationCompleted}/>}
        { animationCompleted && <AboutBlock /> }
        <div className="works-section">
          { animationCompleted && Object.keys(workTypes).map((type, index) => <WorksBlock
                                                  index={index} 
                                                  key={workTypes[type].type} 
                                                  type={workTypes[type].type} 
                                                  works={workTypes[type].works} />)
          }
        </div>
        { animationCompleted && <ContactBlock /> }
      </Layout>
    )
  }

}

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark (
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            type
            thumbnail {
              childImageSharp {
                  fluid(maxWidth: 800) {
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


export default IndexPage
