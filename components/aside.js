import styled from 'styled-components'
import { Flex } from 'theme-ui'

const Aside = styled(Flex)``

Aside.defaultProps = {
  sx: {
    flexDirection: 'column',
    bg: '#2a2734',
    width: ['30%', '30%', '30%', '30%']
  }
}

export default Aside
