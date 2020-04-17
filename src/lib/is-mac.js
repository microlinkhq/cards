import isSSR from './is-ssr'
export default !isSSR && window.navigator.platform.match('Mac')
