import { useContext } from 'react'
import { Image, Text, Box, Flex } from 'theme-ui'

import Button from '@/components/button'

import { AppContext } from '@/context'

import pkg from '@/package.json'

const OverlayAbout = () => {
  const {
    hideOverlay,
    theme: { bg, color, contrast }
  } = useContext(AppContext)

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
        <Text
          as='a'
          sx={{ textDecoration: 'none', color: contrast }}
          href='https://microlink.io/docs/cards/getting-started/overview'
          target='_blank'
          rel='noopener noreferrer'
          children='documentation'
        />{' '}
        portal.
      </Text>

      <Text sx={{ my: 3, fontSize: 2, fontWeight: 'normal' }}>
        Starts from <b>free</b> and code is available on{' '}
        <Text
          as='a'
          sx={{ textDecoration: 'none', color: contrast }}
          href={pkg.homepage}
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </Text>
        .
      </Text>

      <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
        <Button
          sx={{ bg: color, color: bg }}
          onClick={hideOverlay}
          children='Got it'
        />
      </Flex>
    </>
  )
}

export default OverlayAbout
