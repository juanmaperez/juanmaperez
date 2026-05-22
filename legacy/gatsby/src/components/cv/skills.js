import React from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'

const SkillsWrapper =  styled.section`
  transition: opacity 5s linear;
  margin: 50px 0px 0px;
  h2 {
    font-size: 44px;
    width: 100%;
    border-bottom: 1px solid #B7C8Cb;
    text-transform: uppercase;
    padding-bottom: 5px;
  }
  ul {
    padding: 40px 0px;
    li {
      letter-spacing: 1px;
      font-size: 18px;
      margin-bottom: 16px;
      letter-spacing: 1px;
      line-height: 1.4;
    }
  }
`

export default ({visible}) => {
  const {opacity, x} = useSpring({ 
    opacity : visible ? 1 : 0,
    x: visible ? 0 : -100
  })
  
  return (
    <animated.div style={{ opacity, transform: x.interpolate(x => `translateX(${x}px)`)}}>
      <SkillsWrapper>
        <h2>Skills</h2>
        <ul>
          <li>Animations with GreenSock, React-Spring and React-transitions</li>
          <li>Problem Solving and bug fixing</li>
          <li>Functional Programming</li>
          <li>UI implementations and UX focus</li>
        </ul>
      </SkillsWrapper>
    </animated.div>
  )
}