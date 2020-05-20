import styled from 'styled-components'

const StyledSvg = styled('svg')``

export const Svg = ({ color, size, ...props }) => (
  <StyledSvg
    xmlns='http://www.w3.org/2000/svg'
    fill={color}
    stroke={color}
    width={size}
    height={size}
    {...props}
  />
)
