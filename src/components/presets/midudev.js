/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap'
        rel='stylesheet'
      />
      <Box as='header' sx={{}}>
        <Flex
          sx={{
            left: 0,
            right: 0,
            bottom: 4,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
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
              ml: 2,
              letterSpacing: '-.03m',
              fontFamily: 'Inter',
              fontSize: 5,
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            midu.dev
          </Text>
        </Flex>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          backgroundImage: 'radial-gradient(#f3f3f3 .5px, transparent .5px)',
          backgroundSize: 'calc(10 * .5px) calc(10 * .5px)',
          fontFamily: 'Inter',
          color: 'white',
          textAlign: 'center',
          zIndex: 1
        }}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            color: 'black',
            width: '100%',
            padding: 48
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
                lineHeight: 1,
                marginBottom: 3,
                fontWeight: '700'
              }}
            >
              {query.title}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  </Inline>
)

const query = {
  title: 'Cómo eliminar un fichero con Node.js',
  tag: 'node'
}

export default { name: 'midudev', code, query }
