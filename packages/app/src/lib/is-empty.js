export default obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length
