import React from 'react'
import Container from './container'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const HeaderContainer = styled(Container)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  h4 {
    font-family: 'Public Sans thin';
    margin: 0;
    font-weight: 100;
  }
`

const Navigation = styled('ul')`
  list-style-type: none;
  margin: 0;
  li {
    margin: 0;
    padding-right: 1.5rem;
    display: inline-block;
  }
  a {
    color: #444;
  }
`

export default () => (
  <HeaderContainer>
    <h4>Kevin Miller</h4>
    <Navigation>
      <li>
        <Link to="/work">Work</Link>
      </li>
    </Navigation>
  </HeaderContainer>
)
