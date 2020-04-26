import NextApp from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
import theme from '@/theme'
import pkg from '@/package.json'

import 'react-aspect-ratio/aspect-ratio.css'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    background: rgba(255, 255, 255, 0.1);
  }
  .snackbars {
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    z-index: 999;
    overflow: visible;
  }
  .snackbar {
    position: fixed;
    box-sizing: border-box;
    left: 50%;
    bottom: 14px;
    width: 344px;
    margin-left: -172px;
    transform-origin: center;
    will-change: transform;
    transition: transform 300ms ease, opacity 300ms ease;
  }
  .snackbar[aria-hidden='false'] {
    -webkit-animation: snackbar-show 300ms ease 1;
            animation: snackbar-show 300ms ease 1;
  }
  .snackbar[aria-hidden='true'] {
    -webkit-animation: snackbar-hide 300ms ease forwards 1;
            animation: snackbar-hide 300ms ease forwards 1;
  }
  @media (min-width: 1080px) {
      .snackbars-right .snackbar {
        left: auto;
        right: 20px;
        margin-left: 0;
      }
      .snackbars-left .snackbar {
        left: 20px;
        margin-left: 0;
      }
  }
  @-webkit-keyframes snackbar-show {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
  }
  @keyframes snackbar-show {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
  }
  @-webkit-keyframes snackbar-hide {
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
  @keyframes snackbar-hide {
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
  @media (max-width: 400px) {
    .snackbar {
      width: 100%;
      bottom: 0;
      left: 0;
      margin-left: 0;
      border-radius: 0;
    }
  }
  .snackbar--container {
    display: flex;
    background: #2a2a2a;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    color: #eee;
    cursor: default;
    margin-bottom: 10px;
  }
  .snackbar--text {
    flex: 1 1 auto;
    padding: 16px;
    font-size: 100%;
    font-family: ${theme.fonts.sans};
  }
  .snackbar--button {
    position: relative;
    flex: 0 1 auto;
    padding: 8px;
    height: 36px;
    margin: auto 8px auto -8px;
    background: none;
    border: none;
    border-radius: 3px;
    color: white;
    font-weight: inherit;
    letter-spacing: 0.05em;
    font-size: 100%;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 200ms ease;
    outline: none;
  }

  .snackbar--button:focus:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    height: 0;
    padding: 0 0 120%;
    margin: -60% 0 0 -60%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform-origin: center;
    will-change: transform;
    -webkit-animation: focus-ring 300ms ease-out forwards 1;
            animation: focus-ring 300ms ease-out forwards 1;
    pointer-events: none;
  }

  @-webkit-keyframes focus-ring {
    from {
      transform: scale(0.01);
    }
  }

  @keyframes focus-ring {
    from {
      transform: scale(0.01);
    }
  }

  #overlay-container[aria-hidden='false'] {
    -webkit-animation: snackbar-show 300ms ease 1;
            animation: snackbar-show 300ms ease 1;
  }

  #overlay-container[aria-hidden='true'] {
    -webkit-animation: snackbar-hide 300ms ease forwards 1;
            animation: snackbar-hide 300ms ease forwards 1;
  }

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
          <meta name='twitter:card' content='summary_large_image' />
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
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
