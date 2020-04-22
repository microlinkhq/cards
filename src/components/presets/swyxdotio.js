/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Link, Box, Flex, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
        rel='stylesheet'
      />
      <Flex
        sx={{ position: 'relative', background: query.gradient, padding: query.border }}
      >
        <Flex sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Flex
            css={`
              ::after {
                position: absolute;
                content: '';
                top: 0;
                right: calc(56% -${query.divider});
                background-color: transparent;
                border-right: ${query.divider} solid transparent;
                border-top: calc(470px - ${query.border}) solid white;
              }
            `}
            sx={{
              width: '50%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              bg: query.bg,
              p: 5,
              pr: 0
            }}
          >
            <Text
              sx={{
                lineHeight: 1.25,
                fontFamily: 'Inter',
                fontSize: 6,
                fontWeight: '700',
                color: query.color
              }}
              children={query.title}
            />
            <Text
              sx={{
                lineHeight: 1.5,
                fontFamily: 'Inter',
                fontSize: 3,
                fontWeight: '400',
                color: query.color
              }}
              children={query.description}
            />
          </Flex>
          <Box
            sx={{
              width: `calc(${query.split})`,
              backgroundImage: `url(${query.image})`,
              backgroundSize: 'cover'
            }}
          />
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  bg: 'white',
  color: 'black',
  image:
    'https://pbs.twimg.com/profile_images/1201029434054041606/efWs7Lr9_400x400.jpg',
  title: "Your Site's Calling Card",
  description: '5 ways to add `og:image`s to your JAMstack site',
  split: '65%',
  divider: '132px',
  gradient: 'linear-gradient(#e66465, #9198e5)',
  border: '5px'
}

export default { name: 'swyxdotio', code, query }
