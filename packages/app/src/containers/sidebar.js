import { useCallback, useContext, useMemo, useState } from 'react'
import { Box, Flex } from 'theme-ui'

import {
  ButtonIcon,
  HorizontalDragBar,
  JSONViewer,
  Label,
  LiveEditor,
  SearchableSelect,
  VerticalDragBar
} from '@/components'
import {
  GitHubIcon,
  InfoIcon,
  KeyboardIcon,
  ThemeIcon
} from '@/components/icons'
import {
  ASIDE_MAX_HEIGHT,
  ASIDE_MAX_WIDTH,
  ASIDE_MIN_HEIGHT,
  ASIDE_MIN_WIDTH,
  ASIDE_HEIGHT_KEY,
  ASIDE_WIDTH_KEY,
  DEFAULT_ASIDE_HEIGHT,
  DEFAULT_ASIDE_WIDTH,
  OVERLAY_STATE,
  SEARCH_WIDTH
} from '@/constants'
import { useWindowSize } from '@/hooks'
import { AppContext } from '@/context'
import { store } from '@/lib'
import pkg from '@/package.json'

export const Sidebar = () => {
  const size = useWindowSize()
  const {
    changeTheme,
    code,
    colorMode,
    handleCode,
    handlePresetChange,
    handleQueryVariables,
    presetOptions,
    presetRef,
    queryVariables,
    showOverlay,
    theme
  } = useContext(AppContext)
  const { color, bg, borderColor, iconColor } = theme

  const [asideWidth, setAsideWidth] = useState(
    store.get(ASIDE_WIDTH_KEY) || DEFAULT_ASIDE_WIDTH
  )
  const [jsonHeight, setJsonHeight] = useState(
    store.get(ASIDE_HEIGHT_KEY) || DEFAULT_ASIDE_HEIGHT
  )

  const handleWidthResize = useCallback(width => {
    setAsideWidth(width)
    store.set(ASIDE_WIDTH_KEY, width)
  }, [])

  const handleHeightResize = useCallback(height => {
    setJsonHeight(height)
    store.set(ASIDE_HEIGHT_KEY, height)
  }, [])

  const presetSelectValue = useMemo(() => {
    const { name } = presetRef.current

    return {
      value: name,
      label: name
    }
  }, [presetRef.current])

  const handleSelectChange = useCallback(
    event => {
      const presetName = event.value
      handlePresetChange(presetName)
    },
    [handlePresetChange]
  )

  return (
    <Flex
      as='aside'
      sx={{
        borderLeft: 1,
        borderColor,
        bg,
        flexDirection: 'column',
        fontFamily: 'mono',
        fontSize: 2,
        fontWeight: 'light',
        height: ['auto', '', '100%'],
        maxWidth: ['100%', '', ASIDE_MAX_WIDTH(size)],
        minWidth: ASIDE_MIN_WIDTH,
        position: 'relative',
        width: ['100%', '', asideWidth],
        willChange: 'width'
      }}
    >
      <VerticalDragBar onDrag={handleWidthResize} />

      <Flex
        as='header'
        sx={{
          alignItems: 'center',
          bg,
          borderBottom: 1,
          borderTop: [1, '', 0],
          borderColor,
          p: 3,
          color,
          justifyContent: 'space-between',
          flex: '0 0 auto'
        }}
      >
        <Box sx={{ flex: `0 1 ${SEARCH_WIDTH}`, mr: 3 }}>
          <SearchableSelect
            color={color}
            bg={bg}
            selectedValue={presetSelectValue}
            options={presetOptions}
            onChange={handleSelectChange}
          />
        </Box>

        <Flex
          sx={{
            alignItems: 'center',
            flex: '0 0 auto'
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

      <Box
        sx={{
          borderBottom: 1,
          borderColor,
          pl: 3,
          overflow: 'hidden',
          flex: ['none', '', 1],
          height: ['68vh', '', 'auto']
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Label sx={{ color, borderColor, textTransform: 'lowercase' }}>
            Editor
          </Label>
        </Box>

        <LiveEditor
          theme={theme}
          themeKey={colorMode}
          code={code}
          onChange={handleCode}
        />
      </Box>

      <Box
        sx={{
          height: ['auto', '', jsonHeight],
          maxHeight: ['initial', '', ASIDE_MAX_HEIGHT],
          minHeight: ['initial', '', ASIDE_MIN_HEIGHT],
          position: 'relative',
          willChange: 'height',
          overflow: ['initial', '', 'hidden']
        }}
      >
        <HorizontalDragBar onDrag={handleHeightResize} />

        <Label sx={{ color, borderColor, textTransform: 'lowercase' }}>
          Query Variables
        </Label>

        <Box
          as='section'
          sx={{
            bg,
            p: 3,
            height: ['auto', '', '100%'],
            overflow: ['scroll']
          }}
        >
          <JSONViewer theme={theme} onChange={handleQueryVariables}>
            {queryVariables}
          </JSONViewer>
        </Box>
      </Box>
    </Flex>
  )
}
