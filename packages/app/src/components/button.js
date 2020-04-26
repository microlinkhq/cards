import { Button } from 'theme-ui'

export default ({ sx, ...props }) => (
  <Button
    sx={{
      cursor: 'pointer',
      borderRadius: 4,
      py: ['4px', '4px', '8px', '8px'],
      px: ['6px', '6px', '12px', '12px'],
      outline: 0,
      fontSize: 1,
      ...sx
    }}
    {...props}
  />
)
