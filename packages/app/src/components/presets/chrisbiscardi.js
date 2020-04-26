/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Flex, Box, Text } from './scope'

const code = (
  <Inline>
    <>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Flex
          css={`
            border-image-source: ${query.gradient};
            border-image-slice: 1;
          `}
          sx={{
            border: '14px solid',
            bg: query.bg,
            padding: 5,
            width: '100%',
            height: '100%',
            flexDirection: 'column'
          }}
        >
          <Link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'
            rel='stylesheet'
          />
          <Text
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '40px',
              fontWeight: 700,
              fontFamily: 'Open Sans',
              maxWidth: '30rem',
              bg: query.bg,
              flexGrow: 1,
              color: query.primary
            }}
            children={query.title}
          />
          <Box as='footer'>
            <Box
              sx={{
                mb: 3,
                flexShrink: 0,
                width: '60px',
                height: '5px',
                borderRadius: '5px',
                background: query.complementary
              }}
            />
            <Flex
              sx={{
                justifyContent: 'space-between'
              }}
            >
              <Text
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: 400,
                  fontSize: 2,
                  color: query.secondary
                }}
                children={query.subtitle}
              />
              <Text
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: 400,
                  fontSize: 2,
                  color: query.secondary
                }}
                children={query.name}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  </Inline>
)

const query = {
  title: 'Cloudinary as a write throught serverless image generation cache',
  bg: '#181D28',
  primary: '#fff',
  secondary: '#D3D3D3',
  name: 'Chris Biscardi',
  subtitle: 'custom CSS based opengraph images',
  gradient: `linear-gradient(
    135deg,
    rgb(243, 31, 38),
    hsl(12, 90%, 59%),
    hsl(57, 90%, 59%),
    hsl(102, 90%, 59%),
    hsl(147, 90%, 59%),
    hsl(192, 90%, 59%),
    hsl(237, 90%, 59%),
    hsl(282, 90%, 59%)
  )`,
  complementary:
    'linear-gradient(90deg, hsl(316,81%,64%),hsl(1,81%,64%),hsl(46,81%,64%),hsl(91,81%,64%),hsl(136,81%,64%),hsl(181,81%,64%))'
}

export default { name: 'chrisbiscardi', code, query }
