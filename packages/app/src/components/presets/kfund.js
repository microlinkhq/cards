/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Image, Box, Flex, Paragraph } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: query.bg
        }}
      >
        <Box
          sx={{
            p: 6,
            textAlign: 'center'
          }}
        >
          <Image sx={{ width: query.logoSize }} src={query.logoUrl} />

          <Paragraph
            css={`
              font-size: ${query.title.length > 56 ? '32px' : '48px'};
              color: ${query.color};
              font-family: Canela, sans-serif;
              font-weight: 300;
              line-height: 52px;
              padding-top: 36px;
            `}
            dangerouslySetInnerHTML={{ __html: query.title }}
          />
        </Box>
      </Flex>
    </>
  </Inline>
)

const query = {
  title: 'Invertimos en las <b>mejores startups seed</b> de España',
  logoSize: '200px',
  logoUrl:
    'https://assets.website-files.com/5e81f51ccb7246becdfec96c/5e81f6d44bdd51b7e14e38e9_Dark.svg',
  color: '#0d151d',
  bg: 'white'
}

export const kfund = { name: 'kfund', code, query }
