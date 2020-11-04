import React from 'react'
import styled from 'styled-components'
import { navigate } from "gatsby"

const MenuLinkView = styled.li`
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
  text-align: right;
  button {
    font-size: 18px; 
    color: #323846;
    background:none;
    border: 0px;
    &.active {
    text-decoration: line-through;
  }
    &:hover {
      text-decoration: line-through;
    }
  } 
`

const MenuLink = ({ to, location, name, closeMenu }) => {
  const makeScrollTo = () => {
    if( to === '/' && to !== location.pathname){
      navigate(to)
    } else {
      const element = document.querySelector(`.block-${name}`)
      closeMenu()
      if (typeof window !== `undefined`) {
        window.scroll({
          top: getElementOffset(element).y,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
  const getElementOffset = (element) => {
    let xPosition = 0;
    let yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    
    return { x: xPosition, y: yPosition };
  }
  return (
    <MenuLinkView>
      <button className="unstyled" role="link" onClick={ makeScrollTo } onKeyDown={makeScrollTo}>
        <span>[ </span>{ name } 
        <span> ]</span>
      </button>
    </MenuLinkView>
  )
}


export default MenuLink;