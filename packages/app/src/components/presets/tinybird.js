/* eslint-disable */

import Inline from '../inline.macro'
import { Image, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: '#25283D',
          pl: 5,
          pr: 5
        }}
      >
        <Link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap'
          rel='stylesheet'
        />
        <Flex
          as='header'
          sx={{
            position: 'absolute',
            top: 0,
            left: 5,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mt: '3em'
          }}
        >
          <Image
            sx={{
              width: '26px'
            }}
            src='https://storage.googleapis.com/tinybird-assets/img/logo-inverted.svg'
          />
          <Flex>
            <Text
              sx={{
                pl: 3,
                display: 'inline-block',
                fontWeight: 400,
                fontSize: '22px',
                fontFamily: 'Inter',
                color: '#FFF',
                lineHeight: '140%'
              }}
            >
              Tinybird
            </Text>
            {query.subtitle && (
              <Text
                style={{
                  display: 'inline-block',
                  fontWeight: 400,
                  fontSize: '22px',
                  fontFamily: 'Inter',
                  color: '#1FCC83',
                  lineHeight: '140%'
                }}
              >
                /{query.subtitle}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex as='content'>
          <Text
            sx={{
              display: 'inline',
              fontWeight: 400,
              fontSize: '42px',
              fontFamily: 'Inter',
              color: '#FFF',
              lineHeight: '140%'
            }}
          >
            {query.text}
          </Text>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  subtitle: 'guides',
  text: 'Learn how to accelerate real-time analytics'
}

export const tinybird = { name: 'tinybird', code, query }
