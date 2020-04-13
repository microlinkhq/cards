import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
import SearchableSelect from '@/components/searchable-select'
import { marshall, unmarshall } from '@/lib/compress-json'
import { Button, Text, Box, Flex, useThemeUI } from 'theme-ui'
import useQueryState from '@/hooks/use-query-state'
import GitHubIcon from '@/components/icons/github'
import JSONViewer from '@/components/json-viewer'
import ThemeIcon from '@/components/icons/theme'
import screenshotUrl from '@/lib/screenshot-url'
import InfoIcon from '@/components/icons/info'
import notification from '@/lib/notification'
import { useEffect, useState } from 'react'
import presets from '@/components/presets'
import Overlay from '@/components/overlay'
import store from '@/lib/local-storage'
import clipboard from '@/lib/clipboard'
import styled from 'styled-components'
import debounce from '@/lib/debounce'
import Main from '@/components/main'
import isEmpty from '@/lib/is-empty'
import * as polished from 'polished'
import onSave from '@/lib/on-save'
import Router from 'next/router'
import themeBase from '@/theme'
import Cycled from 'cycled'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@/components/live-editor'

import pkg from '@/package.json'

const DEFAULT_PRESET = Object.keys(presets)[0]
const ASIDE_HEIGHT_KEY = 'sidebar-json-height'
const ASIDE_WIDTH_KEY = 'sidebar-width'
const DEFAULT_ASIDE_WIDTH = '30%'
const DEFAULT_ASIDE_HEIGHT = '25%'
const ASIDE_MIN_WIDTH = '20%'
const ASIDE_MAX_WIDTH = '60%'
const ASIDE_MIN_HEIGHT = '15%'
const ASIDE_MAX_HEIGHT = '70%'

const updateQuery = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

const updateStore = debounce(({ key, value }) => store.set(key, value))

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

const ButtonIcon = styled(Button)`
  display: flex;
  cursor: pointer;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;

  svg {
    transition: fill ${themeBase.transition.medium},
      stroke ${themeBase.transition.medium};
    stroke: ${({ color }) => color};
    fill: ${({ color }) => color};
  }

  &:hover svg {
    stroke: ${({ hoverColor }) => hoverColor};
    fill: ${({ hoverColor }) => hoverColor};
  }
`

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isLoading, setIsLoading] = useState(true)
  const [isOverlayOpen, setOverlayOpen] = useState(true)

  const [asideWidth, setAsideWidth] = useState(
    store.get(ASIDE_WIDTH_KEY) || DEFAULT_ASIDE_WIDTH
  )

  const [jsonHeight, setJsonHeight] = useState(
    store.get(ASIDE_HEIGHT_KEY) || DEFAULT_ASIDE_HEIGHT
  )

  const [preset, setPreset] = useState(presets[query.preset || DEFAULT_PRESET])

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
      decodeURI(window.location.href.replace('/editor/', '')),
      {
        endpoint: queryVariables.endpoint
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
    updateQuery({ setQuery, code: newCode })
  }

  const handleQueryVariables = newJSON => {
    setQueryVariables(newJSON)
    updateQuery({ setQuery, queryVariables: newJSON })
  }

  const handleAsideWidthReize = width => {
    setAsideWidth(width)
    updateStore({ key: ASIDE_WIDTH_KEY, value: width })
  }

  const handleAsideHeightResize = height => {
    setJsonHeight(height)
    updateStore({ key: ASIDE_HEIGHT_KEY, value: height })
  }

  const handleSelectChange = event => {
    const presetName = event.value
    const newPreset = presets[presetName]
    setPreset(newPreset)
    setCode(newPreset.code)
    setQueryVariables(newPreset.query)
    setQuery({ p: undefined, preset: presetName })
  }

  const handleChangeColor = () => {
    setColorMode(nextMode())
  }

  if (isLoading) return null

  const isEditor = Router.asPath.startsWith('/editor')

  const editorTheme = theme.colors.modes[colorMode]
  const color = editorTheme.plain.color
  const bg = editorTheme.plain.backgroundColor
  const borderColor = polished.rgba(color, 0.6)

  return (
    <LiveProvider
      theme={editorTheme}
      queryVariables={queryVariables}
      code={code}
    >
      {/* <Overlay isOpen={isOverlayOpen}></Overlay> */}
      <Flex sx={{ bg: 'plain.backgroundColor', height: '100vh' }}>
        <Main>
          <LivePreview onClick={toClipboard} isEditor={isEditor} />
          <LiveError />
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            sx={{
              bg: 'plain.backgroundColor',
              flexDirection: 'column',
              fontFamily: 'mono',
              fontSize: 2,
              fontWeight: 'light',
              height: '100%',
              maxWidth: ASIDE_MAX_WIDTH,
              minWidth: ASIDE_MIN_WIDTH,
              position: 'relative',
              width: asideWidth,
              willChange: 'width'
            }}
          >
            <VerticalDragBar onDrag={handleAsideWidthReize} />

            <Flex
              as='header'
              sx={{
                alignItems: 'center',
                bg: 'plain.backgroundColor',
                borderBottom: '1px solid',
                borderColor,
                color: 'plain.color',
                py: 3,
                mr: 3,
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  width: '200px'
                }}
              >
                <SearchableSelect
                  color={color}
                  bg={bg}
                  value={{ value: preset.name, label: preset.name }}
                  options={Object.keys(presets).map(key => ({
                    value: key,
                    label: presets[key].name
                  }))}
                  onChange={handleSelectChange}
                />
              </Box>
              <Flex
                sx={{
                  alignItems: 'center'
                }}
              >
                <ButtonIcon
                  as='a'
                  href={pkg.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  title='See on GitHub'
                  color={borderColor}
                  hoverColor={color}
                >
                  <InfoIcon />
                </ButtonIcon>
                <Box sx={{ pl: '6px', pr: '4px' }}>
                  <ButtonIcon
                    as='a'
                    href={pkg.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                    title='See on GitHub'
                    color={borderColor}
                    hoverColor={color}
                  >
                    <GitHubIcon />
                  </ButtonIcon>
                </Box>
                <ButtonIcon
                  as='button'
                  title='Change color mode'
                  onClick={handleChangeColor}
                  color={borderColor}
                  hoverColor={color}
                >
                  <ThemeIcon />
                </ButtonIcon>
              </Flex>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box as='section' sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                sx={{
                  height: jsonHeight,
                  maxHeight: ASIDE_MAX_HEIGHT,
                  minHeight: ASIDE_MIN_HEIGHT,
                  position: 'relative',
                  willChange: 'height'
                }}
              >
                <HorizontalDragBar onDrag={handleAsideHeightResize} />
                <Box
                  as='section'
                  sx={{
                    bg: 'plain.backgroundColor',
                    borderTop: '1px solid',
                    borderColor,
                    overflow: 'scroll',
                    py: 3,
                    mr: 3
                  }}
                >
                  <JSONViewer
                    theme={editorTheme}
                    children={queryVariables}
                    onChange={handleQueryVariables}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        )}
      </Flex>
    </LiveProvider>
  )
}
