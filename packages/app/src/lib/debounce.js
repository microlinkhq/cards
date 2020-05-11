import { debounce as throttleDebounce } from 'throttle-debounce'

export const debounce = (fn, ms = 600) => throttleDebounce(ms, fn)
