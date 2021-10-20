const alphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const encodeHex = hexColor => {
  if (typeof hexColor !== 'string') {
    throw new TypeError(`Expected an string, got '${hexColor}'`)
  }

  let s = hexColor.substring(1, 7)
  if (s.length < 6) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2]
  const rgb = [
    parseInt(s[0] + s[1], 16),
    parseInt(s[2] + s[3], 16),
    parseInt(s[4] + s[5], 16)
  ]

  return encodeRGB(rgb[0], rgb[1], rgb[2])
}

const encodeRGB = (r, g, b) =>
  encodeTriplet(0, r, g) + encodeTriplet(b, 255, 255)

const encodeTriplet = (e1, e2, e3) => {
  const enc1 = e1 >> 2
  const enc2 = ((e1 & 3) << 4) | (e2 >> 4)
  const enc3 = ((e2 & 15) << 2) | (e3 >> 6)
  const enc4 = e3 & 63

  return (
    alphabet.charAt(enc1) +
    alphabet.charAt(enc2) +
    alphabet.charAt(enc3) +
    alphabet.charAt(enc4)
  )
}

// credits to https://stackoverflow.com/a/33919020
export const pixelGif = hexColor =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${encodeHex(
    hexColor
  )}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
