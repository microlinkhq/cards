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
        <Box
          css={`
            border-image-source: linear-gradient(
              to right,
              orange,
              yellow,
              green,
              cyan,
              blue,
              violet
            );
            border-image-slice: 1;
          `}
          sx={{
            border: '10px solid',
            bg: `${query.bg}`,
            padding: 5,
            width: '100%',
            height: '100%'
          }}
        >
          <Link
            href='https://fonts.googleapis.com/css2?family=Merriweather:wght@400;900&display=swap'
            rel='stylesheet'
          />
          <Text
            sx={{
              pt: 4,
              pb: 5,
              fontSize: 5,
              lineHeight: 1.4,
              fontWeight: 'bold',
              fontFamily: 'Merriweather',
              maxWidth: '36rem',
              bg: `${query.bg}`,
              color: 'white',
              marginTop: 4
            }}
            children={query.title}
          />
          <Box
            sx={{
              width: '50px',
              height: '5px',
              borderRadius: '5px',
              marginBottom: 3,
              background:
                'linear-gradient(to right,orange,yellow,green,cyan,blue,violet);'
            }}
          />
          <Flex
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Text
              sx={{
                fontSize: 2,
                color: '#D3D3D3'
              }}
              children={query.subtitle}
            />
            <Text
              sx={{
                fontSize: 1,
                color: '#D3D3D3'
              }}
              children={query.name}
            />
          </Flex>
        </Box>
      </Box>
    </>
  </Inline>
)

const query = {
  title: 'Cloudinary as a write throught serverless image generation cache',
  bg: '#181D28',
  name: 'Chris Biscardi',
  subtitle: 'custom CSS based opengraph images'
}

export default { name: 'chrisbiscardi', code, query }
