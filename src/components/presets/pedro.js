/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Flex, Text, Link } from './scope'

const code = (
  <Inline>
    <>
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
          bg: query.theme.colors.accent,
          color: query.theme.colors.foreground,
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: query.theme.fontSizes[2],
          flexDirection: 'column'
        }}
      >
        <Box
          as='header'
          sx={{
            bg: query.theme.colors.background,
            py: query.theme.space[2],
            px: query.theme.space[3],
            borderBottomWidth: query.theme.space[2],
            borderBottomColor: query.theme.colors.background,
            borderBottomStyle: 'solid',
            flex: 0
          }}
        >
          <Text>
            {query.heading}{' '}
            <Text as='span' sx={{ color: query.theme.colors.faded }}>
              {query.subHeading}
            </Text>
          </Text>
        </Box>

        <Flex
          sx={{
            bg: query.theme.colors.foreground,
            color: query.theme.colors.background,
            pt: query.theme.space[2],
            pb: query.theme.space[1],
            px: query.theme.space[3],
            mx: query.theme.space[3],
            mt: -query.theme.space[2],
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <Image
            sx={{
              size: query.theme.space[2],
              mx: 'auto',
              display: 'block'
            }}
            src={query.logo}
          />

          <Text
            sx={{
              mt: query.theme.space[2]
            }}
          >
            {query.title}
          </Text>

          <Text
            sx={{
              fontFamily: 'Fira Mono',
              fontWeight: '400',
              color: query.theme.colors.faded,
              fontSize: query.theme.fontSizes[1],
              mt: 'auto'
            }}
          >
            {query.domain}
          </Text>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  heading: 'Pedro',
  subHeading: 'Duarte',
  title:
    "I'm a UI developer interested in design systems, jamstack, user/dev experience and under engineering.",
  domain: 'https://ped.ro',
  logo: 'https://svgur.com/i/KSQ.svg',
  theme: {
    colors: {
      background: 'rgba(255, 255, 255, 1)',
      foreground: 'rgba(19, 19, 21, 1)',
      accent: 'rgba(255, 221, 0, 1)',
      faded: 'rgba(128, 128, 128, 1)'
    },
    space: [0, 32, 48, 64],
    fontSizes: [0, 16, 24]
  }
}

export default { name: 'pedro', code, query }
