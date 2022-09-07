/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Avatar, Link, Image, Box, Flex, Paragraph } from './scope'

const code = (
  <Inline>
    <Flex
      sx={{
        bg: query.bg,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=block'
        rel='stylesheet'
      />
      <Flex
        sx={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pr: '100px'
        }}
      >
        <Flex
          as='header'
          sx={{
            flexShrink: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Avatar sx={{ width: '90px' }} src={query.avatar} />
          <Box sx={{ px: 2 }} />
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}
          >
            <Paragraph
              sx={{
                pt: '-12px',
                fontWeight: 700,
                fontFamily: 'Inter',
                fontSize: 5,
                color: query.color
              }}
            >
              {query.name}
            </Paragraph>
            <Flex
              sx={{
                alignItems: 'center'
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
              >
                <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
              </svg>
              <Paragraph
                sx={{
                  pl: 1,
                  fontWeight: 400,
                  color: query.color,
                  fontFamily: 'Inter',
                  fontSize: 2
                }}
              >
                {query.github}
              </Paragraph>
            </Flex>
          </Flex>
        </Flex>
        <Image sx={{ pt: 4, maxWidth: '435px' }} src={query.logos} />
        <Box
          as='footer'
          sx={{
            position: 'absolute',
            right: '60px',
            bottom: '-33px'
          }}
        >
          <Paragraph
            sx={{
              transform: 'rotate(90deg)',
              transformOrigin: 'bottom right',
              textAlign: 'center',
              pb: 3,
              width: 'calc(320px - 10px)',
              borderBottom: `2px dashed ${query.color}`,
              color: query.color,
              fontWeight: 700,
              fontFamily: 'Inter',
              fontSize: 5
            }}
          >
            № {query.ticketNumber}
          </Paragraph>
        </Box>
      </Flex>
      <svg
        width='666'
        height='326'
        viewBox='0 0 666 326'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M663 131.004L662.962 133.503C663.632 133.514 664.277 133.255 664.754 132.785C665.231 132.315 665.5 131.673 665.5 131.004H663ZM663 195.996H665.5C665.5 195.327 665.231 194.685 664.754 194.215C664.277 193.745 663.632 193.486 662.962 193.497L663 195.996ZM3 195.996L3.0376 193.497C2.36812 193.486 1.72257 193.745 1.24558 194.215C0.768581 194.685 0.5 195.327 0.5 195.996H3ZM3 131.004H0.5C0.5 131.673 0.768581 132.315 1.24558 132.785C1.72257 133.255 2.36812 133.514 3.0376 133.503L3 131.004ZM23 0.5C10.5736 0.5 0.5 10.5736 0.5 23H5.5C5.5 13.335 13.335 5.5 23 5.5V0.5ZM643 0.5H23V5.5H643V0.5ZM665.5 23C665.5 10.5736 655.426 0.5 643 0.5V5.5C652.665 5.5 660.5 13.335 660.5 23H665.5ZM665.5 131.004V23H660.5V131.004H665.5ZM662.5 133.5C662.654 133.5 662.808 133.501 662.962 133.503L663.038 128.504C662.859 128.501 662.68 128.5 662.5 128.5V133.5ZM632.5 163.5C632.5 146.931 645.931 133.5 662.5 133.5V128.5C643.17 128.5 627.5 144.17 627.5 163.5H632.5ZM662.5 193.5C645.931 193.5 632.5 180.069 632.5 163.5H627.5C627.5 182.83 643.17 198.5 662.5 198.5V193.5ZM662.962 193.497C662.808 193.499 662.654 193.5 662.5 193.5V198.5C662.68 198.5 662.859 198.499 663.038 198.496L662.962 193.497ZM665.5 303V195.996H660.5V303H665.5ZM643 325.5C655.426 325.5 665.5 315.426 665.5 303H660.5C660.5 312.665 652.665 320.5 643 320.5V325.5ZM23 325.5H643V320.5H23V325.5ZM0.5 303C0.5 315.426 10.5736 325.5 23 325.5V320.5C13.335 320.5 5.5 312.665 5.5 303H0.5ZM0.5 195.996V303H5.5V195.996H0.5ZM3.5 193.5C3.34568 193.5 3.19154 193.499 3.0376 193.497L2.9624 198.496C3.14119 198.499 3.32039 198.5 3.5 198.5V193.5ZM33.5 163.5C33.5 180.069 20.0685 193.5 3.5 193.5V198.5C22.83 198.5 38.5 182.83 38.5 163.5H33.5ZM3.5 133.5C20.0685 133.5 33.5 146.931 33.5 163.5H38.5C38.5 144.17 22.83 128.5 3.5 128.5V133.5ZM3.0376 133.503C3.19154 133.501 3.34568 133.5 3.5 133.5V128.5C3.32039 128.5 3.14119 128.501 2.9624 128.504L3.0376 133.503ZM0.5 23V131.004H5.5V23H0.5Z'
          fill='url(#paint0_linear)'
        />
        <defs>
          <linearGradient
            id='paint0_linear'
            x1='3'
            y1='158'
            x2='653'
            y2='163'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor={query.gradient[0]} />
            <stop offset='0.354167' stopColor={query.gradient[1]} />
            <stop offset='0.729167' stopColor={query.gradient[2]} />
            <stop offset='1' stopColor={query.gradient[3]} />
          </linearGradient>
        </defs>
      </svg>
    </Flex>
  </Inline>
)

const query = {
  gradient: ['#D25778', '#EC585C', '#E7D155', '#56A8C6'],
  color: 'black',
  bg: 'white',
  ticketNumber: '014747',
  avatar: 'https://i.imgur.com/zvYelo4.jpg',
  github: 'GermanRodrickson',
  name: 'Germán Rodríguez',
  logos: 'https://i.imgur.com/rbVQBad.png'
}

export const conference = { name: 'Conference', code, query }
