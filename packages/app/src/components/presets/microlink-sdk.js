/* eslint-disable no-use-before-define,react/jsx-pascal-case */

import Inline from '../inline.macro'
import { MQL, Microlink, Flex, Spinner } from './scope'

const code = (
  <Inline>
    <>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          zoom: query.zoom
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .microlink_card {
              width: 100%;
              margin: auto;
            }`
          }}
        />
        <MQL url={query.url}>
          {payload => {
            if (payload === null) return <Spinner />
            const { url, ...opts } = query
            return (
              <Microlink fetchData={false} setData={payload.data} {...opts} />
            )
          }}
        </MQL>
      </Flex>
    </>
  </Inline>
)

const query = {
  url: 'https://apple.com/',
  zoom: 1.25
}

export const microlinkSdk = { name: 'Microlink SDK', code, query }
