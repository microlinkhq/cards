/* eslint-disable no-undef */

import Inline from 'inlinejsx.macro'
import { Link, Box, Text } from './scope'

export const zeit = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        rel='stylesheet'
      />
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
              <stop offset='0%' stopColor='#FFF'></stop>
              <stop offset='100%'></stop>
            </linearGradient>
          </defs>
          <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g fill='url(#a)' transform='translate(-293 -150)'>
              <path d='M350 150L407 250 293 250z'></path>
            </g>
          </g>
        </svg>
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 6,
            fontWeight: '700',
            marginTop: '30px'
          }}
          children={'Hello World'}
        />
      </Box>
    </>
  </Inline>
)
