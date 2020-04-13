import { Box } from 'theme-ui'

export default ({ children, onClose, fullWidth, isOpen }) => (
  // <Box
  //   sx={{
  //     position: 'fixed',
  //     top: 0,
  //     right: 0,
  //     bottom: 0,
  //     left: 0,
  //     zIndex: 999, // TODO: careful
  //     display: isOpen ? 'flex' : 'none',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center'
  //   }}
  // >
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#000',
      // opacity: 0.875,
      zIndex: 997, // TODO: careful
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={onClose}
  >
    <Box
      sx={{
        bg: 'white',
        color: 'black',
        position: 'relative',
        zIndex: 998, // TODO: careful,
        minWidth: 320,
        width: fullWidth ? '100%' : null,
        p: 3
      }}
      children={children}
    />
  </Box>
  // </Box>
)
