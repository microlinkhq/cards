/* eslint-disable no-undef */

import Inline from 'inlinejsx.macro'
import { Link, Box, Text } from './scope'

export const thePracticalDev = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        rel='stylesheet'
      />
      <Box
        sx={{
          bg: '#EAF1F7',
          display: 'flex',
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
            boxShadow: '10px 10px 0px 0px rgba(0,0,0)'
          }}
        >
          <Text
            sx={{
              fontFamily: 'Roboto',
              fontSize: 7,
              fontWeight: '700',
              marginBottom: 6
            }}
            children={'Learn Vuejs for free'}
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
                  maxHeight: '50px',
                  borderRadius: '50%',
                  marginRight: '10px'
                }}
                src={'https://kikobeats.com/images/avatar-glitch.jpg'}
              />
              <Text
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: 1,
                  fontWeight: '700'
                }}
                children={'Apr 9'}
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
                    src={image}
                  />
                )
              })}
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  </Inline>
)
