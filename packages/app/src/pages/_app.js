import NextApp from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
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
  url: 'https://cards.microlink.io',
  siteName: 'Microlink Cards',
  type: 'website'
}

export default class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <GlobalStylesheet />
        <Head>
          {/* <!-- Basic --> */}
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
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
          <meta property='og:site_name' content={meta.siteName} />
          <meta property='og:type' content={meta.type} />
          {/* <!-- Favicon --> */}
          <link
            rel='apple-touch-icon-precomposed'
            sizes='57x57'
            href='https://cdn.microlink.io/logo/apple-touch-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='114x114'
            href='https://cdn.microlink.io/logo/apple-touch-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='72x72'
            href='https://cdn.microlink.io/logo/apple-touch-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='144x144'
            href='https://cdn.microlink.io/logo/apple-touch-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='60x60'
            href='https://cdn.microlink.io/logo/apple-touch-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='120x120'
            href='https://cdn.microlink.io/logo/apple-touch-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='76x76'
            href='https://cdn.microlink.io/logo/apple-touch-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='152x152'
            href='https://cdn.microlink.io/logo/apple-touch-icon-152x152.png'
          />
          <link
            rel='icon'
            type='image/png'
            href='https://cdn.microlink.io/logo/favicon-196x196.png'
            sizes='196x196'
          />
          <link
            rel='icon'
            type='image/png'
            href='https://cdn.microlink.io/logo/favicon-96x96.png'
            sizes='96x96'
          />
          <link
            rel='icon'
            type='image/png'
            href='https://cdn.microlink.io/logo/favicon-32x32.png'
            sizes='32x32'
          />
          <link
            rel='icon'
            type='image/png'
            href='https://cdn.microlink.io/logo/favicon-16x16.png'
            sizes='16x16'
          />
          <link
            rel='icon'
            type='image/png'
            href='https://cdn.microlink.io/logo/favicon-128.png'
            sizes='128x128'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&display=swap'
            rel='stylesheet'
          />
        </Head>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    )
  }
}
