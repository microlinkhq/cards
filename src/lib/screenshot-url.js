import { getApiUrl } from '@microlink/mql'

export default url => {
  const [screenshotUrl] = getApiUrl(url, {
    meta: false,
    screenshot: true,
    embed: 'screenshot.url',
    element: '#screenshot',
    waitUntil: ['load', 'networkidle0']
  })
  return screenshotUrl
}
