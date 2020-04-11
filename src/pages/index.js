/* global localStorage */

import { useEffect, useState } from 'react'
import Router from 'next/router'
import {
  Link as ExternalLink,
  Button,
  Select,
  Box,
  Flex,
  useThemeUI
} from 'theme-ui'
import Cycled from 'cycled'

import presets from '@/components/presets'
import Main from '@/components/main'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@/components/live-editor'
import JSONViewer from '@/components/json-viewer'
import ThemeIcon from '@/components/icons/theme'
import GitHubIcon from '@/components/icons/github'
import Container from '@/components/container'
import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
// import Overlay from '@/components/overlay'
import useQueryState from '@/hooks/use-query-state'
import themeBase from '@/theme'
import { marshall, unmarshall } from '@/lib/compress-json'
import clipboard from '@/lib/clipboard'
import debounce from '@/lib/debounce'
import isEmpty from '@/lib/is-empty'
import notification from '@/lib/notification'
import screenshotUrl from '@/lib/screenshot-url'
import onSave from '@/lib/on-save'

import pkg from '../../package.json'

const DEFAULT_PRESET = Object.keys(presets)[0]

const updateUrl = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

const asideWidthKey = 'sidebar-width'
const jsonHeightKey = 'sidebar-json-height'

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isLoading, setIsLoading] = useState(true)
  // const [isOverlayOpen, setOverlayOpen] = useState(false)
  const [asideWidth, setAsideWidth] = useState('30%')
  const [jsonHeight, setJsonHeight] = useState('25%')

  const [preset, setPreset] = useState(() => {
    const presetName = query.preset || DEFAULT_PRESET
    return presets[presetName]
  })

  const [code, setCode] = useState(() => {
    if (isEmpty(query)) return preset.code
    const { p } = query
    if (isEmpty(p)) return preset.code
    return unmarshall(p)
  })

  const [queryVariables, setQueryVariables] = useState(() => {
    if (isEmpty(query)) return preset.query
    const { p, preset: queryPreset, ...queryVariables } = query
    if (isEmpty(queryVariables)) return preset.query
    return queryVariables
  })

  const toClipboard = async () => {
    // setOverlayOpen(true)
    const url = screenshotUrl(
      decodeURI(window.location.href.replace('/editor/', ''))
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

    const storedAsideWidth = localStorage.getItem(asideWidthKey)
    const storedJsonHeight = localStorage.getItem(jsonHeightKey)

    if (storedAsideWidth) {
      setAsideWidth(storedAsideWidth)
    }

    if (storedJsonHeight) {
      setJsonHeight(storedJsonHeight)
    }
  }, [])

  const handleCode = newCode => {
    setCode(newCode)
    updateUrl({ setQuery, code: newCode })
  }

  const handleQueryVariables = newJSON => {
    setQueryVariables(newJSON)
    updateUrl({ setQuery, queryVariables: newJSON })
  }

  const onAsideResize = width => {
    setAsideWidth(width)
    localStorage.setItem(asideWidthKey, width)
  }

  const onJsonResize = height => {
    setJsonHeight(height)
    localStorage.setItem(jsonHeightKey, height)
  }

  if (isLoading) return null
  const isEditor = Router.asPath.startsWith('/editor')

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      {/* <Overlay isOpen={isOverlayOpen}>
        <Text>Embed HTML</Text>
      </Overlay> */}
      <Container>
        <Main>
          <LivePreview onClick={toClipboard} isEditor={isEditor} />
          <LiveError />
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            style={{ width: asideWidth }}
            sx={{
              position: 'relative',
              height: '100%',
              minWidth: '20%',
              maxWidth: '60%',
              bg: 'plain.backgroundColor',
              flexDirection: 'column',
              fontSize: 2,
              fontFamily: 'mono',
              fontWeight: 'light',
              willChange: 'width'
            }}
          >
            <VerticalDragBar onDrag={onAsideResize} />

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
                  defaultValue={preset.name}
                  sx={{
                    fontSize: 1,
                    width: '8.5rem',
                    p: '2px 8px'
                  }}
                  onChange={event => {
                    const { value: presetName } = event.currentTarget
                    const newPreset = presets[presetName]
                    setPreset(newPreset)
                    setCode(newPreset.code)
                    setQueryVariables(newPreset.query)
                    setQuery({ p: undefined, preset: presetName })
                  }}
                >
                  {Object.keys(presets).map(presetName => (
                    <option
                      key={presetName}
                      value={presetName}
                      children={presetName}
                    />
                  ))}
                </Select>
              </Flex>
              <Flex
                sx={{
                  alignItems: 'center'
                }}
              >
                <ExternalLink
                  href={pkg.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  title='See on GitHub'
                  sx={{
                    display: 'flex',
                    p: 0,
                    outline: 0,
                    cursor: 'pointer',
                    bg: 'transparent'
                  }}
                >
                  <GitHubIcon
                    color={theme.colors.modes[colorMode].plain.color}
                  />
                </ExternalLink>
                <Button
                  title='Change color mode'
                  sx={{
                    display: 'flex',
                    ml: 2,
                    p: 0,
                    outline: 0,
                    cursor: 'pointer',
                    bg: 'transparent'
                  }}
                  onClick={() => setColorMode(nextMode())}
                >
                  <ThemeIcon
                    color={theme.colors.modes[colorMode].plain.color}
                  />
                </Button>
              </Flex>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box as='section' sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  maxHeight: '70%',
                  minHeight: '15%',
                  willChange: 'height'
                }}
                style={{ height: jsonHeight }}
              >
                <HorizontalDragBar onDrag={onJsonResize} />
                <Box
                  as='section'
                  sx={{
                    bg: 'plain.backgroundColor',
                    borderTop: '1px solid',
                    borderColor: 'plain.color',
                    overflow: 'scroll',
                    p: 3
                  }}
                >
                  <JSONViewer
                    children={queryVariables}
                    onChange={handleQueryVariables}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        )}
      </Container>
    </LiveProvider>
  )
}
