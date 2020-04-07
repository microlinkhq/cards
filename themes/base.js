// default theme theme

export const toPx = n => `${n}px`
export const toEm = n => `${n}em`

export const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e'
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
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512].map(toPx)
}

export default theme
