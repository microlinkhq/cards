/* eslint-disable no-use-before-define */
import Inline from '../inline.macro'
import { Image, Link, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{
          alignItems: 'center',
          backgroundImage: 'radial-gradient(#f3f3f3 .5px, transparent .5px)',
          backgroundSize: 'calc(10 * .5px) calc(10 * .5px)',
          flexDirection: 'column',
          fontFamily: 'Inter',
          justifyContent: 'center',
          padding: 48,
          textAlign: 'center'
        }}
      >
        <Image
          sx={{
            marginBottom: 32,
            width: 150
          }}
          src={`https://midu.dev/images/tags/${query.tag}.png`}
        />

        <Text
          sx={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 5
          }}
        >
          {query.title}
        </Text>

        <Image sx={{ width: 200 }} src='https://midu.dev/logo.png' />
      </Flex>
    </>
  </Inline>
)

const query = {
  title: 'Cómo eliminar un fichero con Node.js',
  tag: 'node'
}

export const midudev = { name: 'midudev', code, query }
