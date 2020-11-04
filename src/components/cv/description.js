import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const DescriptionWrapper =  styled.div`
  margin: 40px 0px;
  p {
    margin-bottom:10px;
    line-height: 1.4;
    font-size:18px;
    letter-spacing: 1px;
    .stick {
  
      -webkit-animation: blink 500ms infinite; /* Safari 4+ */
      -moz-animation:    blink 500ms infinite; /* Fx 5+ */
      -o-animation:      blink 500ms infinite; /* Opera 12+ */
      animation:         blink 500ms infinite;
    }
  }
`


const Description = ({ready}) => {
  const sentence = useRef()
  sentence.current =`Results-oriented software engineer with 6 years experience with the most advanced technologies in development. 
  I'm focused on improving UX and product interfaces through finding the best approach to interactions.
  Code efficiency is a central feature of my work, as past projects have involved managing large amounts of data.`
  const counter = useRef();
  let interval = useRef();
  const [quote, setQuote] = useState('')

  useEffect(() => {
    counter.current = 0;
    interval.current = setInterval(() => {
      if(counter.current <= sentence.current.length - 1){
        setQuote(quote => quote + sentence.current[counter.current])
        counter.current++
      } else {
        clearInterval(interval)
        ready()
      }
      return () => clearInterval(interval.current)
    }, 20 )
  }, [ready])

  return (
  <DescriptionWrapper>
      <p>
        <span>{ quote }</span><span className="stick">|</span>
      </p>
    </DescriptionWrapper> 
  )
}

export default Description