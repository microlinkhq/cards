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
        children='Culture of Shipping'
      />
      <Text
        sx={{
          fontSize: 3,
          fontWeight: 'lighter'
        }}
        children='when dreams come true'
      />
    </Box>
  </Inline>
)
