import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  display: block;
  margin: 1em auto;
  width: 100%;
  height: 6em;

  circle {
    fill: none;
    stroke-width: 15;
    transform: translate(100px, 100px) rotate(-89.9deg);
    transition: stroke-dashoffset 0.3s linear;
  }

  .arc-background {
    stroke: ${props => props.secondary};
    fill: ${props => props.secondary};
  }

  .arc {
    stroke: ${props => props.primary};
    stroke-linecap: ${props => (props.rounded ? 'round' : 'inherit')};
  }

  text {
    fill: ${props => props.primary};
    font-size: 60px;
    font-weight: 300;
    text-anchor: middle;
    font-family: 'Roboto Mono', 'Menlo', 'dejavu sans mono', 'Consolas',
      'Lucida Console', monospace;
  }
`

export const Progress = ({
  value,
  max,
  className,
  unit,
  primary,
  secondary,
  textColor,
  textVisible,
  radius,
  rounded,
  dominantBaseline
}) => {
  const p = 2 * radius * Math.PI
  return (
    <Svg
      className={className}
      primary={primary}
      secondary={secondary}
      textColor={textColor}
      rounded={rounded}
      viewBox='0 0 200 200'
    >
      <circle className='arc-background' r={radius} />

      <circle
        className='arc'
        r={radius}
        strokeDashoffset={((max - value) / max) * p}
        strokeDasharray={p}
      />

      {textVisible && (
        <text
          x='100'
          y='100'
          dominantBaseline={dominantBaseline}
          children={`${value}${unit}`}
        />
      )}
    </Svg>
  )
}

Progress.defaultProps = {
  value: 0,
  max: 100,
  unit: '',
  primary: '#FF4E42',
  secondary: '#372624',
  textVisible: true,
  radius: 90,
  rounded: true,
  dominantBaseline: 'middle'
}
