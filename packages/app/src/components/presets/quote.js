/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { polished, Link, Avatar, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: query.bg,
          p: 5,
          pt: 0
        }}
      >
        <Flex
          as='main'
          sx={{ maxWidth: '42rem', flexGrow: 1 }}
          style={{ display: 'inline' }}
        >
          <Link
            href='https://fonts.googleapis.com/css2?family=Lora:wght@400&display=block'
            rel='stylesheet'
          />
          <Text
            sx={{
              px: 2,
              display: 'inline',
              fontWeight: 400,
              fontSize: query.font,
              fontFamily: 'Lora',
              color: query.color,
              lineHeight: 1.3,
              '::before': {
                opacity: 0.25,
                display: 'block',
                mb: `-${query.font}`,
                content: `'${query.symbol}'`,
                color: query.color,
                fontSize: `calc(${query.font}*1.5)`
              }
            }}
          >
            {query.text}
          </Text>
        </Flex>
        <Flex
          as='footer'
          sx={{
            pt: 2,
            flexShrink: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              mr: 4
            }}
          >
            <Link
              href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400&display=block'
              rel='stylesheet'
            />
            <Text
              sx={{
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 5,
                color: query.color
              }}
            >
              {query.job}
            </Text>
            <Text
              sx={{
                fontWeight: 400,
                fontStyle: 'italic',
                fontFamily: 'Roboto',
                color: query.color,
                fontSize: 3
              }}
            >
              {query.author}
            </Text>
          </Flex>
          <Avatar
            sx={{
              border: '4px solid',
              borderColor: polished.rgba(query.color, 0.25),
              width: `calc(${query.font}*2.2)`
            }}
            src={query.avatar}
          />
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  bg: 'white',
  color: 'black',
  symbol: '“',
  text: 'My goal is no longer to get more done, but to have less to do.',
  avatar: 'https://i.imgur.com/vPSW2ZD.jpg',
  author: 'Head of Engineering at Cabify',
  job: 'Keyvan Akbary',
  font: '50px'
}

export const quote = { name: 'Quote', code, query }
