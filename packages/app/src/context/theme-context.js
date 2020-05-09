import { useCallback, useMemo } from 'react'
import Cycled from 'cycled'
import { useThemeUI } from 'theme-ui'
import { rgba } from 'polished'

import { theme as themeBase, editorThemes } from '@/theme'

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

const themeContext = () => {
  const { colorMode, setColorMode } = useThemeUI()

  const changeTheme = useCallback(() => setColorMode(nextMode()), [])

  const theme = useMemo(() => {
    const editorTheme = editorThemes[colorMode].colors

    const bg = editorTheme['editor.background']
    const color = editorTheme['editor.foreground']
    const contrast = editorTheme['editorCursor.foreground']
    const borderColor = rgba(color, 0.1)
    const iconColor = rgba(color, 0.75)

    return { bg, borderColor, color, contrast, iconColor }
  }, [colorMode])

  return { colorMode, changeTheme, theme }
}

export default themeContext
