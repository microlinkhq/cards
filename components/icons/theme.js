export default ({ color, ...props }) => (
  <svg
    viewBox='0 0 32 32'
    width='24'
    height='24'
    fill={color}
    style={{
      display: 'block'
    }}
    {...props}
  >
    <circle cx='16' cy='16' r='14' fill='none' stroke={color} strokeWidth='4' />
    <path
      d={`
        M 16 0
        A 16 16 0 0 0 16 32
        z
      `}
    />
  </svg>
)
