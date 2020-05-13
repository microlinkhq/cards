/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { ThemeProvider, Image, Box, Flex, Text, Link } from './scope'

const code = (
  <Inline>
    <ThemeProvider theme={query.theme}>
      <Link
        href='https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap'
        rel='stylesheet'
      />
      <Link
        href='https://fonts.googleapis.com/css?family=Fira+Mono&display=swap'
        rel='stylesheet'
      />

      <Flex
        sx={{
          bg: 'accent',
          color: 'foreground',
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: 2,
          flexDirection: 'column'
        }}
      >
        <Box
          as='header'
          sx={{
            bg: 'background',
            py: 2,
            px: 3,
            borderBottomWidth: query.theme.space[2],
            borderBottomColor: 'background',
            borderBottomStyle: 'solid',
            flex: 0
          }}
        >
          <Text>
            {query.heading}{' '}
            <Text as='span' sx={{ color: 'faded' }}>
              {query.subHeading}
            </Text>
          </Text>
        </Box>

        <Flex
          sx={{
            bg: 'foreground',
            color: 'background',
            pt: 2,
            pb: 1,
            px: 3,
            mx: 3,
            mt: -2,
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <Text
            sx={{
              fontSize: 4,
              lineHeight: 1.3
            }}
          >
            {query.title}
          </Text>

          <Text
            sx={{
              fontFamily: 'Fira Mono',
              fontWeight: '400',
              color: 'faded',
              fontSize: 1,
              mt: 'auto'
            }}
          >
            {query.domain}
          </Text>
        </Flex>
      </Flex>
    </ThemeProvider>
  </Inline>
)

const query = {
  heading: 'Pedro',
  subHeading: 'Duarte',
  title:
    'UI developer interested in design systems, jamstack, user/dev experience and under engineering.',
  domain: 'ped.ro',
  theme: {
    colors: {
      background: 'rgba(255, 255, 255, 1)',
      foreground: 'rgba(19, 19, 21, 1)',
      accent: 'rgba(255, 221, 0, 1)',
      faded: 'rgba(128, 128, 128, 1)'
    },
    space: [0, 32, 48, 64],
    sizes: [0, 32, 48, 64],
    fontSizes: [0, 16, 24, 32, 48]
  }
}

export const pedro = { name: 'pedro', code, query }
