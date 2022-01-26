/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <style>
        {`
        @font-face {
          font-family: 'CardFont';
          fontWeight: '400';
          fontStyle: 'normal';
          fontDisplay: 'swap';
          src: url("{query.fontUrl}") format("woff2");
        }
      `}
      </style>
      <Flex
        sx={{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bg: '#f4f5ef',
          padding: '0 64px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundImage: 'linear-gradient(90deg, #F2709C, #FF9472)',
            top: 0,
            right: 0,
            left: 0,
            height: '20px'
          }}
        />
        <Text
          sx={{
            fontFamily: 'CardFont',
            fontSize: 55,
            fontWeight: 400,
            textAlign: 'center',
            color: 'transparent',
            background: 'linear-gradient(90deg, #F2709C, #FF9472)',
            marginBottom: '25px'
          }}
          css={{
            '-webkit-background-clip': 'text'
          }}
        >
          {query.headline}
        </Text>

        {query.caption && (
          <Text
            sx={{
              fontFamily: 'CardFont',
              fontSize: 40,
              textAlign: 'center',
              fontWeight: 400,
              display: 'inline',
              color: '#3D381E',
              backgroundColor: '#ffffff',
              lineHeight: '1.45'
            }}
          >
            {query.caption}
          </Text>
        )}
      </Flex>
    </>
  </Inline>
)

const query = {
  headline: 'Add your headline',
  caption: 'Add your caption',
  fontUrl:
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2'
}

export const m1guelpf = { name: 'm1guelpf', code, query }
