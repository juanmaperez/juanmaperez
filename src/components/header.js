import React, { Component } from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"

import { Link } from "gatsby"
import Menu from './menu'

import { Power1, TweenMax } from 'gsap';
import "./../styles/mixins.scss"
import "./../styles/main.css"



const HeaderView = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 120px 20px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  h1 {
    cursor: pointer;
    a {
      font-family: 'MFred';
      letter-spacing: 1px;
      font-size: 24px;
      position: relative;
      text-transform: uppercase;
      color: #323846;
    }
  }
  nav {
    display:flex;
    flex-direction: column;
    justify-content: center;
    .back { 
      margin-top: 5px;
      font-family: 'Questrial';
      font-size: 18px;
      cursor: pointer;
      text-transform: capitalize;
      color: #323846;
      span { 
        transition: opacity 100ms linear;
      }
      &:hover {
        .text {text-decoration: line-through}
      }
    }
  }

  @media(max-width: 480px){
    padding: 30px 20px 20px;

  }
`

class Header extends Component {

  componentDidMount(){
    this.animation();
  }
  
  animation = () => {
    const header = document.querySelector('header');
    TweenMax.fromTo( 
      header, 
      .5, 
      {autoAlpha: 0, y: -30 }, 
      {autoAlpha: 1, y: 0 , ease: Power1.easeOut})
  }
  
  render() {
    const { siteTitle, location } = this.props; 
    return (
      <HeaderView>
        <h1 className="web-title" data-text="Photographer" style={{ margin: 0 }}>
          <Link data-text="Photographer" to="/"> {siteTitle} </Link>
        </h1>
        <nav>
          { location.pathname === '/photographer/' && <Menu location={location}/>}
          { location.pathname !== '/photographer/' && <Link className="back" to="/"> Back </Link>}
        </nav>
      </HeaderView>
    )
  }
  
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header