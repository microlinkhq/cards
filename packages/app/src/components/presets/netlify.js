/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Flex, Link, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=block'
        rel='stylesheet'
      />
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: `radial-gradient(circle at 0%, ${query.gradientColors[0]} 0%, ${query.gradientColors[0]} 60%, ${query.gradientColors[1]} 60%, ${query.gradientColors[1]} 80%, ${query.gradientColors[2]} 80%)`,
          fontFamily: 'Open Sans',
          px: 32,
          py: 40
        }}
      >
        <Image sx={{ width: 132, display: 'block' }} src={query.logo} />

        <Text
          sx={{
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1.4,
            maxWidth: '90%',
            color: query.titleColor
          }}
        >
          {query.title}
        </Text>

        <Text
          sx={{
            backgroundColor: query.buttonBg,
            px: 36,
            py: 12,
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            color: query.buttonColor
          }}
        >
          {query.buttonText}
        </Text>
      </Flex>
    </>
  </Inline>
)

const query = {
  buttonBg: '#5cebdf',
  buttonColor: '#1f495a',
  buttonText: 'Learn more',
  gradientColors: ['#0d303f', '#0e2a36', '#12212a'],
  logo: 'https://www.netlify.com/v3/img/components/full-logo-dark.svg',
  title:
    'Deploy a Dynamic Next.js App to Netlify with PlanetScale’s Branchable Serverless Database',
  titleColor: '#fff'
}

export const netlify = { name: 'netlify', code, query }
