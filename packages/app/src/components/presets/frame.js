/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Text, Flex } from './scope'

const code = (
  <Inline>
    <Flex
      style={{ zoom: query.zoom }}
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${query.themes[query.theme]})`,
        backgroundSize: '50%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400&display=block'
        rel='stylesheet'
      />
      <Flex
        sx={{
          ...query.innerFrame,
          justifyContent: 'center',
          alignItems: 'center',
          bg: query.bg || query.innerFrame.bg
        }}
      >
        <Text
          sx={{
            color: query.color || query.innerFrame.color,
            lineHeight: query.lineHeight,
            fontFamily: query.fontFamily,
            fontSize: query.fontSize
          }}
          dangerouslySetInnerHTML={{ __html: query.text }}
        />
      </Flex>
    </Flex>
  </Inline>
)

const query = {
  theme: 'dark',
  text: "Roses are red <br/> Violets are blue <br/> Unexpected '{' on line 32",
  fontFamily: 'Fira Mono',
  fontSize: 1,
  lineHeight: 1.8,
  innerFrame: {
    height: '242px',
    width: '240px',
    bottom: '2px',
    position: 'relative',
    bg: '#222222',
    color: '#EB635B'
  },
  themes: {
    light: 'https://i.imgur.com/cke4dF7.png',
    dark: 'https://i.imgur.com/rJZjRFw.png',
    metal: 'https://i.imgur.com/74oC80E.png'
  }
}

export const frame = {
  name: 'frame',
  code,
  query
}
