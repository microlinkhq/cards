import { compressToURI, decompressFromURI } from 'lz-ts'
export const marshall = compressToURI
export const unmarshall = decompressFromURI
