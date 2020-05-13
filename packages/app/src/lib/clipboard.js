const read = async () => navigator.clipboard.readText()
const write = async text => navigator.clipboard.writeText(text)

export const clipboard = { read, write }
