import Inline from '../inline.macro'
import { Box, Flex, Link, MQL, Spinner, Text } from './scope'

const query = {
  url: 'https://github.com/microlinkhq'
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
          prerender: true,
          data: {
            location: {
              selector: 'header.pagehead [itemprop=location]'
            },
            website: {
              selector:
                'header.pagehead [itemprop=url]:not([href*="twitter.com/"])'
            },
            twitter: {
              selector: 'header.pagehead [itemprop=url][href*="twitter.com/"]'
            },
            email: {
              selector: 'header.pagehead [itemprop=email]'
            },
            verified: {
              selector: 'header.pagehead summary[title="Label: Verified"]'
            },
            description: {
              selector: 'h1 + div > div'
            },
            tags: {
              selectorAll: '.topic-tag'
            },
            repositoryCount: {
              selector:
                '.js-profile-tab-count-container a[href$="/repositories"] .Counter'
            },
            projectCount: {
              selector:
                '.js-profile-tab-count-container a[href*="/projects"] .Counter'
            },
            peopleCount: {
              selector:
                '.js-profile-tab-count-container a[href$="/people"] .Counter'
            },
            languages: {
              selectorAll: 'a[href*="/repositories?language="]',
              attr: {
                color: {
                  selector: '.repo-language-color',
                  attr: 'style'
                },
                language: {
                  selector: 'span[itemprop=programmingLanguage]'
                }
              }
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

          const headerStats =
            data.location || data.website || data.twitter || data.email
              ? [
                  {
                    icon: 'place',
                    value: data.location
                  },
                  {
                    icon: 'link',
                    value: data.website
                  },
                  {
                    svg: (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 273.5 222.3'
                        width='16'
                        height='16'
                        style={{ display: 'block' }}
                      >
                        <path
                          d='M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1'
                          fill='currentColor'
                        />
                      </svg>
                    ),
                    value: data.twitter
                  },
                  {
                    icon: 'email',
                    value: data.email
                  }
                ]
              : null

          const footerStats =
            data.repositoryCount || data.peopleCount || data.projectCount
              ? [
                  {
                    icon: 'class',
                    label:
                      data.repositoryCount !== 1
                        ? 'Repositories'
                        : 'Repository',
                    value: data.repositoryCount
                  },
                  {
                    icon: 'people',
                    label: data.peopleCount !== 1 ? 'People' : 'Person',
                    value: data.peopleCount
                  },
                  {
                    icon: 'description',
                    label: data.projectCount !== 1 ? 'Projects' : 'Project',
                    value: data.projectCount
                  }
                ]
              : null

          return (
            <Flex
              sx={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                p: 60
              }}
            >
              <Flex sx={{ mb: 18, alignItems: 'center' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 80,
                    height: 80,
                    background: `url('${data.image.url}') no-repeat center center / cover`,
                    border: '1px solid #e0e0e0',
                    borderRadius: 6,
                    mr: 20
                  }}
                />
                <Box>
                  <Text
                    sx={{ fontSize: 42, letterSpacing: 0.5, fontWeight: 500 }}
                  >
                    {data.title}

                    {!!data.verified && (
                      <Text
                        className='material-icons'
                        sx={{ fontSize: 22, color: '#57ab5a', ml: '8px' }}
                      >
                        verified
                      </Text>
                    )}
                  </Text>

                  {!!headerStats && (
                    <Flex sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                      {headerStats.map(
                        (stat, index) =>
                          !!stat.value && (
                            <Flex
                              key={index}
                              sx={{ alignItems: 'center', mr: 20, mb: '8px' }}
                            >
                              <Text
                                className='material-icons'
                                sx={{
                                  mr: '6px',
                                  fontSize: '16px',
                                  color: '#76767F'
                                }}
                              >
                                {stat.svg || stat.icon}
                              </Text>
                              <Text sx={{ fontSize: '12px' }}>
                                {stat.value}
                              </Text>
                            </Flex>
                          )
                      )}
                    </Flex>
                  )}
                </Box>
              </Flex>

              {!!data.description && (
                <Box sx={{ mb: 24 }}>
                  <Text
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    sx={{ fontSize: 16 }}
                  />
                </Box>
              )}

              {!!data.tags && (
                <Flex sx={{ flexWrap: 'wrap', mb: 20 }}>
                  {data.tags.map(tag => (
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
              )}

              {!!data.languages && (
                <Flex sx={{ flexWrap: 'wrap' }}>
                  {data.languages.map(({ color, language }) => (
                    <Flex
                      key={language}
                      sx={{ mr: 18, mb: 12, alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          mr: '6px'
                        }}
                        css={color}
                      />
                      <Text sx={{ fontSize: 14 }}>{language}</Text>
                    </Flex>
                  ))}
                </Flex>
              )}

              {!!footerStats && (
                <Flex sx={{ mt: 'auto' }}>
                  {footerStats.map(stat =>
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
              )}
            </Flex>
          )
        }}
      </MQL>
    </Flex>
  </Inline>
)

export const githubOrg = { name: 'GitHub Org', code, query }
