import React from 'react'
import Header from './header'
import Container from './container'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import '../style/fonts'
import Helmet from 'react-helmet'

export default ({ children, isFront, title }) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charset="utf-8" />
      <title>{title ? title : 'Kevin Miller'}</title>
    </Helmet>
    <SkipNavLink>Skip to content</SkipNavLink>
    <Header />
    <Container>
      <SkipNavContent />
      {title && <h1>{title}</h1>}
      {children}
    </Container>
  </>
)
