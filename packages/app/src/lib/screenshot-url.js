import { getApiUrl } from '@microlink/mql'

export const getScreenshotUrl = (url, opts) => {
  const [screenshotUrl] = getApiUrl(url, opts)
  return screenshotUrl
}
