/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Image, Flex, Text } from './scope'

const code = (
  <Inline>
    <Flex
      sx={{
        alignItems: 'flex-end',
        bg: query.bg,
        color: query.color,
        padding: 80
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap'
          rel='stylesheet'
        />
        <Text
          sx={{
            fontFamily: 'Inter',
            fontSize: 67,
            fontWeight: 700,
            lineHeight: '100%',
            letterSpacing: '-4px',
            flex: '0 1 60%'
          }}
        >
          {query.title}
        </Text>
        <Image src={query.logo} />
      </Flex>
    </Flex>
  </Inline>
)

const query = {
  color: '#fff',
  bg: '#000',
  logo: 'https://svgur.com/i/L4d.svgnull',
  domain: 'https://paco.im',
  title: 'Shared Hook State with SWR'
}

export const paco = { name: 'paco', code, query }
