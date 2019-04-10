import React from 'react'
import Header from './header'
import Container from './container'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

export default ({ children, title }) => (
  <>
    <SkipNavLink>Skip to content</SkipNavLink>
    <Header />
    <Container>
      <SkipNavContent />
      {title && <h1>{title}</h1>}
      {children}
    </Container>
  </>
)
