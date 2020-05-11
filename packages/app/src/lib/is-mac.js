import { isSSR } from './is-ssr'

export const isMac = !isSSR && window.navigator.platform.match('Mac')
