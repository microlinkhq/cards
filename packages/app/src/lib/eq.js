import stringify from 'fast-safe-stringify'

export const eq = (str1, str2) => stringify(str1) === stringify(str2)
