import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Select, Box, Flex } from 'theme-ui'
import * as templates from '@components/templates'
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

const DEFAULT_PRESET = 'simple'

export default () => {
  const [preset] = useState(DEFAULT_PRESET)
  const Template = templates[preset]

  return (
    <LiveProvider code={Template}>
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
