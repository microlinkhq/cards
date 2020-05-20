/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Progress, Text, Link, Flex } from './scope'

const getColors = (value, theme) => {
  if (value >= 90) {
    return {
      primary: '#0CCE6B',
      secondary: theme === 'dark' ? '#1F3228' : '#E7FAF0'
    }
  }

  if (value >= 50) {
    return {
      primary: '#FFA400',
      secondary: theme === 'dark' ? '#372E1E' : '#FFF6E6'
    }
  }
  return {
    primary: '#FF4E42',
    secondary: theme === 'dark' ? '#372624' : '#FFEEEC'
  }
}

const Lighthouse = ({ value, label, theme }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Progress value={value} {...getColors(value, theme)} />
      <Text
        sx={{
          mt: '10px',
          fontWeight: 300,
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          color: theme === 'dark' ? '#F5F5F5' : '#212121',
          fontSize: '24px'
        }}
        children={label}
      />
    </Flex>
  )
}

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: query.bg[query.theme],
          color: query.color[query.theme]
        }}
      >
        <Flex sx={{ width: '80%' }}>
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
          <Text
            sx={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: 4 }}
            children={query.url}
          />
          <Text
            sx={{ opacity: 0.8, fontFamily: 'Roboto', fontSize: 1, mt: 1 }}
            children={query.date}
          />
        </Flex>
      </Flex>
    </>
  </Inline>
)

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

export const lighthouse = {
  name: 'lighthouse',
  code,
  query
}
