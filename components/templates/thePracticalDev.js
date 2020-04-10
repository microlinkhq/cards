/* eslint-disable no-undef */

import Inline from 'inlinejsx.macro'
import { Flex, Image, Box, Text } from './scope'

export const thePracticalDev = (
  <Inline>
    <>
      <Flex
        sx={{
          bg: '#EAF1F7',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            bg: 'white',
            color: 'black',
            margin: 50,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            padding: '30px',
            border: '2px solid #000',
            boxShadow: '10px 10px 0px 0px rgba(0,0,0)'
          }}
        >
          <Text
            sx={{
              pt: 4,
              pb: 5,
              fontSize: 7,
              lineHeight: 1,
              fontWeight: '700',
              fontFamily: 'mono',
              maxWidth: '46rem'
            }}
            children='Learn Web Development for Free'
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Image
                sx={{
                  border: '2px solid #000',
                  maxHeight: '50px',
                  borderRadius: '50%',
                  marginRight: '10px'
                }}
                src='https://kikobeats.com/images/avatar-glitch.jpg'
              />
              <Text
                sx={{
                  fontSize: 3,
                  fontWeight: '700'
                }}
                children='Kiko Beats · Apr 29'
              />
            </Box>

            <Flex
              sx={{
                width: '200px',
                justifyContent: 'space-between'
              }}
            >
              {[
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/490px-Unofficial_JavaScript_logo_2.svg.png',
                'https://miro.medium.com/max/1024/1*dOizsWycMALIUfqbpNvaMQ.png',
                'https://vuejs.org/images/logo.png'
              ].map(image => {
                return (
                  <Image
                    sx={{
                      maxHeight: '50px'
                    }}
                    key={image}
                    src={image}
                  />
                )
              })}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  </Inline>
)
