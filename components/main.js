import styled from 'styled-components'
import { Box } from 'theme-ui'

const Main = styled(Box)`
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;

  display: flex;
  flex-direction: column;
`

Main.defaultProps = {
  as: 'main'
}

export default Main
