/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Image, Text } from './scope'

const code = (
  <Inline>
    <>
      <Box
        sx={{
          position: 'relative',
          background: query.bg,
          fontFamily: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
          px: 78,
          py: 74
        }}
      >
        <Image
          sx={{ maxHeight: 36, display: 'block', mb: 14, ml: '2px' }}
          src={query.logo}
        />

        <Text
          sx={{
            display: 'block',
            fontSize: 46,
            fontWeight: 200,
            lineHeight: 1.05,
            letterSpacing: 0.5,
            color: query.color,
            mb: 56
          }}
          dangerouslySetInnerHTML={{ __html: query.title }}
        />

        <Text
          sx={{
            fontSize: 18,
            fontWeight: 300,
            color: query.color
          }}
        >
          {query.date}
          <br /> {query.time}
        </Text>

        <Text
          sx={{
            color: query.color,
            position: 'absolute',
            top: 26,
            right: 38,
            fontSize: 18,
            fontWeight: 300,
            textTransform: 'uppercase'
          }}
        >
          {query.marker}
        </Text>
      </Box>
    </>
  </Inline>
)

const query = {
  bg: '#000',
  color: '#fff',
  date: 'October 28, 2021',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg',
  marker: 'live',
  time: '2:00 p.m. PT / 5:00 p.m. ET',
  title: 'Apple Financial Results<br /> Conference Call<br/> Q4 2021'
}

export const appleFinancial = { name: 'Apple Financial', code, query }
