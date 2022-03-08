/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Flex, Link, Text } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Source+Sans+Pro:wght@900&display=swap'
        rel='stylesheet'
      />

      <Flex
        sx={{
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          pb: 1,
          pt: 5,

          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f5f2ff' fill-opacity='1' d='M0,96L24,96C48,96,96,96,144,133.3C192,171,240,245,288,261.3C336,277,384,235,432,202.7C480,171,528,149,576,138.7C624,128,672,128,720,133.3C768,139,816,149,864,144C912,139,960,117,1008,117.3C1056,117,1104,139,1152,170.7C1200,203,1248,245,1296,224C1344,203,1392,117,1416,74.7L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: '#171717'
        }}
      >
        <Text
          sx={{
            left: 5,
            position: 'absolute',
            top: 60,

            fontSize: 3,

            fontFamily: 'Fira Code',
            fontWeight: 500
          }}
        >
          <Text
            sx={{
              color: '#8f8f8f'
            }}
          >
            saraos.tech
          </Text>

          <Text
            sx={{
              color: '#5746af'
            }}
          >
            /{query.slug}
          </Text>
        </Text>

        <Text
          sx={{
            fontSize: 6,
            lineHeight: 1.15,
            marginBottom: '.5em',
            maxWidth: '80%',
            textAlign: 'center',

            fontFamily: 'Source Sans Pro',
            fontWeight: 900,

            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {query.title}
        </Text>

        <Text
          sx={{
            fontSize: 3,
            maxWidth: '90%',
            textAlign: 'center',

            fontFamily: 'Fira Code',
            fontWeight: 400
          }}
        >
          {query.schedule}
        </Text>
      </Flex>
    </>
  </Inline>
)

const query = {
  schedule: '21 de noviembre de 2021, 19:00 - 20:00 CEST',
  slug: '@asturiashacking',
  title: 'Vuelta a la rutina, ¿o no?'
}

export const saraostech = { name: 'saraos.tech', code, query }
