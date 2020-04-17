import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import palenight from 'prism-react-renderer/themes/palenight'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import ultramin from 'prism-react-renderer/themes/ultramin'
import dracula from 'prism-react-renderer/themes/dracula'
import github from 'prism-react-renderer/themes/github'

import toPx from '@/lib/to-px'

const defaultTheme = github

export const editorTheme = {
  default: defaultTheme,
  ultramin,
  dracula,
  nightOwl,
  nightOwlLight,
  palenight
}

const speed = {
  quickly: 150,
  normal: 300,
  slowly: 450
}

export const theme = {
  borders: [0, '1px solid'],
  colors: {
    modes: editorTheme
  },
  fonts: {
    sans:
      'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif',
    mono:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
  },
  speed,
  transition: {
    short: `${speed.quickly}ms cubic-bezier(.25,.8,.25,1)`,
    medium: `${speed.normal}ms cubic-bezier(.25,.8,.25,1)`,
    long: `${speed.slowly}ms cubic-bezier(.4, 0, .2, 1)`
  },
  breakpoints: [576, 768, 991, 1220].map(toPx),
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96].map(toPx),
  fontWeights: {
    lighter: 100,
    light: 200,
    normal: 400,
    regular: 500,
    bold: 600
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512].map(toPx),
  styles: {
    root: {
      fontFamily: 'sans',
      lineHeight: 1.5,
      margin: 0,
      overflow: 'hidden'
    }
  }
}

export default theme
