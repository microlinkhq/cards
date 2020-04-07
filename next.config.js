module.exports = {
  experimental: {
    jsconfigPaths: true
  },
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
