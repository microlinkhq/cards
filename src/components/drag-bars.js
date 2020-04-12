import { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'

const Dragger = styled('div').attrs(({ isDrag, isHorizontal }) => ({
  style: {
    [!isHorizontal ? 'width' : 'height']: !isDrag ? '10px' : '100vw',
    position: !isDrag ? 'absolute' : 'fixed',
    zIndex: !isDrag ? 'initial' : 9999,
    transform: !isDrag ? `translate${!isHorizontal ? 'X' : 'Y'}(-50%)` : 'none'
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

  const onMouseMove = useCallback(e => {
    const vw = Math.max(
      document.documentElement[!isHorizontal ? 'clientWidth' : 'clientHeight'],
      window[!isHorizontal ? 'innerWidth' : 'innerHeight'] || 0
    )

    const cursorPos = e[!isHorizontal ? 'clientX' : 'clientY']

    const percent = Math.round(100 - (cursorPos / vw) * 100)

    onDrag(`${percent}%`)
  }, [])

  const addListener = useCallback(() => {
    setIsDrag(true)
    document.addEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  const removeListener = useCallback(() => {
    setIsDrag(false)
    document.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  return (
    <Dragger
      isDrag={isDrag}
      isHorizontal={isHorizontal}
      onMouseDown={addListener}
      onMouseUp={removeListener}
      onMouseOut={removeListener}
    />
  )
}

export const VerticalDragBar = props => <DragBar {...props} />

export const HorizontalDragBar = props => <DragBar isHorizontal {...props} />
