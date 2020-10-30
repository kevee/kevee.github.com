import React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Header from '../components/header'
import Container from '../components/container'
import FrontpageHero from '../components/frontpage'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import '../style/fonts'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const IntroParagraph = styled('p')`
  font-size: 72px;
  margin: 2rem 0;
  font-family: Public Sans black;
`

const HomeParagraph = styled('p')`
  font-size: 1.2rem;
`

const HomeList = styled('ul')`
  font-size: 1.1rem;
`


const IndexPage = ({ data }) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charset="utf-8" />
      <title>Kevin Miller</title>
    </Helmet>
    <SkipNavLink>Skip to content</SkipNavLink>
    <FrontpageHero images={data.allImageSharp.edges} />
    <Header isFront={true} />
    <Container>
      <SkipNavContent />
      <IntroParagraph>Let's build a web for everyone.</IntroParagraph>
      <HomeParagraph>
        I am passionate about usability and accessibility. I believe we can and
        should have a web that works for everyone. As a developer at a small
        state university, I saw first-hand the impact that clear communication
        and thoughtful design can have on people's lives.
      </HomeParagraph>

      <h2>What I've been up to</h2>
      <HomeParagraph>
        Since 2019 I've been working on several passion projects. These include:
      </HomeParagraph>
      <HomeList>
        <li>
          Working as the website lead for the{' '}
          <a href="https://github.com/COVID19Tracking/website">
            COVID19 Tracking Project
          </a>{' '}
          .
        </li>
        <li>
          A{' '}
          <a href="https://mocoloco.org">
            listing of all public agencies and services
          </a>{' '}
          in Monterey County, California.
        </li>
        <li>
          <a href="https://neaps.js.org/">Neaps</a>, a tidal height predictor
          for Javascript.
        </li>
        <li>
          <a href="https://github.com/gatsbyjs/gatsby/commits?author=kevee">
            Helping the Gatsby team
          </a>{' '}
          add and reorganize documentation.
        </li>
      </HomeList>

      <h2>Let's work together</h2>
      <HomeParagraph>
        I am available <Link to="/contact">to work on your next project</Link>.
        I currently love:
      </HomeParagraph>
      <HomeList>
        <li>Apps in higher education, history, archives, or the sciences</li>
        <li>
          Things that benefit non profits or organizations for social and
          environmental justice
        </li>
        <li>
          Projects that use React and <a href="https://gatsbyjs.org">Gatsby</a>
        </li>
      </HomeList>
    </Container>
  </>
)

export default IndexPage

export const query = graphql`
  {
    allImageSharp(sort: { fields: [original___src] }) {
      edges {
        node {
          ... on ImageSharp {
            fixed(width: 1200, grayscale: true, quality: 50) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
