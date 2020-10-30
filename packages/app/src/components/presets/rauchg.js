/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Box
        as='header'
        sx={{
          position: 'absolute',
          pt: '42px',
          pl: '42px',
          bg: query.bg,
          color: query.color
        }}
      >
        <Flex
          sx={{
            alignItems: 'center'
          }}
        >
          <Image sx={{ width: 24, height: 24 }} src={query.logo} />
          <Text
            as='span'
            sx={{
              ml: 2,
              letterSpacing: '-.03m',
              fontFamily: 'sans-serif',
              fontSize: 4,
              fontWeight: 700
            }}
          >
            {query.domain}
          </Text>
        </Flex>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: query.bg
        }}
      >
        <Text
          sx={{
            px: '46px',
            py: 3,
            letterSpacing: '-.03m',
            fontFamily: 'sans-serif',
            fontSize: 6,
            fontWeight: 700,
            bg: query.color,
            color: query.bg,
            maxWidth: '38rem',
            textAlign: 'center'
          }}
        >
          {query.title}
        </Text>
      </Flex>
    </>
  </Inline>
)

const query = {
  bg: 'white',
  color: 'black',
  logo: 'https://svgur.com/i/KBR.svg',
  domain: 'rauchg.com',
  title: '2020 in Review'
}

export const rauchg = { name: 'rauchg', code, query }
