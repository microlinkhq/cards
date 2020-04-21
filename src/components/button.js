import { Button } from 'theme-ui'

export default ({ sx, ...props }) => (
  <Button
    sx={{
      cursor: 'pointer',
      borderRadius: 2,
      outline: 0,
      padding: '8px 12px',
      fontSize: 1,
      ...sx
    }}
    {...props}
  />
)
