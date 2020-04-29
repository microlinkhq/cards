/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Link, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{
          bg:
            query.screenshot && query.screenshot.type === 'png'
              ? 'transparent'
              : 'white',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Flex>
          <Image
            sx={{ width: '64px', objectFit: 'contain' }}
            src={query.logo}
          />
          <Box
            sx={{
              background: query.bg,
              width: '2px',
              mx: 3,
              my: '4px'
            }}
          />
          <Text
            sx={{
              fontFamily: 'Lato',
              fontSize: 4,
              fontWeight: 400,
              fontStyle: 'normal',
              lineHeight: 1.8,
              color: query.color,
              textTransform: 'uppercase',
              wordSpacing: '8px'
            }}
            children={query.title}
          />
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  color: '#313b53',
  bg: '#313B53',
  title: 'Microlink Cards',
  logo: 'https://cdn.microlink.io/logo/logo.svg',
  screenshot: {
    type: 'png'
  }
}

export const microlink = { name: 'microlink', code, query }
