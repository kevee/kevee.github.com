import React from 'react'
import styled from '@emotion/styled'
import Layout from '../components/layout'

const Dl = styled.dl`
  dt {
    font-weight: bold;
    margin-right: 1rem;
    font-family: 'Public Sans bold';
  }
  dd,
  dt {
    display: inline-block;
  }
`

export default () => (
  <Layout title="Contact">
    <p>Want to get in touch?send me an email:</p>
    <Dl>
      <dt>
        Regarding the{' '}
        <a href="https://covidtracking.com">COVID Tracking Project</a>:
      </dt>
      <dd>
        <a href="mailto:kevin.miller@covidtracking.com">
          kevin.miller@covidtracking.com
        </a>
      </dd>
      <dt>Other email:</dt>
      <dd>
        <a href="mailto:kevin@kevee.net">kevin@kevee.net</a>
      </dd>
    </Dl>
    <p>You can also find me on Github:</p>
    <p>
      <a href="https://github.com/kevee">kevee</a>
    </p>
  </Layout>
)
