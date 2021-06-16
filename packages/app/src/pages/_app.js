import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
import NextApp from 'next/app'
import Head from 'next/head'

import 'react-aspect-ratio/aspect-ratio.css'

import AppContextProvider from '@/context'
import { theme } from '@/theme'
import { notificationStyles } from '@/lib/notification'
import pkg from '@/package.json'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background: rgba(255, 255, 255, 0.1);
  }

  ${notificationStyles(theme)}

  .react-loading-skeleton {
    display: block !important;
  }
`

const meta = {
  title: 'Microlink Cards',
  description: pkg.description,
  image: 'https://cdn.microlink.io/banner/cards.png',
  logo: 'https://cdn.microlink.io/logo/trim.png',
  url: 'https://cards.microlink.io'
}

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
          {/* <!-- Search Engine --> */}
          <meta name='description' content={meta.description} />
          <meta name='image' content={meta.image} />
          <link rel='canonical' href={meta.url} />
          <title>{meta.title}</title>
          <meta
            name='viewport'
            content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
          />
          {/* <!-- Schema.org for Google --> */}
          <meta itemProp='name' content={meta.title} />
          <meta itemProp='description' content={meta.description} />
          <meta itemProp='image' content={meta.image} />
          {/* <!-- Twitter --> */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content={meta.title} />
          <meta name='twitter:description' content={meta.description} />
          <meta name='twitter:image' content={meta.image} />
          {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
          <meta property='og:title' content={meta.title} />
          <meta property='og:logo' content={meta.logo} />
          <meta property='og:description' content={meta.description} />
          <meta property='og:image' content={meta.image} />
          <meta property='og:url' content={meta.url} />
        </Head>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    )
  }
}
