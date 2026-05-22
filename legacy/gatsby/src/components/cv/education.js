import React from 'react'
import styled from 'styled-components'
import {useSpring, animated } from 'react-spring'

const EducationWrapper =  styled.section`
  margin: 40px 0px;
  transition: opacity 5s linear;
  h2 {
    font-size: 44px;
    width: 100%;
    border-bottom: 1px solid #B7C8Cb;
    text-transform: uppercase;
    padding-bottom: 5px;
  }
`

const Education = styled.div`
  margin: 40px 0px;
  .title {
    line-height: 1.4;
    font-size: 22px;
    letter-spacing: 1px;
    strong {
      color: #000;
    }
    span {
      color #B7C8Cb;
    }
  }
  .description {
    margin: 20px 0px;
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 1.4;
  }
`

export default ({visible}) => {
  const {opacity, x} = useSpring({ 
    opacity : visible ? 1 : 0,
    x: visible ? 0 : -100
  })

  return (
    <animated.div style={{ opacity, transform: x.interpolate(x => `translateX(${x}px)`)}}>
      <EducationWrapper>
        <h2>Education</h2>

        <Education>
          <div className="title"><strong>Software Development MEAM/MERN stack</strong> | <span>Iron Hack</span></div>
          <div className="description">
            NodeJs | Angular | React | Redux | GatsbyJs | ExpressJs | Git | MongoDB | SASS | Styled-components
          </div>
        </Education>
        <Education>
          <div className="title"><strong>Web Development</strong> | <span>CEI</span></div>
          <div className="description">
            HTML5 | CSS3 | Javascript | jQuery | Ajax | PHP | MySQL | Bootstrap | RWD | Graphic Design | Web Design
          </div>
        </Education>
      </EducationWrapper>
    </animated.div>
  )
}