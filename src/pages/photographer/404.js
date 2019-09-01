import React from "react"
import { Link } from 'gatsby'
import Layout from "./../../layouts/layout"
import SEO from "./../../components/seo"
import styled from 'styled-components'
import notFoundImage from './../../assets/images/404.jpg'

const NotFoundView = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${notFoundImage});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 300px;
    text-transform: uppercase;
    color: #fff;
    text-align:center;
    line-height: 1;
  }
  p {
    font-size: 36px;
    color: #fff;
    text-align:center;
    text-transform: uppercase;
    font-family: 'Mfred';
    letter-spacing:2.2px;
    a { font-family: 'Mfred'; text-decoration: underline; }
  }
`

const NotFoundPage = ({location}) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <NotFoundView>
      <h1>404</h1>
      <p>Be focused or <Link to={'/'}>go Home</Link></p>
    </NotFoundView>
  </Layout>
)

export default NotFoundPage
