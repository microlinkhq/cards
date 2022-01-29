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
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '75%',
          height: '90%',
          margin: 'auto'
        }}
      >
        <Image
          sx={{
            position: 'absolute',
            height: 'inherit',
            ...query.css[query.device]
          }}
          src={query.devices[query.theme][query.device]}
        />
        <Image
          sx={{ height: 'inherit', ...query.css[query.device] }}
          src={query.image[query.device]}
        />
      </Flex>
    </Flex>
  </Inline>
)

const query = {
  bg: '#F2F4F6',
  image: {
    iphone: 'https://i.imgur.com/L4Idd12.jpg',
    ipad: 'https://i.imgur.com/L4Idd12.jpg',
    pixel: 'https://i.imgur.com/L4Idd12.jpg',
    samsung: 'https://i.imgur.com/L4Idd12.jpg'
  },
  devices: {
    dark: {
      iphone: 'https://svgshare.com/i/LHh.svg',
      ipad: 'https://svgshare.com/i/LJ4.svg',
      pixel: 'https://svgshare.com/i/LK4.svg',
      samsung: 'https://svgshare.com/i/LH6.svg'
    },
    light: {
      iphone: 'https://svgshare.com/i/LKn.svg',
      ipad: 'https://svgshare.com/i/LKH.svg',
      pixel: 'https://svgshare.com/i/LKP.svg',
      samsung: 'https://svgshare.com/i/LH7.svg'
    }
  },
  css: {
    iphone: {
      borderRadius: '30px'
    }
  },
  device: 'iphone',
  theme: 'dark'
}

export const device = { name: 'Device', code, query }
