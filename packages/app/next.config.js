const withTM = require('next-transpile-modules')(['@kikobeats/use-query-state'])
const withOffline = require('next-offline')
const nextConfig = {}

module.exports = withTM(withOffline(nextConfig))
