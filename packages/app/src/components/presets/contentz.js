import Inline from '../inline.macro'
import { Link, Flex, Paragraph } from './scope'

const query = {
  bg: '#fff',
  color: '#000',
  description: 'Create Content, Get a Highly Optimized Website',
  title: 'Contentz'
}

const code = (
  <Inline>
    <Flex
      sx={{
        fontSize: 40,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2em',
        backgroundColor: query.bg,
        color: query.color
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@200;700&display=block'
        rel='stylesheet'
      />
      <Paragraph
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          letterSpacing: '-0.028em',
          margin: '1.5em 0'
        }}
      >
        {query.title}
      </Paragraph>
      <Paragraph
        sx={{
          fontFamily: 'Inter',
          fontWeight: 200,
          borderLeft: '3px solid black',
          paddingLeft: 'calc(0.5em - 3px)',
          letterSpacing: '-0.028em',
          margin: '-1em 0 1em -0.5em'
        }}
      >
        {query.description}
      </Paragraph>
    </Flex>
  </Inline>
)

export const contentz = { name: 'Contentz', code, query }
