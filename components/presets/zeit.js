/* eslint-disable no-use-before-define */

import Inline from 'inlinejsx.macro'
import { Link, Box, Text } from './scope'

const code = (
  <Inline>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage:
          'radial-gradient(#D7D7D7 1px, transparent 0), radial-gradient(#D7D7D7 1px, transparent 0)',
        backgroundPosition: '0 0, 25px 25px',
        backgroundSize: '50px 50px',
        color: 'black',
        bg: 'white'
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='114'
        height='100'
        viewBox='0 0 114 100'
      >
        <defs>
          <linearGradient
            id='a'
            x1='100.93%'
            x2='41.769%'
            y1='181.283%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#FFF' />
            <stop offset='100%' />
          </linearGradient>
        </defs>
        <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
          <g fill='url(#a)' transform='translate(-293 -150)'>
            <path d='M350 150L407 250 293 250z' />
          </g>
        </g>
      </svg>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@300;700&display=swap'
        rel='stylesheet'
      />
      <Text
        sx={{
          fontFamily: 'Inter',
          fontSize: 6,
          mt: 5,
          textAlign: 'center',
          fontWeight: '700',
          lineHeight: 1
        }}
        children={query.headline}
      />
      <Text
        sx={{
          fontFamily: 'Inter',
          fontSize: 6,
          mt: 2,
          textAlign: 'center',
          fontWeight: '300'
        }}
        children={query.caption}
      />
    </Box>
  </Inline>
)

const query = {
  headline: 'Serverless Deployments',
  caption: 'with ZEIT Now'
}

export default {
  name: 'zeit',
  code,
  query
}
