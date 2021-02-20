/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=block'
        rel='stylesheet'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage:
            'url(https://w.wallhaven.cc/full/2e/wallhaven-2exmm9.jpg)',
          color: 'white',
          padding: 50,
          backgroundSize: 'contain'
        }}
      >
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 3,
            fontWeight: 300
          }}
        >
          21 January
        </Text>
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 7,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
        >
          STARSIGHT
        </Text>
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 4,
            fontWeight: 300,
            borderBottom: 1,
            paddingBottom: 5
          }}
        >
          The highly-anticipated sequel to Skyward.
        </Text>
      </Box>
    </>
  </Inline>
)

const query = {
  foo: 'bar'
}

export const article = { name: 'article', code, query }
