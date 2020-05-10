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
      aria-hidden={isOverlay === ''}
      backgroundColor={bg}
      color={color}
      isOpen={isOverlay !== ''}
      onClose={hideOverlay}
    >
      <Choose.When condition={showPreview}>
        <OverlayPreview />
      </Choose.When>

      <Choose.When condition={showAbout}>
        <OverlayAbout />
      </Choose.When>

      <Choose.When condition={showKeyBindings}>
        <OverlayKeyBindings />
      </Choose.When>

      <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
        <Button
          sx={{ bg: color, color: bg }}
          onClick={hideOverlay}
          children='Got it'
        />
      </Flex>
    </Overlay>
  )
}
