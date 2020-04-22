import styled from 'styled-components'
import theme from '@/theme'
import * as scope from '@/components/presets/scope'

import {
  LiveProvider as BaseProvider,
  LiveEditor as BaseEditor,
  LiveError as BaseError,
  LivePreview as BasePreview
} from 'react-live'

export const BASE_HEIGHT = 441
export const BASE_WIDTH = 843
export const RATIOS = [1, 1, 1, 1]

const LivePreviewWrapper = styled('div')`
  cursor: pointer;
  height: 100%;
  width: 100%;
  margin: auto;

  ${({ isEditor }) =>
    isEditor &&
    `
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;`}

  ${({ isEditor }) =>
    !isEditor &&
    `
    ${RATIOS.reduce(
      (acc, ratio, index) =>
        acc +
        `
      @media screen and (min-width: ${theme.breakpoints[index]}) {
        height: ${ratio * BASE_HEIGHT}px;
        width: ${ratio * BASE_WIDTH}px;
      }
    `,
      ''
    )}
  `}
`

LivePreviewWrapper.defaultProps = {
  id: 'screenshot'
}

export const LiveError = styled(BaseError)`
  position: relative;
  margin: auto;
  padding: ${theme.space[3]};
  display: block;
  background: #ff5555;
  color: #f8f8f2;
  white-space: pre-wrap;
  text-align: left;
  font-size: ${theme.fontSizes[2]};
  font-family: ${theme.fonts.mono};
  bottom: 0;
  width: calc(100% - ${theme.space[5]});

  @media screen and (min-width: ${theme.breakpoints[2]}) {
    position: absolute;
    width: 70%;
  }
`

export const LivePreview = styled(BasePreview)`
  > div {
    height: inherit;
    width: inherit;
  }
`

LivePreview.defaultProps = {
  Component: LivePreviewWrapper
}

const LiveProviderBase = styled(BaseProvider)``

LiveProviderBase.defaultProps = {
  scope,
  theme: undefined,
  noInline: false
}

export const LiveProvider = ({ queryVariables: query, ...props }) => {
  const extendedScope = { ...scope, query }
  return <LiveProviderBase {...props} scope={extendedScope} />
}

export const LiveEditor = styled(BaseEditor)`
  pre,
  textarea {
    padding: 0 !important;
    font-family: ${theme.fonts.mono} !important;
    font-weight: ${theme.fontWeights.light} !important;
  }
  textarea:focus {
    outline: none;
  }
`
