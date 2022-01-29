import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
import NextApp from 'next/app'
import Head from 'next/head'

import 'react-aspect-ratio/aspect-ratio.css'

import { SeoMeta } from '@/components'
import AppContextProvider from '@/context'
import { theme } from '@/theme'
import { notificationStyles } from '@/lib/notification'

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
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0'
          />
        </Head>

        <SeoMeta />
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    )
  }
}
