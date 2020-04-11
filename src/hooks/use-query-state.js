import stringify from 'fast-safe-stringify'
import { useState, useEffect } from 'react'
import { encode, decode } from 'qss'
import isSSR from '../lib/is-ssr'

const eq = (str1, str2) => stringify(str1) === stringify(str2)

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

export default () => {
  const [query, setQuery] = useState(fromLocation())

  useEffect(() => {
    const newQuery = fromLocation()
    if (!eq(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = obj => {
    const newQuery = { ...fromLocation(), ...obj }
    return window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${encode(newQuery)}`
    )
  }

  return [query, set]
}
