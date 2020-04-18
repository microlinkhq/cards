/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${query.image})`,
          border: `10px solid ${query.primaryColor}`,
          boxShadow: `0.5em 0.5em 0px ${query.textColor}`
        }}
      >
        <Box
          sx={{
            p: 6,
            textAlign: 'center'
          }}
        >
          <Text
            sx={{
              lineHeight: 1.25,
              bg: query.primaryColor,
              color: query.textColor,
              fontFamily: 'Open Sans',
              fontSize: 7,
              px: '60px',
              py: 4,
              fontWeight: '700'
            }}
            children={query.title}
          />
        </Box>
      </Flex>
    </>
  </Inline>
)

const query = {
  title: 'Paradigmas con emoji',
  image: 'https://bytesandhumans.netlify.app/assets/img/posts/paradigmas.png',
  textColor: 'black',
  bgColor: 'white',
  primaryColor: '#85FFE0'
}

export default { name: 'BytesAndHumans', code, query }
