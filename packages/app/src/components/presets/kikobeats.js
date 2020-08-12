/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${query.bg})`,
          backgroundSize: 'cover'
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: 'center'
          }}
        >
          <Text
            css={`
              background: white;
              padding: 0.5rem 2rem;
              font-family: ${query.font};
              color: ${query.color};
              font-size: ${(() => {
                if (query.title.length < 20) return query.title.length * 4
                if (query.title.length < 40) return query.title.length * 2.8
                return query.title.length
              })()}px;
              line-height: ${(() => {
                if (query.title.length < 20) return 120
                if (query.title.length < 40) return 80
                return 64
              })()}px;
              font-weight: 700;
            `}
            dangerouslySetInnerHTML={{ __html: query.title }}
          />
        </Box>
      </Flex>
    </>
  </Inline>
)

const query = {
  font: "Georgia, 'Times New Roman', Times, serif",
  title: 'Speed is the feature',
  color: 'black',
  bg: 'https://i.imgur.com/rDY6kZq.jpg'
}

export const kikobeats = { name: 'kikobeats', code, query }
