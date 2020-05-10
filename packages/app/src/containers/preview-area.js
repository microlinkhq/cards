/* globals ResizeObserver */

import { useContext, useEffect, useRef } from 'react'
import { Link, Box, Flex } from 'theme-ui'
import AspectRatio from 'react-aspect-ratio'
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion'

import { Button, LiveError, LivePreview } from '@/components'
import { OVERLAY_STATE, PREVIEW_CARD_WIDTH } from '@/constants'
import { AppContext } from '@/context'
import { theme } from '@/theme'

const getWidth = (el) => {
  if (!el) {
    return 0
  }

  const { width } = el.getBoundingClientRect()

  return width
}

const DEFAULT_MAIN_WIDTH = PREVIEW_CARD_WIDTH + (parseInt(theme.space[4]) * 2)

export const PreviewArea = ({ isEditor }) => {
  const {
    showOverlay,
    screenshotUrl,
    theme: { bg, color }
  } = useContext(AppContext)
  const mainRef = useRef()

  const motionMainWidth = useMotionValue(DEFAULT_MAIN_WIDTH)
  const springMainWidth = useTransform(
    motionMainWidth,
    [300, DEFAULT_MAIN_WIDTH],
    [0.3, 1]
  )
  const scale = useSpring(springMainWidth, {
    stiffness: 150,
    damping: 120,
    mass: 1.5
  })

  useEffect(() => {
    if (mainRef.current) {
      const onResize = () => motionMainWidth.set(getWidth(mainRef.current))

      onResize()

      const resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(mainRef.current)

      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        resizeObserver.disconnect()
      }
    }
  }, [mainRef])

  return (
    <Box
      as='main'
      ref={mainRef}
      sx={{
        flex: ['none', '', 1],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mb: [4, '', 0],
        minHeight: 0
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AspectRatio ratio='16/9' style={{ minWidth: PREVIEW_CARD_WIDTH }}>
          <motion.div style={{ scale }}>
            <LivePreview
              onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
              shadow={isEditor}
            />
          </motion.div>
        </AspectRatio>
      </Box>

      {isEditor && (
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            mt: ['-18vw', '-6vw', 0],
            mb: [3, '', 0],
            position: 'relative'
          }}
        >
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

      <Box sx={{ bottom: 0, position: 'absolute', width: '100%' }}>
        <LiveError />
      </Box>
    </Box>
  )
}
