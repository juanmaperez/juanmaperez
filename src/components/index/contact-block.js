import React, { Component } from 'react';
import styled from 'styled-components';

import { TweenMax, Power1 } from 'gsap';

import ScrollMagic from 'ScrollMagic'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min';


const ContactBlockView = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fbf9f3;
  position: relative;
  overflow: hidden;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #B7C8Cb;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: transparent; 
    display: flex;
    flex: 2;
    flex-direction: row;
    width: 100%;
    height: 100%;

    .left, .right {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .left {
      flex: .75;
      justify-content: center;
      .month, .year { 
        color: #fff;
        font-size: 400px;
        font-family: 'Mfred';
        text-transform: uppercase;
        text-align: right;
        width: 100%;
        display:block;
        line-height: .85;
      }
    }
    .right {
      flex: 1.25;
      justify-content: center;
      padding: 50px;
      color: #fff;
      font-size: 32px;
      line-height: 1.4;
      .top {
        letter-spacing: 1px;
        padding: 20px 0px;
        border-bottom: 3px solid #fff; 
      }
      .bottom {
        padding: 20px 0px;
        span { padding: 0px 10px;}
        i {
          opacity: :.7; 
          font-style: normal;
        }
      }
    }
  }
  @media(max-width: 1300px){
    .content {
      padding: 50px;
      box-sizing: border-box;
      .left {
        .month, .year {
          font-size: 320px;
        }
      }
    }
  }

  @media(max-width: 1024px){
    .content {
      flex-direction: column;
      justify-content: center;
      .left {
        flex-direction: row;
        flex: 1;
        padding: 50px 0px 0px;
        justify-content: flex-start;
        align-items: flex-end;
        .month , .year {
          text-align: left;
          width: min-content;
          display:inline;
        }
      }
      .right {
        flex: 1;
        padding: 20px 0;
        justify-content: flex-start;
      }
    }
  }

  @media(max-width: 480px){
    .content {
      padding: 50px 20px;
      .left {
        padding: 50px 0px 10px;

        .month , .year {
          font-size: 100px;
        }
      }
      .right {
        padding: 0px 0px 30px;
        font-size: 20px;
      }
    }
  }

` 

class ContactBlock extends Component {

  componentDidMount(){
    this.coverAnimation();
    this.contentAnimation();
  }

  coverAnimation = () => { 
      const controller = new ScrollMagic.Controller()
      const tween = TweenMax.fromTo(`.block-contact .cover`, 1, {  scaleY: 0}, { scaleY: 1, ease: Power1.easeIn })
      
      new ScrollMagic.Scene({
        triggerElement: `.block-contact`,
        triggerHook: .9,
        duration: '70%'
      })
      .setTween(tween)
      .addTo(controller)
  }

  contentAnimation = () => {
    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.fromTo(`.block-contact .content`, 1, { y: 100, autoAlpha: 0}, { y: 0, autoAlpha: 1, ease: Power1.easeIn })
    
    new ScrollMagic.Scene({
      triggerElement: `.block-contact`,
      triggerHook: .2,
      duration: '15%'
    })
    .setTween(tween)
    .addTo(controller)
  } 

  render(){
    return(
      <ContactBlockView className="block-contact">
        <div className="cover"></div>
        <div className="content">
          <div className="left">
            <span className="month">Sept</span>
            <span className="year">'19</span>
          </div>
          <div className="right">
            <div className="top">
              <p>I'm available for freelance works.</p>
              <p>Say hello hi@ladymadrid.com</p>
            </div>
            <div className="bottom">
              <span>Be </span> <i>|</i> <span> Ig </span> <i>|</i> <span> Tw </span>  
            </div>
          </div>
        </div>
      </ContactBlockView>
    )
  }
}

export default ContactBlock;