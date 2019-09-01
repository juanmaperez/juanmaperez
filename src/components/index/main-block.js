import React, { Component } from 'react';
import styled from 'styled-components';

import { Power1, TimelineMax, TweenMax, Linear } from 'gsap'

import backgroundSecond from './../../assets/images/first.jpg'
import backgroundFirst from './../../assets/images/second.jpg'

import ScrollMagic from 'ScrollMagic'

const MainBlockView = styled.div`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  &.first {
    background-attachment: fixed !important;
    background-size: cover !important;
    background-position: center center !important;
    background: url(${backgroundFirst});
  }  
  &.second {
    background-attachment: fixed !important;
    background-size: cover !important;
    background-position: center center !important;
    background: url(${backgroundSecond});
  }
  .main-block-cover {
    background: #fbf9f3;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    transform-origin: 0 0;
    &.no-visible {
      display: none;
    }
  }
  .main-list {
    position: absolute;
    bottom: 50px;
    right: 120px;
    padding: 0px;
    li {
      font-size: 18px;
      margin-bottom: 5px;
      text-align: right;
      cursor: pointer;
      color: #323846;
      span { 
        transition: all 100ms linear;
      }
      &:hover {
        .text {text-decoration: line-through}
      }
    }
  }

  @media(min-width: 1200px){}
  @media(max-width: 1199px){}
  @media(max-width: 768px){}
  @media(max-width: 520px){
    &.first {
      background-attachment: scroll !important;
    }  
    &.second {
      background-attachment: scroll !important;
    }
    .main-list {
      right: 20px;
      bottom: 10px;
    }
  }
`


class MainBlock extends Component {

  componentDidMount(){
    if(!this.props.animationCompleted){
      this.animation();
    }
    this.removeSocial();
  }

  animation = () => {
    const tl = new TimelineMax()
    tl
    .fromTo('.first', 0.4,{ autoAlpha: 0 },{autoAlpha: 1 })
    .fromTo('.main-block-cover', .5, { scaleX: 0 }, { className: '-=no-visible', scaleX: 1, ease: Power1.easeIn}, '+=0.9')
    .to('.first', 0.2,{className:"+=second"})
    .to('.second', 0.1,{className:"+=first"})
    .fromTo('.main-block-cover', .5, { scaleY: 1 }, { scaleY: 0, ease: Power1.easeIn})
    .staggerFromTo('.main-list li', .6, {y: 20, autoAlpha: 0 },{y: 0, autoAlpha: 1, ease: Linear.easeNone, onComplete: this.animationIsCompleted }, 0.2)
    .delay(2)
  }

  removeSocial = () =>{
    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.fromTo('.main-list', 0.6, {autoAlpha: 1 }, {autoAlpha: 0})

    new ScrollMagic.Scene({
      triggerElement: '.main-list',
      triggerHook: .2,
      duration: '10%'
    })
    .setTween(tween)
    .addTo(controller)
  }


  animationIsCompleted = () => {
    this.props.markAsCompleted()
  }

  render(){
    return (
      <MainBlockView className="first block-home">
        <div className="main-block-cover no-visible"></div>
        <ul className="main-list">
          <li><span>Ig: [</span> <span className="text">@ladyphoto</span> <span>]</span></li>
          <li><span>Tw: [</span> <span className="text">@ladyMadrid</span> <span>]</span></li>
          <li><span>Be: [</span> <span className="text">/ladyMadridPhoto</span> <span>]</span></li>
        </ul>
      </MainBlockView>
    )
  }
}

export default MainBlock;