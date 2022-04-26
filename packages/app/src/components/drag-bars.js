/* global Event */

import { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { Box } from 'theme-ui'

import { useWindowSize } from '@/hooks'

const dispatchResize = () => {
  if (typeof Event === 'function') {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }
}

const fullScreenStyle = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}

const Dragger = styled(Box).attrs(({ $isDraggable, $isHorizontal }) => ({
  style: {
    [!$isHorizontal ? 'width' : 'height']: !$isDraggable ? '10px' : 'initial',
    position: !$isDraggable ? 'absolute' : 'fixed',
    zIndex: !$isDraggable ? 1 : 9999,
    transform: !$isDraggable
      ? `translate${!$isHorizontal ? 'X' : 'Y'}(-50%)`
      : 'none',
    ...(!$isDraggable ? {} : fullScreenStyle)
  }
}))`
  left: 0;
  top: 0;
  bottom: 0;
  cursor: ew-resize;
  will-change: transform, position, width, height, z-index;

  ${({ isHorizontal }) => css`
    ${!isHorizontal ? 'bottom' : 'right'}: 0;
    cursor: ${!isHorizontal ? 'ew-resize' : 'ns-resize'};
  `}
`

const DragBar = ({ isHorizontal = false, onDrag = () => {} }) => {
  const [isDraggable, setIsDraggable] = useState(false)
  const { height, width } = useWindowSize()

  const onMove = useCallback(
    event => {
      const size = !isHorizontal ? width : height

      const cursorPos = event[!isHorizontal ? 'pageX' : 'pageY']
      const percent = 100 - (cursorPos / size) * 100

      dispatchResize()
      return onDrag(`${percent}%`)
    },
    [height, isHorizontal, onDrag, width]
  )

  const addListener = useCallback(() => {
    setIsDraggable(true)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
  }, [onMove])

  const removeListener = useCallback(() => {
    dispatchResize()
    setIsDraggable(false)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('touchmove', onMove)
  }, [onMove])

  return (
    <Dragger
      sx={{ display: ['none', '', 'block'] }}
      $isDraggable={isDraggable}
      $isHorizontal={isHorizontal}
      onMouseDown={addListener}
      onMouseUp={removeListener}
      onMouseOut={removeListener}
      onTouchStart={addListener}
      onTouchEnd={removeListener}
      onTouchCancel={removeListener}
    />
  )
}

export const VerticalDragBar = props => <DragBar {...props} />

export const HorizontalDragBar = props => <DragBar isHorizontal {...props} />
