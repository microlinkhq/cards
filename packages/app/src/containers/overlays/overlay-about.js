import { Image, Text, Box } from 'theme-ui'
import { ExternalLink } from '@/components'
import { useContext } from 'react'

import { AppContext } from '@/context'
import pkg from '@/package.json'

export default function OverlayAbout () {
  const { theme } = useContext(AppContext)
  const { color, contrast } = theme

  return (
    <>
      <Box as='header'>
        <Image
          src='https://cdn.microlink.io/banner/cards.png'
          alt='microlink cards'
        />
      </Box>

      <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
        <b>Microlink Cards</b> generates social images on demand, ready to be
        embedded in your{' '}
        <Text as='code' sx={{ fontFamily: 'mono' }}>
          &lt;meta&gt;
        </Text>{' '}
        tags.
      </Text>

      <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
        Just write your preset once, feed it with dynamic content and reuse
        forever. Read more into{' '}
        <ExternalLink
          sx={{ textDecoration: 'none', color: contrast }}
          href='https://microlink.io/docs/cards/getting-started/overview'
        >
          documentation
        </ExternalLink>
        portal.
      </Text>

      <Text sx={{ my: 3, fontSize: 2, fontWeight: 'normal' }}>
        Starts from <b>free</b> and code is available on{' '}
        <ExternalLink
          sx={{ textDecoration: 'none', color: contrast }}
          href={pkg.homepage}
        >
          GitHub
        </ExternalLink>
        .
      </Text>
    </>
  )
}
