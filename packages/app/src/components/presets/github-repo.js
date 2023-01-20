import Inline from '../inline.macro'
import { Box, Flex, Link, MQL, Spinner, Text } from './scope'

const query = {
  url: 'https://github.com/microlinkhq/keyv'
}

const code = (
  <Inline>
    <Flex
      sx={{
        background: '#fff',
        color: '#30353B',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }}
    >
      <Link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />
      <MQL
        url={query.url}
        options={{
          data: {
            languages: {
              selectorAll: '.Layout-sidebar .Progress > span',
              type: 'text',
              attr: 'style'
            },
            name: {
              selector: '#repository-container-header strong[itemprop=name] a'
            },
            contributors: {
              selector: '.Layout-sidebar a[href$=/contributors] .Counter'
            },
            contributorsRaw: {
              selector: '.Layout-sidebar a[href$=/contributors] .Counter',
              attr: 'title',
              type: 'number'
            },
            dependants: {
              selector:
                '.Layout-sidebar a[href*=/dependents?package_id] .Counter'
            },
            description: {
              selector: '.Layout-sidebar p:first-of-type'
            },
            tags: {
              selectorAll: '.Layout-sidebar .topic-tag'
            },
            forks: {
              selector: '#repo-network-counter'
            },
            forksRaw: {
              selector: '#repo-network-counter',
              attr: 'title',
              type: 'number'
            },
            issues: {
              selector: '#issues-repo-tab-count'
            },
            issuesRaw: {
              selector: '#issues-repo-tab-count',
              attr: 'title',
              type: 'number'
            },
            stars: {
              selector: '#repo-stars-counter-star'
            },
            starsRaw: {
              selector: '#repo-stars-counter-star',
              attr: 'title',
              type: 'number'
            }
          }
        }}
      >
        {payload => {
          if (payload === null) {
            return (
              <Flex
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Spinner />
              </Flex>
            )
          }

          const { data } = payload

          const stats = [
            {
              icon: 'star',
              label: data.starsRaw !== 1 ? 'Stars' : 'Star',
              value: data.stars
            },
            {
              icon: 'people',
              label:
                data.contributorsRaw !== 1 ? 'Contributors' : 'Contributor',
              value: data.contributors
            },
            {
              icon: 'download',
              label: 'Used By',
              value: data.dependants
            },
            {
              icon: 'alt_route',
              label: data.forksRaw !== 1 ? 'Forks' : 'Fork',
              value: data.forks
            },
            {
              icon: 'help',
              label: data.issuesRaw !== 1 ? 'Issues' : 'Issue',
              value: data.issues
            }
          ]

          return (
            <Flex
              sx={{ flexDirection: 'column', width: '100%', height: '100%' }}
            >
              <Flex
                sx={{
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  p: 60,
                  minHeight: 0
                }}
              >
                <Box sx={{ mb: 10 }}>
                  <Text
                    sx={{ fontSize: 42, letterSpacing: 0.5, fontWeight: 200 }}
                  >
                    {`${data.author}/`}
                    <Text sx={{ fontWeight: 600 }}>{data.name}</Text>
                  </Text>
                </Box>

                <Box sx={{ mb: 20 }}>
                  <Text
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    sx={{ fontSize: 16 }}
                  />
                </Box>

                <Flex sx={{ flexWrap: 'wrap' }}>
                  {!!data.tags &&
                    data.tags.map(tag => (
                      <Box
                        key={tag}
                        sx={{
                          background: '#ddf4ff',
                          color: '#0969da',
                          borderRadius: 9999,
                          px: 14,
                          py: '4px',
                          mr: '8px',
                          mb: '8px',
                          fontSize: 14,
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </Box>
                    ))}
                </Flex>

                <Flex sx={{ mt: 'auto' }}>
                  {stats.map(stat =>
                    typeof stat.value === 'number' ||
                    typeof stat.value === 'string' ? (
                      <Flex sx={{ mr: 34 }} key={stat.label}>
                        <Box
                          sx={{
                            paddingRight: 10,
                            paddingTop: '2px'
                          }}
                          className='material-icons'
                        >
                          <Text sx={{ fontSize: 26, color: '#76767F' }}>
                            {stat.icon}
                          </Text>
                        </Box>
                        <Box>
                          <Box>
                            <Text sx={{ fontSize: 20, fontWeight: 400 }}>
                              {stat.value}
                            </Text>
                          </Box>
                          <Text
                            sx={{
                              fontSize: 18,
                              color: '#76767F',
                              letterSpacing: 0.5
                            }}
                          >
                            {stat.label}
                          </Text>
                        </Box>
                      </Flex>
                    ) : null
                  )}
                </Flex>
              </Flex>

              <Flex sx={{ flex: '0 0 18px' }}>
                {data.languages.map((styles, i) => (
                  <Box key={`language_${i}`} css={styles} />
                ))}
              </Flex>
            </Flex>
          )
        }}
      </MQL>
    </Flex>
  </Inline>
)

export const githubRepo = { name: 'GitHub Repo', code, query }
