import Inline from '../inline.macro'
import { Link, Box, Flex, Text } from './scope'

const query = {
  author: 'Michelle Obama',
  bg: ['#757DFE', '#43AA53', '#03ACFD', '#FF4C15'],
  border: '6px solid black',
  color: 'white',
  fontFamily: 'IBM Plex Sans',
  fontWeight: 600,
  fontSize: '38px',
  quote:
    'I think folks are going to do the right thing. You know me, I’m just... I’m the ‘Yes we can’ man.',
  textAlign: 'right'
}

const code = (
  <Inline>
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bg: query.bg[Math.floor(Math.random() * query.bg.length)],
        p: 5
      }}
    >
      <Link
        href={`https://fonts.googleapis.com/css2?family=${encodeURI(
          query.fontFamily
        )}:wght@600&display=block`}
        rel='stylesheet'
      />
      <Box sx={{ textAlign: 'center' }}>
        <Text
          sx={{
            display: 'inline',
            borderBottom: query.border,
            lineHeight: 2,
            color: query.color,
            fontFamily: query.fontFamily,
            fontSize: query.fontSize,
            fontWeight: query.fontWeight,
            textTransform: 'uppercase'
          }}
        >
          “{query.quote}”
        </Text>
      </Box>

      <Text
        sx={{
          pt: `calc(${query.fontSize} / 0.75)`,
          fontFamily: query.fontFamily,
          fontSize: 5,
          fontWeight: query.fontWeight,
          width: '100%',
          textAlign: query.textAlign
        }}
      >
        {query.author}
      </Text>
    </Flex>
  </Inline>
)

export const spotify = { name: 'Spotify', code, query }
