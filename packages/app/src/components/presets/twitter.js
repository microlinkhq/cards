import Inline from '../inline.macro'
import { Box, Link, MQL, Avatar, Flex, Text, Spinner } from './scope'

const query = {
  url: 'https://twitter.com/Kikobeats/status/1345407790114856965',
  zoom: '100%',
  theme: 'light',
  themes: {
    light: {
      link: 'rgb(27, 149, 224)',
      secondary: 'rgb(91, 112, 131)',
      primary: '#000',
      bg: '#fff'
    },
    deep: {
      link: 'rgb(27, 149, 224)',
      secondary: 'rgb(136, 153, 166)',
      primary: '#fff',
      bg: 'rgb(21, 33, 43)'
    },
    dark: {
      link: 'rgb(27, 149, 224)',
      secondary: 'rgb(110, 118, 125)',
      primary: '#fff',
      bg: '#000'
    }
  }
}

const code = (
  <Inline>
    <Flex
      style={{ zoom: query.zoom }}
      sx={{
        p: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bg: query.themes[query.theme].bg
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=block'
        rel='stylesheet'
      />
      <MQL url={query.url}>
        {payload => {
          if (payload === null) return <Spinner />
          const { data } = payload
          const displayName = data.author.split('(')[0].trim()
          const tweetUrl = new URL(query.url)
          const username = tweetUrl.pathname.split('/')[1].toLowerCase()
          const theme = query.themes[query.theme]

          const REGEX_USER = /\B@([a-zA-Z0-9_]+)/g // regex for @users
          const REGEX_URL =
            /(?:\s)(f|ht)tps?:\/\/([^\s\t\r\n<]*[^\s\t\r\n<)*_,.])/g // regex for urls
          const REGEX_HASHTAG = /\B(#[á-úÁ-Úä-üÄ-Üa-zA-Z0-9_]+)/g // regex for #hashtags

          const formatDateTime = (dateString) => {
            const date = new Date(dateString);
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = date.toLocaleTimeString('en-US', options);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return `${formattedTime} · ${formattedDate}`;
          }

          const tweet = (() => {
            let tweet = data.description
            tweet = tweet.replace(REGEX_USER, user =>
              user.replace(
                user,
                `<span style="color: ${theme.link}">${user}</span>`
              )
            )
            tweet = tweet.replace(REGEX_URL, url =>
              url.replace(
                url,
                `<span style="color: ${theme.link}">${url}</span>`
              )
            )
            tweet = tweet.replace(REGEX_HASHTAG, hashtag =>
              hashtag.replace(
                hashtag,
                `<span style="color: ${theme.link}">${hashtag}</span>`
              )
            )
            return tweet
          })()

          return (
            <Flex
              sx={{
                flexDirection: 'column',
                fontFamily: 'Roboto'
              }}
            >
              <Flex as='header' sx={{ width: '100%' }}>
                <Avatar sx={{ width: '50px' }} src={`https://unavatar.io/twitter/${username}`} />

                <Box sx={{ lineHeight: '1.25', pl: 2 }}>
                  <Text
                    sx={{
                      display: 'block',
                      color: query.themes[query.theme].primary,
                      fontSize: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    {displayName}
                  </Text>
                  <Text
                    sx={{
                      display: 'block',
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
                  dangerouslySetInnerHTML={{ __html: tweet }}
                />
              </Flex>

              <Flex
                as='footer'
                sx={{ flexDirection: 'column', pt: 3, width: '100%' }}
              >
                <Text
                  sx={{
                    fontWeight: 400,
                    fontSize: 2,
                    color: query.themes[query.theme].secondary
                  }}
                >
                  {formatDateTime(data.date)}
                </Text>
              </Flex>
            </Flex>
          )
        }}
      </MQL>
    </Flex>
  </Inline>
)

export const twitter = { name: 'Twitter', code, query }
