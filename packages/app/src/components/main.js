import styled from 'styled-components'
import { Box } from 'theme-ui'

export const Main = styled(Box).attrs(() => ({ as: 'main' }))`
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
`
