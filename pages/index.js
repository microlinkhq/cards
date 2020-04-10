import { Button, Textarea, Text, Select, Box, Flex, useThemeUI } from 'theme-ui'
import { marshall, unmarshall } from '@lib/compress-json'
import * as templates from '@components/templates'
import useQueryState from '@hooks/use-query-state'
import React, { useState, useEffect } from 'react'
import notification from '@lib/notification'
import { getApiUrl } from '@microlink/mql'
import styled from 'styled-components'
import clipboard from '@lib/clipboard'
import themeBase from '@themes/base'
import debounce from '@lib/debounce'
import isEmpty from '@lib/is-empty'
import onSave from '@lib/on-save'
import Main from '@components/main'
import decamelize from 'decamelize'
import Router from 'next/router'
import Cycled from 'cycled'
import { decode } from 'qss'

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

const DEFAULT_QUERY_VARIABLES = {
  headline: 'Add your headline',
  caption: 'Add your caption'
}

const updateUrl = debounce(({ setQuery, code, queryVariables }) => {
  setQuery({
    p: marshall(code),
    ...queryVariables
  })
})

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [preset, setPreset] = useState(query.preset || DEFAULT_PRESET)
  const [isLoading, setIsLoading] = useState(true)

  const [code, setCode] = useState(() => {
    const presetName = preset.split(' ')[1]
    if (isEmpty(query)) return templates[presetName]
    const { p } = query
    if (isEmpty(p)) return templates[presetName]
    return unmarshall(p)
  })

  const [queryVariables, setQueryVariables] = useState(() => {
    if (isEmpty(query)) return DEFAULT_QUERY_VARIABLES
    const { p, ...queryVariables } = query
    if (isEmpty(queryVariables)) return DEFAULT_QUERY_VARIABLES
    return queryVariables
  })

  const toClipboard = async () => {
    setQuery({
      p: marshall(code),
      ...queryVariables
    })

    const [url] = getApiUrl(
      decodeURI(window.location.href.replace('/editor/', '')),
      {
        meta: false,
        screenshot: true,
        embed: 'screenshot.url',
        element: '#screenshot'
      }
    )
    await Promise.all([clipboard.write(url)])
    notification('Copied URL to clipboard')
  }

  useEffect(() => {
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push({ pathname: '/editor' })
    }
    onSave(toClipboard)
    setIsLoading(false)
  }, [])

  const handleCode = newCode => {
    setCode(newCode)
    updateUrl({ setQuery, code: newCode, queryVariables })
  }

  const handleQueryVariables = event => {
    const payload = event.target.value
    try {
      const json = JSON.parse(payload)
      setQueryVariables(json)
      updateUrl({ setQuery, code, queryVariables: json })
    } catch (_) {}
  }

  if (isLoading) return null
  const isEditor = Router.asPath.startsWith('/editor')

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      <Container>
        <Main>
          <LivePreview onClick={toClipboard} isEditor={isEditor} />
          <LiveError />
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            sx={{
              height: '100%',
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
                alignItems: 'center'
              }}
            >
              <Flex
                sx={{
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <Select
                  defaultValue={DEFAULT_PRESET}
                  sx={{
                    fontSize: 1,
                    width: '8rem',
                    p: '2px 8px'
                  }}
                  onChange={e => {
                    const preset = e.currentTarget.value
                    setPreset(preset)
                    const newCode = templates[preset]
                    setCode(newCode)
                  }}
                >
                  {Object.keys(templates).map(templateName => (
                    <option
                      key={templateName}
                      value={templateName}
                      children={templateName}
                    />
                  ))}
                </Select>
              </Flex>
              <Button
                sx={{
                  bg: 'plain.color',
                  color: 'plain.backgroundColor',
                  fontSize: 0,
                  ml: 2
                }}
                onClick={() => setColorMode(nextMode())}
              >
                <Text
                  sx={{
                    fontSize: 0
                  }}
                >
                  {decamelize(colorMode, ' ')}
                </Text>
              </Button>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box
                as='section'
                sx={{ flex: '1 0 60%', p: 3, overflow: 'auto' }}
              >
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                as='section'
                sx={{
                  height: '25%',
                  bg: 'plain.backgroundColor',
                  borderTop: '1px solid',
                  borderColor: 'plain.color',
                  overflow: 'scroll'
                }}
              >
                <Textarea
                  sx={{
                    resize: 'none',
                    caretColor: 'plain.color',
                    p: 3,
                    outline: 0,
                    border: 0,
                    height: '100%',
                    color: 'plain.color'
                  }}
                  defaultValue={JSON.stringify(queryVariables, null, 2)}
                  onChange={handleQueryVariables}
                />
              </Box>
            </Flex>
          </Flex>
        )}
      </Container>
    </LiveProvider>
  )
}
