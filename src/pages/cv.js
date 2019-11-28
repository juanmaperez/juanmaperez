import React, { useState } from "react"
import Layout from "./../layouts/layout"
import SEO from "./../components/seo"
import styled from 'styled-components'
import Personal from './../components/cv/personal'
import Description from './../components/cv/description'
import Experiences from './../components/cv/experiences'
import Education from './../components/cv/education'
import Skills from './../components/cv/skills'

const CvPageWrapper = styled.div`
    background: #fbf9f3;
    width: 100%;
    min-height: 100vh;
    .cv-container {
      width: 60%;
      margin: 0px auto;
      padding: 120px 0px;
      max-width: 1000px;
      background: #fbf9f3;
    }
`


const CvPage = ({ location }) => {
  const [visible, setVisible] = useState(false) 

  const ready = () => setVisible(true)

  return (
    <Layout location={location}>
    <SEO title="CV" 
          description="Personal Website by Juanma Perez, Front End developer at Colossus Bets, London" 
          keywords={[`Juanma Perez`, `javascript`, `developer`]} 
      />
      <CvPageWrapper>
        <div className='cv-container'>
          <Personal />
          <Description ready={ready} />
          <Experiences visible={visible} />
          <Education visible={visible} />
          <Skills visible={visible} />
        </div>
      </CvPageWrapper> 
    </Layout>
  )
}

export default CvPage;