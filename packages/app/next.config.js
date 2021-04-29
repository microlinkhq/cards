const withTM = require('next-transpile-modules')([
  '@kikobeats/use-query-state',
  'cycled'
])
const nextConfig = {}

module.exports = withTM(nextConfig)
