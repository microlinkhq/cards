/* eslint-disable no-undef */

import Inline from 'inlinejsx.macro'
import { Box, Text } from './scope'

export const simple = (
  <Inline>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bg: 'black',
        color: 'white'
      }}
    >
      <Text
        sx={{
          fontSize: 6,
          fontWeight: 'bold'
        }}
        children={headline}
      />
      <Text
        sx={{
          fontSize: 3,
          fontWeight: 'lighter'
        }}
        children={caption}
      />
    </Box>
  </Inline>
)
