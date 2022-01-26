/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=block'
        rel='stylesheet'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${query.image})`,
          color: 'white',
          padding: 50,
          backgroundSize: 'contain'
        }}
      >
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 3,
            fontWeight: 300
          }}
        >
          {query.date}
        </Text>
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 7,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
        >
          {query.headline}
        </Text>
        <Text
          sx={{
            fontFamily: 'Roboto',
            fontSize: 4,
            fontWeight: 300,
            borderBottom: 1,
            paddingBottom: 5
          }}
        >
          {query.caption}
        </Text>
      </Box>
    </>
  </Inline>
)

const query = {
  headline: 'STARSIGHT',
  caption: 'The highly-anticipated sequel to Skyward.',
  date: '21 January',
  image: 'https://i.imgur.com/o0dYDfK.jpg'
}

export const article = { name: 'Article', code, query }
