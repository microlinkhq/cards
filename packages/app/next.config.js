const withOffline = require('next-offline')

const nextConfig = {
  experimental: {
    jsconfigPaths: true
  },
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/editor': { page: '/' }
    }
  }
}

module.exports = withOffline(nextConfig)
