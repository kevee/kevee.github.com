import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import '../style/fonts'
import Helmet from 'react-helmet'

export default ({data}) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charset="utf-8" />
      <title>CTP Emoji</title>
    </Helmet>
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <SkipNavContent />
      <h1>CTP has {data.allEmoji.nodes.length} Emoji</h1>
      <p>This list is updated once a day... patience</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.allEmoji.nodes.map(({name, image}) => (
            <tr key={name}>
              <td><code>:{name}:</code></td>
              <td><img src={image} alt=""/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  </>
)

export const query = graphql`{
  allEmoji(sort: {fields: name}) {
    nodes {
      name
      image
    }
  }
}
`