import styled from 'styled-components'
import theme from '@/theme'
import * as scope from '@/components/presets/scope'

import {
  LiveProvider as BaseProvider,
  LiveEditor as BaseEditor,
  LiveError as BaseError,
  LivePreview as BasePreview
} from 'react-live'

const LivePreviewWrapper = styled('div')`
  cursor: pointer;
  height: 100%;
  width: 100%;
  margin: auto;

  ${({ isEditor }) =>
    isEditor &&
    `
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;`}
`

LivePreviewWrapper.defaultProps = {
  id: 'screenshot'
}

export const LiveError = styled(BaseError)`
  background: #ff5555;
  color: #f8f8f2;
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes[2]};
  margin: 0;
  padding: ${theme.space[3]};
  text-align: left;
  white-space: pre-wrap;
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
