/* global localStorage */

import isSSR from './is-ssr'
import noop from './noop'

export const get = isSSR ? noop : window.localStorage.getItem.bind(localStorage)
export const set = isSSR ? noop : window.localStorage.setItem.bind(localStorage)

export default { get, set }
