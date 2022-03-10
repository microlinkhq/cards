import { useContext, useMemo } from 'react'
import { Flex } from 'theme-ui'

import { Button, Choose, Overlay } from '@/components'
import { OVERLAY_STATE } from '@/constants'
import { AppContext } from '@/context'

import OverlayAbout from './overlay-about'
import OverlayKeyBindings from './overlay-key-bindings'
import OverlayPreview from './overlay-preview'

export const Overlays = () => {
  const {
    isOverlay,
    hideOverlay,
    theme: { color, bg }
  } = useContext(AppContext)

  const showPreview = useMemo(() => isOverlay === OVERLAY_STATE.PREVIEW, [
    isOverlay
  ])
  const showAbout = useMemo(() => isOverlay === OVERLAY_STATE.ABOUT, [
    isOverlay
  ])
  const showKeyBindings = useMemo(
    () => isOverlay === OVERLAY_STATE.KEYBINDINGS,
    [isOverlay]
  )

  return (
    <Overlay
      backgroundColor={bg}
      color={color}
      isOpen={isOverlay !== ''}
      onClose={hideOverlay}
    >
      <Choose>
        <Choose.When condition={showPreview} render={OverlayPreview} />
        <Choose.When condition={showAbout} render={OverlayAbout} />
        <Choose.When condition={showKeyBindings} render={OverlayKeyBindings} />
      </Choose>
      <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
        <Button sx={{ bg: color, color: bg }} onClick={hideOverlay}>
          Got it
        </Button>
      </Flex>
    </Overlay>
  )
}
