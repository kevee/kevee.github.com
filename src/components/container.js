import bp from '../style/breakpoints'
import styled from '@emotion/styled'

const Container = styled('div')`
  margin: 0 auto;
  ${bp({
    maxWidth: ['100%', '100%', '66ch'],
  })}
`

export default Container
