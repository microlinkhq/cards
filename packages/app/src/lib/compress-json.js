import LZString from 'lz-string'

export const marshall = value => LZString.compressToEncodedURIComponent(value)

export const unmarshall = value =>
  LZString.decompressFromEncodedURIComponent(value)
