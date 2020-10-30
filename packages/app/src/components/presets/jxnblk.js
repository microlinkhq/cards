/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: query.bg,
          px: 5
        }}
      >
        <Image sx={{ width: '128px' }} src={query.logo} />
        <Text
          sx={{
            py: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            lineHeight: 1.25,
            fontFamily: 'sans-serif',
            fontWeight: 800,
            fontSize: 4,
            color: query.color
          }}
        >
          {query.title}
        </Text>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: 3,
            color: query.color
          }}
        >
          {query.subtitle}
        </Text>
      </Flex>
    </>
  </Inline>
)

const query = {
  bg: 'white',
  color: 'black',
  logo: 'https://raw.githubusercontent.com/jxnblk/avatar/master/avatar.svg',
  title: 'TWO STEPS FORWARD, ONE STEP BACK',
  subtitle: 'jxnblk.com'
}

export const jxnblk = { name: 'jxnblk', code, query }
