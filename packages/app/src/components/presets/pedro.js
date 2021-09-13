/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { ThemeProvider, Box, Flex, Text, Link } from './scope'

const code = (
  <Inline>
    <ThemeProvider theme={query.theme}>
      <Link
        href='https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=block'
        rel='stylesheet'
      />
      <Link
        href='https://fonts.googleapis.com/css?family=Fira+Mono&display=block'
        rel='stylesheet'
      />

      <Flex
        sx={{
          bg: 'accent',
          color: 'foreground',
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: 2,
          flexDirection: 'column',
          height: '100%'            
        }}
      >
        <Box
          as='header'
          sx={{
            bg: 'background',
            pt: 2,
            px: 3,
            pb: 1,
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
            mt: -3,
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <Text
            sx={{
              fontSize: 4,
              lineHeight: 1.2
            }}
          >
            {query.title}
          </Text>

          <Text
            sx={{
              fontFamily: 'Fira Mono',
              fontWeight: '400',
              color: 'faded',
              fontSize: 2,
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
  title: 'User interface.',
  domain: 'ped.ro',
  theme: {
    colors: {
      background: 'rgba(255, 255, 255, 1)',
      foreground: 'rgba(19, 19, 21, 1)',
      accent: 'rgba(255, 221, 0, 1)',
      faded: 'rgba(128, 128, 128, 1)'
    },
    space: [0, 32, 40, 48],
    sizes: [0, 32, 40, 48],
    fontSizes: [0, 16, 24, 32, 48]
  }
}

export const pedro = { name: 'pedro', code, query }
