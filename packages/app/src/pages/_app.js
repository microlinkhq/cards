import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
import NextApp from 'next/app'

import 'react-aspect-ratio/aspect-ratio.css'

import { notificationStyles } from '@/lib/notification'
import AppContextProvider from '@/context'
import { theme } from '@/theme'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background: rgba(255, 255, 255, 0.1);
  }

  ${notificationStyles(theme)}
`

export default class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStylesheet />
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    )
  }
}
