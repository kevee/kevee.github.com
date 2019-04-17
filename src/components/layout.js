import React from 'react'
import Header from './header'
import Container from './container'
import FrontpageHero from './frontpage'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import '../style/fonts'

export default ({ children, isFront, title }) => (
  <>
    <SkipNavLink>Skip to content</SkipNavLink>
    {isFront && <FrontpageHero />}
    <Header isFront={isFront} />
    <Container>
      <SkipNavContent />
      {title && <h1>{title}</h1>}
      {children}
    </Container>
  </>
)
