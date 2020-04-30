import * as scope from '@/components/presets/scope'
import { editorThemes, theme } from '@/theme'
import Monaco from '@monaco-editor/react'
import styled from 'styled-components'
import { useRef } from 'react'
import { Text } from 'theme-ui'

import {
  LiveProvider as BaseProvider,
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

const LiveEditorBase = styled(Monaco)``

export const LiveEditor = ({ code, onChange, themeKey, theme }) => {
  const editorRef = useRef(null)

  const handleEditorDidMount = (getEditorValue, monaco) => {
    Object.keys(editorThemes).forEach(key => {
      const value = editorThemes[key]
      monaco._themeService.defineTheme(key, value)
    })

    monaco.onDidChangeModelContent(() => onChange(getEditorValue()))
    editorRef.current = monaco
  }

  return (
    <LiveEditorBase
      value={code}
      language='javascript'
      theme={themeKey}
      editorDidMount={handleEditorDidMount}
      loading={
        <Text sx={{ fontFamily: 'mono', color: theme.color }}>Loading...</Text>
      }
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        wordWrapColumn: 'on',
        hideCursorInOverviewRuler: true,
        minimap: {
          enabled: false
        },
        lineNumbersMinChars: 0,
        scrollbar: {
          useShadows: false
        }
      }}
    />
  )
}
