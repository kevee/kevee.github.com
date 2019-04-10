import React from 'react'
import Container from './container'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

const HeaderWrapper = styled('header')`
  margin: 1rem 0;
`

const HeaderContainer = styled(Container)`
  h4 {
    font-family: 'Public Sans thin';
    margin: 0;
    font-weight: 100;
  }
`

const Navigation = styled('ul')`
  list-style-type: none;
  margin: 0.5rem 0;
  font-family: 'Public Sans thin';
  li {
    margin: 0;
    padding-right: 1.5rem;
    display: inline-block;
  }
  a {
    color: #444;
  }
`

const Brand = styled('h2')`
  font-family: 'Public Sans thin';
  margin: 0;
  a {
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export default () => (
  <HeaderWrapper>
    <HeaderContainer>
      <Brand>
        <Link to="/">Kevin Miller</Link>
      </Brand>
      <Navigation>
        <li>
          <Link to="/resume">Resume</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </Navigation>
    </HeaderContainer>
  </HeaderWrapper>
)
