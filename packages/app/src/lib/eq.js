import stringify from 'fast-safe-stringify'
export default (str1, str2) => stringify(str1) === stringify(str2)
