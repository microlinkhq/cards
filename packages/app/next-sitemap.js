
const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : require('./package.json').homepage

console.log('Generating sitemap for', siteUrl)
console.log('debug', process.env)

module.exports = {
  siteUrl: process.env.SITE_URL || siteUrl,
  generateRobotsTxt: true
}
