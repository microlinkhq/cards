/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Flex, polished, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          background: '##FBFBFE',
          color: '#101010',
          fontFamily: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          sx={{
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1
          }}
        >
          {query.title1}
        </Text>

        <Box
          sx={{
            height: 70,
            width: 70,
            ml: 14,
            mr: 18,
            background: `url('${query.logo}') no-repeat center center / contain`
          }}
        />

        <Box
          sx={{
            position: 'relative',
            '::before': {
              position: 'absolute',
              content: '""',
              left: '-8px',
              top: '-4px',
              width: 14,
              height: 14,
              borderRadius: 7,
              background: query.highlight,
              transform: 'translateX(-50%)'
            },
            '::after': {
              position: 'absolute',
              content: '""',
              right: '-6px',
              bottom: '-26px',
              width: 14,
              height: 14,
              borderRadius: 7,
              background: query.highlight,
              transform: 'translateX(50%)'
            }
          }}
        >
          <Text
            sx={{
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 1,
              '::after': {
                position: 'absolute',
                content: '""',
                top: '6px',
                left: '-8px',
                right: '-6px',
                bottom: '-16px',
                backgroundColor: polished.rgba(query.highlight, 0.15),
                borderLeft: `3px solid ${query.highlight}`,
                borderRight: `3px solid ${query.highlight}`,
              }
            }}
          >
            {query.title2}
          </Text>

          <Text
            sx={{
              position: 'absolute',
              top: -64,
              left: '50%',
              transform: 'translateX(-50%)',
              background: query.color,
              color: query.bg,
              px: 16,
              py: 10,
              fontSize: 18,
              borderRadius: 10,
              '::after': {
                position: 'absolute',
                content: '""',
                left: '50%',
                bottom: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '14px 14px 0 14px',
                borderColor: `${query.color} transparent transparent transparent`,
                transform: 'translateX(-50%) translateY(100%)'
              }
            }}
          >
            {query.tooltip}
          </Text>
        </Box>
      </Flex>
    </>
  </Inline>
)

const query = {
  bg: '#FBFBFE',
  color: '#101010',
  highlight: '#0279FF',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  title1: 'Make',
  title2: 'yours.',
  tooltip: 'Speak'
}

export const accessibility = { name: 'accessibility', code, query }
