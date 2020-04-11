import { useCallback, useState } from 'react'
import styled from 'styled-components'

const DragWrap = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: ${({ isDrag = false }) =>
    `translateX(-50%) scaleX(${!isDrag ? 1 : 9999})`};
  cursor: ew-resize;
  will-change: transform;
  z-index: ${({ isDrag = false }) => (!isDrag ? 1 : 9999)};
`

const AsideDrag = ({ onDrag = () => {} }) => {
  const [isDrag, setIsDrag] = useState(false)

  const onMouseMove = useCallback(e => {
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )

    const percent = Math.round(100 - (e.clientX / vw) * 100)

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
    <DragWrap
      isDrag={isDrag}
      onMouseDown={addListener}
      onMouseUp={removeListener}
      onMouseOut={removeListener}
    />
  )
}

export default AsideDrag
