import dracula from 'prism-react-renderer/themes/dracula'
import duotoneDark from 'prism-react-renderer/themes/duotoneDark'
import duotoneLight from 'prism-react-renderer/themes/duotoneLight'
import github from 'prism-react-renderer/themes/github'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import oceanicNext from 'prism-react-renderer/themes/oceanicNext'
import palenight from 'prism-react-renderer/themes/palenight'
import shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple'
import ultramin from 'prism-react-renderer/themes/ultramin'
import vsDark from 'prism-react-renderer/themes/vsDark'

export const toPx = n => `${n}px`
export const toEm = n => `${n}em`

export const editorTheme = {
  dracula,
  duotoneDark,
  duotoneLight,
  github,
  nightOwl,
  nightOwlLight,
  oceanicNext,
  palenight,
  shadesOfPurple,
  ultramin,
  vsDark
}

export const theme = {
  colors: {
    text: '#000',
    background: '#333333',
    primary: '#33e',
    modes: editorTheme
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono:
      '"Operator Mono", "Fira Code", "SF Mono", "Roboto Mono", "Ubuntu Mono", Menlo, monospace'
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
    textarea: {
      ...nightOwl
    }
  }
}

export default theme
