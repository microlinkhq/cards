/* eslint-disable no-undef */

import Inline from 'inlinejsx.macro'
import { Link, Box, Text } from './scope'

export const article = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        rel='stylesheet'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: 'black',
          color: 'white',
          padding: 50
        }}
      >
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 3,
            fontWeight: '300'
          }}
          children={date}
        />
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 7,
            fontWeight: '700'
          }}
          children={headline}
        />
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 4,
            fontWeight: '300',
            borderBottom: '1px solid',
            paddingBottom: 5
          }}
          children={caption}
        />
      </Box>
    </>
  </Inline>
)
