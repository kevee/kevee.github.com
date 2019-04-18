import React from 'react'
import Layout from '../components/layout'
import styled from '@emotion/styled'

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

const IndexPage = () => (
  <Layout isFront={true}>
    <IntroParagraph>Let's build a web for everyone.</IntroParagraph>
    <HomeParagraph>
      I am passionate about usability and accessibility. I started a JavaScript
      accessibility project called{' '}
      <a href="https://github.com/quailjs/quail">Quail</a>, which now lives in
      in{' '}
      <a href="https://github.com/dequelabs/axe-core">
        other automated accessibility checkers
      </a>
      . I believe we can and should have a web that works for everyone.
    </HomeParagraph>

    <h2>Let's work together</h2>
    <HomeParagraph>
      I am taking a break from my full-time gig as lead developer in a small
      university. I am living in Argentina, and available to work on your next
      project. I currently love:
    </HomeParagraph>
    <HomeList>
      <li>
        Projects that use React and <a href="https://gatsbyjs.org">Gatsby</a>
      </li>
      <li>Apps in higher education, history, archives, or the sciences</li>
      <li>
        Things that benefit non profits or organizations for social and
        environmental justrice
      </li>
    </HomeList>
  </Layout>
)

export default IndexPage
