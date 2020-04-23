/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Flex, Image, Box, Text } from './scope'

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
            border: 10px solid;
            border-image-source: linear-gradient(
              to right,
              rgb(247, 102, 152) 0%,
              rgb(234, 64, 123) 29%,
              rgb(101, 78, 163) 100%
            );
            border-image-slice: 1;
          `}
          sx={{
            bg: 'white',
            padding: '30px'
          }}
        >
          <Link
            href='https://fonts.googleapis.com/css2?family=Merriweather:wght@400;900&display=swap'
            rel='stylesheet'
          />
          <Text
            css={`
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            `}
            sx={{
              pt: 4,
              pb: 5,
              fontSize: 7,
              background:
                'linear-gradient(to right, rgb(247, 102, 152) 0%, rgb(234, 64, 123) 29%, rgb(101, 78, 163) 100%);',
              lineHeight: 1.4,
              fontWeight: '900',
              fontFamily: 'Merriweather',
              maxWidth: '36rem',
              bg: 'white'
            }}
            children={query.title}
          />
          <Flex
            sx={{
              justifyContent: 'space-between'
            }}
          ></Flex>
        </Box>
      </Box>
    </>
  </Inline>
)

const query = {
  title: 'Craft quality editorial flows in Premier Pro'
}

export default { name: 'adobe', code, query }
