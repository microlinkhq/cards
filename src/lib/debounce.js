import { debounce } from 'throttle-debounce'
export default (fn, ms = 300) => debounce(ms, fn)
