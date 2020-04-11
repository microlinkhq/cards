/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Text, Image } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{
          bg: 'white',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            bg: 'white',
            color: '#323FCB',
            padding: 100
          }}
        >
          <Image
            sx={{ width: '200px', marginBottom: '50px' }}
            src='https://fauna.com/assets/img/Fauna-logo-blue.png'
          ></Image>
          <Flex
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Text
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: 7,
                  fontWeight: '700',
                  width: '40px',
                  lineHeight: 1
                }}
              >
                {query.title}
              </Text>
              <Box sx={{ marginTop: 2 }}>
                <Text
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: 2,
                    fontWeight: '300',
                    display: 'inline-block',
                    color: 'white',
                    bg: '#323FCB',
                    padding: '1px 10px',
                    marginRight: 1,
                    textTransform: 'uppercase'
                  }}
                >
                  Podcast
                </Text>
                <Text
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: 3,
                    fontWeight: '300',
                    display: 'inline-block'
                  }}
                >
                  with Fauna
                </Text>
              </Box>
            </Box>
            <Box>
              <Text
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: 5,
                  fontWeight: '700'
                }}
              >
                Disscenting Static.fun
              </Text>
              <Box
                sx={{
                  bg: '#323FCB',
                  height: '2px',
                  width: '30px',
                  margin: '10px 0'
                }}
              ></Box>
              <Text sx={{ display: 'inline-block' }}>Allen Hai </Text>
              <Text sx={{ display: 'inline-block' }}>
                Software Engineer @ ZEIT
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  </Inline>
)

const query = {
  title: 'Build_ Fearlessly'
}

export default { name: 'article', code, query }
