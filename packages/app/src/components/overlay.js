import { Box } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  default: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    display: 'block',
    transition: {
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

const innerVariants = {
  default: {
    y: 60
  },
  enter: {
    y: 0
  },
  exit: {
    y: 30
  }
}

export const Overlay = ({
  backgroundColor,
  color,
  children,
  onClose,
  fullWidth,
  isOpen,
  ...props
}) => {
  const onDismiss = event => {
    if (event.target.dataset.overlayAction === 'close') {
      onClose(event)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={variants}
          initial='default'
          animate='enter'
          exit='exit'
        >
          <Box
            data-overlay-action='close'
            sx={{
              display: 'flex',
              p: [2, '', 4],
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 950,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={onDismiss}
          >
            <motion.div style={{ maxWidth: '100%' }} variants={innerVariants}>
              <Box
                sx={{
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  bg: backgroundColor,
                  color,
                  position: 'relative',
                  zIndex: 999,
                  width: fullWidth ? '100%' : 560,
                  maxWidth: '100%',
                  overflow: 'auto',
                  p: 4
                }}
                {...props}
              >
                {children}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
