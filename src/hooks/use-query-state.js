import { useState, useEffect } from 'react'
import { flatten, unflatten } from 'flat'
import { encode, decode } from 'qss'
import isSSR from '@/lib/is-ssr'
import eq from '@/lib/eq'

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

export default () => {
  const [query, setQuery] = useState(unflatten(fromLocation()))

  useEffect(() => {
    const newQuery = fromLocation()
    if (!eq(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = (obj, { replace = false } = {}) => {
    const newQuery = flatten(replace ? obj : { ...fromLocation(), ...obj })
    setQuery(newQuery)
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${encode(newQuery)}`
    )
  }

  return [query, set]
}
