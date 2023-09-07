import { FetchFactory } from './fetch-factory'

const pending = new Map()

const promiseHandler = promise => promise.json()

export const Fetch = ({ children, url, options }) => (
  <FetchFactory
    cache={pending}
    url={url}
    options={options}
    promiseHandler={promiseHandler}
  >
    {children}
  </FetchFactory>
)
