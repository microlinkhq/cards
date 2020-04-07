import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '@themes/base'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }

  #__next {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  :root {
    --aside-width: 30%;
    --aside-color: #2a2734;
    --editor-width: 1200px;
    --editor-height: 630px;
  }
`

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStylesheet />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
