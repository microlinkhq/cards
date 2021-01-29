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
        backgroundImage: `url(${query.frames[query.frame]})`,
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
          ...query.innerFrame[query.frame],
          justifyContent: 'center',
          alignItems: 'center',
          bg: query.bg || query.innerFrame[query.frame].bg
        }}
      >
        <Text
          sx={{
            color: query.color || query.innerFrame[query.frame].color,
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
  frame: 'dark',
  text: "Roses are red <br/> Violets are blue <br/> Unexpected '{' on line 32",
  fontFamily: 'Fira Mono',
  fontSize: 1,
  lineHeight: 1.8,
  innerFrame: {
    dark: {
      height: '242px',
      width: '240px',
      bottom: '2px',
      position: 'relative',
      bg: '#222222',
      color: '#EB635B'
    }
  },
  frames: {
    light: 'https://i.imgur.com/cke4dF7.png',
    dark: 'https://i.imgur.com/rJZjRFw.png'
  }
}

export const frame = {
  name: 'frame',
  code,
  query
}
