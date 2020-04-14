import { debounce } from 'throttle-debounce'
export default (fn, ms = 600) => debounce(ms, fn)
