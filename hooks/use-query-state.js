import { useState, useEffect } from 'react'
import { encode, decode } from 'qss'
import Router from 'next/router'

const isSSR = typeof window === 'undefined'

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

export default () => {
  const [query, setQuery] = useState(fromLocation())

  useEffect(() => {
    const query = fromLocation()
    setQuery(query)
  }, condition)

  const set = obj => {
    const newQuery = { ...query, ...obj }
    const pathname = window.location.pathname
    Router.push({ pathname, query: encode(newQuery) })
  }

  return [query, set]
}
