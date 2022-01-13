/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Image, Flex, Link, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400,900&family=Noto+Serif:wght@400&display=block'
        rel='stylesheet'
      />
      <Box
        sx={{
          background: `url('${query.bgImage}') no-repeat center center / cover`,
          px: 82,
          py: 42
        }}
      >
        <Flex
          sx={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'Playfair Display',
            backgroundColor: '#fff',
            pt: 58,
            pl: 60,
            pr: 40,
            pb: 20
          }}
        >
          <Text
            sx={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1,
              maxWidth: '80%'
            }}
          >
            {query.title}
          </Text>

          <Flex sx={{ alignItems: 'center' }}>
            <Flex
              sx={{
                alignItems: 'center',
                mr: 'auto'
              }}
            >
              <Box
                sx={{
                  width: 92,
                  height: 92,
                  borderRadius: '50%',
                  background: `url('${query.authorImage}') no-repeat center center / cover`,
                  mr: 20
                }}
              />
              <Box>
                <Text
                  sx={{
                    display: 'block',
                    fontSize: 28,
                    fontWeight: 400,
                    fontFamily: 'Noto Serif',
                    lineHeight: 1.1,
                    color: '#737473',
                    position: 'relative',
                    pl: 20,
                    '::before': {
                      content: '"~"',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontSize: 24
                    }
                  }}
                >
                  {query.readTime} read
                  <br /> by <Text sx={{ color: '#000' }}>{query.author}</Text>
                </Text>
              </Box>
            </Flex>

            <Image sx={{ maxHeight: 48, display: 'block' }} src={query.logo} />
          </Flex>
        </Flex>
      </Box>
    </>
  </Inline>
)

const query = {
  author: 'Arvid Kahl',
  authorImage:
    'https://thebootstrappedfounder.com/wp-content/uploads/2019/12/FINAL-050-191014-Arvid-by-Chris-Marxen-Headshots-Berlin-1024x819.jpg',
  bgImage:
    'https://unsplash.com/photos/2x6PJfNWW7Y/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQyMTE0NDkz&w=2400',
  logo: 'https://thebootstrappedfounder.com/wp-content/uploads/2020/06/Asset-1.png',
  title: 'Building in Public: Taking Breaks',
  readTime: '3 minute'
}

export const thebootstrappedfounder = {
  name: 'thebootstrappedfounder',
  code,
  query
}
