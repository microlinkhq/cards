/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Avatar, Flex, Link, Paragraph, Text, Image } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@500&display=block'
        rel='stylesheet'
      />
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundImage: query.bg,
          backgroundColor: `${query.bgColor}`,
          padding: '3rem 4rem 0'
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            flexGrow: 1,
            maxWidth: '42rem',
            position: 'relative'
          }}
        >
          <Paragraph
            sx={{
              lineHeight: '3rem',
              fontSize: 5,
              fontWeight: 700,
              color: query.color,
              fontFamily: 'Montserrat'
            }}
          >
            {query.title}
          </Paragraph>
          <Flex
            sx={{
              py: '24px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Avatar
              sx={{ border: '2px solid white', size: 48 }}
              src={query.avatar}
            />
            <Text
              sx={{
                ml: 2,
                fontSize: 4,
                fontWeight: 500,
                color: query.color,
                fontFamily: 'Roboto'
              }}
            >
              {query.twitter}
            </Text>
          </Flex>
          {query.command && (
            <Text
              sx={{
                borderRadius: 6,
                padding: 1,
                fontWeight: 600,
                fontFamily: 'mono',
                color: query.color,
                fontSize: 2
              }}
            >
              {query.command}
            </Text>
          )}
        </Box>
        <Image
          sx={{
            bottom: '-15%',
            height: '55%',
            objectFit: 'contain',
            position: 'absolute'
          }}
          src={query.thumbnail}
        />
      </Flex>
    </>
  </Inline>
)

const query = {
  command: '`npm install city-timezones`',
  avatar: 'https://i.imgur.com/ersJAMI.jpg',
  color: '#000',
  bgColor: '#a3d9cf',
  thumbnail: 'https://i.imgur.com/kJ2n4m0.png',
  title:
    'A light and fast method of looking up timezones given the name of a city.',
  twitter: '@CKGrafico'
}

export const ckgrafico = { name: 'CKGrafico', code, query }
