const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : require('./package.json').homepage

console.log('Sitemap will generated for', siteUrl)

module.exports = {
  siteUrl: process.env.SITE_URL || siteUrl,
  generateRobotsTxt: true
}
