
const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : require('./package.json').homepage

console.log('Sitemap will generated for', siteUrl)

module.exports = {
  siteUrl: process.env.SITE_URL || siteUrl,
  generateRobotsTxt: true
}
