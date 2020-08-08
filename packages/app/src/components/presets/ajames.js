/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Flex, Box, Text, Image } from './scope'

const code = (
  <Inline>
    <>
      <Link href={query.font.primary.url} rel='stylesheet' />
      <Link href={query.font.secondary.url} rel='stylesheet' />

      <Box
        sx={{
          position: 'relative',
          backgroundColor: query.bg.secondary,
          backgroundImage: `url(${query.bg.image})`,
          backgroundSize: 'cover',
          zIndex: 1,
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: query.bg.mask,
            zIndex: 2
          }
        }}
      >
        <Flex
          sx={{
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '90%',
            height: '100%',
            padding: 30,
            background: query.bg.primary,
            color: query.color.primary,
            zIndex: 3
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Image
              sx={{
                width: '50px'
              }}
              src={query.logo}
            />
            <Text
              sx={{
                marginLeft: 3,
                color: query.color.secondary,
                textTransform: 'uppercase'
              }}
            >
              {query.domain}
            </Text>
          </Flex>

          <Box>
            <Text
              sx={{
                marginBottom: 3,
                width: '75%',
                fontFamily: query.font.primary.name,
                fontSize: 6,
                fontWeight: query.font.primary.weight,
                lineHeight: 'normal'
              }}
            >
              {query.title}
            </Text>
            <Text
              sx={{
                marginBottom: 3,
                fontFamily: query.font.secondary.name,
                fontSize: 2,
                fontWeight: query.font.secondary.weight,
                lineHeight: 'normal',
                color: query.color.secondary
              }}
            >
              {query.subtitle}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  </Inline>
)

const query = {
  domain: 'ajames.dev',
  title: 'Multiple entry points in Create React App without ejecting',
  subtitle: 'June 02, 2020 | 6 min read',
  logo: 'https://i.imgur.com/EMrjD2G.png',
  bg: {
    primary:
      'linear-gradient(75deg, rgb(255,255,255) 0%, rgba(255,255,255, 0.95) 70%, transparent 0%)',
    secondary: 'rgb(0,0,0)',
    mask:
      'linear-gradient(75deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.25) 100%);',
    image: 'https://i.imgur.com/yPaaNRB.jpg'
  },
  color: {
    primary: 'rgb(0,0,0)',
    secondary: 'rgb(74,85,104)'
  },
  font: {
    primary: {
      name: 'Rubik',
      weight: 300,
      url:
        'https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap'
    },
    secondary: {
      name: 'Roboto',
      weight: 400,
      url:
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap'
    }
  }
}

export const ajames = { name: 'ajames', code, query }
