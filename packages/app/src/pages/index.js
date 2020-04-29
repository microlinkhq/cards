import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
import { Tab, Tabs, TabList, TabPanel } from '@/components/tabs'
import { Link, Image, Text, Box, Flex, useThemeUI } from 'theme-ui'
import SearchableSelect from '@/components/searchable-select'
import { marshall, unmarshall } from '@/lib/compress-json'
import useScreenshotUrl from '@/hooks/use-screenshot-url'
import KeyboardIcon from '@/components/icons/keyboard'
import useKeyBindings from '@/hooks/use-key-bindings'
import useQueryState from '@/hooks/use-query-state'
import useWindowSize from '@/hooks/use-window-size'
import GitHubIcon from '@/components/icons/github'
import JSONViewer from '@/components/json-viewer'
import ButtonIcon from '@/components/button-icon'
import ThemeIcon from '@/components/icons/theme'
import setImageMeta from '@/lib/set-image-meta'
import InfoIcon from '@/components/icons/info'
import notification from '@/lib/notification'
import AspectRatio from 'react-aspect-ratio'
import useLoading from '@/hooks/use-loading'
import presets from '@/components/presets'
import Overlay from '@/components/overlay'
import Button from '@/components/button'
import shareCode from '@/lib/share-code'
import Choose from '@/components/choose'
import { diff } from 'deep-object-diff'
import store from '@/lib/local-storage'
import clipboard from '@/lib/clipboard'
import Label from '@/components/label'
import debounce from '@/lib/debounce'
import Main from '@/components/main'
import Code from '@/components/code'
import isEmpty from '@/lib/is-empty'
import * as polished from 'polished'
import isMac from '@/lib/is-mac'
import Router from 'next/router'
import { useState } from 'react'
import themeBase from '@/theme'
import defer from 'tickedoff'
import Cycled from 'cycled'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@/components/live-editor'

import pkg from '@/package.json'

import {
  ASIDE_HEIGHT_KEY,
  ASIDE_MAX_HEIGHT,
  ASIDE_MAX_WIDTH,
  ASIDE_MIN_HEIGHT,
  ASIDE_MIN_WIDTH,
  ASIDE_WIDTH_KEY,
  DEFAULT_ASIDE_HEIGHT,
  DEFAULT_ASIDE_WIDTH,
  DEFAULT_PRESET,
  OVERLAY_STATE,
  PREVIEW_CARD_WIDTH,
  SEARCH_WIDTH
} from '@/constants'

const updateQuery = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

const updateStore = ({ key, value }) => store.set(key, value)

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const isLoading = useLoading()
  const size = useWindowSize()
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isOverlay, setOverlay] = useState('')
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
    return { ...preset.query, ...queryVariables }
  })

  const [screenshotUrl, syncScreenshotUrl] = useScreenshotUrl(queryVariables)
  setImageMeta(screenshotUrl)

  const showOverlay = state => () => {
    syncScreenshotUrl(queryVariables)
    defer(() => setOverlay(state))
  }

  const hideOverlay = () => setOverlay('')

  async function toClipboard (text, name) {
    await clipboard.write(text)
    notification(`Copied ${name} to clipboard`)
  }

  const changeTheme = () => setColorMode(nextMode())

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  const handleCode = newCode => {
    setCode(newCode)
    updateQuery({ setQuery, code: newCode })
  }

  const handleQueryVariables = newJSON => {
    setQueryVariables(newJSON)
    updateQuery({ setQuery, queryVariables: diff(preset.query, newJSON) })
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
    setQuery({ p: undefined, preset: presetName }, { replace: true })
  }

  if (isLoading) return null

  const isEditor = Router.asPath.startsWith('/editor')

  const editorTheme = theme.colors.modes[colorMode]
  const color = editorTheme.plain.color
  const bg = editorTheme.plain.backgroundColor
  const borderColor = polished.rgba(color, 0.1)
  const iconColor = polished.rgba(color, 0.75)

  const stringColor = theme.colors.styles.find(item =>
    item.types.includes('string')
  ).style.color

  const OverlayHeader = props => <Box as='header' {...props} />

  const OverlayFooter = () => (
    <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
      <Button
        sx={{ bg: color, color: bg }}
        onClick={hideOverlay}
        children='Got it'
      />
    </Flex>
  )

  const OverlayKeyBindings = () => {
    const ctrl = isMac ? 'cmd' : 'ctrl'
    return (
      <>
        <Box sx={{ width: '100%' }}>
          <Flex
            as='header'
            sx={{
              p: '10px',
              fontWeight: 'bold',
              borderBottom: 1,
              borderColor
            }}
          >
            <Box sx={{ width: '25%', mr: 3 }}>Combination</Box>
            <Box sx={{ width: '75%' }}>Description</Box>
          </Flex>
          {[
            {
              combination: [ctrl, ' + ', 'j'],
              description: 'Show keybindings information'
            },
            {
              combination: [ctrl, ' + ', 'k'],
              description: 'Show information about the project'
            },
            {
              combination: [ctrl, ' + ', 's'],
              description: 'Get the current image URL'
            },
            {
              combination: [ctrl, ' + ', 'click'],
              description: 'Edit the selected value on query variables'
            },
            {
              combination: [ctrl, ' + ', 'p'],
              description: 'Change the editor theme'
            },
            {
              combination: ['esc'],
              description: 'Close the active modal'
            }
          ].map(({ combination, description }) => (
            <Flex
              as='section'
              key={combination}
              sx={{ lineHeight: 2, p: 3, borderBottom: 1, borderColor }}
            >
              <Box sx={{ width: '25%', mr: 3 }}>
                <Box
                  sx={{
                    display: 'inline',
                    py: '3px',
                    px: '6px',
                    border: 1,
                    borderColor,
                    borderRadius: 4
                  }}
                >
                  {combination.map(key => (
                    <Text
                      sx={{
                        fontSize: 0,
                        textTransform: 'uppercase',
                        color,
                        display: 'inherit'
                      }}
                      key={key}
                      children={key}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ width: '75%' }}>{description}</Box>
            </Flex>
          ))}
        </Box>
        <OverlayFooter />
      </>
    )
  }

  const OverlayAbout = () => {
    return (
      <>
        <OverlayHeader>
          <Image
            src='https://cdn.microlink.io/banner/cards.png'
            alt='microlink cards'
          />
        </OverlayHeader>
        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          <b>Microlink Cards</b> generates social images on demand, ready to be
          embed in your{' '}
          <Text as='code' sx={{ fontFamily: 'mono' }}>
            &lt;meta&gt;
          </Text>{' '}
          tags.
        </Text>
        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          Just write your preset once, feed with dynamic content and reuse
          forever. Read more into{' '}
          <Text
            as='a'
            sx={{ textDecoration: 'none', color: stringColor }}
            href='https://microlink.io/docs/cards/getting-started/overview'
            target='_blank'
            rel='noopener noreferrer'
            children='documentation'
          />{' '}
          portal.
        </Text>
        <Text sx={{ my: 3, fontSize: 2, fontWeight: 'normal' }}>
          Starts from <b>free</b> and code is available on{' '}
          <Text
            as='a'
            sx={{ textDecoration: 'none', color: stringColor }}
            href={pkg.homepage}
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </Text>
          .
        </Text>
        <OverlayFooter />
      </>
    )
  }

  const OverlayPreview = () => {
    return (
      <>
        <OverlayHeader>
          <AspectRatio ratio='16/9'>
            <LivePreview
              isEditor={isEditor}
              css={`
                zoom: 0.6;
              `}
              onClick={() => toClipboard(screenshotUrl, 'URL')}
            />
          </AspectRatio>
        </OverlayHeader>

        <Text sx={{ color, mt: 4, mb: 3, fontSize: 2, fontWeight: 'normal' }}>
          Add it to your website by copying the code below
        </Text>

        <Box as='section' sx={{ overflow: 'scroll' }}>
          <Tabs theme={{ borderColor, color, bg }}>
            <TabList>
              <Tab>SEO tags</Tab>
              <Tab>HTML</Tab>
              <Tab>Markdown</Tab>
              <Tab>Javascript</Tab>
              <Tab>Direct URL</Tab>
            </TabList>

            <TabPanel>
              <Code
                sx={{
                  borderColor,
                  color: stringColor
                }}
                onClick={e => toClipboard(e.target.textContent, 'SEO Tags')}
                children={shareCode.seo(screenshotUrl)}
              />
            </TabPanel>
            <TabPanel>
              <Code
                sx={{
                  borderColor,
                  color: stringColor
                }}
                children={shareCode.html(screenshotUrl)}
                onClick={e => toClipboard(e.target.textContent, 'HTML')}
              />
            </TabPanel>
            <TabPanel>
              <Code
                sx={{
                  borderColor,
                  color: stringColor
                }}
                children={shareCode.markdown(screenshotUrl)}
                onClick={e => toClipboard(e.target.textContent, 'Markdown')}
              />
            </TabPanel>
            <TabPanel>
              <Code
                sx={{
                  borderColor,
                  color: stringColor
                }}
                children={shareCode.javascript(query)}
                onClick={e => toClipboard(e.target.textContent, 'Javascript')}
              />
            </TabPanel>
            <TabPanel>
              <Code
                sx={{
                  borderColor,
                  color: stringColor
                }}
                children={screenshotUrl}
                onClick={e => toClipboard(e.target.textContent, 'URL')}
              />
            </TabPanel>
          </Tabs>
        </Box>
        <OverlayFooter />
      </>
    )
  }

  return (
    <LiveProvider
      theme={editorTheme}
      queryVariables={queryVariables}
      code={code}
    >
      <Overlay
        aria-hidden={isOverlay === ''}
        backgroundColor={bg}
        color={color}
        isOpen={isOverlay !== ''}
        onClose={hideOverlay}
      >
        <Choose.When condition={isOverlay === OVERLAY_STATE.PREVIEW}>
          <OverlayPreview />
        </Choose.When>
        <Choose.When condition={isOverlay === OVERLAY_STATE.ABOUT}>
          <OverlayAbout />
        </Choose.When>
        <Choose.When condition={isOverlay === OVERLAY_STATE.KEYBINDINGS}>
          <OverlayKeyBindings />
        </Choose.When>
      </Overlay>
      <Flex sx={{ bg, height: '100vh' }}>
        <Main>
          <Box sx={{ mb: 4 }}>
            <AspectRatio
              ratio='16/9'
              style={{ margin: 'auto', maxWidth: PREVIEW_CARD_WIDTH }}
            >
              <LivePreview
                onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
                isEditor={isEditor}
              />
            </AspectRatio>
          </Box>
          <Box
            sx={{
              bottom: 0,
              position: 'absolute',
              width: '100%'
            }}
          >
            <LiveError />
          </Box>

          {isEditor && (
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Link
                href='#'
                sx={{ color }}
                onClick={() => {
                  const link = document.createElement('a')
                  link.download = Date.now()
                  link.href = screenshotUrl
                  window.open(link)
                }}
              >
                Download
              </Link>
              <Box sx={{ ml: 3 }}>
                <Button
                  sx={{ color: bg, bg: color }}
                  onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
                  children='Embed'
                />
              </Box>
            </Flex>
          )}
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            sx={{
              pl: 3,
              borderLeft: 1,
              borderColor,
              bg,
              flexDirection: 'column',
              fontFamily: 'mono',
              fontSize: 2,
              fontWeight: 'light',
              height: '100%',
              maxWidth: ASIDE_MAX_WIDTH(size),
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
                bg,
                borderBottom: 1,
                borderColor,
                py: 3,
                mr: 3,
                color,
                justifyContent: 'space-between'
              }}
            >
              <Flex sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: SEARCH_WIDTH
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
              </Flex>
              <Flex
                sx={{
                  alignItems: 'center'
                }}
              >
                <ButtonIcon
                  as='button'
                  title='Show keybindings'
                  color={iconColor}
                  hoverColor={color}
                  onClick={showOverlay(OVERLAY_STATE.KEYBINDINGS)}
                >
                  <KeyboardIcon />
                </ButtonIcon>
                <Box sx={{ ml: '6px' }}>
                  <ButtonIcon
                    as='button'
                    title='Learn more about the project'
                    color={iconColor}
                    hoverColor={color}
                    onClick={showOverlay(OVERLAY_STATE.ABOUT)}
                  >
                    <InfoIcon />
                  </ButtonIcon>
                </Box>
                <Box sx={{ ml: '6px' }}>
                  <ButtonIcon
                    as='a'
                    href={pkg.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                    title='See on GitHub'
                    color={iconColor}
                    hoverColor={color}
                  >
                    <GitHubIcon />
                  </ButtonIcon>
                </Box>
                <Box sx={{ ml: '6px' }}>
                  <ButtonIcon
                    as='button'
                    title='Change color mode'
                    onClick={changeTheme}
                    color={iconColor}
                    hoverColor={color}
                  >
                    <ThemeIcon />
                  </ButtonIcon>
                </Box>
              </Flex>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box sx={{ position: 'relative' }}>
                <Label
                  children='editor'
                  sx={{
                    color,
                    borderColor
                  }}
                />
              </Box>
              <Box
                as='section'
                sx={{
                  borderBottom: 1,
                  borderColor,
                  p: 3,
                  mr: 3,
                  overflow: 'auto',
                  flex: 1
                }}
              >
                <LiveEditor code={code} onChange={handleCode} />
              </Box>
              <Box
                sx={{
                  height: jsonHeight,
                  maxHeight: ASIDE_MAX_HEIGHT,
                  minHeight: ASIDE_MIN_HEIGHT,
                  position: 'relative',
                  willChange: 'height',
                  overflow: 'auto'
                }}
              >
                <HorizontalDragBar onDrag={handleAsideHeightResize} />
                <Box
                  as='section'
                  sx={{
                    bg,
                    py: 3,
                    mr: 3
                  }}
                >
                  <Label
                    children='query variables'
                    sx={{
                      color,
                      borderColor
                    }}
                  />
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
