import styled from 'styled-components'
import theme from '@themes/base'
import { Text, Box } from 'theme-ui'
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
