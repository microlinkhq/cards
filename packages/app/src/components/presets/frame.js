/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Flex } from './scope'

const code = (
  <Inline>
    <Flex
      sx={{
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        bg: query.bg
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '75%',
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 5px 10px 0px'
        }}
      >
        <Image src={query.overlay[query.theme].safari} />
        <Image src={query.image} />
      </Flex>
    </Flex>
  </Inline>
)

const query = {
  bg: '#333333',
  theme: 'dark',
  overlay: {
    dark: {
      safari: 'https://i.imgur.com/qvwzZTX.png'
    },
    light: {
      safari: 'https://i.imgur.com/PVEmpbK.png'
    }
  },
  image: 'https://i.imgur.com/J86MSbd.png'
}

export const frame = {
  name: 'frame',
  code,
  query
}
