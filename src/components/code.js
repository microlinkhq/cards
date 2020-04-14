import { Box } from 'theme-ui'

export default ({ sx, ...props }) => (
  <Box
    as='pre'
    sx={{
      overflow: 'auto',
      border: '1px solid',
      width: '100%',
      p: 3,
      userSelect: 'all',
      ...sx
    }}
    {...props}
  />
)
