import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { META } from '@/constants'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render () {
    return (
      <Html lang='en' prefix='og: https://ogp.me/ns#'>
        <Head>
          <meta charSet='utf-8' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            rel='preconnect'
            href='https://cdn.microlink.io'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600&display=optional'
            rel='stylesheet'
          />
          {/* <!-- Basic --> */}
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content={META.title} />

          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta property='apple-mobile-web-app-capable' content='yes' />
          <meta property='mobile-web-app-capable' content='yes' />

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
