import { useContext } from 'react'
import { Text, Box } from 'theme-ui'
import AspectRatio from 'react-aspect-ratio'

import { Code, LivePreview, Tab, Tabs, TabList, TabPanel } from '@/components'
import { AppContext } from '@/context'
import { clipboard, notification, shareCode } from '@/lib'

const toClipboard = async (text, name) => {
  await clipboard.write(text)
  notification(`Copied ${name} to clipboard`)
}

export default function OverlayPreview () {
  const { query, screenshotUrl, theme } = useContext(AppContext)
  const { borderColor, color, contrast } = theme

  return (
    <>
      <Box as='header'>
        <AspectRatio ratio='16/9'>
          <LivePreview
            shadow
            css={`
              zoom: 0.6;
              cursor: pointer;
            `}
            onClick={() => toClipboard(screenshotUrl, 'URL')}
          />
        </AspectRatio>
      </Box>

      <Text sx={{ color, mt: 4, mb: 3, fontSize: 2, fontWeight: 'normal' }}>
        Add it to your website by copying the code below
      </Text>

      <Box as='section' sx={{ overflow: 'scroll' }}>
        <Tabs theme={theme}>
          <TabList>
            <Tab>SEO tags</Tab>
            <Tab>HTML</Tab>
            <Tab>Markdown</Tab>
            <Tab>Javascript</Tab>
            <Tab>Direct URL</Tab>
          </TabList>

          <TabPanel>
            <Code
              sx={{
                borderColor,
                color: contrast
              }}
              onClick={e => toClipboard(e.target.textContent, 'SEO Tags')}
            >
              {shareCode.seo(screenshotUrl)}
            </Code>
          </TabPanel>
          <TabPanel>
            <Code
              sx={{
                borderColor,
                color: contrast
              }}
              onClick={e => toClipboard(e.target.textContent, 'HTML')}
            >
              {shareCode.html(screenshotUrl)}
            </Code>
          </TabPanel>
          <TabPanel>
            <Code
              sx={{
                borderColor,
                color: contrast
              }}
              onClick={e => toClipboard(e.target.textContent, 'Markdown')}
            >
              {shareCode.markdown(screenshotUrl)}
            </Code>
          </TabPanel>
          <TabPanel>
            <Code
              sx={{
                borderColor,
                color: contrast
              }}
              onClick={e => toClipboard(e.target.textContent, 'Javascript')}
            >
              {shareCode.javascript(query)}
            </Code>
          </TabPanel>
          <TabPanel>
            <Code
              sx={{
                borderColor,
                color: contrast
              }}
              onClick={e => toClipboard(e.target.textContent, 'URL')}
            >
              {screenshotUrl}
            </Code>
          </TabPanel>
        </Tabs>
      </Box>
    </>
  )
}
