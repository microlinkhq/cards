import Inline from '../inline.macro'
import { Image, Flex } from './scope'

const query = {
  bg: {
    dark: '#222222',
    light: '#F7F7F7'
  },
  borderColor: {
    dark: '#333333',
    light: '#EAEAEA'
  },
  image: 'https://i.imgur.com/J86MSbd.png',
  browsers: {
    dark: {
      safari: 'https://svgshare.com/i/LMB.svg'
    },
    light: {
      safari: 'https://svgshare.com/i/LNE.svg'
    }
  },
  browser: 'safari',
  theme: 'dark'
}

const code = (
  <Inline>
    <Flex
      sx={{
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        bg: query.bg[query.theme]
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '75%',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 30px 60px',
          border: '1px solid',
          borderColor: query.borderColor[query.theme],
          borderBottom: 0,
          borderRadius: '4px'
        }}
      >
        <Image src={query.browsers[query.theme][query.browser]} />
        <Image src={query.image} />
      </Flex>
    </Flex>
  </Inline>
)

export const browser = { name: 'Browser', code, query }
