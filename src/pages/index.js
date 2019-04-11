import React from 'react'
import Layout from '../components/layout'
import styled from '@emotion/styled'
import me from '../assets/images/me.jpg'

const IntroParagraph = styled('p')`
  font-size: 72px;
  margin: 2rem 0;
  font-family: Public Sans black;
`

const HomeParagraph = styled('p')`
  font-size: 1.2rem;
`

const MeImage = styled('img')`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  float: right;
  margin: 0 0 0.5rem 0.5rem;
`

const IndexPage = () => (
  <Layout>
    <IntroParagraph>Let's build a web for everyone.</IntroParagraph>
    <HomeParagraph>
      <MeImage src={me} alt="" />
      Working as a web developer in a university means more than writing code.
      It means asking students waiting in line for coffee about how they find
      what class to take. I write small, manageable, and non-repeating code to
      solve problems.
    </HomeParagraph>
    <HomeParagraph>
      I am passionate about usability and accessibility. I started the first
      JavaScript-based accessibility project called Quail. I believe we can and
      should have a web that works for everyone.
    </HomeParagraph>
  </Layout>
)

export default IndexPage
