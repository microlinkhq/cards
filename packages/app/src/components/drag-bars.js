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

const Dragger = styled(Box).attrs(({ isDrag, isHorizontal }) => ({
  style: {
    [!isHorizontal ? 'width' : 'height']: !isDrag ? '10px' : 'initial',
    position: !isDrag ? 'absolute' : 'fixed',
    zIndex: !isDrag ? 1 : 9999,
    transform: !isDrag ? `translate${!isHorizontal ? 'X' : 'Y'}(-50%)` : 'none',
    ...(!isDrag ? {} : fullScreenStyle)
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
  const [isDrag, setIsDrag] = useState(false)
  const { height, width } = useWindowSize()

  const onMove = useCallback(
    (e) => {
      const size = !isHorizontal ? width : height

      const cursorPos = e[!isHorizontal ? 'pageX' : 'pageY']
      const percent = 100 - (cursorPos / size) * 100

      dispatchResize()
      return onDrag(`${percent}%`)
    },
    [height, isHorizontal, onDrag, width]
  )

  const addListener = useCallback((e) => {
    setIsDrag(true)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
  }, [onMove])

  const removeListener = useCallback(() => {
    dispatchResize()
    setIsDrag(false)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('touchmove', onMove)
  }, [onMove])

  return (
    <Dragger
      sx={{ display: ['none', '', 'block'] }}
      isDrag={isDrag}
      isHorizontal={isHorizontal}
      onMouseDown={addListener}
      onMouseUp={removeListener}
      onMouseOut={removeListener}
      onTouchStart={addListener}
      onTouchEnd={removeListener}
      onTouchCancel={removeListener}
    />
  )
}

export const VerticalDragBar = (props) => <DragBar {...props} />

export const HorizontalDragBar = (props) => <DragBar isHorizontal {...props} />
