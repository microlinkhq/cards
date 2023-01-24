import Inline from '../inline.macro'
import { Lighthouse, Text, Link, Flex } from './scope'

const query = {
  bg: {
    light: '#FFFFFF',
    dark: '#212121'
  },
  color: {
    light: '#212121',
    dark: '#F5F5F5'
  },
  theme: 'dark',
  perfomance: 92,
  accessibility: 95,
  bestPractices: 100,
  seo: 100,
  url: 'https://ped.ro',
  date: 'May 18, 2020 9:08PM'
}

const code = (
  <Inline>
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bg: query.bg[query.theme],
        color: query.color[query.theme]
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400&display=block'
        rel='stylesheet'
      />
      <Flex>
        <Lighthouse
          theme={query.theme}
          value={query.perfomance}
          label='Perfomance'
        />
        <Lighthouse
          theme={query.theme}
          value={query.accessibility}
          label='Accesibility'
        />
        <Lighthouse
          theme={query.theme}
          value={query.bestPractices}
          label='Best Practices'
        />
        <Lighthouse theme={query.theme} value={query.seo} label='SEO' />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '4rem'
        }}
      >
        <Text sx={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: 4 }}>
          {query.url}
        </Text>
        <Text sx={{ opacity: 0.8, fontFamily: 'Roboto', fontSize: 1, mt: 1 }}>
          {query.date}
        </Text>
      </Flex>
    </Flex>
  </Inline>
)

export const lighthouse = { name: 'Lighthouse', code, query }
