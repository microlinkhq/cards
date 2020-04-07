import styled from 'styled-components'
import theme from '@themes/base'
import { Text, Box } from 'rebass'
import Center from '@components/center'

import {
  LiveProvider as BaseProvider,
  LiveEditor as BaseEditor,
  LiveError as BaseError,
  LivePreview as BasePreview
} from 'react-live'

const editorTheme = {
  plain: {
    backgroundColor: '#2a2734',
    color: '#9a86fd'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: '#6c6783'
      }
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: '#e09142'
      }
    },
    {
      types: ['property', 'function'],
      style: {
        color: '#9a86fd'
      }
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#eeebff'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: '#c4b9fe'
      }
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable'
      ],
      style: {
        color: '#ffcc99'
      }
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through'
      }
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold'
      }
    },
    {
      types: ['important'],
      style: {
        color: '#c4b9fe'
      }
    }
  ]
}

const Background = styled(Center)`
  height: inherit;
  width: inherit;
`

const scope = { Background, Text, styled }

const LivePreviewWrapper = styled(Box)`
  width: var(--editor-width);
  height: var(--editor-height);
`

LivePreviewWrapper.defaultProps = {
  margin: '0 auto',
  marginTop: 6
}

export const LiveError = styled(BaseError)`
  position: relative;
  margin: ${theme.space[4]} auto 0 auto;
  padding: 1rem;
  display: block;
  background: #ff5555;
  color: #f8f8f2;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: 'Source Code Pro', monospace;
  bottom: 0;
  width: calc(100% - ${theme.space[5]});
`

export const LivePreview = styled(BasePreview)``

LivePreview.defaultProps = {
  Component: LivePreviewWrapper
}

export const LiveProvider = styled(BaseProvider)``

LiveProvider.defaultProps = {
  scope,
  theme: editorTheme,
  noInline: false
}

export const LiveEditor = styled(BaseEditor)`
  font-size: ${theme.fontSizes[2]};
  font-family: ${theme.fonts.mono};
  font-weight: ${theme.fontWeights.light};
  overflow: auto;

  textarea:focus {
    outline: none;
  }
`
