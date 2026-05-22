import { Link } from 'gatsby';
import React, { Component } from 'react';
import styled from 'styled-components'
import MenuLink from'./menuLink'

const MenuView = styled.div`
  position: relative;
  .menu-list {
    opacity: 0;
    display: none;
    transition: all 400ms linear;
    position: absolute;
    top: 40px;
    right: 5px;
    width: 150px;
    &.open {
      display:block;
      opacity: 1;
    }
    ul {
      list-style: none;
      li {
        cursor: pointer;
        text-align: right;
        button {
          font-size: 18px; 
          color: #323846;
          background:none;
          border: 0px;
          &:hover {
            text-decoration: line-through;
          }
        }
      }
    
    }
  }
  
  #nav-icon {
    background: none;
    border: 0;
    margin: 5px;
    width: 35px;
    height: 20px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
    .bar {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: #323846;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: .25s ease-in-out;
      -moz-transition: .25s ease-in-out;
      -o-transition: .25s ease-in-out;
      transition: .25s ease-in-out;
      &:nth-child(1) { top: 0px }
      &:nth-child(2), &:nth-child(3) { top: 9px }
      &:nth-child(4) { top: 18px }
    }
    &.open {
      .bar {
        &:nth-child(1) {
          top: 18px;
          width: 0%;
          left: 50%;
          opacity: 0;
        }
        
        &:nth-child(2) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        
        &:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        
        &:nth-child(4) {
          top: 18px;
          width: 0%;
          left: 50%;
          opacity:0;
        }
      }
    }
  }
`


class Menu extends Component {

  state = {
    open: false
  }

  toggleMenu = () =>{
    const { open } = this.state;
    this.setState(()=>({
      open: !open
    }))
  }

  render(){
    const { open } = this.state;
    return (
      <MenuView >
        <button className={ open ? 'open': ''} id="nav-icon" onClick={ this.toggleMenu } onKeyDown={ this.toggleMenu }>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={ open ? 'open menu-list': 'menu-list'}>
          <ul>
            <MenuLink name="home" to={'/'} location={this.props.location } closeMenu={this.toggleMenu.bind(this)} />
            <MenuLink name="about" to={'/about'} location={this.props.location } closeMenu={this.toggleMenu.bind(this)} />
            <MenuLink name="works" to={'/works'} location={this.props.location } closeMenu={this.toggleMenu.bind(this)} />
            <MenuLink name="contact" to={'/contact'} location={this.props.location } closeMenu={this.toggleMenu.bind(this)} /> 
            <li>
              <Link to={'/blog'}>
                <button className="unstyled" role="link">
                  <span>[ </span>Blog 
                  <span> ]</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </MenuView>
    )
  }
} 

export default Menu;