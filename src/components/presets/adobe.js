/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Text } from './scope'

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
            border-image-source: linear-gradient(to right, #ed4264, #ffedbc);
            border-image-slice: 1;
          `}
          sx={{
            border: '10px solid',
            bg: `${query.bg}`,
            padding: '30px',
            width: '100%',
            height: '100%'
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
              background: 'linear-gradient(to right, #ed4264, #ffedbc);;',
              lineHeight: 1.4,
              fontWeight: 'bold',
              fontFamily: 'Merriweather',
              maxWidth: '36rem',
              bg: `${query.bg}`
            }}
            children={query.title}
          />
        </Box>
      </Box>
    </>
  </Inline>
)

const query = {
  title: 'Craft quality editorial flows in Premier Pro',
  bg: 'black'
}

export default { name: 'adobe', code, query }
