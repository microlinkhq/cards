import ky from '@microlink/mql/src/ky'

import { FetchFactory } from './fetch-factory'

const pending = new Map()

const promiseHandler = promise => promise.json()

export const Fetch = ({ children, url, options }) => (
  <FetchFactory
    cache={pending}
    fetcher={ky}
    url={url}
    options={options}
    promiseHandler={promiseHandler}
  >
    {children}
  </FetchFactory>
)
