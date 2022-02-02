/* eslint-disable no-use-before-define */

import Inline from '../inline.macro'
import { Box, Flex, Text, Link } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=block'
        rel='stylesheet'
      />
      <Link
        href='https://fonts.googleapis.com/css?family=Fira+Mono&display=block'
        rel='stylesheet'
      />

      <Flex
        sx={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          flexDirection: 'column',
          height: '100%',
          bg: 'rgba(0, 0, 0, 1)',
          px: '64px'
        }}
      >
        <Box
          as='header'
          sx={{
            bg: 'rgba(0, 0, 0, 1)',
            pt: '64px',
            flex: 0
          }}
        >
          <Text
            sx={{
              color: 'rgba(255, 255, 255, 1)',
              textTransform: 'uppercase'
            }}
          >
            {query.header}
          </Text>
        </Box>

        <Flex
          sx={{
            color: 'rgba(255, 255, 255, 1)',
            flex: 1,
            flexDirection: 'column',
            mb: '52px'
          }}
        >
          <Text
            sx={{
              fontSize: '24px',
              lineHeight: 1.4,
              mt: 'auto'
            }}
          >
            {query.title}
          </Text>

          <Text
            sx={{
              fontFamily: 'Fira Mono',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(141, 141, 147, 1)',
              lineHeight: 1.4,
              pt: '8px',
              mb: 'auto'
            }}
          >
            {query.blog}
          </Text>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  header: 'Lucas Ferreira',
  title:
    'Mestrando em Engenharia Eletrônica e Computação, Engenheiro de Computação, Desenvolvedor Front-end e Pesquisador.',
  blog: '30/01/2022 • 3 minutos'
}

export const lucaspeferreira = { name: 'lucaspeferreira', code, query }
