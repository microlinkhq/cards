import Inline from '../inline.macro'
import { Link, Flex, Text } from './scope'

const query = {
  headline: 'Add your headline',
  caption: 'Add your caption',
  bg: 'black',
  color: 'white'
}

const code = (
  <Inline>
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bg: query.bg,
        color: query.color
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=block'
        rel='stylesheet'
      />
      <Text
        sx={{
          fontFamily: 'Roboto',
          fontSize: 6,
          fontWeight: 700
        }}
      >
        {query.headline}
      </Text>
      <Text
        sx={{
          fontFamily: 'Roboto',
          fontSize: 3,
          fontWeight: 300
        }}
      >
        {query.caption}
      </Text>
    </Flex>
  </Inline>
)

export const simple = { name: 'Simple', code, query }
