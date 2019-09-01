import React from 'react'
import styled from 'styled-components'
import { navigate } from "gatsby"

const MenuLinkView = styled.li`
  cursor: pointer;
  font-size: 18px; 
  display: block;
  text-align: right;
  color: #323846;
  margin-bottom: 5px;
  &.active {
    text-decoration: line-through;
  }
  &:hover {
    text-decoration: line-through;
  }
`

const makeScrollTo = (to, location, name, closeMenu) => {
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

const MenuLink = (props) => <MenuLinkView><span onClick={ makeScrollTo.bind(null, props.to, props.location, props.name, props.closeMenu) }><span>[</span> { props.name } <span>]</span></span></MenuLinkView>


export default MenuLink;