import React, {Component} from 'react'
import styled from 'styled-components'
import { TweenMax } from 'gsap';

import Image from './../image'
import girl from './../../assets/images/girl.jpg'

import { Controller, Scene } from 'react-scrollmagic';
import ScrollMagic from 'ScrollMagic'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min';

const AboutBlockView = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: #fbf9f3;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .about-wrapper {
    background: #fbf9f3;
    position: relative;
    top: 0;
    left: 0;
    -webkit-clip-path: inset(0 0 0 0);
    clip-path: inset(0 0 0 0);
    .image {
      position: fixed;
      right: 120px;
      bottom: 10px !important;
      width: 32vw;
      &.absolute {
        position: absolute;
      }
      img {
        max-width: 100%;
      }
    }
    .intro-text {
      position: relative;
      z-index: 10;
      width: 75%;
      font-size: 6vw;
      color: #f0d0d5;
      line-height: 1.2;
      padding: 100vh 120px 50px;
      box-sizing: border-box;
      p {
        mix-blend-mode: difference;
        margin-bottom: 100px;
        opacity: 0;
        transition: opacity 600ms linear;
        &.fade-in {
          opacity: 1;
        }
   
        strong, a {
          color: #f0d0d5;
          -webkit-text-stroke: 0.0002em #f0d0d5;
          &:hover {text-decoration: underline}
        }
      }
    }
  }



  @media(max-width: 1080px) {
    padding-top:200px;
    min-height: 400px;
    .about-wrapper {
      .intro-text {
        padding: 20px;
        font-size: 9vw;
        p {
          margin-bottom: 80px;
        }
      }
      .image {
        position: fixed;
        right: 70px;
        bottom: 35px !important;
        width: 60vw;
      }
    }
  }
  @media(max-width: 1024px) {
    .about-wrapper {

      .intro-text {
        width: 85%;
        p {
          font-size: 9vw;
        }
      }
    }
  }
  @media(max-width: 768px) {
    padding-top:200px;
    min-height: 400px;
    .about-wrapper {
      .intro-text {
        font-size: 9vw;
        width: 85%;
        p {
          margin-bottom: 50px;
        }
      }
    }
  }
  @media(max-width: 480px) {
    padding-top:120px;
    min-height: ${props => props.height/1.2}px;
    .about-wrapper {
      .intro-text {
        padding:10px;
        -webkit-text-stroke: 0px #323846;
        font-size: 9vw;
        p {
          margin-bottom: 40px;
          strong {
            color: #323846;
            -webkit-text-stroke: 0px #323846;
          }
        }
      }
      .image {
        right: 20px;
        width: 70vw;
      }
    }
  }
`

class AboutBlock extends Component {

  componentDidMount(){
    this.showImage()
    this.hideImage()
  }



  showImage = () => {
    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.fromTo('.image', 0.6, {autoAlpha: 0, x: 60}, {autoAlpha: 1, x: 0})

    new ScrollMagic.Scene({
      triggerElement: '.about-wrapper',
      triggerHook: .19,
      duration: '20%'
    })
    .setTween(tween)
    .addTo(controller)
  }

  hideImage(){
    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.to('.image', .00001, {className: '+=absolute'})

    new ScrollMagic.Scene({
      triggerElement: '.works-section',
      triggerHook: 1,
    })
    .setTween(tween)
    .addTo(controller)
  }

  render(){
    const { height } = this.props;
    return (
      <AboutBlockView className="block-about" height={height}>
        <div className="about-wrapper">
    
          <div className="image">
            <Image imageUrl={ girl } title="lady madrid" />
          </div>
          
          <div className="intro-text">
            <Controller>
              <Scene classToggle={'fade-in'} triggerHook={0.80}>
                <p>I'm <span>Lady Madrid </span>, a photographer from Seville and based in London looking for new experiences.</p>
              </Scene>
            </Controller>
            <Controller>
              <Scene classToggle={'fade-in'} triggerHook={0.80}>
                <p>I've been my whole life capturing moments into my camera, some funny, some sad and some really special.</p>
              </Scene>
            </Controller>    
            <Controller>
              <Scene classToggle={'fade-in'} triggerHook={0.80}>
                <p>It's this site where I chose to publicy my work with all the people who love photography as much as me.</p> 
              </Scene>
            </Controller>    
            <Controller>
              <Scene classToggle={'fade-in'} triggerHook={0.80}>
                <p>Also you can find me in social media <br/>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ladymadrid">Instagram</a>,
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ladymadrid">Behance</a> 
                &nbsp;or <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ladymadrid">Twitter</a>.</p>
              </Scene>
            </Controller>  
          </div> 
        </div>
      </AboutBlockView>
    )
  }
} 

export default AboutBlock;