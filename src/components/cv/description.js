import React from 'react'
import styled from 'styled-components'

const DescriptionWrapper =  styled.div`
  margin: 40px 0px;
  p {
    margin-bottom:10px;
    line-height: 1.4;
    font-size:18px;
    letter-spacing: 1px;
  }
`


const Description = () => (
  <DescriptionWrapper>
    <p>I have worked as a software engineer for the last 6 years, adquiring experience with every client I worked for.
    I started as a freelance in Seville until I moved to Barcelona in 2015 to grow proffesionally 
    and get experience with the most advanced technologies in development.</p>
    <p>During this years, I have been improving the user experience for different products through the interfaces and the 
    best approaches on interactions.
    Also I have managed huge amounts of data, and the efficiency became one of the most important things on the decission process and roadmap
    to follow for keeping the best performance in Apps.</p>
  </DescriptionWrapper>
)

export default Description