import { getApiUrl } from '@microlink/mql'

export default (url, opts) => {
  const [screenshotUrl] = getApiUrl(url, opts)
  return screenshotUrl
}
