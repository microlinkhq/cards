export const read = async () => navigator.clipboard.readText()
export const write = async text => navigator.clipboard.writeText(text)
export default { read, write }
