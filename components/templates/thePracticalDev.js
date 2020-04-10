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
            children={headline}
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
                src={image}
              />
              <Text
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: 1,
                  fontWeight: '700'
                }}
                children={cuote}
              />
            </Box>

            <Box>
              {[
                'https://picsum.photos/seed/picsum/300',
                'https://picsum.photos/seed/picsum/300',
                'https://picsum.photos/seed/picsum/300'
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  </Inline>
)
