const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : require('./package.json').homepage

module.exports = {
  siteUrl: process.env.SITE_URL || siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}
