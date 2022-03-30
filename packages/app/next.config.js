const withTM = require('next-transpile-modules')([
  '@kikobeats/use-query-state',
  'cycled',
  'react-aspect-ratio'
])

const nextConfig = {}

module.exports = withTM(nextConfig)
