import styled from 'styled-components'
import { Flex } from 'rebass'

const Center = styled(Flex)``

Center.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}

export default Center
