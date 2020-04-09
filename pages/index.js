import { Button, Textarea, Text, Select, Box, Flex, useThemeUI } from 'theme-ui'
import { marshall, unmarshall } from '@lib/compress-json'
import * as templates from '@components/templates'
import useQueryState from '@hooks/use-query-state'
import React, { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import styled from 'styled-components'
import themeBase from '@themes/base'
import Main from '@components/main'
import decamelize from 'decamelize'

import Cycled from 'cycled'

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

const DEFAULT_PRESET = 'preset: simple'

const syncCodeQuery = debounce(300, ({ setQuery, newCode }) =>
  setQuery({ s: marshall(newCode) })
)

const syncQueryVariables = debounce(0, ({ setQueryVariables, payload }) => {
  try {
    setQueryVariables(JSON.parse(payload))
  } catch (_) {}
})

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [preset] = useState(query.preset || DEFAULT_PRESET)
  const [code, setCode] = useState(templates[preset.split(' ')[1]])
  const [queryVariables, setQueryVariables] = useState({
    headline: 'Add your headline',
    caption: 'Add your caption'
  })

  useEffect(() => {
    if (query.s) setCode(unmarshall(query.s))
  }, [])

  const handleCode = newCode => {
    setCode(newCode)
    syncCodeQuery({ setQuery, newCode })
  }

  const handleQueryVariables = event => {
    const payload = event.target.value
    syncQueryVariables({ setQueryVariables, payload })
  }

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      <Container>
        <Main>
          <LivePreview />
          <LiveError />
        </Main>
        <Flex
          as='aside'
          sx={{
            bg: 'plain.backgroundColor',
            flexDirection: 'column',
            width: ['30%', '30%', '30%', '30%'],
            fontSize: 2,
            fontFamily: 'mono',
            fontWeight: 'light'
          }}
        >
          <Flex
            as='header'
            sx={{
              borderBottom: '1px solid',
              borderColor: 'plain.color',
              bg: 'plain.backgroundColor',
              color: 'plain.color',
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
                <Button
                  sx={{
                    bg: 'plain.color',
                    color: 'plain.backgroundColor',
                    fontSize: 0,
                    ml: 2
                  }}
                  onClick={() => setColorMode(nextMode())}
                >
                  {decamelize(colorMode, ' ')}
                </Button>
              </Text>
            </Box>
          </Flex>
          <Flex sx={{ height: '100%', flexDirection: 'column' }}>
            <Box as='section' sx={{ height: '60%', p: 3 }}>
              <LiveEditor onChange={handleCode} />
            </Box>
            <Box
              as='section'
              sx={{
                height: '25%',
                p: 3,
                bg: 'plain.backgroundColor',
                borderTop: '1px solid',
                borderColor: 'plain.color'
              }}
            >
              <Textarea
                sx={{
                  resize: 'none',
                  caretColor: 'plain.color',
                  padding: 0,
                  outline: 0,
                  border: 0,
                  height: '100%',
                  color: 'plain.color'
                }}
                defaultValue={JSON.stringify(queryVariables, null, 2)}
                onChange={handleQueryVariables}
              />
            </Box>
            <Flex
              as='footer'
              sx={{
                height: '5%',
                color: 'plain.color',
                p: 3,
                justifyContent: 'flex-end'
              }}
            >
              <Text sx={{ fontSize: 1 }}>v{pkg.version}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </LiveProvider>
  )
}
