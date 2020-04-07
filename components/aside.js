import styled from 'styled-components'
import { Box } from 'rebass'

const Aside = styled(Box)`
  width: var(--aside-width);
  background: var(--aside-color);
  display: flex;
  flex-direction: column;
`

Aside.defaultProps = {
  as: 'aside'
}

export default Aside
