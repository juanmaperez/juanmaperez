import React, { Component } from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components'
import { TweenMax, Linear, Power1 } from 'gsap';

import { isMobile } from 'react-device-detect';

import ScrollMagic from 'ScrollMagic'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min';


const WorkItemView = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  justify-content: ${ props => props.top % 2 ? 'flex-start' : 'flex-end' };

  .work-container {
    width: 600px;
    height: 900px;
    position: absolute;
    max-height:100%;
    overflow:hidden;

    .image-wrapper {
      z-index: 6;
      top: 0;
      position: absolute;
      width: 600px;
      height: 900px;
  
      .title {
        z-index: 5;
        position: absolute;
        transform: rotate(-90deg);
        width: 180px;
        bottom: 80px;
         ${ props => Number(props.top) % 2 === 0 ? 'right: -88px' : 'left: -88px;' };
        padding: 5px 10px;
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: lighter;
        color: #666;
        text-transform: uppercase;
        background: #fbf9f3;
        font-family: 'Mfred';
      }
      .image {
        top: -150px;
        position: relative;
        height: 1100px;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center center !important;
      }
    }
  }

 
  @media(max-width: 1300px){
    height: 900px;
    .work-container {
      height: 700px !important;
      width: 500px !important;
      background: grey;
      .image-wrapper { 
        height: 700px !important;
        width: 500px !important;
        .image {
          height: 900px;
        } 
      }
    }
  }


  @media(max-width: 768px){}
  @media(max-width: 480px){
    height: 600px;
    .work-container {
      height: 475px !important;
      width: 350px !important;
      background: grey;
      .image-wrapper { 
        height: 475px !important;
        width: 350px !important;
        .image {
          height: 600px;
        } 
      }
    }
  }

`

class WorkItem extends Component {


  componentDidMount(){
    this.imageAnimation()
    this.imageWrapperAnimation()
  }

  

  imageAnimation(){
    const { work, top } = this.props;

    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.fromTo(`.image-${work.type}-${top}`, 1, {y: 0}, {y: 140, ease: Linear.easeNone })
    
    new ScrollMagic.Scene({
      triggerElement: `.wrapper-${work.type}-${top}`,
      triggerHook: .1,
      duration: '110%'
    })
    .setTween(tween)
    .addTo(controller)
  }

  imageWrapperAnimation(){
    const { work, top } = this.props;
    const moveUp = isMobile ? -60 : -200;
    const controller = new ScrollMagic.Controller()
    const tween = TweenMax.fromTo(`.work-${work.type}-${top}`, 1, {y: 0}, {y:  top < 4  ? (-60 * top) : ( moveUp + (top * -10)) , ease: Power1.easeIn })
    
    new ScrollMagic.Scene({
      triggerElement: `.work-${work.type}-${top}`,
      triggerHook: .9,
      duration: '90%'
    })
    .setTween(tween)
    .addTo(controller)
  }

  render(){
    const { work, top } = this.props;
    return(
      <WorkItemView top={top}>
          <div className={`work-container work-${work.type}-${top}`}>
            <Link to={`${work.path}`} className={`image-wrapper wrapper-${work.type}-${top}`}>
              <div className={`image image-${work.type}-${top}`} style={{'background': `url(${work.thumbnail.childImageSharp.fluid.src})`}}>
              </div>
              <span to={`${work.path}`} className="title">{ work.title }</span>
            </Link>
          </div>
      </WorkItemView>
    )
  }
}

export default WorkItem;