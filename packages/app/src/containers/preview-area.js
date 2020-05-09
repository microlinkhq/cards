import { useContext } from 'react'
import { Link, Box, Flex } from 'theme-ui'
import AspectRatio from 'react-aspect-ratio'

import { Button, LiveError, LivePreview, Main } from '@/components'
import { OVERLAY_STATE, PREVIEW_CARD_WIDTH } from '@/constants'
import { AppContext } from '@/context'

export const PreviewArea = ({ isEditor }) => {
  const {
    showOverlay,
    screenshotUrl,
    theme: { bg, color }
  } = useContext(AppContext)

  return (
    <Main>
      <Box sx={{ mb: 4 }}>
        <AspectRatio
          ratio='16/9'
          style={{ margin: 'auto', maxWidth: PREVIEW_CARD_WIDTH }}
        >
          <LivePreview
            onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
            shadow={isEditor}
          />
        </AspectRatio>
      </Box>
      <Box
        sx={{
          bottom: 0,
          position: 'absolute',
          width: '100%'
        }}
      >
        <LiveError />
      </Box>

      {isEditor && (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Link
            href='#'
            sx={{ color }}
            onClick={() => {
              const link = document.createElement('a')
              link.download = Date.now()
              link.href = screenshotUrl
              window.open(link)
            }}
          >
            Download
          </Link>
          <Box sx={{ ml: 3 }}>
            <Button
              sx={{ color: bg, bg: color }}
              onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
              children='Embed'
            />
          </Box>
        </Flex>
      )}
    </Main>
  )
}
