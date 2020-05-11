const withOffline = require('next-offline')

const nextConfig = {
  experimental: {
    jsconfigPaths: true
  }
}

module.exports = withOffline(nextConfig)
