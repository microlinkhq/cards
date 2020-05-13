/* global localStorage */

import { isSSR } from './is-ssr'
import { noop } from './noop'

const get = isSSR ? noop : window.localStorage.getItem.bind(localStorage)
const set = isSSR ? noop : window.localStorage.setItem.bind(localStorage)

export const store = { get, set }
