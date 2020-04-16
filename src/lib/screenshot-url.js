import { getApiUrl } from '@microlink/mql'

export default (url, opts) => {
  const [screenshotUrl] = getApiUrl(url, {
    adblock: false,
    element: '#screenshot',
    embed: 'screenshot.url',
    meta: false,
    screenshot: true,
    waitUntil: ['load', 'networkidle0'],
    ...opts
  })
  return screenshotUrl
}
