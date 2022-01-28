const { readdirSync } = require('fs')
const path = require('path')

const PRESETS_ORIGIN_PATH = path.resolve(__dirname, 'src/components/presets')

const PRESETS = readdirSync(PRESETS_ORIGIN_PATH)
  .map(filename => path.basename(filename, '.js'))
  .filter(preset => preset !== 'scope' && preset !== 'index')

const previewPaths = Object.values(PRESETS).reduce((acc, preset) => {
  return {
    ...acc,
    [`/editor/preset/${preset}`]: { page: '/editor', query: { preset } }
  }
}, {})

const withTM = require('next-transpile-modules')([
  '@kikobeats/use-query-state',
  'cycled'
])

const nextConfig = {
  exportPathMap: defaultPathMap => ({ ...defaultPathMap, ...previewPaths })
}

module.exports = withTM(nextConfig)
