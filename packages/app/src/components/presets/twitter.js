/* eslint-disable */

import Inline from '../inline.macro'
import { MQL, Avatar, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        style={{ zoom: query.zoom }}
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: query.themes[query.theme].bg
        }}
      >
        <MQL url={query.url}>
          {payload => {
            if (payload === null) return
            const { data } = payload

            const displayName = data.title.replace(' on Twitter', '')
            const tweetUrl = new URL(query.url)
            const username = tweetUrl.pathname.split('/')[1].toLowerCase()

            const tweetDate = new Date(data.date)

            const clockTime = new Intl.DateTimeFormat(query.locale, {
              hour: 'numeric',
              minute: 'numeric'
            }).format(tweetDate)

            const dayTime = new Date(data.date).toLocaleDateString(
              query.locale,
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }
            )

            return (
              <Flex
                sx={{
                  flexDirection: 'column',
                  fontFamily:
                    '-apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                }}
              >
                <Flex as='header' sx={{ width: '100%' }}>
                  <Avatar sx={{ width: '50px' }} src={data.image.url} />

                  <Box sx={{ lineHeight: '1.25', pl: 2 }}>
                    <Text
                      sx={{
                        color: query.themes[query.theme].primary,
                        fontSize: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      {displayName}
                    </Text>
                    <Text
                      sx={{
                        fontSize: 2,
                        color: query.themes[query.theme].secondary
                      }}
                    >
                      @{username}
                    </Text>
                  </Box>
                </Flex>

                <Flex as='section' sx={{ pt: 3, width: '100%' }}>
                  <Text
                    sx={{
                      color: query.themes[query.theme].primary,
                      fontWeight: 400,
                      fontSize: 4
                    }}
                  >
                    {data.description}
                  </Text>
                </Flex>

                <Flex as='footer' sx={{ pt: 3, width: '100%' }}>
                  <Text
                    sx={{
                      fontWeight: 400,
                      fontSize: 2,
                      color: query.themes[query.theme].secondary
                    }}
                  >
                    {clockTime} · {dayTime}
                  </Text>
                </Flex>
              </Flex>
            )
          }}
        </MQL>
      </Flex>
    </>
  </Inline>
)

const query = {
  url: 'https://twitter.com/Kikobeats/status/1345407790114856965',
  locale: 'en-US',
  zoom: '100%',
  theme: 'light',
  themes: {
    light: {
      secondary: 'rgb(91, 112, 131)',
      primary: '#000',
      bg: '#fff'
    }
  }
}

export const twitter = { name: 'twitter', code, query }
