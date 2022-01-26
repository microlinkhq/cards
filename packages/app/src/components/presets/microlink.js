/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Link, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Lato&display=block'
        rel='stylesheet'
      />
      <Flex
        sx={{
          bg: query.bg,
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
              bg: query.color,
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
          >
            {query.title}
          </Text>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  color: '#313b53',
  bg: 'white',
  title: 'Microlink Cards',
  logo: 'https://cdn.microlink.io/logo/logo.svg'
}

export const microlink = { name: 'Microlink', code, query }
