import { useState, useEffect } from 'react'
import { flatten, unflatten } from 'flat'
import isSSR from '@/lib/is-ssr'
import { encode } from 'qss'
import eq from '@/lib/eq'

const fromLocation = isSSR
  ? () => ({})
  : () => {
    const urlObj = new URL(window.location)
    const query = Object.fromEntries(urlObj.searchParams.entries())
    const decodeQuery = Object.keys(query).reduce(
      (acc, key) => ({ ...acc, [key]: decodeURIComponent(query[key]) }),
      {}
    )
    return decodeQuery
  }

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
