import { Link } from 'theme-ui'
import styled from 'styled-components'

export const ExternalLink = styled(Link)``

ExternalLink.defaultProps = {
  rel: 'noopener noreferrer',
  target: '_blank'
}
