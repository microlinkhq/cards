import { Box } from 'theme-ui'

export default ({ sx, ...props }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      px: 2,
      py: 1,
      borderLeft: 1,
      borderRight: 1,
      borderBottom: 1,
      mr: 3,
      fontSize: 0,
      ...sx
    }}
    {...props}
  />
)
