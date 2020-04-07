import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import Aside from '@components/aside'
import Main from '@components/main'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@components/live-editor'

const Container = styled(Flex)`
  height: 100vh;
`

const codeTitle = `<Background bg='black' color='white'>
  <Text
    fontSize={6}
    fontWeight='bold'
    children='Culture of Shipping'
  />
  <Text
    fontSize={3}
    fontWeight='lighter'
    children='when dreams come true'
  />
</Background>`

export default () => {
  return (
    <LiveProvider code={codeTitle}>
      <Container>
        <Main>
          {/* <PreviewContainer> */}
          {/* <Center p={3}> */}
          <LivePreview />
          <LiveError />
          {/* </Center> */}
          {/* </PreviewContainer> */}
        </Main>
        <Aside p={3}>
          <Box as='section' height='100%'>
            {/* {pkg.name} v{pkg.version} */}
            <LiveEditor />
          </Box>
          {/* <Box bg='white' as='section' height='30%' p={3}>
            <Text fontSize={1}>og-image generator v{pkg.version}</Text>
            <Text mt={3} fontSize={1}>
              <Text as='span' fontWeight='bold'>
                fontSizes
              </Text>
              :{' [ '}
              {theme.fontSizes.map((value, index) => (
                <Text key={value} as='span'>
                  {value}
                  {index === theme.fontSizes.length - 1 ? '' : ', '}
                </Text>
              ))}
              {' ]'}
            </Text>
            <Text mt={2} fontSize={1}>
              <Text as='span' fontWeight='bold'>
                space
              </Text>
              {': [ '}
              {theme.space.map((value, index) => (
                <Text key={value} as='span'>
                  {value}
                  {index === theme.space.length - 1 ? '' : ', '}
                </Text>
              ))}
              {' ]'}
            </Text>
          </Box> */}
        </Aside>
      </Container>
    </LiveProvider>
  )
}
