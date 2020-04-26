import { Box } from 'theme-ui'

export default ({ sx, ...props }) => (
  <Box
    as='pre'
    sx={{
      cursor: 'pointer',
      borderRadius: 2,
      overflow: 'auto',
      border: 1,
      width: '100%',
      p: 3,
      userSelect: 'all',
      ...sx
    }}
    {...props}
  />
)
