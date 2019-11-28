import React from 'react'
import styled from 'styled-components'
import me from './../../assets/images/juanma_perez.jpg'
import { useSpring, animated } from 'react-spring'

const PersonalWrapper = styled.div`
    display: flex;
    align-items:center;
    .image {
      width: 200px;
      height: 200px;
      background-size: cover !important;
      border-radius: 50%;
      overflow:hidden;
      margin-right: 20px;
    }
    .data {
      h4 {
        letter-spacing: 1px;
        font-size: 44px;
        text-transform: uppercase;
        margin-bottom: 0px;
      }
      h5 {
        letter-spacing: 1px;
        font-size: 36px;
        text-transform: uppercase;
        margin-bottom: 20px;
        color: #B7C8Cb;
      }
      p {
        line-height: 1.4;
        font-size:18px;
      }
    }
  
`

const Personal = () => {
  const props = useSpring({
    from: { x: -300}, 
    to: {x : 0}
  })
  return (
    <PersonalWrapper>
      <animated.div style={props}>
        <div className="image" style={{background: `url(${me})`}}></div>
      </animated.div>
      <div className='data'>
        <div>
          <h4>Juanma Perez</h4>
          <h5>Software Engineer</h5>
        </div>
        <p>juanmaperezvar@gmail.com</p>
        <p>07447 881 161</p>
        <p>https://juanmaperez.me</p>
      </div>
    </PersonalWrapper>
  )
}

export default Personal
