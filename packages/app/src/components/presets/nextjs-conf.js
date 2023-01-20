import Inline from '../inline.macro'
import { Link, Image, Box, Flex, Text } from './scope'

const query = {
  name: 'Belén Curcio',
  avatar:
    'https://www.datocms-assets.com/35255/1601389074-okbel.png?crop=focalpoint&fit=crop&fm=jpg&fp-x=0.5&fp-y=0.5&h=192&w=192',
  logo: 'https://www.datocms-assets.com/35255/1603678368-logo.svg',
  jobtitle: 'Solution Architect @ Vercel'
}

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@700&display=block'
        rel='stylesheet'
      />
      <Box
        as='header'
        sx={{
          position: 'absolute',
          pt: '14px',
          pr: '24px',
          right: 0
        }}
      >
        <Image sx={{ width: 128 }} src={query.logo} />
      </Box>
      <Box
        as='header'
        sx={{
          position: 'absolute',
          mt: '-50px',
          ml: '-250px',
          borderRadius: '50%',
          width: '570px',
          height: '570px',
          backgroundClip: 'content-box, border-box',
          backgroundImage:
            'linear-gradient(black, black), linear-gradient(to right, #ec6192, #ec4c34, #ffbd2b, #ebde56, #57c754, #53a1eb)',
          padding: '5px',
          outline: 'none',
          zIndex: '1'
        }}
      />
      <Flex
        sx={{
          alignItems: 'center',
          flexDirection: 'row',
          bg: 'black'
        }}
      >
        <Image
          sx={{
            width: 192,
            height: 192,
            borderRadius: '50%',
            mr: '112px',
            ml: 5,
            zIndex: '1'
          }}
          src={query.avatar}
        />
        <Flex
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            bg: 'black'
          }}
        >
          <Text
            sx={{
              letterSpacing: '-3px',
              fontFamily: 'Inter',
              fontSize: 7,
              fontWeight: 700,
              color: 'white',
              maxWidth: '38rem',
              textAlign: 'center',
              lineHeight: '100%'
            }}
          >
            {query.name}
          </Text>
          <Text
            as='span'
            sx={{
              letterSpacing: '-.03m',
              fontFamily: 'Inter',
              color: '#d8d8d8',
              fontSize: 4,
              fontWeight: 300
            }}
          >
            {query.jobtitle}
          </Text>
        </Flex>
      </Flex>
    </>
  </Inline>
)

export const nextjsConf = { name: 'Next.js Conf', code, query }
