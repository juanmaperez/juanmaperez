import React from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'

const ExperiencesWrapper =  styled.section`
  margin: 20px 0px;

  h2 {
    font-size: 44px;
    width: 100%;
    border-bottom: 1px solid #B7C8Cb;
    text-transform: uppercase;
    padding-bottom: 5px;
  }
`

const ExperienceItemWrapper = styled.div`
  margin: 30px 0px;
  .title-experience {
    letter-spacing: 1px;
    .name {
      line-height: 1.4;
      font-size: 22px;
      strong {
        color: #000;
      }
      span {
        color: #B7C8Cb;
      }
    }
    .date {
      color: #999;
    }
  }
  .description-experience {
    ul {
      padding: 20px 10px;
      li {
        font-size: 18px;
        margin-bottom: 10px;
        letter-spacing: 1px;
        line-height: 1.4;
      }
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
      <ExperiencesWrapper>
        <h2>Work Experience</h2>
        <ExperienceItemWrapper>
          <div className="title-experience">
            <p className="name"><strong>Sainsbury's Tech</strong> | <span>Software Engineer</span></p>
            <p className="date"><span>01/2020 | nowadays</span></p>
          </div>
          <div className="description-experience">
            <ul>
              <li>Components and view development using React, Redux, and Typescript.</li>
              <li>Update codebase to functional components using React Hooks.</li>
              <li>TDD with Jest and Enzyme. Creating reusable and isolated components using Storybook.</li>
              <li>Migrating the React project into NextJS to take advantage of SSR.</li>
              <li>Creation and improvement of our services in Go.</li>
              <li>Responsible of pairing sessions and onboarding of new colleagues.</li>
              <li>Development with new technologies such as GraphQL, Apollo, GatsbyJS y Prisma.</li>
              <li>CI/CD with SCRUM methodologies.</li>
            </ul>
          </div>
        </ExperienceItemWrapper>
        <ExperienceItemWrapper>
          <div className="title-experience">
            <p className="name"><strong>Colossus Bets</strong> | <span>Senior Front End Engineer</span></p>
            <p className="date"><span>06/2018 | 01/2020</span></p>
          </div>
          <div className="description-experience">
            <ul>
              <li>Development with Angular and React.</li>
              <li>State management with Redux and Ngrx.</li>
              <li>TDD with Jest and Enzyme.</li>
              <li>Mocked API with NodeJs and Express.</li>
              <li>Data management with RXJS.</li>
              <li>UI implementations for improving the UX.</li>
              <li>Microsites created with GatsbyJS, GraphQL and Apollo.</li>
              <li>Styling with Styled-Components and SASS.</li>
              <li>SCRUM methodologies.</li>
            </ul>
          </div>
        </ExperienceItemWrapper>
        <ExperienceItemWrapper>
          <div className="title-experience">
            <p className="name"><strong>Crealogix</strong> | <span>Front End Engineer</span></p>
            <p className="date"><span>11/2017 | 06/2018</span></p>
          </div>
          <div className="description-experience">
            <ul>
              <li>Development with Angular 5.</li>
              <li>Custom Implementations from the Angular Router.</li>
              <li>Develop new Modules for the main App.</li>
              <li>Fetching Data from API through HTTP requests.</li>
              <li>Styling with SASS.</li>
              <li>Tasks development based on SCRUM methodologies.</li>
            </ul>
          </div>
        </ExperienceItemWrapper>
        {/* <ExperienceItemWrapper>
          <div className="title-experience">
            <p className="name"><strong>InboundCycle</strong> | <span>Front End Developer</span></p>
            <p className="date"><span>11/2015 | 10/2017</span></p>
          </div>
          <div className="description-experience">
            <ul>
              <li>Development with React.</li>
              <li>Dashboard implementations for marketing results.</li>
              <li>Graphics with chart.js.</li>
              <li>Integration with different APIs like MailChimp, Hubspot, and others.</li>
              <li>Creating different Marketing Elements like Landing pages, emails or Blogs.</li>
              <li>Wordpress development.</li>
            </ul>
          </div>
        </ExperienceItemWrapper> */}
      </ExperiencesWrapper> 
    </animated.div>
  )
}