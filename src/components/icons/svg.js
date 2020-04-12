import styled from 'styled-components'

const Svg = styled('svg')``

export default ({ color, size, ...props }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill={color}
    stroke={color}
    width={size}
    height={size}
    {...props}
  />
)
