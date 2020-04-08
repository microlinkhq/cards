import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Select, Box, Flex } from 'theme-ui'
import Aside from '@components/aside'
import Main from '@components/main'
import pkg from '../package.json'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@components/live-editor'

const Container = styled(Flex)`
  height: 100vh;
`

const codeTitle = `<Background sx={{ bg: 'black', color: 'white' }}>
  <Text
    sx={{
      fontSize: 6,
      fontWeight: 'bold'
    }}
    children='Culture of Shipping'
  />
  <Text
    sx={{
      fontSize: 3,
      fontWeight: 'lighter'
    }}
    children='when dreams come true'
  />
</Background>`

const DEFAULT_PRESET = 'simple'

export default () => {
  const [preset, setPreset] = useState(DEFAULT_PRESET)

  return (
    <LiveProvider code={codeTitle}>
      <Container>
        <Main>
          <LivePreview />
          <LiveError />
        </Main>
        <Aside>
          <Flex
            as='section'
            sx={{
              borderBottom: '1px solid #6c6783',
              color: '#6c6783',
              bg: '#2a2734',
              p: 3,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Flex
              sx={{
                alignItems: 'center'
              }}
            >
              <Select
                defaultValue={DEFAULT_PRESET}
                sx={{
                  fontSize: 1,
                  width: '8rem',
                  p: '2px 8px'
                }}
              >
                <option>{DEFAULT_PRESET}</option>
              </Select>
            </Flex>
            <Box>
              <Text
                sx={{
                  fontSize: 1
                }}
              >
                v{pkg.version}
              </Text>
            </Box>
          </Flex>
          <Box as='section'>
            {/* <StyledTextarea onChange={handleChange} value={code} /> */}
            <LiveEditor />
          </Box>
        </Aside>
      </Container>
    </LiveProvider>
  )
}
