import themelist from 'monaco-themes/themes/themelist.json'
import { useState, useMemo } from 'react'
import { store, isSSR } from '@/lib'
import { rgba } from 'polished'
import Cycled from 'cycled'

export const editorThemes = Object.keys(themelist).reduce((acc, id) => {
  const name = themelist[id]
  return { ...acc, [id]: require(`monaco-themes/themes/${name}.json`) }
}, {})

const cycledMode = new Cycled(Object.keys(editorThemes))
const nextMode = () => cycledMode.next()

const DEFAULT_THEME_VALUE = 'chrome-devtools'
const THEME_KEY = 'editor-theme'

const getColorMode = isSSR
  ? () => DEFAULT_THEME_VALUE
  : () => {
      const value = store.get(THEME_KEY)
      if (value !== null) return value
      store.set(THEME_KEY, DEFAULT_THEME_VALUE)
      return DEFAULT_THEME_VALUE
    }

const nextTheme = setColorMode => {
  const value = nextMode()
  setColorMode(value)
  store.set(THEME_KEY, value)
}

export default function ThemeContext () {
  const [colorMode, setColorMode] = useState(getColorMode())
  const editorTheme = editorThemes[colorMode].colors

  const theme = useMemo(() => {
    const bg = editorTheme['editor.background']
    const color = editorTheme['editor.foreground']
    const contrast = editorTheme['editorCursor.foreground']
    const borderColor = rgba(color, 0.1)
    const iconColor = rgba(color, 0.75)
    return { bg, borderColor, color, contrast, iconColor }
  }, [colorMode])

  return { colorMode, changeTheme: () => nextTheme(setColorMode), theme }
}
