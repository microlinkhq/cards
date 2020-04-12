/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Flex, Link, Box, Text, Image } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        rel='stylesheet'
      />
      <Box
        sx={{
          fontFamily: 'Roboto',
          backgroundImage:
            'url(https://kikobeats.com/images/avatar-glitch.jpg)',
          color: 'white',
          zIndex: 1
        }}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            background:
              'linear-gradient(70deg,white 0%,white 70%,transparent 0%)',
            color: 'black',
            width: '70%',
            padding: 30,
            zIndex: 2
          }}
        >
          <Flex sx={{ alignItems: 'center', marginBottom: 4 }}>
            <Image
              sx={{
                width: '50px'
              }}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/490px-Unofficial_JavaScript_logo_2.svg.png'
            />
            <Text sx={{ textTransform: 'uppercase', marginLeft: 2 }}>
              wellpaid.io
            </Text>
          </Flex>

          <Box>
            <Text
              sx={{
                fontSize: 6,
                lineHeight: 1,
                marginBottom: 3,
                fontWeight: '700'
              }}
            >
              What NOT to do when remote working
            </Text>
            <Text sx={{ width: '80%' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus consectetur totam sequi ducimus, laboriosam voluptatum,
              expedita fuga hic quibusdam facilis quasi architecto nobis
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  </Inline>
)

const query = {
  foo: 'bar'
}

export default { name: 'news', code, query }
