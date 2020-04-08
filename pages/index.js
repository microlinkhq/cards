import { marshall, unmarshall } from '@lib/compress-json'
import * as templates from '@components/templates'
import { Text, Select, Box, Flex } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import styled from 'styled-components'

import useQueryState from '@hooks/use-query-state'

import Aside from '@components/aside'
import Main from '@components/main'
import pkg from '../package.json'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@components/live-editor'

const Container = styled(Flex)`
  height: 100vh;
`

const DEFAULT_PRESET = 'simple'

const sync = debounce(300, ({ setQuery, newCode }) =>
  setQuery({ s: marshall(newCode) })
)

export default () => {
  const [query, setQuery] = useQueryState()
  const [preset] = useState(query.preset || DEFAULT_PRESET)
  const [code, setCode] = useState(templates[preset])

  useEffect(() => {
    if (query.s) setCode(unmarshall(query.s))
  }, [])

  const handleChange = newCode => {
    setCode(newCode)
    sync({ setQuery, newCode })
  }

  return (
    <LiveProvider code={code}>
      <Container>
        <Main>
          <LivePreview />
          <LiveError />
        </Main>
        <Aside>
          <Flex
            as='section'
            sx={{
              borderBottom: '1px solid #6c6783',
              color: '#6c6783',
              bg: '#2a2734',
              p: 3,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Flex
              sx={{
                alignItems: 'center'
              }}
            >
              <Select
                defaultValue={DEFAULT_PRESET}
                sx={{
                  fontSize: 1,
                  width: '8rem',
                  p: '2px 8px'
                }}
              >
                <option>{DEFAULT_PRESET}</option>
              </Select>
            </Flex>
            <Box>
              <Text
                sx={{
                  fontSize: 1
                }}
              >
                v{pkg.version}
              </Text>
            </Box>
          </Flex>
          <Box as='section'>
            <LiveEditor onChange={handleChange} />
          </Box>
        </Aside>
      </Container>
    </LiveProvider>
  )
}
