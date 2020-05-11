import { Link } from 'theme-ui'
import styled from 'styled-components'

export const ExternalLink = styled(Link)`
  &:visited {
    color: inherit;
  }
`

ExternalLink.defaultProps = {
  rel: 'noopener noreferrer',
  target: '_blank'
}
