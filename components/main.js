import styled from 'styled-components'
import { Box } from 'rebass'

const Main = styled(Box)`
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;

  background: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
`

Main.defaultProps = {
  as: 'main'
}

export default Main
