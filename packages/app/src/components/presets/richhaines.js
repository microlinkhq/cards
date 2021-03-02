/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Flex, Grid, Text } from './scope'

const code = (
    <Inline>
    <>
    <Link
    href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400&display=swap" 
    rel="stylesheet"
    />
  <Grid 
  sx={{
    gridTemplateRows: '1fr 100px 50px',
    gap: 0,
    bg: '#e2a114',
    backgroundImage: `url(${query.backgroundImage})`,
  }}
  >
  <Flex
    sx={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: query.color,
      p: 3
    }}
  >
  <Flex
  sx={{
    bg: '#dee2d7',
    width: '100%',
    height: '100%',
    p: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <Text
      sx={{
        fontFamily: 'Jost',
        fontSize: 7,
        fontWeight: 400,
        color: '#1f2127'
      }}
    >
      {query.headline}
    </Text>
    </Flex>
  </Flex>
    <Flex
    sx={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: query.color,
      p: 3
    }}
  >
  <Flex
  sx={{
    bg: '#000000',
    width: '90%',
    p: 2,
    transform: 'rotate(-7deg)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  }}
  >
    <Text
      sx={{
        fontFamily: 'Jost',
        fontSize: 3,
        fontWeight: 400,
        color: '#dee2d7'
      }}
    >
      {query.caption}
    </Text>
    </Flex>
  </Flex>
    <Flex
    sx={{
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexDirection: 'row',
      p: 4,
      height: '50px',
    }}
  >
      <Text
      sx={{
        fontFamily: 'Jost',
        fontSize: 3,
        fontWeight: 400,
        color: '#1f2127'
      }}
    >
      {query.domain}
    </Text>
    <Text
      sx={{
        fontFamily: 'Jost',
        fontSize: 3,
        fontWeight: 400,
        color: '#1f2127'
      }}
    >
      {query.twitterHandle}
    </Text>
  </Flex>
  </Grid>
  </>
  </Inline>
)

const query = {
  domain: 'richardhaines.dev',
  twitterHandle: '@studio_hungry',
  headline: 'Jamstack and the power of serverless with FaunaDB',
  caption: 'Tutorial to create a harry potter site using faunadb and serverless functions',
  backgroundImage: 'https://richardhaines.dev/diamonds.png'
}

export const richhaines = { name: 'richhaines', code, query }
