/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Avatar, Link, Flex, Box, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${query.backgroundImage})`,
          backgroundSize: query.backgroundSize,
          bg: query.bg
        }}
      >
        <Flex
          sx={{
            color: query.primary,
            p: '3rem',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Text
            sx={{
              flexGrow: 1,
              fontSize: 7,
              fontWeight: 900,
              fontFamily: 'radnika, sans-serif',
              fontStyle: 'italic',
              '::before': {
                content: '""',
                display: 'block',
                width: '40px',
                height: '40px',
                backgroundColor: query.secondary,
                mb: '-45px'
              }
            }}
          >
            {query.title}
          </Text>
          <Box as='footer'>
            <Flex
              sx={{
                flexShrink: 0
              }}
            >
              <Avatar
                sx={{ height: '120px', width: '120px' }}
                src={query.avatar}
              />
              <Link
                href='https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
                rel='stylesheet'
              />
              <Flex
                sx={{ mt: 1, ml: 3, flexDirection: 'column', lineHeight: 1 }}
              >
                <Text
                  sx={{
                    fontStyle: 'italic',
                    fontFamily: 'Fira Code',
                    fontSize: '40px'
                  }}
                >
                  {query.url}
                </Text>
                <Text
                  sx={{
                    p: 2,
                    bg: query.secondary,
                    fontStyle: 'italic',
                    fontFamily: 'Fira Code',
                    fontSize: 5
                  }}
                >
                  {query.path}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  title: 'Flying a DJI Tello Drone with React and Node.js',
  avatar: 'https://unavatar.now.sh/twitter/wesbos',
  url: 'wesbos.com',
  secondary: '#F8C30C',
  primary: '#000',
  bg: '#fff',
  path: '/drone-javascript',
  backgroundImage:
    'https://wesbos.com/static/blackgrit-15c168539fb7109ce300574e7b4b0732.png',
  backgroundSize: '600px'
}

export const wesbos = {
  name: 'wesbos',
  code,
  query
}
