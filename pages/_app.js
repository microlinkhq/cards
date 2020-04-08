import App from 'next/app'

import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
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
