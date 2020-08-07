import React from 'react'
import Layout from '../components/layout'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import bp from '../style/breakpoints'

const TimeBox = styled(Box)`
  font-weight: 700;
  font-family: 'Public Sans black';
  ${bp({
    marginBottom: ['1.5rem', '0'],
  })}
`

const ResumeItemFlex = styled(Flex)`
  margin-bottom: 2rem;
  ul {
    ${bp({
      marginLeft: ['2rem', '0'],
    })}
  }
`

const ResumeItem = ({ time, children }) => (
  <ResumeItemFlex flexWrap="wrap">
    <TimeBox width={[1, 1 / 4]} pr={[0, 4]}>
      {time}
    </TimeBox>
    <Box width={[1, 3 / 4]}>{children}</Box>
  </ResumeItemFlex>
)

export default () => (
  <Layout title="Resume">
    <h2>Education</h2>
    <ResumeItem time="1998-2002">
      B.A. Social History, Cal State Monterey Bay
    </ResumeItem>
    <h2>Employment history</h2>
    <ResumeItem time="2020 - Current">
      <h3>
        Website Lead —{' '}
        <a href="http://covidtracking.com/">The COVID Tracking Project</a>
      </h3>
      <p>
        As the web team lead, I coordinate designers, developers, and data entry
        specialists to produce the most accurate website tracking COVID-19 in
        the United States. My team has 15-30 members at any time, within a
        project of over 300 volunteers.
      </p>
    </ResumeItem>
    <ResumeItem time="2007-2019">
      <h3>
        Web Developer —{' '}
        <a
          href="https://csumb.edu/web"
          data-smart-underline-link-color="rgb(76, 107, 131)"
          data-smart-underline-link-background-position="80"
          data-smart-underline-link-always=""
        >
          Cal State Monterey Bay
        </a>
      </h3>
      <p>
        I built and maintained custom web applications for the university,
        including Customer Relationship Management, Content Management Systems,
        business proecess mapping, and crazy organizational hierarchy widgets
        drawn with{' '}
        <a
          href="http://d3js.org/"
          data-smart-underline-link-color="rgb(76, 107, 131)"
          data-smart-underline-link-background-position="81"
          data-smart-underline-link-always=""
        >
          D3
        </a>
        .
      </p>
      <p>
        As a long-term member of the web team, I hired two of the first User
        Experience professionals in the entire California State University
        system. They direct all my development work. We are responsible for the
        entire campus website across all departments.
      </p>
      <p>
        I maintained and integrated with old legacy systems. SOAP and CSV files
        are my frenemies. I've also built modern message queued or PubSubHub
        integration broker solutions for real-time integration.
      </p>
      <p>My current development work is GatsbyJS, NodeJS, and React.</p>
    </ResumeItem>
    <ResumeItem time="2010-2012">
      <h3>
        Lead Developer —{' '}
        <a
          href="https://app.calstates4.com/"
          data-smart-underline-link-color="rgb(76, 107, 131)"
          data-smart-underline-link-background-position="80"
          data-smart-underline-link-always=""
        >
          California State University S4 Project
        </a>
      </h3>
      <p>
        During my tenure at Cal State Monterey Bay, I developed a tool for
        students to register for placements in Service Learning and internship
        programs. The CSU Chancellor's office picked up the project, and I
        developed a single tool for all 24 campuses. After the project gained
        enough momentum, we hired a position to take it up full time.
      </p>
    </ResumeItem>
    <ResumeItem time="2004-2005">
      <h3>Farmer — Ono Loa Orchards</h3>
      <p>
        Lived in an eight-foot-by-eight-foot shack on the Big Island of Hawaii.
        Grew <a href="https://en.wikipedia.org/wiki/Jackfruit">jackfruit</a> and
        lychee.
      </p>
    </ResumeItem>
    <ResumeItem time="1997-1999">
      <h3>Webmaster — Atascadero Unified School District</h3>
      <p>
        Built and maintained websites for the entire school district. Wrote
        scripts in Lasso for WebStar. None of these skills are at all useful
        anymore.
      </p>
    </ResumeItem>
    <ResumeItem time="1995">
      <h3>Programmer — Tristar communications</h3>
      <p>
        Converted legal documents from the state of California into a custom
        Post Script language.
      </p>
    </ResumeItem>
    <h2>Public Service &amp; Projects</h2>

    <ResumeItem time="2016-2019">
      <h3>Chair — Surfrider Foundation, Monterey Chapter</h3>
      <p>
        I lead a rag-tag group of volunteers who are passionate about protecting
        the coastline and beaches. I write grants, manage communications, and
        build new programs for a growing conservation movement.
      </p>
    </ResumeItem>

    <ResumeItem time="2014">
      <h3>Salinas River Documentation project</h3>
      <p>
        Set out to document the entirety of the{' '}
        <a href="http://salinasriver.org/">Salinas River</a>, it's culture, it's
        people, and the different ways to access the river legally and...
        informally.
      </p>
    </ResumeItem>
    <ResumeItem time="2001-2005">
      <h3>Archivist — Fort Ord Museum and Archives</h3>
      <p>
        Started an{' '}
        <a href="https://digitalcommons.csumb.edu/fortord_images/">archive</a>{' '}
        for the social artifacts of the former Fort Ord, doing oral histories,
        creating an ascensioning process, and digitizing records using a very
        loud slide scanner.
      </p>
    </ResumeItem>
    <h2>Artist's CV</h2>
    <p>
      While I no longer do exhibits, I still practice printmaking,
      paper-cutting, and watercolors.
    </p>
    <ResumeItem time="2009">
      <ul>
        <li>
          <a href="http://www.montereyart.org/past-exhibitions/montereynow-kevin-miller-2/">
            Monterey Museum of Art
          </a>
          , Monterey, CA — Kevin Miller: MontereyNOW
        </li>
      </ul>
    </ResumeItem>
    <ResumeItem time="2008">
      <ul>
        <li>
          Emily Brown Studio, Monterey, CA — New Work, Group Show (April - June
          2008)
        </li>
        <li>
          Lisa Coscino Gallery, Pacific Grove, CA — FRED (April - May 2008)
        </li>
        <li>
          Sculpture Works, Sand City, CA — Octopi Collective's Untapped desires
        </li>
      </ul>
    </ResumeItem>
    <ResumeItem time="2007">
      <ul>
        <li>
          Lauryn Taylor Fine Art, Carmel, CA — 'Holiday Lights Juried Show'
          (Nov. 24 - Dec. 24 2007)
        </li>
        <li>
          Lisa Coscino Gallery, Pacific Grove, CA — $99.99 (Nov. 30 - Dec. 30,
          2007)
        </li>
        <li>
          711 Cannery Row, Monterey, CA — 'Taste the Art, View the Wine' (Nov.
          17 &amp; 18, 2007)
        </li>
        <li>
          Lisa Coscino Gallery, Pacific Grove, CA — Solo Show 'Those Isles of
          Yours' (Oct. 26 - Novemberish, 2007)
        </li>
        <li>
          Art Works!, Pacific Grove, CA — Papercutting Workshop Extravaganza
          (November 4th, 2007)
        </li>
        <li>
          CSU Monterey Bay - Día de los Muertos - 10' x 14' installation
          (November 1 - 4, 2007)
        </li>
        <li>
          Lisa Coscino Gallery, Pacific Grove, CA — 'Live Nudes' (Sept. 14th -
          Octoberish, 2007)
        </li>
        <li>
          Lisa Coscino Gallery, Pacific Grove, CA — Postcards Show (July - Aug.,
          2007)
        </li>
        <li>
          Outer Edge Gallery, Monterey, CA — Favorites Show (July 27 - Aug. 31,
          2007)
        </li>
        <li>
          Colton Hall, Monterey, CA — Plein Air Award Winner's Exhibition (July,
          207)
        </li>
        <li>Miriam's Café, Monterey, CA — Group Show (June-July, 2007)</li>
        <li>
          Art Works!, Pacific Grove, CA — 'April Showers Bring May Flowers...
          and Maybe a Junebug or Two' (June-July, 2007)
        </li>
        <li>
          Projekt30.com Noir Show Juried Exhibition, Online (June-Aug., 2007)
        </li>
        <li>
          Outer Edge Gallery, Monterey, CA — Poster Show (Dec. 2006 - Jan. 2007)
        </li>
      </ul>
    </ResumeItem>
    <ResumeItem time="2006">
      <ul>
        <li>
          Lauryn Taylor Fine Art, Carmel, CA — 'Holiday Lights Miniature Show'
          (Dec. 2006)
        </li>
        <li>
          San Jose Museum of Art, San Jose, CA — 'Day of the Dead Altera' (Oct.
          - Nov. 2006)
        </li>
        <li>
          Monterey Museum of Art, Monterey, CA — 'Miniatures' (Oct. - Dec. 2006)
        </li>
        <li>
          Sweet Elena's Bakery &amp; Cafe, Sand City, CA — 'Papercuts &amp;
          Landscapes' (July - Sept. 2006)
        </li>
        <li>
          Lauryn Taylor Fine Art, Carmel, CA — 'Elementals Competition' (Feb.
          2006)
        </li>
      </ul>
    </ResumeItem>
  </Layout>
)
