import styled from 'styled-components'
import theme from '@themes/base'
import { Box } from 'theme-ui'
import * as scope from '@components/templates/scope'

import {
  LiveProvider as BaseProvider,
  LiveEditor as BaseEditor,
  LiveError as BaseError,
  LivePreview as BasePreview
} from 'react-live'

import dracula from 'prism-react-renderer/themes/dracula'

const LivePreviewWrapper = styled(Box)``

LivePreviewWrapper.defaultProps = {
  sx: {
    width: '100%',
    px: [3, 3, 3, 3],
    height: ['315px', '315px', '630px', '630px'],
    maxWidth: ['600px', '600px', '1200px', '1200px'],
    margin: 'auto'
  }
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
  theme: dracula,
  noInline: false
}

export const LiveProvider = ({ queryVariables, ...props }) => {
  const extendedScope = { ...scope, ...queryVariables }
  return <LiveProviderBase {...props} scope={extendedScope} />
}

export const LiveEditor = styled(BaseEditor)`
  overflow: auto;
  height: 100%;

  pre,
  textarea {
    padding: 0 !important;
  }

  textarea:focus {
    outline: none;
  }
`
