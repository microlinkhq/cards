/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Link, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap'
        rel='stylesheet'
      />
      <Box
        sx={{
          backgroundColor: 'white',
          backgroundImage: 'radial-gradient(#f3f3f3 .5px, transparent .5px)',
          backgroundSize: 'calc(10 * .5px) calc(10 * .5px)',
          color: 'white',
          fontFamily: 'Inter',
          textAlign: 'center',
          zIndex: 1
        }}
      >
        <Flex
          sx={{
            color: 'black',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding: 48,
            width: '100%'
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              margin: '0 auto'
            }}
          >
            <Image
              sx={{
                marginBottom: '32px',
                width: '164px'
              }}
              src={`https://midu.dev/images/tags/${query.tag}.png`}
            />
          </Flex>

          <Box>
            <Text
              sx={{
                fontSize: '62px',
                fontWeight: '700',
                lineHeight: 1,
                marginBottom: 3
              }}
            >
              {query.title}
            </Text>
          </Box>
        </Flex>

        <Box as='footer'>
          <Flex
            sx={{
              alignItems: 'center',
              bottom: 4,
              justifyContent: 'center',
              left: 0,
              position: 'absolute',
              right: 0
            }}
          >
            <Image
              sx={{
                width: 48,
                height: 48
              }}
              src='https://midu.dev/logo.svg'
            />
            <Text
              as='span'
              sx={{
                color: 'black',
                fontFamily: 'Inter',
                fontSize: 5,
                fontWeight: '500',
                letterSpacing: '-.03m',
                ml: 2,
                textAlign: 'center'
              }}
            >
              {query.domain}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  </Inline>
)

const query = {
  domain: 'midu.dev',
  title: 'Cómo eliminar un fichero con Node.js',
  tag: 'node'
}

export default { name: 'midudev', code, query }
