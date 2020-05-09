import styled from 'styled-components'
import { Button } from 'theme-ui'

import themeBase from '@/theme'

export const ButtonIcon = styled(Button)`
  display: flex;
  cursor: pointer;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;

  svg {
    transition: fill ${themeBase.transition.medium},
      stroke ${themeBase.transition.medium};
    stroke: ${({ color }) => color};
    fill: ${({ color }) => color};
  }

  &:hover svg {
    stroke: ${({ hoverColor }) => hoverColor};
    fill: ${({ hoverColor }) => hoverColor};
  }
`
