import NextApp from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'theme-ui'
import theme from '@/theme'

const CHECKER_SIZE = 10
const CHECKER_COLOR = 'rgba(255,255,255,0.4)'

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    overflow: hidden;
  }
  body {
    margin: 0;
    background-image: linear-gradient(45deg, ${CHECKER_COLOR} 25%, transparent 25%), linear-gradient(-45deg, ${CHECKER_COLOR} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${CHECKER_COLOR} 75%), linear-gradient(-45deg, transparent 75%, ${CHECKER_COLOR} 75%);
    background-size: ${CHECKER_SIZE * 2}px ${CHECKER_SIZE * 2}px;
    background-position: 0 0, 0 ${CHECKER_SIZE}px, ${CHECKER_SIZE}px -${CHECKER_SIZE}px, -${CHECKER_SIZE}px 0px;
  }
  #__next {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }
  .snackbars {
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    z-index: 100;
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
`

export default class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>og.link</title>
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStylesheet />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}
